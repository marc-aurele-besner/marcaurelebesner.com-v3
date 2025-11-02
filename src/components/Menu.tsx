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
    <div className="flex flex-col h-full justify-between relative">
      {/* Cyber accent line */}
      <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-cyber-blue via-cyber-purple to-transparent opacity-60" />
      
      <div>
        <div className="flex items-center mb-8 relative">
          <p className="text-2xl font-bold font-mono text-[var(--accent)] tracking-wider uppercase relative">
            <span className="relative z-10">{siteConfig.name}</span>
            <span className="absolute inset-0 blur-lg text-[var(--accent)] opacity-50">{siteConfig.name}</span>
          </p>
          {/* Animated pulse indicator */}
          <div className="ml-3 w-2 h-2 bg-cyber-green rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,65,0.6)]" />
        </div>
        
        <nav aria-label="Primary">
          <ul className="space-y-2">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <motion.li 
                  key={item.href} 
                  initial={{ opacity: 0.7 }} 
                  whileHover={{ opacity: 1, x: 6 }} 
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={pathname === "/" ? item.href : `/${item.href}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative inline-flex items-center gap-3 py-2 px-3 rounded transition-all font-semibold ${
                      isActive
                        ? "text-cyber-blue dark:text-cyber-blue bg-cyber-blue/10 shadow-[inset_0_0_20px_rgba(0,217,255,0.1)]"
                        : "text-slate-600 dark:text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5"
                    }`}
                  >
                    {/* Active indicator brackets */}
                    {isActive && (
                      <>
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyber-blue shadow-[0_0_10px_rgba(0,217,255,0.6)]" />
                        <span className="absolute right-1 top-1 w-1.5 h-1.5 border-t border-r border-cyber-pink" />
                      </>
                    )}
                    
                    {/* Animated line indicator */}
                    <span
                      className={`h-[2px] transition-all ${
                        isActive 
                          ? "w-6 bg-gradient-to-r from-cyber-blue to-cyber-purple shadow-[0_0_8px_rgba(0,217,255,0.6)]" 
                          : "w-4 bg-cyber-blue/0 group-hover:bg-cyber-blue group-hover:w-6 group-hover:shadow-[0_0_8px_rgba(0,217,255,0.4)]"
                      }`}
                    />
                    
                    <span className="relative">
                      {item.label}
                      {/* Subtle underline on hover */}
                      {!isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-px bg-cyber-purple transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      )}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-cyber-blue/20 relative">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-blue via-cyber-purple to-transparent" />
        
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-cyber-blue dark:text-cyber-blue/80 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-purple rounded-full" />
              Appearance
            </p>
            <ThemeToggle />
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-cyber-blue dark:text-cyber-blue/80 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-purple rounded-full" />
              On the web
            </p>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
                className="group relative h-10 w-10 inline-flex items-center justify-center rounded border border-cyber-blue/30 bg-cyber-dark/40 text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/60 transition-all hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaGithub size={18} className="relative z-10" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="group relative h-10 w-10 inline-flex items-center justify-center rounded border border-cyber-blue/30 bg-cyber-dark/40 text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/60 transition-all hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaLinkedin size={18} className="relative z-10" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter/X"
                aria-label="Twitter"
                className="group relative h-10 w-10 inline-flex items-center justify-center rounded border border-cyber-blue/30 bg-cyber-dark/40 text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/60 transition-all hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaTwitter size={18} className="relative z-10" />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="group relative h-10 w-10 inline-flex items-center justify-center rounded border border-cyber-blue/30 bg-cyber-dark/40 text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/60 transition-all hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaInstagram size={18} className="relative z-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
