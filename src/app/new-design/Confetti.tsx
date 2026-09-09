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
   which breakpoint won. */
function posVars(pos: ConfettiPos | undefined, narrow: boolean) {
  if (!pos) return {};
  const key = narrow
    ? { top: "--nt", right: "--nr", bottom: "--nb", left: "--nl" }
    : { top: "--t", right: "--rr", bottom: "--b", left: "--l" };
  return Object.fromEntries(
    (["top", "right", "bottom", "left"] as const)
      .filter((edge) => pos[edge] !== undefined)
      .map((edge) => [key[edge], pos[edge]]),
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
      className={`nd-confetti nd-${motion}`}
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
