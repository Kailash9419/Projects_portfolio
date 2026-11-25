import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "devlabs@2026";
const COOKIE_NAME = "devlabs_admin_session";
const SESSION_TOKEN = "devlabs_admin_authenticated_session_secret_2026";

export function checkAdminAuth(): boolean {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get(COOKIE_NAME);
    return session?.value === SESSION_TOKEN;
  } catch {
    // cookies() can throw in some Next.js contexts (middleware, edge, etc.)
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAdminSession(): void {
  try {
    const cookieStore = cookies();
    cookieStore.set(COOKIE_NAME, SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch {
    // no-op in contexts where cookies can't be set
  }
}

export function clearAdminSession(): void {
  try {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_NAME);
  } catch {
    // no-op
  }
}
