import type { Metadata } from "next";

import { PressCard } from "@/components/press/PressCard";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";
import { loadPressManifest } from "@/lib/press/manifest";
import { BackLink } from "@/components/ui/BackLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainWide } from "@/lib/ui/site-styles";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press, podcasts, talks, and features — media gallery from the archive.",
  openGraph: buildOpenGraph({ title: "Press" }),
  twitter: buildTwitter({ title: "Press" }),
};

export default async function PressIndexPage() {
  const { items } = await loadPressManifest();

  return (
    <main className={mainWide}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero
        eyebrow="✦ In the media"
        title="Press"
        subtitle="Articles, podcasts, and appearances."
      />

      {items.length === 0 ? (
        <p className="mt-12 text-center text-zinc-600">
          No press items yet. Run{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-900 ring-1 ring-zinc-200/80">
            npm run sync:press
          </code>{" "}
          to pull from Notion.
        </p>
      ) : (
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PressCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
