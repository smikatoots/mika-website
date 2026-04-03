import { readFile } from "node:fs/promises";
import path from "node:path";

import type { BlogManifest } from "./types";

export async function loadBlogManifest(): Promise<BlogManifest> {
  try {
    const p = path.join(process.cwd(), "content/blog/manifest.json");
    const raw = await readFile(p, "utf-8");
    const data = JSON.parse(raw) as BlogManifest;
    if (!data.posts || !Array.isArray(data.posts)) {
      return { generatedAt: "", posts: [] };
    }
    return data;
  } catch {
    return { generatedAt: "", posts: [] };
  }
}

export function allTagsFromManifest(posts: BlogManifest["posts"]): string[] {
  const s = new Set<string>();
  for (const p of posts) {
    for (const t of p.tags ?? []) {
      if (t.trim()) s.add(t.trim());
    }
  }
  return [...s].sort((a, b) => a.localeCompare(b));
}
