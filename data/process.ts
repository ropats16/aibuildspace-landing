export type ProcessAccent = "teal" | "indigo" | "amber" | "rose";

export type ProcessStep = {
  id: "discovery" | "scope" | "build" | "support";
  title: string;
  body: string;
  accent: ProcessAccent;
  duration: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery call",
    body: "60 to 90 minutes to understand the problem, the stack, and the team. No prep needed. Show up with the workflow you want to fix.",
    accent: "teal",
    duration: "60–90 min",
  },
  {
    id: "scope",
    title: "Scope",
    body: "Written proposal with what gets built, what does not, the timeline, and the price. You approve before any code is written.",
    accent: "indigo",
    duration: "1–3 days",
  },
  {
    id: "build",
    title: "Build and deliver",
    body: "Sprint runs 1 to 2 weeks for fixed scope. Larger needs split into sequential sprints, so you ship and validate before committing more.",
    accent: "amber",
    duration: "1–2 weeks",
  },
  {
    id: "support",
    title: "Optional ongoing support",
    body: "Retainer for maintenance, additions, and office hours. Cancel any month.",
    accent: "rose",
    duration: "Monthly",
  },
];
