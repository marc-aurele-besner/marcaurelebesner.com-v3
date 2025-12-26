"use client";

import { motion } from "framer-motion";
import { Project } from "./Project";
import { projects } from "@/constants/projects";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="min-h-[70vh] flex flex-col items-center justify-center py-16 scroll-mt-28"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-5xl w-full px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeading eyebrow="Selected Work">Projects</SectionHeading>
          <p className="text-slate-600 dark:text-grayTone mt-3 text-lg max-w-2xl">
            A few things I shipped recently. Each project represents a unique challenge and learning experience.
          </p>
        </motion.div>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Project {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}