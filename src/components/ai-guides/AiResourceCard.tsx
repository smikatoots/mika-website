import { Ga4TrackedInternalLink } from "@/components/analytics/Ga4TrackedLink";

import { AI_GUIDE_COMING_SOON_SLUGS } from "@/lib/ai-guides/constants";
import type { AiGuideIndexEntry } from "@/lib/ai-guides/types";
import { CARD_GROUNDS, cardButton } from "@/lib/ui/site-styles";

export function AiResourceCard({
  guide,
  index = 0,
}: {
  guide: AiGuideIndexEntry;
  /** Grid position, for the colour cycle. */
  index?: number;
}) {
  const href = `/ai/${guide.slug}`;
  const ground = CARD_GROUNDS[index % CARD_GROUNDS.length];
  const legacyComingSoon = AI_GUIDE_COMING_SOON_SLUGS.has(guide.slug);
  const inProgress = guide.status === "coming-soon";
  const cardMuted = legacyComingSoon;

  const inner = (
    <>
      <h2
        style={{
          fontFamily: "var(--mr-font-display)",
          fontSize: "var(--mr-text-h3)",
          fontWeight: "var(--mr-weight-display)",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          color: ground.fg,
        }}
      >
        {guide.title}
      </h2>
      <p
        className="mt-2 line-clamp-4"
        style={{
          fontFamily: "var(--mr-font-body)",
          fontSize: "var(--mr-text-sm)",
          lineHeight: 1.55,
          color: ground.fg,
        }}
      >
        {guide.description}
      </p>
      {guide.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {guide.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-xs)",
                fontWeight: "var(--mr-weight-semi)",
                color: "var(--mr-ink)",
                background: ground.chip,
                borderRadius: "var(--mr-radius-pill)",
                padding: "2px 10px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
      <span className="pt-5">
        <span className={cardButton}>
          {legacyComingSoon
            ? "Coming soon"
            : inProgress
              ? "Preview"
              : guide.cta}
          <span aria-hidden="true">→</span>
        </span>
      </span>
    </>
  );

  if (legacyComingSoon) {
    return (
      <div
        aria-label={`${guide.title} — coming soon`}
        style={{
          display: "flex",
          flexDirection: "column",
          background: ground.bg,
          color: ground.fg,
          borderRadius: "var(--mr-radius-card)",
          padding: "24px",
          opacity: 0.7,
        }}
      >
        {inner}
      </div>
    );
  }

  return (
    <Ga4TrackedInternalLink
      href={href}
      className="mr-lift flex flex-col"
      style={{
        background: ground.bg,
        color: ground.fg,
        borderRadius: "var(--mr-radius-card)",
        padding: "24px",
        textDecoration: "none",
      }}
      ga4EventName="ai_guide_card_click"
      ga4Params={{
        cta_label: guide.title,
        cta_location: "ai_guides_index_grid",
        destination_url: href,
        link_type: "internal_ai_guide",
      }}
    >
      {inner}
    </Ga4TrackedInternalLink>
  );
}
