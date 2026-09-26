import type { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <span
          className="mb-5 inline-flex items-center gap-2"
          style={{
            // A tag pill in the system's idiom: colour is the ground, type is
            // ink. Coral on the old rose fill was 3.24:1 and failed AA.
            background: "var(--mr-gold)",
            color: "var(--mr-ink)",
            padding: "7px 16px",
            borderRadius: "var(--mr-radius-pill)",
            fontFamily: "var(--mr-font-body)",
            fontSize: "var(--mr-text-xs)",
            fontWeight: "var(--mr-weight-display)",
            display: "inline-flex",
          }}
        >
          {eyebrow}
        </span>
      ) : null}
      <h1
        style={{
          fontFamily: "var(--mr-font-display)",
          fontSize: "clamp(36px, 5vw, var(--mr-text-h1))",
          fontWeight: "var(--mr-weight-display)",
          letterSpacing: "-0.025em",
          lineHeight: 1.02,
          color: "var(--mr-ink)",
          marginTop: eyebrow ? "8px" : "0",
        }}
      >
        {title}
      </h1>
      {subtitle ? (
        <div
          className="mt-4"
          style={{
            fontFamily: "var(--mr-font-body)",
            fontSize: "var(--mr-text-body)",
            lineHeight: 1.6,
            color: "var(--mr-muted)",
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </header>
  );
}
