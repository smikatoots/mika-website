"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  src?: string;
  alt?: string;
  title?: string;
};

export function MdxImage({ src, alt, title }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const safeSrc = src ?? "";
  const safeAlt = alt ?? "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!safeSrc) return null;

  return (
    <>
      <span className="my-6 block text-center">
        <span className="inline-block overflow-hidden rounded-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={safeSrc}
            alt={safeAlt}
            className="block max-h-[560px] w-auto max-w-full cursor-zoom-in rounded-[10px]"
            onClick={() => setOpen(true)}
          />
        </span>
        {title ? (
          <span className="mt-2 block text-center text-sm leading-relaxed text-zinc-500">
            {title}
          </span>
        ) : null}
      </span>

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span className="inline-block overflow-hidden rounded-[10px]">
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
