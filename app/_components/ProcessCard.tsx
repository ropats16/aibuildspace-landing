import type { ProcessAccent, ProcessStep } from "@/data/process";

const pastelClass: Record<ProcessAccent, string> = {
  mint: "pastel-mint",
  peach: "pastel-peach",
  lemon: "pastel-lemon",
  sky: "pastel-sky",
};

const pastelInk: Record<ProcessAccent, string> = {
  mint: "var(--pastel-mint-ink)",
  peach: "var(--pastel-peach-ink)",
  lemon: "var(--pastel-lemon-ink)",
  sky: "var(--pastel-sky-ink)",
};

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-[22px] w-[22px]",
};

function ProcessIcon({ id }: { id: ProcessStep["id"] }) {
  switch (id) {
    case "discovery":
      return (
        <svg {...svgProps}>
          <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
          <circle cx="9" cy="10.5" r="0.6" fill="currentColor" />
          <circle cx="12" cy="10.5" r="0.6" fill="currentColor" />
          <circle cx="15" cy="10.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "scope":
      return (
        <svg {...svgProps}>
          <rect x="6" y="4" width="12" height="17" rx="1.5" />
          <path d="M9 4v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
          <path d="M9 11h6M9 15h4" />
        </svg>
      );
    case "build":
      return (
        <svg {...svgProps}>
          <path d="M14 5l5 5-2 2-5-5 2-2z" />
          <path d="M12 7L4 15v5h5l8-8" />
        </svg>
      );
    case "support":
      return (
        <svg {...svgProps}>
          <path d="M3.5 12a8.5 8.5 0 0 1 14.5-6" />
          <polyline points="14 2.5 18 6 14.5 9.5" />
          <path d="M20.5 12a8.5 8.5 0 0 1-14.5 6" />
          <polyline points="10 21.5 6 18 9.5 14.5" />
        </svg>
      );
  }
}

type ProcessCardProps = {
  step: ProcessStep;
  index: number;
};

export function ProcessCard({ step, index }: ProcessCardProps) {
  const ink = pastelInk[step.accent];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(11,11,12,0.22),0_2px_8px_rgba(11,11,12,0.04)] hover:ring-black/[0.10] sm:p-7">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[96px] font-semibold leading-none tabular-nums tracking-[-0.05em] opacity-[0.10] transition-opacity duration-300 group-hover:opacity-[0.18]"
        style={{ color: ink }}
      >
        {num}
      </span>

      <div className="relative flex items-center justify-between gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${pastelClass[step.accent]} transition-transform duration-300 group-hover:-rotate-3`}
        >
          <ProcessIcon id={step.id} />
        </span>
      </div>

      <h3 className="relative mt-7 font-display text-xl font-semibold leading-tight tracking-tight sm:text-[22px]">
        {step.title}
      </h3>

      <span
        aria-hidden
        className="relative mt-3 block h-[2px] w-8 rounded-full transition-[width] duration-300 group-hover:w-14"
        style={{ background: ink }}
      />

      <p className="relative mt-4 text-[15px] leading-relaxed text-ink/85">
        {step.body}
      </p>

      <div aria-hidden className="grow" />

      <div className="relative mt-6 flex items-center border-t border-border pt-5">
        <span
          className={`inline-flex items-center rounded-full ${pastelClass[step.accent]} px-2.5 py-1 text-[11px] font-medium tracking-wide`}
        >
          {step.duration}
        </span>
      </div>
    </article>
  );
}
