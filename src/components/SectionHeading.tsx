import { ReactNode } from "react";

export default function SectionHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-8 relative">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-cyber-blue dark:text-cyber-blue font-bold animate-neon-pulse">
          <span className="h-[2px] w-8 bg-gradient-to-r from-cyber-blue to-cyber-purple shadow-[0_0_10px_rgba(0,217,255,0.6)]" />
          <span className="relative">
            <span className="absolute inset-0 blur-sm">{eyebrow}</span>
            <span className="relative">{eyebrow}</span>
          </span>
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-cyber-blue rounded-full animate-pulse" />
            <span className="w-1 h-1 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-1 h-1 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      )}
      <h2 className="relative text-4xl font-extrabold">
        <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
          {children}
        </span>
        {/* Underline accent */}
        <div className="absolute -bottom-2 left-0 h-1 w-20 bg-gradient-to-r from-cyber-blue via-cyber-purple to-transparent rounded-full shadow-[0_0_10px_rgba(0,217,255,0.6)]" />
      </h2>
    </div>
  );
}