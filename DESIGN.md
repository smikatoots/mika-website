---
name: Mika Reyes Website
description: Visual system for mikareyes.com — the marketing pages, AI guides, blog, and every public content surface.
brand: ./BRAND.md
version: alpha
colors:
  primary: "#111111"
  body: "#3A3A3A"
  muted: "#6B6B6B"
  accent: "#E8425A"
  accent-deep: "#CE3149"
  secondary: "#0E8C8C"
  dark: "#142A2A"
  neutral: "#FFFFFF"
  surface-rose: "#FCEAEC"
  surface-rose-strong: "#FCE4E2"
  surface-cream: "#F7F4EF"
  surface-sand: "#FBF1E9"
  surface-teal: "#E8F4F4"
  border: "#E4E0D8"
  border-rose: "#F6D2D7"
  border-input: "#E0DBD3"
  on-accent: "#FFFFFF"
  on-dark: "#FFFFFF"
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 60px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.03em
  h1:
    fontFamily: Bricolage Grotesque
    fontSize: 54px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.025em
  h2:
    fontFamily: Bricolage Grotesque
    fontSize: 38px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h3:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
  stat:
    fontFamily: Bricolage Grotesque
    fontSize: 42px
    fontWeight: 800
  lead:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  body-xs:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: 400
  eyebrow:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: 700
    letterSpacing: 0.06em
rounded:
  input: 10px
  chip: 14px
  card: 18px
  panel: 22px
  pill: 100px
spacing:
  gap: 28px
  gutter: 40px
  section: 64px
components:
  button-primary:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 16px
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.body}"
    rounded: "{rounded.card}"
    padding: 24px
  panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.body}"
    rounded: "{rounded.panel}"
    padding: 28px
  eyebrow-pill:
    backgroundColor: "{colors.surface-rose-strong}"
    textColor: "{colors.accent-deep}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: 8px
  tag-chip:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.body-xs}"
    rounded: "{rounded.chip}"
    padding: 6px
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.input}"
    padding: 12px
  link-inline:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.accent-deep}"
    typography: "{typography.body-md}"
  text-body:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
  text-muted:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  section-rose:
    backgroundColor: "{colors.surface-rose}"
    textColor: "{colors.primary}"
  section-cream:
    backgroundColor: "{colors.surface-cream}"
    textColor: "{colors.primary}"
  section-sand:
    backgroundColor: "{colors.surface-sand}"
    textColor: "{colors.primary}"
  section-teal:
    backgroundColor: "{colors.surface-teal}"
    textColor: "{colors.primary}"
  section-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.on-dark}"
  section-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  divider:
    backgroundColor: "{colors.border}"
  divider-rose:
    backgroundColor: "{colors.border-rose}"
  field-outline:
    backgroundColor: "{colors.border-input}"
  brand-secondary-mark:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
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

Values are mirrored from the brand's approved identity colors; the role names
are assigned here, because a role is a decision this surface makes and not
something the brand can know in advance.

| Role | Brand color | Value | Origin |
|---|---|---|---|
| `primary` | Ink (mandatory) | `#111111` | Mirrored |
| `accent` | Coral (mandatory) | `#E8425A` | Mirrored |
| `secondary` | Teal (optional) | `#0E8C8C` | Mirrored |
| `neutral` | White (mandatory) | `#FFFFFF` | Mirrored |
| `accent-deep` | Coral | `#CE3149` | Derived — darkened to clear AA. `--mr-coral-deep` |
| `accent-hover` | none | `#FF3D68` | Derived |
| `body` | none | `#3A3A3A` | Derived |
| `muted` | none | `#6B6B6B` | Derived |
| `dark` | none | `#142A2A` | Derived |
| `surface-rose` / `-rose-strong` | none | `#FCEAEC` / `#FCE4E2` | Derived |
| `surface-cream` / `-sand` / `-teal` | none | `#F7F4EF` / `#FBF1E9` / `#E8F4F4` | Derived |
| `border` / `-rose` / `-input` | none | `#E4E0D8` / `#F6D2D7` / `#E0DBD3` | Derived |

Mirrored values are copied at their exact approved value and must not be
reinterpreted here. Everything marked Derived is this surface's own decision and
carries no identity meaning.

### Text

- **Primary `#111111`** — headings and anything that must read as structural.
- **Body `#3A3A3A`** — running prose. 11.37:1 on white.
- **Muted `#6B6B6B`** — metadata, timestamps, tag chips, captions. 5.33:1,
  passes AA. This is the floor for text on this surface.

### Accent

- **Accent `#E8425A`** — the brand Coral, mirrored. Fills and large type only:
  button backgrounds, the featured-in band, section grounds, the active filter
  pill, headings at 24px and above.
- **Accent-deep `#CE3149`** (`--mr-coral-deep`) — the same red darkened until
  it passes contrast. **Coral itself is 3.92:1 on white and fails WCAG AA**, so
  Accent-deep carries two jobs: every button ground, and any coral text at
  reading size. It measures 5.05:1 against white both ways, and 4.60:1 as text
  on cream.
**Buttons do not change color on hover.** They lift, via `.mr-pressable`.
An earlier hover swapped the ground to a lighter red, which dropped the label
back under AA at the exact moment the user was aiming at it. `--mr-coral-bright
#FF3D68` (3.43:1) survives in `globals.css` for legacy callers and should be
retired; it is not part of this system.
- **Secondary `#0E8C8C`** — the brand Teal. Currently near-unused. It measures
  4.08:1, so it carries the same rule as Coral: fills and large type, not body
  text. Darken to `#0B7C7C` (5.01:1) if it is ever needed inline.

### Tracked accessibility exceptions

**Resolved 2026-08-24: buttons.** Every button ground moved from Coral
`#E8425A` (3.92:1 with white, failing) to Accent-deep `#CE3149` (5.05:1,
passing). Raising the label size instead would only have helped the large page
CTAs — the header and footer buttons are 15px and can never reach WCAG's
large-text exemption, so the ground had to change. Buttons now hover *up* to
Coral rather than out to Coral-bright.

**Still open: the featured-in band.** Its "FEATURED IN" label is white on Coral
at 12px — 3.92:1, same failure as the old button. The band's *ground* is
legitimately Coral (a brand fill), so the fix is the label, not the section:
set it in Ink, or darken the band to Accent-deep.

**Still open: the eyebrow pill.** Its label is Coral on Rose-strong at 3.24:1,
and even Accent-deep only reaches 4.17:1 against that ground. Two remedies:
`#BE2A41` measures 4.82:1 and passes, or set the label in Primary `#111111`
(16:1) and let the pill's Coral border carry the accent. **Not applied** — it
introduces a third red or changes the pill's character, and either is a call for
a human.

A note for whoever runs a linter here: **white on Coral at 24px and above is
fine** and will still be flagged. Large display type and the deck's CTA pill sit
in that allowance legitimately. Only reading-size text is the problem.

### Grounds

The site alternates white with warm tints to create section rhythm. Each tint
has a job; they are not interchangeable.

| Ground | Value | What it means |
|---|---|---|
| Neutral `#FFFFFF` | white | The default. Everything instructional sits here. |
| Surface-rose `#FCEAEC` | soft pink | Personal and conversion moments: the story timeline, subscribe and course CTAs, link-in-bio. Pairs with `border-rose`. |
| Surface-rose-strong `#FCE4E2` | deeper pink | Eyebrow pills and active filter pills only. Never a section ground. |
| Surface-cream `#F7F4EF` | warm neutral | Section alternation and nav hover fills. The workhorse tint. |
| Surface-sand `#FBF1E9` | warm sand | Reserved for credentials and awards. |
| Surface-teal `#E8F4F4` | cool tint | The one cool ground, for a calm aside that must not read as a CTA. |
| Dark `#142A2A` | deep teal-black | The only dark surface: speaking, contact, course and link-in-bio heroes. White on it is 15.06:1. |

**Rules.** Never place a tint on a tint. Never place Coral text on
Surface-rose-strong at body size (3.24:1). A dark section inverts the whole text
ramp to white and its own alpha-based borders; do not carry the light borders
into it.

### Known drift

- `--mr-bg`, `--mr-surface`, and `--mr-surface-warm` are all `#FFFFFF`.
  `surface-warm` implies a warmth its value does not deliver. Use Neutral.
- `--mr-purple #6B4DE6` is retired per BRAND.md but still appears as a raw hex
  in the homepage motion palette. Remove it on next touch.
- A `zinc-*` neutral ramp shadows this one across article templates
  (`border-zinc-200` for `border`, `text-zinc-950` for `primary`,
  `bg-zinc-50` for `surface-cream`). Migrate toward the tokens.
- `text-accent` and `text-[var(--mr-coral)]` are two names for one color. Prefer
  the token; and at body size, neither is correct — use Accent-text.

## Typography

Two families, both loaded in `src/app/layout.tsx`.

- **Bricolage Grotesque** — every heading, every display moment, stats, the
  logo wordmark. Weight 700 to 800, tight tracking, tight leading.
- **Hanken Grotesk** — all running text, leads, metadata, buttons, form fields.
  Weight 400 to 600.
- **Geist Mono** — declared and available; currently reserved, not in active use.

The scale is declared as `--mr-text-*` in `globals.css` and mirrored in the
tokens above.

| Token | Size | Family | Use |
|---|---|---|---|
| `display` | 60px | Bricolage | Homepage hero only |
| `h1` | 54px | Bricolage | Page titles |
| `h2` | 38px | Bricolage | Section headings |
| `h3` | 24px | Bricolage | Card titles, sub-sections |
| `stat` | 42px | Bricolage | Big numbers |
| `lead` | 20px | Hanken | Intro paragraph under a title |
| `body-md` | 17px | Hanken | Default prose |
| `body-sm` | 15px | Hanken | Secondary text, buttons, chips |
| `body-xs` | 13px | Hanken | Metadata, captions |
| `eyebrow` | 12px | Hanken, 700, +0.06em | Pill labels above a title |

Large headings scale fluidly. The homepage hero is
`clamp(42px, 6vw, 72px)` and page titles are `clamp(36px, 5vw, 54px)`.

### The one rule that is currently broken

**There is no global `h1`–`h6` font-family rule, and `body` is set to Hanken.**
Any heading that does not explicitly set the display font renders in the *body*
font. Every article template currently does exactly that, which means:

> `/blog` and `/ai` show their titles in Bricolage, and `/blog/<post>` and
> `/ai/<guide>` — the flagship content — show theirs in Hanken.

Headings on this site are Bricolage. No exceptions. Any heading must set
`font-family: var(--mr-font-display)`, whether through `PageHero`, the
`textH1`/`textH2`/`textH3` helpers in `src/lib/ui/site-styles.ts`, or the
`font-display` Tailwind utility. The cleanest permanent fix is a global
`h1,h2,h3,h4,h5,h6 { font-family: var(--mr-font-display) }` rule in
`globals.css`, which would correct every article template at once.

Article H1s also currently ship at four different sizes (`text-4xl md:text-5xl`,
`text-3xl md:text-4xl`, `text-2xl sm:text-3xl md:text-4xl`, and one at
`font-bold`). One page title, one size: `h1`.

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

Four shadows, each with a job. Elevation is soft and warm-tinted, never a
neutral grey drop.

| Token | Value | Use |
|---|---|---|
| `--mr-shadow-card` | `0 6px 16px -10px rgba(150,100,40,.30)` | Resting cards. Warm-tinted so it sits on cream without going grey. |
| `--mr-shadow-lift` | `0 12px 28px -8px rgba(0,0,0,.22)` | The hover state of a card, paired with `translateY(-4px)`. |
| `--mr-shadow-cta` | `0 12px 24px -8px rgba(232,66,90,.60)` | Coral glow under a primary button. The only colored shadow. |
| `--mr-shadow-frame` | `0 26px 56px -22px rgba(20,42,42,.45)` | Large framed imagery: the hero photo, proof screenshots. |

Tailwind's `shadow-sm` / `shadow-lg` / `shadow-2xl` appear across the article and
media-kit surfaces with no mapping to these. Treat them as drift: `shadow-sm` →
`--mr-shadow-card`, `shadow-lg`/`shadow-2xl` → `--mr-shadow-frame`.

## Shapes

Five radii, and they are semantic rather than decorative:

| Token | Value | Applies to |
|---|---|---|
| `pill` | 100px | Every button, nav link, filter chip, eyebrow |
| `panel` | 22px | Modals and large containers |
| `card` | 18px | Cards and tiles |
| `chip` | 14px | Tag chips |
| `input` | 10px | Form fields |

**Use `100px`, not `rounded-full`.** They look identical, but the homepage
motion layer selects magnetic buttons by testing `borderRadius === "100px"`, so
a `rounded-full` button computes to `9999px` and silently loses the effect. The
mobile header CTA has this bug today while its desktop twin does not.

Images are the one place a sixth radius has crept in: MDX images use
`rounded-[10px]` and one gallery uses `rounded-[8px]`. Standardize on `card`
(18px) for framed imagery and `input` (10px) for inline MDX images.

Borders are 1px and warm (`--mr-border #E4E0D8`), stepping to a tint-matched
border on tinted grounds (`border-rose` on rose, `border-cream` on cream).
Form fields use the slightly darker `border-input`, at 1.5px on secondary
buttons.

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
