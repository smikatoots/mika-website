export type BlogManifestPost = {
  slug: string;
  title: string;
  path: string;
  /** Notion last_edited_time — used for incremental sync skips. */
  lastEdited: string;
  /** Public publish date (Notion Date property or created_time). */
  published?: string;
  notionPageId: string;
  tags: string[];
};

export type BlogManifest = {
  generatedAt: string;
  posts: BlogManifestPost[];
};

export type BlogPostFrontmatter = {
  title: string;
  slug: string;
  path: string;
  lastEdited: string;
  published?: string;
  /** Optional SEO meta description; falls back to a body excerpt. */
  description?: string;
  /**
   * Optional Q&A for how-to / evergreen posts. Rendered as a visible FAQ
   * section plus FAQPage JSON-LD. Left unset on personal/reflective essays,
   * where structured Q&A would be inauthentic. Normalized via
   * {@link normalizeAiGuideFaq}, so the raw shape is untrusted.
   */
  faq?: unknown;
  notionPageId: string;
  tags: string[];
};
