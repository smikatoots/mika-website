import { InternalLink } from "@/components/ui/InternalLink";

import { AI_GUIDE_COMING_SOON_SLUGS } from "@/lib/ai-guides/constants";
import type { AiGuideIndexEntry } from "@/lib/ai-guides/types";

const listTagClass =
  "rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600";

const cardInteractiveClass =
  "group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-accent/35 hover:shadow-md";

const cardStaticClass =
  "flex flex-col rounded-xl border border-zinc-200 bg-zinc-100/60 p-5 shadow-sm";

export function AiResourceCard({ guide }: { guide: AiGuideIndexEntry }) {
  const href = `/ai/${guide.slug}`;
  const legacyComingSoon = AI_GUIDE_COMING_SOON_SLUGS.has(guide.slug);
  const inProgress = guide.status === "coming-soon";
  const cardMuted = legacyComingSoon;

  const inner = (
    <>
      <h2
        className={
          cardMuted
            ? "text-base font-semibold leading-snug text-zinc-800"
            : "text-base font-semibold leading-snug text-zinc-950 group-hover:text-accent"
        }
      >
        {guide.title}
      </h2>
      <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-zinc-600">
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
      <span
        className={
          cardMuted
            ? "mt-auto pt-4 text-sm font-medium text-zinc-500"
            : inProgress
              ? "mt-auto pt-4 text-sm font-medium text-zinc-600 group-hover:text-accent"
              : "mt-auto pt-4 text-sm font-medium text-accent group-hover:text-accent-hover"
        }
      >
        {legacyComingSoon
          ? "Coming soon..."
          : inProgress
            ? "Preview →"
            : `${guide.cta} →`}
      </span>
    </>
  );

  if (legacyComingSoon) {
    return (
      <div
        className={cardStaticClass}
        aria-label={`${guide.title} — coming soon`}
      >
        {inner}
      </div>
    );
  }

  return (
    <InternalLink href={href} className={cardInteractiveClass}>
      {inner}
    </InternalLink>
  );
}
