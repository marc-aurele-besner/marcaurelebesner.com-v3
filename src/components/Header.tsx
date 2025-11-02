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
    <header className="md:hidden sticky top-0 z-50 bg-white/80 dark:bg-cyber-dark/90 backdrop-blur-xl border-b border-slate-200 dark:border-cyber-blue/30 shadow-[0_4px_20px_rgba(0,217,255,0.1)]">
      <div className="p-4 px-4 flex justify-between items-center">
        <p className="text-xl font-bold font-mono text-[var(--accent)] uppercase tracking-wider relative">
          <span className="relative z-10">{siteConfig.name}</span>
          <span className="absolute inset-0 blur-md text-[var(--accent)] opacity-50">{siteConfig.name}</span>
        </p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="relative text-2xl font-bold text-[var(--accent)] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] border border-cyber-blue/30 hover:border-cyber-blue/60 bg-cyber-blue/5 hover:bg-cyber-blue/10"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyber-blue" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyber-pink" />
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
                      className={`relative block w-full p-3 text-center rounded-md transition-all font-semibold ${
                        isActive
                          ? "text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/30 shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                          : "text-slate-600 dark:text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5 border border-transparent hover:border-cyber-blue/20"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {isActive && (
                        <>
                          <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-cyber-blue" />
                          <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-cyber-pink" />
                        </>
                      )}
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
