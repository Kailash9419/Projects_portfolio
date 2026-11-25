import { NextRequest, NextResponse } from "next/server";
import { saveProject, deleteProject, toggleFeaturedProject } from "@/lib/server/projectStore";
import { requireAdmin } from "@/lib/server/auth";
import { errorResponse, invalidateProjects } from "@/lib/server/respond";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;
    const project = await saveProject({ ...(await request.json()), id });
    invalidateProjects();
    return NextResponse.json({ success: true, project });
  } catch (error) {
    return errorResponse(error, "Failed to update project");
  }
}

export async function PATCH(_request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const project = await toggleFeaturedProject((await params).id);
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
    invalidateProjects();
    return NextResponse.json({ success: true, project });
  } catch (error) {
    return errorResponse(error, "Failed to toggle featured status");
  }
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const deleted = await deleteProject((await params).id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
    invalidateProjects();
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error, "Failed to delete project");
  }
}
