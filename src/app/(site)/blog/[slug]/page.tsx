import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderBlogMdx } from "@/components/blog/render-blog-mdx";
import { loadBlogManifest } from "@/lib/blog/manifest";
import { loadBlogMdxPost } from "@/lib/blog/load-mdx-post";
import { formatSiteDate } from "@/lib/format-date";
import { BackLink } from "@/components/ui/BackLink";
import { BlogPostViewTracker } from "@/components/blog/BlogPostViewTracker";
import { InternalLink } from "@/components/ui/InternalLink";
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
  return { content, frontmatter };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return { title: "Not found" };
  }
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.title,
    openGraph: { title: post.frontmatter.title },
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

  return (
    <article className={mainProse}>
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
      </header>
      <div className="mt-10">{content}</div>
    </article>
  );
}
