export type ServiceVariant = {
  id: string;
  label: string;
  duration: string;
  description: string;
  bullets: string[];
};

export type Service = {
  id: "intro" | "workshop" | "sprint" | "retainer";
  name: string;
  meta?: string;
  duration: string;
  description: string;
  bullets: string[];
  cta: string;
  variants?: ServiceVariant[];
};

export const services: Service[] = [
  {
    id: "intro",
    name: "Intro Session",
    meta: "1:1",
    duration: "60–90 min",
    description:
      "Walk through your most pressing AI question with someone who builds for a living.",
    bullets: [
      "Pick the right entry point for your stack",
      "Map the cheapest first workflow",
      "Leave with a written next-step plan",
    ],
    cta: "Book an intro",
  },
  {
    id: "workshop",
    name: "Workshop",
    duration: "Half- or full-day",
    description: "Hands on. We build a working system together, live.",
    bullets: [
      "We pick one real workflow and ship it",
      "Built on your tools, your data",
      "Recording and docs so you can rerun it later",
    ],
    cta: "Book a workshop",
    variants: [
      {
        id: "solo",
        label: "1:1",
        duration: "Half- or full-day",
        description:
          "Just you and me. We build one workflow end to end on your stack.",
        bullets: [
          "Focused on the workflow that drains the most time",
          "Built live in your tools, with your data",
          "Recording and handoff doc so you can rerun it",
        ],
      },
      {
        id: "team",
        label: "Team (2–15)",
        duration: "Half- or full-day",
        description:
          "Your team builds the same workflow together. Everyone leaves shipping.",
        bullets: [
          "Pre-call to scope the right workflow for the group",
          "Hands-on build, not slides",
          "Each person leaves with a working copy",
        ],
      },
    ],
  },
  {
    id: "sprint",
    name: "Custom Build Sprint",
    meta: "Fixed scope",
    duration: "1–2 weeks",
    description:
      "One automation, skill, or lightweight dashboard. Shipped and yours.",
    bullets: [
      "Single-source workflow built on Claude Code or Codex CLI that you control",
      "Documented so a non-engineer can tweak it",
      "Bigger needs split into sequential sprints",
    ],
    cta: "Scope a sprint",
  },
  {
    id: "retainer",
    name: "Optional Retainer",
    meta: "Post-sprint",
    duration: "Monthly",
    description: "Reserved hours after a sprint. Cancel any month.",
    bullets: [
      "Maintenance and small additions",
      "Office hours for your team's questions",
      "Priority on new sprint slots",
    ],
    cta: "Add a retainer",
  },
];

export const pricingNote = "Quote on call";
