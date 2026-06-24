"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Code block with a copy button.
//
// Replaces the DocumentRenderer's default `block.code` so article prompts/code
// can be copied in one click. Long lines wrap (see `.prose pre` in globals.css)
// so the full text is always visible instead of being clipped on the right.
// ---------------------------------------------------------------------------

export function CodeBlock({
  children,
  language,
}: {
  children: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (insecure context / denied) — no-op.
    }
  }

  return (
    <pre data-language={language || undefined}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied to clipboard" : "Copy code"}
        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-lg bg-bg/90 px-2.5 py-1.5 text-xs font-medium text-muted ring-1 ring-black/[0.08] backdrop-blur transition-colors hover:text-ink hover:ring-black/[0.16] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {copied ? (
          <>
            <svg
              viewBox="0 0 20 20"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-accent"
            >
              <path d="M4 10.5 8 14.5 16 5.5" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg
              viewBox="0 0 20 20"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="7" y="7" width="9" height="9" rx="2" />
              <path d="M13 4.5H6A1.5 1.5 0 0 0 4.5 6v7" />
            </svg>
            Copy
          </>
        )}
      </button>
      <code>{children}</code>
    </pre>
  );
}
