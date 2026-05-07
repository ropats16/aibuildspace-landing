export const site = {
  name: "AI Buildspace",
  tagline: "Work smarter with AI",
  description:
    "Hand-off-able AI workflows for solopreneurs, owners, and founders.",
  url: "https://aibuildspace.com",
  // TODO: replace with real contact email
  email: "hello@aibuildspace.com",
  headshot: "/headshot.png",
  social: {
    // TODO: replace placeholder URLs once handles confirmed
    substack: "#",
    instagram: "#",
    youtube: "#",
    x: "#",
  },
} as const;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#examples", label: "Examples" },
  { href: "#watch", label: "Watch" },
  { href: "#about", label: "About" },
] as const;
