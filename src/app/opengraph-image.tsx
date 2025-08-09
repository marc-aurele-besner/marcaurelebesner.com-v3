import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OGImage() {
  const title = `${siteConfig.name} — ${siteConfig.role}`;
  const description = siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a192f 0%, #09203f 100%)",
          color: "#e6ecff",
          padding: "64px",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1, marginBottom: 16 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, opacity: 0.9, maxWidth: 900, lineHeight: 1.3 }}>{description}</div>
        <div style={{ marginTop: 40, fontSize: 24, color: "#64ffda" }}>{new URL(siteConfig.url).host}</div>
      </div>
    ),
    size
  );
}