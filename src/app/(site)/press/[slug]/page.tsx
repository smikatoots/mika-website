import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderPressMdx } from "@/components/press/render-press-mdx";
import { loadPressManifest } from "@/lib/press/manifest";
import type { PressFrontmatter } from "@/lib/press/types";
import { loadPressMdxPost } from "@/lib/press/load-mdx";
import { BackLink } from "@/components/ui/BackLink";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadPressMdxPost(slug);
  if (!loaded) return { title: "Not found" };
  const { data } = matter(loaded.source);
  const fm = data as PressFrontmatter;
  return {
    title: fm.title,
    description: fm.title,
    openGraph: { title: fm.title },
  };
}

export default async function PressDetailPage({ params }: Props) {
  const { slug } = await params;
  const loaded = await loadPressMdxPost(slug);
  if (!loaded) notFound();

  const { data } = matter(loaded.source);
  const fm = data as PressFrontmatter;
  const { content } = await renderPressMdx(loaded.source);
  const ext = externalHref(fm.url);

  return (
    <article className={mainProse}>
      <BackLink href="/press" label="Press" />

      <header className="mt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl md:text-4xl">
          {fm.title}
        </h1>
        {fm.lastEdited ? (
          <p className={`mt-2 ${textMuted}`}>
            Updated{" "}
            {new Date(fm.lastEdited).toLocaleDateString("en-US", {
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

      <div className="mt-10">{content}</div>
    </article>
  );
}
