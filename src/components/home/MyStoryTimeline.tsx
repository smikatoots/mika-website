"use client";

import Image from "next/image";
import { type CSSProperties, type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  storyMilestonePlaceholder,
  storyMilestones,
  type StoryMilestone,
} from "@/lib/home-story-milestones";

type MilestoneState = "past" | "active" | "future";

function renderHighlightedBody(body: string, highlights: string[]): ReactNode {
  let nodes: ReactNode[] = [body];

  for (const phrase of highlights) {
    nodes = nodes.flatMap((node, nodeIndex) => {
      if (typeof node !== "string") return [node];

      const index = node.indexOf(phrase);
      if (index === -1) return [node];

      const before = node.slice(0, index);
      const after = node.slice(index + phrase.length);

      return [
        before,
        <strong
          key={`${phrase}-${nodeIndex}`}
          style={{ fontWeight: "var(--mr-weight-semi)", color: "var(--mr-ink)" }}
        >
          {phrase}
        </strong>,
        after,
      ];
    });
  }

  return nodes;
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

function StoryCard({
  milestone,
  variant,
  state,
  reduceMotion,
}: {
  milestone: StoryMilestone;
  variant: "rose" | "cream";
  state: MilestoneState;
  reduceMotion: boolean;
}) {
  const isRose = variant === "rose";
  const [imageSrc, setImageSrc] = useState(milestone.image);

  return (
    <div
      className="mr-lift overflow-hidden"
      style={{
        background: isRose ? "var(--mr-surface-rose)" : "var(--mr-surface-cream)",
        border: isRose ? "1px solid var(--mr-border-rose)" : "1px solid var(--mr-border-cream)",
        borderRadius: "var(--mr-radius-card)",
        ...panelRevealStyle(state, reduceMotion),
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          background: isRose ? "var(--mr-surface-rose-2)" : "var(--mr-border-cream)",
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
        <span style={eyebrow(isRose ? "var(--mr-coral)" : "var(--mr-teal)")}>{milestone.eyebrow}</span>
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
            color: "var(--mr-text-soft)",
            lineHeight: 1.6,
            margin: 0,
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
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const track = trackRef.current;
      const line = lineRef.current;
      if (!track || !line) return;

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

  useLayoutEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;

    const centerY = window.innerHeight * 0.5;
    const trackRect = track.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();

    setShowDot(trackRect.top < centerY && trackRect.bottom > centerY);
    if (lineRect.height > 0) {
      const progress = (centerY - lineRect.top) / lineRect.height;
      setFillPercent(Math.max(0, Math.min(1, progress)));
    }
  }, []);

  const milestoneMarkerStyle = (index: number): CSSProperties => {
    const isPast = index < activeIndex;
    const isActive = index === activeIndex;

    if (isPast) {
      return {
        background: "var(--mr-coral)",
        border: "2px solid var(--mr-surface)",
        boxShadow: "0 0 0 1px var(--mr-coral)",
      };
    }

    if (isActive) {
      return {
        background: "var(--mr-coral)",
        border: "3px solid var(--mr-surface)",
        boxShadow: "0 0 0 2px var(--mr-coral)",
      };
    }

    return {
      background: "var(--mr-surface)",
      border: "2px solid var(--mr-border)",
      boxShadow: "0 0 0 1px var(--mr-border)",
    };
  };

  const milestoneState = (index: number): MilestoneState => {
    if (reduceMotion) return "past";
    if (index < activeIndex) return "past";
    if (index === activeIndex) return "active";
    return "future";
  };

  return (
    <div ref={trackRef} className="relative mt-2 md:mt-4">
      <div
        ref={lineRef}
        aria-hidden
        className="pointer-events-none absolute left-[32px] top-0 bottom-0 w-[3px] -translate-x-1/2 md:left-1/2"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--mr-border)" }}
        />
        <div
          className="absolute left-0 right-0 top-0 rounded-full"
          style={{
            height: `${fillPercent * 100}%`,
            background: "var(--mr-coral)",
          }}
        />
      </div>

      {showDot ? (
        <div
          aria-hidden
          className="pointer-events-none fixed z-20 left-[32px] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full md:left-1/2"
          style={{
            background: "var(--mr-coral)",
            border: "3px solid var(--mr-surface)",
            boxShadow: "0 0 0 1px var(--mr-border)",
          }}
        />
      ) : null}

      <div className="flex flex-col">
        {storyMilestones.map((milestone, index) => {
          const isLeft = index % 2 === 0;
          const variant = index % 2 === 0 ? "rose" : "cream";
          const state = milestoneState(index);

          return (
            <div
              key={milestone.id}
              className="relative grid grid-cols-[32px_1fr] items-start gap-4 py-10 md:grid-cols-[1fr_48px_1fr] md:gap-8 md:py-14"
            >
              {isLeft ? (
                <div className="col-start-2 row-start-1 md:col-start-1 md:pr-4">
                  <StoryCard
                    milestone={milestone}
                    variant={variant}
                    state={state}
                    reduceMotion={reduceMotion}
                  />
                </div>
              ) : (
                <div className="hidden md:col-start-1 md:block" aria-hidden />
              )}

              <div className="col-start-1 row-start-1 flex justify-center self-start md:col-start-2">
                <div
                  ref={(el) => {
                    markerRefs.current[index] = el;
                  }}
                  aria-hidden
                  className={`relative z-10 shrink-0 rounded-full transition-[transform,box-shadow] duration-300 ${
                    index === activeIndex ? "h-4 w-4" : "h-3 w-3"
                  }`}
                  style={milestoneMarkerStyle(index)}
                />
              </div>

              <div
                className={`col-start-2 row-start-1 md:col-start-3 md:pl-4 ${isLeft ? "md:hidden" : ""}`}
              >
                {!isLeft ? (
                  <StoryCard
                    milestone={milestone}
                    variant={variant}
                    state={state}
                    reduceMotion={reduceMotion}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
