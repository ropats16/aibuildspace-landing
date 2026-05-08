import { Section } from "@/app/_components/Section";
import { faq } from "@/data/faq";

export function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="The straight answers."
      lede="Pricing, timelines, what I do not build, tools, handoff."
    >
      <ul className="mt-8 divide-y divide-border/60 border-y border-border/60 lg:mt-10">
        {faq.map((item) => (
          <li key={item.id}>
            <details className="group py-5 sm:py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left focus-visible:outline-none">
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
                  {item.question}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform duration-200 group-open:rotate-45 group-open:border-ink group-open:text-ink"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl pr-12 text-base leading-relaxed text-muted sm:text-[17px]">
                {item.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
