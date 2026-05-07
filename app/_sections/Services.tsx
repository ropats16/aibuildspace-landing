import { Section } from "@/app/_components/Section";
import { ServiceTile } from "@/app/_components/ServiceTile";
import { WorkshopTile } from "@/app/_components/WorkshopTile";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Pick the entry point that fits."
      lede="Start small, go deeper when it earns it. Pricing is quote-based and scoped on the call — no hidden surprises."
    >
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.id}>
            {service.id === "workshop" ? (
              <WorkshopTile service={service} />
            ) : (
              <ServiceTile
                name={service.name}
                meta={service.meta}
                duration={service.duration}
                description={service.description}
                bullets={service.bullets}
                cta={service.cta}
              />
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
