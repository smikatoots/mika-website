import Image from "next/image";
import Link from "next/link";

import { textMuted } from "@/lib/ui/site-styles";

/**
 * Compact author byline for article templates — headshot, name (linking to
 * /about), and a one-line credential bio. Sits under the H1 meta row.
 */
export function AuthorByline() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <Image
        src="/mika-reyes.jpg"
        alt="Mika Reyes"
        width={44}
        height={44}
        className="h-11 w-11 flex-none rounded-full object-cover"
        style={{ boxShadow: "var(--mr-shadow-card)" }}
      />
      <div className="min-w-0">
        <Link
          href="/about"
          className="font-[family-name:var(--mr-font-display)] text-[length:var(--mr-text-sm)] font-semibold text-[var(--mr-ink)] transition-colors hover:text-[var(--mr-coral)]"
        >
          Mika Reyes
        </Link>
        <p className={`mt-0.5 ${textMuted}`}>
          Co-founder at King&rsquo;s Cross Labs · ex-LinkedIn PM &amp; Forbes 30
          Under 30
        </p>
      </div>
    </div>
  );
}
