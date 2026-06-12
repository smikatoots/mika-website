import type { SerializeOptions } from "next-mdx-remote";
import remarkGfm from "remark-gfm";

export const mdxSerializeOptions: SerializeOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};
