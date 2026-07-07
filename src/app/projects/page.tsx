import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/GlassCard";
import { Project } from "@/components/Project";
import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { DEFAULT_BLUR_DATA_URL } from "@/utils/blur";
import {
  JsonLdScript,
  breadcrumbListJsonLd,
  softwareApplicationJsonLd,
} from "@/utils/jsonld";
import { formatProjectType } from "@/utils/project-type";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web3, AI, and developer-tooling projects by Marc‑Aurele Besner. Solidity smart contracts, SDKs, block explorers, and AI agents.",
  keywords: [
    "Web3 Projects",
    "Smart Contract Projects",
    "AI Projects",
    "SDK Projects",
    "Blockchain Portfolio",
    "Marc‑Aurele Besner",
  ],
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "Web3, AI, and developer-tooling projects by Marc‑Aurele Besner.",
    type: "website",
    url: "/projects",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.name}`,
    description:
      "Web3, AI, and developer-tooling projects by Marc‑Aurele Besner.",
    creator: siteConfig.twitterHandle,
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${siteConfig.name} — Projects`,
        description:
          "Web3, AI, and developer-tooling projects by Marc‑Aurele Besner.",
        url: `${siteConfig.url}/projects`,
        author: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
      breadcrumbListJsonLd([
        { name: "Home", item: siteConfig.url },
        { name: "Projects", item: `${siteConfig.url}/projects` },
      ]),
      ...projects.map((p) => softwareApplicationJsonLd(p, p.slug)),
    ],
  };

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <JsonLdScript data={jsonLd} data-testid="json-ld" />
      <Breadcrumbs
        className="mb-6"
        items={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white/95">
          Projects
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-grayTone max-w-2xl">
          A cross-section of recent Web3, AI, and developer-tooling work. Each
          project page includes the problem, stack, and what shipped.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-grayTone/80">
          {projects.length} projects · {featured.length} featured
        </p>
      </header>

      {featured.length > 0 && (
        <section aria-labelledby="featured-projects" className="mb-12">
          <h2
            id="featured-projects"
            className="text-xl font-bold text-slate-900 dark:text-white/95 mb-6"
          >
            Featured
          </h2>
          <div className="space-y-8">
            {featured.map((project) => (
              <Project key={project.slug} {...project} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section aria-labelledby="more-projects" className="mb-12">
          <h2
            id="more-projects"
            className="text-xl font-bold text-slate-900 dark:text-white/95 mb-6"
          >
            More projects
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rest.map((project) => (
              <li key={project.slug}>
                <GlassCard className="p-4 h-full hover:scale-[1.01] transition-transform">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-start gap-4"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800/50">
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        placeholder="blur"
                        blurDataURL={DEFAULT_BLUR_DATA_URL}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white/95 truncate">
                        {project.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-grayTone line-clamp-2">
                        {project.summary}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-[var(--accent)] mt-1">
                        {formatProjectType(project.projectType)}
                      </p>
                    </div>
                  </Link>
                </GlassCard>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
