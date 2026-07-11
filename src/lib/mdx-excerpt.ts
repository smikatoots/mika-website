/** Target length for auto-generated meta description excerpts. */
const EXCERPT_TARGET = 155;
/** Hard upper bound before we force a word-boundary cut. */
const EXCERPT_MAX = 160;
/** Don't accept a sentence-boundary cut shorter than this. */
const EXCERPT_MIN = 60;

/**
 * Reduce raw MDX/Markdown body text to a single line of plain prose,
 * dropping frontmatter, images, links, formatting, and JSX/HTML tags.
 */
function mdxBodyToPlainText(source: string): string {
  return (
    source
      // Leading YAML frontmatter block.
      .replace(/^\s*---\r?\n[\s\S]*?\r?\n---\r?\n?/u, "")
      // Fenced code blocks.
      .replace(/```[\s\S]*?```/gu, " ")
      // Images: drop entirely (alt text is rarely a good sentence).
      .replace(/!\[[^\]]*\]\([^)]*\)/gu, " ")
      // Links: keep the visible text only.
      .replace(/\[([^\]]*)\]\([^)]*\)/gu, "$1")
      // JSX / HTML tags.
      .replace(/<[^>]+>/gu, " ")
      // Inline code backticks.
      .replace(/`([^`]*)`/gu, "$1")
      // Heading, blockquote, and list markers at line starts.
      .replace(/^\s{0,3}(?:#{1,6}\s+|>\s?|[-*+]\s+|\d+\.\s+)/gmu, "")
      // Emphasis / strikethrough markers.
      .replace(/[*_~]/gu, "")
      // Collapse whitespace to single spaces.
      .replace(/\s+/gu, " ")
      .trim()
  );
}

/**
 * Build a fallback meta description from MDX body text: ~155 chars,
 * trimmed on a sentence boundary when possible, otherwise on a word
 * boundary with an ellipsis. Never returns the title.
 */
export function excerptFromMdx(source: string): string {
  const text = mdxBodyToPlainText(source);
  if (text.length <= EXCERPT_TARGET) {
    return text;
  }

  const window = text.slice(0, EXCERPT_MAX + 1);
  const sentenceEnd = Math.max(
    window.lastIndexOf(". "),
    window.lastIndexOf("! "),
    window.lastIndexOf("? "),
  );
  if (sentenceEnd >= EXCERPT_MIN) {
    return window.slice(0, sentenceEnd + 1).trim();
  }

  const clipped = text.slice(0, EXCERPT_TARGET);
  const lastSpace = clipped.lastIndexOf(" ");
  const base = lastSpace > EXCERPT_MIN ? clipped.slice(0, lastSpace) : clipped;
  return `${base.trim()}…`;
}
