"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="md:hidden sticky top-0 z-50 bg-[var(--surface)]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-sm supports-backdrop-blur:bg-[var(--surface)]/80">
      <div className="px-4 py-3 flex justify-between items-center">
        <p className="typography-heading-4 text-[var(--accent)] font-bold">{siteConfig.name}</p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-2xl font-bold text-[var(--accent)] rounded-xl p-2 hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {isOpen && (
        shouldReduceMotion ? (
          <nav id="mobile-menu" className="px-2 pb-3 relative bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--border)] shadow-lg">
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/30 to-transparent" />
            <ul className="flex flex-col items-center gap-2">
              <li className="w-full">
                <a
                  href="#about"
                  className="block w-full py-4 px-3 text-center rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </a>
              </li>
              <li className="w-full">
                <a
                  href="#experience"
                  className="block w-full py-4 px-3 text-center rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Experience
                </a>
              </li>
              <li className="w-full">
                <a
                  href="#projects"
                  className="block w-full py-4 px-3 text-center rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li className="w-full">
                <a
                  href="#contact"
                  className="block w-full py-4 px-3 text-center rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                id="mobile-menu"
                key="mobile-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="px-2 pb-3 relative bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--border)] shadow-lg"
              >
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/30 to-transparent" />
                <ul className="flex flex-col items-center gap-2">
                  <li className="w-full">
                    <a
                      href="#about"
                      className="block w-full py-4 px-3 text-center rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#experience"
                      className="block w-full py-4 px-3 text-center rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Experience
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#projects"
                      className="block w-full py-4 px-3 text-center rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Projects
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#contact"
                      className="block w-full py-4 px-3 text-center rounded-xl text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        )
      )}
    </header>
  );
}
