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
  notionPageId: string;
  tags: string[];
};
