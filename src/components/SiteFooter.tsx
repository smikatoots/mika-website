import Image from "next/image";
import { SITE_NAME } from "@/lib/site";
import { siteNavItems } from "@/lib/site-nav";
import { InternalLink } from "@/components/ui/InternalLink";

import { buttonStyle } from "@/components/ui/buttonStyle";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/its.mikareyes/" },
  { label: "TikTok", href: "https://www.tiktok.com/@its.mikareyes" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/itsmikareyes" },
  { label: "X / Twitter", href: "https://twitter.com/__mikareyes" },
];

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--mr-surface-warm)", borderTop: "1px solid var(--mr-border-warm)" }}>
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
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
                }}
              >
                {SITE_NAME}
              </span>
            </div>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-xs)",
                color: "var(--mr-muted)",
                lineHeight: 1.6,
              }}
            >
              Teaching founders and ambitious people<br />to become time-rich with AI.
            </p>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-xs)",
                color: "var(--mr-faint)",
              }}
            >
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE_NAME}
            </p>
          </div>

          <div>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-eyebrow)",
                fontWeight: "var(--mr-weight-display)",
                color: "var(--mr-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              Explore
            </p>
            <ul className="space-y-2">
              {siteNavItems.map(({ href, label }) => (
                <li key={href}>
                  <InternalLink
                    href={href}
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      fontWeight: "var(--mr-weight-semi)",
                      color: "var(--mr-text-soft)",
                      textDecoration: "none",
                    }}
                    className="transition-colors hover:text-[var(--mr-coral)]"
                  >
                    {label}
                  </InternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-eyebrow)",
                fontWeight: "var(--mr-weight-display)",
                color: "var(--mr-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              Follow
            </p>
            <ul className="space-y-2">
              {socialLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      fontWeight: "var(--mr-weight-semi)",
                      color: "var(--mr-text-soft)",
                      textDecoration: "none",
                    }}
                    className="transition-colors hover:text-[var(--mr-coral)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <InternalLink
                href="/#contact"
                className="mr-pressable inline-flex items-center gap-2"
                style={buttonStyle({ size: "sm" })}
              >
                Work with me →
              </InternalLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
