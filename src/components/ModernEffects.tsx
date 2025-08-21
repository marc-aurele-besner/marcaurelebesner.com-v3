"use client";

import { motion } from "framer-motion";

export function GradientBlob({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-hover)]/20 blur-3xl ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
      style={{ animation: "float 6s ease-in-out infinite" }}
    />
  );
}

export function FloatingParticles({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[var(--accent)]/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
}

export function GlassmorphismCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl ${className}`}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent" />
      <div className="relative z-10 p-8">
        {children}
      </div>
    </div>
  );
}