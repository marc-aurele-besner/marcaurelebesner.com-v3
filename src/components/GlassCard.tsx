import { ReactNode } from "react";

export default function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "relative rounded-xl border border-[var(--accent)]/30 bg-white/5 backdrop-blur-md neon-border shadow-[0_0_20px_rgba(0,243,255,0.2),inset_0_0_20px_rgba(0,243,255,0.05)] hover:shadow-[0_0_40px_rgba(0,243,255,0.4),0_0_80px_rgba(255,0,255,0.2),inset_0_0_30px_rgba(0,243,255,0.1)] transition-all duration-300 group " +
        className
      }
    >
      {/* Cyberpunk top highlight with gradient */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />
      {/* Scanning line effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="scanner-line rounded-xl" />
      </div>
      {children}
    </div>
  );
}