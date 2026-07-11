"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  src?: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
};

export function MdxImage({ src, alt, title, width, height }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const safeSrc = src ?? "";
  const safeAlt = alt ?? "";
  const isInlineLogo = title === "inline-logo";
  const hasDimensions = typeof width === "number" && typeof height === "number";

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (!safeSrc) return null;

  if (isInlineLogo) {
    return (
      <span className="mr-2 inline-block shrink-0 align-middle [&+strong]:align-middle">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={safeSrc}
          alt={safeAlt}
          loading="lazy"
          decoding="async"
          className="inline-block h-9 w-9 object-contain align-middle"
        />
      </span>
    );
  }

  return (
    <>
      <figure className="my-6 text-center">
        <span className="inline-block overflow-hidden rounded-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={safeSrc}
            alt={safeAlt}
            width={hasDimensions ? width : undefined}
            height={hasDimensions ? height : undefined}
            loading="lazy"
            decoding="async"
            style={
              hasDimensions
                ? { aspectRatio: `${width} / ${height}` }
                : undefined
            }
            className="block max-h-[560px] w-auto max-w-full cursor-zoom-in rounded-[10px]"
            onClick={() => setOpen(true)}
          />
        </span>
        {title ? (
          <figcaption className="mt-2 text-sm leading-relaxed text-zinc-500">
            {title}
          </figcaption>
        ) : null}
      </figure>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
              onClick={() => setOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Expanded image preview"
            >
              <button
                type="button"
                className="absolute right-4 top-4 rounded-md bg-white/15 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/25"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <span className="inline-block overflow-hidden rounded-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={safeSrc}
                  alt={safeAlt}
                  className="block max-h-[92vh] w-auto max-w-[92vw] rounded-[10px]"
                  onClick={(e) => e.stopPropagation()}
                />
              </span>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
