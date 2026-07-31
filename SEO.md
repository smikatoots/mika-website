# SEO strategy and CI checks

This repository treats `https://mikareyes.com` as the only canonical origin. SEO rules are enforced in source code, during every production build, and against the rendered site in GitHub Actions.

## Canonical URL policy

- Canonical origin: `https://mikareyes.com`
- Do not use `www.mikareyes.com` for canonicals, sitemap entries, or internal links.
- Do not use `http://mikareyes.com`.
- Prefer root-relative internal links such as `/ai/example`.
- An absolute internal link is allowed when needed, but it must start with `https://mikareyes.com`.
- Link directly to the current canonical path. Do not link to a URL that redirects.
- Filter views such as `/ai?tag=finance` may remain crawlable UI states, but their canonical should be the unfiltered index page (`/ai`).

Requests to `www.mikareyes.com` permanently redirect to the non-`www` origin. Historical `www` URLs can therefore appear in Search Console as **Page with redirect**, which is expected.

## Required metadata for indexable pages

Every indexable App Router `page.tsx` must declare `alternates.canonical`. Pages may omit a canonical only when the page or an ancestor layout explicitly sets `robots.index` to `false`, as the presentation decks do.

Use the shared helpers:

```ts
import {
  buildOpenGraph,
  buildTwitter,
  canonicalUrl,
} from "@/lib/site-metadata";

const canonical = canonicalUrl("/example");

export const metadata: Metadata = {
  title: "Example",
  description: "A useful description.",
  alternates: { canonical },
  openGraph: buildOpenGraph({ title: "Example", url: canonical }),
  twitter: buildTwitter({ title: "Example" }),
};
```

The root layout must keep `metadataBase: new URL(SITE_URL)`, and `SITE_URL` must default to `https://mikareyes.com`.

## Link policy

Good internal links:

```md
[AI guides](/ai)
[An article](/blog/example)
```

Allowed absolute internal link:

```md
[AI guides](https://mikareyes.com/ai)
```

Rejected links:

```md
[Wrong host](https://www.mikareyes.com/ai)
[Wrong protocol](http://mikareyes.com/ai)
[Redirect source](/old-path)
[Missing protocol](example.com)
```

External links should include an explicit protocol, normally `https://`.

### Broken Notion-export artifacts

Notion exports sometimes turn a link into an internal 32-character page ID:

```md
[withparallax.com](/fdfab89ec1d840cab6150e48a5375413?pvs=25)
```

That browser URL points at `mikareyes.com/<notion-id>` and usually returns `404`. The source checker recognizes both compact and hyphenated Notion IDs and reports how to fix them:

- If the destination is an internal page, replace the ID with its root-relative canonical path.
- If the link text names an external site, use its explicit `https://` URL.
- Do not add a redirect for an opaque Notion ID unless it was a genuine public URL with known value or backlinks.

Example fix:

```md
[withparallax.com](https://withparallax.com)
```

## Why this is a TypeScript checker instead of Biome

Biome and generic ESLint rules are useful for syntax and code quality, but these checks need repository-specific context: MDX/frontmatter links, the generated redirect map, App Router metadata inheritance, sitemap output, and rendered HTML. A small TypeScript checker can validate all of those without adding another formatter or replacing the existing Next.js ESLint configuration. ESLint still runs first; the SEO checker is appended as the second lint stage.

## Commands

### `yarn lint`

Runs regular ESLint and then the repository-specific source SEO checker:

```text
eslint
→ tsx scripts/verify-seo.ts
```

The source checker validates:

- canonical/non-`www` host usage
- HTTPS for internal absolute URLs
- explicit protocols for domain-like links and frontmatter URLs
- broken Notion-export ID links
- links to known redirect sources
- canonical metadata coverage for indexable App Router pages
- sitemap coverage for every non-dynamic, indexable App Router page
- root `metadataBase` and canonical `SITE_URL` configuration

### `yarn build`

The `prebuild` script runs `yarn lint` before generating image dimensions and starting `next build`. Consequently, local and Vercel production builds fail when ESLint or the source SEO policy fails.

### `yarn verify:seo:site`

Audits a running production build. It verifies:

- sitemap URLs are unique, query-free, and use `https://mikareyes.com`
- every sitemap page returns `200` without redirecting
- every sitemap page has one matching canonical and `og:url`
- every sitemap page has a title, description, and `<h1>`
- sitemap pages are not marked `noindex`
- rendered internal anchor links do not use `www`, HTTP, redirect sources, broken paths, or Notion IDs

It intentionally does not request external sites, avoiding flaky CI failures caused by third parties. Image asset auditing is also outside the current blocking gate; this check focuses on indexable pages and navigation links.

To run it locally:

```bash
NEXT_PUBLIC_SITE_URL=https://mikareyes.com yarn build
NEXT_PUBLIC_SITE_URL=https://mikareyes.com yarn start -H 127.0.0.1 -p 3000
```

Then, in another terminal:

```bash
SEO_BASE_URL=http://127.0.0.1:3000 yarn verify:seo:site
```

## GitHub Actions

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`:

1. Install locked dependencies with `yarn install --frozen-lockfile`.
2. Run the production build. Its `prebuild` hook runs ESLint and the source SEO checker.
3. Start the production server locally.
4. Crawl the generated sitemap and run the rendered SEO/link audit.

This combination catches both source-level policy mistakes and mistakes that only become visible after Next.js resolves metadata.

## Checklist for a new indexable page

1. Add a unique title and useful description.
2. Create its URL with `canonicalUrl("/path")`.
3. Set `alternates.canonical`.
4. Pass the same canonical to `buildOpenGraph({ url: canonical })`.
5. Include one clear page-level `<h1>`.
6. Add the canonical URL to `src/app/sitemap.ts` when it is not generated from an existing manifest.
7. Use root-relative internal links that point directly to current routes.
8. Run `yarn lint` before committing.
9. Run the rendered audit when changing routing, metadata, or sitemap behavior.

## When a page should not be indexed

For tools, private/temporary surfaces, presentation decks, and other intentionally non-search pages, explicitly set:

```ts
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
```

Do not include a `noindex` page in the sitemap.
