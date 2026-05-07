import { Section } from "@/app/_components/Section";
import { ServiceTile } from "@/app/_components/ServiceTile";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Pick the entry point that fits."
      lede="Start small or dive right in. A tailored plan for everyone. Pricing is quote-based and scoped on the call. You will know all the details before we start."
    >
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.id} className="h-full">
            <ServiceTile service={service} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
