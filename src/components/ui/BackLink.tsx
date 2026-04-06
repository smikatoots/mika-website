import Link from "next/link";

import { siteLinkSubtle } from "@/lib/ui/site-styles";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={siteLinkSubtle}>
      ← {label}
    </Link>
  );
}
