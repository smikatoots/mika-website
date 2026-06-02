import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { NotionDocument } from "@/components/notion/NotionDocument";
import { isNotionConfigured } from "@/lib/notion/config";
import { getPostByPath, getPostSummaries } from "@/lib/notion/posts";
import { formatSiteDate } from "@/lib/format-date";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";
import { BackLink } from "@/components/ui/BackLink";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

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
    openGraph: buildOpenGraph({ title: post.title }),
    twitter: buildTwitter({ title: post.title }),
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
    <article className={mainProse}>
      <BackLink href="/" label="Home" />
      <header className="mt-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          {post.title}
        </h1>
        <time
          dateTime={post.lastEdited}
          className={`mt-3 block ${textMuted}`}
        >
          Updated {formatSiteDate(post.lastEdited)}
        </time>
      </header>
      <div className="mt-10">
        <NotionDocument blocks={post.blocks} />
      </div>
    </article>
  );
}
