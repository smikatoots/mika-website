import { unstable_cache } from "next/cache";

import { isHomePageConfigured, notionEnv } from "./config";
import { fetchBlockTree, type BlockTree } from "./blocks";

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
    { tags: ["posts", "home"], revalidate: 3600 },
  )();
}
