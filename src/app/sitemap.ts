import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { projects } from "@/config/projects";

/**
 * Parse an ISO-8601 month string (YYYY-MM) into a Date. Falls back to
 * `fallback` for malformed input so the sitemap still builds.
 */
function parseMonth(value: string, fallback: Date = new Date()): Date {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return fallback;
  const [, year, month] = match;
  const parsed = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages — homepage and content hubs that already exist or are
  // added as part of the SEO improvements in this PR.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/advisory`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Experience pages — use the per-entry updatedAt for accurate freshness.
  const experiencePages: MetadataRoute.Sitemap = experiences.map((exp) => ({
    url: `${baseUrl}/experience/${exp.slug}`,
    lastModified: parseMonth(exp.updatedAt),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  // Project pages — use the per-entry updatedAt for accurate freshness.
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: parseMonth(project.updatedAt),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...experiencePages, ...projectPages];
}
