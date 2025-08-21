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
    <div className="inline-flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl p-1 shadow-sm">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Switch to light theme"
        className={`p-2 rounded-lg transition-all duration-200 hover:bg-[var(--surface-hover)] ${current === "light" ? "bg-[var(--accent)] text-white shadow-md" : "text-[var(--foreground)]/70"}`}
      >
        <FiSun size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Switch to dark theme"
        className={`p-2 rounded-lg transition-all duration-200 hover:bg-[var(--surface-hover)] ${current === "dark" ? "bg-[var(--accent)] text-white shadow-md" : "text-[var(--foreground)]/70"}`}
      >
        <FiMoon size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="Use system theme"
        className={`p-2 rounded-lg transition-all duration-200 hover:bg-[var(--surface-hover)] ${theme === "system" ? "bg-[var(--accent)] text-white shadow-md" : "text-[var(--foreground)]/70"}`}
      >
        <FiMonitor size={16} />
      </button>
    </div>
  );
}