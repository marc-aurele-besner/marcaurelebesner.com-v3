import { ReactNode } from "react";

export default function SectionHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--accent)] opacity-90 neon-text">
          <span className="h-px w-6 bg-[var(--accent)] opacity-60 shadow-[0_0_10px_var(--accent)]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent neon-text glitch-effect">
        {children}
      </h2>
    </div>
  );
}