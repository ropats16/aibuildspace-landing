import { PlaceholderNote, Section } from "@/app/_components/Section";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Pick the entry point that fits."
      lede="Intro · Workshop · Custom Build Sprint · Optional Retainer. Quote on call."
    >
      <PlaceholderNote>
        Four-tier service ladder with workshop 1:1 / Team toggle ships in
        Phase 4. Each tile CTAs to <code className="rounded bg-border/40 px-1">#book</code>.
      </PlaceholderNote>
    </Section>
  );
}
