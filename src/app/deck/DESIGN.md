---
name: Mika Reyes Decks
description: Visual system for the full-screen presentation decks recorded into content videos at /deck/<slug>.
brand: ../../../BRAND.md
version: alpha
colors:
  primary: "#111111"
  accent: "#FF5959"
  neutral: "#FFFFFF"
  secondary: "#52525B"
  meta: "#71717A"
  outline: "#E4E4E7"
  control: "#8E8E96"
  on-accent: "#FFFFFF"
  step-done: "#18181B"
typography:
  display:
    fontFamily: Inter
    fontSize: 11rem
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: -0.02em
  statement:
    fontFamily: Inter
    fontSize: 8rem
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: -0.02em
  statement-sm:
    fontFamily: Inter
    fontSize: 6rem
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: -0.02em
  step-label:
    fontFamily: Inter
    fontSize: 6rem
    fontWeight: 800
    lineHeight: 1.05
  step-number:
    fontFamily: Geist Mono
    fontSize: 3rem
    fontWeight: 700
  meta:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
rounded:
  sm: 0.75rem
  md: 1rem
  full: 9999px
spacing:
  sm: 8px
  md: 20px
  lg: 32px
  xl: 64px
components:
  cta-pill:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.display}"
    rounded: "{rounded.md}"
    padding: 16px
  step-marker-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.step-number}"
    rounded: "{rounded.full}"
    size: 96px
  step-marker-done:
    backgroundColor: "{colors.step-done}"
    textColor: "{colors.on-accent}"
    typography: "{typography.step-number}"
    rounded: "{rounded.full}"
    size: 96px
  step-marker-upcoming:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.step-number}"
    rounded: "{rounded.full}"
    size: 96px
  framed-image:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.md}"
  nav-button:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    size: 44px
  progress-dot-active:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.full}"
    height: 8px
    width: 22px
  progress-dot-inactive:
    backgroundColor: "{colors.control}"
    rounded: "{rounded.full}"
    height: 8px
    width: 8px
  slide-counter:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.meta}"
    typography: "{typography.meta}"
  image-credit:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.meta}"
    typography: "{typography.meta}"
---

## Overview

This design system expresses the [Mika Reyes brand](../../../BRAND.md) for one
narrow surface: full-screen slides that Mika records herself presenting, then
cuts into short-form video.

Every constraint here follows from that. A slide is not read, it is glimpsed.
It shares the frame with a talking head, gets watched at phone size, and has
roughly four seconds to land before the edit moves on. So the surface premise is
**one idea, at the largest size it will go, with nothing else competing.**

Where the brand's visual territory is a field guide on warm paper, the deck is
that same field guide held up at arm's length across a room. Warmth here comes
from the type and the coral, not from tinted grounds: the deck ground is pure
white so a screenshot pasted onto it reads as evidence rather than decoration.

The system is deliberately small. Two content type sizes, one accent. A deck
that needs a new template usually needs a different script.

**The engine is [reveal.js](https://revealjs.com) 6.** Slides are laid out on a
fixed **1440x810** canvas that Reveal scales to fit any window, so a slide looks
identical everywhere and can no longer overflow. Two consequences that matter
more than they sound:

- **No `vw`/`vh` units on a slide.** They resolve against the real window and
  then get scaled again by Reveal, so they compound.
- **No responsive variants (`sm:`, `md:`) for type.** They key off the window,
  not the canvas, so a slide would resize for reasons the design never intended.
  The locked scale is fixed for this reason.

Reveal also brings speaker notes (`S`), fragments, overview (`Esc`), and PDF
export (`?print-pdf`). Navigation is arrows/space; the current slide is in the
URL hash (`#/3`), not a `?slide=` query param.

## Colors

Values are mirrored from the brand's approved identity colors; the role names
are assigned here. The accent is the brand red `#FF5959`, which replaced coral `#E8425A` in BRAND.md v3.

| Role | Brand color | Value | Origin |
|---|---|---|---|
| `accent` | Coral (mandatory) | `#FF5959` | Mirrored |
| `neutral` | White (mandatory) | `#FFFFFF` | Mirrored |
| `primary` | Ink (mandatory) | `#111111` | Mirrored |
| `on-accent` | White | `#FFFFFF` | Mirrored |
| `secondary` | none | `#52525B` | Derived |
| `meta` | none | `#71717A` | Derived |
| `outline` | none | `#E4E4E7` | Derived |
| `control` | none | `#8E8E96` | Derived |
| `step-done` | none | `#18181B` | Derived |

**Resolved 2026-08-24.** This surface previously rendered `#09090B`
(Tailwind `zinc-950`) for the Ink role — the same meaning at a different value,
which the BRAND.md/DESIGN.md contract treats as a contradiction needing a human.
It now mirrors the approved brand Ink exactly, through a `--deck-ink` token in
`deck.css` that points at `--mr-ink`. Do not reintroduce `text-zinc-950` for
message-bearing text on this surface.

- **Primary `#111111`** — the brand Ink, mirrored. Every headline, statement,
  and step label. Referenced as `var(--deck-ink)`, never as a literal.
- **Accent `#FF5959`** — the approved brand Coral, mirrored. Highlighted words
  inside a statement, step numbers, the CTA pill, the active progress dot.
- **Neutral `#FFFFFF`** — the ground. Always pure white, never a tinted surface.
- **Secondary `#52525B`** — upcoming step numbers, nav button glyphs.
- **Meta `#71717A`** — image credits and the slide counter only. Never carries
  the spoken message. Measures 4.83:1 on white and passes WCAG AA.
- **Outline `#E4E4E7`** — nav button borders. Not used for text.
- **Control `#8E8E96`** — inactive progress dots. Measures 3.25:1 on white,
  clearing the 3:1 floor WCAG 1.4.11 sets for interactive components.

**The accent is rationed.** One to three highlighted words per statement, and
never more than one accent element competing for the eye on a slide. The brand
file is explicit that coral means something because it is rare; on a surface
this large, a second coral element halves the value of the first.

**White on coral is a large-text-only pairing.** It measures 3.08:1 with red `#FF5959`, which is
below the 4.5:1 WCAG AA floor for normal text and above the 3:1 floor that
applies to large text. Every use of it in this system is far into large-text
territory: the CTA headline is 176px and the step marker number is 48px bold,
against thresholds of 24px and 18.66px. A generic linter will flag these two
components because it cannot see the type size attached to them. The pairing is
correct here and must never be carried to anything at body size, on this surface
or any other.

The deck never uses the brand's Teal. It is a legitimate brand color that this
surface has no role for: with four seconds and one idea, a second hue is one
more thing to resolve.

**Resolved 2026-08-24: the two contrast failures are fixed.** `meta` was
`#A1A1AA` (2.56:1, failing) and inactive progress dots were `#D4D4D8` (1.48:1,
failing the 3:1 floor for interactive components). Both now pass. Do not
reintroduce `zinc-400` or lighter for text or for a control on this surface.

**Never hardcode the accent hex.** `--deck-accent` is defined once in
`deck.css` as `var(--mr-red)`, which resolves to the approved brand value in
`globals.css`. Slides and SVGs reference `var(--deck-accent)`. Decks built
before 2026-08-24 hardcode a retired salmon `#fd4869`; that is legacy, not a
pattern to copy.

## Typography

**Inter** for everything with a voice, Geist Mono for step numbers — see the
migration note directly below before adding a new deck.

> **This surface is mid-migration. Read this before making a new deck.**
>
> BRAND.md version 2 retired the surface split. **Satoshi is now the display
> voice everywhere, decks included**, and Inter is retired for new work.
>
> `deck.css` has deliberately not been repointed. Every deck shares it, so
> switching the token would re-type all sixty-odd already-filmed decks at once
> — and those are finished artefacts with videos recorded against them. They are
> **grandfathered, not off-brand**: an existing deck set in Inter is correct and
> should be left alone.
>
> What that leaves is a real gap: there is no mechanism yet for a *new* deck to
> take Satoshi without dragging the old ones with it. Closing it means either a
> per-deck opt-in or a dated cutover, and that is a decision, not a cleanup.
> Until it is made, a new deck built today will come out in Inter — which is
> off-brand under version 2. Flag it rather than quietly shipping it.

The rest of this section describes the surface as it stands today, in Inter.

Inter is more neutral than Bricolage and reads loose at display sizes, so this
surface tightens both axes. Two tokens in `deck.css`, and everything follows
them:

| Token | Value | Effect |
|---|---|---|
| `--deck-tracking` | `-0.035em` | Letter-spacing on every heading and step label. Less negative = looser. |
| `--deck-leading` | `0.88` | Line-height on the same. Larger = more space between lines. |

`font-optical-sizing: auto` is on, so Inter's `opsz` axis adjusts the letterforms
between a 16px credit and a 176px hero rather than scaling one drawing.

**The legacy `--font-bricolage` variable is aliased to `--font-deck`.** About
thirty already-filmed decks hardcode it inside SVG `fontFamily` attributes; the
alias re-points them all at once. New slides use `--font-deck`.

**A global rule has to be overridden here.** `globals.css` sets
`h1..h6 { font-family: var(--mr-font-display) }` for the website's article
headings, and that reaches into the deck too. `reveal-theme.css` overrides it
under `.deck-root`.
Hanken Grotesk, the brand's body face, appears nowhere here: this surface has no
body copy, and its presence would imply reading.

The scale is **locked** in `src/components/deck/deck-styles.ts` and is the
single most load-bearing rule in the system.

| Token | Desktop | Mobile | Use |
|---|---|---|---|
| `display` | 11rem | 8rem | Hero statements, the CTA headline |
| `statement` | 8rem | 6rem | **The floor.** All headlines and image headers |
| `statement-sm` | 6rem | 4.5rem | Image and step headers only, when a full-size header crowds the visual |
| `step-label` | fluid, 1.75rem to 6rem | fluid | Step list labels |
| `meta` | 1rem | 0.875rem | Image credits, slide counter. Never the message |

**`step-label` is fluid, and its token records the ceiling.** In code it is
`clamp(1.75rem, 3.4vw, 6rem)`: step labels are `whitespace-nowrap` by design, so
a fixed size meant a long label pushed the row wider than the viewport and
clipped off the left edge. Scaling with viewport width keeps every label on one
line at any width. The token above carries `6rem` because the DESIGN.md
dimension type is a single number plus unit and cannot express a clamp; treat it
as the maximum, not a fixed value.

**Nothing carrying the spoken message may be smaller than `statement`.** This is
the rule the whole system is built to protect. `meta` exists for footnotes and
is not an escape hatch. `statement-sm` is the one sanctioned step down and is
for headers sitting above a visual, never for a hero statement.

Two content sizes, deliberately. There is no h3, no kicker, no sub-text, no
caption-under-image. A slide that seems to need a third size needs to become two
slides.

Headlines are weight 800, `leading-[1.04]`, tight tracking, and `text-balance`
so a two-line headline breaks evenly instead of orphaning a word.

## Layout

Every slide is a full-viewport flex container, vertically and horizontally
centered, with generous padding that scales at the `sm` breakpoint. Content is
capped around `max-w-6xl` so a long statement wraps into a readable block rather
than a single wide line.

Slides are composed, never hand-laid-out. The seven templates in
`slide-parts.tsx` and `special-slides.tsx` are the complete vocabulary:

| Template | Shape |
|---|---|
| `CoverSlide` | Title only, diagram only, or title above diagram |
| `TextSlide` | Centered statement, optional emoji or step number above |
| `PointSlide` | Large emoji, accent number, headline as a matched set |
| `ImageSlide` | Image filling the slide; optional header above |
| `DualImageSlide` | Two images side by side under one optional header |
| `CtaSlide` | Coral pill, text-only or paired with a preview image |
| `PyramidSlide` | A bespoke SVG diagram, the pattern for custom diagrams |

**Reveal-native templates** live in `reveal-parts.tsx` and build *within* one
slide instead of across several:

| Template | Shape |
|---|---|
| `Appear` | Reveals its children on their own click. The general fragment. |
| `FitTextSlide` | A statement scaled to the widest it fits. The scale becomes a ceiling, not a fixed size. One line only. |
| `ListSlide` | Bulleted or numbered list, revealed item by item. |
| `TableSlide` | A comparison table. Three columns and five rows is the ceiling before it stops reading on video. |
| `OverlaySlide` | Type over a full-bleed background, with a scrim on by default. |
| `Notes` | Speaker notes for a slide. Invisible on screen, shows in `S` view. |
| `BuildStatementSlide` | Setup on screen, accented payoff on click. |

### Slide-level settings

Backgrounds, transitions, and auto-animate live on the `<section>` element,
which only the deck shell can reach. A slide is therefore either plain content
or a `DeckSlide` object (`deck-slide.ts`); the two mix freely in one deck.

```tsx
{ background: { image: `${LIB}/layoffs.jpg`, opacity: 0.55 },
  content: <OverlaySlide>Cut the team. Stock goes up.</OverlaySlide> }
```

**Backgrounds** take exactly one source — `color`, `gradient`, `image`, `video`,
or `iframe` — plus modifiers (`size`, `position`, `opacity`, `transition`).
Video defaults to muted and looping; a deck background should never surprise you
with sound, and a clip that freezes mid-frame is worse than one that loops
quietly under a retake.

**An image-only slide should be a background, not an `ImageSlide`.** The image
then covers the whole canvas with no letterboxing and can cross-fade to the
next.

**Type over a background needs a scrim.** White on an arbitrary photo fails
contrast at any size. `OverlaySlide` applies one by default; turn it off only
over a ground you have actually checked, or one already dimmed with
`background.opacity`.

**Auto-animate** morphs matching elements between two adjacent slides instead of
cutting. Set `autoAnimate` on **both**, and give the element that should travel
a matching `data-id`. It is the strongest tool here for a number that changes.
Use it on the beat that matters, not throughout.

**The Steps templates are retired.** `StepsSlide` and `StepsBuildSlide` are no
longer part of the roster and must not be chosen for a new deck. They stay in
the codebase only because already-filmed decks render them. For a sequence of
steps, reach for `ListSlide` with `ordered` (each step revealed item by item on
its own click) or give each step its own image or statement slide.

**Images default to bare.** `ImageSlide` and `DualImageSlide` render the image
alone unless a header is explicitly requested. A header is an opt-in exception,
because on this surface the picture usually is the point.

**Captions are headers at the top.** Never a pill, never an overlay on the
image, never text beneath it.

## Elevation & Depth

The deck is flat. There is no elevation system, no card stack, no layered
surface language.

Two shadows exist, both doing a specific job rather than expressing hierarchy:

- **Framed media** — `0 24px 70px -24px rgba(0,0,0,0.3)`. Lifts a screenshot or
  portrait off pure white so its own white background does not dissolve into the
  slide. Used only when `framed` is set.
- **CTA pill** — `0 18px 50px -12px rgba(255,89,89,0.6)`. A coral glow under the
  final call to action, the one moment the deck is allowed to be loud.

Unframed images sit directly on white with no shadow at all.

## Shapes

Two radii and a circle. `rounded.md` (1rem) on framed media and the CTA pill,
`rounded.sm` (0.75rem) on the highlight sweep behind an accented word, and full
circles for step markers and nav controls.

No borders as decoration. The only strokes in the system are the hairline on nav
buttons and the outline on an upcoming step marker, both of which mark a control
rather than a shape.

## Components

**Motion is part of the component, not an addition to it.** Every slide is
remounted with a fresh `key` on navigation, so entrance animations replay each
time the slide is reached, including when Mika steps backward mid-take. That
replay behavior is a filming requirement: a retake has to look identical.

The animation classes live in `deck.css`:

| Class | Motion | Applied to |
|---|---|---|
| `deck-rise` | Rise 28px and fade, 0.7s | Headlines, step labels |
| `deck-fade` | Fade, 0.9s | Image slides, diagrams |
| `deck-pop` | Overshoot scale, 0.6s | Emoji, step numbers, previews |
| `deck-tier` | Grow from bottom edge, 0.6s | Stacked diagram tiers |
| `deck-underline-word` | Coral sweep left to right, 0.6s | `<HL>` highlights |
| `deck-cta-pulse` | Pop, then breathe indefinitely | The CTA pill only |

Stagger with `animationDelay` in the 0.05s to 0.4s range so elements resolve in
reading order. Anything longer than 0.4s outlasts the shot.

`deck-cta-pulse` is the only infinite animation permitted, and only on the final
slide.

**Navigation** is deliberately over-provided because Mika is holding a phone or a
clicker while presenting: arrow keys, space, PageUp/PageDown, Home/End, 18%-wide
invisible click zones on each edge, swipe, arrow buttons, and clickable progress
dots. The current slide syncs to `?slide=N` so any slide is directly reachable
for a retake.

All navigation chrome sits bottom-center in a single stack, outside the content
area, so it never collides with a slide.

## Do's and Don'ts

**Do**

- Reference `var(--deck-accent)` for anything coral, in JSX and inside SVG.
- Compose the existing templates. Reach for a new one only when the script
  genuinely has no home.
- Build custom diagrams as inline SVG with explicit coordinates. They land
  correctly the first time; HTML and CSS diagrams need a screenshot-tweak loop.
- Let an image fill the slide when the image is the argument.
- Test at phone size. That is where this gets watched.

**Don't**

- Hardcode `#FF5959`, `#fd4869`, or any accent hex anywhere.
- Set a font size below `statement` for anything spoken aloud. Not with a
  Tailwind class, not with inline style, not "just this once."
- Add sub-text, kickers, captions under images, or a third type size.
- Put more than one accent element on a slide.
- Introduce a tinted background. The website's rose, cream, and sand grounds
  belong to the website, not here.
- Use the brand Teal on a slide.
- Add an infinite animation to anything except the CTA pill.
- Re-add navigation chrome or a handle to an individual deck page. The shell
  already provides it.
- Retrofit these rules onto decks already filmed. They are finished props.
