"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { capture } from "@/app/_lib/analytics";
import {
  InstagramIcon,
  LinkedinIcon,
  SubstackIcon,
  XIcon,
  YoutubeIcon,
} from "@/app/_components/SocialIcons";
import { site } from "@/data/site";

// Simple link/copy icon (not a brand logo, hand-drawn is allowed per constraints).
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const followSocials = [
  { href: site.social.instagram, label: "Instagram", network: "instagram", Icon: InstagramIcon },
  { href: site.social.x, label: "X", network: "x", Icon: XIcon },
  { href: site.social.linkedin, label: "LinkedIn", network: "linkedin", Icon: LinkedinIcon },
  { href: site.social.youtube, label: "YouTube", network: "youtube", Icon: YoutubeIcon },
  { href: site.social.substack, label: "Substack", network: "substack", Icon: SubstackIcon },
] as const;

const pillClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-ink hover:text-ink";

interface ShareBarProps {
  url: string;
  title: string;
}

export function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timeout on unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleCopy() {
    capture("share_click", { method: "copy" });
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true);
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 2000);
      },
      // Clipboard permission denied or unavailable: silently ignore.
      () => {}
    );
  }

  function handleShareX() {
    capture("share_click", { method: "x" });
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handleShareLinkedIn() {
    capture("share_click", { method: "linkedin" });
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Share controls */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Share
        </p>
        <div className="flex items-center gap-3">
          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Link copied" : "Copy link"}
            className={pillClass}
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-accent" />
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
          </button>

          {/* Share to X */}
          <button
            type="button"
            onClick={handleShareX}
            aria-label="Share on X"
            className={pillClass}
          >
            <XIcon className="h-4 w-4" />
          </button>

          {/* Share to LinkedIn */}
          <button
            type="button"
            onClick={handleShareLinkedIn}
            aria-label="Share on LinkedIn"
            className={pillClass}
          >
            <LinkedinIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Follow row */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Follow along
        </p>
        <div className="flex items-center gap-3">
          {followSocials.map(({ href, label, network, Icon }) => (
            <Link
              key={network}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => capture("social_click", { network })}
              className={pillClass}
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
