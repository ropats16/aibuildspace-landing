export type ExampleCategory = "mail" | "deck" | "slack" | "video";

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
  | "slack-message";

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
      "Brief me at 7am every weekday: top 5 unread emails, today's calendar, urgent Slack threads.",
    category: "mail",
    tone: "peach",
    artifact: "email-digest",
    outcomeLabel: "Morning briefing",
  },
  {
    id: "crm-report",
    prompt:
      "Compare the top 5 CRMs for our 20-person retail team and produce a 2-page report with pricing.",
    category: "deck",
    tone: "mint",
    artifact: "report-mock",
    outcomeLabel: "2-page comparison report",
  },
  {
    id: "investor-deck",
    prompt:
      "Turn last quarter's traffic data into a 10-slide investor update on our brand template.",
    category: "deck",
    tone: "lemon",
    artifact: "slide-thumbs",
    outcomeLabel: "10-slide investor update",
  },
  {
    id: "inbox-triage",
    prompt:
      "Hourly: triage my inbox, draft replies for the urgent bucket, archive newsletters.",
    category: "mail",
    tone: "rose",
    artifact: "inbox-mock",
    outcomeLabel: "Triaged inbox with drafts",
  },
  {
    id: "vertical-reel",
    prompt:
      "Make a 30s vertical reel of our product update using my HeyGen avatar + ElevenLabs voice.",
    category: "video",
    tone: "lilac",
    artifact: "video-frame",
    outcomeLabel: "30s vertical reel",
  },
  {
    id: "weekly-slack",
    prompt:
      "Every Monday, post a 5-bullet GA4 + Stripe summary into #leadership on Slack.",
    category: "slack",
    tone: "sky",
    artifact: "slack-message",
    outcomeLabel: "Monday metrics post",
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
