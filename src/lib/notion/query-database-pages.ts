/**
 * Plain Notion DB queries — safe for CLI scripts (no next/cache).
 */

import { getNotionClient } from "./client";
import { isNotionConfigured, notionEnv } from "./config";
import { isPublished } from "./properties";

import type { DatabaseObjectResponse, PageObjectResponse } from "@notionhq/client";

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

async function getPrimaryDataSourceId(): Promise<string | null> {
  const notion = getNotionClient();
  const db = await notion.databases.retrieve({
    database_id: notionEnv.databaseId!,
  });
  if (db.object !== "database") {
    return null;
  }
  const full = db as DatabaseObjectResponse;
  const first = full.data_sources?.[0];
  return first?.id ?? null;
}

/** All published pages in the blog database (same logic as posts.ts, no Next.js cache). */
export async function queryDatabasePages(): Promise<PageObjectResponse[]> {
  if (!isNotionConfigured()) {
    return [];
  }
  const notion = getNotionClient();
  const dataSourceId = await getPrimaryDataSourceId();
  if (!dataSourceId) {
    return [];
  }

  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
      result_type: "page",
    });
    for (const row of res.results) {
      const page = asFullPage(row);
      if (page && isPublished(page)) {
        pages.push(page);
      }
    }
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  return pages;
}
