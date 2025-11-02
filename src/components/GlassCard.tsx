import { ReactNode } from "react";

export default function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "group relative rounded-xl border border-black/10 dark:border-cyber-blue/30 bg-white/60 dark:bg-cyber-dark/40 backdrop-blur-md shadow-[0_0_0_0_rgba(0,217,255,0.0)] hover:shadow-[0_0_40px_-10px_rgba(0,217,255,0.6)] transition-all duration-300 overflow-hidden " +
        className
      }
    >
      {/* Neon top highlight */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent" />
      
      {/* Corner brackets */}
      <div className="pointer-events-none absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-blue/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="pointer-events-none absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-blue/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-pink/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-pink/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Scanning line effect */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan" />
      
      {children}
    </div>
  );
}