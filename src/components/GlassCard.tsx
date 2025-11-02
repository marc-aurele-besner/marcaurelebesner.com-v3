import { ReactNode } from "react";

export default function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "relative rounded-xl border border-black/10 dark:border-white/10 dark:border-[var(--cyber-cyan)]/30 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-[0_0_0_0_rgba(0,255,255,0.0)] hover:shadow-[0_0_40px_-10px_rgba(0,255,255,0.4)] dark:hover:shadow-[0_0_40px_-10px_rgba(0,255,255,0.5)] transition-all duration-300 hover:border-[var(--cyber-cyan)]/50 dark:hover:border-[var(--cyber-cyan)]/60 " +
        className
      }
    >
      {/* subtle top highlight - enhanced cyberpunk */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--cyber-cyan)]/50 via-[var(--cyber-purple)]/50 to-transparent dark:via-[var(--cyber-cyan)] dark:via-[var(--cyber-purple)]" />
      {/* Scanner line effect */}
      <div className="scanner-line rounded-xl" />
      {children}
    </div>
  );
}