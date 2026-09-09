---
name: Mika Reyes Website
description: Visual system for mikareyes.com — the marketing pages, AI guides, blog, and every public content surface.
brand: ./BRAND.md
version: 2
colors:
  ink: "#000000"
  body: "#1C1A17"
  soft: "#2E2A26"
  muted: "#6E655C"
  accent: "#E8425A"
  accent-deep: "#CE3149"
  accent-soft: "#F4A6AE"
  teal: "#0E8C8C"
  sun-yellow: "#FFDE3B"
  lime: "#C1F32B"
  periwinkle: "#6483FF"
  purple: "#6B4DE6"
  linen: "#F1E8DE"
  paper: "#FBF8F5"
  white: "#FFFFFF"
  charcoal: "#2F2C29"
  sand: "#EADCCE"
  stone: "#C3B7AC"
  border-ink: "#000000"
  border: "#D9CFC2"
  border-warm: "#E4D9CB"
  on-accent: "#000000"
  on-dark: "#FFFFFF"
  on-purple: "#FBF8F5"
typography:
  display:
    fontFamily: Satoshi
    fontSize: 100px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.014em
  h1:
    fontFamily: Satoshi
    fontSize: 68px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.034em
  h2:
    fontFamily: Satoshi
    fontSize: 44px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.034em
  h3:
    fontFamily: Satoshi
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.057em
  stat:
    fontFamily: Satoshi
    fontSize: 48px
    fontWeight: 600
  lead:
    fontFamily: Hanken Grotesk
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: -0.05em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.05em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-xs:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: 400
  eyebrow:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: 400
    letterSpacing: 0.04em
rounded:
  input: 5px
  chip: 5px
  card: 5px
  panel: 5px
  pill: 100px
  cta: 160px
spacing:
  gap: 28px
  gutter: 40px
  section: 64px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.body-md}"
    rounded: "{rounded.cta}"
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 16px
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body}"
    rounded: "{rounded.card}"
    padding: 24px
  card-colored:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: 24px
  tag-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.chip}"
    padding: 5px
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.input}"
    padding: 12px
  text-body:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
  text-muted:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  section-light:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.ink}"
  section-dark:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.on-dark}"
  panel-purple:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.on-purple}"
  divider:
    backgroundColor: "{colors.border-ink}"
  brand-secondary-mark:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.teal}"
    typography: "{typography.h3}"
---

## Overview

This design system expresses the [Mika Reyes brand](./BRAND.md) for
mikareyes.com: the homepage, the AI guides, the blog, press and projects, the
course landing pages, and link-in-bio.

The surface premise is **a warm reference site you can trust and actually
finish**. Sam arrives from a phone, mid-scroll, looking for one specific thing
she can run tonight. The site's job is to look like it was made by a person,
prove the credibility fast, and then get out of the way of the instructions.

Where the deck narrows the brand's field-guide territory into a single page held
up across a room, the website is the field guide *as a book*: warm paper grounds,
generous margins, one red pen, real screenshots as evidence, and a few stickers
in the margins where the motion layer lives. The playfulness is real and
intentional, but it is always in the margins, never in the instructions.

**Two systems exist in the codebase today.** The token system below (CSS custom
properties, applied via inline style objects) is the intended one and covers the
homepage, course landings, link-in-bio, header, footer, and the shared `ui/`
primitives. A second, unintended Tailwind/`zinc-*` system has grown across the
article templates and MDX rendering. Where they disagree, **this file is
correct** and the Tailwind side is drift to be migrated, not a second valid
option. The specific divergences are named throughout, and the migration rules
are in Do's and Don'ts.

## Colors

Values mirror the brand's approved identity; the role names are assigned here,
because a role is a decision this surface makes and not something the brand can
know in advance.

### The one action colour

Coral `#E8425A` fills every primary action and nothing else. It is the whole
conversion hierarchy, and it only works because it is scarce — a page with two
coral buttons has none.

Type on coral is **ink, not white**. Black on coral is 5.42:1 and clears AA;
white is 3.87:1 and does not. This is the single most common way to get the
system wrong, because white-on-red looks right and fails.

### Decoration

Teal, sun yellow, lime, periwinkle, purple, coral-soft, sand and stone are
grounds and shape fills. None is ever a primary action, and none carries
meaning on its own — a reader who cannot distinguish them loses nothing.

Contrast for black type, since these are card grounds:

| Ground | Black on it | Verdict |
|---|---|---|
| Sun Yellow `#FFDE3B` | 16.4:1 | fine |
| Lime `#C1F32B` | 14.9:1 | fine |
| Coral Soft `#F4A6AE` | 10.6:1 | fine |
| Sand `#EADCCE` | 13.6:1 | fine |
| Teal `#0E8C8C` | 5.09:1 | passes AA |
| Coral `#E8425A` | 5.42:1 | passes AA |
| Periwinkle `#6483FF` | 5.9:1 | passes AA |
| Purple `#6B4DE6` | **3.89:1** | **fails — white only, at 5.40:1** |

Purple is the exception in the palette and the only ground that inverts its
type. If a component sets black on purple, that is a bug.

### Grounds

Warm linen `#F1E8DE` is the page. Paper white `#FBF8F5` is a card — one tonal
step up, not a border. Pure white is for pill buttons and inverted elements
only; a white card on warm linen breaks the paper progression and reads as a
hole.

Charcoal `#2F2C29` is the one dark band, at most once per page. Two dark
sections stacked is the failure this rule exists to prevent.

### Known drift

Two systems still exist in the codebase. The token system above is the intended
one. A second Tailwind `zinc-*` system runs through the article templates and
MDX rendering — and is in fact the *larger* of the two, reaching roughly twice
as many components as the tokens do.

`globals.css` re-points the whole `zinc-*` ramp at warm neutrals so those
components inherit the right ground instead of sitting cool grey on warm linen.
**That is a bridge, not a blessing.** It buys coherence today; it does not make
`zinc-*` correct. Migrating a component means deleting its zinc classes and
using tokens, not tuning the bridge. Where the two disagree, this file wins.

## Typography

Satoshi displays, Hanken reads.

**Satoshi ships at two weights, Medium and Bold, and that is the whole point.**
There is no third cut to reach for, so hierarchy has to come from scale and
tight negative tracking. A heading that looks insufficiently important is a
heading at the wrong size, not a heading that needs more weight. The stylesheet
sets `font-synthesis-weight: none` so no browser can invent one.

Satoshi has no true 600. The `--mr-weight-display: 600` the system asks for
resolves to Bold; setting it to 500 switches every heading to Medium in one
edit, which is the intended lever if the page ever reads too heavy.

**Tracking tightens as type grows.** That negative tracking is what makes the
system read as editorial rather than as a default sans:

| Role | Size | Tracking |
|---|---|---|
| display | 100px | -0.014em |
| h1 | 68px | -0.034em |
| h2 | 44px | -0.034em |
| h3 | 28px | -0.057em |
| body | 18px | -0.05em |

`globals.css` sets family, weight and tracking on `h1`–`h6` globally. All three
are there for the same reason: a heading that opts out of any one of them stops
looking like the rest of the site. That is precisely how article titles on
`/blog/<post>` and `/ai/<guide>` drifted off-brand once already, while their
index pages stayed correct.

## Layout

Content lives in one of four widths, all with `px-6` mobile gutters:

| Width | Use |
|---|---|
| `max-w-2xl` | Long-form prose: projects, press, challenges, Notion pages |
| `max-w-5xl` | Article templates: blog posts, AI guides |
| `max-w-6xl` | Index pages, homepage sections, header, footer |
| `max-w-3xl`–`4xl` | About |

**Desktop gutters must be `md:px-10`.** The shared helpers in `site-styles.ts`
currently use `md:px-8` while every token-side section uses `md:px-10`, so the
homepage and `/blog` do not align at the page edges today. `md:px-10` wins.

Vertical rhythm is fluid: sections run roughly
`clamp(48px, 8vw, 80px)` top and bottom. The `--mr-space-*` tokens are declared
but unreferenced anywhere in the codebase; either adopt them or drop them, but
do not add a fifth bespoke `clamp()`.

This is a **two-breakpoint site**. `md:` (768px) is the primary and carries the
overwhelming majority of responsive behavior, `sm:` is secondary, and `lg:` is
used only on the AI guide grid and the course landing. Do not introduce `xl:` or
`2xl:` — nothing uses them.

Grids are hand-rolled per page rather than drawn from a shared system. The one
pattern worth reusing is the card grid: `grid gap-5 sm:grid-cols-2
lg:grid-cols-3`.

## Elevation & Depth

**The system is flat.** Surfaces separate by tonal step and hairline, never by
drop shadow. `--mr-shadow-card`, `--mr-shadow-frame`, `--mr-shadow-cta` and
`--mr-shadow-lift` all resolve to `none` — the names are kept so existing call
sites resolve, but they contribute nothing.

The one exception is a panel that genuinely floats above the page, like the nav
dropdown, which uses `--mr-shadow-panel`.

The site header carries a 1px ink hairline rather than a shadow — the same line
the pill buttons carry. Hairlines and tonal steps do all the separating work.

Hover is a 2–3px translate, not a shadow.

## Shapes

5px is the structural radius: cards, tags, images, inputs, panels. Pill radii
(100px, and 160px on the primary action) are **button-exclusive**. A card with a
large radius reads as a different system.

### The confetti layer

Cut-paper shapes scattered as atmosphere — zigzag, sparkle, arc, squiggle,
cross, ring, blob, capsule, burst, dots, triangle, disc. `Confetti.tsx` owns
them. Four rules, all learned the hard way:

1. **Decoration only.** Every instance is `aria-hidden` and
   `pointer-events: none`. Nothing may depend on one to be understood.
2. **Nothing is static.** Every placement names one of seven motions, with
   staggered durations so the field never moves in unison. All of them stop
   under `prefers-reduced-motion`.
3. **Nothing lands on running text.** Shapes live in the gutters. A placement
   carries a wide position and, where the layout compresses past the point of
   having a gutter, a narrow one — either hugging the page edge inside the 24px
   wrap padding, or sitting in a section's vertical padding band.
4. **Nothing disappears.** Not at any width. `outside()` carries a floor so a
   shape can never be pushed fully off the page, and a shape reduced to a 4px
   sliver counts as disappeared even though an automated check will pass it.

**Checking this properly needs care.** Two traps: measuring an element's *box*
rather than its glyph rectangles reports centred text as spanning its whole
column, and measuring a shape *where it currently sits* misses every overlap
that only happens partway through its animation. A real check samples each
shape across its own cycle against glyph rects, at every breakpoint.

Wide placements anchor to `--mr-edge`, the content column's edge, rather than to
a percentage of the section. Past 1200px the gutter keeps growing, and a shape
pinned to a percentage drifts further from the content with every extra pixel.

## Components

**Buttons come from one definition: `src/components/ui/buttonStyle.ts`.**
Import `buttonStyle({ variant, size })` and spread it into `style`, or use the
`<Button>` component in `src/components/ui/Button.tsx` when the call site does
not need its own element. Never hand-write a button's styles again — the CTA was
previously copy-pasted in ten places with nine different padding pairs.

- **Primary** — Accent-deep ground, white text, Hanken 700, `pill` radius,
  `--mr-shadow-cta`. Hovers up to Coral.
- **Secondary** — white ground, Ink text, 1.5px `border-input`, no shadow.
- **Tertiary / external link** — white ground, 1px `border`, Accent-deep label,
  `rounded-lg`, `--mr-shadow-card`.

Four sizes, and nothing outside them: `xs` (8/18, chrome), `sm` (10/20, chrome),
`md` (14/26), `lg` (16/30, the default for page-level calls to action).

Every interactive element gets exactly one of two motion classes, and this is
part of the component, not decoration:

- **`.mr-pressable`** — buttons and CTAs. Hover `translateY(-3px) scale(1.02)`,
  active `scale(0.98)`, 0.15s.
- **`.mr-lift`** — cards. Hover `translateY(-4px)` plus `--mr-shadow-lift`,
  0.25s.

A brand button that does not lift is a bug. `buttonStyle` does not add the class
for you when you spread it manually, so pair it with `className="mr-pressable"`;
`<Button>` applies it automatically.

**Cards** are white, 1px `border`, `card` radius, 24px padding,
`--mr-shadow-card`, `.mr-lift`. Media tiles use a 16:10 crop with a
`border-cream` footer rule.

**Eyebrow pills** sit above a page title: Surface-rose-strong ground, Coral
border, Accent-text label, `eyebrow` type, often prefixed `✦`.

**Modals** use `panel` radius, `--mr-shadow-frame`, and a
`rgba(17,17,17,0.45)` scrim. Three different modal shells exist today
(subscribe, guide capture, image lightbox) with three different scrims;
consolidate on this one.

### Motion

Motion is a real part of this brand's warmth and should not be flattened away.
The homepage runs a substantial imperative layer — sparkle cursor trail,
confetti on contact clicks, draggable speaking rows, magnetic pills, hero tilt,
spotlight on dark sections, a press-logo marquee, and several typed easter eggs.

It is correctly gated on **both** `prefers-reduced-motion: reduce` and
`pointer: fine`, so it never runs for someone who asked for stillness or is on
touch. Keep both gates on anything added to it.

Two gaps to close: `.mr-lift`'s `transition` is declared outside the
reduced-motion guard, so its transform still animates for users who asked it not
to; and the Tailwind hover transitions across cards and MDX are ungated
entirely. The `.mr-float` class and `mr-wiggle` keyframes are defined and unused.

### Iconography and imagery

Icons are **emoji and text glyphs by default**: `→` on CTAs, `✦` in eyebrows,
`▾` for disclosure, `×` for close. This is deliberate and matches BRAND.md,
which treats emoji as the sanctioned lightweight icon system. Reach for an
inline SVG only for a real brand mark, and never add an icon library.

Images use `next/image`. Press logos are normalized to monochrome via
`grayscale(100%) brightness(0) invert(1)`. Note that `unoptimized` is currently
set on eight components including the hero and every card cover, which bypasses
the optimizer on the highest-traffic surfaces; remove it unless a specific
asset needs it.

## Do's and Don'ts

**Do**

- Use the `--mr-*` tokens. If a value is not in this file, it needs a token
  before it ships.
- Trust the global `h1`-`h6` rule in `globals.css` for heading fonts. Do not
  set a body font on a heading.
- Use `buttonStyle()` or `<Button>` for every button. No exceptions.
- Use `Accent-deep #CE3149` for buttons and for any Coral text at reading size;
  reserve `Accent #E8425A` for large fills, section grounds, and display type.
- Give buttons `.mr-pressable` and cards `.mr-lift`.
- Use `100px` for pill radii so the magnetic-button effect keeps working.
- Use `md:px-10` desktop gutters.
- Gate any new motion on `prefers-reduced-motion` *and* `pointer: fine`.
- Extract a component the second time you copy a class string. The CTA has been
  copied ten times; that is the failure mode this rule exists to prevent.

**Don't**

- Don't add a `zinc-*` color. The warm neutral ramp is the site's; `zinc` is a
  cool grey that quietly makes pages look like a different product.
- Don't use Coral, Coral-bright, Teal, or `faint #8A8580` for body-size text.
  All four fail WCAG AA on white.
- Don't put a tint on a tint, or carry light borders into a dark section.
- Don't use `rounded-full` on a button.
- Don't introduce another bespoke section `clamp()` or another article H1 size.
- Don't add `xl:` or `2xl:` breakpoints.
- Don't add an icon library or a gradient. Neither belongs to this brand.
- Don't reintroduce purple. It is retired in BRAND.md.
- Don't copy the deck's system here. That surface is pure white, two type sizes,
  and no tints on purpose; this one is warm, ranged, and meant to be read.
