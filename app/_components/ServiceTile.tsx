import Link from "next/link";
import { pricingNote, type Service, type ServiceAccent } from "@/data/services";

const accentClass: Record<ServiceAccent, string> = {
  mint: "pastel-mint",
  peach: "pastel-peach",
  sky: "pastel-sky",
  lilac: "pastel-lilac",
};

const accentLineColor: Record<ServiceAccent, string> = {
  mint: "var(--pastel-mint-ink)",
  peach: "var(--pastel-peach-ink)",
  sky: "var(--pastel-sky-ink)",
  lilac: "var(--pastel-lilac-ink)",
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

function ServiceIcon({ id }: { id: Service["id"] }) {
  switch (id) {
    case "intro":
      return (
        <svg {...svgProps}>
          <path d="M12 4l1.7 5.3L19 11l-5.3 1.7L12 18l-1.7-5.3L5 11l5.3-1.7L12 4z" />
          <path d="M19 4l.6 1.4L21 6l-1.4.6L19 8l-.6-1.4L17 6l1.4-.6L19 4z" />
        </svg>
      );
    case "deep-dive":
      return (
        <svg {...svgProps}>
          <path d="M6 7l6 6 6-6" />
          <path d="M6 13l6 6 6-6" />
        </svg>
      );
    case "sprint":
      return (
        <svg {...svgProps}>
          <rect x="3" y="13" width="7" height="7" rx="1.2" />
          <rect x="14" y="13" width="7" height="7" rx="1.2" />
          <rect x="8.5" y="3" width="7" height="7" rx="1.2" />
        </svg>
      );
    case "retainer":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v5l3.5 2.2" />
        </svg>
      );
  }
}

type ServiceTileProps = {
  service: Service;
};

export function ServiceTile({ service }: ServiceTileProps) {
  const { id, name, duration, description, bullets, cta, accent } = service;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl bg-card p-6 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(11,11,12,0.22),0_2px_8px_rgba(11,11,12,0.04)] hover:ring-black/[0.10] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accentClass[accent]} transition-transform duration-300 group-hover:-rotate-3`}
        >
          <ServiceIcon id={id} />
        </span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-muted tabular-nums">
          {duration}
        </span>
      </div>

      <h3 className="mt-7 font-display text-xl font-semibold leading-tight tracking-tight sm:text-[22px]">
        {name}
      </h3>

      <span
        aria-hidden
        className="mt-3 block h-[2px] w-8 rounded-full transition-[width] duration-300 group-hover:w-14"
        style={{ backgroundColor: accentLineColor[accent] }}
      />

      <p className="mt-4 text-[15px] leading-relaxed text-ink/85">
        {description}
      </p>

      <ul className="mt-5 space-y-2.5">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex gap-2.5 text-[14px] leading-relaxed text-muted"
          >
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted/60"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div aria-hidden className="mt-8 grow" />

      <div className="flex items-end justify-between gap-3 border-t border-border pt-5">
        <span className="text-xs font-medium text-ink">{pricingNote}</span>
        <Link
          href="#book"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-transform group-hover:translate-x-0.5"
        >
          {cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
