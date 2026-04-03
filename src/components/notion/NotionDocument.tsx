import type { BlockTree } from "@/lib/notion/blocks";
import { buildPageLinkContext } from "@/lib/notion/page-links";
import type { NotionSurface } from "@/lib/notion/surface";

import { NotionBlocks } from "./NotionBlocks";

export async function NotionDocument({
  blocks,
  surface = "default",
}: {
  blocks: BlockTree[];
  surface?: NotionSurface;
}) {
  const links = await buildPageLinkContext();
  return <NotionBlocks blocks={blocks} links={links} surface={surface} />;
}
