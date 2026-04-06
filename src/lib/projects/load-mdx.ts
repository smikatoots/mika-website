import { readFile } from "node:fs/promises";
import path from "node:path";

/** Same rules as blog slugs: safe filesystem segment. */
export function assertSafeProjectSlug(slug: string): boolean {
  if (!slug || slug.length > 200) return false;
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return false;
  }
  return /^[\w.-]+$/u.test(slug);
}

export async function loadProjectMdxSource(
  slug: string,
): Promise<string | null> {
  if (!assertSafeProjectSlug(slug)) return null;
  const file = path.join(process.cwd(), "content/projects", `${slug}.mdx`);
  try {
    return await readFile(file, "utf-8");
  } catch {
    return null;
  }
}

export async function loadProjectMdxPost(
  slug: string,
): Promise<{ source: string } | null> {
  const source = await loadProjectMdxSource(slug);
  if (!source) return null;
  return { source };
}
