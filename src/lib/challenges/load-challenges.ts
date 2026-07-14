import { cache } from "react";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { ChallengeIndexEntry } from "./types";

export function assertSafeChallengeSlug(slug: string): boolean {
  if (!slug || slug.length > 200) return false;
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return false;
  }
  return /^[\w.-]+$/u.test(slug);
}

const contentDir = path.join(process.cwd(), "content/challenges");

async function loadChallengeMdxSourceUncached(
  slug: string,
): Promise<string | null> {
  if (!assertSafeChallengeSlug(slug)) {
    return null;
  }
  const file = path.join(contentDir, `${slug}.mdx`);
  try {
    return await readFile(file, "utf-8");
  } catch {
    return null;
  }
}

const loadChallengeMdxSourceCached = cache(loadChallengeMdxSourceUncached);

export async function loadChallengeMdxSource(
  slug: string,
): Promise<string | null> {
  if (process.env.NODE_ENV !== "production") {
    return loadChallengeMdxSourceUncached(slug);
  }
  return loadChallengeMdxSourceCached(slug);
}

export type LoadedChallengeMdx = {
  source: string;
};

export async function loadChallengeMdxPost(
  slug: string,
): Promise<LoadedChallengeMdx | null> {
  const source = await loadChallengeMdxSource(slug);
  if (!source) return null;
  return { source };
}

function toSortableDateMs(value: string): number {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseFrontmatter(
  data: Record<string, unknown>,
): Omit<ChallengeIndexEntry, "slug"> | null {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  const published =
    typeof data.published === "string" ? data.published.trim() : "";
  if (!title || !description || !published) {
    return null;
  }
  return { title, description, published };
}

async function loadAllChallengeIndexEntriesUncached(): Promise<
  ChallengeIndexEntry[]
> {
  let names: string[];
  try {
    names = await readdir(contentDir);
  } catch {
    return [];
  }
  const mdxFiles = names.filter((n) => n.endsWith(".mdx"));
  const entries: ChallengeIndexEntry[] = [];
  for (const name of mdxFiles) {
    const slug = name.replace(/\.mdx$/u, "");
    if (!assertSafeChallengeSlug(slug)) continue;
    const raw = await readFile(path.join(contentDir, name), "utf-8");
    const { data } = matter(raw);
    const fm = parseFrontmatter(data as Record<string, unknown>);
    if (!fm) continue;
    entries.push({ slug, ...fm });
  }
  return entries.sort(
    (a, b) => toSortableDateMs(b.published) - toSortableDateMs(a.published),
  );
}

const loadAllChallengeIndexEntriesCached = cache(
  loadAllChallengeIndexEntriesUncached,
);

export async function loadAllChallengeIndexEntries(): Promise<
  ChallengeIndexEntry[]
> {
  if (process.env.NODE_ENV !== "production") {
    return loadAllChallengeIndexEntriesUncached();
  }
  return loadAllChallengeIndexEntriesCached();
}

export async function getChallengeEntry(
  slug: string,
): Promise<ChallengeIndexEntry | null> {
  const entries = await loadAllChallengeIndexEntries();
  return entries.find((entry) => entry.slug === slug) ?? null;
}
