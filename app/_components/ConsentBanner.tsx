"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

const CONSENT_KEY = "ab_analytics_consent";
const DISMISSED_KEY = "ab_consent_dismissed";

function safeOptOut() {
  try {
    posthog.opt_out_capturing();
  } catch {
    // posthog not initialized or unavailable; safe no-op
  }
}

function safeOptIn() {
  try {
    posthog.opt_in_capturing();
  } catch {
    // posthog not initialized or unavailable; safe no-op
  }
}

export function ConsentBanner() {
  /**
   * Hydration safety: server render and the client's FIRST render both start
   * with visible=false, so markup matches and no mismatch occurs. After mount
   * the effect reads localStorage (client-only) and reveals the banner unless
   * the visitor has already dismissed it.
   */
  const [visible, setVisible] = useState(false);
  // Analytics is enabled by default (opt-in); the toggle reflects the choice.
  const [enabled, setEnabled] = useState(true);
  // px to keep the banner above the viewport bottom — grows so it never overlaps the footer.
  const [bottomOffset, setBottomOffset] = useState(16);

  useEffect(() => {
    let consent: string | null = null;
    let dismissed: string | null = null;
    try {
      consent = localStorage.getItem(CONSENT_KEY);
      dismissed = localStorage.getItem(DISMISSED_KEY);
    } catch {
      // localStorage blocked; treat as first visit
    }
    if (consent === "denied") safeOptOut(); // enforce persisted opt-out

    // client-only localStorage reads after mount; required to avoid SSR hydration mismatch
    /* eslint-disable react-hooks/set-state-in-effect */
    setEnabled(consent !== "denied");
    if (dismissed !== "1") setVisible(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Pin the banner just above the footer (never over it).
  useEffect(() => {
    if (!visible) return;
    const footer = document.querySelector("footer");
    if (!footer) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = footer.getBoundingClientRect();
      const gap = 16;
      // Once the footer scrolls into view, lift the banner above its top edge.
      const overlap = window.innerHeight - rect.top;
      setBottomOffset(overlap > 0 ? overlap + gap : gap);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update); // initial position, deferred out of effect body
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [visible]);

  function handleToggle() {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(CONSENT_KEY, next ? "granted" : "denied");
    } catch {
      // ignore
    }
    if (next) safeOptIn();
    else safeOptOut();
  }

  function handleClose() {
    try {
      // Lock in the current choice (default granted) before hiding the banner.
      if (localStorage.getItem(CONSENT_KEY) === null) {
        localStorage.setItem(CONSENT_KEY, enabled ? "granted" : "denied");
      }
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      style={{ bottom: bottomOffset }}
      className={[
        "fixed right-4 z-50",
        "w-[calc(100vw-2rem)] max-w-sm",
        "rounded-2xl bg-card ring-1 ring-black/[0.06]",
        "shadow-[0_4px_24px_-4px_rgba(11,11,12,0.10),0_1px_4px_rgba(11,11,12,0.04)]",
        "p-5",
        "animate-consent-in",
      ].join(" ")}
    >
      {/* Close */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Dismiss"
        className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <p className="pr-6 text-sm leading-relaxed text-ink">
        We use privacy-friendly analytics to improve this site. No personal data
        is sold or shared.
      </p>

      {/* Opt-out toggle */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <span
          id="consent-toggle-label"
          className="text-sm font-medium text-ink"
        >
          Analytics
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-labelledby="consent-toggle-label"
          onClick={handleToggle}
          className={[
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            enabled ? "bg-accent" : "bg-border",
          ].join(" ")}
        >
          <span
            className={[
              "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
              enabled ? "translate-x-[22px]" : "translate-x-0.5",
            ].join(" ")}
          />
        </button>
      </div>
    </div>
  );
}
