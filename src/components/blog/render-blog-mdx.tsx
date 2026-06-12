import { compileMDX } from "next-mdx-remote/rsc";

import type { BlogPostFrontmatter } from "@/lib/blog/types";
import { mdxSerializeOptions } from "@/lib/mdx-options";

import { blogMdxComponents } from "./blog-mdx-components";

export async function renderBlogMdx(source: string) {
  return compileMDX<BlogPostFrontmatter>({
    source,
    options: mdxSerializeOptions,
    components: blogMdxComponents,
  });
}
