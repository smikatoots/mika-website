import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import ts from "typescript";

import generateSitemap from "../src/app/sitemap";
import { urlRedirects } from "../src/lib/url-redirects";

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, "src", "app");
const CANONICAL_ORIGIN = "https://mikareyes.com";
const SCANNED_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
]);

const exactRedirects = new Map(
  urlRedirects
    .filter(({ source }) => !source.includes(":"))
    .map(({ source, destination }) => [normalizePath(source), destination]),
);

type Finding = {
  file: string;
  line?: number;
  message: string;
};

type LiteralLink = {
  index: number;
  target: string;
};

const findings: Finding[] = [];

function relative(file: string): string {
  return path.relative(ROOT, file) || ".";
}

function lineAt(content: string, index: number): number {
  return content.slice(0, index).split("\n").length;
}

function addFinding(file: string, message: string, index?: number): void {
  findings.push({
    file: relative(file),
    ...(index === undefined
      ? {}
      : { line: lineAt(fileContents.get(file) ?? "", index) }),
    message,
  });
}

function normalizePath(value: string): string {
  const pathOnly = value.split(/[?#]/, 1)[0] || "/";
  return pathOnly === "/" ? "/" : pathOnly.replace(/\/+$/, "");
}

function internalPath(target: string): string | null {
  if (target.startsWith("/") && !target.startsWith("//")) {
    return normalizePath(target);
  }

  try {
    const parsed = new URL(target);
    if (parsed.origin === CANONICAL_ORIGIN) {
      return normalizePath(parsed.pathname);
    }
  } catch {
    // Non-URL values are handled separately.
  }

  return null;
}

function isBareDomain(target: string): boolean {
  return /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?\.[a-z]{2,}(?:[/?#].*)?$/i.test(
    target,
  );
}

function isNotionExportArtifact(pathname: string): boolean {
  return /^\/(?:[0-9a-f]{32}|[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})$/i.test(
    pathname,
  );
}

function literalLinks(content: string): LiteralLink[] {
  const links: LiteralLink[] = [];
  const patterns = [
    /\b(?:href|src)\s*=\s*["']([^"']+)["']/g,
    /\b(?:href|src)\s*:\s*["']([^"']+)["']/g,
    /!?\[[^\]]*\]\(\s*<?([^\s)>]+)>?(?:\s+["'][^"']*["'])?\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      if (match.index !== undefined && match[1]) {
        links.push({ index: match.index, target: match[1] });
      }
    }
  }

  return links;
}

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(entryPath) : [entryPath];
    }),
  );
  return files.flat();
}

const fileContents = new Map<string, string>();

async function load(file: string): Promise<string> {
  const cached = fileContents.get(file);
  if (cached !== undefined) return cached;
  const content = await readFile(file, "utf8");
  fileContents.set(file, content);
  return content;
}

async function scanLinkPolicy(): Promise<number> {
  const roots = [path.join(ROOT, "src"), path.join(ROOT, "content")];
  const publicTextFiles = [
    path.join(ROOT, "public", "llms.txt"),
    path.join(ROOT, "public", "llms-full.txt"),
  ];
  const files = (await Promise.all(roots.map((directory) => walk(directory))))
    .flat()
    .filter((file) => SCANNED_EXTENSIONS.has(path.extname(file)))
    .concat(publicTextFiles);

  let checkedLinks = 0;

  for (const file of files) {
    const content = await load(file);

    for (const match of content.matchAll(/https?:\/\/www\.mikareyes\.com/gi)) {
      addFinding(
        file,
        "Use the canonical non-www host (https://mikareyes.com).",
        match.index,
      );
    }

    for (const match of content.matchAll(/http:\/\/mikareyes\.com/gi)) {
      addFinding(
        file,
        "Use HTTPS and preferably a root-relative path for internal links.",
        match.index,
      );
    }

    for (const link of literalLinks(content)) {
      checkedLinks += 1;
      const target = link.target.trim();

      if (isBareDomain(target)) {
        addFinding(
          file,
          `Link target "${target}" is missing an explicit https:// scheme.`,
          link.index,
        );
        continue;
      }

      const pathname = internalPath(target);
      if (!pathname) continue;
      if (isNotionExportArtifact(pathname)) {
        addFinding(
          file,
          `Internal link "${target}" looks like a broken Notion-export artifact. Replace it with the intended root-relative canonical path, or use an explicit https:// URL when the link should go to an external site; do not keep the Notion page ID.`,
          link.index,
        );
        continue;
      }
      const destination = exactRedirects.get(pathname);
      if (destination) {
        addFinding(
          file,
          `Internal link points to redirect source "${pathname}"; link directly to "${destination}".`,
          link.index,
        );
      }
    }

    if (path.extname(file) === ".mdx") {
      const data = matter(content).data as { url?: unknown };
      if (
        typeof data.url === "string" &&
        data.url.trim() !== "" &&
        isBareDomain(data.url.trim())
      ) {
        const index = content.indexOf(data.url);
        addFinding(
          file,
          `Frontmatter URL "${data.url}" is missing an explicit https:// scheme.`,
          index >= 0 ? index : undefined,
        );
      }
    }
  }

  return checkedLinks;
}

function propertyName(name: ts.PropertyName): string | null {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return null;
}

function unwrapObjectLiteral(
  expression: ts.Expression | undefined,
): ts.ObjectLiteralExpression | null {
  let current = expression;
  while (
    current &&
    (ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current))
  ) {
    current = current.expression;
  }
  return current && ts.isObjectLiteralExpression(current) ? current : null;
}

function metadataObjectLiterals(
  content: string,
  file: string,
): ts.ObjectLiteralExpression[] {
  const source = ts.createSourceFile(
    file,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const objects: ts.ObjectLiteralExpression[] = [];

  function collectReturns(node: ts.Node): void {
    if (ts.isReturnStatement(node)) {
      const object = unwrapObjectLiteral(node.expression);
      if (object) objects.push(object);
      return;
    }
    ts.forEachChild(node, collectReturns);
  }

  for (const statement of source.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name)) continue;
        if (declaration.name.text === "metadata") {
          const object = unwrapObjectLiteral(declaration.initializer);
          if (object) objects.push(object);
        }
        if (
          declaration.name.text === "generateMetadata" &&
          declaration.initializer
        ) {
          if (
            ts.isArrowFunction(declaration.initializer) &&
            !ts.isBlock(declaration.initializer.body)
          ) {
            const object = unwrapObjectLiteral(declaration.initializer.body);
            if (object) objects.push(object);
          } else {
            collectReturns(declaration.initializer);
          }
        }
      }
    }

    if (
      ts.isFunctionDeclaration(statement) &&
      statement.name?.text === "generateMetadata" &&
      statement.body
    ) {
      collectReturns(statement.body);
    }
  }

  return objects;
}

function hasMetadataProperty(
  content: string,
  file: string,
  outerName: string,
  innerName: string,
  expectedBoolean?: boolean,
): boolean {
  for (const metadata of metadataObjectLiterals(content, file)) {
    const outer = metadata.properties.find(
      (property) =>
        ts.isPropertyAssignment(property) &&
        propertyName(property.name) === outerName,
    );
    if (!outer || !ts.isPropertyAssignment(outer)) continue;
    const outerObject = unwrapObjectLiteral(outer.initializer);
    if (!outerObject) continue;

    for (const property of outerObject.properties) {
      const isNamedProperty =
        (ts.isPropertyAssignment(property) ||
          ts.isShorthandPropertyAssignment(property)) &&
        propertyName(property.name) === innerName;
      if (!isNamedProperty) continue;

      if (expectedBoolean === undefined) return true;
      if (
        ts.isPropertyAssignment(property) &&
        property.initializer.kind ===
          (expectedBoolean
            ? ts.SyntaxKind.TrueKeyword
            : ts.SyntaxKind.FalseKeyword)
      ) {
        return true;
      }
    }
  }

  return false;
}

async function hasNoIndexPolicy(
  pageFile: string,
  pageContent: string,
): Promise<boolean> {
  if (
    hasMetadataProperty(pageContent, pageFile, "robots", "index", false)
  ) {
    return true;
  }

  let directory = path.dirname(pageFile);
  while (directory.startsWith(APP_ROOT)) {
    const layoutFile = path.join(directory, "layout.tsx");
    try {
      const layout = await load(layoutFile);
      if (
        hasMetadataProperty(layout, layoutFile, "robots", "index", false)
      ) {
        return true;
      }
    } catch {
      // This segment has no layout.
    }
    if (directory === APP_ROOT) break;
    directory = path.dirname(directory);
  }
  return false;
}

function staticRouteForPage(pageFile: string): string | null {
  const directory = path.relative(APP_ROOT, path.dirname(pageFile));
  const segments = directory === "" ? [] : directory.split(path.sep);
  const routeSegments: string[] = [];

  for (const segment of segments) {
    if (segment.startsWith("(") && segment.endsWith(")")) continue;
    if (/^\[\[\.\.\.[^\]]+\]\]$/.test(segment)) continue;
    if (segment.startsWith("[") || segment.startsWith("@")) return null;
    routeSegments.push(segment);
  }

  return routeSegments.length === 0 ? "/" : `/${routeSegments.join("/")}`;
}

async function scanMetadataPolicy(): Promise<number> {
  const pages = (await walk(APP_ROOT)).filter((file) =>
    file.endsWith("page.tsx"),
  );
  const sitemapEntries = await generateSitemap();
  const sitemapPaths = new Set(
    sitemapEntries.map(({ url }) => normalizePath(new URL(url).pathname)),
  );

  for (const page of pages) {
    const content = await load(page);
    const hasCanonical = hasMetadataProperty(
      content,
      page,
      "alternates",
      "canonical",
    );
    const isNoIndex = await hasNoIndexPolicy(page, content);

    if (!hasCanonical && !isNoIndex) {
      addFinding(
        page,
        "Indexable App Router pages must declare alternates.canonical; alternatively, explicitly noindex the page or an ancestor layout.",
      );
    }

    const staticRoute = staticRouteForPage(page);
    if (staticRoute && !isNoIndex && !sitemapPaths.has(staticRoute)) {
      addFinding(
        page,
        `Indexable static route "${staticRoute}" is missing from src/app/sitemap.ts. Add it to the sitemap or explicitly mark the route noindex.`,
      );
    }
  }

  const rootLayout = path.join(APP_ROOT, "layout.tsx");
  const rootLayoutContent = await load(rootLayout);
  if (!/\bmetadataBase\s*:\s*new URL\(SITE_URL\)/.test(rootLayoutContent)) {
    addFinding(
      rootLayout,
      "Root metadata must set metadataBase from the canonical SITE_URL.",
    );
  }

  const siteFile = path.join(ROOT, "src", "lib", "site.ts");
  const siteContent = await load(siteFile);
  if (!siteContent.includes(`"${CANONICAL_ORIGIN}"`)) {
    addFinding(
      siteFile,
      `SITE_URL must default to the canonical origin ${CANONICAL_ORIGIN}.`,
    );
  }

  return pages.length;
}

function verifyRuleImplementation(): void {
  const unrelatedObjects = `
    const unrelated = {
      alternates: { canonical: "/wrong" },
      robots: { index: false },
    };
    export const metadata = { title: "No canonical policy" };
  `;
  assert.equal(
    hasMetadataProperty(
      unrelatedObjects,
      "unrelated.tsx",
      "alternates",
      "canonical",
    ),
    false,
    "Unrelated objects must not satisfy canonical metadata policy.",
  );
  assert.equal(
    hasMetadataProperty(
      unrelatedObjects,
      "unrelated.tsx",
      "robots",
      "index",
      false,
    ),
    false,
    "Unrelated objects must not satisfy noindex metadata policy.",
  );
  assert.equal(
    hasMetadataProperty(
      "export const metadata = { alternates: { canonical } };",
      "metadata.tsx",
      "alternates",
      "canonical",
    ),
    true,
  );
  assert.equal(
    hasMetadataProperty(
      "export const metadata = { robots: { index: false } };",
      "noindex.tsx",
      "robots",
      "index",
      false,
    ),
    true,
  );
  assert.equal(
    hasMetadataProperty(
      "export async function generateMetadata() { return { alternates: { canonical: '/example' } }; }",
      "generated.tsx",
      "alternates",
      "canonical",
    ),
    true,
  );
  assert.equal(
    staticRouteForPage(
      path.join(
        APP_ROOT,
        "(marketing)",
        "about",
        "[[...rest]]",
        "page.tsx",
      ),
    ),
    "/about",
  );
  assert.equal(
    staticRouteForPage(
      path.join(APP_ROOT, "(site)", "blog", "[slug]", "page.tsx"),
    ),
    null,
  );
  assert.equal(
    isNotionExportArtifact("/fdfab89ec1d840cab6150e48a5375413"),
    true,
  );
  assert.equal(
    isNotionExportArtifact("/fdfab89e-c1d8-40ca-b615-0e48a5375413"),
    true,
  );
  assert.equal(isNotionExportArtifact("/blog/a-real-slug"), false);
}

function printResults(checkedLinks: number, checkedPages: number): void {
  if (findings.length === 0) {
    console.log(
      `SEO source checks passed: ${checkedPages} App Router pages and ${checkedLinks} literal links checked.`,
    );
    return;
  }

  console.error(
    `SEO source checks failed with ${findings.length} finding(s):\n`,
  );
  for (const finding of findings.sort((a, b) =>
    `${a.file}:${a.line ?? 0}`.localeCompare(`${b.file}:${b.line ?? 0}`),
  )) {
    console.error(
      `- ${finding.file}${finding.line ? `:${finding.line}` : ""}: ${finding.message}`,
    );
  }
  process.exitCode = 1;
}

async function main(): Promise<void> {
  verifyRuleImplementation();
  const [checkedLinks, checkedPages] = await Promise.all([
    scanLinkPolicy(),
    scanMetadataPolicy(),
  ]);
  printResults(checkedLinks, checkedPages);
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
