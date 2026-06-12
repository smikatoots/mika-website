import { compileMDX } from "next-mdx-remote/rsc";

import type { PressFrontmatter } from "@/lib/press/types";
import { mdxSerializeOptions } from "@/lib/mdx-options";

import { blogMdxComponents } from "@/components/blog/blog-mdx-components";

export async function renderPressMdx(source: string) {
  return compileMDX<PressFrontmatter>({
    source,
    options: mdxSerializeOptions,
    components: blogMdxComponents,
  });
}
