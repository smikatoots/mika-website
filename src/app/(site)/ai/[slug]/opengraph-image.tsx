import { loadAllAiGuideIndexEntries } from "@/lib/ai-guides/load-guides";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og/render-og-image";

export const alt = "Mika Reyes — AI Guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Title comes from the lightweight frontmatter index — importing the MDX
// renderer here would pull Shiki + the whole content pipeline into this
// function's bundle and blow past Vercel's size limit.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entries = await loadAllAiGuideIndexEntries();
  const title = entries.find((e) => e.slug === slug)?.title ?? "AI Guide";

  return renderOgImage({ eyebrow: "AI Guide", title });
}
