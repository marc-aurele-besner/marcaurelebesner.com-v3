"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function Spotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return; // Respect reduced motion

    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = e.clientX - 150; // center offset (spotlight is 300x300)
      const y = e.clientY - 150;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return <div ref={ref} className="spotlight" aria-hidden />;
}