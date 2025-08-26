export const siteConfig = {
  name: "Marc‑Aurele Besner",
  role: "Web3 Full‑Stack Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcaurelebesner.com",
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