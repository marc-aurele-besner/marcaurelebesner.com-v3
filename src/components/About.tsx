import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function About() {
  return (
    <motion.section
      className="flex items-start justify-center pt-6 pb-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl px-2">
        <h1 className="typography-display bg-gradient-to-r from-[var(--accent)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent mb-6">
          Web3&deAI Full‑stack engineer, building at the intersection of
          blockchain and decentralized AI.
        </h1>
        <p className="typography-body-large text-[var(--foreground)]/80 mb-8 max-w-2xl">
          I design and build decentralized apps, smart contracts, SDKs, open
          source tools, block explorers, and AI agents. I&apos;m familiar with
          decentralized system for encryption and data storage.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] text-white font-semibold px-6 py-3 hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            aria-label="View my projects section"
          >
            View Projects
            <span aria-hidden>↗</span>
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent-weak)] text-[var(--accent)] font-medium px-6 py-3 hover:bg-[var(--accent-bg-weak)] hover:border-[var(--accent)] transition-all duration-200 backdrop-blur-sm"
          >
            Experience
          </a>
        </div>

        <GlassCard className="p-6 mt-10">
          <p className="typography-body-small text-[var(--foreground)]/70">
            Currently exploring AI-assisted DeFi agents and mobile apps.
            Interested in collaborating or learning more?{" "}
            <a
              href="#contact"
              className="text-[var(--accent)] font-medium hover:text-[var(--accent-hover)] transition-colors duration-200 underline decoration-1 underline-offset-2"
            >
              Let&apos;s connect!
            </a>
          </p>
        </GlassCard>
      </div>
    </motion.section>
  );
}
