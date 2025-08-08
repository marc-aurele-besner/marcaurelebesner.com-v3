import { ReactNode } from "react";

export default function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_0_0_rgba(100,255,218,0.0)] hover:shadow-[0_0_40px_-10px_rgba(100,255,218,0.35)] transition-all duration-300 " +
        className
      }
    >
      {/* subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {children}
    </div>
  );
}