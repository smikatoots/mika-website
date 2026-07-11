import { SITE_URL } from "@/lib/site";

type ArticleType = "TechArticle" | "BlogPosting";

type ArticleStructuredDataProps = {
  /** TechArticle for /ai guides, BlogPosting for /blog posts. */
  type: ArticleType;
  headline: string;
  description: string;
  /** ISO 8601 date (or datetime). */
  datePublished: string;
  /** ISO 8601 date (or datetime). Falls back to datePublished. */
  dateModified?: string;
  /** Absolute canonical URL of the article. */
  url: string;
};

/**
 * Emits per-article JSON-LD. `author` and `publisher` reference the Person
 * node (`#person`) defined in {@link SiteStructuredData}, which renders in the
 * root layout on every page — so the `@id` reference always resolves.
 */
export function ArticleStructuredData({
  type,
  headline,
  description,
  datePublished,
  dateModified,
  url,
}: ArticleStructuredDataProps) {
  const personRef = { "@id": `${SITE_URL}/#person` };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: personRef,
    publisher: personRef,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
