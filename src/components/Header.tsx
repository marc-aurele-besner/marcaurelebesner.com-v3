"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="md:hidden sticky top-0 z-50 bg-white/80 dark:bg-darkBlue/80 backdrop-blur border-b border-slate-200 dark:border-white/5">
      <div className="p-4 px-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[var(--accent)]">Marc-Aurele Besner</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-2xl font-bold text-[var(--accent)] rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition hover:scale-105"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="px-2 pb-3 relative"
          >
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/30 to-transparent" />
            <ul className="flex flex-col items-center gap-1">
              <li className="w-full">
                <a
                  href="#about"
                  className="block w-full p-3 text-center rounded-md text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </a>
              </li>
              <li className="w-full">
                <a
                  href="#experience"
                  className="block w-full p-3 text-center rounded-md text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Experience
                </a>
              </li>
              <li className="w-full">
                <a
                  href="#projects"
                  className="block w-full p-3 text-center rounded-md text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li className="w-full">
                <a
                  href="#contact"
                  className="block w-full p-3 text-center rounded-md text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
