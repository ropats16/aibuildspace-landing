import Image from "next/image";
import Link from "next/link";
import { type Build, youtubeThumbnail } from "@/data/builds";
import { getOgImage } from "@/app/_lib/og";

export async function BuildTile({ build }: { build: Build }) {
  const previewImage =
    build.kind === "video"
      ? null
      : (build.image ?? (await getOgImage(build.url)));

  return (
    <Link
      href={build.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open: ${build.title}`}
      className="group flex h-full flex-col gap-3 rounded-2xl bg-card p-3 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_28px_-12px_rgba(11,11,12,0.18)] focus-visible:shadow-[0_8px_28px_-12px_rgba(11,11,12,0.22)]"
    >
      {build.kind === "video" && build.videoId ? (
        <VideoThumb videoId={build.videoId} />
      ) : (
        <LinkThumb
          url={build.url}
          label={build.label ?? "Live"}
          previewImage={previewImage}
        />
      )}
      <div className="flex flex-col gap-1 px-1 pb-1">
        <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-ink sm:text-lg">
          {build.title}
        </h3>
        <p className="text-sm leading-snug text-muted">{build.blurb}</p>
      </div>
    </Link>
  );
}

function VideoThumb({ videoId }: { videoId: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-ink/5 aspect-video">
      <Image
        src={youtubeThumbnail(videoId)}
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
  );
}

function LinkThumb({
  url,
  label,
  previewImage,
}: {
  url: string;
  label: string;
  previewImage: string | null;
}) {
  const host = stripHost(url);

  if (previewImage) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-ink/5 aspect-video">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-80"
        />
        <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-ink">
          {host}
        </span>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl"
      style={{
        background:
          "linear-gradient(135deg, var(--pastel-mint), var(--pastel-sky))",
      }}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="h-7 w-7 text-ink/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
        <span className="font-display text-sm font-semibold tracking-tight text-ink/85 sm:text-base">
          {host}
        </span>
      </div>
      <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
        {label}
      </span>
    </div>
  );
}

function stripHost(url: string): string {
  try {
    const u = new URL(url);
    return u.host.replace(/^www\./, "") + (u.pathname === "/" ? "" : u.pathname);
  } catch {
    return url;
  }
}
