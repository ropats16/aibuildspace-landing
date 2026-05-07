import Image from "next/image";
import type { Example, ExampleAccent } from "@/data/examples";
import { artifactComponents } from "./artifacts";

type AccentClasses = {
  arrowBg: string;
  arrowText: string;
  ring: string;
};

const accentMap: Record<ExampleAccent, AccentClasses> = {
  amber: {
    arrowBg: "bg-amber-50",
    arrowText: "text-amber-700",
    ring: "ring-amber-200/70",
  },
  indigo: {
    arrowBg: "bg-indigo-50",
    arrowText: "text-indigo-700",
    ring: "ring-indigo-200/70",
  },
  violet: {
    arrowBg: "bg-violet-50",
    arrowText: "text-violet-700",
    ring: "ring-violet-200/70",
  },
  orange: {
    arrowBg: "bg-orange-50",
    arrowText: "text-orange-700",
    ring: "ring-orange-200/70",
  },
  rose: {
    arrowBg: "bg-rose-50",
    arrowText: "text-rose-700",
    ring: "ring-rose-200/70",
  },
  emerald: {
    arrowBg: "bg-emerald-50",
    arrowText: "text-emerald-700",
    ring: "ring-emerald-200/70",
  },
  teal: {
    arrowBg: "bg-teal-50",
    arrowText: "text-teal-700",
    ring: "ring-teal-200/70",
  },
  red: {
    arrowBg: "bg-red-50",
    arrowText: "text-red-700",
    ring: "ring-red-200/70",
  },
};

function FallbackIcon({ category }: { category: Example["category"] }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6 text-ink/70",
    "aria-hidden": true,
  };
  if (category === "video") {
    return (
      <svg {...props}>
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M10.5 10.5l4 1.5-4 1.5z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
    </svg>
  );
}

export function ExampleCard({ example }: { example: Example }) {
  const Artifact = artifactComponents[example.artifact];
  const a = accentMap[example.accent];

  return (
    <article
      tabIndex={0}
      data-accent={example.accent}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-card p-5 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-22px_rgba(11,11,12,0.22)] hover:ring-black/[0.10]"
    >
      <header className="flex items-start justify-between gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center">
          {example.logo ? (
            <Image
              src={example.logo}
              alt={example.logoAlt ?? ""}
              width={32}
              height={32}
              className="h-7 w-7 object-contain"
              unoptimized
            />
          ) : (
            <FallbackIcon category={example.category} />
          )}
        </span>
        <span
          aria-hidden
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 transition-transform duration-300 group-hover:translate-x-0.5 ${a.arrowBg} ${a.arrowText} ${a.ring}`}
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

      <h3 className="mt-4 font-display text-[17px] font-semibold leading-tight tracking-tight text-ink">
        {example.outcomeLabel}
      </h3>

      <p
        className="mt-1.5 text-[13px] leading-snug text-muted"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "calc(1.4em * 3)",
        }}
      >
        &ldquo;{example.prompt}&rdquo;
      </p>

      <div className="mt-4 h-[140px] w-full">
        <Artifact />
      </div>
    </article>
  );
}
