import type { MetadataRoute } from "next";
import { practiceAreas } from "@/lib/firm-data";

const baseUrl = "https://megastarlawassociates.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/practice-areas",
    "/contact",
    "/disclaimer",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const practiceAreaRoutes = practiceAreas.map((area) => ({
    url: `${baseUrl}/practice-areas/${area.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...practiceAreaRoutes];
}
