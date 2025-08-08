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
          Web3 Full‑Stack Engineer crafting performant, delightful products.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-200/90">
          I build blockchain apps, smart contracts, and open‑source tools. Focused on clear UX, high performance, and developer happiness.
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
            Currently exploring permanent data storage on-chain with IPLD/DAGs and building dev tooling around it.
          </p>
        </GlassCard>
      </div>
    </motion.section>
  );
}
