import { faqHeadingClass } from "@/components/ai-guides/FaqSection";
import { InternalLink } from "@/components/ui/InternalLink";
import type { RelatedItem } from "@/lib/blog/related";
import { siteLink } from "@/lib/ui/site-styles";

/**
 * "Related reading" link list. Renders with no border of its own so it can sit
 * inside the shared post-extras section alongside {@link FaqList}, matching the
 * FAQ heading treatment.
 */
export function RelatedReading({ items }: { items: RelatedItem[] }) {
  if (items.length === 0) return null;

  return (
    <div aria-labelledby="related-reading-heading">
      <h2 id="related-reading-heading" className={faqHeadingClass}>
        Related reading
      </h2>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item.href} className="leading-relaxed text-zinc-800">
            <InternalLink href={item.href} className={siteLink}>
              {item.label}
            </InternalLink>
            {item.note ? (
              <span className="text-zinc-600"> — {item.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
