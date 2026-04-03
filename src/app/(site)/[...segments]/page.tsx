import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { NotionDocument } from "@/components/notion/NotionDocument";
import { isNotionConfigured } from "@/lib/notion/config";
import { getPostByPath, getPostSummaries } from "@/lib/notion/posts";

type Props = { params: Promise<{ segments: string[] }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  if (!isNotionConfigured()) return [];
  const posts = await getPostSummaries();
  return posts
    .filter((p) => !p.path.startsWith("blog/"))
    .map((p) => ({
      segments: p.path.split("/").filter(Boolean),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathStr = segments.join("/");
  if (!isNotionConfigured()) {
    return { title: pathStr };
  }
  const post = await getPostByPath(pathStr);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.title,
    openGraph: { title: post.title },
  };
}

export default async function SitePage({ params }: Props) {
  const { segments } = await params;
  const pathStr = segments.join("/");
  if (!pathStr) {
    notFound();
  }
  if (!isNotionConfigured()) {
    notFound();
  }
  if (pathStr.startsWith("blog/")) {
    notFound();
  }

  const post = await getPostByPath(pathStr);
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/"
        className="text-sm font-medium text-teal-400 hover:underline"
      >
        ← Home
      </Link>
      <header className="mt-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50">
          {post.title}
        </h1>
        <time
          dateTime={post.lastEdited}
          className="mt-3 block text-sm text-zinc-500"
        >
          Updated{" "}
          {new Date(post.lastEdited).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>
      <div className="mt-10">
        <NotionDocument blocks={post.blocks} />
      </div>
    </article>
  );
}
