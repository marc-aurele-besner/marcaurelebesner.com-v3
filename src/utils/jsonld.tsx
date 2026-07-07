import { type ExperienceData, experiences } from "@/config/experience";
import type { ProjectData } from "@/config/projects";
import { siteConfig } from "@/config/site";

/**
 * Centralized JSON-LD helpers.
 *
 * All helpers return plain objects suitable for serialization into a
 * `<script type="application/ld+json">` tag. The wrapper component
 * `JsonLdScript` injects the script and is safe to render from server
 * components, so structured data always ships in initial HTML.
 */

export interface JsonLdNode {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

function person(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    image: `${siteConfig.url}/opengraph-image`,
    knowsAbout: siteConfig.person.knowsAbout,
    hasOccupation: siteConfig.person.hasOccupation.map((entry) => ({
      "@type": "Occupation",
      name: entry.role,
      occupationLocation: {
        "@type": "Country",
        name: "Canada",
      },
      description: entry.occupation,
    })),
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
    ],
    worksFor: experiences.slice(0, 3).map((exp) => ({
      "@type": "Organization",
      name: exp.company,
      url: exp.companyUrl,
    })),
  };
}

/**
 * Homepage Person schema, exposed as a top-level (non-graph) document so
 * the JSON-LD in `<head>` is small and easy for crawlers to parse.
 */
export function personJsonLd(): JsonLdNode {
  return person();
}

/**
 * BreadcrumbList entries for a typical detail-page trail.
 */
export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function breadcrumbListJsonLd(
  items: ReadonlyArray<BreadcrumbItem>,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/**
 * Convert a "Apr 2024" / "2022" label to ISO-8601 month / year. Returns
 * `null` for unparseable input. Used to populate `startDate` and
 * `endDate` on OrganizationRole entries.
 */
function toIsoOrNull(label: string): string | null {
  const trimmed = label.trim();
  if (!trimmed) return null;
  if (/^\d{4}$/.test(trimmed)) return trimmed;
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(trimmed);
  if (!match) return null;
  const monthNumber: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const month = monthNumber[match[1] as keyof typeof monthNumber];
  if (!month) return null;
  return `${match[2]}-${month}`;
}

/**
 * OrganizationRole for a single experience entry, with a nested
 * Organization describing the employer. This is the schema.org
 * recommended way to represent a position on a CV.
 */
export function organizationRoleJsonLd(exp: ExperienceData): JsonLdNode {
  const start = toIsoOrNull(exp.startDate);
  const end = toIsoOrNull(exp.endDate);
  return {
    "@context": "https://schema.org",
    "@type": "OrganizationRole",
    roleName: exp.title,
    startDate: start,
    endDate: end,
    description: exp.description,
    skills: exp.skills.join(", "),
    member: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    organization: {
      "@type": "Organization",
      name: exp.company,
      url: exp.companyUrl,
    },
  };
}

/**
 * Work history graph for the homepage. Combines the Person schema with
 * one OrganizationRole per experience, surfaced as a `@graph` so that
 * the homepage advertises the work history directly.
 */
export function workHistoryJsonLd(
  items: ReadonlyArray<ExperienceData>,
): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [person(), ...items.map(organizationRoleJsonLd)],
  };
}

/**
 * SoftwareApplication schema for a project entry.
 */
export function softwareApplicationJsonLd(
  project: ProjectData,
  slug: string,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    image: `${siteConfig.url}${project.imageSrc}`,
    url: project.link ?? `${siteConfig.url}/projects/${slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(project.repoLink ? { codeRepository: project.repoLink } : {}),
    keywords: project.badges.join(", "),
  };
}

/**
 * Service schema for advisory offerings.
 */
export interface AdvisoryService {
  name: string;
  description: string;
}

export function professionalServiceJsonLd(
  services: ReadonlyArray<AdvisoryService>,
): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@context": "https://schema.org" as const,
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      serviceType: "Web3 Advisory",
      areaServed: "Worldwide",
    })),
  };
}

/**
 * ContactPage schema for the contact page.
 */
export function contactPageJsonLd(url: string): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url,
    name: `Contact ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, blockchain consulting, or career opportunities.`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      contactPoint: [
        {
          "@type": "ContactPoint",
          url: `${siteConfig.url}/contact`,
          contactType: "collaboration",
        },
      ],
    },
  };
}

/**
 * Renders a JSON-LD object as a server-friendly `<script>` tag. The
 * content is JSON-stringified on the server so it appears in the initial
 * HTML and is independent of any client JS execution. Extra attributes
 * (e.g. `data-testid`) are forwarded to the underlying script element.
 */
export function JsonLdScript({
  data,
  ...rest
}: { data: unknown } & React.HTMLAttributes<HTMLScriptElement>) {
  return (
    <script
      type="application/ld+json"
      {...rest}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
