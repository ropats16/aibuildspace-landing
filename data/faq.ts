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
      "Quote-based after a discovery call. No hidden fees — you'll know the full number before we start.",
  },
  {
    id: "timeline",
    question: "How long does a custom build take?",
    answer:
      "Sprints run 1–2 weeks for fixed scope. Larger needs are split into sequential sprints so you ship and validate before committing more.",
  },
  {
    id: "out-of-scope",
    question: "What don't you build?",
    answer:
      "Full multi-source agentic systems with deep long-term memory — the “AI Operating System” class of project. If your need genuinely needs that, I'll say so on the call and refer you out.",
  },
  {
    id: "tools",
    question: "What tools do you work with?",
    answer:
      "Claude, Codex, and ChatGPT for AI; Gmail, Calendar, Slack, Notion, Drive, Granola, and Jira for productivity; Lovable, Replit, and Cal.com for builds; HeyGen, ElevenLabs, Midjourney, and Runway for media.",
  },
  {
    id: "handoff",
    question: "Will I be able to maintain the system after?",
    answer:
      "Yes. Every build is documented and tweakable by a non-engineer. Optional retainer if you want me on call for additions and small changes.",
  },
  {
    id: "nda",
    question: "Do you sign NDAs?",
    answer:
      "Yes, on request. Engagements default to confidential — your data, prompts, and workflows stay yours.",
  },
];
