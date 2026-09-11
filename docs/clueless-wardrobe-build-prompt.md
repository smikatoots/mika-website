# Build prompt — Clueless Wardrobe

For a coding agent working in the `mika-website` repo (Next.js 16.2.2, React
19.2.4, Tailwind v4, yarn).

## Goal

`/clueless-wardrobe` — the Clueless closet computer, rebuilt as a working AI
stylist, rendered as an authentic late-90s/early-2000s desktop app.

A model stands on screen **already wearing a complete outfit**. Arrows swipe to
the next/previous look. `DRESS ME` shuffles randomly. `BROWSE` opens a garment
catalog. `PLAY` opens a panel showing where to buy the current look.

First model is **Nick**. Keep the data model keyed by model so a second person
drops in later without a refactor.

**Hard constraint:** the model's identity never changes across any frame — face,
facial structure, skin tone, hair, body proportions, height, build. Only clothes
change. A render with drift is rejected and regenerated, never shipped as "close
enough." Enforced by the human review gate in §4, step 6.

## Decisions already made — do not re-open

- **Images are pre-generated offline**, human-reviewed, committed to `public/`.
  No runtime generation, no image-gen API key, no upload UI in v1.
- **15 complete looks**, one image each. No independent top/bottom swapping.
- **Real products**: real brand, name, price, retailer, working URL per garment.
  Images are generated to resemble those actual garments.
- **Public and indexable**: full canonical metadata, OG image, sitemap entry.

## Read first

- `AGENTS.md` — this is **not** the Next.js in your training data. Read the
  relevant guide in `node_modules/next/dist/docs/` before route/metadata code.
- `DESIGN.md` — all color and spacing tokens come from here. Don't invent them.
- `BRAND.md` — voice for user-facing copy. Never publish anything about personal
  net worth or FIRE status, including implication. Never mark a claim approved
  without a human approving it.
- `SEO.md` — `yarn lint` enforces it; the production build fails on violations.

Existing patterns to reuse, not reinvent:

- `src/lib/product-links.ts` — the repo's pattern for a typed catalog of
  external products with URLs hoisted into a `U` constant. The wardrobe manifest
  should read as a sibling of this file.
- `src/app/experiments/motionsites-sparkform/` — precedent for a visually
  maximal page with its own scoped CSS file.
- `src/lib/site-metadata.ts` — `canonicalUrl`, `buildOpenGraph`, `buildTwitter`.
- `src/lib/og/render-og-image.tsx` — OG image.
- `src/lib/site-nav.ts` → `siteRoutesNotInNav` — registry feeding
  `src/app/sitemap.ts`. Register `/clueless-wardrobe` here. It's read by
  `sitemap.ts` only, so this adds no header link.

## 1. Data model

Hand-authored TypeScript in `src/lib/clueless-wardrobe/`. Not JSON — the types
are what stop a look referencing a garment that doesn't exist.

```ts
export type GarmentCategory =
  | "top" | "bottom" | "outerwear" | "shoes" | "accessory";

export type Garment = {
  id: string;                 // kebab-case, referenced by look.garmentIds
  category: GarmentCategory;
  name: string;               // "Cream ribbed crewneck"
  brand: string;
  productName: string;        // retailer's own product name
  price: { amount: number; currency: "USD" };
  retailer: string;
  href: string;               // live product URL, https:// only
  colorHex: string;           // swatch chip in Browse
  flatImage?: string;         // optional product shot
  whyItWorks: string;         // one line, specific to this model's build
};

export type Look = {
  id: string;
  modelId: ModelId;
  name: string;               // "Saturday Espresso Run"
  occasion: string;
  garmentIds: string[];       // 3–5; exactly one top, one bottom, one shoes
  image: string;              // /clueless-wardrobe/nick/looks/<id>.webp
  alt: string;                // describes the outfit, not the person's body
};

export type StylingProfile = {
  // Derived from reference photos. Both the curation brief and the identity
  // contract passed into every image generation.
  heightNote: string;
  buildNote: string;
  coloring: string;
  bestNecklines: string[];
  bestSilhouettes: string[];
  paletteWins: string[];
  paletteAvoid: string[];
};

export type ModelId = "nick";

export type WardrobeModel = {
  id: ModelId;
  name: string;
  profile: StylingProfile;
  garments: Garment[];
  looks: Look[];
};
```

`nick.ts` holds the record; `index.ts` exports a `wardrobeModels` registry plus
`getModel`, `getLook`, `getGarment`, `looksContainingGarment`.

**Integrity check.** Write `scripts/verify-clueless-wardrobe.ts`, wire into
`yarn lint` next to `verify-seo.ts`. Fail the build if: a `garmentIds` entry
doesn't resolve; a look lacks exactly one top + one bottom + one shoes; a
`look.image` file is missing from `public/`; **a garment appears in fewer than
two looks**; a `href` isn't `https://`; a `whyItWorks` or `alt` is empty.

That garment-reuse rule is what makes 15 looks read as one mixable closet rather
than 15 unrelated outfits. Keep it.

## 2. Visual target: 2000s desktop app

This is the part worth getting right. The page is a **window on a desktop**, not
a modern web page with retro styling.

**Desktop layer.** The window floats on a period desktop — flat teal or a
dithered two-tone gradient. A taskbar pinned to the bottom of the viewport: a
chunky raised start-style button reading `CLUELESS WARDROBE`, a sunken clock
well at the right showing real time.

**Window chrome primitive.** Build this once and reuse it for all three
surfaces (main window, Browse, Shop) — this is the biggest code saving in the
build:

- Title bar: horizontal gradient, dark navy → light blue, white bold 11px text,
  small icon at left, `_ □ ✕` beveled boxes at right. Non-functional is fine;
  `✕` closes the child dialogs.
- Menu bar under it: `File  Edit  View  Help`, with underlined first letters.
  Decorative — do not build working menus.
- Borders: 2px outset bevel. Light (`#FFFFFF`) on top/left, mid-gray on the
  body, dark (`#808080`) on bottom/right. `border-style: outset` gets you most
  of the way; hand-tune with box-shadow insets.
- Status bar at the bottom of the main window: sunken well, left reads
  `Ready` / `Look 4 of 15`, right shows the model name.

**Buttons.** Raised bevel, square corners, 11px all-caps, underlined access-key
letter (`D̲RESS ME`). On `:active` invert the bevel so it visibly depresses and
shift content 1px down-right. This tactile press is most of the period feel —
don't skip it.

**Photo well.** The model sits in a deeply **inset** panel (inverse bevel),
with a thin white mat. It should read as a framed viewport inside the app.

**CRT texture.** Subtle: 1px scanlines at low opacity plus a soft vignette. No
flicker, no animation. Kill entirely under `prefers-reduced-motion`.

**Typography — the one deliberate departure.** Inside the window chrome, use a
period stack (`Tahoma, "MS Sans Serif", Geneva, Verdana, sans-serif`) at 11px.
Everything outside the frame stays on `DESIGN.md`. Colors and spacing still come
from `DESIGN.md` throughout — the system-gray chrome is a scoped addition, not a
license to freestyle the palette. Flag this to Mika at review.

**Legal.** Build the lookalike from scratch. No assets, stills, fonts, logos or
screenshots from the film or from any Microsoft OS.

## 3. Layout and interaction

Route: `src/app/clueless-wardrobe/page.tsx` (server component, metadata) plus a
client component and a scoped `clueless-wardrobe.css`.

**Stage.** Full-body model in the photo well, wearing the complete current look.
Small caption plate with look name and occasion. **No buttons in this section** —
the middle of the original interface is stripped of controls.

**Bottom control bar.** Five buttons, all in the bar:

| Control | Behavior |
|---|---|
| `◀` | Previous look; stage swipes left |
| `DRESS ME` | Randomize to a different look (never the current one) |
| `PLAY` | Opens the Shop This Look dialog |
| `BROWSE` | Opens the garment dialog |
| `▶` | Next look; stage swipes right |

> The source brief said the arrows advance looks *and* that "the play button
> shows where to buy." Read as two controls: arrows navigate, center `PLAY`
> opens the buy dialog. If Mika meant the arrows themselves reveal the buy
> panel, that's a one-line change.

**Motion.** Swipe = horizontal translate + crossfade, 320–400ms ease-out,
direction follows the button. `DRESS ME` = 3–4 frame shuffle over ~600ms, then
settles. Preload adjacent looks so a swipe is never a loading state; `priority`
on the current image only. Under `prefers-reduced-motion`: crossfade only, no
translate, `DRESS ME` lands instantly. Keyboard `←`/`→`; touch swipe on the
stage. Use `motion` (already a dependency) over `gsap` here.

**Browse.** A child window in the same chrome — its own title bar and `✕`, not a
modern sheet. It must **not** cover the model; the main window's photo well
shrinks to make room. Inside: category tabs styled as period tab controls (Tops
/ Bottoms / Outerwear / Shoes / Accessories) over a scrolling list of garments —
swatch or flat image, name, brand, price, and an `in N looks` badge.
`whyItWorks` gets real visual weight on hover and focus; this is the stylist
speaking, not a tooltip. Clicking a garment cross-fades the stage to a look
containing it and re-anchors arrow order there.

**Shop.** Same child-window chrome. Lists every garment in the current look:
thumbnail, brand, product name, price, `Buy` link. External links get explicit
`https://`, `target="_blank"`, `rel="noopener"`; affiliate links get
`rel="sponsored noopener"` plus a visible disclosure, matching how
`product-links.ts` links are handled. Label prices "price at time of writing" —
don't imply a live feed.

**URL state.** Reflect the current look as `?look=<id>` via
`history.replaceState`. Per `SEO.md` the canonical stays `/clueless-wardrobe`.

**Responsive.** Mobile is the primary case — this gets filmed on a phone. The
window fills the viewport with the taskbar still pinned; photo well stays
dominant; controls stay thumb-reachable; child windows become full-screen.

**Accessibility.** Real `<button>`s with labels, not styled divs. Look changes
announce in a polite live region. Child windows trap focus and close on
`Escape`. Visible focus rings that survive the bevel styling. Every `alt`
describes the **outfit**, not the person's body.

## 4. Image pipeline

Document settings in `src/lib/clueless-wardrobe/PIPELINE.md` as you go, so look
16 can be added later without rediscovering them.

1. **Intake.** Reference photos live in `.local/clueless-wardrobe/reference/`,
   **gitignored**. Raw source photos are never committed — only approved renders.
2. **Styling profile.** Read the photos, write Nick's `StylingProfile`. Show it
   to Mika for confirmation **before** researching products — everything
   downstream inherits it.
3. **Research garments.** Real purchasable menswear matching the profile: ~5
   tops, 4 bottoms, 2 outerwear, 3 shoes, 3 accessories. Capture brand, product
   name, price, retailer, live URL, hex, and the `whyItWorks` line.
4. **Compose 15 looks.** Each must hold up as a real outfit, with deliberate
   garment reuse across looks. Name each for the moment it's for.
5. **Render.** One image per look with an identity-preserving,
   reference-conditioned image model. Fixed contract across all 15 — this
   consistency is what makes the swipe feel like one photoshoot: full body, feet
   visible, straight-on, arms relaxed, identical camera distance and lighting,
   flat `#F7F4EF` background, 3:4 portrait. Identity clause in every prompt,
   verbatim: *preserve the face, facial structure, skin tone, hair, body
   proportions, height and build exactly as in the reference photos; change only
   the garments.*
6. **Review gate — not optional.** Assemble all candidates into one contact
   sheet for Mika and Nick. Nothing commits until Nick approves his own likeness
   in the exact frames that will ship. Any drift in face, body, skin tone or
   hair is a rejection, not a note.
7. **Ship.** Crop 3:4, export WebP ~1200px wide to
   `public/clueless-wardrobe/nick/looks/<id>.webp`, then run
   `yarn gen:image-dims` to keep the committed dimension map in sync.

## 5. SEO

Indexable, so `SEO.md` applies in full and `yarn lint` enforces it:

1. `alternates.canonical` via `canonicalUrl("/clueless-wardrobe")`.
2. `openGraph` / `twitter` via the `site-metadata` helpers; OG image via
   `render-og-image.tsx`.
3. Register in `siteRoutesNotInNav`.
4. Internal links root-relative. No `http://`, no `www` origin.
5. The slug is permanent once published — renaming later needs a redirect.
6. Run `yarn lint` and `yarn gen:image-dims` before calling it done.

## 6. Acceptance criteria

Verified in a browser, not asserted:

- [ ] Page renders Nick already wearing a complete outfit on first paint — no
      empty or flat-clothes state ever appears.
- [ ] Arrows move through looks in stable wrapping order, correct directions.
- [ ] `DRESS ME` lands on a different look every time.
- [ ] `PLAY` lists every garment in the current look with working links.
- [ ] `BROWSE` opens without covering the model; garments grouped by category;
      `whyItWorks` visible; clicking a garment moves the stage to a look with it.
- [ ] Buttons visibly depress on press; window chrome, taskbar and status bar
      all present.
- [ ] Across all 15 looks, Nick's face, hair, skin tone, build and height are
      visibly identical — check them side by side.
- [ ] Every garment appears in ≥2 looks.
- [ ] `yarn lint` passes including the wardrobe check.
- [ ] Reduced-motion, keyboard-only and mobile widths verified.
- [ ] Nick has approved the committed renders.

## 7. Out of scope for v1 — say so, don't silently add

Runtime upload and live generation; a second model; saved outfits, accounts or
carts; live price/stock checks; independent top/bottom swapping.

**Likeness.** This publishes AI-generated, crawlable images of a real person.
Nick approves the exact shipped frames, and because each look is one manifest
entry plus one file, removing one stays a two-line deletion plus a redeploy.
Keep it that easy on purpose.

## 8. Needed from Mika before starting

1. Confirm or correct the `PLAY` button reading in §3.
2. Reference photos into `.local/clueless-wardrobe/reference/` — front-facing
   full body, a few angles, even light, ideally one in fitted clothing so build
   reads accurately.
3. Budget ceiling per item; brands to include; brands never to show.
