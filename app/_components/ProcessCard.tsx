import type { ProcessAccent, ProcessStep } from "@/data/process";

const accentBadge: Record<ProcessAccent, string> = {
  teal: "bg-teal-100 text-teal-700",
  indigo: "bg-indigo-100 text-indigo-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
};

const accentLine: Record<ProcessAccent, string> = {
  teal: "bg-teal-500",
  indigo: "bg-indigo-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

const accentNumeral: Record<ProcessAccent, string> = {
  teal: "text-teal-700",
  indigo: "text-indigo-700",
  amber: "text-amber-700",
  rose: "text-rose-700",
};

const accentChip: Record<ProcessAccent, string> = {
  teal: "bg-teal-50 text-teal-700",
  indigo: "bg-indigo-50 text-indigo-700",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-700",
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
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(11,11,12,0.22),0_2px_8px_rgba(11,11,12,0.04)] hover:ring-black/[0.10] sm:p-7">
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-2 -top-4 select-none font-display text-[96px] font-semibold leading-none tabular-nums tracking-[-0.05em] opacity-15 transition-opacity duration-300 group-hover:opacity-25 ${accentNumeral[step.accent]}`}
      >
        {num}
      </span>

      <div className="relative flex items-center justify-between gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accentBadge[step.accent]} transition-transform duration-300 group-hover:-rotate-3`}
        >
          <ProcessIcon id={step.id} />
        </span>
      </div>

      <h3 className="relative mt-7 font-display text-xl font-semibold leading-tight tracking-tight sm:text-[22px]">
        {step.title}
      </h3>

      <span
        aria-hidden
        className={`relative mt-3 block h-[2px] w-8 rounded-full transition-[width] duration-300 group-hover:w-14 ${accentLine[step.accent]}`}
      />

      <p className="relative mt-4 text-[15px] leading-relaxed text-ink/85">
        {step.body}
      </p>

      <div aria-hidden className="grow" />

      <div className="relative mt-6 flex items-center border-t border-border pt-5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide ${accentChip[step.accent]}`}
        >
          {step.duration}
        </span>
      </div>
    </article>
  );
}
