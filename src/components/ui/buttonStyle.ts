/**
 * The single definition of a button on mikareyes.com.
 *
 * Before this existed, the primary CTA was copy-pasted as an inline style
 * object in ten places with nine different padding pairs for what is supposed
 * to be one button. Everything visual about a button now lives here, so a
 * change lands everywhere at once.
 *
 * See `DESIGN.md` > Components for the rules this encodes.
 *
 * Two ways to use it, because call sites render as `<a>`, `<Link>`, and
 * `<button>` and each needs its own element:
 *
 *   // 1. Style factory — drop-in replacement for an inline style object.
 *   <a className="mr-pressable" style={buttonStyle({ size: "lg" })}>…</a>
 *
 *   // 2. The `<Button>` component in ./Button.tsx, for plain buttons.
 *
 * Always pair a button with `className="mr-pressable"`. The lift and press are
 * part of the component, not decoration — a brand button that doesn't move on
 * hover is a bug.
 */

export type ButtonVariant = "primary" | "secondary";

/**
 * `xs` and `sm` are chrome (header, footer). `md` and `lg` are page-level
 * calls to action. Anything outside these four is drift.
 */
export type ButtonSize = "xs" | "sm" | "md" | "lg";

type SizeSpec = {
  padding: string;
  fontSize: string;
  gap: string;
};

const SIZES: Record<ButtonSize, SizeSpec> = {
  xs: { padding: "8px 18px", fontSize: "var(--mr-text-sm)", gap: "6px" },
  sm: { padding: "10px 20px", fontSize: "var(--mr-text-sm)", gap: "8px" },
  md: { padding: "14px 26px", fontSize: "var(--mr-text-body)", gap: "8px" },
  lg: { padding: "16px 30px", fontSize: "var(--mr-text-body)", gap: "8px" },
};

export function buttonStyle({
  variant = "primary",
  size = "lg",
  fullWidth = false,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
} = {}): React.CSSProperties {
  const spec = SIZES[size];

  const base: React.CSSProperties = {
    display: fullWidth ? "flex" : "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spec.gap,
    fontFamily: "var(--mr-font-body)",
    fontSize: spec.fontSize,
    // Bold rather than semibold: better legibility on a saturated ground.
    fontWeight: "var(--mr-weight-display)",
    padding: spec.padding,
    borderRadius: "var(--mr-radius-pill)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    width: fullWidth ? "100%" : undefined,
  };

  if (variant === "secondary") {
    return {
      ...base,
      background: "var(--mr-paper)",
      color: "var(--mr-ink)",
      border: "1.5px solid var(--mr-line)",
    };
  }

  // `--mr-red-deep`, not `--mr-red`. White on red is 3.08:1 and fails
  // WCAG AA at every button size on this site; the chrome buttons are 15px and
  // can never reach the large-text exemption. The deepened value measures
  // 5.75:1 and passes everywhere. Red remains the approved brand color for
  // every other fill. See DESIGN.md > Colors.
  return {
    ...base,
    background: "var(--mr-red-deep)",
    color: "#fff",
    boxShadow: "var(--mr-shadow-cta)",
  };
}
