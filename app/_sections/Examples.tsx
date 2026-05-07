import { ExampleCard } from "@/app/_components/ExampleCard";
import { Section } from "@/app/_components/Section";
import { examples } from "@/data/examples";

export function Examples() {
  return (
    <Section
      id="examples"
      eyebrow="Examples"
      title="Eight example workflows."
      lede="Each card is a prompt for a workflow you might find yourself performing regularly."
    >
      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-4">
        {examples.map((example) => (
          <li key={example.id} className="flex">
            <ExampleCard example={example} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
