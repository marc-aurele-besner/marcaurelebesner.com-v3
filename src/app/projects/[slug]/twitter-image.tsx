import { renderProjectImage } from "./og-image-content";

export { size, contentType } from "@/utils/og-image";
export { generateStaticParams } from "./og-image-content";

export default function TwitterImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return renderProjectImage(params, "twitter");
}
