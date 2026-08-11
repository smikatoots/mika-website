"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { trackGa4Event } from "@/lib/analytics/ga4";

const STORAGE_KEY = "mr-subscribe-modal-dismissed-at";
const DISMISS_TTL_MS = 1000 * 60 * 60 * 24; // 1 day
const SHOW_DELAY_MS = 5_000;
const SHOW_SCROLL_RATIO = 0.45;
const EMBED_SRC = "https://mikareyes.substack.com/embed?transparent=1";
const EMBED_HEIGHT = 150;

type DismissMethod = "close_button" | "backdrop" | "escape";

function wasRecentlyDismissed() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (!Number.isFinite(dismissedAt)) return false;
    return Date.now() - dismissedAt < DISMISS_TTL_MS;
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Ignore storage failures (private mode, quota, etc.)
  }
}

export function SubscribeModal() {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);

  const dismiss = useCallback((method: DismissMethod) => {
    rememberDismissal();
    setOpen(false);
    trackGa4Event("subscribe_modal_dismissed", {
      cta_location: "subscribe_modal",
      dismiss_method: method,
    });
  }, []);

  useEffect(() => {
    if (wasRecentlyDismissed() || shownRef.current) return;

    const show = () => {
      if (shownRef.current || wasRecentlyDismissed()) return;
      shownRef.current = true;
      setOpen(true);
      trackGa4Event("subscribe_modal_shown", {
        cta_location: "subscribe_modal",
        destination_url: EMBED_SRC,
      });
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SHOW_SCROLL_RATIO) {
        show();
      }
    };

    const timer = window.setTimeout(show, SHOW_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss("escape");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Dismiss subscribe dialog"
        className="absolute inset-0 bg-[rgba(17,17,17,0.45)] backdrop-blur-[2px]"
        onClick={() => dismiss("backdrop")}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[520px] overflow-hidden"
        style={{
          background: "var(--mr-surface-rose)",
          borderRadius: "var(--mr-radius-panel)",
          boxShadow: "var(--mr-shadow-frame)",
          border: "1px solid var(--mr-border-rose)",
        }}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={() => dismiss("close_button")}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-[var(--mr-faint)] transition-colors hover:text-[var(--mr-muted)]"
        >
          <span aria-hidden style={{ fontSize: 22, lineHeight: 1, fontWeight: 300 }}>
            ×
          </span>
        </button>

        <div className="px-6 pb-2 pt-7 text-center sm:px-8 sm:pt-8">
          <h2
            id={titleId}
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "clamp(1.55rem, 4vw, 1.9rem)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-ink)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: "0 auto",
              maxWidth: "18ch",
            }}
          >
            Subscribe to my newsletter
          </h2>
          <p
            className="mt-3"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-sm)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.55,
              maxWidth: "40ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            For high-achievers leveraging AI to build time-rich &amp; ambitious
            careers, wealth &amp; lives
          </p>
        </div>

        <div className="px-2 pb-4 sm:px-4 sm:pb-5">
          <iframe
            src={EMBED_SRC}
            title="Subscribe to Mika Reyes on Substack"
            width={480}
            height={EMBED_HEIGHT}
            frameBorder={0}
            scrolling="no"
            className="mx-auto block w-full max-w-[480px] bg-transparent"
            style={{
              border: 0,
              background: "transparent",
              height: EMBED_HEIGHT,
            }}
          />
        </div>
      </div>
    </div>
  );
}
