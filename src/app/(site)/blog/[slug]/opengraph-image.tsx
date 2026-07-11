import { loadBlogMdxPost } from "@/lib/blog/load-mdx-post";
import { renderBlogMdx } from "@/components/blog/render-blog-mdx";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og/render-og-image";

export const alt = "Mika Reyes — Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loaded = await loadBlogMdxPost(slug);
  const title = loaded
    ? (await renderBlogMdx(loaded.source)).frontmatter.title
    : "Blog";

  return renderOgImage({ eyebrow: "Blog", title });
}
