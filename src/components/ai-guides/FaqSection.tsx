import type { AiGuideFaqItem } from "@/lib/ai-guides/types";

const faqHeadingClass =
  "text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl";

/**
 * FAQ heading + list with no surrounding border/section — so it can be composed
 * inside a shared block alongside other sections (e.g. the blog "Related
 * reading" list). Pairs with {@link FaqStructuredData}, which emits the matching
 * FAQPage JSON-LD from the same items.
 */
export function FaqList({ items }: { items: AiGuideFaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <div aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={faqHeadingClass}>
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
    </div>
  );
}

/**
 * Standalone FAQ block appended to a guide — {@link FaqList} in its own
 * top-bordered section.
 */
export function FaqSection({ items }: { items: AiGuideFaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-zinc-200 pt-10">
      <FaqList items={items} />
    </section>
  );
}

export { faqHeadingClass };
