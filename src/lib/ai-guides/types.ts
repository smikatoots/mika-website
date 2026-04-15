export type AiGuideFrontmatter = {
  title: string;
  description: string;
  tags: string[];
  published?: string;
  /** Button / link label on the hub card */
  cta: string;
  /** Tie-breaker when publish dates are equal */
  order: number;
};

export type AiGuideIndexEntry = Omit<AiGuideFrontmatter, "published"> & {
  published: string;
  slug: string;
};
