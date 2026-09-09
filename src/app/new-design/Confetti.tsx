/* ────────────────────────────────────────────────────────────
   Cut-paper shapes: the prototype's atmosphere layer.

   These are decoration and nothing else — every instance is
   aria-hidden and pointer-events:none, so none of them can ever
   carry meaning or intercept a click. Geometry is drawn as plain
   inline SVG on a 100x100 viewBox and colored through
   `currentColor`, so one `--c` sets a whole shape.

   Placement is the caller's job. The rule that matters: they live
   in the gutters. A shape that can land on running text is a bug,
   not a variation — see the `.nd-confetti` note in the stylesheet.
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
  cross: (
    <path
      d="M41 6h18v35h35v18H59v35H41V59H6V41h35V6Z"
      fill="currentColor"
    />
  ),
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

type Props = {
  shape: ConfettiShape;
  /** Any CSS color, usually one of the palette tokens. */
  color: string;
  size: number;
  /** Static tilt, in degrees. Animations compose on top of it. */
  rotate?: number;
  motion?: "bob" | "sway" | "spin";
  /** Drawn at every width, not just where there is gutter to spare. */
  always?: boolean;
  style?: React.CSSProperties;
};

export function Confetti({
  shape,
  color,
  size,
  rotate = 0,
  motion,
  always = false,
  style,
}: Props) {
  return (
    <span
      aria-hidden="true"
      className={[
        "nd-confetti",
        always ? "nd-confetti--always" : "",
        motion ? `nd-${motion}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ["--c" as string]: color,
        ["--r" as string]: `${rotate}deg`,
        width: size,
        height: size,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {paths[shape]}
      </svg>
    </span>
  );
}
