"use client";

import { useEffect, useRef } from "react";

import type { ShelfVolume } from "@/lib/press/shelf-volumes";
import { buttonStyle } from "@/components/ui/buttonStyle";

import { mountPressShelf } from "./shelf-engine";
import "./press-shelf.css";

const pad = (value: number) => String(value).padStart(2, "0");

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d={direction === "left" ? "m10.5 3.5-4.5 4.5 4.5 4.5" : "m5.5 3.5 4.5 4.5-4.5 4.5"} />
    </svg>
  );
}

/**
 * The /press hero: a 3D shelf of bound press volumes. The markup here is the
 * whole interface, rendered on the server so the first volume, the controls
 * and the page title are in the HTML before any WebGL runs. The engine
 * (shelf-engine.js) mounts into it and drives the canvas and the text.
 */
export function PressShelf({
  volumes,
}: {
  volumes: ShelfVolume[];
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current || volumes.length === 0) return;
    return mountPressShelf(rootRef.current, volumes);
  }, [volumes]);

  const first = volumes[0];
  if (!first) return null;

  return (
    <section ref={rootRef} id="press-shelf" className="press-shelf" aria-labelledby="press-title">
      <canvas className="press-shelf__canvas" data-shelf-el="canvas" aria-hidden="true" />

      <header className="press-shelf__header">
        <div>
          <h1 id="press-title" className="press-shelf__title">
            Press
          </h1>
          <p className="press-shelf__subtitle">
            Articles, podcasts, and appearances, bound into {volumes.length} volumes.
          </p>
        </div>
        <div className="press-shelf__index">
          <a className="press-shelf__archive-link" href="#archive">
            Skip to the full list ↓
          </a>
        </div>
      </header>

      <section className="press-shelf__browse" data-shelf-el="browse" aria-label="Shelf navigation">
        <div className="press-shelf__selection">
          <span className="press-shelf__counter" data-shelf-el="counter">
            01 / {pad(volumes.length)}
          </span>
          <div style={{ minWidth: 0 }}>
            <h2 className="press-shelf__selection-title" data-shelf-el="selection-title">
              {first.title}
            </h2>
            <p className="press-shelf__selection-note" data-shelf-el="selection-note">
              {first.note}
            </p>
          </div>
        </div>

        <div className="press-shelf__actions">
          <button
            className="press-shelf__round mr-pressable"
            data-shelf-el="previous"
            type="button"
            aria-label="Previous volume"
          >
            <Chevron direction="left" />
          </button>
          <button
            className="mr-pressable"
            data-shelf-el="inspect"
            type="button"
            aria-label={`Open ${first.title}`}
            style={{ ...buttonStyle({ size: "sm" }), border: 0, cursor: "pointer" }}
          >
            Open volume
          </button>
          <button
            className="press-shelf__round mr-pressable"
            data-shelf-el="next"
            type="button"
            aria-label="Next volume"
          >
            <Chevron direction="right" />
          </button>
        </div>

        <nav className="press-shelf__index-nav" aria-label="Volume index">
          <div className="press-shelf__markers" role="tablist" aria-label="Choose a volume">
            {volumes.map((volume, index) => (
              <button
                key={volume.id}
                className="press-shelf__marker"
                data-shelf-marker=""
                type="button"
                role="tab"
                aria-label={`Select volume ${index + 1}: ${volume.title}`}
                aria-current={index === 0 ? "true" : "false"}
                aria-selected={index === 0}
                tabIndex={index === 0 ? 0 : -1}
              />
            ))}
          </div>
          <p className="press-shelf__microcopy">Drag · arrows · click a book</p>
        </nav>
      </section>

      <aside
        className="press-shelf__detail"
        data-shelf-el="detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="press-shelf-detail-title"
        aria-hidden="true"
        inert
      >
        <button
          className="press-shelf__round press-shelf__close mr-pressable"
          data-shelf-el="close"
          type="button"
          aria-label="Put the volume back on the shelf"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m4 4 8 8M12 4l-8 8" />
          </svg>
        </button>
        <p className="press-shelf__detail-eyebrow" data-shelf-el="detail-eyebrow">
          Volume {first.roman} · {first.discipline}
        </p>
        <h2 className="press-shelf__detail-title" id="press-shelf-detail-title" data-shelf-el="detail-title">
          {first.title}
        </h2>
        <p className="press-shelf__detail-deck" data-shelf-el="detail-deck">
          {first.deck}
        </p>
        <dl className="press-shelf__meta">
          <div>
            <dt>Inside</dt>
            <dd data-shelf-el="detail-pieces">{first.items.length} clippings</dd>
          </div>
          <div>
            <dt>Formats</dt>
            <dd data-shelf-el="detail-formats">{first.formats}</dd>
          </div>
          <div className="press-shelf__meta-wide">
            <dt>Outlets</dt>
            <dd className="press-shelf__outlets" data-shelf-el="detail-outlets">
              {first.outlets}
            </dd>
          </div>
        </dl>
        <div className="press-shelf__pages" role="group" aria-label="Turn the pages">
          <button
            className="press-shelf__round mr-pressable"
            data-shelf-el="previous-page"
            type="button"
            aria-label="Previous page"
            disabled
          >
            <Chevron direction="left" />
          </button>
          <div className="press-shelf__page-status">
            <button
              className="press-shelf__open-book mr-pressable"
              data-shelf-el="open-book"
              type="button"
              style={{ ...buttonStyle({ variant: "secondary", size: "xs" }), cursor: "pointer" }}
            >
              Open book
            </button>
            <p className="press-shelf__page-reading" data-shelf-el="page-reading" aria-live="off" hidden>
              <strong data-shelf-el="page-label" />
              <span data-shelf-el="page-counter" />
            </p>
          </div>
          <button
            className="press-shelf__round mr-pressable"
            data-shelf-el="next-page"
            type="button"
            aria-label="Next page"
            disabled
          >
            <Chevron direction="right" />
          </button>
        </div>
        <a className="press-shelf__item-link" data-shelf-el="item-link" href="#archive" hidden>
          Read the piece →
        </a>
      </aside>

      <div className="press-shelf__sr-only" data-shelf-el="live" aria-live="polite" />

      <div className="press-shelf__fallback">
        <div>
          <p data-shelf-el="fallback-status">The 3D shelf isn&apos;t available here. Every clipping is listed below.</p>
          <a className="press-shelf__archive-link" href="#archive">
            Go to the full list ↓
          </a>
        </div>
      </div>

      <div className="press-shelf__loading" data-shelf-el="loading" aria-live="polite">
        <div className="press-shelf__loading-inner">
          <div className="press-shelf__loading-mark" aria-hidden="true" />
          <p className="press-shelf__mono" style={{ margin: 0 }}>
            Shelving the clippings
          </p>
        </div>
      </div>
    </section>
  );
}
