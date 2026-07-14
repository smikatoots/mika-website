import { compileMDX } from "next-mdx-remote/rsc";

import type { ChallengeFrontmatter } from "@/lib/challenges/types";
import { mdxSerializeOptions } from "@/lib/mdx-options";

import { challengeMdxComponents } from "@/components/challenges/challenge-mdx-components";

export async function renderChallengeMdx(source: string) {
  return compileMDX<ChallengeFrontmatter>({
    source,
    options: mdxSerializeOptions,
    components: challengeMdxComponents,
  });
}
