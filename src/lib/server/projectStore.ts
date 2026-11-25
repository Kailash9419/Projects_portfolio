import fs from "fs/promises";
import path from "path";
import { put, list, del } from "@vercel/blob";
import { Project, CATEGORIES } from "@/types/project";
import seedProjects from "@/data/projects.json";

/**
 * Project storage.
 *
 * - Production (Vercel): projects live in Vercel Blob as a JSON document. Each
 *   write creates a new, uniquely-named blob and removes the older ones, so a
 *   read never hits a stale CDN copy.
 * - Local development (no BLOB_READ_WRITE_TOKEN): projects live in
 *   src/data/projects.json, which also seeds the Blob store on first read.
 */

const BLOB_PREFIX = "data/projects";
const LOCAL_FILE = path.join(process.cwd(), "src", "data", "projects.json");

export const isBlobStorageEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export class StorageNotConfiguredError extends Error {
  constructor() {
    super(
      "Storage is not configured. Connect a Vercel Blob store (BLOB_READ_WRITE_TOKEN) to save changes in production."
    );
  }
}

function assertWritable() {
  // Vercel's filesystem is read-only/ephemeral, so local writes would silently vanish.
  if (!isBlobStorageEnabled() && process.env.VERCEL) {
    throw new StorageNotConfiguredError();
  }
}

export async function readProjects(): Promise<Project[]> {
  if (isBlobStorageEnabled()) {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    if (blobs.length === 0) return seedProjects as Project[];
    const latest = blobs.reduce((a, b) =>
      new Date(a.uploadedAt) > new Date(b.uploadedAt) ? a : b
    );
    const res = await fetch(latest.url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
    return (await res.json()) as Project[];
  }

  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf-8")) as Project[];
  } catch {
    return seedProjects as Project[];
  }
}

async function writeProjects(projects: Project[]): Promise<void> {
  assertWritable();
  const json = JSON.stringify(projects, null, 2);

  if (isBlobStorageEnabled()) {
    const { blobs: previous } = await list({ prefix: BLOB_PREFIX });
    await put(`${BLOB_PREFIX}.json`, json, {
      access: "public",
      addRandomSuffix: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    if (previous.length) await del(previous.map((b) => b.url));
    return;
  }

  await fs.writeFile(LOCAL_FILE, json + "\n", "utf-8");
}

export type ProjectInput = Partial<Project> & Pick<Project, "title" | "tagline" | "category">;

export class ValidationError extends Error {}

/** Whitelists and normalises fields coming from the admin form. */
function sanitize(input: ProjectInput, existing?: Project): Omit<Project, "id"> {
  const str = (v: unknown, max = 5000) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";
  const strList = (v: unknown) =>
    Array.isArray(v) ? v.map((x) => str(x, 500)).filter(Boolean) : [];
  const url = (v: unknown) => {
    const s = str(v, 2000);
    if (!s) return undefined;
    if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
    throw new ValidationError(`Invalid URL: ${s}`);
  };

  const title = str(input.title, 200);
  const tagline = str(input.tagline, 300);
  if (!title || !tagline) throw new ValidationError("Title and tagline are required.");
  if (!CATEGORIES.includes(input.category)) throw new ValidationError("Invalid category.");

  const year = Number(input.year) || existing?.year || new Date().getFullYear();
  const accent = str(input.accentColor, 20);

  return {
    slug: slugify(str(input.slug, 200) || title),
    title,
    tagline,
    description: str(input.description),
    category: input.category,
    year,
    featured: Boolean(input.featured),
    coverImage: url(input.coverImage) || "/placeholder-project.svg",
    screenshots: strList(input.screenshots).map((s) => url(s)!).filter(Boolean),
    technologies: strList(input.technologies),
    liveUrl: url(input.liveUrl),
    githubUrl: url(input.githubUrl),
    problem: str(input.problem) || undefined,
    solution: str(input.solution) || undefined,
    features: strList(input.features),
    results: Array.isArray(input.results)
      ? input.results
          .map((r) => ({ label: str(r?.label, 100), value: str(r?.value, 50) }))
          .filter((r) => r.label && r.value)
      : [],
    accentColor: /^#[0-9a-f]{3,8}$/i.test(accent) ? accent : undefined,
  };
}

export async function saveProject(input: ProjectInput & { id?: string }): Promise<Project> {
  const list = await readProjects();
  const existing = input.id ? list.find((p) => p.id === input.id) : undefined;
  if (input.id && !existing) throw new ValidationError(`Project ${input.id} not found`);

  const data = sanitize(input, existing);
  const slugTaken = (slug: string) => list.some((p) => p.slug === slug && p.id !== input.id);
  if (slugTaken(data.slug)) {
    if (existing) {
      throw new ValidationError(`Another project already uses the slug "${data.slug}".`);
    }
    // New project with a duplicate title: suffix the slug instead of failing.
    let n = 2;
    while (slugTaken(`${data.slug}-${n}`)) n++;
    data.slug = `${data.slug}-${n}`;
  }

  let saved: Project;
  if (existing) {
    saved = { ...data, id: existing.id };
    list[list.indexOf(existing)] = saved;
  } else {
    saved = { ...data, id: String(Date.now()) };
    list.unshift(saved);
  }
  await writeProjects(list);
  return saved;
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
