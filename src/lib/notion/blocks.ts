import type { BlockObjectResponse } from "@notionhq/client";

import { getNotionClient } from "./client";

export type BlockTree = BlockObjectResponse & { children: BlockTree[] };

export async function fetchBlockTree(blockId: string): Promise<BlockTree[]> {
  const notion = getNotionClient();
  const out: BlockTree[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    for (const block of res.results) {
      if (!("type" in block)) continue;
      const b = block as BlockObjectResponse;
      const children = b.has_children ? await fetchBlockTree(b.id) : [];
      out.push({ ...b, children });
    }
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  return out;
}
