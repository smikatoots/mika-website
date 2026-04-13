import { cache } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";

export function assertSafeBlogSlug(slug: string): boolean {
  if (!slug || slug.length > 200) return false;
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return false;
  }
  return /^[\w.-]+$/u.test(slug);
}

const loadBlogMdxSourceCached = cache(
  async (slug: string): Promise<string | null> => {
    if (!assertSafeBlogSlug(slug)) {
      return null;
    }
    const file = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
    try {
      return await readFile(file, "utf-8");
    } catch {
      return null;
    }
  },
);

export async function loadBlogMdxSource(
  slug: string,
): Promise<string | null> {
  return loadBlogMdxSourceCached(slug);
}

export type LoadedMdxPost = {
  source: string;
};

export async function loadBlogMdxPost(
  slug: string,
): Promise<LoadedMdxPost | null> {
  const source = await loadBlogMdxSource(slug);
  if (!source) return null;
  return { source };
}
