"use client";

import Image from "next/image";
import { type CSSProperties, type ReactElement, type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  storyMilestonePlaceholder,
  storyMilestones,
  type StoryMilestone,
} from "@/lib/home-story-milestones";

type MilestoneState = "past" | "active" | "future";

/** Nudge spine markers down to meet the top edge of each card. */
const TIMELINE_MARKER_TOP_OFFSET = 20;

type BodyPart = string | ReactElement;

function renderHighlightedBody(body: string, highlights: string[]): ReactNode {
  let parts: BodyPart[] = [body];

  for (const phrase of highlights) {
    parts = parts.flatMap((part, partIndex) => {
      if (typeof part !== "string") return [part];

      const index = part.indexOf(phrase);
      if (index === -1) return [part];

      const before = part.slice(0, index);
      const after = part.slice(index + phrase.length);

      return [
        before,
        <strong
          key={`${phrase}-${partIndex}`}
          style={{ fontWeight: "var(--mr-weight-semi)", color: "var(--mr-ink)" }}
        >
          {phrase}
        </strong>,
        after,
      ];
    });
  }

  return parts;
}

function eyebrow(color: string): React.CSSProperties {
  return {
    display: "inline-block",
    fontFamily: "var(--mr-font-body)",
    fontSize: "var(--mr-text-eyebrow)",
    fontWeight: "var(--mr-weight-display)",
    color,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    marginBottom: "12px",
  };
}

function panelRevealStyle(
  state: MilestoneState,
  reduceMotion: boolean,
): React.CSSProperties {
  const revealed = reduceMotion || state !== "future";
  return {
    opacity: revealed ? (state === "past" && !reduceMotion ? 0.8 : 1) : 0.2,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
    transition: reduceMotion
      ? undefined
      : "opacity 0.55s var(--mr-ease), transform 0.55s var(--mr-ease)",
  };
}

/* Timeline card grounds. Every one of these clears AA with black type — the
   check that matters, since the card sets ink on the colour. Teal is left
   out for that reason (black on it is 2.83:1). Ten milestones cycle through
   four grounds, so no two adjacent cards repeat. */
const STORY_CARD_GROUNDS = [
  "var(--mr-yellow)",
  "var(--mr-aqua)",
  "var(--mr-red)",
  "var(--mr-line)",
] as const;

function StoryCard({
  milestone,
  colorIndex,
  state,
  reduceMotion,
}: {
  milestone: StoryMilestone;
  colorIndex: number;
  state: MilestoneState;
  reduceMotion: boolean;
}) {
  const ground = STORY_CARD_GROUNDS[colorIndex % STORY_CARD_GROUNDS.length];
  const [imageSrc, setImageSrc] = useState(milestone.image);

  return (
    <div
      className="mr-lift overflow-hidden"
      style={{
        // Colour is the container here — no border. See DESIGN.md > Colors.
        background: ground,
        borderRadius: "var(--mr-radius-card)",
        ...panelRevealStyle(state, reduceMotion),
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          // Placeholder tint while the photo loads. Translucent so it reads
          // correctly on every ground rather than needing a value per colour.
          background: "rgba(0, 0, 0, 0.08)",
        }}
      >
        <Image
          src={imageSrc}
          alt={milestone.imageAlt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 420px"
          onError={() => setImageSrc(storyMilestonePlaceholder)}
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
        />
      </div>
      <div style={{ padding: "clamp(20px, 3vw, 28px)" }}>
        <span style={eyebrow("var(--mr-ink)")}>{milestone.eyebrow}</span>
        <h3
          style={{
            fontFamily: "var(--mr-font-display)",
            fontSize: "var(--mr-text-h3)",
            fontWeight: "var(--mr-weight-display)",
            color: "var(--mr-ink)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            margin: "0 0 12px",
          }}
        >
          {milestone.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--mr-font-body)",
            fontSize: "var(--mr-text-sm)",
            color: "var(--mr-charcoal)",
            lineHeight: 1.6,
            margin: 0,
            whiteSpace: "pre-line",
          }}
        >
          {renderHighlightedBody(milestone.body, milestone.highlights)}
        </p>
      </div>
    </div>
  );
}

export function MyStoryTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fillPercent, setFillPercent] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDot, setShowDot] = useState(false);
  const [lineBounds, setLineBounds] = useState({ top: 0, height: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isDesktopTimeline, setIsDesktopTimeline] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => setIsDesktopTimeline(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    let frame = 0;

    const measureLineBounds = (track: HTMLDivElement) => {
      const first = markerRefs.current[0];
      const last = markerRefs.current[storyMilestones.length - 1];
      if (!first || !last) return null;

      const trackRect = track.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const top = firstRect.top + firstRect.height / 2 - trackRect.top;
      const bottom = lastRect.top + lastRect.height / 2 - trackRect.top;

      return { top, height: Math.max(0, bottom - top) };
    };

    const update = () => {
      const track = trackRef.current;
      const line = lineRef.current;
      if (!track) return;

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop || !line) {
        setShowDot(false);
        return;
      }

      const bounds = measureLineBounds(track);
      if (bounds) setLineBounds(bounds);

      const centerY = window.innerHeight * 0.5;
      const trackRect = track.getBoundingClientRect();
      const lineRect = line.getBoundingClientRect();

      const inView = trackRect.top < centerY && trackRect.bottom > centerY;
      setShowDot(inView);

      if (lineRect.height > 0) {
        const progress = (centerY - lineRect.top) / lineRect.height;
        setFillPercent(Math.max(0, Math.min(1, progress)));
      }

      let nextActive = 0;
      markerRefs.current.forEach((marker, index) => {
        if (!marker) return;
        const markerRect = marker.getBoundingClientRect();
        const markerCenterY = markerRect.top + markerRect.height * 0.5;
        if (markerCenterY <= centerY) {
          nextActive = index;
        }
      });
      setActiveIndex(nextActive);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const track = trackRef.current;
    if (!track) {
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
      };
    }

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(track);
    markerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
    };
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- Synchronous layout measurement prevents the timeline from flashing in the wrong position. */
  useLayoutEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) {
      setShowDot(false);
      return;
    }

    const first = markerRefs.current[0];
    const last = markerRefs.current[storyMilestones.length - 1];
    if (first && last) {
      const trackRect = track.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const top = firstRect.top + firstRect.height / 2 - trackRect.top;
      const bottom = lastRect.top + lastRect.height / 2 - trackRect.top;
      setLineBounds({ top, height: Math.max(0, bottom - top) });
    }

    const centerY = window.innerHeight * 0.5;
    const trackRect = track.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();

    setShowDot(trackRect.top < centerY && trackRect.bottom > centerY);
    if (lineRect.height > 0) {
      const progress = (centerY - lineRect.top) / lineRect.height;
      setFillPercent(Math.max(0, Math.min(1, progress)));
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const milestoneMarkerStyle = (index: number): CSSProperties => {
    const isPast = index < activeIndex;
    const isActive = index === activeIndex;

    if (isPast) {
      return {
        background: "var(--mr-red)",
        border: "2px solid var(--mr-paper)",
        boxShadow: "0 0 0 1px var(--mr-red)",
      };
    }

    if (isActive) {
      return {
        background: "var(--mr-red)",
        border: "3px solid var(--mr-paper)",
        boxShadow: "0 0 0 2px var(--mr-red)",
      };
    }

    return {
      background: "var(--mr-paper)",
      border: "2px solid var(--mr-line)",
      boxShadow: "0 0 0 1px var(--mr-line)",
    };
  };

  const milestoneState = (index: number): MilestoneState => {
    if (reduceMotion || !isDesktopTimeline) return "past";
    if (index < activeIndex) return "past";
    if (index === activeIndex) return "active";
    return "future";
  };

  return (
    <div ref={trackRef} className="relative mt-2 md:mt-4">
      <div
        ref={lineRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 hidden w-[3px] -translate-x-1/2 md:block"
        style={{ top: lineBounds.top, height: lineBounds.height }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--mr-line)" }}
        />
        <div
          className="absolute left-0 right-0 top-0 rounded-full"
          style={{
            height: `${fillPercent * 100}%`,
            background: "var(--mr-red)",
          }}
        />
        {showDot ? (
          <div
            aria-hidden
            className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              top: `${fillPercent * 100}%`,
              background: "var(--mr-red)",
              border: "3px solid var(--mr-paper)",
              boxShadow: "0 0 0 1px var(--mr-line)",
            }}
          />
        ) : null}
      </div>

      <div className="flex flex-col">
        {storyMilestones.map((milestone, index) => {
          const isLeft = index % 2 === 0;

          const state = milestoneState(index);

          return (
            <div
              key={milestone.id}
              className={`relative py-2 md:py-0 ${index > 0 ? "md:-mt-56" : ""}`}
              style={{ zIndex: index === activeIndex ? 20 : index + 1 }}
            >
              <div
                className="pointer-events-none absolute left-1/2 z-30 hidden -translate-x-1/2 md:block"
                style={{
                  top: TIMELINE_MARKER_TOP_OFFSET,
                  ...panelRevealStyle(state, reduceMotion),
                }}
              >
                <div
                  ref={(el) => {
                    markerRefs.current[index] = el;
                  }}
                  aria-hidden
                  className={`relative shrink-0 rounded-full transition-[transform,box-shadow] duration-300 ${
                    index === activeIndex ? "h-4 w-4" : "h-3 w-3"
                  }`}
                  style={milestoneMarkerStyle(index)}
                />
              </div>

              <div className="md:grid md:grid-cols-[1fr_48px_1fr] md:items-start md:gap-8">
                <div
                  className={isLeft ? "md:col-start-1 md:pr-4" : "hidden md:col-start-1 md:block"}
                  aria-hidden={!isLeft}
                >
                  {isLeft ? (
                    <StoryCard
                      milestone={milestone}
                      colorIndex={index}
                      state={state}
                      reduceMotion={reduceMotion}
                    />
                  ) : null}
                </div>

                <div
                  className={isLeft ? "hidden md:col-start-3 md:block" : "md:col-start-3 md:pl-4"}
                  aria-hidden={isLeft}
                >
                  {!isLeft ? (
                    <StoryCard
                      milestone={milestone}
                      colorIndex={index}
                      state={state}
                      reduceMotion={reduceMotion}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
