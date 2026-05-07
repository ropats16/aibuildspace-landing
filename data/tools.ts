export type OrbitRing = 0 | 1;

export type Tool = {
  id: string;
  name: string;
  logo: string;
  ring: OrbitRing;
  prompt: string;
};

export const tools: Tool[] = [
  {
    id: "gmail",
    name: "Gmail",
    logo: "/logos/gmail.svg",
    ring: 0,
    prompt: "Triage my inbox at 9am and draft replies to the urgent thread.",
  },
  {
    id: "notion",
    name: "Notion",
    logo: "/logos/notion.svg",
    ring: 0,
    prompt: "Turn today's meeting notes into a project doc with action items.",
  },
  {
    id: "word",
    name: "Microsoft Word",
    logo: "/logos/word.svg",
    ring: 0,
    prompt: "Draft a 2-page client proposal in our brand voice.",
  },
  {
    id: "slack",
    name: "Slack",
    logo: "/logos/slack.svg",
    ring: 0,
    prompt: "Post Monday's GA4 + Stripe summary into #leadership.",
  },
  {
    id: "gcal",
    name: "Google Calendar",
    logo: "/logos/gcal.svg",
    ring: 1,
    prompt: "Block deep-work hours around tomorrow's meetings.",
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    logo: "/logos/powerpoint.svg",
    ring: 1,
    prompt: "Convert this report into a 10-slide investor deck.",
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    logo: "/logos/excel.svg",
    ring: 1,
    prompt: "Build a P&L model from last quarter's transactions.",
  },
  {
    id: "gdrive",
    name: "Google Drive",
    logo: "/logos/gdrive.svg",
    ring: 1,
    prompt: "File this contract under /Clients with a 5-line summary.",
  },
];

export const toolsByRing: Record<OrbitRing, Tool[]> = {
  0: tools.filter((t) => t.ring === 0),
  1: tools.filter((t) => t.ring === 1),
};
