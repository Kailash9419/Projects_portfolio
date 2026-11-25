import { unstable_cache } from "next/cache";
import { readProjects } from "@/lib/server/projectStore";
import { Project } from "@/types/project";

export const PROJECTS_TAG = "projects";

/**
 * Cached project list for public pages. Admin mutations call
 * `revalidateTag(PROJECTS_TAG, { expire: 0 })` so changes show up immediately.
 */
export const getAllProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const projects = await readProjects();
    return projects.filter((p) => p && p.title && p.title.trim().length > 0);
  },
  ["projects:all"],
  { tags: [PROJECTS_TAG] }
);

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getAllProjects()).filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await getAllProjects()).find((p) => p.slug === slug);
}

export async function getAdjacentProjects(
  slug: string
): Promise<{ prev: Project | null; next: Project | null }> {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
