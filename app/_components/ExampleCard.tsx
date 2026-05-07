import type { Example, ExampleAccent } from "@/data/examples";
import { artifactComponents } from "./artifacts";

type AccentClasses = {
  chip: string;
  dot: string;
  arrowBg: string;
  arrowText: string;
  quote: string;
};

const accentMap: Record<ExampleAccent, AccentClasses> = {
  amber: {
    chip: "bg-amber-100 text-amber-800",
    dot: "bg-amber-500",
    arrowBg: "bg-amber-50 ring-amber-200/60",
    arrowText: "text-amber-700",
    quote: "text-amber-500",
  },
  indigo: {
    chip: "bg-indigo-100 text-indigo-800",
    dot: "bg-indigo-500",
    arrowBg: "bg-indigo-50 ring-indigo-200/60",
    arrowText: "text-indigo-700",
    quote: "text-indigo-500",
  },
  violet: {
    chip: "bg-violet-100 text-violet-800",
    dot: "bg-violet-500",
    arrowBg: "bg-violet-50 ring-violet-200/60",
    arrowText: "text-violet-700",
    quote: "text-violet-500",
  },
  orange: {
    chip: "bg-orange-100 text-orange-800",
    dot: "bg-orange-500",
    arrowBg: "bg-orange-50 ring-orange-200/60",
    arrowText: "text-orange-700",
    quote: "text-orange-500",
  },
  rose: {
    chip: "bg-rose-100 text-rose-800",
    dot: "bg-rose-500",
    arrowBg: "bg-rose-50 ring-rose-200/60",
    arrowText: "text-rose-700",
    quote: "text-rose-500",
  },
  emerald: {
    chip: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
    arrowBg: "bg-emerald-50 ring-emerald-200/60",
    arrowText: "text-emerald-700",
    quote: "text-emerald-500",
  },
  teal: {
    chip: "bg-teal-100 text-teal-800",
    dot: "bg-teal-500",
    arrowBg: "bg-teal-50 ring-teal-200/60",
    arrowText: "text-teal-700",
    quote: "text-teal-500",
  },
  red: {
    chip: "bg-red-100 text-red-800",
    dot: "bg-red-500",
    arrowBg: "bg-red-50 ring-red-200/60",
    arrowText: "text-red-700",
    quote: "text-red-500",
  },
};

const categoryLabel: Record<Example["category"], string> = {
  mail: "Mail",
  deck: "Deck",
  slack: "Slack",
  video: "Video",
  code: "Code",
};

export function ExampleCard({ example }: { example: Example }) {
  const Artifact = artifactComponents[example.artifact];
  const a = accentMap[example.accent];

  return (
    <article
      tabIndex={0}
      data-accent={example.accent}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-card p-5 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-22px_rgba(11,11,12,0.22)] hover:ring-black/[0.10] focus-visible:shadow-[0_18px_44px_-22px_rgba(11,11,12,0.28)] sm:p-6"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${a.chip}`}
          >
            <span aria-hidden className={`h-1 w-1 rounded-full ${a.dot}`} />
            {categoryLabel[example.category]}
          </span>
          <h3 className="mt-2.5 font-display text-[17px] font-semibold leading-tight tracking-tight text-ink sm:text-[18px]">
            {example.outcomeLabel}
          </h3>
        </div>
        <span
          aria-hidden
          className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 transition-transform duration-300 group-hover:translate-x-0.5 ${a.arrowBg} ${a.arrowText}`}
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
            aria-hidden
          >
            <path d="M3 6h6M7 3l3 3-3 3" />
          </svg>
        </span>
      </header>

      <p
        className="mt-3 text-[13px] leading-snug text-ink/80 sm:text-[13.5px]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "calc(1.4em * 3)",
        }}
      >
        <span className={`font-semibold ${a.quote}`}>&ldquo;</span>
        {example.prompt}
        <span className={`font-semibold ${a.quote}`}>&rdquo;</span>
      </p>

      <div className="mt-4 h-[200px] w-full">
        <Artifact />
      </div>
    </article>
  );
}
