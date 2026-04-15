import { InternalLink } from "@/components/ui/InternalLink";

import type { AiGuideIndexEntry } from "@/lib/ai-guides/types";

const listTagClass =
  "rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600";

export function AiResourceCard({ guide }: { guide: AiGuideIndexEntry }) {
  const href = `/ai/${guide.slug}`;

  return (
    <InternalLink
      href={href}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-accent/35 hover:shadow-md"
    >
      <h2 className="text-base font-semibold leading-snug text-zinc-950 group-hover:text-accent">
        {guide.title}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">
        {guide.description}
      </p>
      {guide.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {guide.tags.map((t) => (
            <span key={t} className={listTagClass}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
      <span className="mt-auto pt-4 text-sm font-medium text-accent group-hover:text-accent-hover">
        {guide.cta} →
      </span>
    </InternalLink>
  );
}
