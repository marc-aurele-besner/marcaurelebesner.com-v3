import { ImageResponse } from "next/og";
import { projects } from "@/constants/projects";
import { siteConfig } from "@/config/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function TwitterImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
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
          Project Not Found
        </div>
      ),
      size
    );
  }

  const badgesText = project.badges.slice(0, 4).join(" • ");
  const projectType = project.projectType === "personal" ? "Personal Project" : "Work Project";

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
            fontSize: 18,
            color: "#64ffda",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {projectType}
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
              marginBottom: "20px",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#8892b0",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            {project.summary}
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
            {badgesText}
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
