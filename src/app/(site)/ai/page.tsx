import type { Metadata } from "next";

import { AiResourceCard } from "@/components/ai-guides/AiResourceCard";
import { AI_HUB_FILTER_TAGS } from "@/lib/ai-guides/constants";
import { loadAllAiGuideIndexEntries } from "@/lib/ai-guides/load-guides";
import { homeBioLinks } from "@/lib/home-bio-links";
import { siteLink } from "@/lib/ui/site-styles";
import { BackLink } from "@/components/ui/BackLink";
import { InternalLink } from "@/components/ui/InternalLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainWide } from "@/lib/ui/site-styles";

export const metadata: Metadata = {
  title: "AI Guides",
  description:
    "Become time-rich and stay ahead in the new age of AI — practical guides aligned with what I share on social.",
  openGraph: { title: "AI Guides" },
};

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

const tagPillActive =
  "rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-sm font-medium text-accent-hover";
const tagPillIdle =
  "rounded-full border border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900";

function formatFilterTagLabel(raw: string): string {
  const t = raw.toLowerCase();
  if (t === "claude") return "Claude";
  if (t === "skills") return "Skills";
  if (!t) return raw;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export default async function AiHubPage({ searchParams }: Props) {
  const { tag: tagRaw } = await searchParams;
  const tag = tagRaw?.trim().toLowerCase() ?? "";
  const guides = await loadAllAiGuideIndexEntries();
  const filtered = tag
    ? guides.filter((g) =>
        g.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
      )
    : guides;

  return (
    <main className={mainWide}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero
        title="AI Guides"
        subtitle={
          <>
            Become time-rich and stay ahead in this new age of AI. All my
            guides are explained on my{" "}
            <a
              href={homeBioLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={siteLink}
            >
              Instagram
            </a>{" "}
            and{" "}
            <a
              href={homeBioLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={siteLink}
            >
              TikTok
            </a>{" "}
            channels. Pick a topic below or filter by tag.
          </>
        }
      />

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm font-medium text-zinc-500">Filter:</span>
        <InternalLink
          href="/ai"
          className={!tag ? tagPillActive : tagPillIdle}
        >
          All
        </InternalLink>
        {AI_HUB_FILTER_TAGS.map((t) => (
          <InternalLink
            key={t}
            href={`/ai?tag=${encodeURIComponent(t)}`}
            className={tag === t ? tagPillActive : tagPillIdle}
          >
            {formatFilterTagLabel(t)}
          </InternalLink>
        ))}
      </div>

      {tag ? (
        <p className="mt-4 text-center text-sm text-zinc-500">
          Showing resources tagged &quot;{formatFilterTagLabel(tag)}&quot; (
          {filtered.length} of {guides.length}).
        </p>
      ) : null}

      {guides.length === 0 ? (
        <p className="mt-10 text-center text-zinc-600">
          No guides yet. Add MDX files under{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm ring-1 ring-zinc-200/80">
            content/ai/
          </code>
          .
        </p>
      ) : (
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <AiResourceCard key={g.slug} guide={g} />
          ))}
        </div>
      )}

      {guides.length > 0 && filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-zinc-500">
          Nothing matches that tag. Try{" "}
          <InternalLink href="/ai" className="font-medium text-accent">
            showing all
          </InternalLink>
          .
        </p>
      ) : null}
    </main>
  );
}
