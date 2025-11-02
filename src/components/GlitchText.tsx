"use client";

import { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  glitchIntensity?: "low" | "medium" | "high";
}

export default function GlitchText({ 
  children, 
  className = "", 
  as: Component = "span",
  glitchIntensity = "medium" 
}: GlitchTextProps) {
  const text = typeof children === "string" ? children : "";
  
  const intensityClasses = {
    low: "animate-flicker",
    medium: "",
    high: "animate-glitch",
  };

  return (
    <Component 
      className={`relative inline-block ${intensityClasses[glitchIntensity]} ${className}`}
      data-text={text}
    >
      <span className="relative z-10">{children}</span>
      {glitchIntensity !== "low" && (
        <>
          <span 
            className="absolute top-0 left-0 -z-10 text-cyber-blue opacity-70"
            aria-hidden="true"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              animation: "glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite"
            }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 -z-10 text-cyber-pink opacity-70"
            aria-hidden="true"
            style={{
              clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)",
              animation: "glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite reverse"
            }}
          >
            {children}
          </span>
        </>
      )}
    </Component>
  );
}
