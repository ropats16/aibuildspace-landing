import { ExampleCard } from "@/app/_components/ExampleCard";
import { Section } from "@/app/_components/Section";
import { examples } from "@/data/examples";

export function Examples() {
  return (
    <Section
      id="examples"
      eyebrow="Examples"
      title="Six example workflows."
      lede="Each card pairs a composed prompt with a mini artifact preview — the kind of single-purpose, hand-off-able systems we'd build together."
    >
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-3">
        {examples.map((example) => (
          <li key={example.id} className="flex">
            <ExampleCard example={example} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
