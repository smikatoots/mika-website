import type { BlogManifestPost } from "./types";

export type RelatedItem = {
  /** Internal path, e.g. "/blog/product-interview-tips" or "/ai/what-are-subagents". */
  href: string;
  label: string;
  /** Optional one-line reason to read it. */
  note?: string;
};

/**
 * Coerce a raw frontmatter `related` value into clean link items. compileMDX
 * casts frontmatter without validating it, so treat the input as untrusted:
 * drop anything without both an href and a label.
 */
export function normalizeRelated(value: unknown): RelatedItem[] {
  if (!Array.isArray(value)) return [];
  const items: RelatedItem[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const rec = raw as Record<string, unknown>;
    const href = typeof rec.href === "string" ? rec.href.trim() : "";
    const label = typeof rec.label === "string" ? rec.label.trim() : "";
    const note = typeof rec.note === "string" ? rec.note.trim() : "";
    if (href && label) {
      items.push(note ? { href, label, note } : { href, label });
    }
  }
  return items;
}

/**
 * Tag-driven "Related reading" fallback for posts without a curated `related`
 * list. Ranks other posts by shared-tag count, tie-broken by recency, and
 * returns the top few as note-less link items. Blog→blog only, since blog tags
 * (career, product, startup…) rarely overlap guide tags. Curated `related`
 * always takes precedence over this.
 */
export function getAutoRelatedPosts(
  slug: string,
  tags: string[],
  posts: BlogManifestPost[],
  limit = 3,
): RelatedItem[] {
  const tagSet = new Set(tags);
  if (tagSet.size === 0) return [];
  const dateVal = (p: BlogManifestPost) =>
    Date.parse(p.published ?? p.lastEdited ?? "") || 0;
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      shared: (p.tags ?? []).filter((t) => tagSet.has(t)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || dateVal(b.post) - dateVal(a.post))
    .slice(0, limit)
    .map(({ post }) => ({ href: `/blog/${post.slug}`, label: post.title }));
}
