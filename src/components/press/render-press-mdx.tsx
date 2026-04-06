import { compileMDX } from "next-mdx-remote/rsc";

import type { PressFrontmatter } from "@/lib/press/types";

import { blogMdxComponents } from "@/components/blog/blog-mdx-components";

export async function renderPressMdx(source: string) {
  return compileMDX<PressFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: blogMdxComponents,
  });
}
