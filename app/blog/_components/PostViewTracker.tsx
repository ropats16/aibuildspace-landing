"use client";

import { useEffect, useRef } from "react";
import { capture } from "@/app/_lib/analytics";

interface Props {
  slug: string;
}

export function PostViewTracker({ slug }: Props) {
  const firedRef = useRef<Set<number>>(new Set());

  // Fire blog_post_view once on mount.
  useEffect(() => {
    capture("blog_post_view", { slug });
  }, [slug]);

  // Track scroll depth milestones: 25 / 50 / 75 / 100.
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrolled = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const pct = Math.min(100, Math.round((scrolled / docHeight) * 100));

        for (const milestone of milestones) {
          if (pct >= milestone && !firedRef.current.has(milestone)) {
            firedRef.current.add(milestone);
            capture("scroll_depth", { slug, percent: milestone });
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire at 0 position in case the article is short enough to read without scrolling.
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
