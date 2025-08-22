"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";

export default function SecretScene(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useTransform(pointerY, [0, 1], [8, -8]);
  const rotateY = useTransform(pointerX, [0, 1], [-8, 8]);
  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20, mass: 0.5 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    pointerX.set(x);
    pointerY.set(y);
  };

  const handleMouseLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  useEffect(() => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [pointerX, pointerY]);

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 secret-aurora" />
      <div aria-hidden className="absolute inset-0 secret-grid" />

      <div className="relative mx-auto max-w-4xl px-4 pt-24 pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.05 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
        >
          <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent),#7c3aed)] drop-shadow-sm">
            You found the secret room
          </span>{" "}
          <span aria-hidden className="align-middle">🔐</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-lg md:text-xl text-grayTone/90"
        >
          Explorers get rewarded. Hidden doors open for the curious.
        </motion.p>

        <motion.div
          ref={cardRef}
          onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
          onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          style={prefersReducedMotion ? undefined : { rotateX: smoothRotateX, rotateY: smoothRotateY }}
          className="relative mx-auto mt-10 w-full max-w-xl"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[var(--accent)]/40 via-purple-500/35 to-emerald-400/40 blur-xl opacity-70" aria-hidden />
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 relative">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-16 h-16 rounded-2xl grid place-items-center bg-[radial-gradient(circle_at_30%_30%,rgba(100,255,218,0.25),transparent_70%)] border border-white/10 shadow-[0_10px_40px_rgba(100,255,218,0.25)]"
              >
                <span className="text-2xl">🗝️</span>
              </motion.div>
              <p className="font-mono text-sm opacity-80">
                Hint: Classic gamers know the way. Try a famous code on the home page.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)] text-darkBlue font-semibold hover:opacity-90 transition-opacity">
            Take me back <span aria-hidden>↩</span>
          </Link>
          <a href="#more" className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            Peek around <span aria-hidden className="transition-transform group-hover:translate-x-0.5">👀</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}