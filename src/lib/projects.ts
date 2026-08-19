import { projects } from "@/data/projects";
import { Project, ProjectCategory, SortOption } from "@/types/project";

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase().trim();
  if (!q) return projects;

  return projects.filter((p) => {
    const searchable = [
      p.title,
      p.tagline,
      p.description,
      p.category,
      ...p.technologies,
      ...(p.features || []),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(q);
  });
}

export function sortProjects(
  items: Project[],
  sortBy: SortOption
): Project[] {
  const sorted = [...items];
  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => b.year - a.year);
    case "oldest":
      return sorted.sort((a, b) => a.year - b.year);
    case "featured":
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.year - a.year;
      });
    default:
      return sorted;
  }
}

export function filterProjects(
  items: Project[],
  category: ProjectCategory | "All"
): Project[] {
  if (category === "All") return items;
  return items.filter((p) => p.category === category);
}

export function getAdjacentProjects(
  slug: string
): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return { prev, next };
}

export function getProjectCategories(): {
  category: ProjectCategory;
  count: number;
}[] {
  const counts: Record<string, number> = {};
  projects.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return Object.entries(counts).map(([category, count]) => ({
    category: category as ProjectCategory,
    count,
  }));
}
