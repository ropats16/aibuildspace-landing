export const site = {
  name: "AI Buildspace",
  tagline: "Work smarter with AI",
  description:
    "Custom AI workflows and sessions built around the tools you already use.",
  url: "https://aibuildspace.com",
  email: "rohit@aibuildspace.com",
  headshot: "/headshot.png",
  social: {
    substack: "https://rohit7986.substack.com",
    instagram: "https://www.instagram.com/aibuildspace/",
    youtube: "https://www.youtube.com/@aibuildspace/videos",
    x: "https://x.com/ropats16",
  },
} as const;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#examples", label: "Examples" },
  { href: "#builds", label: "Recent builds" },
  { href: "#about", label: "About" },
] as const;
