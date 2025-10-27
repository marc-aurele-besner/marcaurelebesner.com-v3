"use client";

import { usePathname } from "next/navigation";
import Backdrop from "./Backdrop";
import Spotlight from "./Spotlight";

export default function BackgroundEffects() {
  const pathname = usePathname();
  const isSecret = pathname === "/secret";

  if (isSecret) return null;

  return (
    <>
      <Backdrop />
      <Spotlight />
    </>
  );
}