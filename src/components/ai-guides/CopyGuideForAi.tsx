"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";
import { buttonStyle } from "@/components/ui/buttonStyle";

type CopyState = "idle" | "copied" | "error";

/** How long the confirmation label stays up before reverting. */
const CONFIRM_MS = 2000;

type CopyGuideForAiProps = {
  guideSlug: string;
  guideTitle: string;
};

function track(eventName: string, guideSlug: string, guideTitle: string) {
  const params = {
    guide_slug: guideSlug,
    guide_title: guideTitle,
    cta_location: "ai_guide_detail_header",
  };
  posthog.capture(eventName, params);
  trackGa4Event(eventName, params);
}

/**
 * Hands the reader this guide as plain Markdown, for pasting into an LLM.
 *
 * The site already reads well when an agent fetches the HTML — this is not a
 * fix for that. It exists because the workflow Mika teaches ("drop this into
 * Claude and have it walk you through the install") was invisible on the page.
 * A button makes it a feature the reader can see and use, rather than behaviour
 * they have to already know about.
 *
 * Copy fetches `/ai/<slug>.md` rather than embedding the source in the page:
 * inlining ~7KB of duplicate Markdown into the HTML payload of every guide
 * would grow the very document this is meant to slim down.
 */
export function CopyGuideForAi({ guideSlug, guideTitle }: CopyGuideForAiProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function scheduleReset() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState("idle"), CONFIRM_MS);
  }

  async function handleCopy() {
    try {
      const res = await fetch(`/ai/${guideSlug}.md`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const markdown = await res.text();
      await navigator.clipboard.writeText(markdown);
      setState("copied");
      track("ai_guide_copy_markdown", guideSlug, guideTitle);
    } catch {
      // Clipboard writes are refused on insecure origins and inside some
      // in-app browsers (Instagram's especially, which is where a lot of this
      // traffic lands). Failing silently would look like a dead button, so the
      // helper text points at the link beside it, which always works.
      setState("error");
    }
    scheduleReset();
  }

  const label = state === "copied" ? "Copied" : "Copy for AI";

  const helper =
    state === "error"
      ? "Couldn't reach your clipboard — open View as Markdown and copy from there."
      : "Paste into Claude or ChatGPT and it will walk you through the steps.";

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={handleCopy}
        aria-live="polite"
      >
        {label}
      </Button>
      <a
        href={`/ai/${guideSlug}.md`}
        className="mr-pressable"
        style={buttonStyle({ variant: "secondary", size: "sm" })}
        onClick={() => track("ai_guide_view_markdown", guideSlug, guideTitle)}
      >
        View as Markdown
      </a>
      {/*
        Two polite live regions, but they never fire together: success changes
        only the button label, failure changes only this helper.
      */}
      <span
        aria-live="polite"
        className="text-[length:var(--mr-text-xs)] text-[var(--mr-muted)]"
        style={{ maxWidth: "34ch" }}
      >
        {helper}
      </span>
    </div>
  );
}
