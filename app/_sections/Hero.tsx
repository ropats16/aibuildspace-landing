import Image from "next/image";
import Link from "next/link";
import { Container } from "@/app/_components/Container";
import { ExampleCard } from "@/app/_components/ExampleCard";
import { heroExamples } from "@/data/examples";
import { site } from "@/data/site";

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
            <Image
              src={site.headshot}
              alt="Rohit"
              width={48}
              height={48}
              unoptimized
              loading="eager"
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white shadow-[0_2px_8px_rgba(11,11,12,0.12)]"
            />
            <Link
              href="#book"
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              Book a call with Rohit
            </Link>
            <Link
              href="#examples"
              className="inline-flex h-11 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-ink transition-colors hover:bg-border/40"
            >
              See what I build
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted">
            Global · timezone-flexible
          </p>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              Recent builds
            </span>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {heroExamples.map((example) => (
              <ExampleCard key={example.id} example={example} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
