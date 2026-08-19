export type ProjectCategory =
  | "Web Apps"
  | "AI"
  | "SaaS"
  | "Dashboard"
  | "Mobile"
  | "Automation"
  | "Experiments";

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
  "Web Apps",
  "AI",
  "SaaS",
  "Dashboard",
  "Mobile",
  "Automation",
  "Experiments",
];

export const CATEGORY_FILTER_MAP: Record<string, ProjectCategory | "All"> = {
  ALL: "All",
  WEB: "Web Apps",
  AI: "AI",
  SAAS: "SaaS",
  DASHBOARDS: "Dashboard",
  MOBILE: "Mobile",
  AUTOMATION: "Automation",
  EXPERIMENTS: "Experiments",
};
