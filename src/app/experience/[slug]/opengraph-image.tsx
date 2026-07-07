import { renderExperienceImage } from "./og-image-content";

export { size, contentType } from "@/utils/og-image";
export { generateStaticParams } from "./og-image-content";

export default function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return renderExperienceImage(params, "og");
}
