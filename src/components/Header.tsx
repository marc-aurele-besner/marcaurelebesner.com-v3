"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { activeId } = useActiveSection();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const items = [
    { href: "#about", label: "About", id: "about" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <header className="md:hidden sticky top-0 z-50 bg-white/90 dark:bg-darkBlue/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 dark:border-[var(--cyber-cyan)]/30 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
      <div className="p-4 px-4 flex justify-between items-center">
        <p className="text-xl font-bold text-[var(--accent)] neon-pulse dark:text-[var(--cyber-cyan)] tracking-tight" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>{siteConfig.name}</p>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-2xl font-bold text-[var(--accent)] dark:text-[var(--cyber-cyan)] rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all hover:scale-105 hover:text-[var(--cyber-magenta)] dark:hover:text-[var(--cyber-magenta)] hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]"
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
          <nav id="mobile-menu" className="px-2 pb-3 relative">
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/30 to-transparent" />
            <ul className="flex flex-col items-center gap-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li className="w-full" key={item.id}>
                    <Link
                      href={pathname === "/" ? item.href : `/${item.href}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`block w-full p-3 text-center rounded-md transition-all ${
                        isActive
                          ? "text-[var(--accent)] dark:text-[var(--cyber-cyan)] bg-black/5 dark:bg-white/5 border border-[var(--accent)]/30 dark:border-[var(--cyber-cyan)]/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                          : "text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:bg-black/5 dark:hover:bg-white/5 hover:border hover:border-[var(--accent)]/20 dark:hover:border-[var(--cyber-cyan)]/30"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
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
                className="px-2 pb-3 relative"
              >
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/30 to-transparent" />
                <ul className="flex flex-col items-center gap-1">
                  {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <li className="w-full" key={item.id}>
                        <Link
                          href={pathname === "/" ? item.href : `/${item.href}`}
                          aria-current={isActive ? "page" : undefined}
                          className={`block w-full p-3 text-center rounded-md transition ${
                            isActive
                              ? "text-[var(--accent)] bg-black/5 dark:bg-white/5"
                              : "text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        )
      )}
    </header>
  );
}
