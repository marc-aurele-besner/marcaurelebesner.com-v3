import { ReactNode } from "react";

export default function SectionHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-3 typography-caption text-[var(--accent)] font-semibold">
          <span className="h-px w-8 bg-[var(--accent)] opacity-60" />
          {eyebrow}
        </div>
      )}
      <h2 className="typography-heading-2 bg-gradient-to-r from-[var(--accent)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
        {children}
      </h2>
    </div>
  );
}