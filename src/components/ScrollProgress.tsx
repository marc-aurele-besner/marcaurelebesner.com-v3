"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-[var(--accent)]/90 pointer-events-none"
      style={{ scaleX: prefersReducedMotion ? undefined : scaleX }}
    />
  );
}