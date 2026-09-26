import type { Metadata } from "next";

import { allTagsFromManifest, loadBlogManifest } from "@/lib/blog/manifest";
import { formatSiteDate } from "@/lib/format-date";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";
import { BackLink } from "@/components/ui/BackLink";
import { InternalLink } from "@/components/ui/InternalLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainWide } from "@/lib/ui/site-styles";

const title = "Blog";
const description = "Articles and notes";
const canonical = canonicalUrl("/blog");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: buildOpenGraph({ title, description, url: canonical }),
  twitter: buildTwitter({ title, description }),
};

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

const listTagClass =
  "rounded-full border border-[var(--mr-line)] px-2 py-0.5 text-xs font-medium text-[var(--mr-muted)]";

export default async function BlogIndexPage({ searchParams }: Props) {
  const { tag: tagRaw } = await searchParams;
  const tag = tagRaw?.trim() ?? "";
  const { posts } = await loadBlogManifest();
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.published ?? b.lastEdited).getTime() -
      new Date(a.published ?? a.lastEdited).getTime(),
  );
  const filtered = tag
    ? sorted.filter((p) => (p.tags ?? []).includes(tag))
    : sorted;
  const allTags = allTagsFromManifest(posts);

  const tagPillActive =
    "rounded-full border px-3 py-1 text-sm font-semibold transition" +
    " border-[var(--mr-watermelon)] bg-[var(--mr-paper)] text-[var(--mr-watermelon)]";
  const tagPillIdle =
    "rounded-full border px-3 py-1 text-sm font-semibold transition" +
    " border-[var(--mr-line)] text-[var(--mr-muted)] hover:border-[var(--mr-watermelon)] hover:text-[var(--mr-watermelon)]";

  return (
    <main className={mainWide}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero eyebrow="✦ Writing" title="Blog" />

      {posts.length === 0 ? (
        <p className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
          No synced posts yet. With{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-amber-900 ring-1 ring-amber-200/80">
            NOTION_API_KEY
          </code>{" "}
          and{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-amber-900 ring-1 ring-amber-200/80">
            NOTION_BLOG_DATABASE_ID
          </code>{" "}
          set, run{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-amber-900 ring-1 ring-amber-200/80">
            yarn sync:blog
          </code>{" "}
          to export Notion pages into{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-amber-900 ring-1 ring-amber-200/80">
            content/blog/*.mdx
          </code>{" "}
          and refresh the list.
        </p>
      ) : null}

      {allTags.length > 0 ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-semibold" style={{ color: "var(--mr-muted)" }}>Filter:</span>
          <InternalLink
            href="/blog"
            className={!tag ? tagPillActive : tagPillIdle}
          >
            All
          </InternalLink>
          {allTags.map((t) => (
            <InternalLink
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={tag === t ? tagPillActive : tagPillIdle}
            >
              {t}
            </InternalLink>
          ))}
        </div>
      ) : null}

      {tag ? (
        <p className="mt-4 text-center text-sm text-zinc-500">
          Showing posts tagged &quot;{tag}&quot; ({filtered.length} of{" "}
          {posts.length}).
        </p>
      ) : null}

      <ul
        className="mx-auto mt-8 max-w-4xl text-left"
        style={{ borderBottom: "1px solid var(--mr-line)" }}
      >
        {filtered.map((post) => (
          <li key={post.slug} style={{ borderTop: "1px solid var(--mr-line)" }}>
            <InternalLink
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-1 gap-x-4 gap-y-1 py-3 transition sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
              style={{ textDecoration: "none" }}
            >
              <span
                className="min-w-0 flex items-center gap-2 text-left transition-colors"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  fontWeight: "var(--mr-weight-semi)",
                  color: "var(--mr-ink)",
                }}
              >
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  style={{ color: "var(--mr-watermelon)" }}
                >
                  →
                </span>
                <span className="group-hover:text-[var(--mr-watermelon)] transition-colors">
                  {post.title}
                </span>
              </span>
              <span
                className="flex flex-wrap items-center justify-start gap-2 sm:justify-end"
                style={{ fontSize: "var(--mr-text-xs)", color: "var(--mr-muted)" }}
              >
                {(post.tags?.length ?? 0) > 0 ? (
                  <span className="flex flex-wrap items-center justify-end gap-1">
                    {(post.tags ?? []).map((t) => (
                      <span key={t} className={listTagClass}>
                        {t}
                      </span>
                    ))}
                  </span>
                ) : null}
                <time
                  className="whitespace-nowrap tabular-nums"
                  dateTime={post.published ?? post.lastEdited}
                >
                  {formatSiteDate(post.published ?? post.lastEdited, "short")}
                </time>
              </span>
            </InternalLink>
          </li>
        ))}
      </ul>
    </main>
  );
}
