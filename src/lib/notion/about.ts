import { unstable_cache } from "next/cache";
import type { PageObjectResponse } from "@notionhq/client";

import { isAboutPageConfigured, notionEnv } from "./config";
import { fetchBlockTree, type BlockTree } from "./blocks";
import { getNotionClient } from "./client";
import { getTitle } from "./properties";

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

export type AboutEnvPage = { title: string; blocks: BlockTree[] };

async function fetchAboutFromEnvInternal(): Promise<AboutEnvPage | null> {
  if (!isAboutPageConfigured()) return null;
  const notion = getNotionClient();
  const id = notionEnv.aboutPageId!;
  const [pageRes, blocks] = await Promise.all([
    notion.pages.retrieve({ page_id: id }),
    fetchBlockTree(id),
  ]);
  const full = asFullPage(pageRes);
  const rawTitle = full ? getTitle(full) : "About";
  const title = rawTitle === "Untitled" ? "About" : rawTitle;
  return { title, blocks };
}

export async function getAboutPageFromEnv(): Promise<AboutEnvPage | null> {
  if (!isAboutPageConfigured()) return null;
  return unstable_cache(
    fetchAboutFromEnvInternal,
    ["notion-about-env", notionEnv.aboutPageId!],
    { tags: ["posts", "about"], revalidate: 3600 },
  )();
}
