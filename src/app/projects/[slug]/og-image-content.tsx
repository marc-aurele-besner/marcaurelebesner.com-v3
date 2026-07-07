import { projects, getProjectBySlug } from "@/config/projects";
import { formatProjectType } from "@/utils/project-type";
import {
  renderNotFoundImage,
  renderOgImage,
  type OgVariant,
} from "@/utils/og-image";

// Shared content for the project OG and Twitter images. Both route files are
// thin wrappers that call renderProjectImage() with their variant.

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function renderProjectImage(
  params: Promise<{ slug: string }>,
  variant: OgVariant
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return renderNotFoundImage("Project Not Found");
  }

  const badgesText = project.badges.slice(0, 4).join(" • ");

  return renderOgImage({
    variant,
    eyebrow: formatProjectType(project.projectType),
    footerText: badgesText,
    body: (
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
    ),
  });
}
