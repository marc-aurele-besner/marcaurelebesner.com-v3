"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_SECTIONS = ["about", "experience", "projects", "contact"] as const;
export type SectionId = typeof DEFAULT_SECTIONS[number];

export function useActiveSection(sectionIds: readonly string[] = DEFAULT_SECTIONS) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  const ids = useMemo(() => [...sectionIds], [sectionIds]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    // Use a centered viewport band to decide "active"
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose intersection ratio is highest and is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
          return;
        }

        // Fallback: pick the section closest to the top of the viewport
        const byTop = entries
          .slice()
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (byTop[0]?.target?.id) setActiveId(byTop[0].target.id);
      },
      {
        // Active band roughly the middle 40% of the viewport
        root: null,
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return { activeId } as const;
}