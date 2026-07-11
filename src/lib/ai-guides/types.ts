export type AiGuideStatus = "published" | "coming-soon";

/** One question/answer pair. Drives both the visible FAQ and FAQPage JSON-LD. */
export type AiGuideFaqItem = {
  question: string;
  answer: string;
};

export type AiGuideFrontmatter = {
  title: string;
  description: string;
  tags: string[];
  published?: string;
  /** Last meaningful edit (ISO date, e.g. "2026-07-11"). Defaults to published. */
  updated?: string;
  /** Button / link label on the hub card */
  cta: string;
  /** Tie-breaker when publish dates are equal */
  order: number;
  /** Hub cards stay clickable; the guide page shows an in-progress state */
  status?: AiGuideStatus;
  /** Optional Q&A pairs rendered as a visible FAQ + FAQPage structured data. */
  faq?: AiGuideFaqItem[];
};

export type AiGuideIndexEntry = Omit<AiGuideFrontmatter, "published"> & {
  published: string;
  slug: string;
};
