import Image from "next/image";

import type { PressManifestEntry } from "@/lib/press/types";

import { GalleryCard } from "@/components/ui/GalleryCard";

export function PressCard({ item }: { item: PressManifestEntry }) {
  const href = `/press/${item.slug}`;

  const media = item.cover ? (
    <Image
      src={item.cover}
      alt={item.title}
      fill
      className="object-cover transition duration-300 group-hover:scale-[1.02]"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      unoptimized
    />
  ) : (
    <div className="flex h-full items-center justify-center text-4xl text-zinc-300">
      📰
    </div>
  );

  return (
    <GalleryCard href={href} media={media}>
      <h2 className="line-clamp-3 text-base font-semibold leading-snug text-zinc-950 group-hover:text-teal-700">
        📄 {item.title}
      </h2>
    </GalleryCard>
  );
}
