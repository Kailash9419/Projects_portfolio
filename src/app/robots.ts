import type { MetadataRoute } from "next";
import { SEO } from "@/data/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
  };
}
