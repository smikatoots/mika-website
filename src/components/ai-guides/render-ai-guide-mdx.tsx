import { compileMDX } from "next-mdx-remote/rsc";

import type { AiGuideFrontmatter } from "@/lib/ai-guides/types";
import { mdxSerializeOptions } from "@/lib/mdx-options";

import { AdeliCta } from "@/components/ai-guides/AdeliCta";
import { JetlagCalculatorInlineApp } from "@/components/ai-guides/JetlagCalculatorInlineApp";
import { blogMdxComponents } from "@/components/blog/blog-mdx-components";

type MdastNode = { type: string; children?: MdastNode[] };

/**
 * Inserts <AdeliCta /> right before the guide's first heading, so it sits
 * after the intro. Guides with no heading get no box.
 */
function remarkInsertAdeliCta() {
  return (tree: MdastNode) => {
    const children = tree.children ?? [];
    const index = children.findIndex((node) => node.type === "heading");
    if (index === -1) return;
    children.splice(index, 0, {
      type: "mdxJsxFlowElement",
      name: "AdeliCta",
      attributes: [],
      children: [],
    } as MdastNode);
  };
}

export async function renderAiGuideMdx(source: string) {
  return compileMDX<AiGuideFrontmatter>({
    source,
    options: {
      ...mdxSerializeOptions,
      mdxOptions: {
        ...mdxSerializeOptions.mdxOptions,
        remarkPlugins: [
          ...(mdxSerializeOptions.mdxOptions?.remarkPlugins ?? []),
          remarkInsertAdeliCta,
        ],
      },
    },
    components: {
      ...blogMdxComponents,
      AdeliCta,
      JetlagCalculatorInlineApp,
    },
  });
}
