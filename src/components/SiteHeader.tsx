import { siteNavItems } from "@/lib/site-nav";
import { SITE_NAME } from "@/lib/site";
import { InternalLink } from "@/components/ui/InternalLink";

const headerLogoClass =
  "font-semibold tracking-tight text-white transition hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm";

const headerNavClass =
  "shrink-0 whitespace-nowrap text-sm font-medium text-white transition hover:text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm";

export function SiteHeader() {
  return (
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
  );
}
