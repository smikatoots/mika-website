"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────
   Hero portrait: the real photo is what you see; the illustration sits
   underneath and the cursor wipes an organic, gooey hole through to it.

   The two assets are pre-aligned 3:2 frames (the photo was scaled and
   shifted at bake time so her face, shoulders and hands sit under the
   drawing), so both layers can use the same cover crop.

   The reveal is an SVG mask: a lead blob that chases the cursor plus a
   trail of drops that shrink away, run through blur -> noise displacement
   -> alpha threshold so they melt into one wobbly shape. Gated on
   `pointer: fine` and no reduced motion, like the rest of the homepage
   motion layer; everyone else just gets the photo.
   ──────────────────────────────────────────────────────────── */

const ILLUSTRATION = "/about-assets/hero-illustration.webp";
const PHOTO = "/about-assets/hero-photo-aligned.jpg";

const DROPS = 28; // circle pool: 1 lead + trail
const DROP_LIFE_MS = 900;
const DROP_SPACING = 14; // px of travel between trail drops
const REVEAL_RADIUS = 0.26; // lead blob radius, as a share of the box's short side

type Size = { w: number; h: number };

export function HeroPortraitReveal() {
  const boxRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<SVGGElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [size, setSize] = useState<Size | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  useEffect(() => {
    const mq = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!enabled || !box) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, [enabled]);

  useEffect(() => {
    const box = boxRef.current;
    const group = blobsRef.current;
    if (!enabled || !size || !box || !group) return;

    const circles = Array.from(group.querySelectorAll("circle"));
    const radius = Math.min(size.w, size.h) * REVEAL_RADIUS;
    const target = { x: 0, y: 0 };
    const lead = { x: 0, y: 0, r: 0 };
    const drops: { x: number; y: number; born: number }[] = [];
    let last = { x: -1e4, y: -1e4 };
    let hovering = false;
    let raf = 0;

    const local = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      // SVG viewBox is in the box's CSS px, so client px map 1:1.
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const frame = (now: number) => {
      lead.x += (target.x - lead.x) * 0.18;
      lead.y += (target.y - lead.y) * 0.18;
      lead.r += ((hovering ? radius : 0) - lead.r) * 0.12;

      while (drops.length && now - drops[0].born > DROP_LIFE_MS) drops.shift();

      circles.forEach((c, i) => {
        if (i === 0) {
          c.setAttribute("cx", lead.x.toFixed(1));
          c.setAttribute("cy", lead.y.toFixed(1));
          c.setAttribute("r", Math.max(0, lead.r).toFixed(1));
          return;
        }
        const d = drops[drops.length - i];
        if (!d) {
          c.setAttribute("r", "0");
          return;
        }
        const life = 1 - (now - d.born) / DROP_LIFE_MS;
        c.setAttribute("cx", d.x.toFixed(1));
        c.setAttribute("cy", d.y.toFixed(1));
        c.setAttribute("r", (radius * 0.72 * life ** 1.5).toFixed(1));
      });

      // Sleep once everything has shrunk away; pointer events wake it.
      if (hovering || lead.r > 0.5 || drops.length) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const p = local(e);
      target.x = p.x;
      target.y = p.y;
      if (!hovering) {
        hovering = true;
        lead.x = p.x;
        lead.y = p.y;
      }
      if (Math.hypot(p.x - last.x, p.y - last.y) > DROP_SPACING) {
        drops.push({ x: p.x, y: p.y, born: performance.now() });
        if (drops.length > DROPS - 1) drops.shift();
        last = p;
      }
      wake();
    };
    const onLeave = () => {
      hovering = false;
      last = { x: -1e4, y: -1e4 };
      wake();
    };

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    return () => {
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, size]);

  const radius = size ? Math.min(size.w, size.h) * REVEAL_RADIUS : 0;

  return (
    <div
      ref={boxRef}
      className="mr-hero-photo"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: "var(--mr-radius-card)",
      }}
    >
      <Image
        src={PHOTO}
        alt="Mika Reyes"
        fill
        priority
        quality={95}
        // The 3:2 frame is cover-cropped into a taller box, so it renders at
        // ~1.9x the box width on desktop and ~1.1x on mobile.
        sizes="(min-width: 900px) 1000px, 115vw"
        style={{ objectFit: "cover", objectPosition: "center 18%" }}
      />
      {enabled && size ? (
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${size.w} ${size.h}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter
              id={`${uid}-goo`}
              filterUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={size.w}
              height={size.h}
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation={radius * 0.18} result="blur" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feDisplacementMap
                in="blur"
                in2="noise"
                scale={radius * 0.35}
                xChannelSelector="R"
                yChannelSelector="G"
                result="wobble"
              />
              <feColorMatrix
                in="wobble"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              />
            </filter>
            <mask
              id={`${uid}-mask`}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={size.w}
              height={size.h}
            >
              <g ref={blobsRef} filter={`url(#${uid}-goo)`}>
                {Array.from({ length: DROPS }, (_, i) => (
                  <circle key={i} r="0" fill="#fff" />
                ))}
              </g>
            </mask>
          </defs>
          {/* Same cover crop as the photo: both frames are 3:2 and the
              hero box is always taller than that, so the crop is height-fit
              and centred horizontally in both layers. */}
          <image
            href={ILLUSTRATION}
            width={size.w}
            height={size.h}
            preserveAspectRatio="xMidYMid slice"
            imageRendering="optimizeQuality"
            mask={`url(#${uid}-mask)`}
          />
        </svg>
      ) : null}
    </div>
  );
}
