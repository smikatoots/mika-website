import type { ReactNode } from "react";

import { InternalLink } from "@/components/ui/InternalLink";

/** Shared shell for Projects / Press tiles (16:10 image, light card). */
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
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-teal-200/90 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
        {media}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-zinc-100 p-4">
        {children}
      </div>
    </InternalLink>
  );
}
