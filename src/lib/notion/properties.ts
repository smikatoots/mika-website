import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client";

import { notionEnv } from "./config";

import { slugifyTitleForBlog } from "@/lib/slugify";

export type ContentRoute = "blog" | "root";

export function getTitle(page: PageObjectResponse): string {
  const prop = page.properties[notionEnv.propertyTitle];
  if (prop?.type === "title" && prop.title.length > 0) {
    return prop.title.map((t) => t.plain_text).join("");
  }
  return "Untitled";
}

export function getSlug(page: PageObjectResponse): string | null {
  const prop = page.properties[notionEnv.propertySlug];
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    const raw = prop.rich_text.map((t) => t.plain_text).join("").trim();
    if (!raw.length) return null;
    return raw.replace(/^\/+|\/+$/g, "");
  }
  return null;
}

export function getEffectiveSlug(page: PageObjectResponse): string | null {
  const manual = getSlug(page);
  if (manual && !manual.includes("/")) {
    return manual;
  }
  const title = getTitle(page);
  if (title === "Untitled") {
    return null;
  }
  return slugifyTitleForBlog(title);
}

export function isPublished(page: PageObjectResponse): boolean {
  const name = notionEnv.propertyPublished;
  if (!(name in page.properties)) {
    return true;
  }
  const prop = page.properties[name];
  if (prop?.type === "checkbox") {
    return prop.checkbox === true;
  }
  return true;
}

export function getContentRoute(page: PageObjectResponse): ContentRoute {
  const name = notionEnv.propertyRoute;
  if (!(name in page.properties)) {
    return "blog";
  }
  const prop = page.properties[name];
  if (prop?.type === "select" && prop.select?.name) {
    const n = prop.select.name.toLowerCase();
    if (n === "root") return "root";
  }
  return "blog";
}

export function normalizePublicPath(raw: string): string | null {
  const t = raw.trim().replace(/^\/+|\/+$/g, "");
  return t.length > 0 ? t : null;
}

export function getExplicitPath(page: PageObjectResponse): string | null {
  const name = notionEnv.propertyPath;
  if (!(name in page.properties)) {
    return null;
  }
  const prop = page.properties[name];
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    const raw = prop.rich_text.map((t) => t.plain_text).join("").trim();
    return normalizePublicPath(raw);
  }
  return null;
}

export function getPublicPath(page: PageObjectResponse): string | null {
  const explicit = getExplicitPath(page);
  if (explicit) {
    return explicit;
  }
  const manualSlug = getSlug(page);
  if (manualSlug?.includes("/")) {
    return manualSlug;
  }
  const slug = getEffectiveSlug(page);
  if (!slug) {
    return null;
  }
  if (getContentRoute(page) === "root") {
    return slug;
  }
  return `blog/${slug}`;
}

export function richTextToPlain(items: RichTextItemResponse[]): string {
  return items.map((i) => ("plain_text" in i ? i.plain_text : "")).join("");
}

/**
 * ISO timestamp for when the post was published (Notion date column, or page created_time).
 */
export function getPublishedTime(page: PageObjectResponse): string {
  const name = notionEnv.propertyPublishedDate;
  const prop = page.properties[name];
  if (prop?.type === "date" && prop.date?.start) {
    const start = prop.date.start;
    const d = new Date(
      start.length <= 10 ? `${start}T12:00:00.000Z` : start,
    );
    if (!Number.isNaN(d.getTime())) {
      return d.toISOString();
    }
  }
  return page.created_time;
}

export function getTags(page: PageObjectResponse): string[] {
  const name = notionEnv.propertyTags;
  if (!(name in page.properties)) {
    return [];
  }
  const prop = page.properties[name];
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((t) => t.name).filter(Boolean);
  }
  if (prop?.type === "select" && prop.select?.name) {
    return [prop.select.name];
  }
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    const raw = prop.rich_text.map((t) => t.plain_text).join(",").trim();
    if (!raw.length) return [];
    return raw.split(/\s*,\s*/).filter(Boolean);
  }
  return [];
}
