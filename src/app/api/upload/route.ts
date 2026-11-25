import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/server/auth";
import { isBlobStorageEnabled } from "@/lib/server/projectStore";

// Vercel serverless request bodies are capped at 4.5 MB.
const MAX_BYTES = 4 * 1024 * 1024;

// SVG is deliberately excluded: uploaded SVGs can carry scripts.
const ALLOWED: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const file = (await req.formData()).get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }
    const ext = ALLOWED[file.type];
    if (!ext) {
      return NextResponse.json(
        { success: false, error: "Only PNG, JPEG, WebP, GIF or AVIF images are allowed" },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ success: false, error: "Image must be under 4 MB" }, { status: 400 });
    }

    const baseName =
      path
        .basename(file.name, path.extname(file.name))
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .toLowerCase()
        .slice(0, 60) || "image";
    const fileName = `${Date.now()}_${baseName}${ext}`;

    if (isBlobStorageEnabled()) {
      const blob = await put(`uploads/${fileName}`, file, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ success: true, url: blob.url });
    }

    if (process.env.VERCEL) {
      return NextResponse.json(
        { success: false, error: "Uploads need a Vercel Blob store (BLOB_READ_WRITE_TOKEN)." },
        { status: 503 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ success: true, url: `/uploads/${fileName}` });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ success: false, error: "Failed to upload file" }, { status: 500 });
  }
}
