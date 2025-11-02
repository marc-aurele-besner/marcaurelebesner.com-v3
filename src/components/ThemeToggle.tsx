"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiMonitor } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;

  return (
    <div className="inline-flex items-center gap-1 rounded border border-cyber-blue/30 dark:border-cyber-blue/30 bg-white/60 dark:bg-cyber-dark/60 backdrop-blur px-1 py-1 shadow-[inset_0_0_10px_rgba(0,217,255,0.05)]">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Switch to light theme"
        className={`relative p-2 rounded transition-all ${
          current === "light" 
            ? "bg-cyber-blue/20 text-cyber-blue shadow-[0_0_10px_rgba(0,217,255,0.3)]" 
            : "text-slate-600 dark:text-gray-400 hover:text-cyber-blue hover:bg-cyber-blue/10"
        }`}
      >
        {current === "light" && (
          <>
            <span className="absolute top-0 left-0 w-1 h-1 bg-cyber-blue" />
            <span className="absolute bottom-0 right-0 w-1 h-1 bg-cyber-purple" />
          </>
        )}
        <FiSun size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Switch to dark theme"
        className={`relative p-2 rounded transition-all ${
          current === "dark" 
            ? "bg-cyber-purple/20 text-cyber-purple shadow-[0_0_10px_rgba(139,92,246,0.3)]" 
            : "text-slate-600 dark:text-gray-400 hover:text-cyber-purple hover:bg-cyber-purple/10"
        }`}
      >
        {current === "dark" && (
          <>
            <span className="absolute top-0 left-0 w-1 h-1 bg-cyber-purple" />
            <span className="absolute bottom-0 right-0 w-1 h-1 bg-cyber-pink" />
          </>
        )}
        <FiMoon size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="Use system theme"
        className={`relative p-2 rounded transition-all ${
          theme === "system" 
            ? "bg-cyber-pink/20 text-cyber-pink shadow-[0_0_10px_rgba(255,0,110,0.3)]" 
            : "text-slate-600 dark:text-gray-400 hover:text-cyber-pink hover:bg-cyber-pink/10"
        }`}
      >
        {theme === "system" && (
          <>
            <span className="absolute top-0 left-0 w-1 h-1 bg-cyber-pink" />
            <span className="absolute bottom-0 right-0 w-1 h-1 bg-cyber-blue" />
          </>
        )}
        <FiMonitor size={16} />
      </button>
    </div>
  );
}