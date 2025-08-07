"use client";

import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Menu() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h1 className="text-2xl font-bold text-lightCyan mb-8 tracking-tight">
          Marc-Aurele Besner
        </h1>
        <nav aria-label="Primary">
          <ul className="space-y-3">
            <motion.li initial={{ opacity: 0.7 }} whileHover={{ opacity: 1, x: 4 }} transition={{ duration: 0.2 }}>
              <a href="#about" className="text-grayTone hover:text-lightCyan transition-colors">About</a>
            </motion.li>
            <motion.li initial={{ opacity: 0.7 }} whileHover={{ opacity: 1, x: 4 }} transition={{ duration: 0.2 }}>
              <a href="#experience" className="text-grayTone hover:text-lightCyan transition-colors">Experience</a>
            </motion.li>
            <motion.li initial={{ opacity: 0.7 }} whileHover={{ opacity: 1, x: 4 }} transition={{ duration: 0.2 }}>
              <a href="#projects" className="text-grayTone hover:text-lightCyan transition-colors">Projects</a>
            </motion.li>
          </ul>
        </nav>
      </div>
      <div className="flex space-x-4 mt-8">
        <a
          href="https://github.com/marc-aurele-besner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-grayTone hover:text-lightCyan transition-colors"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/marc-aurele-besner/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-grayTone hover:text-lightCyan transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://x.com/marcaureleb"
          target="_blank"
          rel="noopener noreferrer"
          className="text-grayTone hover:text-lightCyan transition-colors"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://www.instagram.com/mabesner/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-grayTone hover:text-lightCyan transition-colors"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
}
