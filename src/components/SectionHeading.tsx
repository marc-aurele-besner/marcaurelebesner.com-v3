import { ReactNode } from "react";

export default function SectionHeading({
  children,
  eyebrow,
  as: Heading = "h2",
}: {
  children: ReactNode;
  eyebrow?: string;
  /** Heading level. Use "h1" when the section is the page's main heading. */
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--accent)] opacity-90 font-semibold">
          <span className="h-px w-8 bg-[var(--accent)] opacity-50" />
          {eyebrow}
        </div>
      )}
      <Heading className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--accent)] via-slate-800 dark:via-slate-200 to-slate-900 dark:to-white bg-clip-text text-transparent leading-tight">
        {children}
      </Heading>
    </div>
  );
}
