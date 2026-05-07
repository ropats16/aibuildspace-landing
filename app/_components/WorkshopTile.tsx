"use client";

import { useId, useState } from "react";
import { ServiceTile } from "./ServiceTile";
import type { Service } from "@/data/services";

export function WorkshopTile({ service }: { service: Service }) {
  const variants = service.variants ?? [];
  const [activeId, setActiveId] = useState(variants[0]?.id ?? "");
  const groupName = useId();
  const active = variants.find((v) => v.id === activeId) ?? variants[0];

  if (!active) {
    return (
      <ServiceTile
        name={service.name}
        meta={service.meta}
        duration={service.duration}
        description={service.description}
        bullets={service.bullets}
        cta={service.cta}
      />
    );
  }

  const toggle = (
    <div
      role="radiogroup"
      aria-label="Workshop format"
      className="mt-4 inline-flex items-center gap-1 rounded-full border border-border bg-bg p-0.5"
    >
      {variants.map((v) => {
        const checked = v.id === active.id;
        return (
          <label
            key={v.id}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
              checked
                ? "bg-ink text-bg"
                : "text-muted hover:text-ink"
            }`}
          >
            <input
              type="radio"
              name={groupName}
              value={v.id}
              checked={checked}
              onChange={() => setActiveId(v.id)}
              className="sr-only"
            />
            {v.label}
          </label>
        );
      })}
    </div>
  );

  return (
    <ServiceTile
      name={service.name}
      duration={active.duration}
      description={active.description}
      bullets={active.bullets}
      cta={service.cta}
      topSlot={toggle}
    />
  );
}
