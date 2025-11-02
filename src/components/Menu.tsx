"use client";

import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const { activeId } = useActiveSection();
  const pathname = usePathname();
  const items = [
    { href: "#about", label: "About", id: "about" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center mb-8">
          <p className="text-2xl font-bold text-[var(--accent)] dark:text-[var(--cyber-cyan)] tracking-tight neon-pulse" style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.6)' }}>
            {siteConfig.name}
          </p>
        </div>
        <nav aria-label="Primary">
          <ul className="space-y-3">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <motion.li key={item.href} initial={{ opacity: 0.7 }} whileHover={{ opacity: 1, x: 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={pathname === "/" ? item.href : `/${item.href}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`group inline-flex items-center gap-2 transition-all duration-300 ${
                      isActive
                        ? "text-[var(--accent)] dark:text-[var(--cyber-cyan)] font-semibold"
                        : "text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)]"
                    }`}
                  >
                    <span
                      className={`h-px w-5 transition-all duration-300 ${
                        isActive 
                          ? "bg-[var(--accent)] dark:bg-[var(--cyber-cyan)] opacity-100 shadow-[0_0_8px_rgba(0,255,255,0.8)]" 
                          : "bg-[var(--accent)]/0 group-hover:bg-[var(--accent)] dark:group-hover:bg-[var(--cyber-cyan)] opacity-60"
                      }`}
                    />
                    {item.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-grayTone/70 mb-2">Appearance</p>
            <ThemeToggle />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-grayTone/70 mb-2">On the web</p>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:border-[var(--accent)] dark:hover:border-[var(--cyber-cyan)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-110"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:border-[var(--accent)] dark:hover:border-[var(--cyber-cyan)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-110"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter/X"
                aria-label="Twitter"
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:border-[var(--accent)] dark:hover:border-[var(--cyber-cyan)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-110"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] dark:hover:text-[var(--cyber-cyan)] hover:border-[var(--accent)] dark:hover:border-[var(--cyber-cyan)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-110"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
