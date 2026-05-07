import { ExampleCard } from "@/app/_components/ExampleCard";
import { Section } from "@/app/_components/Section";
import { examples } from "@/data/examples";

export function Examples() {
  return (
    <Section
      id="examples"
      eyebrow="Examples"
      title="Eight example workflows."
      lede="Each card pairs a real prompt with a quick artifact preview. The kind of single-purpose systems we build together, for operators and engineers."
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
