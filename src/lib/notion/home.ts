import { unstable_cache } from "next/cache";

import { isHomePageConfigured, notionEnv } from "./config";
import { fetchBlockTree, type BlockTree } from "./blocks";
import { NOTION_SIGNED_MEDIA_CACHE_SECONDS } from "./notion-signed-url-cache";

async function fetchHomeBlocksInternal(): Promise<BlockTree[]> {
  if (!isHomePageConfigured()) {
    return [];
  }
  return fetchBlockTree(notionEnv.homePageId!);
}

export async function getHomePageBlocks(): Promise<BlockTree[]> {
  if (!isHomePageConfigured()) {
    return [];
  }
  return unstable_cache(
    fetchHomeBlocksInternal,
    ["notion-home-blocks", notionEnv.homePageId!],
    {
      tags: ["posts", "home"],
      revalidate: NOTION_SIGNED_MEDIA_CACHE_SECONDS,
    },
  )();
}
