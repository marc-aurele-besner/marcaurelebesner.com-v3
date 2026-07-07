import Breadcrumbs from "@/components/Breadcrumbs";
import Contact from "@/components/Contact";
import { siteConfig } from "@/config/site";
import { JsonLdScript, contactPageJsonLd } from "@/utils/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, blockchain consulting, AI advisory, or career opportunities.`,
  keywords: [
    "Contact",
    siteConfig.name,
    "Web3 Developer",
    "Blockchain Engineer",
    "AI Engineer",
    "Collaboration",
    "Hire",
    "Freelance",
    "Advisory",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, blockchain consulting, AI advisory, or career opportunities.`,
    type: "website",
    url: "/contact",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, AI advisory, or career opportunities.`,
    creator: siteConfig.twitterHandle,
  },
};

const faqs = [
  {
    question: "How fast do you reply?",
    answer:
      "I aim to respond to inbound within two business days. For time-sensitive engagements, mention it in your message and I'll prioritise.",
  },
  {
    question: "Are you available for new work?",
    answer:
      "Yes. I take on a small number of new engagements each quarter to keep quality high. The fastest way to confirm availability is to send a short note describing your project.",
  },
  {
    question: "Do you work async or on-site?",
    answer:
      "Async-first. I work remotely across North American and European time zones. On-site workshops are available for retained clients.",
  },
  {
    question: "What's the best way to reach you?",
    answer:
      "Use the form below for project work. For quick questions, DMs on X (@marcaureleb) and LinkedIn are fastest.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      contactPageJsonLd(`${siteConfig.url}/contact`),
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
    <div className="py-4">
      <JsonLdScript data={jsonLd} data-testid="json-ld" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          className="mb-6"
          items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />
      </div>
      <Contact />

      <section
        aria-labelledby="contact-faq"
        className="max-w-4xl mx-auto px-4 sm:px-6 mt-12"
      >
        <h2
          id="contact-faq"
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
    </div>
  );
}
