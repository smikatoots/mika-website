import type { AiGuideFaqItem } from "@/lib/ai-guides/types";

/**
 * Visible FAQ block appended to a guide. Pairs with {@link FaqStructuredData},
 * which emits the matching FAQPage JSON-LD from the same items.
 */
export function FaqSection({ items }: { items: AiGuideFaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="faq-heading"
      className="mt-16 border-t border-zinc-200 pt-10"
    >
      <h2
        id="faq-heading"
        className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl"
      >
        Frequently asked questions
      </h2>
      <dl className="mt-6 space-y-8">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="text-xl font-semibold tracking-tight text-zinc-950">
              {item.question}
            </dt>
            <dd className="mt-2 leading-relaxed text-zinc-800">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
