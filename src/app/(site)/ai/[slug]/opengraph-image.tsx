import { loadAiGuideMdxPost } from "@/lib/ai-guides/load-guides";
import { renderAiGuideMdx } from "@/components/ai-guides/render-ai-guide-mdx";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og/render-og-image";

export const alt = "Mika Reyes — AI Guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loaded = await loadAiGuideMdxPost(slug);
  const title = loaded
    ? (await renderAiGuideMdx(loaded.source)).frontmatter.title
    : "AI Guide";

  return renderOgImage({ eyebrow: "AI Guide", title });
}
