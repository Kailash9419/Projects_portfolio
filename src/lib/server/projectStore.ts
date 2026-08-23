import fs from "fs/promises";
import path from "path";
import { Project } from "@/types/project";
import defaultProjects from "@/data/projects.json";

const DATA_FILE = path.join(process.cwd(), "src", "data", "projects.json");

export async function readProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data) as Project[];
  } catch (error) {
    console.warn("Could not read projects.json, falling back to default:", error);
    return defaultProjects as unknown as Project[];
  }
}

export async function writeProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), "utf-8");
}

export async function saveProject(projectData: Omit<Project, "id"> & { id?: string }): Promise<Project> {
  const list = await readProjects();
  
  if (projectData.id) {
    // Update existing
    const index = list.findIndex((p) => p.id === projectData.id);
    if (index === -1) {
      throw new Error(`Project with ID ${projectData.id} not found`);
    }
    const updated: Project = {
      ...(projectData as Project),
      slug: projectData.slug || slugify(projectData.title),
    };
    list[index] = updated;
    await writeProjects(list);
    return updated;
  } else {
    // Create new
    const newId = String(Date.now());
    const newProject: Project = {
      ...projectData,
      id: newId,
      slug: projectData.slug || slugify(projectData.title),
      year: projectData.year || new Date().getFullYear(),
      featured: projectData.featured ?? false,
      technologies: projectData.technologies || [],
      screenshots: projectData.screenshots || [],
      coverImage: projectData.coverImage || "/placeholder-project.svg",
    };
    list.unshift(newProject); // Add at beginning
    await writeProjects(list);
    return newProject;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  const list = await readProjects();
  const filtered = list.filter((p) => p.id !== id);
  if (filtered.length === list.length) return false;
  await writeProjects(filtered);
  return true;
}

export async function toggleFeaturedProject(id: string): Promise<Project | null> {
  const list = await readProjects();
  const project = list.find((p) => p.id === id);
  if (!project) return null;
  project.featured = !project.featured;
  await writeProjects(list);
  return project;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
