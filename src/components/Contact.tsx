"use client";

import { siteConfig } from "@/config/site";
import { trackSocialLink } from "@/utils/analytics";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-28"
    >
      <SectionHeading eyebrow="Contact">
        <span id="contact-title">Get in touch</span>
      </SectionHeading>
      <p className="text-slate-600 dark:text-grayTone max-w-2xl">
        I’m open to collaborating on interesting projects, discussing Web3, or
        exploring new opportunities. The fastest way to reach me is via
        LinkedIn, Twitter, or Instagram.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackSocialLink("github", siteConfig.links.github)}
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
        >
          <FaGithub />
          GitHub
        </a>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackSocialLink("linkedin", siteConfig.links.linkedin)}
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
        >
          <FaLinkedin />
          LinkedIn
        </a>
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackSocialLink("twitter", siteConfig.links.twitter)}
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
        >
          <FaTwitter />
          Twitter
        </a>
        <a
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackSocialLink("instagram", siteConfig.links.instagram)
          }
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
        >
          <FaInstagram />
          Instagram
        </a>
      </div>
    </section>
  );
}
