import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/app/_lib/posts";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`;
  const formattedDate = formatDate(post.publishedDate);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(11,11,12,0.22),0_2px_8px_rgba(11,11,12,0.04)] hover:ring-black/[0.10] sm:flex-row sm:items-stretch">
      {/* Banner image */}
      <div className="relative aspect-video w-full overflow-hidden bg-border/30 sm:aspect-auto sm:w-2/5 sm:max-w-[380px] sm:shrink-0 sm:min-h-[210px]">
        {post.bannerImage ? (
          <Image
            src={post.bannerImage}
            alt={post.bannerAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 640px) 380px, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-border/50 to-border/20" />
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-7 lg:p-8">
        {/* Date */}
        <time
          dateTime={post.publishedDate}
          className="text-xs font-medium tracking-[0.12em] uppercase text-muted"
        >
          {formattedDate}
        </time>

        {/* Title with overlay link for full-card click */}
        <h2 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight sm:text-[22px] lg:text-2xl">
          <Link
            href={href}
            className="after:absolute after:inset-0 focus:outline-none focus-visible:after:rounded-2xl"
          >
            {post.title}
          </Link>
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted line-clamp-2 sm:line-clamp-3">
            {post.summary}
          </p>
        )}
      </div>
    </article>
  );
}
