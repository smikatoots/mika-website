import type { MetadataRoute } from "next";

import { loadBlogManifest } from "@/lib/blog/manifest";
import { isNotionConfigured } from "@/lib/notion/config";
import { getPostSummaries } from "@/lib/notion/posts";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: new Date() },
    { url: `${SITE_URL}/links`, lastModified: new Date() },
    { url: `${SITE_URL}/more`, lastModified: new Date() },
    { url: `${SITE_URL}/press`, lastModified: new Date() },
    { url: `${SITE_URL}/guestbook`, lastModified: new Date() },
    { url: `${SITE_URL}/my-dreams`, lastModified: new Date() },
  ];

  const { posts: manifestPosts } = await loadBlogManifest();
  const fromMdx: MetadataRoute.Sitemap = manifestPosts.map((p) => ({
    url: `${SITE_URL}/${p.path}`,
    lastModified: new Date(p.lastEdited),
  }));

  if (!isNotionConfigured()) {
    return [...staticEntries, ...fromMdx];
  }

  const posts = await getPostSummaries();
  const fromNotion: MetadataRoute.Sitemap = posts
    .filter((p) => p.path !== "about" && !p.path.startsWith("blog/"))
    .map((p) => ({
      url: `${SITE_URL}/${p.path}`,
      lastModified: new Date(p.lastEdited),
    }));

  return [...staticEntries, ...fromMdx, ...fromNotion];
}
