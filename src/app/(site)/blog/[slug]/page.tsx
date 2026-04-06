import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderBlogMdx } from "@/components/blog/render-blog-mdx";
import type { BlogPostFrontmatter } from "@/lib/blog/types";
import { loadBlogManifest } from "@/lib/blog/manifest";
import { loadBlogMdxPost } from "@/lib/blog/load-mdx-post";
import { BackLink } from "@/components/ui/BackLink";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { posts } = await loadBlogManifest();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadBlogMdxPost(slug);
  if (!loaded) {
    return { title: "Not found" };
  }
  const { data } = matter(loaded.source);
  const fm = data as BlogPostFrontmatter;
  return {
    title: fm.title,
    description: fm.title,
    openGraph: { title: fm.title },
  };
}

const tagClass =
  "rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-teal-300 hover:text-teal-800";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const loaded = await loadBlogMdxPost(slug);
  if (!loaded) {
    notFound();
  }

  const { content, frontmatter } = await renderBlogMdx(loaded.source);

  return (
    <article className={mainProse}>
      <BackLink href="/blog" label="Blog" />
      <header className="mt-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          {frontmatter.title}
        </h1>
        <time
          dateTime={frontmatter.lastEdited}
          className={`mt-3 block ${textMuted}`}
        >
          Updated{" "}
          {new Date(frontmatter.lastEdited).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {(frontmatter.tags?.length ?? 0) > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((t) => (
              <li key={t}>
                <Link href={`/blog?tag=${encodeURIComponent(t)}`} className={tagClass}>
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </header>
      <div className="mt-10">{content}</div>
    </article>
  );
}
