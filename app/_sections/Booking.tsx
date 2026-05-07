import { CalEmbedLazy } from "@/app/_components/CalEmbedLazy";
import { Container } from "@/app/_components/Container";
import { LeadForm } from "@/app/_components/LeadForm";

export function Booking() {
  return (
    <section id="book" className="scroll-mt-20 py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted">
            Book
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Book direct, or describe your problem first.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            15–30 min discovery call. No prep needed — show up with the
            workflow you want to fix.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <CalEmbedLazy />
          </div>
          <LeadForm />
        </div>
      </Container>
    </section>
  );
}
