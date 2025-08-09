"use client";

import { motion } from "framer-motion";
import { Project } from "./Project";
import { projects } from "@/constants/projects";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <motion.section
      className="min-h-[70vh] flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl w-full px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <SectionHeading eyebrow="Selected Work">Projects</SectionHeading>
            <p className="text-slate-600 dark:text-grayTone mt-1">A few things I shipped recently.</p>
          </div>
        </div>
        {projects.map((project) => (
          <Project key={project.title} {...project} />
        ))}
      </div>
    </motion.section>
  );
}