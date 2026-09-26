/* ────────────────────────────────────────────────────────────
   Cut-paper shapes: the prototype's atmosphere layer.

   These are decoration and nothing else — every instance is
   aria-hidden and pointer-events:none, so none of them can ever
   carry meaning or intercept a click. Geometry is drawn as plain
   inline SVG on a 100x100 viewBox and colored through
   `currentColor`, so one `--c` sets a whole shape.

   Two rules hold this together:

   1. Nothing is static. Every placement names a motion, and the
      stylesheet honours prefers-reduced-motion for all of them.
   2. Nothing lands on running text. A placement carries a wide
      position and, where the wide one would collide once the
      layout compresses, a narrow one that takes over below
      1200px. Narrow placements go where a phone actually has
      room: hugging the page edge inside the 24px wrap padding,
      or inside a section's vertical padding band, which is empty
      across the full width.
   ──────────────────────────────────────────────────────────── */

export type ConfettiShape =
  | "zigzag"
  | "sparkle"
  | "arc"
  | "squiggle"
  | "cross"
  | "ring"
  | "blob"
  | "capsule"
  | "burst"
  | "dots"
  | "triangle"
  | "disc";

export type ConfettiMotion =
  | "bob"
  | "sway"
  | "spin"
  | "twist"
  | "shake"
  | "drift"
  | "pulse";

/** Any subset of the four edge offsets, as CSS lengths or percentages. */
export type ConfettiPos = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export type ConfettiPlacement = {
  shape: ConfettiShape;
  color: string;
  /** Diameter at wide widths. Narrow widths scale it to 62%. */
  size: number;
  /** Static tilt in degrees. Every animation composes on top of it. */
  rotate?: number;
  motion: ConfettiMotion;
  /** Seconds. Staggered per placement so the field never pulses in unison. */
  duration?: number;
  delay?: number;
  at: ConfettiPos;
  /** Placement below 1200px. Falls back to `at` when the wide one is safe. */
  narrow?: ConfettiPos;
};

/* Wide placements anchor to `--mr-edge`, the content column's own edge, rather
   than to a percentage of the section. Past the column's max width the gutter
   keeps growing, and a shape pinned to a percentage drifts further from the
   content it decorates with every extra pixel.

   A page whose column is narrower than the default can override `--mr-edge`
   on its own wrapper, and every shape inside follows. */

/** Sits `px` inside the column edge — for sections whose text is capped
    narrower than the column itself. */
export const insideEdge = (px: number) => `calc(var(--mr-edge) + ${px}px)`;

/** Sits `px` outside the column edge.

    The `max()` is a floor, not a preference: where the gutter is only as wide
    as the page padding, the plain calc pushes a shape clean off the page. It
    clamps at 18px still showing, so "nothing disappears" holds at every width
    rather than only below the breakpoint. */
export const outsideEdge = (px: number) =>
  `max(calc(18px - var(--w)), calc(var(--mr-edge) - var(--w) - ${px}px))`;

const paths: Record<ConfettiShape, React.ReactNode> = {
  zigzag: (
    <polyline
      points="4,66 24,26 44,66 64,26 84,66"
      fill="none"
      stroke="currentColor"
      strokeWidth="13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sparkle: (
    <path
      d="M50 2c5 28 15 38 43 48-28 10-38 20-43 48-5-28-15-38-43-48 28-10 38-20 43-48Z"
      fill="currentColor"
    />
  ),
  arc: (
    <path
      d="M8 84a42 42 0 0 1 84 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="17"
      strokeLinecap="round"
    />
  ),
  squiggle: (
    <path
      d="M3 60c12-32 26-32 38 0s26 32 38 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
    />
  ),
  cross: <path d="M41 6h18v35h35v18H59v35H41V59H6V41h35V6Z" fill="currentColor" />,
  ring: (
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="14" />
  ),
  blob: (
    <path
      d="M77 16c14 11 18 33 11 50s-26 27-44 24S9 71 8 53s14-34 30-40 27-8 39 3Z"
      fill="currentColor"
    />
  ),
  capsule: <rect x="4" y="32" width="92" height="36" rx="18" fill="currentColor" />,
  burst: (
    <g stroke="currentColor" strokeWidth="12" strokeLinecap="round">
      <line x1="50" y1="6" x2="50" y2="94" />
      <line x1="6" y1="50" x2="94" y2="50" />
      <line x1="19" y1="19" x2="81" y2="81" />
      <line x1="81" y1="19" x2="19" y2="81" />
    </g>
  ),
  dots: (
    <g fill="currentColor">
      <circle cx="18" cy="50" r="15" />
      <circle cx="50" cy="50" r="15" />
      <circle cx="82" cy="50" r="15" />
    </g>
  ),
  triangle: <path d="M50 8 94 88H6L50 8Z" fill="currentColor" />,
  disc: <circle cx="50" cy="50" r="46" fill="currentColor" />,
};

/* Offsets travel as custom properties rather than real CSS properties, so a
   media query can swap the whole placement without the component knowing
   which breakpoint won.

   Every edge is emitted, `auto` included. That matters for the narrow tier:
   it falls back to the wide value per edge, so a narrow placement anchored to
   different edges than its wide one would otherwise inherit the wide offsets
   on the axes it did not name, end up with all four edges set, and land
   somewhere neither placement asked for. Writing `auto` cancels the fallback.

   When no narrow placement is given at all, nothing is emitted and the wide
   one applies at every width, which is the intended fallback. */
function posVars(pos: ConfettiPos | undefined, narrow: boolean) {
  if (!pos) return {};
  const key = narrow
    ? { top: "--nt", right: "--nr", bottom: "--nb", left: "--nl" }
    : { top: "--t", right: "--rr", bottom: "--b", left: "--l" };
  return Object.fromEntries(
    (["top", "right", "bottom", "left"] as const).map((edge) => [
      key[edge],
      pos[edge] ?? "auto",
    ]),
  );
}

export function Confetti({
  shape,
  color,
  size,
  rotate = 0,
  motion,
  duration,
  delay,
  at,
  narrow,
}: ConfettiPlacement) {
  return (
    <span
      aria-hidden="true"
      className={`mr-confetti mr-${motion}`}
      style={{
        ["--c" as string]: color,
        ["--rot" as string]: `${rotate}deg`,
        ["--w" as string]: `${size}px`,
        ...(duration ? { ["--dur" as string]: `${duration}s` } : {}),
        ...(delay ? { ["--delay" as string]: `${delay}s` } : {}),
        ...posVars(at, false),
        ...posVars(narrow, true),
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {paths[shape]}
      </svg>
    </span>
  );
}

/** Renders one section's worth of placements. */
export function ConfettiField({ items }: { items: ConfettiPlacement[] }) {
  return (
    <>
      {items.map((p, i) => (
        <Confetti key={`${p.shape}-${i}`} {...p} />
      ))}
    </>
  );
}
