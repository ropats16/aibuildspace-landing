import { PlaceholderNote, Section } from "@/app/_components/Section";

export function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="The straight answers."
      lede="Pricing, timelines, what I don't build, tools, handoff, NDAs."
    >
      <PlaceholderNote>
        6-question accordion ships in Phase 6.
      </PlaceholderNote>
    </Section>
  );
}
