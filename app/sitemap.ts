import type { MetadataRoute } from "next";
import { projects } from "@/components/portfolio-data";

const BASE_URL = "https://rohitmoningi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
