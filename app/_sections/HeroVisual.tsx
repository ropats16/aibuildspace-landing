"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { ExampleCard } from "@/app/_components/ExampleCard";
import { heroExamples } from "@/data/examples";

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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
      {heroExamples.map((example) => (
        <ExampleCard key={example.id} example={example} />
      ))}
    </div>
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
    <div className="relative mx-auto aspect-square w-full max-w-[640px]">
      <Orbit />
    </div>
  );
}
