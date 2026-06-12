import { compileMDX } from "next-mdx-remote/rsc";

import type { AiGuideFrontmatter } from "@/lib/ai-guides/types";
import { mdxSerializeOptions } from "@/lib/mdx-options";

import { JetlagCalculatorInlineApp } from "@/components/ai-guides/JetlagCalculatorInlineApp";
import { blogMdxComponents } from "@/components/blog/blog-mdx-components";

export async function renderAiGuideMdx(source: string) {
  return compileMDX<AiGuideFrontmatter>({
    source,
    options: mdxSerializeOptions,
    components: {
      ...blogMdxComponents,
      JetlagCalculatorInlineApp,
    },
  });
}
