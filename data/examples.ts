export type ExampleCategory = "mail" | "deck" | "slack" | "video" | "code";

export type ExampleTone =
  | "mint"
  | "peach"
  | "lemon"
  | "rose"
  | "sky"
  | "lilac";

export type ArtifactType =
  | "email-digest"
  | "report-mock"
  | "slide-thumbs"
  | "inbox-mock"
  | "video-frame"
  | "slack-message"
  | "pr-description"
  | "bug-report";

export type Example = {
  id: string;
  prompt: string;
  category: ExampleCategory;
  tone: ExampleTone;
  artifact: ArtifactType;
  outcomeLabel: string;
};

export const examples: Example[] = [
  {
    id: "morning-brief",
    prompt:
      "Send me a 7am summary of yesterday's revenue, today's calendar, and any urgent emails I missed.",
    category: "mail",
    tone: "peach",
    artifact: "email-digest",
    outcomeLabel: "Morning brief",
  },
  {
    id: "inbox-triage",
    prompt:
      "Sort my inbox into reply-now, reply-later, and archive. Draft replies for the urgent ones in my voice.",
    category: "mail",
    tone: "rose",
    artifact: "inbox-mock",
    outcomeLabel: "Inbox triage",
  },
  {
    id: "investor-deck",
    prompt:
      "Turn last quarter's metrics into a 10-slide investor update on our brand template.",
    category: "deck",
    tone: "lemon",
    artifact: "slide-thumbs",
    outcomeLabel: "Investor update",
  },
  {
    id: "customer-research",
    prompt:
      "Read every support ticket from last month and pull the top 5 complaints with example quotes.",
    category: "deck",
    tone: "mint",
    artifact: "report-mock",
    outcomeLabel: "Top complaints",
  },
  {
    id: "vertical-reel",
    prompt:
      "Make a 30-second vertical reel of our product update using my HeyGen avatar and ElevenLabs voice.",
    category: "video",
    tone: "lilac",
    artifact: "video-frame",
    outcomeLabel: "Vertical reel",
  },
  {
    id: "weekly-slack",
    prompt:
      "Every Monday, post a 5-bullet summary of GA4 and Stripe into #leadership on Slack.",
    category: "slack",
    tone: "sky",
    artifact: "slack-message",
    outcomeLabel: "Monday metrics",
  },
  {
    id: "pr-description",
    prompt:
      "Read the diff on this branch, write a PR description with a summary, test plan, and screenshots if relevant.",
    category: "code",
    tone: "peach",
    artifact: "pr-description",
    outcomeLabel: "PR description",
  },
  {
    id: "support-bug",
    prompt:
      "Take this Slack support thread and turn it into a bug report with reproduction steps, expected vs actual, severity.",
    category: "code",
    tone: "mint",
    artifact: "bug-report",
    outcomeLabel: "Bug report",
  },
];

export const heroExampleIds: ReadonlyArray<Example["id"]> = [
  "morning-brief",
  "investor-deck",
  "weekly-slack",
  "vertical-reel",
];

export const heroExamples: Example[] = heroExampleIds.map((id) => {
  const found = examples.find((e) => e.id === id);
  if (!found) throw new Error(`Unknown hero example id: ${id}`);
  return found;
});
