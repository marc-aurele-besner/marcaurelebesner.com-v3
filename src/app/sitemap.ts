import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { projects } from "@/config/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Experience pages
  const experiencePages: MetadataRoute.Sitemap = experiences.map((exp) => ({
    url: `${baseUrl}/experience/${exp.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  // Project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...experiencePages, ...projectPages];
}
