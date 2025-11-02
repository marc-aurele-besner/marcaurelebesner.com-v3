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
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left pointer-events-none"
        style={{ 
          scaleX: prefersReducedMotion ? undefined : scaleX,
          background: "linear-gradient(90deg, #00d9ff 0%, #8b5cf6 50%, #ff006e 100%)",
          boxShadow: "0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)"
        }}
      />
      {/* Pulse effect on scroll */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] z-[49] origin-left bg-cyber-blue/20 pointer-events-none blur-sm"
        style={{ scaleX: prefersReducedMotion ? undefined : scaleX }}
      />
    </>
  );
}