import { notionEnv } from "./config";
import { getPostSummaries, normalizeNotionId } from "./posts";

export type PageLinkContext = {
  hrefForPageId: (pageId: string) => string;
  labelForPageId: (pageId: string) => string | null;
};

/**
 * Maps Notion page IDs to site paths for link_to_page / child_page blocks.
 * Falls back to a public Notion URL when the page is not in the blog DB map.
 */
export async function buildPageLinkContext(): Promise<PageLinkContext> {
  const byNormId = new Map<
    string,
    { path: string; title: string }
  >();

  if (notionEnv.databaseId) {
    try {
      const summaries = await getPostSummaries();
      for (const s of summaries) {
        byNormId.set(normalizeNotionId(s.id), {
          path: s.path,
          title: s.title,
        });
      }
    } catch {
      /* DB optional for static pages */
    }
  }

  const homeRaw = notionEnv.homePageId;
  if (homeRaw) {
    byNormId.set(normalizeNotionId(homeRaw), {
      path: "",
      title: "Home",
    });
  }

  const aboutRaw = notionEnv.aboutPageId;
  if (aboutRaw) {
    byNormId.set(normalizeNotionId(aboutRaw), {
      path: "about",
      title: "About",
    });
  }

  const dreamsRaw = notionEnv.dreamsPageId;
  if (dreamsRaw) {
    byNormId.set(normalizeNotionId(dreamsRaw), {
      path: "my-dreams",
      title: "Dreams",
    });
  }

  function notionPublicUrl(pageId: string): string {
    const id = pageId.replace(/-/g, "");
    return `https://www.notion.so/${id}`;
  }

  return {
    hrefForPageId(pageId: string): string {
      const row = byNormId.get(normalizeNotionId(pageId));
      if (row) {
        return row.path === "" ? "/" : `/${row.path}`;
      }
      return notionPublicUrl(pageId);
    },
    labelForPageId(pageId: string): string | null {
      return byNormId.get(normalizeNotionId(pageId))?.title ?? null;
    },
  };
}
