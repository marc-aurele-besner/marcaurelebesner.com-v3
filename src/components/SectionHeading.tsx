import { ReactNode } from "react";

export default function SectionHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--accent)] dark:text-[var(--cyber-cyan)] opacity-80 font-bold">
          <span className="h-px w-6 bg-[var(--accent)] dark:bg-[var(--cyber-cyan)] opacity-40 shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--accent)] via-[var(--cyber-purple)] to-[var(--accent)] dark:from-[var(--cyber-cyan)] dark:via-[var(--cyber-purple)] dark:to-[var(--cyber-magenta)] bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
        {children}
      </h2>
    </div>
  );
}