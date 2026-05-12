import { Fragment } from "react";

import { siteNavItems } from "@/lib/site-nav";
import { SITE_NAME } from "@/lib/site";
import { InternalLink } from "@/components/ui/InternalLink";

const SITE_TOP_BANNER_HREF =
  "https://maven.com/mika-reyes/master-claude-code-as-a-non-technical-pro?promoCode=MAY7";

const headerLogoClass =
  "font-semibold tracking-tight text-white transition hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm";

const headerNavClass =
  "shrink-0 whitespace-nowrap text-sm font-medium text-white transition hover:text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm";

export function SiteHeader() {
  return (
    <Fragment>
      <a
        href={SITE_TOP_BANNER_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-black px-4 py-3.5 text-center text-sm leading-snug text-white transition hover:bg-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6 sm:py-4 sm:text-base sm:leading-normal"
      >
        Join our live, hands-on workshop on May 22, 2026. Get 40% off before May 20! 👉
      </a>
      <header className="border-b border-white/20 bg-accent">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6 md:px-8">
          <InternalLink href="/" className={headerLogoClass}>
            {SITE_NAME}
          </InternalLink>
          <nav className="flex max-w-[min(100%,42rem)] flex-1 justify-end gap-4 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 lg:max-w-none lg:gap-6 [&::-webkit-scrollbar]:hidden">
            {siteNavItems.map(({ href, label }) => (
              <InternalLink key={href} href={href} className={headerNavClass}>
                {label}
              </InternalLink>
            ))}
          </nav>
        </div>
      </header>
    </Fragment>
  );
}
