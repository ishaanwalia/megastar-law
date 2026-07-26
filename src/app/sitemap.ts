import type { MetadataRoute } from "next";
import { practiceAreas } from "@/lib/firm-data";
import { insights } from "@/lib/insights";

const baseUrl = "https://megastarlawassociates.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { route: "", priority: 1, changeFrequency: "monthly" as const },
    { route: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    {
      route: "/practice-areas",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { route: "/why-us", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/insights", priority: 0.6, changeFrequency: "weekly" as const },
    { route: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    {
      route: "/disclaimer",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    { route: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const practiceAreaRoutes = practiceAreas.map((area) => ({
    url: `${baseUrl}/practice-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const insightRoutes = insights.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...practiceAreaRoutes, ...insightRoutes];
}
