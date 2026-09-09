"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { learnAiNavItems, siteHeaderNavItems } from "@/lib/site-nav";

/* The Learn AI dropdown, in the prototype's idiom: a paper-white panel with a
   hairline black edge and the system's 5px radius, rather than the rounded
   card the live header uses. Opens on hover and on focus, so it is reachable
   by keyboard, and Escape closes it. */
function LearnAiMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        className="nd-navlink"
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          font: "inherit",
          background: "none",
          border: 0,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        Learn AI
        <span aria-hidden="true" style={{ fontSize: "9px", opacity: 0.7 }}>
          ▼
        </span>
      </button>

      <div
        role="menu"
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          paddingTop: "10px",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 150ms ease, visibility 150ms ease",
          zIndex: 60,
        }}
      >
        <div className="nd-menupanel">
          {learnAiNavItems.map(({ href, label, description, featured }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              className="nd-menuitem"
              style={featured ? { background: "var(--nd-sun-yellow)" } : undefined}
            >
              <span className="nd-body">{label}</span>
              <span className="nd-caption nd-menuitem-desc">{description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NewDesignNav() {
  const [open, setOpen] = useState(false);
  const [learnAiOpen, setLearnAiOpen] = useState(false);

  const closeAll = () => {
    setOpen(false);
    setLearnAiOpen(false);
  };

  return (
    <nav className="nd-nav">
      <div className="nd-nav-inner">
        <Link href="/" aria-label="Mika Reyes, home" className="nd-badge">
          <Image
            src="/mika-reyes-logo.png"
            alt="Mika Reyes"
            width={36}
            height={36}
            priority
          />
        </Link>

        {/* Everything but the mark sits hard right. */}
        <div className="nd-navright">
          <div className="nd-navlinks">
            {siteHeaderNavItems.map((item) =>
              item.type === "learn-ai-dropdown" ? (
                <LearnAiMenu key="learn-ai" />
              ) : (
                <Link key={item.href} href={item.href} className="nd-navlink">
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="nd-navactions">
            <a
              href="https://instagram.com/its.mikareyes"
              target="_blank"
              rel="noopener noreferrer"
              className="nd-ghost"
            >
              Instagram
            </a>
            <a href="#contact" className="nd-cta" style={{ padding: "10px 22px" }}>
              Work with me
            </a>
          </div>

          <button
            type="button"
            className="nd-hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => (open ? closeAll() : setOpen(true))}
          >
            <span className="nd-hamburger-bars" data-open={open || undefined}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          style={{
            borderTop: "1px solid var(--nd-ink)",
            background: "var(--nd-paper)",
            padding: "8px 24px 20px",
          }}
        >
          <div className="nd-mobilenav" style={{ maxWidth: "var(--nd-max)", margin: "0 auto" }}>
            {siteHeaderNavItems.map((item) =>
              item.type === "learn-ai-dropdown" ? (
                <div key="learn-ai">
                  <button
                    type="button"
                    className="nd-mobilerow"
                    aria-expanded={learnAiOpen}
                    onClick={() => setLearnAiOpen((v) => !v)}
                  >
                    Learn AI
                    <span aria-hidden="true" className="nd-mobilechevron">
                      ▼
                    </span>
                  </button>

                  {learnAiOpen
                    ? learnAiNavItems.map(({ href, label, description, featured }) => (
                        <Link
                          key={href}
                          href={href}
                          className="nd-mobilesub"
                          onClick={closeAll}
                        >
                          <span className="nd-body">
                            {label}
                            {featured ? <span className="nd-featured">Featured</span> : null}
                          </span>
                          <span className="nd-caption nd-mobilesub-desc">{description}</span>
                        </Link>
                      ))
                    : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nd-mobilerow"
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          {/* The bar drops these when it compresses, so the panel is the
              only place left to reach them. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "20px",
              maxWidth: "var(--nd-max)",
            }}
          >
            <a href="#contact" className="nd-cta" onClick={closeAll}>
              Work with me
            </a>
            <a
              href="https://instagram.com/its.mikareyes"
              target="_blank"
              rel="noopener noreferrer"
              className="nd-ghost"
              style={{ padding: "16px 24px" }}
              onClick={closeAll}
            >
              Instagram
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
