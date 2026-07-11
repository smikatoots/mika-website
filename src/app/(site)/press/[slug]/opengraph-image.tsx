import { loadPressMdxPost } from "@/lib/press/load-mdx";
import { renderPressMdx } from "@/components/press/render-press-mdx";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og/render-og-image";

export const alt = "Mika Reyes — Press";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loaded = await loadPressMdxPost(slug);
  const title = loaded
    ? (await renderPressMdx(loaded.source)).frontmatter.title
    : "Press";

  return renderOgImage({ eyebrow: "Press", title });
}
