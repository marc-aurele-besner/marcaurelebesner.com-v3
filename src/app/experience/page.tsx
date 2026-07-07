import Breadcrumbs from "@/components/Breadcrumbs";
import { ExperienceCard } from "@/components/ExperienceCard";
import { experiences } from "@/config/experience";
import { siteConfig } from "@/config/site";
import {
  JsonLdScript,
  breadcrumbListJsonLd,
  organizationRoleJsonLd,
} from "@/utils/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career timeline of Marc‑Aurele Besner — Web3, AI, and developer-tooling roles across Autonomys, Oamo, Gluwa, and more.",
  keywords: [
    "Web3 Experience",
    "Smart Contract Engineer Experience",
    "AI Engineer Experience",
    "Solidity Engineer",
    "Marc‑Aurele Besner",
  ],
  alternates: { canonical: "/experience" },
  openGraph: {
    title: `Experience | ${siteConfig.name}`,
    description:
      "Career timeline of Marc‑Aurele Besner — Web3, AI, and developer-tooling roles.",
    type: "website",
    url: "/experience",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Experience | ${siteConfig.name}`,
    description:
      "Career timeline of Marc‑Aurele Besner — Web3, AI, and developer-tooling roles.",
    creator: siteConfig.twitterHandle,
  },
};

export default function ExperiencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${siteConfig.name} — Experience`,
        description:
          "Career timeline of Marc‑Aurele Besner — Web3, AI, and developer-tooling roles.",
        url: `${siteConfig.url}/experience`,
        author: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
      breadcrumbListJsonLd([
        { name: "Home", item: siteConfig.url },
        { name: "Experience", item: `${siteConfig.url}/experience` },
      ]),
      ...experiences.map(organizationRoleJsonLd),
    ],
  };

  const web3 = experiences.filter((exp) => exp.isWeb3);
  const other = experiences.filter((exp) => !exp.isWeb3);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <JsonLdScript data={jsonLd} data-testid="json-ld" />
      <Breadcrumbs
        className="mb-6"
        items={[
          { label: "Home", href: "/" },
          { label: "Experience" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white/95">
          Experience
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-grayTone max-w-2xl">
          The full timeline, most-recent first. Web3, AI, and engineering
          leadership roles across startups and protocols.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-grayTone/80">
          {experiences.length} roles · {web3.length} Web3
        </p>
      </header>

      <section aria-labelledby="web3-experience" className="mb-10">
        <h2
          id="web3-experience"
          className="text-xl font-bold text-slate-900 dark:text-white/95 mb-6"
        >
          Web3 &amp; AI
        </h2>
        <div className="space-y-6">
          {web3.map((exp) => (
            <ExperienceCard key={exp.slug} {...exp} />
          ))}
        </div>
      </section>

      {other.length > 0 && (
        <section aria-labelledby="earlier-experience" className="mb-10">
          <h2
            id="earlier-experience"
            className="text-xl font-bold text-slate-900 dark:text-white/95 mb-6"
          >
            Earlier experience
          </h2>
          <div className="space-y-4">
            {other.map((exp) => (
              <ExperienceCard key={exp.slug} {...exp} minimal />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
