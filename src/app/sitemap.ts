import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { SEO } from "@/data/brand";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const now = new Date();

  return [
    { url: SEO.siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SEO.siteUrl}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${SEO.siteUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
