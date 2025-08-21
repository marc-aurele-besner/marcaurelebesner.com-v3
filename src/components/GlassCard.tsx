import { ReactNode } from "react";

export default function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "relative rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out group " +
        "hover:bg-[var(--surface-hover)]/90 hover:border-[var(--accent-weak)] hover:shadow-[var(--accent)]/10 " +
        className
      }
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-bg-weak)]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent-weak)]/60 to-transparent" />

      {/* Bottom shadow */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}