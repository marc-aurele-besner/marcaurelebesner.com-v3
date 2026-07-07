import { ImageResponse } from "next/og";
import type { ReactElement } from "react";
import { ogImageSize, siteConfig } from "@/config/site";

// Shared frame for the `/projects/[slug]` and `/experience/[slug]` OG and
// Twitter images. The four route files differ only in their body content and,
// between OG and Twitter, the footer identity line (site host vs handle). This
// keeps the layout and branding in sync across all of them.

export const size = ogImageSize;

export const contentType = "image/png";

/** Which social card is being rendered — controls the footer identity line. */
export type OgVariant = "og" | "twitter";

interface RenderOgImageOptions {
  variant: OgVariant;
  /** Uppercase eyebrow label above the title. */
  eyebrow: string;
  /** Eyebrow font size — projects use 18, experience uses 20. */
  eyebrowFontSize?: number;
  /** Domain-specific title/summary block rendered between eyebrow and footer. */
  body: ReactElement;
  /** Bottom-left line (project badges / experience skills). */
  footerText: string;
}

/**
 * Render a slug OG/Twitter image with the shared frame: gradient background,
 * eyebrow, caller-provided body, and a footer whose identity line adapts to the
 * variant (site host for OG, Twitter handle for Twitter).
 */
export function renderOgImage({
  variant,
  eyebrow,
  eyebrowFontSize = 18,
  body,
  footerText,
}: RenderOgImageOptions) {
  const identityLine =
    variant === "twitter" ? siteConfig.twitterHandle : new URL(siteConfig.url).host;
  const identityColor = variant === "twitter" ? "#64ffda" : "#8892b0";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a192f 0%, #112240 50%, #0a192f 100%)",
          color: "#e6ecff",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: eyebrowFontSize,
            color: "#64ffda",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {eyebrow}
        </div>

        {body}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#64ffda",
              opacity: 0.8,
            }}
          >
            {footerText}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", fontSize: 24, fontWeight: 600 }}>
              {siteConfig.name}
            </div>
            <div style={{ display: "flex", fontSize: 16, color: identityColor }}>
              {identityLine}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

/** Fallback card shown when a slug does not match any project/experience. */
export function renderNotFoundImage(label: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a192f",
          color: "#e6ecff",
          fontSize: 48,
        }}
      >
        {label}
      </div>
    ),
    size
  );
}
