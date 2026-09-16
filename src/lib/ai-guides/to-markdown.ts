import matter from "gray-matter";

import { SITE_URL } from "@/lib/site";

import { normalizeAiGuideFaq } from "./faq";

/**
 * Renders a guide's MDX source as a standalone Markdown document for agents.
 *
 * Why this exists: a guide's HTML page is ~86KB for ~7KB of prose. Everything
 * else is nav, footer, and hydration payload. An LLM fetching the page pays for
 * all of it and has to re-derive structure from markup. This hands over the
 * same content at 8-14% of the bytes, headings and fenced code intact.
 *
 * Two transforms matter beyond stripping frontmatter:
 *
 *  1. Root-relative links and images become absolute. A reader who arrived via
 *     `/ai/x.md` has no origin to resolve `/ai/y` against, so a cross-link to
 *     another guide would dead-end. Absolute URLs keep the catalog traversable.
 *  2. The FAQ lives in frontmatter, not the body, so it is appended as real
 *     headings. It is the most directly useful part of a guide for a model
 *     answering a question, and dropping it would lose it entirely.
 */

/** Frontmatter keys worth restating as prose. Everything else is site plumbing. */
type GuideMeta = {
  title: string;
  description: string;
  published: string;
  updated: string;
  tags: string[];
};

function readMeta(data: Record<string, unknown>): GuideMeta {
  const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
  const tagsRaw = data.tags;
  return {
    title: str(data.title),
    description: str(data.description),
    published: str(data.published),
    updated: str(data.updated),
    tags: Array.isArray(tagsRaw)
      ? tagsRaw
          .filter((t): t is string => typeof t === "string")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
  };
}

/**
 * Rewrite root-relative targets to absolute URLs.
 *
 * A reader who arrived via `/ai/x.md` has no origin to resolve `/ai/y` against,
 * so every site-relative path has to be spelled out or it dead-ends.
 *
 * Two patterns, because guides mix Markdown with a little raw HTML:
 *  - `](/…)` — the tail shared by Markdown links and images. Matching the tail
 *    rather than the whole construct keeps `![alt](/x.png "title")` working
 *    without a second pattern.
 *  - `src="/…"` / `href="/…"` — a dozen `<video>` embeds that MDX passes
 *    through as raw HTML.
 *
 * `//` is excluded from both: that is a protocol-relative URL, not a site path.
 */
function absolutizeTargets(markdown: string): string {
  return markdown
    .replace(
      /\]\((\/(?!\/)[^)\s]*)/gu,
      (_m, p1: string) => `](${SITE_URL}${p1}`,
    )
    .replace(
      /\b(src|href)="(\/(?!\/)[^"]*)"/gu,
      (_m, attr: string, p: string) => `${attr}="${SITE_URL}${p}"`,
    );
}

/**
 * Replace a block-level JSX component with a pointer to the web page.
 *
 * Guide bodies are otherwise plain Markdown, but a couple embed an interactive
 * React widget. Left alone, the raw tag reaches the reader as a dangling
 * reference — prose saying "use the calculator below" followed by something
 * that renders as nothing. Naming it and linking the page is honest about what
 * the Markdown cannot carry.
 */
function replaceJsxBlocks(markdown: string, canonical: string): string {
  return markdown.replace(
    /^[ \t]*<([A-Z][A-Za-z0-9]*)\b[^>]*\/>[ \t]*$/gmu,
    (_m, name: string) =>
      `_[${splitPascalCase(name)}: an interactive widget that only runs on the web version of this guide — ${canonical}]_`,
  );
}

/** "JetlagCalculatorInlineApp" -> "Jetlag calculator inline app". */
function splitPascalCase(name: string): string {
  const words = name.replace(/([a-z0-9])([A-Z])/gu, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function renderFaq(faq: ReturnType<typeof normalizeAiGuideFaq>): string {
  if (faq.length === 0) return "";
  const blocks = faq.map((item) => `### ${item.question}\n\n${item.answer}`);
  return `\n\n## FAQ\n\n${blocks.join("\n\n")}`;
}

export function aiGuideToMarkdown(slug: string, source: string): string {
  const { data, content } = matter(source);
  const meta = readMeta(data as Record<string, unknown>);
  const faq = normalizeAiGuideFaq((data as Record<string, unknown>).faq);

  const canonical = `${SITE_URL}/ai/${slug}`;
  const title = meta.title || slug;

  // A short provenance header, not a frontmatter block: a model reading this
  // mid-context benefits more from a sentence it can quote than from YAML.
  // Built as one contiguous block so an omitted optional field (no `updated`,
  // no tags) closes up instead of leaving a gap.
  const provenance = [
    `Source: ${canonical}`,
    "Author: Mika Reyes (https://mikareyes.com)",
    meta.published ? `Published: ${meta.published}` : "",
    meta.updated && meta.updated !== meta.published
      ? `Updated: ${meta.updated}`
      : "",
    meta.tags.length > 0 ? `Tags: ${meta.tags.join(", ")}` : "",
  ].filter(Boolean);

  const header = [
    `# ${title}`,
    meta.description ? `> ${meta.description}` : "",
    provenance.join("\n"),
  ]
    .filter(Boolean)
    .join("\n\n");

  const body = replaceJsxBlocks(absolutizeTargets(content.trim()), canonical);
  const faqSection = absolutizeTargets(renderFaq(faq));

  return `${header}\n\n---\n\n${body}${faqSection}\n`;
}
