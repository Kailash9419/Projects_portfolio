import { NextRequest, NextResponse } from "next/server";
import { readProjects, saveProject } from "@/lib/server/projectStore";
import { requireAdmin } from "@/lib/server/auth";
import { errorResponse, invalidateProjects } from "@/lib/server/respond";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ success: true, projects: await readProjects() });
  } catch (error) {
    return errorResponse(error, "Failed to fetch projects");
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    delete body.id;
    const project = await saveProject(body);
    invalidateProjects();
    return NextResponse.json({ success: true, project });
  } catch (error) {
    return errorResponse(error, "Failed to create project");
  }
}
