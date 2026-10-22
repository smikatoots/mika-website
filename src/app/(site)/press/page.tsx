import type { Metadata } from "next";

import { PressCard } from "@/components/press/PressCard";
import { PressShelf } from "@/components/press/shelf/PressShelf";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";
import { loadPressManifest } from "@/lib/press/manifest";
import { buildPressShelf } from "@/lib/press/shelf-volumes";
import { PageHero } from "@/components/ui/PageHero";
import { mainWide } from "@/lib/ui/site-styles";

const canonical = canonicalUrl("/press");

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press, podcasts, talks, and features about Mika Reyes, from Forbes 30 Under 30 and the Parallax acquisition to The Wall Street Journal, bound into a 3D shelf you can pick up and read.",
  alternates: { canonical },
  openGraph: buildOpenGraph({ title: "Press", url: canonical }),
  twitter: buildTwitter({ title: "Press" }),
};

export default async function PressIndexPage() {
  const { items } = await loadPressManifest();

  if (items.length === 0) {
    return (
      <main className={mainWide}>
        <PageHero eyebrow="✦ In the media" title="Press" subtitle="Articles, podcasts, and appearances." />
        <p className="mt-12 text-center" style={{ color: "var(--mr-muted)" }}>
          No press items yet. Run <code>yarn sync:press</code> to pull from Notion.
        </p>
      </main>
    );
  }

  const volumes = await buildPressShelf(items);
  const byslug = new Map(items.map((item) => [item.slug, item]));

  return (
    <main>
      <PressShelf volumes={volumes} />

      {/* The full archive: every clipping as a crawlable link, and the whole
          page for anyone without WebGL. Grouped the same way as the shelf. */}
      <section
        id="archive"
        aria-label="Every clipping"
        className="mx-auto w-full max-w-6xl px-6 md:px-10"
        style={{ paddingBlock: "clamp(48px, 8vw, 80px)", scrollMarginTop: "24px" }}
      >
        {volumes.map((volume, index) => (
          <div key={volume.id} style={{ marginTop: index === 0 ? 0 : "clamp(40px, 6vw, 64px)" }}>
            <div
              className="flex items-center gap-3"
              style={{ borderBottom: "1px solid var(--mr-ink)", paddingBottom: "12px" }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "14px",
                  height: "14px",
                  background: volume.color,
                  border: "1px solid var(--mr-ink)",
                  borderRadius: "2px",
                  flex: "0 0 auto",
                }}
              />
              <h2 style={{ fontSize: "var(--mr-text-h3)", margin: 0 }}>
                {/* Opens this volume on the shelf above; without JS it is a
                    plain jump back to the shelf. */}
                <a
                  href="#press-shelf"
                  data-shelf-open={volume.id}
                  className="press-archive__volume-link"
                >
                  {volume.title}
                </a>
              </h2>
              <span
                style={{
                  marginLeft: "auto",
                  color: "var(--mr-muted)",
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-xs)",
                }}
              >
                Vol. {volume.roman} · {volume.items.length}
              </span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {volume.items.map((item) => {
                const entry = byslug.get(item.slug);
                return entry ? <PressCard key={item.slug} item={entry} /> : null;
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
