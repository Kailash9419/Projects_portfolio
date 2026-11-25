import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveProject, deleteProject, toggleFeaturedProject } from "@/lib/server/projectStore";
import { checkAdminAuth } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin login required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const updated = await saveProject({ ...body, id: params.id });
    revalidatePath("/", "layout");
    revalidatePath("/work");
    revalidatePath(`/work/${updated.slug}`);
    revalidatePath("/", "layout");
    revalidatePath("/work");
    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin login required." },
      { status: 401 }
    );
  }

  try {
    const updated = await toggleFeaturedProject(params.id);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }
    revalidatePath("/", "layout");
    revalidatePath("/work");
    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to toggle featured status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin login required." },
      { status: 401 }
    );
  }

  try {
    const deleted = await deleteProject(params.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }
    revalidatePath("/", "layout");
    revalidatePath("/work");
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
