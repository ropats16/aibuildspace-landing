import { ExampleCard } from "@/app/_components/ExampleCard";
import { Section } from "@/app/_components/Section";
import { examples } from "@/data/examples";

export function Examples() {
  return (
    <Section
      id="examples"
      eyebrow="Things you could ask for"
      title="Eight example workflows."
      lede="Each card is a prompt for a workflow you might find yourself performing regularly."
    >
      <ul
        className="
          mt-8 grid gap-5 sm:gap-6 lg:mt-10
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-6
          lg:grid-cols-4
        "
      >
        {examples.map((example) => (
          <li
            key={example.id}
            className="
              flex
              md:col-span-2
              lg:col-span-1
              md:[&:nth-child(7)]:col-start-2
              lg:[&:nth-child(7)]:col-start-auto
            "
          >
            <ExampleCard example={example} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
