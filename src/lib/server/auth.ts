import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { NextResponse } from "next/server";

const COOKIE_NAME = "devlabs_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

/**
 * Admin auth: a single password (ADMIN_PASSWORD) and an HMAC-signed, expiring
 * session cookie (signed with ADMIN_SESSION_SECRET). There is no default
 * password — if ADMIN_PASSWORD is unset, admin login is disabled.
 */

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV !== "production") return "dev-only-insecure-session-secret-change-me";
  return null;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && getSecret() !== null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

function createToken(secret: string): string {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${expires}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${sign(payload, secret)}`;
}

function verifyToken(token: string, secret: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot < 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload, secret))) return false;
  const expires = Number(payload.split(".")[0]);
  return Number.isFinite(expires) && expires > Date.now() / 1000;
}

export async function checkAdminAuth(): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !process.env.ADMIN_PASSWORD) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return Boolean(token && verifyToken(token, secret));
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") return false;
  // Compare HMACs so length differences don't leak through timing.
  const key = "devlabs-password-compare";
  return safeEqual(
    createHmac("sha256", key).update(password).digest("hex"),
    createHmac("sha256", key).update(expected).digest("hex")
  );
}

export async function setAdminSession(): Promise<void> {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  (await cookies()).set(COOKIE_NAME, createToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

/** Returns a 401 response if the request is not from a signed-in admin. */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await checkAdminAuth()) return null;
  return NextResponse.json(
    { success: false, error: "Unauthorized. Admin login required." },
    { status: 401 }
  );
}

// --- Best-effort login throttling (per server instance) ---
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) return false;
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count++;
  }
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}
