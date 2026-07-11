export type ProjectTag = {
  name: string;
  color: string;
};

export type ProjectManifestEntry = {
  slug: string;
  title: string;
  url: string | null;
  tags: ProjectTag[];
  cover: string | null;
  launchDate: string | null;
  notionPageId: string;
};

export type ProjectsManifest = {
  generatedAt: string;
  projects: ProjectManifestEntry[];
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  url: string | null;
  tags: ProjectTag[];
  cover: string | null;
  launchDate: string | null;
  /** Optional SEO meta description; falls back to a body excerpt. */
  description?: string;
  notionPageId: string;
};
