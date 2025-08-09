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
    <div className="inline-flex items-center gap-1 rounded-md border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur px-1 py-1">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Switch to light theme"
        className={`p-1.5 rounded-md transition-colors ${current === "light" ? "bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white" : "text-slate-600 dark:text-grayTone"}`}
      >
        <FiSun size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Switch to dark theme"
        className={`p-1.5 rounded-md transition-colors ${current === "dark" ? "bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white" : "text-slate-600 dark:text-grayTone"}`}
      >
        <FiMoon size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="Use system theme"
        className={`p-1.5 rounded-md transition-colors ${theme === "system" ? "bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white" : "text-slate-600 dark:text-grayTone"}`}
      >
        <FiMonitor size={16} />
      </button>
    </div>
  );
}