import Link from "next/link";
import { Fragment } from "react";

export interface BreadcrumbEntry {
  /** Visible label. */
  label: string;
  /** Optional URL. When omitted, the entry is rendered as plain text. */
  href?: string;
}

interface BreadcrumbsProps {
  items: ReadonlyArray<BreadcrumbEntry>;
  /** Optional className for the wrapping <nav>. */
  className?: string;
}

/**
 * Visible breadcrumbs matching the JSON-LD `BreadcrumbList` already
 * rendered on detail pages. The last item is rendered as `<span
 * aria-current="page">` so screen readers announce it correctly.
 */
export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={className ?? "text-sm text-slate-500 dark:text-grayTone"}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((entry, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${entry.label}-${index}`}>
              <li className="flex items-center gap-1.5">
                {entry.href && !isLast ? (
                  <Link
                    href={entry.href}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {entry.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-slate-700 dark:text-gray-200/90">
                    {entry.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="text-slate-400 dark:text-grayTone/60">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
