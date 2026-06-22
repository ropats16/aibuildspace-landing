"use client";

import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { capture } from "@/app/_lib/analytics";

// ---------------------------------------------------------------------------
// Route-change pageview tracker (needs Suspense because of useSearchParams)
// ---------------------------------------------------------------------------

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const path =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    capture("pageview", { path });
  }, [pathname, searchParams]);

  return null;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return; // no-op: no key, no network

    const init = () => {
      posthog.init(key, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        capture_pageview: false, // we fire manually via PageviewTracker
        capture_pageleave: true,
        person_profiles: "identified_only",
      });

      // Respect prior opt-out stored by the consent banner (Task 14).
      try {
        const consent = localStorage.getItem("ab_analytics_consent");
        if (consent === "denied") {
          posthog.opt_out_capturing();
        }
      } catch {
        // localStorage may be blocked; ignore
      }
    };

    // Defer init so it does not block LCP/INP.
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(init);
      } else {
        setTimeout(init, 200);
      }
    }
  }, []);

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
