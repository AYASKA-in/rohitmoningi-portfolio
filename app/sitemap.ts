import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: site.url, priority: 1, lastModified: "2026-11-23" }, ...["projects", "about", "contact"].map(s => ({ url: `${site.url}/${s}`, priority: 0.8, ...(s === "about" ? { lastModified: "2026-11-23" } : {}) })), ...projects.map(p => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.7 }))]; }
