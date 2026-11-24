import { NextRequest, NextResponse } from "next/server";
import {
  checkAdminAuth,
  verifyPassword,
  setAdminSession,
  clearAdminSession,
  isAdminConfigured,
  isRateLimited,
  recordFailedAttempt,
  clearAttempts,
} from "@/lib/server/auth";
import { isBlobStorageEnabled } from "@/lib/server/projectStore";

function clientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}

export async function GET() {
  return NextResponse.json({
    authenticated: await checkAdminAuth(),
    configured: isAdminConfigured(),
    storage: isBlobStorageEnabled() ? "blob" : process.env.VERCEL ? "none" : "local",
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { success: false, error: "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 503 }
    );
  }

  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { success: false, error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const { password } = await request.json();
    if (!verifyPassword(password)) {
      recordFailedAttempt(key);
      return NextResponse.json({ success: false, error: "Invalid admin password" }, { status: 401 });
    }
    clearAttempts(key);
    await setAdminSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 400 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true });
}
