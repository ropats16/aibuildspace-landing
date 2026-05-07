import Link from "next/link";
import type { ReactNode } from "react";
import { pricingNote } from "@/data/services";

type ServiceTileProps = {
  name: string;
  meta?: string;
  duration: string;
  description: string;
  bullets: string[];
  cta: string;
  topSlot?: ReactNode;
};

export function ServiceTile({
  name,
  meta,
  duration,
  description,
  bullets,
  cta,
  topSlot,
}: ServiceTileProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl bg-card p-6 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:shadow-[0_8px_28px_-12px_rgba(11,11,12,0.18)] hover:ring-black/[0.10] sm:p-7">
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
          {name}
        </h3>
        {meta && (
          <span className="shrink-0 rounded-full bg-border/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            {meta}
          </span>
        )}
      </header>

      {topSlot}

      <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-muted/80 tabular-nums">
        {duration}
      </p>

      <p className="mt-4 text-[15px] leading-relaxed text-ink/90">
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

      <div className="mt-6 flex items-end justify-between gap-3 border-t border-border pt-5">
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
