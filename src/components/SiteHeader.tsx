"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { learnAiNavItems, siteHeaderNavItems } from "@/lib/site-nav";
import { InternalLink } from "@/components/ui/InternalLink";

/* The Learn AI dropdown. A paper panel with a hairline edge and the system's
   5px radius — the one place a shadow is allowed, because it genuinely floats
   above the page. Opens on hover and on focus so it is reachable by keyboard,
   and Escape closes it. */
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
        className="mr-navlink"
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
        <div className="mr-menupanel">
          {learnAiNavItems.map(({ href, label, description, featured }) => (
            <InternalLink
              key={href}
              href={href}
              role="menuitem"
              className="mr-menuitem"
              style={featured ? { background: "var(--mr-sun-yellow)" } : undefined}
            >
              <span className="mr-body">{label}</span>
              <span className="mr-caption mr-menuitem-desc">{description}</span>
            </InternalLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
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
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setLearnAiOpen(false);
  };

  return (
    <nav className="mr-nav">
      <div className="mr-nav-inner">
        <InternalLink href="/" aria-label="Mika Reyes, home" className="mr-badge">
          <Image
            src="/mika-reyes-logo.png"
            alt="Mika Reyes"
            width={36}
            height={36}
            priority
          />
        </InternalLink>

        {/* Everything but the mark sits hard right. */}
        <div className="mr-navright">
          <div className="mr-navlinks">
            {siteHeaderNavItems.map((item) =>
              item.type === "learn-ai-dropdown" ? (
                <LearnAiMenu key="learn-ai" />
              ) : (
                <InternalLink key={item.href} href={item.href} className="mr-navlink">
                  {item.label}
                </InternalLink>
              ),
            )}
          </div>

          <div className="mr-navactions">
            <a
              href="https://instagram.com/its.mikareyes"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-ghost"
            >
              Instagram
            </a>
            <InternalLink href="/#contact" className="mr-cta" style={{ padding: "10px 22px" }}>
              Work with me
            </InternalLink>
          </div>

          <button
            type="button"
            className="mr-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span className="mr-hamburger-bars" data-open={menuOpen || undefined}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          style={{
            borderTop: "1px solid var(--mr-border-ink)",
            background: "var(--mr-paper)",
            padding: "8px 24px 20px",
          }}
        >
          <div className="mr-mobilenav" style={{ maxWidth: "var(--mr-max)", margin: "0 auto" }}>
            {siteHeaderNavItems.map((item) =>
              item.type === "learn-ai-dropdown" ? (
                <div key="learn-ai">
                  <button
                    type="button"
                    className="mr-mobilerow"
                    aria-expanded={learnAiOpen}
                    onClick={() => setLearnAiOpen((v) => !v)}
                  >
                    Learn AI
                    <span aria-hidden="true" className="mr-mobilechevron">
                      ▼
                    </span>
                  </button>

                  {learnAiOpen
                    ? learnAiNavItems.map(({ href, label, description, featured }) => (
                        <InternalLink
                          key={href}
                          href={href}
                          className="mr-mobilesub"
                          onClick={closeMenu}
                        >
                          <span className="mr-body">
                            {label}
                            {featured ? <span className="mr-featured">Featured</span> : null}
                          </span>
                          <span className="mr-caption mr-mobilesub-desc">{description}</span>
                        </InternalLink>
                      ))
                    : null}
                </div>
              ) : (
                <InternalLink
                  key={item.href}
                  href={item.href}
                  className="mr-mobilerow"
                  onClick={closeMenu}
                >
                  {item.label}
                </InternalLink>
              ),
            )}
          </div>

          {/* The bar drops these when it compresses, so the panel is the only
              place left to reach them. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "20px",
              maxWidth: "var(--mr-max)",
            }}
          >
            <InternalLink href="/#contact" className="mr-cta" onClick={closeMenu}>
              Work with me
            </InternalLink>
            <a
              href="https://instagram.com/its.mikareyes"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-ghost"
              style={{ padding: "16px 24px" }}
              onClick={closeMenu}
            >
              Instagram
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
