import { loadBlogManifest } from "@/lib/blog/manifest";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og/render-og-image";

export const alt = "Mika Reyes — Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Title comes from the lightweight manifest — importing the MDX renderer here
// would pull Shiki + the whole content pipeline into this function's bundle
// and blow past Vercel's size limit.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { posts } = await loadBlogManifest();
  const title = posts.find((p) => p.slug === slug)?.title ?? "Blog";

  return renderOgImage({ eyebrow: "Blog", title });
}
