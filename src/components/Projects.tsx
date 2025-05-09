"use client";

import { motion } from "framer-motion";
import { Project } from "./Project";
import { projects } from "@/constants/projects";

export default function Projects() {
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl w-full px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Projects</h2>
        </div>
        {projects.map((project, index) => <Project key={index} {...project} />)}
      </div>
    </motion.section>
  );
}