import { compileMDX } from "next-mdx-remote/rsc";

import type { ProjectFrontmatter } from "@/lib/projects/types";
import { mdxSerializeOptions } from "@/lib/mdx-options";

import { blogMdxComponents } from "@/components/blog/blog-mdx-components";

export async function renderProjectMdx(source: string) {
  return compileMDX<ProjectFrontmatter>({
    source,
    options: mdxSerializeOptions,
    components: blogMdxComponents,
  });
}
