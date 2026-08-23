export type ProjectCategory =
  | "SaaS"
  | "Web Apps"
  | "E-commerce"
  | "Automation"
  | "Dashboard";

export type SortOption = "newest" | "oldest" | "featured";

export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;

  category: ProjectCategory;

  year: number;

  featured: boolean;

  coverImage: string;
  screenshots: string[];

  technologies: string[];

  liveUrl?: string;
  githubUrl?: string;

  problem?: string;
  solution?: string;

  features?: string[];

  results?: {
    label: string;
    value: string;
  }[];

  accentColor?: string;
};

export const CATEGORIES: ProjectCategory[] = [
  "SaaS",
  "Web Apps",
  "E-commerce",
  "Automation",
  "Dashboard",
];

export const CATEGORY_FILTER_MAP: Record<string, ProjectCategory | "All"> = {
  ALL: "All",
  SAAS: "SaaS",
  WEB: "Web Apps",
  ECOMMERCE: "E-commerce",
  AUTOMATION: "Automation",
  DASHBOARDS: "Dashboard",
};
