import SectionHeading from "./SectionHeading";
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import { siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28">
      <SectionHeading eyebrow="Contact">
        <span id="contact-title">Get in touch</span>
      </SectionHeading>
      <p className="text-slate-600 dark:text-grayTone max-w-2xl">
        I’m open to collaborating on interesting projects, discussing Web3, or exploring new opportunities. The fastest way to
        reach me is via LinkedIn, Twitter, or Instagram.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 dark:border-[var(--cyber-cyan)]/30 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:border-[var(--accent)] dark:hover:border-[var(--cyber-cyan)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-105"
        >
          <FaGithub />
          GitHub
        </a>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 dark:border-[var(--cyber-cyan)]/30 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:border-[var(--accent)] dark:hover:border-[var(--cyber-cyan)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-105"
        >
          <FaLinkedin />
          LinkedIn
        </a>
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 dark:border-[var(--cyber-cyan)]/30 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:border-[var(--accent)] dark:hover:border-[var(--cyber-cyan)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-105"
        >
          <FaTwitter />
          Twitter
        </a>
        <a
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 dark:border-[var(--cyber-cyan)]/30 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:border-[var(--accent)] dark:hover:border-[var(--cyber-cyan)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-105"
        >
          <FaInstagram />
          Instagram
        </a>
      </div>
    </section>
  );
}