import { PlaceholderNote, Section } from "@/app/_components/Section";

export function Watch() {
  return (
    <Section
      id="watch"
      eyebrow="Watch me build"
      title="Live workshops on YouTube."
      lede="Every workshop is recorded and shipped public — pre-evaluate the teaching style."
    >
      <PlaceholderNote>
        3–6 YouTube workshop tiles + workshop count badge + “Now building …”
        line ship in Phase 6.
      </PlaceholderNote>
    </Section>
  );
}
