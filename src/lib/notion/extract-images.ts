import type { BlockTree } from "@/lib/notion/blocks";

/** Depth-first collection of image URLs from a Notion block tree (same order as the doc). */
export function collectImageUrlsFromBlocks(blocks: BlockTree[]): string[] {
  const out: string[] = [];

  function walk(nodes: BlockTree[]) {
    for (const b of nodes) {
      if (b.type === "image") {
        const url =
          b.image.type === "external"
            ? b.image.external.url
            : b.image.file.url;
        out.push(url);
      }
      if (b.children.length) {
        walk(b.children);
      }
    }
  }

  walk(blocks);
  return out;
}
