import Link from "next/link";

// Default points at "/#top" (not the bare "#top" anchor) so the wordmark
// routes home from any page — on /blog it would otherwise just target that
// page's own header. Matches the cross-page "/#section" pattern in navLinks.
export function Wordmark({ href = "/#top" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="font-display text-xl font-semibold tracking-tight text-ink hover:opacity-80"
      aria-label="Rohit, back to home"
    >
      Rohit
    </Link>
  );
}
