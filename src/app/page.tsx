"use client";

import { motion } from "framer-motion";
import About from "../components/About";
import Experience from "../components/Experience";
// import Projects from '../components/Projects';

export default function HomePage() {
  return (
    <div>
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <About />
      </motion.section>
      <motion.section
        id="experience"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Experience />
      </motion.section>
      {
        /* <motion.section
        id="projects"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Projects />
      </motion.section> */
      }
    </div>
  );
}
