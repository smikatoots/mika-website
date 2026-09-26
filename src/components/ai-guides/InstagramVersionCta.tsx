"use client";

import posthog from "posthog-js";

import { Ga4TrackedAnchor } from "@/components/analytics/Ga4TrackedLink";
import { IconInstagram } from "@/components/ui/SocialIcons";
import type { AiGuideInstagramPost } from "@/lib/ai-guides/types";

const CTA_LOCATION = "ai_guide_instagram_version";

const COPY: Record<
  AiGuideInstagramPost["format"],
  { heading: string; body: string; label: string }
> = {
  reel: {
    heading: "Rather watch it?",
    body: "I walk through this whole guide on screen in under a minute.",
    label: "Watch the Reel",
  },
  carousel: {
    heading: "Want the quick version?",
    body: "The whole guide fits in one swipeable carousel. Save it for later.",
    label: "Swipe the carousel",
  },
};

/**
 * Sends readers who prefer visuals to the Instagram post a guide came from.
 * A plain outbound link rather than an embed: Instagram's embed script is
 * heavy and slows the page, and opening the post in the app counts as a real
 * view with the follow button one tap away.
 *
 * White card with a tertiary link, never coral — the course CTA below owns the
 * page's one primary action (DESIGN.md > The one action colour).
 */
export function InstagramVersionCta({
  guideSlug,
  post,
}: {
  guideSlug: string;
  post: AiGuideInstagramPost;
}) {
  const copy = COPY[post.format];

  return (
    <aside className="mt-12 flex flex-col gap-4 rounded-[var(--mr-radius-card)] border border-[var(--mr-border)] bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-[var(--mr-coral-deep)]">
          <IconInstagram size={22} />
        </span>
        <div>
          <p className="font-semibold text-zinc-950">{copy.heading}</p>
          <p className="mt-1 leading-relaxed text-zinc-700">{copy.body}</p>
        </div>
      </div>
      <Ga4TrackedAnchor
        href={post.url}
        target="_blank"
        rel="noopener"
        className="mr-pressable inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-[var(--mr-radius-pill)] border-[1.5px] border-[var(--mr-border-input)] bg-white px-5 py-2.5 text-sm font-bold text-zinc-950 sm:self-auto"
        ga4EventName="instagram_version_clicked"
        ga4Params={{
          cta_label: copy.label,
          cta_location: CTA_LOCATION,
          destination_url: post.url,
          link_type: "external_instagram",
          guide_slug: guideSlug,
          post_format: post.format,
        }}
        onClick={() => {
          posthog.capture("instagram_version_clicked", {
            cta_location: CTA_LOCATION,
            guide_slug: guideSlug,
            post_format: post.format,
          });
        }}
      >
        {copy.label} →
      </Ga4TrackedAnchor>
    </aside>
  );
}
