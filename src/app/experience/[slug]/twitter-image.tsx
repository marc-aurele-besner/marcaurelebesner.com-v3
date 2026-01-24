import { ImageResponse } from "next/og";
import { experiences } from "@/config/experience";
import { ogImageSize, siteConfig } from "@/config/site";

export const size = ogImageSize;

export const contentType = "image/png";

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export default async function TwitterImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
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
          Experience Not Found
        </div>
      ),
      size
    );
  }

  const skillsText = experience.skills.slice(0, 5).join(" • ");

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
            fontSize: 20,
            color: "#64ffda",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Experience
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-1px",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            {experience.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#8892b0",
              marginBottom: "12px",
            }}
          >
            at {experience.company}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#64ffda",
            }}
          >
            {experience.startDate} - {experience.endDate}
          </div>
        </div>

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
            {skillsText}
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
            <div style={{ display: "flex", fontSize: 16, color: "#64ffda" }}>
              {siteConfig.twitterHandle}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
