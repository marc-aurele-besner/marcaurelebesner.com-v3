"use client";

import { motion } from "framer-motion";
import { experiences } from "@/constants/experience";
import { ExperienceCard } from "./ExperienceCard";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const web3Experiences = experiences.filter((exp) => exp.isWeb3);
  const otherExperiences = experiences.filter((exp) => !exp.isWeb3);

  return (
    <motion.section
      id="experience"
      className="w-full flex flex-col items-center justify-start py-16 px-4 sm:px-6 lg:px-8 scroll-mt-28"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeading eyebrow="Career">Experience</SectionHeading>
          <p className="text-slate-600 dark:text-grayTone mt-3 text-lg max-w-2xl">
            Building Web3 products and contributing to the blockchain ecosystem.
          </p>
        </motion.div>

        <div className="space-y-6">
          {web3Experiences.map((experience, index) => (
            <motion.div
              key={experience.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ExperienceCard {...experience} />
            </motion.div>
          ))}

          {otherExperiences.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-4"
              >
                <h3 className="text-sm uppercase tracking-widest text-slate-500 dark:text-grayTone/70 mb-4">
                  Earlier Experience
                </h3>
              </motion.div>
              {otherExperiences.map((experience, index) => (
                <motion.div
                  key={experience.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (web3Experiences.length + index) * 0.1 }}
                >
                  <ExperienceCard {...experience} minimal />
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
