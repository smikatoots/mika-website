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
