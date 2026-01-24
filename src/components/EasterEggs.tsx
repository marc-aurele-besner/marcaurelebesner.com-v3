"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * EasterEggs attaches global listeners for fun hidden interactions:
 * - Konami code to trigger Party Mode (confetti + flashy overlay)
 * - Console banner with a subtle hint for explorers
 */
export default function EasterEggs() {
  const [isPartyModeActive, setIsPartyModeActive] = useState<boolean>(false);
  const konamiProgressIndexRef = useRef<number>(0);
  const partyTimeoutRef = useRef<number | null>(null);

  const konamiSequence = useMemo(
    () => [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ],
    []
  );

  useEffect(() => {
    // Fancy console banner for curious devs
    try {
      const bannerText = "%cPsst! There are hidden treats around here. Try the Konami code 😉";
      const bannerStyle = [
        "color: #0a0a0a",
        "background: linear-gradient(90deg,#64ffda,#0ea5a5)",
        "padding: 8px 12px",
        "border-radius: 8px",
        "font-weight: 700",
      ].join(";");
      // eslint-disable-next-line no-console
      console.log(bannerText, bannerStyle);
    } catch {
      /* no-op */
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Normalize key to lower-case for alpha keys
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      const expectedKey = konamiSequence[konamiProgressIndexRef.current];
      if (key === expectedKey) {
        konamiProgressIndexRef.current += 1;
        if (konamiProgressIndexRef.current === konamiSequence.length) {
          konamiProgressIndexRef.current = 0;
          triggerPartyMode();
        }
      } else {
        // If mismatch, but current key could be the start of the sequence, reset smartly
        konamiProgressIndexRef.current = key === konamiSequence[0] ? 1 : 0;
      }

      // Allow Escape to turn it off early
      if (key === "Escape" && isPartyModeActive) {
        disablePartyMode();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // Intentionally not depending on isPartyModeActive to avoid re-attachment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [konamiSequence]);

  const triggerPartyMode = () => {
    if (partyTimeoutRef.current !== null) window.clearTimeout(partyTimeoutRef.current);
    setIsPartyModeActive(true);
    document.documentElement.classList.add("party-mode");
    partyTimeoutRef.current = window.setTimeout(() => {
      disablePartyMode();
    }, 15000);
  };

  const disablePartyMode = () => {
    if (partyTimeoutRef.current !== null) window.clearTimeout(partyTimeoutRef.current);
    partyTimeoutRef.current = null;
    setIsPartyModeActive(false);
    document.documentElement.classList.remove("party-mode");
  };

  // Pre-generate a set of confetti pieces for performance
  const confettiPieces = useMemo(() => {
    const pieces: Array<{ id: number; left: number; size: number; delay: number; color: string; rotate: number }> = [];
    const colors = ["#64ffda", "#0ea5a5", "#e6ecff", "#ff8a00", "#7c3aed"];
    const total = 120;
    for (let i = 0; i < total; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 10,
        delay: Math.random() * 2,
        color: colors[i % colors.length],
        rotate: Math.random() * 360,
      });
    }
    return pieces;
  }, []);

  return (
    <>
      {isPartyModeActive && (
        <div className="party-overlay" aria-hidden>
          <div className="party-banner">Party Mode! Press Esc to calm down</div>
          <div className="confetti-container">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="confetti-piece"
                style={{
                  left: `${piece.left}%`,
                  width: `${piece.size}px`,
                  height: `${piece.size * 0.4}px`,
                  backgroundColor: piece.color,
                  animationDelay: `${piece.delay}s`,
                  transform: `rotate(${piece.rotate}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

