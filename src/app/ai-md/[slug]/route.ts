import { aiGuideToMarkdown } from "@/lib/ai-guides/to-markdown";
import {
  loadAiGuideMdxSource,
  loadAllAiGuideIndexEntries,
} from "@/lib/ai-guides/load-guides";
import { SITE_URL } from "@/lib/site";

/**
 * Plain-Markdown twin of every AI guide.
 *
 * Reached as `/ai/<slug>.md` — `next.config.ts` rewrites that to this handler,
 * because a route handler and a page cannot share the `/ai/[slug]` segment.
 * Link to the `.md` form everywhere; this path is an implementation detail.
 *
 * The response advertises the HTML page as canonical via the `Link` header, the
 * HTTP equivalent of `<link rel="canonical">` for a non-HTML resource, so the
 * two URLs never compete as separate documents in an index.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  const guides = await loadAllAiGuideIndexEntries();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const source = await loadAiGuideMdxSource(slug);
  if (!source) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(aiGuideToMarkdown(slug, source), {
    headers: {
      // `text/markdown` with an explicit charset. Browsers render it inline as
      // text rather than offering a download, which is what a reader clicking
      // "View as Markdown" expects.
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${SITE_URL}/ai/${slug}>; rel="canonical"`,
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
