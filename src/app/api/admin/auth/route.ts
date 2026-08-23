import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth, verifyPassword, setAdminSession, clearAdminSession } from "@/lib/server/auth";

export async function GET() {
  const isAuthenticated = checkAdminAuth();
  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Invalid admin password" },
        { status: 401 }
      );
    }

    setAdminSession();
    return NextResponse.json({ success: true, message: "Authenticated successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  clearAdminSession();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
