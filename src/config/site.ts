export const ogImageSize = {
  width: 1200,
  height: 630,
};

// Single source of truth for the section nav (used by Header, Menu, useActiveSection).
export const navItems = [
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#advisory", label: "Advisory", id: "advisory" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export type NavItem = typeof navItems[number];
export type SectionId = NavItem["id"];
export const DEFAULT_SECTIONS: readonly SectionId[] = navItems.map((item) => item.id);

export const siteConfig = {
  name: "Marc‑Aurele Besner",
  role: "Web3 Full‑Stack Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcaurelebesner.com",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  twitterHandle: "@marcaureleb",
  description:
    "Web3 full‑stack engineer building blockchain apps, smart contracts, and open‑source tools. Advises early‑stage teams on product, engineering, and smart contracts.",
  keywords: [
    "Web3",
    "Full‑Stack",
    "Blockchain",
    "Smart Contracts",
    "Solidity",
    "TypeScript",
    "Next.js",
    "React",
    "Ethereum",
    "Crypto",
    "Advisory",
    "Advisor",
    "Mentorship",
  ],
  links: {
    github: "https://github.com/marc-aurele-besner",
    linkedin: "https://www.linkedin.com/in/marc-aurele-besner/",
    twitter: "https://x.com/marcaureleb",
    instagram: "https://www.instagram.com/mabesner/",
  },
};

export type SiteConfig = typeof siteConfig;