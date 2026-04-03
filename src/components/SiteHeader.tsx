import Link from "next/link";

import { SITE_NAME } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export function SiteHeader({ variant = "dark" }: { variant?: "light" | "dark" }) {
  if (variant === "light") {
    return (
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6 md:px-10">
          <Link
            href="/"
            className="font-semibold tracking-tight text-zinc-900"
          >
            {SITE_NAME}
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors hover:text-zinc-900"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6 md:px-10">
        <Link
          href="/"
          className="font-semibold tracking-tight text-zinc-50"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-teal-400"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
