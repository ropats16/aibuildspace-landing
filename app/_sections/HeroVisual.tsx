"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { tools } from "@/data/tools";

const Orbit = dynamic(
  () => import("./Orbit").then((m) => ({ default: m.Orbit })),
  { ssr: false }
);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function StaticGrid() {
  return (
    <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
      {tools.map((t) => (
        <li
          key={t.id}
          className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)]"
        >
          <Image
            src={t.logo}
            alt=""
            width={22}
            height={22}
            className="h-5 w-5"
            unoptimized
          />
          <span className="truncate text-sm font-medium text-ink">
            {t.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function HeroVisual() {
  const reduce = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (reduce) {
    return <StaticGrid />;
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[760px]">
      <Orbit />
    </div>
  );
}
