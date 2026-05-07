import type { Example, ExampleTone } from "@/data/examples";
import { artifactComponents } from "./artifacts";

const toneClass: Record<ExampleTone, string> = {
  mint: "pastel-mint",
  peach: "pastel-peach",
  lemon: "pastel-lemon",
  rose: "pastel-rose",
  sky: "pastel-sky",
  lilac: "pastel-lilac",
};

export function ExampleCard({ example }: { example: Example }) {
  const Artifact = artifactComponents[example.artifact];

  return (
    <article
      tabIndex={0}
      data-tone={example.tone}
      className={`group relative flex w-full flex-col overflow-hidden rounded-3xl ${toneClass[example.tone]} p-6 ring-1 ring-black/[0.04] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_44px_-22px_rgba(11,11,12,0.22)] focus-visible:shadow-[0_18px_44px_-22px_rgba(11,11,12,0.28)] sm:p-7`}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold leading-tight tracking-tight text-current sm:text-[22px]">
          {example.outcomeLabel}
        </h3>
        <span
          aria-hidden
          className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/60 text-current ring-1 ring-black/[0.04] transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
            aria-hidden
          >
            <path d="M3 6h6M7 3l3 3-3 3" />
          </svg>
        </span>
      </header>

      <p className="mt-3 text-[14px] font-medium leading-snug text-current/85 sm:text-[15px]">
        <span className="opacity-60">&ldquo;</span>
        {example.prompt}
        <span className="opacity-60">&rdquo;</span>
      </p>

      <div className="mt-5 flex flex-1 items-end">
        <div className="w-full">
          <Artifact />
        </div>
      </div>
    </article>
  );
}
