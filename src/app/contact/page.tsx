import Contact from "@/components/Contact";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, blockchain consulting, or career opportunities.`,
  keywords: [
    "Contact",
    siteConfig.name,
    "Web3 Developer",
    "Blockchain Engineer",
    "Collaboration",
    "Hire",
    "Freelance",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, blockchain consulting, or career opportunities.`,
    type: "website",
    url: "/contact",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, or career opportunities.`,
    creator: siteConfig.twitterHandle,
  },
};

export default function ContactPage() {
  return (
    <div className="py-4">
      <Contact />
    </div>
  );
}
