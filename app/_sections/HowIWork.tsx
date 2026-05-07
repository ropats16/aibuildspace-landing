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
      <ol className="mt-8 grid gap-4 sm:gap-5 lg:mt-10 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <li
            key={step.id}
            className="group relative flex flex-col rounded-2xl bg-card p-6 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_28px_-12px_rgba(11,11,12,0.18)] sm:p-7"
          >
            <span
              aria-hidden
              className="font-display text-xs font-medium tabular-nums tracking-[0.18em] text-muted/70"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
