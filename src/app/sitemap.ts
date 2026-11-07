import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { isProjectIndexable, projects } from "@/config/projects";

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

/**
 * Last meaningful content change (YYYY-MM) for hubs that are not derived
 * from a dataset. Bump these when the page copy changes, so `lastmod`
 * stays stable across deploys that do not touch content.
 */
export const HUB_UPDATED_AT = {
  advisory: "2026-07",
  contact: "2026-07",
} as const;

/** Latest of several YYYY-MM dates, as a Date. */
function latestMonth(values: ReadonlyArray<string>): Date {
  return new Date(
    Math.max(...values.map((value) => parseMonth(value, new Date(0)).getTime())),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Hub freshness comes from the entries each hub lists (or a stored date),
  // never the build clock, so redeploys leave `lastmod` unchanged.
  const projectsUpdatedAt = latestMonth(projects.map((p) => p.updatedAt));
  const experienceUpdatedAt = latestMonth(experiences.map((e) => e.updatedAt));
  const advisoryUpdatedAt = parseMonth(HUB_UPDATED_AT.advisory);
  const contactUpdatedAt = parseMonth(HUB_UPDATED_AT.contact);
  const homeUpdatedAt = new Date(
    Math.max(
      projectsUpdatedAt.getTime(),
      experienceUpdatedAt.getTime(),
      advisoryUpdatedAt.getTime(),
    ),
  );

  // Static pages — homepage and content hubs.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: homeUpdatedAt,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: projectsUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: experienceUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/advisory`,
      lastModified: advisoryUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: contactUpdatedAt,
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
  // Thin entries flagged `noindex` stay reachable but are left out here.
  const projectPages: MetadataRoute.Sitemap = projects
    .filter(isProjectIndexable)
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: parseMonth(project.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...experiencePages, ...projectPages];
}
