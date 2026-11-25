import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { StorageNotConfiguredError, ValidationError } from "@/lib/server/projectStore";
import { PROJECTS_TAG } from "@/lib/projects";

/** Make public pages pick up admin changes on the very next request. */
export function invalidateProjects() {
  revalidateTag(PROJECTS_TAG, { expire: 0 });
}

export function errorResponse(error: unknown, fallback: string) {
  if (error instanceof ValidationError) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
  if (error instanceof StorageNotConfiguredError) {
    return NextResponse.json({ success: false, error: error.message }, { status: 503 });
  }
  console.error(fallback, error);
  return NextResponse.json({ success: false, error: fallback }, { status: 500 });
}
