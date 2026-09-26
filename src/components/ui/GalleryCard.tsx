import type { ReactNode } from "react";

import { InternalLink } from "@/components/ui/InternalLink";

/** Shared shell for Projects / Press tiles (16:10 image, lift card). */
export function GalleryCard({
  href,
  media,
  children,
}: {
  href: string;
  media: ReactNode;
  children: ReactNode;
}) {
  return (
    <InternalLink
      href={href}
      className="group mr-lift flex flex-col overflow-hidden"
      style={{
        background: "var(--mr-paper)",
        border: "1px solid var(--mr-line)",
        borderRadius: "var(--mr-radius-card)",
        boxShadow: "var(--mr-shadow-card)",
        textDecoration: "none",
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ background: "var(--mr-linen)" }}>
        {media}
      </div>
      <div
        className="flex flex-1 flex-col gap-2 p-4"
        style={{ borderTop: "1px solid var(--mr-line)" }}
      >
        {children}
      </div>
    </InternalLink>
  );
}
