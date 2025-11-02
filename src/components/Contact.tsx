import SectionHeading from "./SectionHeading";
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import GlassCard from "./GlassCard";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28">
      <SectionHeading eyebrow="Contact">
        <span id="contact-title">Get in touch</span>
      </SectionHeading>
      
      <GlassCard className="p-6 max-w-2xl">
        <p className="text-slate-700 dark:text-gray-300/90 leading-relaxed">
          I&apos;m open to collaborating on <span className="text-cyber-purple font-semibold">interesting projects</span>, discussing <span className="text-cyber-blue font-semibold">Web3</span>, or exploring new opportunities. The fastest way to
          reach me is via the platforms below.
        </p>
        
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded border-2 border-cyber-blue/40 px-5 py-2.5 text-cyber-blue dark:text-cyber-blue font-semibold hover:bg-cyber-blue/10 hover:border-cyber-blue/60 transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaGithub className="relative z-10" />
            <span className="relative z-10">GitHub</span>
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded border-2 border-cyber-purple/40 px-5 py-2.5 text-cyber-purple dark:text-cyber-purple font-semibold hover:bg-cyber-purple/10 hover:border-cyber-purple/60 transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaLinkedin className="relative z-10" />
            <span className="relative z-10">LinkedIn</span>
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded border-2 border-cyber-blue/40 px-5 py-2.5 text-cyber-blue dark:text-cyber-blue font-semibold hover:bg-cyber-blue/10 hover:border-cyber-blue/60 transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaTwitter className="relative z-10" />
            <span className="relative z-10">Twitter</span>
          </a>
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded border-2 border-cyber-pink/40 px-5 py-2.5 text-cyber-pink dark:text-cyber-pink font-semibold hover:bg-cyber-pink/10 hover:border-cyber-pink/60 transition-all hover:shadow-[0_0_20px_rgba(255,0,110,0.4)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaInstagram className="relative z-10" />
            <span className="relative z-10">Instagram</span>
          </a>
        </div>
      </GlassCard>
    </section>
  );
}
