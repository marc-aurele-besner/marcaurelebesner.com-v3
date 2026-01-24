import { experiences } from "@/constants/experience";
import { siteConfig } from "@/config/site";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ExperiencePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  const title = `${experience.title} at ${experience.company}`;
  const description = experience.summary;
  const url = `/experience/${slug}`;

  return {
    title,
    description,
    keywords: [
      experience.title,
      experience.company,
      ...experience.skills.slice(0, 5),
      "Web3",
      "Blockchain",
      "Software Engineer",
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

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    notFound();
  }

  const currentIndex = experiences.findIndex((exp) => exp.slug === slug);
  const prevExperience = currentIndex > 0 ? experiences[currentIndex - 1] : null;
  const nextExperience =
    currentIndex < experiences.length - 1 ? experiences[currentIndex + 1] : null;

  // JSON-LD structured data for work experience
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${experience.title} at ${experience.company}`,
        description: experience.summary,
        author: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/experience/${slug}`,
        },
        about: {
          "@type": "Organization",
          name: experience.company,
          url: experience.companyUrl,
        },
        keywords: experience.skills.join(", "),
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
            name: "Experience",
            item: `${siteConfig.url}/#experience`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${experience.title} at ${experience.company}`,
            item: `${siteConfig.url}/experience/${slug}`,
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
        href="/#experience"
        className="inline-flex items-center gap-2 text-[var(--accent)] hover:brightness-110 transition-all duration-200 font-medium text-sm mb-8 hover:gap-3"
      >
        <span className="transition-transform">&larr;</span>
        Back to Experience
      </Link>

      <GlassCard className="p-8 lg:p-12">
        <header className="mb-8 pb-8 border-b border-slate-200 dark:border-white/10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white/95 mb-2">
            {experience.title}
          </h1>
          <p className="text-xl text-slate-700 dark:text-gray-200/90">
            {experience.companyUrl ? (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
              >
                {experience.company}
              </a>
            ) : (
              experience.company
            )}
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500 dark:text-grayTone">
            <span>{experience.startDate} - {experience.endDate}</span>
            <span className="capitalize">{experience.location}</span>
            <span className="capitalize px-2 py-0.5 rounded-full border border-slate-300 dark:border-white/10">
              {experience.type}
            </span>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-700 dark:text-gray-200/90 leading-relaxed mb-8">
            {experience.description}
          </p>

          {experience.highlights.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white/95 mb-4">
                Key Achievements
              </h2>
              <ul className="space-y-3 mb-8">
                {experience.highlights.map((highlight, index) => (
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
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <Badge key={skill} text={skill} />
            ))}
          </div>
        </div>
      </GlassCard>

      <nav className="flex justify-between mt-8 gap-4" aria-label="Experience navigation">
        {prevExperience ? (
          <Link
            href={`/experience/${prevExperience.slug}`}
            className="group flex-1 text-left"
          >
            <GlassCard className="p-4 hover:scale-[1.01] transition-transform duration-300">
              <span className="text-sm text-slate-500 dark:text-grayTone">
                &larr; Previous
              </span>
              <p className="font-medium text-slate-900 dark:text-white/95 group-hover:text-[var(--accent)] transition-colors">
                {prevExperience.title}
              </p>
              <p className="text-sm text-slate-600 dark:text-grayTone">
                {prevExperience.company}
              </p>
            </GlassCard>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextExperience ? (
          <Link
            href={`/experience/${nextExperience.slug}`}
            className="group flex-1 text-right"
          >
            <GlassCard className="p-4 hover:scale-[1.01] transition-transform duration-300">
              <span className="text-sm text-slate-500 dark:text-grayTone">
                Next &rarr;
              </span>
              <p className="font-medium text-slate-900 dark:text-white/95 group-hover:text-[var(--accent)] transition-colors">
                {nextExperience.title}
              </p>
              <p className="text-sm text-slate-600 dark:text-grayTone">
                {nextExperience.company}
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
