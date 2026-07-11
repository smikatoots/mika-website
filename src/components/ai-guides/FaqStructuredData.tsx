import type { AiGuideFaqItem } from "@/lib/ai-guides/types";

/**
 * Emits FAQPage JSON-LD from the same {question, answer} pairs rendered in the
 * visible {@link FaqSection}, so the markup and the structured data can't drift.
 */
export function FaqStructuredData({ items }: { items: AiGuideFaqItem[] }) {
  if (items.length === 0) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
