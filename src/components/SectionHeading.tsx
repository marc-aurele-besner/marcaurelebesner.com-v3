import { ReactNode } from "react";

export default function SectionHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--accent)] opacity-80">
          <span className="h-px w-6 bg-[var(--accent)] opacity-40" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--accent)] to-slate-900 dark:to-white bg-clip-text text-transparent">
        {children}
      </h2>
    </div>
  );
}