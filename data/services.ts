export type ServiceAccent = "emerald" | "amber" | "indigo" | "violet";

export type Service = {
  id: "intro" | "deep-dive" | "sprint" | "retainer";
  name: string;
  duration: string;
  description: string;
  bullets: string[];
  cta: string;
  accent: ServiceAccent;
};

export const services: Service[] = [
  {
    id: "intro",
    name: "Intro Session",
    duration: "60–90 min",
    description:
      "Get a feel for AI. We walk through what's possible, where it could fit in your work, and the cheapest place to start.",
    bullets: [
      "Solo or with your team, same call",
      "Live walkthroughs of real builds",
      "Leave with a written next-step plan",
    ],
    cta: "Book an intro",
    accent: "emerald",
  },
  {
    id: "deep-dive",
    name: "Deep Dive",
    duration: "Half- or full-day",
    description:
      "Hands-on workshop. Bring a specific problem and we build the solution together, live, on your stack.",
    bullets: [
      "Solo or with your team, same format",
      "Built on your tools, your data",
      "Recording and docs so you can rerun it",
    ],
    cta: "Book a deep dive",
    accent: "amber",
  },
  {
    id: "sprint",
    name: "Custom Build Sprint",
    duration: "Scoped on call",
    description:
      "Custom automations, skills, or lightweight dashboards. Built around your real work, shipped and yours.",
    bullets: [
      "Scope shaped on the call, small or large",
      "Workflows built on Claude Code or Codex CLI you control",
      "Documented so a non-engineer can tweak them",
    ],
    cta: "Scope a sprint",
    accent: "indigo",
  },
  {
    id: "retainer",
    name: "Optional Retainer",
    duration: "Monthly",
    description: "Reserved hours after a sprint. Cancel any month.",
    bullets: [
      "Maintenance and small additions",
      "Office hours for your team's questions",
      "Priority on new sprint slots",
    ],
    cta: "Add a retainer",
    accent: "violet",
  },
];

export const pricingNote = "Quote on call";
