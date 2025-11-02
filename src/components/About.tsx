import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import Link from "next/link";
import GlitchText from "./GlitchText";

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
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent animate-pulse">
            <GlitchText as="span" glitchIntensity="low">
              Web3 & AI Full‑stack engineer
            </GlitchText>
          </span>
          <span className="block mt-2 text-slate-900 dark:text-white/90">
            building at the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-cyber-blue dark:text-cyber-blue animate-neon-pulse">
                intersection
              </span>
              <span className="absolute inset-0 blur-lg bg-cyber-blue/30 -z-10" />
            </span>{" "}
            of blockchain and decentralized AI.
          </span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-gray-200/90">
          I design and build decentralized apps, smart contracts, SDKs, open
          source tools, block explorers, and AI agents. I&apos;m familiar with
          decentralized systems for encryption and data storage.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/#projects"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple text-cyber-dark font-bold px-6 py-3 hover:from-cyber-purple hover:to-cyber-pink focus:outline-none focus:ring-2 focus:ring-cyber-blue transition-all duration-300 overflow-hidden shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.6)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <span aria-hidden className="text-lg">→</span>
            </span>
          </Link>
          <Link
            href="/#experience"
            className="group relative inline-flex items-center gap-2 rounded-lg border-2 border-cyber-blue/60 text-cyber-blue dark:text-cyber-blue px-6 py-3 hover:bg-cyber-blue/10 backdrop-blur-sm transition-all duration-300 font-semibold shadow-[inset_0_0_20px_rgba(0,217,255,0.1)] hover:shadow-[0_0_20px_rgba(0,217,255,0.4),inset_0_0_30px_rgba(0,217,255,0.2)]"
          >
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity" />
            Experience
          </Link>
        </div>

        <GlassCard className="p-6 mt-8 border-l-4 border-l-cyber-purple/50">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-cyber-green rounded-full animate-neon-pulse shadow-[0_0_10px_rgba(0,255,65,0.6)]" />
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-300/90 leading-relaxed">
              Currently exploring <span className="text-cyber-purple font-semibold">AI-assisted DeFi agents</span> and <span className="text-cyber-purple font-semibold">mobile apps</span>. I advise early‑stage teams on product and engineering strategy, smart contracts, and developer experience. Interested in collaborating or learning more?{" "}
              <Link
                href="/#contact"
                className="relative inline-block text-cyber-blue dark:text-cyber-blue font-semibold hover:text-cyber-purple transition-colors group/link"
              >
                <span className="relative z-10">Let&apos;s connect!</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyber-blue to-cyber-purple transform scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </motion.section>
  );
}
