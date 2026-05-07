export type Workshop = {
  id: string;
  title: string;
  blurb: string;
  videoId: string;
  url: string;
};

// TODO: replace placeholder videoIds + URLs with Rohit's actual workshop links
// Thumbnail resolves to `https://i.ytimg.com/vi/{videoId}/hqdefault.jpg`.
export const workshops: Workshop[] = [
  {
    id: "claude-code-apps",
    title: "Building real apps with Claude Code",
    blurb: "Live: scoping a tool, writing the prompts, shipping the build.",
    videoId: "dQw4w9WgXcQ",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "lovable-end-to-end",
    title: "End-to-end product in Lovable",
    blurb: "Designing, scaffolding, and connecting data — one sitting.",
    videoId: "dQw4w9WgXcQ",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "deck-automation",
    title: "Auto-generated decks from a brief",
    blurb: "Brand template + prompt → ready-to-edit slide deck.",
    videoId: "dQw4w9WgXcQ",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "email-cal-automation",
    title: "Inbox + calendar triage on autopilot",
    blurb: "Daily brief, draft replies, calendar holds — one workflow.",
    videoId: "dQw4w9WgXcQ",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "research-to-deck",
    title: "Research → 10-slide investor update",
    blurb: "From a question to a polished deck without copy-pasting.",
    videoId: "dQw4w9WgXcQ",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

// TODO: confirm exact count Rohit wants to claim
export const workshopCount = 24;

// TODO: confirm anonymization wording is OK as drafted
export const nowBuilding =
  "Trading research + execution automation for a family office.";

export function youtubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
