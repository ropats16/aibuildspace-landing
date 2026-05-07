import type { Example } from "./examples";

export type OrbitRing = 0 | 1 | 2;

export type Tool = {
  id: string;
  name: string;
  logo: string;
  ring: OrbitRing;
  exampleId: Example["id"];
};

export const tools: Tool[] = [
  { id: "claude", name: "Claude", logo: "/logos/claude.svg", ring: 0, exampleId: "crm-report" },
  { id: "codex", name: "OpenAI Codex", logo: "/logos/codex.svg", ring: 0, exampleId: "inbox-triage" },
  { id: "chatgpt", name: "ChatGPT", logo: "/logos/chatgpt.svg", ring: 0, exampleId: "morning-brief" },

  { id: "gmail", name: "Gmail", logo: "/logos/gmail.svg", ring: 1, exampleId: "morning-brief" },
  { id: "gcal", name: "Google Calendar", logo: "/logos/gcal.svg", ring: 1, exampleId: "morning-brief" },
  { id: "slack", name: "Slack", logo: "/logos/slack.svg", ring: 1, exampleId: "weekly-slack" },
  { id: "notion", name: "Notion", logo: "/logos/notion.svg", ring: 1, exampleId: "crm-report" },
  { id: "gdrive", name: "Google Drive", logo: "/logos/gdrive.svg", ring: 1, exampleId: "investor-deck" },
  { id: "granola", name: "Granola", logo: "/logos/granola.svg", ring: 1, exampleId: "morning-brief" },
  { id: "jira", name: "Jira", logo: "/logos/jira.svg", ring: 1, exampleId: "weekly-slack" },

  { id: "lovable", name: "Lovable", logo: "/logos/lovable.svg", ring: 2, exampleId: "investor-deck" },
  { id: "replit", name: "Replit", logo: "/logos/replit.svg", ring: 2, exampleId: "inbox-triage" },
  { id: "cal", name: "Cal.com", logo: "/logos/cal.svg", ring: 2, exampleId: "morning-brief" },
  { id: "heygen", name: "HeyGen", logo: "/logos/heygen.svg", ring: 2, exampleId: "vertical-reel" },
  { id: "elevenlabs", name: "ElevenLabs", logo: "/logos/elevenlabs.svg", ring: 2, exampleId: "vertical-reel" },
  { id: "midjourney", name: "Midjourney", logo: "/logos/midjourney.svg", ring: 2, exampleId: "investor-deck" },
  { id: "runway", name: "Runway", logo: "/logos/runway.svg", ring: 2, exampleId: "vertical-reel" },
];

export const toolsByRing: Record<OrbitRing, Tool[]> = {
  0: tools.filter((t) => t.ring === 0),
  1: tools.filter((t) => t.ring === 1),
  2: tools.filter((t) => t.ring === 2),
};
