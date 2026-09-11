import { deckType, headingBase } from "./deck-styles";
import { FitText } from "./FitText";

/**
 * Reveal.js-native slide parts. These depend on the deck being driven by
 * Reveal, unlike the templates in `slide-parts.tsx` which are plain layout.
 *
 * See `src/app/deck/DESIGN.md` > Components for when to reach for each.
 */

/** Reveal's fragment animations. Default (`fade-in`) is almost always right. */
type AppearEffect =
  | "fade-in"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "grow"
  | "current-visible";

/**
 * Reveals its children on their own click, instead of all at once with the
 * slide. This is the thing that lets one slide carry a sequence: previously a
 * four-step build meant four near-duplicate slides.
 *
 * `order` maps to Reveal's `data-fragment-index`. Give several elements the
 * same `order` to reveal them together.
 *
 * ```tsx
 * <TextSlide>
 *   The tool matters <Appear>because of where it gets you.</Appear>
 * </TextSlide>
 * ```
 */
export function Appear({
  children,
  order,
  effect = "fade-in",
  className = "",
}: {
  children: React.ReactNode;
  order?: number;
  effect?: AppearEffect;
  className?: string;
}) {
  return (
    <span
      className={`fragment ${effect} ${className}`.trim()}
      data-fragment-index={order}
    >
      {children}
    </span>
  );
}

/**
 * Speaker notes for one slide. Invisible on the slide itself; shows in the
 * speaker view when you press `S`, alongside the next slide and a timer.
 *
 * Put the spoken line for the beat here and the script stops needing to live
 * in a second window while filming.
 */
export function Notes({ children }: { children: React.ReactNode }) {
  return <aside className="notes">{children}</aside>;
}

/**
 * The progressive steps list as ONE slide.
 *
 * `StepsSlide` in `slide-parts.tsx` renders a single frame of a build, so a
 * four-step sequence costs four near-identical slides that have to be kept in
 * sync by hand. This renders the whole build once and lets Reveal walk it:
 * each step's label appears on its own click, and its visual swaps in with it.
 *
 * Every step is always in the DOM, so the layout is measured against the
 * longest label from the first frame and never reflows as steps appear.
 *
 * ```tsx
 * <StepsBuildSlide
 *   steps={["Pick one real workflow", "Go deep for a week"]}
 *   visuals={[<Shot key="a" … />, <Shot key="b" … />]}
 * />
 * ```
 */
export function StepsBuildSlide({
  steps,
  visuals,
}: {
  steps: React.ReactNode[];
  /** One visual per step. Swaps as each step is reached. Optional. */
  visuals?: React.ReactNode[];
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden px-8 py-12 md:flex-row md:gap-8 md:px-10">
      <div className="flex w-full min-w-0 justify-center md:w-auto md:flex-1 md:justify-end">
        <ol className="flex min-w-0 flex-col justify-center gap-6">
          {steps.map((label, i) => (
            <li key={i} className="flex items-center gap-5">
              {/* Step 1 is on screen the moment the slide is reached — arriving
                  on an empty list reads as a blank slide. Only steps 2..n are
                  fragments, so their indices run one behind their position. */}
              <span
                className={
                  i === 0
                    ? "flex h-16 w-16 flex-none items-center justify-center rounded-full border-2 border-transparent bg-[var(--deck-accent)] font-mono text-3xl font-bold text-white"
                    : "fragment fade-in flex h-16 w-16 flex-none items-center justify-center rounded-full border-2 border-zinc-400 font-mono text-3xl font-bold text-zinc-600"
                }
                {...(i === 0
                  ? {}
                  : { "data-fragment-index": i - 1, "data-fragment-style": "reached" })}
              >
                {i + 1}
              </span>
              <span
                className={
                  i === 0
                    ? "whitespace-nowrap text-5xl font-extrabold leading-[var(--deck-leading)] tracking-[var(--deck-tracking)] text-[var(--deck-ink)]"
                    : "fragment fade-in whitespace-nowrap text-5xl font-extrabold leading-[var(--deck-leading)] tracking-[var(--deck-tracking)] text-[var(--deck-ink)]"
                }
                {...(i === 0 ? {} : { "data-fragment-index": i - 1 })}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {visuals?.length ? (
        // `r-stack` layers every visual in one grid cell; `current-visible`
        // shows each only while its step is the current one, so they swap
        // rather than pile up.
        // `r-stack` is a CSS grid with `grid-template-rows: 100%`, so it
        // collapses to zero height unless the container has a definite one.
        <div className="r-stack h-[34rem] w-full md:w-[36rem] md:flex-none">
          {visuals.map((visual, i) => (
            <div
              key={i}
              // The arbitrary-variant selector bounds whatever visual is passed
              // in, so a tall aspect-ratio box can't overflow the stack.
              //
              // Visual 1 is on screen from the first frame (its step is too).
              // The rest are plain `fade-in` fragments stacked on top, so each
              // one covers the previous as its step lands — `bg-white` is what
              // makes that cover opaque. `current-visible` would be the tidier
              // mechanism, but reveal's rule for it is unlayered and beats
              // anything this stylesheet can say, so the swap never painted.
              className={
                i === 0
                  ? "flex h-full w-full items-center justify-center bg-white [&>*]:max-h-full [&>*]:max-w-full"
                  : "fragment fade-in flex h-full w-full items-center justify-center bg-white [&>*]:max-h-full [&>*]:max-w-full"
              }
              {...(i === 0 ? {} : { "data-fragment-index": i - 1 })}
            >
              {visual}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * A statement that lands in two beats: the setup is on screen, the payoff
 * arrives on click. The payoff carries the accent, because it is the point.
 */
export function BuildStatementSlide({
  setup,
  payoff,
}: {
  setup: React.ReactNode;
  payoff: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center sm:px-16">
      <h1
        className={`mx-auto w-full max-w-6xl text-center ${headingBase} ${deckType.statement}`}
      >
        {setup}{" "}
        <Appear effect="fade-up">
          <span className="deck-accent">{payoff}</span>
        </Appear>
      </h1>
    </div>
  );
}

/**
 * A statement sized to fill the slide, whatever its length.
 *
 * The text is measured and scaled to the widest it fits, so the locked scale
 * becomes a *ceiling* rather than a fixed size: a short line goes huge, a long
 * one settles smaller, and neither clips. Use it when the copy length varies
 * and you don't want to hand-pick between `display` and `statement`.
 *
 * **One line only** — fitting requires `nowrap`. For two lines use `TextSlide`.
 */
export function FitTextSlide({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-12 text-center">
      <h1
        className={`deck-rise w-full ${headingBase}`}
        style={{ animationDelay: "0.05s" }}
      >
        <FitText>{children}</FitText>
      </h1>
    </div>
  );
}

/**
 * A list, revealed one item at a time.
 *
 * Bulleted by default, numbered with `ordered`. Every item is in the DOM from
 * the first frame, so the block never reflows as items appear — the slide is
 * laid out against the finished list.
 *
 * Keep items to one line each. This is a slide, not a document.
 */
export function ListSlide({
  items,
  heading,
  ordered = false,
  reveal = true,
}: {
  items: React.ReactNode[];
  /** Optional header above the list. */
  heading?: React.ReactNode;
  /** Numbered instead of bulleted. */
  ordered?: boolean;
  /** Reveal item by item. Turn off to show the whole list at once. */
  reveal?: boolean;
}) {
  const List = ordered ? "ol" : "ul";
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-16">
      {heading ? (
        <h2 className={`deck-rise text-center ${headingBase} ${deckType.statementSm}`}>
          {heading}
        </h2>
      ) : null}
      <List className="flex list-none flex-col gap-7">
        {items.map((item, i) => (
          <li
            key={i}
            className={`flex items-baseline gap-6 text-6xl font-extrabold leading-[var(--deck-leading)] tracking-[var(--deck-tracking)] text-[var(--deck-ink)] ${
              reveal ? "fragment fade-up" : ""
            }`}
            data-fragment-index={reveal ? i : undefined}
          >
            <span
              aria-hidden
              className="deck-accent flex-none font-mono text-5xl font-bold"
            >
              {ordered ? `${i + 1}.` : "—"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </List>
    </div>
  );
}

/**
 * A table, for the rare beat that is genuinely a comparison.
 *
 * Reveal ships no table styling, so this is ours: heavy header rule, hairline
 * row rules, generous row height, and no vertical lines. Optionally reveals a
 * row at a time.
 *
 * Three columns and five rows is about the ceiling before it stops being
 * readable on video. More than that wants to be two slides.
 */
export function TableSlide({
  columns,
  rows,
  heading,
  reveal = false,
}: {
  columns: React.ReactNode[];
  rows: React.ReactNode[][];
  heading?: React.ReactNode;
  /** Reveal a row at a time. */
  reveal?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-16">
      {heading ? (
        <h2 className={`deck-rise text-center ${headingBase} ${deckType.statementSm}`}>
          {heading}
        </h2>
      ) : null}
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="border-b-4 border-[var(--deck-ink)] px-6 pb-5 font-mono text-3xl font-bold uppercase tracking-wide text-[var(--deck-ink)]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr
              key={r}
              className={reveal ? "fragment fade-up" : ""}
              data-fragment-index={reveal ? r : undefined}
            >
              {row.map((cell, c) => (
                <td
                  key={c}
                  className="border-b border-zinc-300 px-6 py-6 text-5xl font-extrabold leading-[var(--deck-leading)] tracking-[var(--deck-tracking)] text-[var(--deck-ink)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Type over a full-bleed background.
 *
 * The background itself is set on the slide, not here — see `DeckSlide` in
 * `deck-slide.ts`. This is what sits on top of it.
 *
 * A scrim is on by default because white type on an arbitrary photo fails
 * contrast at any size. Turn it off only over a background you have actually
 * checked, or one you have already dimmed with `background.opacity`.
 */
export function OverlaySlide({
  children,
  scrim = true,
  align = "center",
}: {
  children: React.ReactNode;
  /** Dark wash behind the type so it stays legible over a photo. */
  scrim?: boolean;
  align?: "center" | "bottom";
}) {
  return (
    <div
      className={`relative flex h-full w-full px-16 ${
        align === "bottom" ? "items-end pb-24" : "items-center"
      } justify-center`}
    >
      {scrim ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/45"
        />
      ) : null}
      <h1
        className={`deck-rise relative text-balance text-center font-extrabold leading-[var(--deck-leading)] tracking-[var(--deck-tracking)] text-white ${deckType.statement}`}
      >
        {children}
      </h1>
    </div>
  );
}
