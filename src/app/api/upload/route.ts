import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "devlabs_admin_session";
const SESSION_TOKEN = "devlabs_admin_authenticated_session_secret_2026";

function checkAuth(): boolean {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get(COOKIE_NAME);
    return session?.value === SESSION_TOKEN;
  } catch {
    return false;
  }
}

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
]);

export async function POST(req: NextRequest) {
  // Auth check
  if (!checkAuth()) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please log in to Admin first." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in request" },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { success: false, error: `Unsupported image type: ${file.type}` },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Image size must be less than 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean safe filename
    const ext = path.extname(file.name) || ".png";
    const baseName =
      path
        .basename(file.name, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .toLowerCase() || "image";
    const fileName = `${Date.now()}_${baseName}${ext}`;

    // Try writing to public/uploads/ (works in local dev & Docker)
    // On Vercel (read-only FS) this will fail — we fall back to base64 data URL
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      // Serve via /api/uploads/[filename] dynamic route
      return NextResponse.json({
        success: true,
        url: `/api/uploads/${fileName}`,
        fileName,
        size: file.size,
        storage: "filesystem",
      });
    } catch {
      // Vercel / serverless: filesystem is read-only → fall back to base64 data URL
      // This works for all file sizes since we store in JSON (projects.json)
      const mime = file.type || "image/png";
      const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
      return NextResponse.json({
        success: true,
        url: dataUrl,
        fileName,
        size: file.size,
        storage: "base64",
      });
    }
  } catch (error: unknown) {
    console.error("Upload handler error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to upload file";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
