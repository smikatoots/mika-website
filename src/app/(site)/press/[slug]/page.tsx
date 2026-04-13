import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderPressMdx } from "@/components/press/render-press-mdx";
import { loadPressManifest } from "@/lib/press/manifest";
import { loadPressMdxPost } from "@/lib/press/load-mdx";
import { BackLink } from "@/components/ui/BackLink";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

function externalHref(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const u = raw.trim();
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

const extCtaClass =
  "inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-accent shadow-sm transition hover:border-accent/30 hover:bg-accent/10";

export async function generateStaticParams() {
  const { items } = await loadPressManifest();
  return items.map((p) => ({ slug: p.slug }));
}

const getPressPost = cache(async (slug: string) => {
  const loaded = await loadPressMdxPost(slug);
  if (!loaded) {
    return null;
  }

  const { content, frontmatter } = await renderPressMdx(loaded.source);
  return { content, frontmatter };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPressPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.title,
    openGraph: { title: post.frontmatter.title },
  };
}

export default async function PressDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPressPost(slug);
  if (!post) notFound();

  const ext = externalHref(post.frontmatter.url);

  return (
    <article className={mainProse}>
      <BackLink href="/press" label="Press" />

      <header className="mt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl md:text-4xl">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.lastEdited ? (
          <p className={`mt-2 ${textMuted}`}>
            Updated{" "}
            {new Date(
              post.frontmatter.lastEdited,
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
        {ext ? (
          <p className="mt-6">
            <a
              href={ext}
              className={extCtaClass}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open article / media →
            </a>
          </p>
        ) : null}
      </header>

      <div className="mt-10">{post.content}</div>
    </article>
  );
}
