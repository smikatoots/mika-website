"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { learnAiNavItems } from "@/lib/site-nav";

const links = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
  { href: "/projects", label: "Projects" },
  { href: "/links", label: "Links" },
];

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
        <div
          style={{
            width: "320px",
            background: "var(--nd-paper)",
            border: "1px solid var(--nd-ink)",
            borderRadius: "var(--nd-radius)",
            padding: "8px",
            boxShadow: "var(--nd-shadow-nav)",
          }}
        >
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

  return (
    <nav className="nd-nav">
      <div className="nd-nav-inner">
        <div className="nd-navmark">
          <Link href="/" aria-label="Mika Reyes, home" className="nd-badge">
            <Image
              src="/mika-reyes-logo.png"
              alt="Mika Reyes"
              width={36}
              height={36}
              priority
            />
          </Link>
          <button
            type="button"
            className="nd-menu-btn"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <div className="nd-navlinks">
          <Link href="/about" className="nd-navlink">
            About
          </Link>
          <LearnAiMenu />
          {links
            .filter((l) => l.href !== "/about")
            .map(({ href, label }) => (
              <Link key={href} href={href} className="nd-navlink">
                {label}
              </Link>
            ))}
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
      </div>

      {open ? (
        <div
          style={{
            borderTop: "1px solid var(--nd-ink)",
            background: "var(--nd-paper)",
            padding: "20px 24px",
          }}
        >
          <div style={{ maxWidth: "var(--nd-max)", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="nd-ghost"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* The dropdown's contents have to be reachable here too — the
                collapsed nav is the only way to them on a phone. */}
            <p className="nd-caption" style={{ margin: "20px 0 10px", letterSpacing: "0.04em" }}>
              Learn AI
            </p>
            <div style={{ display: "grid", gap: "8px" }}>
              {learnAiNavItems.map(({ href, label, description, featured }) => (
                <Link
                  key={href}
                  href={href}
                  className="nd-menuitem"
                  onClick={() => setOpen(false)}
                  style={featured ? { background: "var(--nd-sun-yellow)" } : undefined}
                >
                  <span className="nd-body">{label}</span>
                  <span className="nd-caption nd-menuitem-desc">{description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
