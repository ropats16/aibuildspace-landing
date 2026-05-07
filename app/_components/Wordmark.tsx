import Link from "next/link";

export function Wordmark({ href = "#top" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="font-display text-[1.0625rem] font-semibold tracking-tight text-ink hover:opacity-80"
      aria-label="Rohit, back to top"
    >
      Rohit
    </Link>
  );
}
