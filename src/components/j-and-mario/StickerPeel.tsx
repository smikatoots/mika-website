"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  type CSSProperties,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

import "./StickerPeel.css";

gsap.registerPlugin(Draggable);

export type StickerInitialPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | { x: number; y: number };

export type StickerPeelProps = {
  imageSrc: string;
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  peelEasing?: string;
  peelHoverEasing?: string;
  width?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  initialPosition?: StickerInitialPosition;
  peelDirection?: number;
  className?: string;
  /** Stable id for layout placement (data-sticker-id). */
  stickerId?: string;
  /** Drag bounds — defaults to the sticker's parent element. */
  boundsRef?: RefObject<HTMLElement | null>;
  /** Called when the sticker is picked up — use to raise stacking order. */
  onBringToFront?: () => void;
  zIndex?: number;
};

export default function StickerPeel({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = "power3.out",
  peelHoverEasing = "power2.out",
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = "center",
  peelDirection = 0,
  className = "",
  stickerId,
  boundsRef,
  onBringToFront,
  zIndex = 1,
}: StickerPeelProps) {
  const reactId = useId().replace(/:/g, "");
  const ids = useMemo(
    () => ({
      pointLight: `pointLight-${reactId}`,
      pointLightFlipped: `pointLightFlipped-${reactId}`,
      dropShadow: `dropShadow-${reactId}`,
      expandAndFill: `expandAndFill-${reactId}`,
    }),
    [reactId],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);
  const onBringToFrontRef = useRef(onBringToFront);
  const didInitPositionRef = useRef(false);

  const defaultPadding = 56;

  useEffect(() => {
    onBringToFrontRef.current = onBringToFront;
  }, [onBringToFront]);

  useEffect(() => {
    if (didInitPositionRef.current) return;
    const target = dragTargetRef.current;
    if (!target) return;
    if (initialPosition === "center") {
      didInitPositionRef.current = true;
      return;
    }

    if (
      typeof initialPosition === "object" &&
      initialPosition.x !== undefined &&
      initialPosition.y !== undefined
    ) {
      gsap.set(target, { x: initialPosition.x, y: initialPosition.y });
      didInitPositionRef.current = true;
    }
  }, [initialPosition]);

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;
    const boundsEl =
      boundsRef?.current ?? (target.parentNode as Element | null);
    if (!boundsEl) return;

    // Preserve transform if Draggable is recreated (e.g. parent re-render).
    const prevX = Number(gsap.getProperty(target, "x")) || 0;
    const prevY = Number(gsap.getProperty(target, "y")) || 0;

    draggableInstanceRef.current = Draggable.create(target, {
      type: "x,y",
      bounds: boundsEl,
      inertia: true,
      onPress() {
        onBringToFrontRef.current?.();
      },
      onDrag() {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: "power1.out" });
      },
      onDragEnd() {
        gsap.to(target, { rotation: 0, duration: 0.8, ease: "power2.out" });
      },
    })[0];

    if (prevX !== 0 || prevY !== 0) {
      gsap.set(target, { x: prevX, y: prevY });
    }

    const handleResize = () => {
      draggableInstanceRef.current?.update(true);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      draggableInstanceRef.current?.kill();
      draggableInstanceRef.current = null;
    };
  }, [boundsRef]);

  useEffect(() => {
    const updateLight = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.set(pointLightRef.current, { attr: { x, y } });

      const normalizedAngle = Math.abs(peelDirection % 360);
      if (normalizedAngle !== 180) {
        gsap.set(pointLightFlippedRef.current, {
          attr: { x, y: rect.height - y },
        });
      } else {
        gsap.set(pointLightFlippedRef.current, {
          attr: { x: -1000, y: -1000 },
        });
      }
    };

    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", updateLight);
    return () => container.removeEventListener("mousemove", updateLight);
  }, [peelDirection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = () => container.classList.add("touch-active");
    const handleTouchEnd = () => container.classList.remove("touch-active");

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const cssVars = {
    "--sticker-rotate": `${rotate}deg`,
    "--sticker-p": `${defaultPadding}px`,
    "--sticker-peelback-hover": `${peelBackHoverPct}%`,
    "--sticker-peelback-active": `${peelBackActivePct}%`,
    "--sticker-peel-easing": peelEasing,
    "--sticker-peel-hover-easing": peelHoverEasing,
    "--sticker-width": `${width}px`,
    "--sticker-shadow-opacity": shadowIntensity,
    "--sticker-lighting-constant": lightingIntensity,
    "--peel-direction": `${peelDirection}deg`,
    "--sticker-z": zIndex,
  } as CSSProperties;

  return (
    <div
      className={`jammin-sticker-peel ${className}`.trim()}
      ref={dragTargetRef}
      data-sticker-id={stickerId}
      style={cssVars}
    >
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <filter id={ids.pointLight}>
            <feGaussianBlur stdDeviation="0.25" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={ids.pointLightFlipped}>
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight
                ref={pointLightFlippedRef}
                x="100"
                y="100"
                z="300"
              />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={ids.dropShadow}>
            <feDropShadow
              dx="1"
              dy="2"
              stdDeviation={1.5 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>

          <filter id={ids.expandAndFill}>
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(255,255,255)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef}>
        <div
          className="sticker-main"
          style={{ filter: `url(#${ids.dropShadow})` }}
        >
          <div
            className="sticker-lighting"
            style={
              lightingIntensity > 0.05
                ? { filter: `url(#${ids.pointLight})` }
                : undefined
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="sticker-image"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        <div className="flap">
          <div
            className="flap-lighting"
            style={{ filter: `url(#${ids.pointLightFlipped})` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="flap-image"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ filter: `url(#${ids.expandAndFill})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
