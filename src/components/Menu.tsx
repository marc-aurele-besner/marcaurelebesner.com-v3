"use client";

import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/config/site";

export default function Menu() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-10">
          <p className="typography-heading-3 text-[var(--accent)]">
            {siteConfig.name}
          </p>
          <ThemeToggle />
        </div>
        <nav aria-label="Primary navigation" role="navigation">
          <ul className="space-y-4">
            {[
              { href: "#about", label: "About" },
              { href: "#experience", label: "Experience" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0.8, x: -10 }}
                whileHover={{ opacity: 1, x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <a href={item.href} className="group relative inline-flex items-center gap-3 py-2 px-3 rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium w-full">
                  <span className="h-px w-6 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)] group-hover:w-8 transition-all duration-300" />
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-3 mt-10">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl text-[var(--foreground)]/60 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 hover:scale-110 hover:shadow-lg group"
          aria-label="GitHub"
        >
          <FaGithub size={20} className="group-hover:rotate-12 transition-transform duration-200" />
        </a>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl text-[var(--foreground)]/60 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 hover:scale-110 hover:shadow-lg group"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} className="group-hover:rotate-12 transition-transform duration-200" />
        </a>
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl text-[var(--foreground)]/60 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 hover:scale-110 hover:shadow-lg group"
          aria-label="Twitter"
        >
          <FaTwitter size={20} className="group-hover:rotate-12 transition-transform duration-200" />
        </a>
        <a
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl text-[var(--foreground)]/60 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 hover:scale-110 hover:shadow-lg group"
          aria-label="Instagram"
        >
          <FaInstagram size={20} className="group-hover:rotate-12 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
}
