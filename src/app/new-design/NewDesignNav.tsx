"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/ai", label: "AI Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
  { href: "/projects", label: "Projects" },
  { href: "/links", label: "Links" },
];

export function NewDesignNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nd-nav">
      <div className="nd-nav-inner">
        <div className="nd-navmark">
          <span className="nd-badge" aria-hidden="true">
            M
          </span>
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
          {links.map(({ href, label }) => (
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
          <div
            style={{
              maxWidth: "var(--nd-max)",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
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
        </div>
      ) : null}
    </nav>
  );
}
