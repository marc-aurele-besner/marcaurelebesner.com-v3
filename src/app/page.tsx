"use client";

import { motion } from "framer-motion";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";

export default function HomePage() {
  return (
    <PageTransition>
      <div>
      <motion.section
        id="about"
        className="scroll-mt-32 mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <About />
      </motion.section>
      <motion.section
        id="experience"
        className="scroll-mt-32 mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Experience />
      </motion.section>
      <motion.section
        id="projects"
        className="scroll-mt-32 mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Projects />
      </motion.section>
      <motion.section
        id="contact"
        className="scroll-mt-32"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Contact />
      </motion.section>
    </div>
    </PageTransition>
  );
}
