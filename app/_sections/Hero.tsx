import Link from "next/link";
import { Container } from "@/app/_components/Container";

export function Hero() {
  return (
    <section className="relative pt-16 pb-24 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.18em] text-muted">
            AI Buildspace · by Rohit
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Work smarter with AI.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Hand-off-able workflows for solopreneurs, owners, and founders.
            Sessions, workshops, and custom builds — you own what we ship.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#book"
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink hover:opacity-90"
            >
              Book a call with Rohit
            </Link>
            <Link
              href="#examples"
              className="inline-flex h-11 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-ink hover:bg-border/40"
            >
              See what I build
            </Link>
            <span className="ml-1 text-xs text-muted">
              Global · timezone-flexible
            </span>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-sm text-muted">
          Hero centerpiece — kinetic orbit + composed prompt / outcome cards —
          ships in Phase 3. Reduced-motion 4-card fallback ships in Phase 2.
        </div>
      </Container>
    </section>
  );
}
