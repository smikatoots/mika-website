import Link from "next/link";
import type { Metadata } from "next";

import { allTagsFromManifest, loadBlogManifest } from "@/lib/blog/manifest";

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
  const { posts, generatedAt } = await loadBlogManifest();
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
  );
  const filtered = tag
    ? sorted.filter((p) => (p.tags ?? []).includes(tag))
    : sorted;
  const allTags = allTagsFromManifest(posts);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-50">
        Blog
      </h1>

      {posts.length === 0 ? (
        <p className="mt-6 rounded-lg border border-amber-900/60 bg-amber-950/40 p-4 text-amber-200">
          No synced posts yet. With{" "}
          <code className="rounded bg-amber-900/60 px-1 text-amber-100">
            NOTION_API_KEY
          </code>{" "}
          and{" "}
          <code className="rounded bg-amber-900/60 px-1 text-amber-100">
            NOTION_BLOG_DATABASE_ID
          </code>{" "}
          set, run{" "}
          <code className="rounded bg-amber-900/60 px-1 text-amber-100">
            npm run sync:blog
          </code>{" "}
          to export Notion pages into{" "}
          <code className="rounded bg-amber-900/60 px-1 text-amber-100">
            content/blog/*.mdx
          </code>{" "}
          and refresh the list.
        </p>
      ) : null}

      {allTags.length > 0 ? (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-zinc-500">Filter:</span>
          <Link
            href="/blog"
            className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
              !tag
                ? "border-teal-500/60 bg-teal-950/40 text-teal-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                tag === t
                  ? "border-teal-500/60 bg-teal-950/40 text-teal-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      ) : null}

      {tag ? (
        <p className="mt-4 text-sm text-zinc-500">
          Showing posts tagged &quot;{tag}&quot; ({filtered.length} of{" "}
          {posts.length}).
        </p>
      ) : null}

      {generatedAt ? (
        <p className="mt-2 text-xs text-zinc-600">
          Index synced {new Date(generatedAt).toLocaleString()}
        </p>
      ) : null}

      <ul className="mt-10 space-y-5">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-transparent px-0 py-1 transition hover:border-zinc-800 hover:bg-zinc-900/50"
            >
              <span className="font-medium text-zinc-100 group-hover:text-teal-400">
                {post.title}
              </span>
              <span className="mt-1 block text-sm text-zinc-500">
                {new Date(post.lastEdited).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {(post.tags?.length ?? 0) > 0 ? (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {(post.tags ?? []).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-700/80 bg-zinc-900/30 px-2 py-0.5 text-xs text-zinc-400"
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
