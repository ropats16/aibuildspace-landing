import { Section } from "@/app/_components/Section";
import { BuildTile } from "@/app/_components/BuildTile";
import { builds, recentBuildsAvailability } from "@/data/builds";

export function RecentBuilds() {
  return (
    <Section
      id="builds"
      eyebrow="In the wild"
      title="Workshops, live tools, and shipped projects."
      lede="A mix of public teaching and real systems. Each card links to the actual thing."
    >
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
        {builds.map((build) => (
          <li key={build.id} className="flex">
            <BuildTile build={build} />
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted">
        <span className="text-[10px] font-medium tracking-[0.18em] text-accent">
          Status ·{" "}
        </span>
        <span className="italic text-ink">{recentBuildsAvailability}</span>
      </p>
    </Section>
  );
}
