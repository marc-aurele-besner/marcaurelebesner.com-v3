import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function TwitterImage() {
  const title = `${siteConfig.name} — ${siteConfig.role}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a192f 0%, #09203f 100%)",
          color: "#e6ecff",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -1.5,
        }}
      >
        {title}
      </div>
    ),
    size
  );
}