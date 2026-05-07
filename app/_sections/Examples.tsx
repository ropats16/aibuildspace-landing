import { PlaceholderNote, Section } from "@/app/_components/Section";

export function Examples() {
  return (
    <Section
      id="examples"
      eyebrow="Examples"
      title="Six example workflows."
      lede="Composed prompts paired with mini artifact previews. Built inline (no screenshots)."
    >
      <PlaceholderNote>
        Six-card grid (email digest, report mock, slide thumbs, inbox draft,
        vertical reel, Slack message) ships in Phase 5.
      </PlaceholderNote>
    </Section>
  );
}
