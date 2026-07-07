import { type IconType } from "react-icons";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

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
  role: "Senior Web3/AI Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcaurelebesner.com",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  googleSiteVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  twitterHandle: "@marcaureleb",
  description:
    "Senior Web3/AI engineer building smart contracts, AI agents, infrastructure, and developer tools. Advises early‑stage teams on product, engineering, and architecture.",
  keywords: [
    "Web3",
    "AI",
    "AI Agents",
    "Smart Contracts",
    "Solidity",
    "Blockchain",
    "DevTooling",
    "SDK",
    "TypeScript",
    "Next.js",
    "React",
    "Ethereum",
    "DeFi",
    "Decentralized Infrastructure",
    "Advisory",
    "Advisor",
  ],
  // Surfaces the canonical Person schema in one place. Consumers
  // (homepage JSON-LD, Person mentions elsewhere) read from this object.
  person: {
    knowsAbout: [
      "Web3",
      "Smart Contracts",
      "Solidity",
      "AI Agents",
      "Decentralized Infrastructure",
      "DevTooling",
      "SDK Design",
      "Next.js",
      "TypeScript",
      "React",
      "Ethereum",
      "DeFi",
      "IPLD",
      "Polkadot.js",
    ],
    hasOccupation: [
      {
        role: "Senior Web3/AI Engineer",
        occupation: "Independent Engineer & Advisor",
      },
    ],
  },
  links: {
    github: "https://github.com/marc-aurele-besner",
    linkedin: "https://www.linkedin.com/in/marc-aurele-besner/",
    twitter: "https://x.com/marcaureleb",
    instagram: "https://www.instagram.com/mabesner/",
  },
};

export type SiteConfig = typeof siteConfig;

// Single source of truth for social platforms (consumed by Menu and Contact).
export const socialLinks = [
  {
    platform: "github",
    href: siteConfig.links.github,
    label: "GitHub",
    title: "GitHub",
    icon: FaGithub,
  },
  {
    platform: "linkedin",
    href: siteConfig.links.linkedin,
    label: "LinkedIn",
    title: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    platform: "twitter",
    href: siteConfig.links.twitter,
    label: "Twitter",
    title: "Twitter/X",
    icon: FaTwitter,
  },
  {
    platform: "instagram",
    href: siteConfig.links.instagram,
    label: "Instagram",
    title: "Instagram",
    icon: FaInstagram,
  },
] as const satisfies ReadonlyArray<{
  platform: string;
  href: string;
  label: string;
  title: string;
  icon: IconType;
}>;

export type SocialPlatform = (typeof socialLinks)[number]["platform"];