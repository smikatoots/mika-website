"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { trackGa4Event } from "@/lib/analytics/ga4";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map((child) => textFromNode(child)).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return textFromNode(props.children ?? "");
  }
  return "";
}

function languageFromNode(node: ReactNode): string | undefined {
  if (Array.isArray(node)) {
    return node.map((child) => languageFromNode(child)).find(Boolean);
  }
  if (!node || typeof node !== "object" || !("props" in node)) {
    return undefined;
  }

  const props = node.props as { className?: string; children?: ReactNode };
  const language = props.className?.match(/(?:^|\s)language-([^\s]+)/)?.[1];
  return language ?? languageFromNode(props.children ?? "");
}

export function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const codeText = textFromNode(children).trimEnd();
  const codeLanguage = languageFromNode(children) ?? "unknown";
  const codeLines = codeText ? codeText.split("\n").length : 0;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      trackGa4Event("code_copy_click", {
        cta_label: "Copy code block",
        cta_location: "blog_code_block",
        link_type: "code_copy",
        code_language: codeLanguage,
        code_character_count: codeText.length,
        code_line_count: codeLines,
      });
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative my-6 overflow-hidden rounded-[var(--mr-radius-card)] border border-[var(--mr-ink)] bg-[var(--mr-line)]">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[var(--mr-radius-card)] border border-[var(--mr-ink)] bg-[var(--mr-paper)] text-[var(--mr-ink)] transition hover:bg-white"
        aria-label="Copy code block"
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
      <pre className="overflow-x-auto p-4 pr-14 text-sm text-[var(--mr-ink)]">
        <code className="whitespace-pre-wrap break-words text-[var(--mr-ink)]">
          {codeText}
        </code>
      </pre>
    </div>
  );
}
