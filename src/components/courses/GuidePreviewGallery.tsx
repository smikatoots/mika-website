"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const guidePreviewImages = [
  {
    src: "/courses/build-your-first-agent/guide-preview/mcp-lesson.png",
    alt: "Video lesson using a memorable visual analogy to explain MCPs",
    caption: "Memorable memes and visuals",
    width: 1168,
    height: 653,
  },
  {
    src: "/courses/build-your-first-agent/guide-preview/course-home.png",
    alt: "Course home showing the self-paced guide modules",
    caption: "Videos you can watch at your own pace",
    width: 1189,
    height: 648,
  },
  {
    src: "/courses/build-your-first-agent/guide-preview/video-lesson.png",
    alt: "Setup and Foundations lesson with text, takeaways, and video",
    caption: "Preview of our outline & guide",
    width: 1024,
    height: 636,
  },
  {
    src: "/courses/build-your-first-agent/guide-preview/skills-lesson.png",
    alt: "Skills lesson with copyable starter prompts and written instructions",
    caption: "Preview of code snippets you can easily copy & paste",
    width: 1457,
    height: 905,
  },
] as const;

export function GuidePreviewGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage =
    activeIndex === null ? null : guidePreviewImages[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {guidePreviewImages.map(({ src, alt, caption, width, height }, index) => (
          <figure
            key={src}
            className="overflow-hidden"
            style={{
              background: "var(--mr-paper)",
              border: "1px solid var(--mr-line)",
              borderRadius: "var(--mr-radius-card)",
              boxShadow: "var(--mr-shadow-card)",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open larger preview: ${caption}`}
              className="block w-full cursor-zoom-in text-left"
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                quality={95}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </button>
            <figcaption
              style={{
                borderTop: "1px solid var(--mr-line)",
                color: "var(--mr-charcoal)",
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-sm)",
                fontWeight: "var(--mr-weight-semi)",
                padding: "14px 18px",
              }}
            >
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.caption}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-4 md:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex max-h-full w-full cursor-default flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image preview"
              className="absolute -right-2 -top-12 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-black shadow-lg"
            >
              ×
            </button>
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={activeImage.width}
              height={activeImage.height}
              quality={100}
              priority
              className="rounded-lg object-contain shadow-2xl"
              style={{
                width: `min(${activeImage.width}px, 94vw)`,
                height: "auto",
                maxHeight: "82vh",
              }}
              sizes="94vw"
            />
            <p
              className="mt-4 text-center text-white"
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-body)",
                fontWeight: "var(--mr-weight-semi)",
              }}
            >
              {activeImage.caption}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
