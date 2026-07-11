export type PressManifestEntry = {
  slug: string;
  title: string;
  url: string | null;
  cover: string | null;
  notionPageId: string;
  lastEdited: string;
};

export type PressManifest = {
  generatedAt: string;
  items: PressManifestEntry[];
};

export type PressFrontmatter = {
  title: string;
  slug: string;
  url: string | null;
  cover: string | null;
  /** Optional SEO meta description; falls back to a body excerpt. */
  description?: string;
  notionPageId: string;
  lastEdited: string;
};
