import { cache } from "react";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { AiGuideIndexEntry } from "./types";

export function assertSafeAiGuideSlug(slug: string): boolean {
  if (!slug || slug.length > 200) return false;
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return false;
  }
  return /^[\w.-]+$/u.test(slug);
}

const contentDir = path.join(process.cwd(), "content/ai");

async function loadAiGuideMdxSourceUncached(
  slug: string,
): Promise<string | null> {
  if (!assertSafeAiGuideSlug(slug)) {
    return null;
  }
  const file = path.join(contentDir, `${slug}.mdx`);
  try {
    return await readFile(file, "utf-8");
  } catch {
    return null;
  }
}

const loadAiGuideMdxSourceCached = cache(loadAiGuideMdxSourceUncached);

export async function loadAiGuideMdxSource(
  slug: string,
): Promise<string | null> {
  // In development, avoid stale content when creating/editing guide files.
  if (process.env.NODE_ENV !== "production") {
    return loadAiGuideMdxSourceUncached(slug);
  }
  return loadAiGuideMdxSourceCached(slug);
}

export type LoadedAiGuideMdx = {
  source: string;
};

export async function loadAiGuideMdxPost(
  slug: string,
): Promise<LoadedAiGuideMdx | null> {
  const source = await loadAiGuideMdxSource(slug);
  if (!source) return null;
  return { source };
}

function asIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function toSortableDateMs(value: string): number {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function resolveAiGuidePublishedDate(
  slug: string,
  frontmatterPublished?: string,
): Promise<string> {
  const cleaned = frontmatterPublished?.trim() ?? "";
  if (cleaned) return cleaned;
  if (!assertSafeAiGuideSlug(slug)) return asIsoDate(new Date());

  const file = path.join(contentDir, `${slug}.mdx`);
  try {
    const s = await stat(file);
    const sourceDate =
      s.birthtimeMs > 0 && Number.isFinite(s.birthtimeMs)
        ? s.birthtime
        : s.mtime;
    return asIsoDate(sourceDate);
  } catch {
    return asIsoDate(new Date());
  }
}

function parseFrontmatter(
  data: Record<string, unknown>,
  publishedFallback: string,
): Omit<AiGuideIndexEntry, "slug"> | null {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  const publishedRaw =
    typeof data.published === "string" ? data.published.trim() : "";
  const published = publishedRaw || publishedFallback;
  const cta = typeof data.cta === "string" ? data.cta.trim() : "Open";
  const orderRaw = data.order;
  const order =
    typeof orderRaw === "number" && Number.isFinite(orderRaw)
      ? orderRaw
      : typeof orderRaw === "string" && orderRaw.trim()
        ? Number(orderRaw)
        : 999;
  const tagsRaw = data.tags;
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw
        .filter((t): t is string => typeof t === "string")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  if (!title || !description) {
    return null;
  }
  return {
    title,
    description,
    tags,
    published: published || publishedFallback,
    cta: cta || "Open",
    order: Number.isFinite(order) ? order : 999,
  };
}

async function loadAllAiGuideIndexEntriesUncached(): Promise<
  AiGuideIndexEntry[]
> {
  let names: string[];
  try {
    names = await readdir(contentDir);
  } catch {
    return [];
  }
  const mdxFiles = names.filter((n) => n.endsWith(".mdx"));
  const entries: AiGuideIndexEntry[] = [];
  for (const name of mdxFiles) {
    const slug = name.replace(/\.mdx$/u, "");
    if (!assertSafeAiGuideSlug(slug)) continue;
    const raw = await readFile(path.join(contentDir, name), "utf-8");
    const { data } = matter(raw);
    const publishedFallback = await resolveAiGuidePublishedDate(slug);
    const fm = parseFrontmatter(
      data as Record<string, unknown>,
      publishedFallback,
    );
    if (!fm) continue;
    entries.push({ slug, ...fm });
  }
  return entries.sort((a, b) => {
    const dateDiff = toSortableDateMs(b.published) - toSortableDateMs(a.published);
    if (dateDiff !== 0) return dateDiff;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

const loadAllAiGuideIndexEntriesCached = cache(loadAllAiGuideIndexEntriesUncached);

export async function loadAllAiGuideIndexEntries(): Promise<
  AiGuideIndexEntry[]
> {
  // In development, avoid stale file index after adding new guides.
  if (process.env.NODE_ENV !== "production") {
    return loadAllAiGuideIndexEntriesUncached();
  }
  return loadAllAiGuideIndexEntriesCached();
}
