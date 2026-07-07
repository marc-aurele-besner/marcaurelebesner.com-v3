"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Single client-side framer-motion configuration. The
 * `reducedMotion="user"` setting makes every framer-motion animation
 * honor the user's `prefers-reduced-motion` OS preference, which keeps
 * the page accessible and reduces INP for users who opt out of motion.
 */
export default function MotionConfigProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
