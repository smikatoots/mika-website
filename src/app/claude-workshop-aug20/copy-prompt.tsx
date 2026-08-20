"use client";

import { useState } from "react";

import { trackGa4Event } from "@/lib/analytics/ga4";

export function CopyPrompt({
  text,
  copyable = true,
  struck = false,
}: {
  text: string;
  copyable?: boolean;
  struck?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackGa4Event("code_copy_click", {
        cta_label: "Copy prompt",
        cta_location: "claude_workshop_aug20",
        link_type: "prompt_copy",
        code_character_count: text.length,
        code_line_count: text.split("\n").length,
      });
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative rounded-lg bg-zinc-50">
      {copyable ? (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-3 top-3 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-white/90 text-zinc-700 shadow-sm transition hover:bg-white"
          aria-label={copied ? "Prompt copied" : "Copy prompt"}
          title={copied ? "Copied" : "Copy"}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <rect
                x="9"
                y="9"
                width="11"
                height="11"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="4"
                y="4"
                width="11"
                height="11"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      ) : null}
      <pre
        className={`overflow-x-hidden p-4 font-mono text-sm leading-relaxed text-zinc-900 ${copyable ? "pr-14" : ""}`}
      >
        <code
          className={`whitespace-pre-wrap break-words font-mono ${struck ? "text-zinc-400 line-through decoration-[1.5px]" : "text-zinc-900"}`}
        >
          {text}
        </code>
      </pre>
    </div>
  );
}
