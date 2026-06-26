"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";

import { LearnAiNavDropdown } from "@/components/LearnAiNavDropdown";
import { learnAiNavItems, siteHeaderNavItems } from "@/lib/site-nav";
import { InternalLink } from "@/components/ui/InternalLink";

const navLinkStyle = {
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-sm)",
  fontWeight: "var(--mr-weight-semi)",
  color: "var(--mr-text-soft)",
} as const;

const mobileNavLinkClass =
  "block rounded-xl px-4 py-3 transition-colors hover:bg-[var(--mr-surface-cream)] hover:text-[var(--mr-coral)]";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className="absolute left-0 block h-0.5 w-5 rounded-full bg-[var(--mr-ink)] transition-all duration-200"
        style={{
          top: open ? "7px" : "0",
          transform: open ? "rotate(45deg)" : "none",
        }}
      />
      <span
        className="absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-[var(--mr-ink)] transition-all duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="absolute left-0 block h-0.5 w-5 rounded-full bg-[var(--mr-ink)] transition-all duration-200"
        style={{
          top: open ? "7px" : "14px",
          transform: open ? "rotate(-45deg)" : "none",
        }}
      />
    </span>
  );
}

export function SiteHeader() {
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [learnAiOpen, setLearnAiOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setLearnAiOpen(false);
  };

  return (
    <header
      className="relative z-50"
      style={{ background: "var(--mr-surface)", borderBottom: "1px solid var(--mr-border)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 md:px-10">
        <InternalLink
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          style={{ textDecoration: "none" }}
          onClick={closeMenu}
        >
          <Image
            src="/mika-reyes-logo.png"
            alt="Mika Reyes"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "var(--mr-text-sm)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-ink)",
              letterSpacing: "-0.01em",
            }}
          >
            Mika Reyes
          </span>
        </InternalLink>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-1 overflow-visible py-1 md:flex"
          aria-label="Primary navigation"
        >
          {siteHeaderNavItems.map((item) => {
            if (item.type === "learn-ai-dropdown") {
              return <LearnAiNavDropdown key="learn-ai" />;
            }

            return (
              <InternalLink
                key={item.href}
                href={item.href}
                className="mr-navlink shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors hover:text-[var(--mr-coral)]"
                style={navLinkStyle}
              >
                {item.label}
              </InternalLink>
            );
          })}

          <a
            href="/#contact"
            className="mr-pressable ml-3 shrink-0 whitespace-nowrap"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--mr-coral)",
              color: "#fff",
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-sm)",
              fontWeight: "var(--mr-weight-semi)",
              padding: "8px 18px",
              borderRadius: "var(--mr-radius-pill)",
              boxShadow: "var(--mr-shadow-cta)",
              textDecoration: "none",
            }}
          >
            Work with me
          </a>
        </nav>

        <button
          type="button"
          className="mr-pressable flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--mr-border-input)] bg-[var(--mr-surface)] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile navigation"
        className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[var(--mr-border)] bg-[var(--mr-surface)] px-6 py-4 shadow-[var(--mr-shadow-lift)] transition-[opacity,visibility] duration-200 md:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1">
          {siteHeaderNavItems.map((item) => {
            if (item.type === "learn-ai-dropdown") {
              return (
                <div key="learn-ai">
                  <button
                    type="button"
                    className={`${mobileNavLinkClass} flex w-full items-center justify-between`}
                    style={navLinkStyle}
                    aria-expanded={learnAiOpen}
                    onClick={() => setLearnAiOpen((open) => !open)}
                  >
                    Learn AI
                    <span
                      aria-hidden
                      className="text-[10px] opacity-70 transition-transform duration-200"
                      style={{ transform: learnAiOpen ? "rotate(180deg)" : "none" }}
                    >
                      ▾
                    </span>
                  </button>
                  {learnAiOpen ? (
                    <div className="flex flex-col">
                      {learnAiNavItems.map(({ href, label }) => (
                        <InternalLink
                          key={href}
                          href={href}
                          className={`${mobileNavLinkClass} pl-8`}
                          style={{ ...navLinkStyle, textDecoration: "none" }}
                          onClick={closeMenu}
                        >
                          {label}
                        </InternalLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <InternalLink
                key={item.href}
                href={item.href}
                className={mobileNavLinkClass}
                style={navLinkStyle}
                onClick={closeMenu}
              >
                {item.label}
              </InternalLink>
            );
          })}

          <a
            href="/#contact"
            className="mr-pressable mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-center"
            style={{
              background: "var(--mr-coral)",
              color: "#fff",
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-sm)",
              fontWeight: "var(--mr-weight-semi)",
              boxShadow: "var(--mr-shadow-cta)",
              textDecoration: "none",
            }}
            onClick={closeMenu}
          >
            Work with me
          </a>
        </div>
      </nav>
    </header>
  );
}
