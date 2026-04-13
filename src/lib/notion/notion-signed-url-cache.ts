/**
 * Notion-hosted file/image block URLs from the API expire after about one hour.
 * Cached HTML must be revalidated sooner than that so we never serve expired src.
 */
export const NOTION_SIGNED_MEDIA_CACHE_SECONDS = 50 * 60;
