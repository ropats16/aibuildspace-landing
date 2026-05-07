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
      "Quote-based after a discovery call. You will know the full number before we start.",
  },
  {
    id: "timeline",
    question: "How long does a custom build take?",
    answer:
      "Sprints run 1–2 weeks for fixed scope. Larger needs are split into sequential sprints, so you ship and validate before committing more.",
  },
  {
    id: "out-of-scope",
    question: "What do you not build?",
    answer:
      "Full multi-source agentic systems with deep long-term memory. If you genuinely need that, I will say so on the call and refer you out.",
  },
  {
    id: "tools",
    question: "What tools do you work with?",
    answer:
      "I work in the tools you already use. Common ones include Gmail, Calendar, Slack, Notion, Drive, Granola, and Jira; AI through Claude and ChatGPT; builds on Lovable, Replit, Claude Code, and Codex CLI; media through HeyGen, ElevenLabs, Midjourney, and Runway. Custom integrations where it makes sense.",
  },
  {
    id: "handoff",
    question: "Will I be able to maintain the system after?",
    answer:
      "Yes. Every build is documented and editable by a non-engineer. Optional retainer if you want me on call for additions and small changes.",
  },
  {
    id: "nda",
    question: "Do you sign NDAs?",
    answer:
      "Yes, on request. Engagements default to confidential. Your data, prompts, and workflows stay yours.",
  },
];
