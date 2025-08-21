"use client";

import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Menu() {
  const { activeId } = useActiveSection();
  const items = [
    { href: "#about", label: "About", id: "about" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-8">
          <p className="text-2xl font-bold text-[var(--accent)] tracking-tight">
            {siteConfig.name}
          </p>
          <ThemeToggle />
        </div>
        <nav aria-label="Primary">
          <ul className="space-y-3">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <motion.li key={item.href} initial={{ opacity: 0.7 }} whileHover={{ opacity: 1, x: 4 }} transition={{ duration: 0.2 }}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group inline-flex items-center gap-2 transition-colors ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-slate-600 dark:text-grayTone hover:text-[var(--accent)]"
                    }`}
                  >
                    <span
                      className={`h-px w-5 transition-all opacity-60 ${
                        isActive ? "bg-[var(--accent)]" : "bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]"
                      }`}
                    />
                    {item.label}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="flex space-x-4 mt-8">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 dark:text-grayTone hover:text-[var(--accent)] transition-colors"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 dark:text-grayTone hover:text-[var(--accent)] transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 dark:text-grayTone hover:text-[var(--accent)] transition-colors"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 dark:text-grayTone hover:text-[var(--accent)] transition-colors"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
}
