"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { artifactComponents } from "@/app/_components/artifacts";
import { examples, type Example, type ExampleCategory } from "@/data/examples";
import { tools, type Tool } from "@/data/tools";

const RING_RADIUS = [22, 35, 47] as const;
const RING_DURATION = [70, 95, 130] as const;
const RING_DIRECTION = [1, -1, 1] as const;

const CYCLE_MS = 5500;
const PIN_MS = 6000;

const categoryDot: Record<ExampleCategory, string> = {
  mail: "bg-blue-500",
  deck: "bg-violet-500",
  slack: "bg-emerald-500",
  video: "bg-orange-500",
};

const categoryLabel: Record<ExampleCategory, string> = {
  mail: "Email",
  deck: "Document",
  slack: "Message",
  video: "Video",
};

export function Orbit() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const paused = hovered || pinned;

  const activeTool = tools[activeIdx];
  const activeExample = useMemo<Example>(() => {
    const found = examples.find((e) => e.id === activeTool.exampleId);
    if (!found) throw new Error(`Unknown example for tool ${activeTool.id}`);
    return found;
  }, [activeTool]);

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
      aria-label="Tools and example workflows. Use left and right arrow keys to cycle."
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
      className="orbit-root relative mx-auto aspect-square w-full max-w-[640px] outline-none"
    >
      {[0, 1, 2].map((ringIdx) => {
        const r = RING_RADIUS[ringIdx];
        return (
          <div
            key={`guide-${ringIdx}`}
            aria-hidden
            className="orbit-guide pointer-events-none absolute rounded-full border border-dashed border-black/[0.07]"
            style={{
              width: `${r * 2}%`,
              height: `${r * 2}%`,
              left: `${50 - r}%`,
              top: `${50 - r}%`,
            }}
          />
        );
      })}

      {[0, 1, 2].map((ringIdx) => (
        <Ring
          key={`ring-${ringIdx}`}
          ringIdx={ringIdx as 0 | 1 | 2}
          activeId={activeTool.id}
          onActivate={activateById}
          onPin={() => setPinned(true)}
        />
      ))}

      <ActivationOverlay tool={activeTool} example={activeExample} />
    </div>
  );
}

function Ring({
  ringIdx,
  activeId,
  onActivate,
  onPin,
}: {
  ringIdx: 0 | 1 | 2;
  activeId: Tool["id"];
  onActivate: (id: Tool["id"]) => void;
  onPin: () => void;
}) {
  const ringTools = useMemo(
    () => tools.filter((t) => t.ring === ringIdx),
    [ringIdx]
  );
  const radius = RING_RADIUS[ringIdx];
  const duration = RING_DURATION[ringIdx];
  const direction = RING_DIRECTION[ringIdx];

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
        const angle = (i / ringTools.length) * 360 - 90;
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
          aria-label={`${tool.name} — show example workflow`}
          aria-pressed={isActive}
          data-active={isActive || undefined}
          className="orbit-node relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-[0_1px_3px_rgba(11,11,12,0.08),0_0_0_1px_rgba(11,11,12,0.05)] transition-[transform,box-shadow,background-color,opacity] duration-300 hover:scale-110 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
        >
          <span
            aria-hidden
            className="orbit-logo block h-5 w-5 sm:h-[22px] sm:w-[22px] lg:h-6 lg:w-6"
            style={
              {
                "--orbit-logo-src": `url(${tool.logo})`,
              } as React.CSSProperties
            }
          />
        </button>
      </div>
    </div>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.97,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

function ActivationOverlay({
  tool,
  example,
}: {
  tool: Tool;
  example: Example;
}) {
  const Artifact = artifactComponents[example.artifact];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={tool.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="pointer-events-auto relative w-[80%] max-w-[420px] sm:w-[68%]"
        >
          <article
            className="rounded-2xl bg-card/95 p-4 ring-1 ring-black/[0.06] shadow-[0_12px_36px_-18px_rgba(11,11,12,0.30),0_2px_6px_rgba(11,11,12,0.06)] backdrop-blur-sm sm:p-5"
            style={{
              backgroundImage: `radial-gradient(120% 90% at 50% 0%, var(--glow-${example.category}) 0%, transparent 70%)`,
            }}
          >
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink ring-1 ring-black/[0.08] shadow-[0_1px_2px_rgba(11,11,12,0.06)]"
                >
                  <span
                    aria-hidden
                    className="orbit-logo block h-4 w-4"
                    style={
                      {
                        "--orbit-logo-src": `url(${tool.logo})`,
                      } as React.CSSProperties
                    }
                  />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                    Prompt · {tool.name}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted/70">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${categoryDot[example.category]}`}
                      aria-hidden
                    />
                    {categoryLabel[example.category]}
                  </span>
                </div>
              </div>
            </header>

            <motion.p
              key={`prompt-${tool.id}`}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
              className="mt-3 text-[13px] font-medium leading-snug text-ink sm:text-sm"
            >
              <span className="text-muted">&ldquo;</span>
              {example.prompt}
              <span className="text-muted">&rdquo;</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 rounded-xl p-2 sm:p-3"
            >
              <Artifact />
            </motion.div>
          </article>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Orbit;
