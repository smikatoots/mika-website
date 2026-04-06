import Link from "next/link";

import { siteNavItems } from "@/lib/site-nav";
import { SITE_NAME } from "@/lib/site";
import { siteNavLink } from "@/lib/ui/site-styles";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6 md:px-8">
        <Link
          href="/"
          className="font-semibold tracking-tight text-zinc-950"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex max-w-[min(100%,42rem)] flex-1 justify-end gap-4 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 lg:max-w-none lg:gap-6 [&::-webkit-scrollbar]:hidden">
          {siteNavItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`shrink-0 whitespace-nowrap ${siteNavLink}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
