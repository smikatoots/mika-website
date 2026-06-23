import Image from "next/image";
import { LearnAiNavDropdown } from "@/components/LearnAiNavDropdown";
import { siteHeaderNavItems } from "@/lib/site-nav";
import { InternalLink } from "@/components/ui/InternalLink";

const navLinkStyle = {
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-sm)",
  fontWeight: "var(--mr-weight-semi)",
  color: "var(--mr-text-soft)",
} as const;

export function SiteHeader() {
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
          className="flex min-w-0 flex-1 items-center justify-end gap-1 overflow-visible py-1"
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
      </div>
    </header>
  );
}
