import { compileMDX } from "next-mdx-remote/rsc";

import type { AiGuideFrontmatter } from "@/lib/ai-guides/types";

import { AiGuideBusinessCtaBlock } from "@/components/ai-guides/AiGuideBusinessCtaBlock";
import { blogMdxComponents } from "@/components/blog/blog-mdx-components";

export async function renderAiGuideMdx(source: string) {
  return compileMDX<AiGuideFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: {
      ...blogMdxComponents,
      AiGuideBusinessCtaBlock,
    },
  });
}
