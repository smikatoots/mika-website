import type { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type MdxSerializeOptions = NonNullable<
  Parameters<typeof compileMDX>[0]["options"]
>;

export const mdxSerializeOptions: MdxSerializeOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};
