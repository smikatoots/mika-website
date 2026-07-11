import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderBlogMdx } from "@/components/blog/render-blog-mdx";
import { loadBlogManifest } from "@/lib/blog/manifest";
import { loadBlogMdxPost } from "@/lib/blog/load-mdx-post";
import { formatSiteDate } from "@/lib/format-date";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";
import { excerptFromMdx } from "@/lib/mdx-excerpt";
import { BackLink } from "@/components/ui/BackLink";
import { AuthorByline } from "@/components/ui/AuthorByline";
import { BlogPostViewTracker } from "@/components/blog/BlogPostViewTracker";
import { InternalLink } from "@/components/ui/InternalLink";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { FaqList } from "@/components/ai-guides/FaqSection";
import { FaqStructuredData } from "@/components/ai-guides/FaqStructuredData";
import { RelatedReading } from "@/components/blog/RelatedReading";
import { normalizeAiGuideFaq } from "@/lib/ai-guides/faq";
import { getAutoRelatedPosts, normalizeRelated } from "@/lib/blog/related";
import { SITE_URL } from "@/lib/site";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const { posts } = await loadBlogManifest();
  return posts.map((p) => ({ slug: p.slug }));
}

const getBlogPost = cache(async (slug: string) => {
  const loaded = await loadBlogMdxPost(slug);
  if (!loaded) {
    return null;
  }

  const { content, frontmatter } = await renderBlogMdx(loaded.source);
  const description =
    frontmatter.description?.trim() || excerptFromMdx(loaded.source);
  return { content, frontmatter, description };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return { title: "Not found" };
  }
  const canonical = canonicalUrl(`/blog/${slug}`);
  return {
    title: post.frontmatter.title,
    description: post.description,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title: post.frontmatter.title,
      description: post.description,
      url: canonical,
      dynamicImage: true,
    }),
    twitter: buildTwitter({
      title: post.frontmatter.title,
      description: post.description,
      dynamicImage: true,
    }),
  };
}

const tagClass =
  "rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-accent/40 hover:text-accent-hover";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    notFound();
  }

  const { content, frontmatter } = post;
  const publishedAt = frontmatter.published ?? frontmatter.lastEdited;
  const updatedAt =
    frontmatter.lastEdited && frontmatter.lastEdited !== publishedAt
      ? frontmatter.lastEdited
      : null;
  const faq = normalizeAiGuideFaq(frontmatter.faq);
  // Curated `related` wins; otherwise fall back to tag-driven related posts.
  let related = normalizeRelated(frontmatter.related);
  if (related.length === 0) {
    const { posts } = await loadBlogManifest();
    related = getAutoRelatedPosts(slug, frontmatter.tags ?? [], posts);
  }
  const showFaq = faq.length > 0;
  const showExtras = showFaq || related.length > 0;

  return (
    <article className={mainProse}>
      <ArticleStructuredData
        type="BlogPosting"
        headline={frontmatter.title}
        description={post.description}
        datePublished={publishedAt}
        dateModified={frontmatter.lastEdited}
        url={`${SITE_URL}/blog/${slug}`}
      />
      {showFaq ? <FaqStructuredData items={faq} /> : null}
      <BlogPostViewTracker slug={slug} title={frontmatter.title} />
      <BackLink href="/blog" label="Blog" />
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
          {updatedAt ? (
            <time dateTime={updatedAt} className="whitespace-nowrap">
              Updated {formatSiteDate(updatedAt)}
            </time>
          ) : null}
          {(frontmatter.tags?.length ?? 0) > 0 ? (
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {frontmatter.tags.map((t) => (
                <li key={t}>
                  <InternalLink
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className={tagClass}
                  >
                    {t}
                  </InternalLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <AuthorByline />
      </header>
      <div className="mt-10">{content}</div>
      {showExtras ? (
        <section className="mt-16 border-t border-zinc-200 pt-10">
          {showFaq ? <FaqList items={faq} /> : null}
          {related.length > 0 ? (
            <div className={showFaq ? "mt-12" : ""}>
              <RelatedReading items={related} />
            </div>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}
