"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  /**
   * Ordered image slices, shown left-to-right as columns. Accepts a
   * comma-separated string (this MDX pipeline passes string attributes, not
   * JSX array expressions) or an array.
   */
  srcs?: string | string[];
  /** Base alt text; each slice gets "(part N)" appended. */
  alt?: string;
  /** Optional caption shown under the row. */
  caption?: string;
};

// Renders a set of image slices (e.g. a long study sheet cut into pieces) as a
// responsive multi-column row. Each slice fills its column at full height (no
// max-height cap) and opens full-size in a scrollable lightbox on click.
export function ImageColumns({ srcs, alt, caption }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const list = (
    Array.isArray(srcs) ? srcs : typeof srcs === "string" ? srcs.split(",") : []
  )
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.length === 0) return null;
  const cols = Math.min(list.length, 3);

  return (
    <>
      <figure className="my-6">
        <div
          className="grid items-start gap-1.5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {list.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={alt ? `${alt} (part ${i + 1} of ${list.length})` : ""}
              loading="lazy"
              decoding="async"
              onClick={() => setOpen(src)}
              className="block h-auto w-full cursor-zoom-in rounded-[8px] border border-zinc-200"
            />
          ))}
        </div>
        {caption ? (
          <figcaption className="mt-2 text-center text-sm leading-relaxed text-zinc-500">
            {caption} <span className="text-zinc-400">(tap any part to enlarge)</span>
          </figcaption>
        ) : null}
      </figure>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/80 p-4"
              onClick={() => setOpen(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Expanded image preview"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={open}
                alt={alt ?? ""}
                className="h-auto w-auto max-w-[94vw] rounded-[10px]"
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
