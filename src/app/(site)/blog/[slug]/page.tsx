import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderBlogMdx } from "@/components/blog/render-blog-mdx";
import type { BlogPostFrontmatter } from "@/lib/blog/types";
import { loadBlogManifest } from "@/lib/blog/manifest";
import { loadBlogMdxPost } from "@/lib/blog/load-mdx-post";

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const loaded = await loadBlogMdxPost(slug);
  if (!loaded) {
    notFound();
  }

  const { content, frontmatter } = await renderBlogMdx(loaded.source);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/blog"
        className="text-sm font-medium text-teal-400 hover:underline"
      >
        ← Blog
      </Link>
      <header className="mt-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50">
          {frontmatter.title}
        </h1>
        <time
          dateTime={frontmatter.lastEdited}
          className="mt-3 block text-sm text-zinc-500"
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
                <Link
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className="rounded-full border border-zinc-700 bg-zinc-900/40 px-3 py-1 text-xs font-medium text-zinc-400 transition hover:border-zinc-600 hover:text-teal-400"
                >
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
