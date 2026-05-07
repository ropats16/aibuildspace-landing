import Image from "next/image";
import Link from "next/link";
import { Container } from "@/app/_components/Container";
import { HeroVisual } from "./HeroVisual";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative pt-10 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-16">
      <Container>
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
          <div>
            <Image
              src={site.headshot}
              alt="Rohit"
              width={256}
              height={256}
              priority
              className="mb-6 h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-[0_10px_32px_-10px_rgba(11,11,12,0.22),0_2px_6px_rgba(11,11,12,0.06)] sm:mb-7 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
            />
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Work smarter with AI.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Hand-off-able workflows for solopreneurs, owners, and founders.
              Sessions, workshops, and custom builds — you own what we ship.
            </p>

            <div className="mt-7">
              <Link
                href="#book"
                className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
              >
                Book a call with Rohit
              </Link>
            </div>
          </div>

          <div className="lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
