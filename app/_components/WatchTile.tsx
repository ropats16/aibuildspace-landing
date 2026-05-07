import Image from "next/image";
import Link from "next/link";
import { type Workshop, youtubeThumbnail } from "@/data/workshops";

export function WatchTile({ workshop }: { workshop: Workshop }) {
  return (
    <Link
      href={workshop.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on YouTube: ${workshop.title}`}
      className="group flex h-full flex-col gap-3 rounded-2xl bg-card p-3 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_28px_-12px_rgba(11,11,12,0.18)] focus-visible:shadow-[0_8px_28px_-12px_rgba(11,11,12,0.22)]"
    >
      <div className="relative overflow-hidden rounded-xl bg-ink/5 aspect-video">
        <Image
          src={youtubeThumbnail(workshop.videoId)}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-70 transition-opacity duration-300 group-hover:opacity-90"
        />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-0.5 h-5 w-5 text-ink sm:h-6 sm:w-6"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
          YouTube
        </span>
      </div>
      <div className="flex flex-col gap-1 px-1 pb-1">
        <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-ink sm:text-lg">
          {workshop.title}
        </h3>
        <p className="text-sm leading-snug text-muted">{workshop.blurb}</p>
      </div>
    </Link>
  );
}
