import { projects } from "@/constants/projects";
import { siteConfig } from "@/config/site";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = project.title;
  const description = project.summary;
  const url = `/projects/${slug}`;

  return {
    title,
    description,
    keywords: [
      project.title,
      ...project.badges.slice(0, 5),
      "Web3",
      "Blockchain",
      "Project",
      project.projectType === "personal" ? "Personal Project" : "Work Project",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: "article",
      url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      creator: siteConfig.twitterHandle,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // JSON-LD structured data for software application
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        image: `${siteConfig.url}${project.imageSrc}`,
        url: project.link || `${siteConfig.url}/projects/${slug}`,
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
        ...(project.repoLink && {
          codeRepository: project.repoLink,
        }),
        keywords: project.badges.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteConfig.url}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${siteConfig.url}/projects/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-[var(--accent)] hover:brightness-110 transition-all duration-200 font-medium text-sm mb-8 hover:gap-3"
      >
        <span className="transition-transform">&larr;</span>
        Back to Projects
      </Link>

      <GlassCard className="p-8 lg:p-12">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white/95 mb-2">
                {project.title}
              </h1>
              <span
                className={`inline-block px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border border-[var(--accent-weak)] text-[var(--accent)]`}
              >
                {project.projectType === "personal"
                  ? "Personal Project"
                  : "Work Project"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:brightness-110 transition-all duration-200 flex items-center gap-1.5 font-medium"
                >
                  Repository <span>&nearr;</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:brightness-110 transition-all duration-200 flex items-center gap-1.5 font-medium"
                >
                  Website <span>&nearr;</span>
                </a>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50 mb-8">
            <Image
              src={project.imageSrc}
              alt={project.imageAlt}
              className="w-full rounded-lg"
              width={800}
              height={600}
              priority
            />
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-700 dark:text-gray-200/90 leading-relaxed mb-8">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white/95 mb-4">
                Key Features
              </h2>
              <ul className="space-y-3 mb-8">
                {project.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-700 dark:text-gray-200/90"
                  >
                    <span className="text-[var(--accent)] mt-1.5 flex-shrink-0">
                      &bull;
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="text-xl font-bold text-slate-900 dark:text-white/95 mb-4">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <Badge key={badge} text={badge} />
            ))}
          </div>
        </div>
      </GlassCard>

      <nav className="flex justify-between mt-8 gap-4" aria-label="Project navigation">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex-1 text-left"
          >
            <GlassCard className="p-4 hover:scale-[1.01] transition-transform duration-300">
              <span className="text-sm text-slate-500 dark:text-grayTone">
                &larr; Previous
              </span>
              <p className="font-medium text-slate-900 dark:text-white/95 group-hover:text-[var(--accent)] transition-colors">
                {prevProject.title}
              </p>
            </GlassCard>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex-1 text-right"
          >
            <GlassCard className="p-4 hover:scale-[1.01] transition-transform duration-300">
              <span className="text-sm text-slate-500 dark:text-grayTone">
                Next &rarr;
              </span>
              <p className="font-medium text-slate-900 dark:text-white/95 group-hover:text-[var(--accent)] transition-colors">
                {nextProject.title}
              </p>
            </GlassCard>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}
