import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderChallengeMdx } from "@/components/challenges/render-challenge-mdx";
import {
  loadAllChallengeIndexEntries,
  loadChallengeMdxPost,
} from "@/lib/challenges/load-challenges";
import { formatSiteDate } from "@/lib/format-date";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";
import { BackLink } from "@/components/ui/BackLink";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await loadAllChallengeIndexEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

const getChallenge = cache(async (slug: string) => {
  const loaded = await loadChallengeMdxPost(slug);
  if (!loaded) return null;
  const { content, frontmatter } = await renderChallengeMdx(loaded.source);
  return { content, frontmatter };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const challenge = await getChallenge(slug);
  if (!challenge) {
    return { title: "Not found" };
  }
  const { frontmatter } = challenge;
  const description = frontmatter.description.trim() || frontmatter.title;
  const canonical = canonicalUrl(`/challenges/${slug}`);
  return {
    title: frontmatter.title,
    description,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title: frontmatter.title,
      description,
      url: canonical,
    }),
    twitter: buildTwitter({ title: frontmatter.title, description }),
  };
}

export default async function ChallengeEntryPage({ params }: Props) {
  const { slug } = await params;
  const challenge = await getChallenge(slug);
  if (!challenge) {
    notFound();
  }

  const { content, frontmatter } = challenge;

  return (
    <article className={mainProse}>
      <BackLink href="/challenges" label="Challenges" />
      <header className="mt-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          {frontmatter.title}
        </h1>
        <div className={`mt-3 ${textMuted}`}>
          <time dateTime={frontmatter.published}>
            Started {formatSiteDate(frontmatter.published)}
          </time>
        </div>
      </header>
      <div className="mt-10">{content}</div>
    </article>
  );
}
