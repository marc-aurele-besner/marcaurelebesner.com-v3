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
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-[var(--accent)] via-black dark:via-white to-slate-900 dark:to-white bg-clip-text text-transparent tracking-tight">
          Web3 & AI Full‑stack engineer, building at the intersection of
          blockchain and decentralized AI.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-gray-200/90">
          I design and build decentralized apps, smart contracts, SDKs, open
          source tools, block explorers, and AI agents. I&apos;m familiar with
          decentralized systems for encryption and data storage.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-darkBlue font-semibold px-4 py-2 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          >
            View Projects
            <span aria-hidden>↘</span>
          </Link>
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent-weak)] text-[var(--accent)] px-4 py-2 hover:bg-[var(--accent-bg-weak)] backdrop-blur-sm transition"
          >
            Experience
          </Link>
        </div>

        <GlassCard className="p-4 mt-8">
          <p className="text-sm text-slate-600 dark:text-grayTone">
            Currently exploring AI-assisted DeFi agents and mobile apps. I&apos;m also open to selective
            advisory and mentorship with early-stage teams (product/tech strategy, smart contracts,
            developer experience).
            Interested in collaborating or learning more?{" "}
            <Link
              href="/#contact"
              className="text-[var(--accent)] underline hover:brightness-110 transition"
            >
              Let&apos;s connect!
            </Link>
          </p>
        </GlassCard>
      </div>
    </motion.section>
  );
}
