import type { MetadataRoute } from "next";

import { loadAllAiGuideIndexEntries } from "@/lib/ai-guides/load-guides";
import { loadBlogManifest } from "@/lib/blog/manifest";
import { loadPressManifest } from "@/lib/press/manifest";
import { loadProjectsManifest } from "@/lib/projects/manifest";
import { SITE_URL } from "@/lib/site";
import { siteRoutesNotInNav } from "@/lib/site-nav";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/ai`, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: new Date() },
    { url: `${SITE_URL}/links`, lastModified: new Date() },
    { url: `${SITE_URL}/projects`, lastModified: new Date() },
    { url: `${SITE_URL}/press`, lastModified: new Date() },
    { url: `${SITE_URL}/my-dreams`, lastModified: new Date() },
    ...siteRoutesNotInNav.map(({ href }) => ({
      url: `${SITE_URL}${href}`,
      lastModified: new Date(),
    })),
  ];

  const aiGuides = await loadAllAiGuideIndexEntries();
  const { posts: manifestPosts } = await loadBlogManifest();
  const { projects } = await loadProjectsManifest();
  const { items: pressItems } = await loadPressManifest();
  const fromMdx: MetadataRoute.Sitemap = manifestPosts.map((p) => ({
    url: `${SITE_URL}/${p.path}`,
    lastModified: new Date(p.published ?? p.lastEdited),
  }));
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
  }));
  const pressEntries: MetadataRoute.Sitemap = pressItems.map((p) => ({
    url: `${SITE_URL}/press/${p.slug}`,
    lastModified: new Date(p.lastEdited),
  }));
  const aiGuideEntries: MetadataRoute.Sitemap = aiGuides.map((g) => ({
    url: `${SITE_URL}/ai/${g.slug}`,
    lastModified: new Date(g.published),
  }));

  /**
   * Non-blog URLs are authored in-repo (press/projects/links/etc.); blog posts
   * come from MDX synced from Notion. We do not list extra Notion DB rows here,
   * so obsolete paths are not advertised once removed from Notion.
   */
  return [
    ...staticEntries,
    ...fromMdx,
    ...projectEntries,
    ...pressEntries,
    ...aiGuideEntries,
  ];
}
