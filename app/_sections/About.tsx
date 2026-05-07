import Image from "next/image";
import Link from "next/link";
import { Section } from "@/app/_components/Section";
import {
  InstagramIcon,
  SubstackIcon,
  XIcon,
  YoutubeIcon,
} from "@/app/_components/SocialIcons";
import { aboutParagraphs } from "@/data/about";
import { site } from "@/data/site";

const socials = [
  { href: site.social.substack, label: "Substack", Icon: SubstackIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: site.social.x, label: "X", Icon: XIcon },
] as const;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Rohit + AI Buildspace."
      lede="The story behind the studio, and how to find me elsewhere."
    >
      <div className="mt-12 grid items-start gap-10 sm:grid-cols-[200px_1fr] sm:gap-12 lg:mt-14 lg:grid-cols-[260px_1fr] lg:gap-16">
        <div className="flex justify-center sm:block">
          <div className="relative h-44 w-44 overflow-hidden rounded-2xl ring-1 ring-black/[0.06] shadow-[0_8px_28px_-12px_rgba(11,11,12,0.18)] sm:h-48 sm:w-48 lg:h-60 lg:w-60">
            <Image
              src={site.headshot}
              alt="Rohit, founder of AI Buildspace"
              fill
              sizes="(min-width: 1024px) 240px, 192px"
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-base leading-relaxed text-ink/85 sm:text-lg">
            {aboutParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {socials.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={`Rohit on ${label}`}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
