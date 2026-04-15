"use client";

import { useState } from "react";
import type { ReactNode } from "react";

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

export function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const codeText = textFromNode(children).trimEnd();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative my-4 rounded-lg bg-zinc-50">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-white/90 text-zinc-700 shadow-sm transition hover:bg-white"
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
      <pre className="overflow-x-hidden p-4 pr-14 text-sm text-zinc-900">
        <code className="whitespace-pre-wrap break-words text-zinc-900">
          {codeText}
        </code>
      </pre>
    </div>
  );
}
