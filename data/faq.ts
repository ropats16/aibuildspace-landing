export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      "Quote-based after a discovery call. You will know all the specifics before we start working on a project.",
  },
  {
    id: "timeline",
    question: "How long does a custom build take?",
    answer:
      "Sprints run 1–2 weeks for fixed scope. Larger needs are split into sequential sprints and time may vary with demand.",
  },
  {
    id: "tools",
    question: "What tools do you work with?",
    answer:
      "I most commonly work with tools found in regular workflows like Gmail, Calendar, Slack, Notion, Drive, Granola, and Jira. I'm well versed with the AI stack be it Claude, ChatGPT, Gemini, or even some open source model providers as well as tooling from third parties like HeyGen, Elevenlabs, etc. Custom integrations where it makes sense.",
  },
  {
    id: "handoff",
    question: "Will I be able to maintain the system after?",
    answer:
      "Yes. Every build is documented and editable by a non-engineer. Optional retainer if you want me on call for additions and small changes.",
  },
];
