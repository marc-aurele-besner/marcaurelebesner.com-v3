import SectionHeading from "./SectionHeading";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28">
      <SectionHeading eyebrow="Contact">
        <span id="contact-title">Get in touch</span>
      </SectionHeading>
      <p className="text-slate-600 dark:text-grayTone max-w-2xl">
        I’m open to collaborating on interesting projects, discussing Web3, or exploring new opportunities. The fastest way to
        reach me is via LinkedIn or Twitter.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href="https://www.linkedin.com/in/marc-aurele-besner/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-lightCyan hover:border-lightCyan/50 transition"
        >
          <FaLinkedin />
          LinkedIn
        </a>
        <a
          href="https://x.com/marcaureleb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-lightCyan hover:border-lightCyan/50 transition"
        >
          <FaTwitter />
          Twitter
        </a>
        <a
          href="https://github.com/marc-aurele-besner"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 text-slate-600 dark:text-grayTone hover:text-lightCyan hover:border-lightCyan/50 transition"
        >
          <FaGithub />
          GitHub
        </a>
      </div>
    </section>
  );
}