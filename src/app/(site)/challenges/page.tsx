import type { Metadata } from "next";

import { loadAllChallengeIndexEntries } from "@/lib/challenges/load-challenges";
import { formatSiteDate } from "@/lib/format-date";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";
import { BackLink } from "@/components/ui/BackLink";
import { InternalLink } from "@/components/ui/InternalLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainWide } from "@/lib/ui/site-styles";

const title = "Challenges";
const description =
  "Difficult skills I'm challenging myself to do, with AI as my coach";
const canonical = canonicalUrl("/challenges");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: buildOpenGraph({ title, description, url: canonical }),
  twitter: buildTwitter({ title, description }),
};

export default async function ChallengesIndexPage() {
  const entries = await loadAllChallengeIndexEntries();

  return (
    <main className={mainWide}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero title="Challenges" subtitle={description} />

      <ul
        className="mx-auto mt-8 max-w-4xl text-left"
        style={{ borderBottom: "1px solid var(--mr-line)" }}
      >
        {entries.map((entry) => (
          <li
            key={entry.slug}
            style={{ borderTop: "1px solid var(--mr-line)" }}
          >
            <InternalLink
              href={`/challenges/${entry.slug}`}
              className="group grid grid-cols-1 gap-x-4 gap-y-1 py-3 transition sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
              style={{ textDecoration: "none" }}
            >
              <span
                className="min-w-0 flex items-center gap-2 text-left transition-colors"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  fontWeight: "var(--mr-weight-semi)",
                  color: "var(--mr-ink)",
                }}
              >
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  style={{ color: "var(--mr-watermelon)" }}
                >
                  →
                </span>
                <span className="group-hover:text-[var(--mr-watermelon)] transition-colors">
                  {entry.title}
                </span>
              </span>
              <span
                className="flex flex-wrap items-center justify-start gap-2 sm:justify-end"
                style={{ fontSize: "var(--mr-text-xs)", color: "var(--mr-muted)" }}
              >
                <time
                  className="whitespace-nowrap tabular-nums"
                  dateTime={entry.published}
                >
                  {formatSiteDate(entry.published, "short")}
                </time>
              </span>
            </InternalLink>
          </li>
        ))}
      </ul>
    </main>
  );
}
