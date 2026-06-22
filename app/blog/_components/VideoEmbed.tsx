"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { capture } from "@/app/_lib/analytics";

// ---------------------------------------------------------------------------
// window.instgrm typing (strict mode)
// ---------------------------------------------------------------------------
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

// ---------------------------------------------------------------------------
// Platform detection + YouTube ID extraction
// ---------------------------------------------------------------------------
type Platform = "youtube" | "instagram" | "unknown";

function detectPlatform(url: string): Platform {
  try {
    const { hostname } = new URL(url);
    const host = hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "youtu.be") return "youtube";
    if (host === "instagram.com") return "instagram";
  } catch {
    // malformed URL
  }
  return "unknown";
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return id || null;
    }

    // youtube.com/shorts/<id>
    const shortsMatch = parsed.pathname.match(/^\/shorts\/([A-Za-z0-9_-]{11})/);
    if (shortsMatch) return shortsMatch[1];

    // youtube.com/watch?v=<id>
    const v = parsed.searchParams.get("v");
    if (v) return v;
  } catch {
    // malformed URL
  }
  return null;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function YouTubeEmbed({ url, title }: { url: string; title?: string }) {
  const videoId = extractYouTubeId(url);
  const [playing, setPlaying] = useState(false);
  const firedRef = useRef(false);

  if (!videoId) return <FallbackCard url={url} title={title} />;

  const thumbnailSrc = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
  const embedTitle = title ?? "YouTube video";

  function handlePlay() {
    if (!firedRef.current) {
      capture("video_play", { platform: "youtube", url });
      firedRef.current = true;
    }
    setPlaying(true);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)]">
      {playing ? (
        <iframe
          src={embedSrc}
          title={embedTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Image
            src={thumbnailSrc}
            alt={title ? `Thumbnail for ${title}` : "YouTube video thumbnail"}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 65vw, 100vw"
          />
          {/* Dark scrim for contrast */}
          <div className="absolute inset-0 bg-ink/20" aria-hidden="true" />
          {/* Play button */}
          <button
            type="button"
            aria-label="Play video"
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95">
              {/* Standard play triangle */}
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
                className="text-accent-ink translate-x-[2px]"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Instagram embed
// ---------------------------------------------------------------------------

// Guard: track whether the script tag has already been injected
let igScriptLoaded = false;

function InstagramEmbed({ url }: { url: string; title?: string }) {
  const hasFired = useRef(false);

  useEffect(() => {
    // Emit best-effort analytics on mount/visible
    if (!hasFired.current) {
      capture("video_play", { platform: "instagram", url });
      hasFired.current = true;
    }

    if (igScriptLoaded) {
      // Script already in DOM; just process new embeds
      window.instgrm?.Embeds.process();
      return;
    }

    igScriptLoaded = true;
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      window.instgrm?.Embeds.process();
    };
    document.body.appendChild(script);
  }, [url]);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[540px] rounded-2xl overflow-hidden ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)]">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            borderRadius: "16px",
            margin: 0,
            maxWidth: "540px",
            minWidth: "326px",
            padding: 0,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Fallback / branded link card
// ---------------------------------------------------------------------------

function FallbackCard({
  url,
  title,
}: {
  url: string;
  title?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl bg-card px-6 py-5 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(11,11,12,0.22),0_2px_8px_rgba(11,11,12,0.04)] hover:ring-black/[0.10]"
    >
      {/* Icon */}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-muted">Video</p>
        <p className="truncate font-display font-semibold text-ink">
          {title ?? "Watch the video"}
        </p>
      </div>

      {/* Arrow */}
      <svg
        viewBox="0 0 20 20"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path
          fillRule="evenodd"
          d="M3 10a.75.75 0 01.75-.75h9.69L9.22 5.03a.75.75 0 011.06-1.06l5.5 5.5a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 01-1.06-1.06l4.22-4.22H3.75A.75.75 0 013 10z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function VideoEmbed({ url, title }: { url: string; title?: string }) {
  const platform = detectPlatform(url);

  if (platform === "youtube") {
    return <YouTubeEmbed url={url} title={title} />;
  }

  if (platform === "instagram") {
    return <InstagramEmbed url={url} title={title} />;
  }

  return <FallbackCard url={url} title={title} />;
}
