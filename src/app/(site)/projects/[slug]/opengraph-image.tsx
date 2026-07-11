import { loadProjectMdxPost } from "@/lib/projects/load-mdx";
import { renderProjectMdx } from "@/components/projects/render-project-mdx";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og/render-og-image";

export const alt = "Mika Reyes — Project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loaded = await loadProjectMdxPost(slug);
  const title = loaded
    ? (await renderProjectMdx(loaded.source)).frontmatter.title
    : "Project";

  return renderOgImage({ eyebrow: "Project", title });
}
