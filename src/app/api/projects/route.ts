import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readProjects, saveProject } from "@/lib/server/projectStore";
import { checkAdminAuth } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin login required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    if (!body.title || !body.tagline || !body.category) {
      return NextResponse.json(
        { success: false, error: "Title, tagline, and category are required." },
        { status: 400 }
      );
    }

    const saved = await saveProject(body);
    revalidatePath("/", "layout");
    revalidatePath("/work");
    revalidatePath(`/work/${saved.slug}`);
    return NextResponse.json({ success: true, project: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
