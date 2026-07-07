import Breadcrumbs from "@/components/Breadcrumbs";
import { advisoryServices } from "@/config/advisory";
import { siteConfig } from "@/config/site";
import {
  JsonLdScript,
  breadcrumbListJsonLd,
  professionalServiceJsonLd,
} from "@/utils/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advisory",
  description:
    "Web3 and AI advisory with Marc‑Aurele Besner — smart contract architecture, SDK & DevTooling, product & engineering strategy, and team augmentation. Hourly, retainer, or project-based.",
  keywords: [
    "Web3 Advisory",
    "Smart Contract Consultant",
    "Solidity Advisory",
    "Web3 Consultant",
    "Smart Contract Architect",
    "AI Agents Consultant",
    "Marc‑Aurele Besner",
  ],
  alternates: { canonical: "/advisory" },
  openGraph: {
    title: `Advisory | ${siteConfig.name}`,
    description:
      "Web3 and AI advisory with Marc‑Aurele Besner — smart contracts, SDKs, and engineering strategy.",
    type: "website",
    url: "/advisory",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Advisory | ${siteConfig.name}`,
    description:
      "Web3 and AI advisory with Marc‑Aurele Besner — smart contracts, SDKs, and engineering strategy.",
    creator: siteConfig.twitterHandle,
  },
};

const engagementTypes = [
  {
    label: "Hourly",
    description: "Flexible consulting for specific questions or code reviews",
  },
  {
    label: "Retainer",
    description: "Ongoing advisory with dedicated weekly hours",
  },
  {
    label: "Project-Based",
    description: "Fixed-scope engagements for defined deliverables",
  },
];

const faqs = [
  {
    question: "What types of projects do you take on?",
    answer:
      "Early-stage Web3, AI, and developer-tooling teams. I focus on smart contracts, SDKs, AI agents, and infrastructure — anything where deep technical expertise compounds with product judgment.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most engagements kick off within 1–2 weeks. I reply to inbound within two business days and can usually fit a discovery call inside the same week.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. Standard mutual NDAs are no problem. I can also work inside your existing legal templates.",
  },
  {
    question: "What's your typical engagement size?",
    answer:
      "Anything from a one-hour code review to multi-month retainers. Project-based work is usually scoped between 2 and 12 weeks.",
  },
  {
    question: "Do you write code, or just advise?",
    answer:
      "Both. Architecture reviews, design docs, and code audits are common. I also embed as a hands-on engineer for SDKs, smart contracts, and infrastructure when that is the fastest path to shipping.",
  },
];

export default function AdvisoryPage() {
  const serviceJsonLd = professionalServiceJsonLd(advisoryServices);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: `${siteConfig.name} — Web3 & AI Advisory`,
        description:
          "Smart contract architecture, SDK and DevTooling, product and engineering strategy, and team augmentation for early-stage Web3 and AI teams.",
        url: `${siteConfig.url}/advisory`,
        provider: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: "Worldwide",
        serviceType: "Web3 Advisory",
      },
      breadcrumbListJsonLd([
        { name: "Home", item: siteConfig.url },
        { name: "Advisory", item: `${siteConfig.url}/advisory` },
      ]),
      ...serviceJsonLd["@graph"],
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <JsonLdScript data={jsonLd} data-testid="json-ld" />
      <Breadcrumbs
        className="mb-6"
        items={[
          { label: "Home", href: "/" },
          { label: "Advisory" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white/95">
          Work with me
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-grayTone max-w-2xl">
          I advise early-stage Web3 and AI teams on smart contracts,
          infrastructure, developer experience, and engineering strategy.
          Whether you need architecture guidance, code reviews, or hands-on
          engineering support, I can help you ship with confidence.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-grayTone/80">
          Hourly · Retainer · Project-based
        </p>
      </header>

      <section aria-labelledby="services" className="mb-12">
        <h2
          id="services"
          className="text-2xl font-bold text-slate-900 dark:text-white/95 mb-6"
        >
          Services
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advisoryServices.map((service) => (
            <li
              key={service.name}
              className="rounded-lg border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white/95 mb-1">
                {service.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-grayTone leading-relaxed">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="engagement-types" className="mb-12">
        <h2
          id="engagement-types"
          className="text-2xl font-bold text-slate-900 dark:text-white/95 mb-6"
        >
          Engagement types
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {engagementTypes.map((type) => (
            <div
              key={type.label}
              className="text-center p-4 rounded-lg border-2 border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/5"
            >
              <p className="font-medium text-[var(--accent)] mb-1">
                {type.label}
              </p>
              <p className="text-xs text-slate-600 dark:text-grayTone">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faqs" className="mb-12">
        <h2
          id="faqs"
          className="text-2xl font-bold text-slate-900 dark:text-white/95 mb-6"
        >
          Frequently asked questions
        </h2>
        <dl className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-lg border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 p-5"
            >
              <dt className="font-semibold text-slate-900 dark:text-white/95 mb-2">
                {faq.question}
              </dt>
              <dd className="text-sm text-slate-600 dark:text-grayTone leading-relaxed">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="cta"
        className="rounded-lg border border-[var(--accent-weak)] bg-[var(--accent-bg-weak)] p-6 text-center"
      >
        <h2
          id="cta"
          className="text-2xl font-bold text-slate-900 dark:text-white/95 mb-2"
        >
          Ready to talk?
        </h2>
        <p className="text-slate-600 dark:text-grayTone mb-6 max-w-xl mx-auto">
          Send a short note about your project and what you&apos;re trying to
          ship. I&apos;ll reply within two business days.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-darkBlue font-semibold px-6 py-3 hover:brightness-110 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-[var(--accent)]/20"
        >
          Get in touch
          <span aria-hidden>→</span>
        </a>
      </section>
    </div>
  );
}
