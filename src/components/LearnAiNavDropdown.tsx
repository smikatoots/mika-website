"use client";

import { useId, useState } from "react";

import { learnAiNavItems } from "@/lib/site-nav";
import { InternalLink } from "@/components/ui/InternalLink";

const navLinkStyle = {
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-sm)",
  fontWeight: "var(--mr-weight-semi)",
  color: "var(--mr-text-soft)",
} as const;

export function LearnAiNavDropdown() {
  const menuId = useId();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className="mr-navlink flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors hover:text-[var(--mr-coral)]"
        style={navLinkStyle}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
      >
        Learn AI
        <span aria-hidden className="text-[10px] opacity-70">
          ▾
        </span>
      </button>

      <div
        id={menuId}
        className="absolute right-0 top-full z-[100] pt-2"
        role="menu"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 150ms ease, visibility 150ms ease",
        }}
      >
        <div
          className="min-w-[320px] overflow-hidden py-2"
          style={{
            background: "var(--mr-surface)",
            border: "1px solid var(--mr-border)",
            borderRadius: "var(--mr-radius-card)",
            boxShadow: "var(--mr-shadow-lift)",
          }}
        >
          {learnAiNavItems.map(({ href, label, description, featured }) => (
            <InternalLink
              key={href}
              href={href}
              role="menuitem"
              className="block px-4 py-3 transition-colors hover:bg-[var(--mr-surface-cream)]"
              style={{ textDecoration: "none" }}
            >
              <span
                className="flex items-center gap-2"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-sm)",
                  fontWeight: "var(--mr-weight-display)",
                  color: "var(--mr-ink)",
                }}
              >
                {label}
                {featured ? (
                  <span
                    className="rounded-full"
                    style={{
                      background:
                        "color-mix(in srgb, var(--mr-teal) 14%, white)",
                      color: "var(--mr-teal)",
                      fontSize: "10px",
                      fontWeight: "var(--mr-weight-display)",
                      letterSpacing: "0.06em",
                      padding: "3px 7px",
                      textTransform: "uppercase",
                    }}
                  >
                    Featured
                  </span>
                ) : null}
              </span>
              <span
                className="mt-1 block"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-xs)",
                  color: "var(--mr-muted)",
                  lineHeight: 1.45,
                }}
              >
                {description}
              </span>
            </InternalLink>
          ))}
        </div>
      </div>
    </div>
  );
}
