<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## SEO rules

Read [`SEO.md`](./SEO.md) before changing routes, metadata, sitemap behavior, or internal links. Run `yarn lint` after relevant changes; production builds enforce the same SEO source policy.

When a change affects how search or AI answer engines find, read, or cite the site, add an entry to [`docs/seo-aeo-log.md`](./docs/seo-aeo-log.md).

## Brand

Read [`BRAND.md`](./BRAND.md) before writing any user-facing copy, naming
anything, making a public claim, or producing anything visual. It is the source
of truth for voice, tonal rules, approved colors and typefaces, and what may be
claimed in public.

`BRAND.md` owns durable identity. It does **not** own the applied visual system:
no palettes, ramps, type scales, spacing, components, or motion. Those live in a
per-surface `DESIGN.md`:

- [`DESIGN.md`](./DESIGN.md) — the website (marketing pages, AI guides, blog).
- [`src/app/deck/DESIGN.md`](./src/app/deck/DESIGN.md) — the presentation decks.

Read the one for the surface you are touching **before** writing any styles, and
never generate tokens or component styles from `BRAND.md` alone when a
`DESIGN.md` exists for that surface. The two surfaces are deliberately
different: the website is warm and tinted, the deck is pure white with two type
sizes. Do not copy patterns between them.

Two rules that are non-negotiable:
- **Never publish anything about personal net worth or FIRE status.** See
  `BRAND.md` > Governance > Claims. This covers paraphrase and implication.
- **Never record a claim as approved** without a human approving it. Draft
  candidates must be labeled as drafts.
