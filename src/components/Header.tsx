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
    { href: "#advisory", label: "Advisory", id: "advisory" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <header className="md:hidden sticky top-0 z-50 bg-white/90 dark:bg-darkBlue/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5 shadow-sm">
      <div className="p-4 px-4 flex justify-between items-center">
        <p className="text-xl font-bold text-[var(--accent)] tracking-tight">{siteConfig.name}</p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-2xl font-bold text-[var(--accent)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-all hover:scale-110 hover:bg-[var(--accent-bg-weak)] active:scale-95"
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
          <nav id="mobile-menu" className="px-2 pb-4 relative bg-white/95 dark:bg-darkBlue/95 backdrop-blur-md">
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
            <ul className="flex flex-col items-stretch gap-2 pt-2">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li className="w-full" key={item.id}>
                    <Link
                      href={pathname === "/" ? item.href : `/${item.href}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`block w-full p-4 text-center rounded-lg transition-all font-medium ${
                        isActive
                          ? "text-[var(--accent)] bg-[var(--accent-bg-weak)] border-2 border-[var(--accent-weak)]"
                          : "text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:bg-black/5 dark:hover:bg-white/5 border-2 border-transparent hover:border-[var(--accent-weak)]"
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="px-2 pb-4 relative bg-white/95 dark:bg-darkBlue/95 backdrop-blur-md overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
                <ul className="flex flex-col items-stretch gap-2 pt-2">
                  {items.map((item, index) => {
                    const isActive = activeId === item.id;
                    return (
                      <motion.li
                        className="w-full"
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={pathname === "/" ? item.href : `/${item.href}`}
                          aria-current={isActive ? "page" : undefined}
                          className={`block w-full p-4 text-center rounded-lg transition-all font-medium ${
                            isActive
                              ? "text-[var(--accent)] bg-[var(--accent-bg-weak)] border-2 border-[var(--accent-weak)]"
                              : "text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:bg-black/5 dark:hover:bg-white/5 border-2 border-transparent hover:border-[var(--accent-weak)]"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
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
