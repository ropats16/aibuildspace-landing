import { ProcessCard } from "@/app/_components/ProcessCard";
import { Section } from "@/app/_components/Section";
import { processSteps } from "@/data/process";

export function HowIWork() {
  return (
    <Section
      id="how"
      eyebrow="How I work"
      title="Discovery, scope, build, support."
      lede="Four steps. Most engagements run from a 60 to 90 minute call to a system you can run yourself in 1 to 2 weeks."
    >
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <li key={step.id} className="h-full">
            <ProcessCard step={step} index={i} />
          </li>
        ))}
      </ol>
    </Section>
  );
}
