"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { tools, toolsByRing, type Tool, type OrbitRing } from "@/data/tools";

const RING_RADIUS: Record<OrbitRing, number> = { 0: 32, 1: 47 };
const RING_DURATION: Record<OrbitRing, number> = { 0: 80, 1: 120 };
const RING_DIRECTION: Record<OrbitRing, 1 | -1> = { 0: 1, 1: -1 };

const CYCLE_MS = 4500;
const PIN_MS = 6000;

export function Orbit() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const paused = hovered || pinned;
  const activeTool = tools[activeIdx];

  const advance = useCallback((delta: 1 | -1) => {
    setActiveIdx((i) => (i + delta + tools.length) % tools.length);
  }, []);

  const activateById = useCallback((id: Tool["id"]) => {
    const idx = tools.findIndex((t) => t.id === id);
    if (idx >= 0) setActiveIdx(idx);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => advance(1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, advance]);

  useEffect(() => {
    if (!pinned) return;
    const t = window.setTimeout(() => setPinned(false), PIN_MS);
    return () => window.clearTimeout(t);
  }, [pinned, activeIdx]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        advance(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        advance(-1);
      }
    },
    [advance]
  );

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Tools and example prompts. Use left and right arrow keys to cycle."
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setHovered(false);
        }
      }}
      data-paused={paused || undefined}
      className="orbit-root relative mx-auto aspect-square w-full max-w-[400px] outline-none sm:max-w-[480px] md:max-w-[600px] lg:max-w-[600px] xl:max-w-[680px]"
    >
      {([0, 1] as OrbitRing[]).map((ringIdx) => {
        const r = RING_RADIUS[ringIdx];
        return (
          <div
            key={`guide-${ringIdx}`}
            aria-hidden
            className="pointer-events-none absolute rounded-full border border-dashed border-black/[0.07]"
            style={{
              width: `${r * 2}%`,
              height: `${r * 2}%`,
              left: `${50 - r}%`,
              top: `${50 - r}%`,
            }}
          />
        );
      })}

      {([0, 1] as OrbitRing[]).map((ringIdx) => (
        <Ring
          key={`ring-${ringIdx}`}
          ringIdx={ringIdx}
          activeId={activeTool.id}
          onActivate={activateById}
          onPin={() => setPinned(true)}
        />
      ))}

      <ActivationOverlay tool={activeTool} />
    </div>
  );
}

function Ring({
  ringIdx,
  activeId,
  onActivate,
  onPin,
}: {
  ringIdx: OrbitRing;
  activeId: Tool["id"];
  onActivate: (id: Tool["id"]) => void;
  onPin: () => void;
}) {
  const ringTools = useMemo(() => toolsByRing[ringIdx], [ringIdx]);
  const radius = RING_RADIUS[ringIdx];
  const duration = RING_DURATION[ringIdx];
  const direction = RING_DIRECTION[ringIdx];
  const angleOffset = ringIdx === 1 ? 45 : 0;

  return (
    <div
      className="orbit-ring absolute inset-0"
      style={
        {
          "--orbit-duration": `${duration}s`,
          "--orbit-direction": direction === -1 ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      {ringTools.map((tool, i) => {
        const angle =
          (i / ringTools.length) * 360 - 90 + angleOffset;
        const cx = 50 + Math.cos((angle * Math.PI) / 180) * radius;
        const cy = 50 + Math.sin((angle * Math.PI) / 180) * radius;
        return (
          <ToolNode
            key={tool.id}
            tool={tool}
            cx={cx}
            cy={cy}
            isActive={tool.id === activeId}
            onActivate={onActivate}
            onPin={onPin}
          />
        );
      })}
    </div>
  );
}

function ToolNode({
  tool,
  cx,
  cy,
  isActive,
  onActivate,
  onPin,
}: {
  tool: Tool;
  cx: number;
  cy: number;
  isActive: boolean;
  onActivate: (id: Tool["id"]) => void;
  onPin: () => void;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${cx}%`,
        top: `${cy}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="orbit-counter">
        <button
          type="button"
          onClick={() => {
            onActivate(tool.id);
            onPin();
          }}
          onPointerEnter={() => onActivate(tool.id)}
          onFocus={() => onActivate(tool.id)}
          aria-label={`${tool.name} — show example prompt`}
          aria-pressed={isActive}
          data-active={isActive || undefined}
          className="orbit-node relative flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
        >
          <Image
            src={tool.logo}
            alt=""
            width={36}
            height={36}
            className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9"
            unoptimized
          />
        </button>
      </div>
    </div>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

function ActivationOverlay({ tool }: { tool: Tool }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={tool.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="pointer-events-auto w-[70%] max-w-[360px] sm:w-[56%]"
        >
          <article className="rounded-2xl bg-white/95 p-4 ring-1 ring-black/[0.06] shadow-[0_18px_48px_-22px_rgba(11,11,12,0.30),0_2px_6px_rgba(11,11,12,0.05)] backdrop-blur-sm sm:p-5">
            <header className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.06)]"
              >
                <Image
                  src={tool.logo}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                  unoptimized
                />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                  Prompt
                </span>
                <span className="text-[12px] font-semibold text-ink">
                  {tool.name}
                </span>
              </div>
            </header>

            <motion.p
              key={`prompt-${tool.id}`}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="mt-3 text-[14px] font-medium leading-snug text-ink sm:text-[15px]"
            >
              <span className="text-muted">&ldquo;</span>
              {tool.prompt}
              <span className="text-muted">&rdquo;</span>
            </motion.p>
          </article>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Orbit;
