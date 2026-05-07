export type ProcessStep = {
  id: "discovery" | "scope" | "build" | "support";
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery call",
    body: "60 to 90 minutes to understand the problem, the stack, and the team. No prep needed. Show up with the workflow you want to fix.",
  },
  {
    id: "scope",
    title: "Scope",
    body: "Written proposal with what gets built, what does not, the timeline, and the price. You approve before any code is written.",
  },
  {
    id: "build",
    title: "Build and deliver",
    body: "Sprint runs 1 to 2 weeks for fixed scope. Larger needs split into sequential sprints, so you ship and validate before committing more.",
  },
  {
    id: "support",
    title: "Optional ongoing support",
    body: "Retainer for maintenance, additions, and office hours. Cancel any month.",
  },
];
