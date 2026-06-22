import Link from "next/link";
import { Container } from "@/app/_components/Container";
import {
  InstagramIcon,
  LinkedinIcon,
  SubstackIcon,
  XIcon,
  YoutubeIcon,
} from "@/app/_components/SocialIcons";
import { Wordmark } from "@/app/_components/Wordmark";
import { site } from "@/data/site";

const socials = [
  { href: site.social.substack, label: "Substack", Icon: SubstackIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: site.social.x, label: "X", Icon: XIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border/60 py-12">
      <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="text-xs text-muted">
            © {year} AI Buildspace · by Rohit
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <div className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-ink hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <a
            href={`mailto:${site.email}`}
            className="text-xs text-muted hover:text-ink"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
