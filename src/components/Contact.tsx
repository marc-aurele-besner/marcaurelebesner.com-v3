import SectionHeading from "./SectionHeading";
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28">
      <SectionHeading eyebrow="Contact">
        <span id="contact-title">Get in touch</span>
      </SectionHeading>
      <p className="text-slate-600 dark:text-grayTone max-w-2xl">
        I'm open to collaborating on interesting projects, discussing Web3, or exploring new opportunities. Send me a message directly or reach out via social media.
      </p>
      
      <ContactForm />

      <div className="mt-8">
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">Or connect with me on:</p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
          >
            <FaGithub />
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
          >
            <FaLinkedin />
            LinkedIn
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
          >
            <FaTwitter />
            Twitter
          </a>
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
          >
            <FaInstagram />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}