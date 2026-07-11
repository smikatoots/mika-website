import { loadProjectsManifest } from "@/lib/projects/manifest";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og/render-og-image";

export const alt = "Mika Reyes — Project";
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
  const { projects } = await loadProjectsManifest();
  const title = projects.find((p) => p.slug === slug)?.title ?? "Project";

  return renderOgImage({ eyebrow: "Project", title });
}
