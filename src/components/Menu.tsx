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
          <p className="text-2xl font-bold text-[var(--accent)] tracking-tight neon-text">
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
                    className={`group inline-flex items-center gap-2 transition-colors neon-text ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-grayTone hover:text-[var(--accent)]"
                    }`}
                  >
                    <span
                      className={`h-px w-5 transition-all opacity-60 ${
                        isActive ? "bg-[var(--accent)]" : "bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]"
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

      <div className="mt-8 pt-6 border-t border-[var(--accent)]/20">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-grayTone/70 mb-2 neon-text">Appearance</p>
            <ThemeToggle />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-grayTone/70 mb-2 neon-text">On the web</p>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
                className="cyber-button h-9 w-9 inline-flex items-center justify-center rounded-md transition-colors"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="cyber-button h-9 w-9 inline-flex items-center justify-center rounded-md transition-colors"
                style={{ borderColor: 'var(--accent-secondary)' }}
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter/X"
                aria-label="Twitter"
                className="cyber-button h-9 w-9 inline-flex items-center justify-center rounded-md transition-colors"
                style={{ borderColor: 'var(--accent-tertiary)' }}
              >
                <FaTwitter size={18} />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="cyber-button h-9 w-9 inline-flex items-center justify-center rounded-md transition-colors"
                style={{ borderColor: 'var(--accent-secondary)' }}
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
