import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { checkAdminAuth } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
]);

export async function POST(req: NextRequest) {
  if (!checkAdminAuth()) {
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

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Image size must be less than 10MB" },
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

    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      // Serve via dynamic API route so runtime uploads work in both `next dev` and `next start`
      const publicUrl = `/api/uploads/${fileName}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        fileName,
        size: file.size,
      });
    } catch (fsError: unknown) {
      const errCode = (fsError as NodeJS.ErrnoException)?.code;
      // Graceful fallback for read-only serverless filesystems (e.g. Vercel)
      if ((errCode === "EROFS" || errCode === "EACCES") && file.size <= 2 * 1024 * 1024) {
        const mime = file.type || "image/png";
        const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
        return NextResponse.json({
          success: true,
          url: dataUrl,
          fileName,
          size: file.size,
        });
      }
      throw fsError;
    }
  } catch (error: unknown) {
    console.error("Upload handler error:", error);
    const message = error instanceof Error ? error.message : "Failed to upload file";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
