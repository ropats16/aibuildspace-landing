import { Section } from "@/app/_components/Section";
import { WatchTile } from "@/app/_components/WatchTile";
import { nowBuilding, workshopCount, workshops } from "@/data/workshops";

export function Watch() {
  return (
    <Section
      id="watch"
      eyebrow="Watch me build"
      title="Live workshops on YouTube."
      lede="Every workshop is recorded and shipped public — pre-evaluate the teaching style before you book."
    >
      <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        <span className="tabular-nums text-ink">{workshopCount}+</span>
        workshops hosted live
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
        {workshops.map((workshop) => (
          <li key={workshop.id} className="flex">
            <WatchTile workshop={workshop} />
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
          Now building ·{" "}
        </span>
        <span className="italic text-ink">{nowBuilding}</span>
      </p>
    </Section>
  );
}
