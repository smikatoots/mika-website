export const notionEnv = {
  apiKey: process.env.NOTION_API_KEY,
  databaseId: process.env.NOTION_BLOG_DATABASE_ID,
  verificationToken: process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN,
  /** Notion page ID for the site home (e.g. Mika Reyes landing). */
  homePageId: process.env.NOTION_HOME_PAGE_ID,
  /** Optional standalone Notion page for /about (use if About is not a blog DB row). */
  aboutPageId: process.env.NOTION_ABOUT_PAGE_ID,
  propertyTitle: process.env.NOTION_PROPERTY_TITLE ?? "Name",
  propertySlug: process.env.NOTION_PROPERTY_SLUG ?? "Slug",
  propertyPublished: process.env.NOTION_PROPERTY_PUBLISHED ?? "Published",
  propertyRoute: process.env.NOTION_PROPERTY_ROUTE ?? "Route",
  propertyPath: process.env.NOTION_PROPERTY_PATH ?? "Path",
  /** multi_select or select — used for /blog filters */
  propertyTags: process.env.NOTION_PROPERTY_TAGS ?? "Tags",
} as const;

export function isNotionConfigured(): boolean {
  return Boolean(notionEnv.apiKey && notionEnv.databaseId);
}

export function isHomePageConfigured(): boolean {
  return Boolean(notionEnv.apiKey && notionEnv.homePageId);
}

export function isAboutPageConfigured(): boolean {
  return Boolean(notionEnv.apiKey && notionEnv.aboutPageId);
}
