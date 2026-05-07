export type BuildKind = "video" | "live-tool" | "project";

export type Build = {
  id: string;
  kind: BuildKind;
  title: string;
  blurb: string;
  url: string;
  videoId?: string;
  label?: string;
  image?: string;
};

export const builds: Build[] = [
  {
    id: "claude-skills-mcps",
    kind: "video",
    title:
      "How to Actually Use Claude AI: Skills, MCPs, and Real Workflows (Live Demo)",
    blurb:
      "Live walkthrough of building real workflows with Claude skills and MCPs.",
    videoId: "Cp-C6M--YUU",
    url: "https://youtu.be/Cp-C6M--YUU",
  },
  {
    id: "first-app-with-ai",
    kind: "video",
    title: "Build Your First App with AI (Beginner Friendly)",
    blurb: "Beginner walkthrough from idea to a working app, start to finish.",
    videoId: "fP9neMuvnjA",
    url: "https://www.youtube.com/live/fP9neMuvnjA",
  },
  {
    id: "prompt-injection",
    kind: "video",
    title: "Beware of What You Paste Into Your AI",
    blurb: "Prompt injection risks every solo operator should understand.",
    videoId: "ZHVbO7pzmns",
    url: "https://youtu.be/ZHVbO7pzmns",
  },
  {
    id: "prompt-xray",
    kind: "live-tool",
    title: "Prompt X-Ray",
    blurb:
      "Inspect what your prompt actually sends to the model. Run it in the browser.",
    url: "https://prompt-xray-tool.vercel.app/",
    label: "Live tool",
    image: "/builds/prompt-xray.png",
  },
  {
    id: "permaweb-cookbook-i18n",
    kind: "project",
    title: "Permaweb Cookbook translation pipeline",
    blurb:
      "Live English to Spanish and Chinese translation across the Arweave developer docs.",
    url: "https://cookbook.arweave.net/",
    label: "Live deployment",
    image: "/builds/cookbook.png",
  },
  {
    id: "llm-wiki-setup",
    kind: "project",
    title: "LLM wiki setup",
    blurb:
      "Spin up a personal LLM-readable knowledge base for topics you care about. Inspired by Karpathy.",
    url: "https://github.com/ropats16/llm-wiki-setup",
    label: "Open source",
    image: "/builds/llm-wiki.png",
  },
];

export const recentBuildsAvailability = "Available for new sprints.";

export function youtubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
