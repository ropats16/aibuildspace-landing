import type { Example, ExampleCategory } from "@/data/examples";
import { artifactComponents } from "./artifacts";

const categoryDot: Record<ExampleCategory, string> = {
  mail: "bg-blue-500",
  deck: "bg-violet-500",
  slack: "bg-emerald-500",
  video: "bg-orange-500",
};

const categoryLabel: Record<ExampleCategory, string> = {
  mail: "Email",
  deck: "Document",
  slack: "Message",
  video: "Video",
};

export function ExampleCard({ example }: { example: Example }) {
  const Artifact = artifactComponents[example.artifact];

  return (
    <article
      className="group relative flex flex-col gap-5 rounded-2xl bg-card p-5 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_28px_-12px_rgba(11,11,12,0.18)] sm:p-6"
      data-category={example.category}
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${categoryDot[example.category]}`}
            aria-hidden
          />
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            Prompt
          </span>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted/70">
          → {categoryLabel[example.category]}
        </span>
      </header>

      <p className="text-[15px] font-medium leading-snug text-ink sm:text-base">
        <span className="text-muted">&ldquo;</span>
        {example.prompt}
        <span className="text-muted">&rdquo;</span>
      </p>

      <div
        className="relative flex flex-1 items-center justify-center rounded-xl p-3 sm:p-4"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, var(--glow-${example.category}) 0%, transparent 70%)`,
        }}
      >
        <div className="w-full">
          <Artifact />
        </div>
      </div>
    </article>
  );
}
