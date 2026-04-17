import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AiGuideSocialCtaBlock } from "@/components/ai-guides/AiGuideSocialCtaBlock";
import { renderAiGuideMdx } from "@/components/ai-guides/render-ai-guide-mdx";
import {
  loadAiGuideMdxPost,
  loadAllAiGuideIndexEntries,
  resolveAiGuidePublishedDate,
} from "@/lib/ai-guides/load-guides";
import { BackLink } from "@/components/ui/BackLink";
import { InternalLink } from "@/components/ui/InternalLink";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

function formatPublishedDate(date: string): string {
  // Parse bare YYYY-MM-DD as UTC to avoid local timezone day shifts.
  const normalized = /^\d{4}-\d{2}-\d{2}$/u.test(date)
    ? `${date}T00:00:00Z`
    : date;

  return new Date(normalized).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function generateStaticParams() {
  const guides = await loadAllAiGuideIndexEntries();
  return guides.map((g) => ({ slug: g.slug }));
}

const getAiGuide = cache(async (slug: string) => {
  const loaded = await loadAiGuideMdxPost(slug);
  if (!loaded) {
    return null;
  }
  const { content, frontmatter } = await renderAiGuideMdx(loaded.source);
  return { content, frontmatter };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getAiGuide(slug);
  if (!guide) {
    return { title: "Not found" };
  }
  const description =
    guide.frontmatter.description.trim() || guide.frontmatter.title;
  return {
    title: guide.frontmatter.title,
    description,
    openGraph: { title: guide.frontmatter.title, description },
  };
}

const tagClass =
  "rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-accent/40 hover:text-accent-hover";

export default async function AiGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getAiGuide(slug);
  if (!guide) {
    notFound();
  }

  const { content, frontmatter } = guide;
  const publishedAt = await resolveAiGuidePublishedDate(
    slug,
    frontmatter.published,
  );

  return (
    <article className={mainProse}>
      <BackLink href="/ai" label="AI Guides" />
      <header className="mt-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          {frontmatter.title}
        </h1>
        <div
          className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 ${textMuted}`}
        >
          <time dateTime={publishedAt} className="whitespace-nowrap">
            Published {formatPublishedDate(publishedAt)}
          </time>
          {(frontmatter.tags?.length ?? 0) > 0 ? (
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {frontmatter.tags.map((t) => (
                <li key={t}>
                  <InternalLink
                    href={`/ai?tag=${encodeURIComponent(t)}`}
                    className={tagClass}
                  >
                    {t}
                  </InternalLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>
      <div className="mt-10">{content}</div>
      <AiGuideSocialCtaBlock />
    </article>
  );
}
