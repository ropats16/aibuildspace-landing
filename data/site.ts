export const site = {
  name: "AI Buildspace",
  tagline: "Work smarter with AI",
  description:
    "Hand-off-able AI workflows for solopreneurs, owners, and founders.",
  url: "https://aibuildspace.com",
  // TODO: replace with real contact email
  email: "hello@aibuildspace.com",
  // TODO: swap for real headshot (square JPG, ~512×512). Drop in /public, update path, remove `unoptimized` from <Image>
  headshot: "/rohit.svg",
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
