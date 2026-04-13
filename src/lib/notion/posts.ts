import { unstable_cache } from "next/cache";

import { isNotionConfigured, notionEnv } from "./config";
import { fetchBlockTree, type BlockTree } from "./blocks";
import { getNotionClient } from "./client";
import { getPublicPath, getTags, getTitle } from "./properties";
import { NOTION_SIGNED_MEDIA_CACHE_SECONDS } from "./notion-signed-url-cache";
import { queryDatabasePages } from "./query-database-pages";

import type { PageObjectResponse } from "@notionhq/client";

export { queryDatabasePages } from "./query-database-pages";

function normalizeNotionId(id: string): string {
  return id.replace(/-/g, "").toLowerCase();
}

export type PostSummary = {
  id: string;
  path: string;
  title: string;
  lastEdited: string;
  tags: string[];
};

export type PostWithBlocks = PostSummary & { blocks: BlockTree[] };

export { normalizeNotionId };

function asFullPage(p: unknown): PageObjectResponse | null {
  if (
    typeof p === "object" &&
    p !== null &&
    "object" in p &&
    (p as { object: string }).object === "page" &&
    "properties" in p
  ) {
    return p as PageObjectResponse;
  }
  return null;
}

async function listSummariesInternal(): Promise<PostSummary[]> {
  if (!isNotionConfigured()) return [];
  const pages = await queryDatabasePages();
  const summaries: PostSummary[] = [];
  for (const page of pages) {
    const path = getPublicPath(page);
    if (!path) continue;
    summaries.push({
      id: page.id,
      path,
      title: getTitle(page),
      lastEdited: page.last_edited_time,
      tags: getTags(page),
    });
  }
  return summaries.sort(
    (a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
  );
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  return unstable_cache(
    listSummariesInternal,
    ["notion-post-summaries"],
    { tags: ["posts"], revalidate: 3600 },
  )();
}

export async function getBlogSummaries(): Promise<PostSummary[]> {
  return getPostSummaries();
}

async function fetchPostByPathInternal(
  pathSegments: string,
): Promise<PostWithBlocks | null> {
  if (!isNotionConfigured()) return null;
  const pages = await queryDatabasePages();
  for (const page of pages) {
    const p = getPublicPath(page);
    if (p !== pathSegments) continue;
    const blocks = await fetchBlockTree(page.id);
    return {
      id: page.id,
      path: p,
      title: getTitle(page),
      lastEdited: page.last_edited_time,
      tags: getTags(page),
      blocks,
    };
  }
  return null;
}

export async function getPostByPath(
  pathSegments: string,
): Promise<PostWithBlocks | null> {
  return unstable_cache(
    async () => fetchPostByPathInternal(pathSegments),
    ["notion-post-by-path", pathSegments],
    {
      tags: ["posts", `post:${pathSegments}`],
      revalidate: NOTION_SIGNED_MEDIA_CACHE_SECONDS,
    },
  )();
}

export async function retrievePageMeta(
  pageId: string,
): Promise<{ publicPath: string | null } | null> {
  if (!isNotionConfigured()) return null;
  const notion = getNotionClient();
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const full = asFullPage(page);
    if (!full) return null;
    return {
      publicPath: getPublicPath(full),
    };
  } catch {
    return null;
  }
}

export async function isPageInBlogDatabase(pageId: string): Promise<boolean> {
  if (!isNotionConfigured()) return false;
  const notion = getNotionClient();
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const full = asFullPage(page);
    if (!full) return false;
    const parent = full.parent;
    const target = normalizeNotionId(notionEnv.databaseId!);
    if (parent.type === "database_id") {
      return normalizeNotionId(parent.database_id) === target;
    }
    if (parent.type === "data_source_id") {
      return normalizeNotionId(parent.database_id) === target;
    }
    return false;
  } catch {
    return false;
  }
}
