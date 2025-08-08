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
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-lightCyan via-white to-lightCyan/80 bg-clip-text text-transparent tracking-tight">
          Full‑stack engineer at the intersection of decentralized AI and blockchain.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-200/90">
          I build production systems that connect AI and on‑chain rails: indexers, block explorers, SDKs, and agent frameworks. Experienced with decentralized encryption and permanent storage (IPLD/DAG).
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-lightCyan text-darkBlue font-semibold px-4 py-2 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-lightCyan/50 transition"
          >
            View Projects
            <span aria-hidden>↘</span>
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-lg border border-lightCyan/40 text-lightCyan px-4 py-2 hover:bg-lightCyan/10 backdrop-blur-sm transition"
          >
            Experience
          </a>
        </div>

        <GlassCard className="p-4 mt-8">
          <p className="text-sm text-grayTone">
            Currently exploring decentralized AI agents with verifiable state, IPLD/DAG storage, and developer tooling at the data layer.
          </p>
        </GlassCard>
      </div>
    </motion.section>
  );
}
