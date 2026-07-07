import { experiences, getExperienceBySlug } from "@/config/experience";
import {
  renderNotFoundImage,
  renderOgImage,
  type OgVariant,
} from "@/utils/og-image";

// Shared content for the experience OG and Twitter images. Both route files are
// thin wrappers that call renderExperienceImage() with their variant.

export function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function renderExperienceImage(
  params: Promise<{ slug: string }>,
  variant: OgVariant
) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return renderNotFoundImage("Experience Not Found");
  }

  const skillsText = experience.skills.slice(0, 5).join(" • ");

  return renderOgImage({
    variant,
    eyebrow: "Experience",
    eyebrowFontSize: 20,
    footerText: skillsText,
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
    ),
  });
}
