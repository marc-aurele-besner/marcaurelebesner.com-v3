import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import Link from "next/link";

export default function About() {
  return (
    <motion.section
      id="about"
      className="flex items-start justify-center pt-6 pb-2 scroll-mt-28"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl px-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent tracking-tight neon-text">
          Web3 & AI Full‑stack engineer, building at the intersection of
          blockchain and decentralized AI.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-grayTone">
          I design and build decentralized apps, smart contracts, SDKs, open
          source tools, block explorers, and AI agents. I&apos;m familiar with
          decentralized systems for encryption and data storage.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/#projects"
            className="cyber-button inline-flex items-center gap-2 rounded-lg font-semibold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            View Projects
            <span aria-hidden className="neon-pulse">↘</span>
          </Link>
          <Link
            href="/#experience"
            className="cyber-button inline-flex items-center gap-2 rounded-lg px-4 py-2 backdrop-blur-sm"
            style={{ borderColor: 'var(--accent-secondary)' }}
          >
            Experience
          </Link>
        </div>

        <GlassCard className="p-4 mt-8">
          <p className="text-sm text-grayTone">
            Currently exploring AI-assisted DeFi agents and mobile apps. I advise early‑stage teams on product and engineering strategy, smart contracts, and developer experience. Interested in collaborating or learning more?{" "}
            <Link
              href="/#contact"
              className="text-[var(--accent)] underline hover:brightness-110 transition neon-text"
            >
              Let&apos;s connect!
            </Link>
          </p>
        </GlassCard>
      </div>
    </motion.section>
  );
}
