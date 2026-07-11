import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AiGuideComingSoonBlock } from "@/components/ai-guides/AiGuideComingSoonBlock";
import { renderAiGuideMdx } from "@/components/ai-guides/render-ai-guide-mdx";
import {
  loadAiGuideMdxPost,
  loadAllAiGuideIndexEntries,
  resolveAiGuidePublishedDate,
} from "@/lib/ai-guides/load-guides";
import { formatSiteDate } from "@/lib/format-date";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";
import { BackLink } from "@/components/ui/BackLink";
import { AuthorByline } from "@/components/ui/AuthorByline";
import { Ga4TrackedInternalLink } from "@/components/analytics/Ga4TrackedLink";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { SITE_URL } from "@/lib/site";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

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
  const canonical = canonicalUrl(`/ai/${slug}`);
  return {
    title: guide.frontmatter.title,
    description,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title: guide.frontmatter.title,
      description,
      url: canonical,
      dynamicImage: true,
    }),
    twitter: buildTwitter({
      title: guide.frontmatter.title,
      description,
      dynamicImage: true,
    }),
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
  const isComingSoon = frontmatter.status === "coming-soon";
  const description =
    frontmatter.description.trim() || frontmatter.title;

  return (
    <article className={mainProse}>
      {!isComingSoon ? (
        <ArticleStructuredData
          type="TechArticle"
          headline={frontmatter.title}
          description={description}
          datePublished={publishedAt}
          url={`${SITE_URL}/ai/${slug}`}
        />
      ) : null}
      <BackLink href="/ai" label="AI Guides" />
      <header className="mt-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          {frontmatter.title}
        </h1>
        <div
          className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 ${textMuted}`}
        >
          <time dateTime={publishedAt} className="whitespace-nowrap">
            Published {formatSiteDate(publishedAt)}
          </time>
          {(frontmatter.tags?.length ?? 0) > 0 ? (
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {frontmatter.tags.map((t) => (
                <li key={t}>
                  <Ga4TrackedInternalLink
                    href={`/ai?tag=${encodeURIComponent(t)}`}
                    className={tagClass}
                    ga4EventName="ai_tag_click"
                    ga4Params={{
                      cta_label: t,
                      cta_location: "ai_guide_detail_tags",
                      destination_url: `/ai?tag=${encodeURIComponent(t)}`,
                      link_type: "internal_ai_tag",
                    }}
                  >
                    {t}
                  </Ga4TrackedInternalLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <AuthorByline />
      </header>
      {isComingSoon ? (
        <AiGuideComingSoonBlock description={frontmatter.description} />
      ) : (
        <div className="mt-10">{content}</div>
      )}
    </article>
  );
}
