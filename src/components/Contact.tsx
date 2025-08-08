import SectionHeading from "./SectionHeading";
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function Contact() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28">
      <SectionHeading eyebrow="Contact">
        <span id="contact-title">Get in touch</span>
      </SectionHeading>
      <p className="text-grayTone max-w-2xl">
        I’m open to collaborating on interesting projects, discussing Web3, or exploring new opportunities. The fastest way to
        reach me is through LinkedIn or Twitter. If you prefer email, you can use the button below.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {contactEmail && (
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 rounded-md bg-lightCyan px-4 py-2 font-medium text-darkBlue hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-lightCyan/50 transition"
          >
            <FaEnvelope />
            Email me
          </a>
        )}
        <a
          href="https://www.linkedin.com/in/marc-aurele-besner/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-grayTone hover:text-lightCyan hover:border-lightCyan/50 transition"
        >
          <FaLinkedin />
          LinkedIn
        </a>
        <a
          href="https://x.com/marcaureleb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-grayTone hover:text-lightCyan hover:border-lightCyan/50 transition"
        >
          <FaTwitter />
          Twitter
        </a>
        <a
          href="https://github.com/marc-aurele-besner"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-grayTone hover:text-lightCyan hover:border-lightCyan/50 transition"
        >
          <FaGithub />
          GitHub
        </a>
      </div>
    </section>
  );
}