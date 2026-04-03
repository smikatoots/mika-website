import { compileMDX } from "next-mdx-remote/rsc";

import type { BlogPostFrontmatter } from "@/lib/blog/types";

import { blogMdxComponents } from "./blog-mdx-components";

export async function renderBlogMdx(source: string) {
  return compileMDX<BlogPostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: blogMdxComponents,
  });
}
