import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import Link from "next/link";

export default function About() {
  return (
    <motion.section
      id="about"
      className="flex items-start justify-center pt-8 pb-12 scroll-mt-28"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] bg-gradient-to-r from-[var(--accent)] via-black dark:via-white to-slate-900 dark:to-white bg-clip-text text-transparent tracking-tight">
            Web3 & AI Full‑stack engineer, building at the intersection of
            blockchain and decentralized AI.
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-700 dark:text-gray-200/90 max-w-3xl"
        >
          I design and build decentralized apps, smart contracts, SDKs, open
          source tools, block explorers, and AI agents. I&apos;m familiar with
          decentralized systems for encryption and data storage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-darkBlue font-semibold px-6 py-3 hover:brightness-110 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-[var(--accent)]/20"
          >
            View Projects
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↘</span>
          </Link>
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--accent-weak)] text-[var(--accent)] px-6 py-3 font-medium hover:bg-[var(--accent-bg-weak)] hover:border-[var(--accent)] backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
          >
            Experience
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard className="p-6 mt-10">
            <p className="text-base sm:text-lg text-slate-600 dark:text-grayTone leading-relaxed">
              Currently exploring AI-assisted DeFi agents and mobile apps. I advise early‑stage teams on product and engineering strategy, smart contracts, and developer experience. Interested in collaborating or learning more?{" "}
              <Link
                href="/#contact"
                className="text-[var(--accent)] font-medium underline underline-offset-2 hover:brightness-110 transition-colors decoration-[var(--accent-weak)] hover:decoration-[var(--accent)]"
              >
                Let&apos;s connect!
              </Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </motion.section>
  );
}
