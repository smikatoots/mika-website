const BASE_URL = process.env.SEO_BASE_URL ?? "http://127.0.0.1:3000";
const CANONICAL_ORIGIN = "https://mikareyes.com";
const CONCURRENCY = 12;
const REQUEST_TIMEOUT_MS = 20_000;

type Finding = {
  location: string;
  message: string;
};

type PageResult = {
  canonicalUrl: string;
  document: string;
};

type InternalTarget = {
  sources: Set<string>;
  target: string;
};

const findings: Finding[] = [];
const findingKeys = new Set<string>();

function addFinding(location: string, message: string): void {
  const key = `${location}\n${message}`;
  if (findingKeys.has(key)) return;
  findingKeys.add(key);
  findings.push({ location, message });
}

function decodeHtml(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function normalizeUrl(value: string): string {
  const parsed = new URL(value);
  parsed.hash = "";
  if (parsed.pathname !== "/")
    parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  return parsed.toString().replace(/\/$/, "");
}

function isNotionExportArtifact(pathname: string): boolean {
  return /^\/(?:[0-9a-f]{32}|[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})$/i.test(
    pathname,
  );
}

function attribute(tag: string, name: string): string | null {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:["']([^"']*)["']|([^\\s>]+))`, "i"),
  );
  return match ? decodeHtml(match[1] ?? match[2] ?? "") : null;
}

function tags(document: string, tagName: string): string[] {
  return [...document.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    (match) => match[0],
  );
}

function canonicalLinks(document: string): string[] {
  return tags(document, "link")
    .filter((tag) =>
      (attribute(tag, "rel") ?? "")
        .toLowerCase()
        .split(/\s+/)
        .includes("canonical"),
    )
    .map((tag) => attribute(tag, "href"))
    .filter((value): value is string => Boolean(value));
}

function metaContent(
  document: string,
  attributeName: "name" | "property",
  attributeValue: string,
): string[] {
  return tags(document, "meta")
    .filter(
      (tag) =>
        (attribute(tag, attributeName) ?? "").toLowerCase() ===
        attributeValue.toLowerCase(),
    )
    .map((tag) => attribute(tag, "content"))
    .filter((value): value is string => value !== null);
}

async function request(url: string): Promise<Response | null> {
  try {
    return await fetch(url, {
      headers: { "user-agent": "mika-seo-ci/1.0" },
      redirect: "manual",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    addFinding(
      url,
      `Request failed: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
}

async function mapLimit<T, R>(
  values: T[],
  worker: (value: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(values.length);
  let nextIndex = 0;

  async function run(): Promise<void> {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= values.length) return;
      results[index] = await worker(values[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, values.length) }, () => run()),
  );
  return results;
}

function localUrl(canonicalUrl: string): string {
  const canonical = new URL(canonicalUrl);
  return new URL(
    `${canonical.pathname}${canonical.search}`,
    BASE_URL,
  ).toString();
}

async function loadSitemap(): Promise<string[]> {
  const sitemapUrl = new URL("/sitemap.xml", BASE_URL).toString();
  const response = await request(sitemapUrl);
  if (!response) return [];

  if (response.status !== 200) {
    addFinding(sitemapUrl, `Expected status 200, received ${response.status}.`);
    return [];
  }

  const document = await response.text();
  const urls = [...document.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) =>
    decodeHtml(match[1].trim()),
  );

  if (urls.length === 0) {
    addFinding(sitemapUrl, "Sitemap contains no <loc> entries.");
  }

  const seen = new Set<string>();
  for (const url of urls) {
    if (seen.has(url)) addFinding(sitemapUrl, `Duplicate sitemap URL: ${url}`);
    seen.add(url);

    try {
      const parsed = new URL(url);
      if (parsed.origin !== CANONICAL_ORIGIN) {
        addFinding(
          sitemapUrl,
          `Sitemap URL must use ${CANONICAL_ORIGIN}: ${url}`,
        );
      }
      if (parsed.search || parsed.hash) {
        addFinding(
          sitemapUrl,
          `Sitemap URL must not contain query/hash data: ${url}`,
        );
      }
    } catch {
      addFinding(sitemapUrl, `Invalid sitemap URL: ${url}`);
    }
  }

  return urls;
}

async function auditPage(canonicalUrl: string): Promise<PageResult | null> {
  const fetchUrl = localUrl(canonicalUrl);
  const response = await request(fetchUrl);
  if (!response) return null;

  if (response.status !== 200) {
    addFinding(
      canonicalUrl,
      `Sitemap page must return 200 without redirect; received ${response.status}${
        response.headers.get("location")
          ? ` -> ${response.headers.get("location")}`
          : ""
      }.`,
    );
    await response.body?.cancel();
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/html")) {
    addFinding(canonicalUrl, `Expected HTML, received "${contentType}".`);
  }

  const document = await response.text();
  const expectedCanonical = normalizeUrl(canonicalUrl);
  const canonicals = canonicalLinks(document);

  if (canonicals.length !== 1) {
    addFinding(
      canonicalUrl,
      `Expected exactly one canonical link, found ${canonicals.length}.`,
    );
  } else {
    try {
      if (normalizeUrl(canonicals[0]) !== expectedCanonical) {
        addFinding(
          canonicalUrl,
          `Canonical mismatch: expected ${expectedCanonical}, found ${canonicals[0]}.`,
        );
      }
      if (new URL(canonicals[0]).origin !== CANONICAL_ORIGIN) {
        addFinding(
          canonicalUrl,
          `Canonical must use ${CANONICAL_ORIGIN}: ${canonicals[0]}`,
        );
      }
    } catch {
      addFinding(
        canonicalUrl,
        `Canonical is not an absolute URL: ${canonicals[0]}`,
      );
    }
  }

  const ogUrls = metaContent(document, "property", "og:url");
  if (ogUrls.length !== 1) {
    addFinding(
      canonicalUrl,
      `Expected exactly one og:url, found ${ogUrls.length}.`,
    );
  } else {
    try {
      if (normalizeUrl(ogUrls[0]) !== expectedCanonical) {
        addFinding(
          canonicalUrl,
          `og:url mismatch: expected ${expectedCanonical}, found ${ogUrls[0]}.`,
        );
      }
    } catch {
      addFinding(canonicalUrl, `og:url is invalid: ${ogUrls[0]}`);
    }
  }

  const title = document
    .match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]
    ?.trim();
  if (!title) addFinding(canonicalUrl, "Page is missing a non-empty <title>.");

  const descriptions = metaContent(document, "name", "description");
  if (descriptions.length !== 1 || descriptions[0].trim() === "") {
    addFinding(
      canonicalUrl,
      "Page must have exactly one non-empty meta description.",
    );
  }

  const h1Count = (document.match(/<h1\b/gi) ?? []).length;
  if (h1Count === 0) {
    addFinding(canonicalUrl, "Page must contain an <h1>.");
  }

  const robots = [
    ...metaContent(document, "name", "robots"),
    ...metaContent(document, "name", "googlebot"),
    ...(response.headers.get("x-robots-tag")
      ? [response.headers.get("x-robots-tag") ?? ""]
      : []),
  ];
  if (robots.some((value) => value.toLowerCase().includes("noindex"))) {
    addFinding(canonicalUrl, "Sitemap page must not be marked noindex.");
  }

  return { canonicalUrl, document };
}

function collectInternalTargets(pages: PageResult[]): InternalTarget[] {
  const targets = new Map<string, InternalTarget>();

  for (const page of pages) {
    const candidates = tags(page.document, "a").map((tag) => ({
      kind: "link",
      value: attribute(tag, "href"),
    }));

    for (const candidate of candidates) {
      const raw = candidate.value?.trim();
      if (
        !raw ||
        raw.startsWith("#") ||
        /^(?:mailto|tel|sms|javascript|data|blob):/i.test(raw)
      ) {
        continue;
      }

      let resolved: URL;
      try {
        resolved = new URL(raw, page.canonicalUrl);
      } catch {
        addFinding(page.canonicalUrl, `Invalid ${candidate.kind} URL: ${raw}`);
        continue;
      }

      if (resolved.hostname === "www.mikareyes.com") {
        addFinding(
          page.canonicalUrl,
          `${candidate.kind} uses www instead of the canonical host: ${raw}`,
        );
      }
      if (
        resolved.hostname === "mikareyes.com" &&
        resolved.protocol !== "https:"
      ) {
        addFinding(
          page.canonicalUrl,
          `${candidate.kind} uses HTTP instead of HTTPS: ${raw}`,
        );
      }

      if (!["mikareyes.com", "www.mikareyes.com"].includes(resolved.hostname)) {
        continue;
      }

      if (isNotionExportArtifact(resolved.pathname)) {
        addFinding(
          page.canonicalUrl,
          `${candidate.kind} "${raw}" looks like a broken Notion-export artifact. Replace it with the intended root-relative canonical path, or use an explicit https:// URL when the link should go to an external site; do not keep the Notion page ID.`,
        );
        continue;
      }

      resolved.hash = "";
      const target = new URL(
        `${resolved.pathname}${resolved.search}`,
        BASE_URL,
      ).toString();
      const existing = targets.get(target) ?? {
        sources: new Set<string>(),
        target,
      };
      existing.sources.add(page.canonicalUrl);
      targets.set(target, existing);
    }
  }

  return [...targets.values()];
}

async function auditInternalTarget(item: InternalTarget): Promise<void> {
  const response = await request(item.target);
  if (!response) return;

  const sourceSummary = [...item.sources].slice(0, 3).join(", ");
  if ([301, 302, 303, 307, 308].includes(response.status)) {
    addFinding(
      item.target,
      `Internal target redirects (${response.status} -> ${
        response.headers.get("location") ?? "unknown"
      }); link directly to the destination. Referenced by: ${sourceSummary}`,
    );
  } else if (response.status >= 400) {
    addFinding(
      item.target,
      `Broken internal target returned ${response.status}. Referenced by: ${sourceSummary}`,
    );
  }
  await response.body?.cancel();
}

async function main(): Promise<void> {
  const sitemapUrls = await loadSitemap();
  const auditedPages = (await mapLimit(sitemapUrls, auditPage)).filter(
    (page): page is PageResult => page !== null,
  );
  const internalTargets = collectInternalTargets(auditedPages);
  await mapLimit(internalTargets, auditInternalTarget);

  if (findings.length === 0) {
    console.log(
      `SEO site checks passed: ${auditedPages.length} sitemap pages and ${internalTargets.length} unique internal targets checked against ${BASE_URL}.`,
    );
  } else {
    console.error(
      `SEO site checks failed with ${findings.length} finding(s):\n`,
    );
    for (const finding of findings.sort((a, b) =>
      `${a.location}:${a.message}`.localeCompare(`${b.location}:${b.message}`),
    )) {
      console.error(`- ${finding.location}: ${finding.message}`);
    }
    process.exitCode = 1;
  }
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
