export type BlogManifestPost = {
  slug: string;
  title: string;
  path: string;
  lastEdited: string;
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
  notionPageId: string;
  tags: string[];
};
