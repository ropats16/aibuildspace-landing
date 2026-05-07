"use client";

import dynamic from "next/dynamic";

const CalEmbed = dynamic(() => import("./CalEmbed"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-[640px] w-full items-center justify-center"
      aria-hidden
    >
      <span className="text-xs text-muted">Loading calendar…</span>
    </div>
  ),
});

export function CalEmbedLazy() {
  return <CalEmbed />;
}
