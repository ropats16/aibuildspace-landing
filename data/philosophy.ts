export type Principle = {
  id: "handoff" | "focused" | "custom";
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    id: "handoff",
    title: "Hand-off-able",
    body:
      "I build systems you can tweak yourself. You own the prompts, the code, the keys — no vendor lock-in.",
  },
  {
    id: "focused",
    title: "Single-purpose beats over-engineered",
    body:
      "Most needs are solved by one focused workflow, not a multi-source agentic OS. Ship the small thing that earns its keep.",
  },
  {
    id: "custom",
    title: "Custom over locked-in",
    body:
      "Built on Claude and Codex you control — not opaque agent platforms whose pricing and behavior you can't audit.",
  },
];
