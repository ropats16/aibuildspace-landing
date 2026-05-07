import Image from "next/image";
import Link from "next/link";
import { Container } from "@/app/_components/Container";
import { HeroVisual } from "./HeroVisual";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative pt-10 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-14">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted">
              AI Buildspace · by Rohit
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Work smarter with AI.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Hand-off-able workflows for solopreneurs, owners, and founders.
              Sessions, workshops, and custom builds — you own what we ship.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
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

            <p className="mt-3 text-xs text-muted">
              Global · timezone-flexible
            </p>
          </div>

          <div className="lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
