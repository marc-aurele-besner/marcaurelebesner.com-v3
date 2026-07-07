"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import Link from "next/link";
import { FaCode, FaLightbulb, FaRocket, FaUsers } from "react-icons/fa";
import { trackAdvisoryCta } from "@/utils/analytics";
import { advisoryServices } from "@/config/advisory";

// Map service name → icon. Keeping this map in one place so the homepage
// Advisory section stays in sync with the canonical services list.
const serviceIcon: Record<string, typeof FaCode> = {
  "Smart Contract Architecture": FaCode,
  "SDK & DevTooling": FaRocket,
  "Product & Engineering Strategy": FaLightbulb,
  "Team Augmentation": FaUsers,
};

const engagementTypes = [
  { label: "Hourly", description: "Flexible consulting for specific questions or code reviews" },
  { label: "Retainer", description: "Ongoing advisory with dedicated weekly hours" },
  { label: "Project-Based", description: "Fixed-scope engagements for defined deliverables" },
];

export default function Advisory() {
  return (
    <motion.section
      id="advisory"
      aria-labelledby="advisory-title"
      className="scroll-mt-28 py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <SectionHeading eyebrow="Advisory">
          <span id="advisory-title">Work with me</span>
        </SectionHeading>
        <p className="text-slate-600 dark:text-grayTone max-w-2xl text-lg mt-3 leading-relaxed">
          I advise early-stage Web3 teams on smart contracts, infrastructure, and developer
          experience. Whether you need architecture guidance, code reviews, or hands-on
          engineering support, I can help you ship with confidence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {advisoryServices.map((service, index) => {
          const Icon = serviceIcon[service.name] ?? FaCode;
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className="p-5 h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-bg-weak)] border border-[var(--accent-weak)] flex items-center justify-center">
                    <Icon className="text-[var(--accent)] text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-grayTone leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlassCard className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            Engagement Types
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {engagementTypes.map((type) => (
              <div
                key={type.label}
                className="text-center p-4 rounded-lg border-2 border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/5"
              >
                <p className="font-medium text-[var(--accent)] mb-1">{type.label}</p>
                <p className="text-xs text-slate-600 dark:text-grayTone">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
            <p className="text-slate-600 dark:text-grayTone text-sm">
              Interested in working together? Let&apos;s discuss your project.
            </p>
            <Link
              href="/#contact"
              onClick={() => trackAdvisoryCta("get_in_touch")}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-darkBlue font-semibold px-5 py-2.5 hover:brightness-110 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-[var(--accent)]/20"
            >
              Get in touch
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </motion.section>
  );
}
