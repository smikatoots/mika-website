import { compileMDX } from "next-mdx-remote/rsc";

import type { AiGuideFrontmatter } from "@/lib/ai-guides/types";
import { injectAiGuideBusinessCtaSource } from "@/lib/ai-guides/inject-ai-guide-business-cta";

import { AiGuideBusinessCtaBlock } from "@/components/ai-guides/AiGuideBusinessCtaBlock";
import { blogMdxComponents } from "@/components/blog/blog-mdx-components";

export async function renderAiGuideMdx(source: string) {
  const sourceWithCta = injectAiGuideBusinessCtaSource(source);
  return compileMDX<AiGuideFrontmatter>({
    source: sourceWithCta,
    options: {
      parseFrontmatter: true,
    },
    components: {
      ...blogMdxComponents,
      AiGuideBusinessCtaBlock,
    },
  });
}
