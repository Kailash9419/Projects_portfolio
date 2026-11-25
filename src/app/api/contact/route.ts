import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BRAND, CONTACT } from "@/data/brand";

/**
 * Receives inquiries from the Quick Inquiry form and emails them to the studio
 * via Resend. Configure with:
 *   RESEND_API_KEY      — required
 *   CONTACT_TO_EMAIL    — inbox that receives leads (defaults to CONTACT.email)
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. "DevLabs <hello@yourdomain.com>"
 */

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > LIMIT;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b-\u001f]/g, "").trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success so they don't retry.
  if (clean(body.website, 200)) return NextResponse.json({ success: true });

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 30);
  const projectType = clean(body.projectType, 100) || "General Inquiry";
  const message = clean(body.message, 3000);
  const language = body.language === "hi" ? "Hindi" : "English";

  if (!name || !/^[+\d][\d\s()-]{6,}$/.test(phone)) {
    return NextResponse.json(
      { success: false, error: "Please enter your name and a valid phone number." },
      { status: 400 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set; inquiry not delivered.");
    return NextResponse.json({ success: false, error: "Contact form is not configured" }, { status: 503 });
  }

  const digits = phone.replace(/[^\d]/g, "");
  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Requirement", projectType],
    ["Language", language],
    ["Details", message || "—"],
  ];

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL || `${BRAND.name} Website <onboarding@resend.dev>`,
    to: process.env.CONTACT_TO_EMAIL || CONTACT.email,
    subject: `New inquiry: ${projectType} — ${name}`,
    text:
      rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
      `\n\nWhatsApp: https://wa.me/${digits}`,
    html: `
      <h2 style="font-family:sans-serif">New website inquiry</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="font-family:sans-serif"><a href="https://wa.me/${digits}">Reply on WhatsApp</a></p>`,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
