"use client";

import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "@/components/Projects";
import Advisory from "@/components/Advisory";
import Contact from "@/components/Contact";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
    ],
    description: siteConfig.description,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        data-testid="json-ld"
      />
      <About />
      <Experience />
      <Projects />
      <Advisory />
      <Contact />
    </div>
  );
}
