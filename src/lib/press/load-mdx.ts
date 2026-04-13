import { cache } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Safe slug segment for filesystem reads. */
export function assertSafePressSlug(slug: string): boolean {
  if (!slug || slug.length > 200) return false;
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return false;
  }
  return /^[\w.-]+$/u.test(slug);
}

const loadPressMdxSourceCached = cache(
  async (slug: string): Promise<string | null> => {
    if (!assertSafePressSlug(slug)) return null;
    const file = path.join(process.cwd(), "content/press", `${slug}.mdx`);
    try {
      return await readFile(file, "utf-8");
    } catch {
      return null;
    }
  },
);

export async function loadPressMdxSource(slug: string): Promise<string | null> {
  return loadPressMdxSourceCached(slug);
}

export async function loadPressMdxPost(
  slug: string,
): Promise<{ source: string } | null> {
  const source = await loadPressMdxSource(slug);
  if (!source) return null;
  return { source };
}
