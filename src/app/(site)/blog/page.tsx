import Link from "next/link";
import type { Metadata } from "next";

import { allTagsFromManifest, loadBlogManifest } from "@/lib/blog/manifest";
import { BackLink } from "@/components/ui/BackLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainWide } from "@/lib/ui/site-styles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and notes",
};

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogIndexPage({ searchParams }: Props) {
  const { tag: tagRaw } = await searchParams;
  const tag = tagRaw?.trim() ?? "";
  const { posts } = await loadBlogManifest();
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
  );
  const filtered = tag
    ? sorted.filter((p) => (p.tags ?? []).includes(tag))
    : sorted;
  const allTags = allTagsFromManifest(posts);

  const tagPillActive =
    "rounded-full border border-teal-500/50 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800";
  const tagPillIdle =
    "rounded-full border border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900";

  return (
    <main className={mainWide}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero emoji="✏️" title="Blog" />

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
            npm run sync:blog
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
          <span className="text-sm font-medium text-zinc-500">Filter:</span>
          <Link
            href="/blog"
            className={!tag ? tagPillActive : tagPillIdle}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={tag === t ? tagPillActive : tagPillIdle}
            >
              {t}
            </Link>
          ))}
        </div>
      ) : null}

      {tag ? (
        <p className="mt-4 text-center text-sm text-zinc-500">
          Showing posts tagged &quot;{tag}&quot; ({filtered.length} of{" "}
          {posts.length}).
        </p>
      ) : null}

      <ul className="mx-auto mt-12 max-w-2xl space-y-4 text-center">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-transparent px-6 py-5 transition hover:border-zinc-200 hover:bg-zinc-50"
            >
              <span className="block font-medium text-zinc-950 group-hover:text-teal-700">
                {post.title}
              </span>
              <span className="mt-2 block text-sm text-zinc-500">
                {new Date(post.lastEdited).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {(post.tags?.length ?? 0) > 0 ? (
                <span className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {(post.tags ?? []).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600"
                    >
                      {t}
                    </span>
                  ))}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
