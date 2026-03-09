"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "./Project";
import { projects } from "@/config/projects";
import { trackProjectDetails } from "@/utils/analytics";
import SectionHeading from "./SectionHeading";
import Link from "next/link";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

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
            A few things I shipped recently. Each project represents a unique
            challenge and learning experience.
          </p>
        </motion.div>
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Project {...project} />
            </motion.div>
          ))}
        </div>

        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="text-slate-500 dark:text-grayTone mb-4 cursor-pointer hover:text-[var(--accent)] transition-colors text-center w-full"
            >
              {showAll
                ? "Show less"
                : `+${otherProjects.length} more projects`}
            </button>
            <AnimatePresence mode="wait">
              {showAll ? (
                <motion.div
                  key="thumbnails"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 overflow-hidden"
                >
                  {otherProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Project {...project} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="links"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap justify-center gap-3"
                >
                  {otherProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      onClick={() =>
                        trackProjectDetails(project.title, project.slug)
                      }
                      className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent-weak)] transition-colors text-sm"
                    >
                      {project.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
