import type { MetadataRoute } from "next";

import { loadAllAiGuideIndexEntries } from "@/lib/ai-guides/load-guides";
import { loadBlogManifest } from "@/lib/blog/manifest";
import { loadPressManifest } from "@/lib/press/manifest";
import { loadProjectsManifest } from "@/lib/projects/manifest";
import { SITE_URL } from "@/lib/site";
import { siteRoutesNotInNav } from "@/lib/site-nav";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes have no meaningful per-request modification date, so we omit
  // lastModified rather than stamping `new Date()` (which would make every URL
  // look freshly modified on each crawl and defeat the purpose of the field).
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/ai` },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/links` },
    { url: `${SITE_URL}/projects` },
    { url: `${SITE_URL}/press` },
    { url: `${SITE_URL}/my-dreams` },
    ...siteRoutesNotInNav.map(({ href }) => ({
      url: `${SITE_URL}${href}`,
    })),
  ];

  const aiGuides = await loadAllAiGuideIndexEntries();
  const { posts: manifestPosts } = await loadBlogManifest();
  const { projects, generatedAt: projectsGeneratedAt } =
    await loadProjectsManifest();
  const { items: pressItems } = await loadPressManifest();
  const fromMdx: MetadataRoute.Sitemap = manifestPosts.map((p) => ({
    url: `${SITE_URL}/${p.path}`,
    lastModified: new Date(p.published ?? p.lastEdited),
  }));
  // Projects have no per-entry lastEdited; use the project's launchDate when
  // present, else the manifest's generatedAt. Omit when neither is a real date.
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => {
    const lastModified = p.launchDate ?? projectsGeneratedAt;
    return {
      url: `${SITE_URL}/projects/${p.slug}`,
      ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
    };
  });
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
