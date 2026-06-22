"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

const CONSENT_KEY = "ab_analytics_consent";

function safeOptOut() {
  try {
    posthog.opt_out_capturing();
  } catch {
    // posthog not initialized or unavailable; safe no-op
  }
}

export function ConsentBanner() {
  /**
   * Hydration safety: both the server render and the client's FIRST render
   * start with visible=false (banner hidden), so their outputs are identical
   * and no hydration mismatch can occur. After mount, the effect reads
   * localStorage (client-only) and shows the banner only when consent is unset.
   *
   * "visible" means: consent is unset (null) — show the banner.
   * If consent is "granted" or "denied", suppress it.
   */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      // localStorage blocked; treat as first visit
    }
    if (stored === "denied") safeOptOut(); // enforce persisted opt-out
    // client-only localStorage read after mount; required to avoid SSR hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === null) setVisible(true); // first visit -> show banner after mount
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(CONSENT_KEY, "granted");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  function handleOptOut() {
    try {
      localStorage.setItem(CONSENT_KEY, "denied");
    } catch {
      // ignore
    }
    safeOptOut();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={[
        // Position: bottom-left, above content but not blocking it
        "fixed bottom-4 left-4 z-50",
        // Card shell: brand tokens
        "w-[calc(100vw-2rem)] max-w-sm",
        "rounded-2xl bg-card ring-1 ring-black/[0.06]",
        "shadow-[0_4px_24px_-4px_rgba(11,11,12,0.10),0_1px_4px_rgba(11,11,12,0.04)]",
        "p-5",
        // Entrance: slide up + fade
        "animate-consent-in",
      ].join(" ")}
    >
      <p className="text-sm text-ink leading-relaxed">
        We use privacy-friendly analytics to improve this site. No personal data
        is sold or shared.
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleAccept}
          className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Got it
        </button>

        <button
          type="button"
          onClick={handleOptOut}
          className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Opt out
        </button>
      </div>
    </div>
  );
}
