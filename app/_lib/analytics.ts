"use client";

import posthog from "posthog-js";

// Typed event name union shared across all client components.
export type AnalyticsEvent =
  | "pageview"
  | "blog_post_view"
  | "video_play"
  | "share_click"
  | "social_click"
  | "cta_book_call_click"
  | "scroll_depth";

/**
 * Returns the posthog singleton, or null if not yet initialized.
 * Never throws.
 */
export function getPosthog(): typeof posthog | null {
  try {
    // posthog.__loaded is set to true after posthog.init() completes.
    if (typeof posthog !== "undefined" && posthog.__loaded) {
      return posthog;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Emit a typed analytics event.
 * Safe no-op if PostHog is not yet initialized or unavailable.
 */
export function capture(
  event: AnalyticsEvent,
  properties?: Record<string, unknown>
): void {
  try {
    const ph = getPosthog();
    if (ph) {
      ph.capture(event, properties);
    }
  } catch {
    // Silently swallow: analytics must never break the app.
  }
}
