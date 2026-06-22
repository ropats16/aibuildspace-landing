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
    <article className="group relative flex flex-col rounded-2xl bg-card ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(11,11,12,0.22),0_2px_8px_rgba(11,11,12,0.04)] hover:ring-black/[0.10] overflow-hidden">
      {/* Banner image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-border/30">
        {post.bannerImage ? (
          <Image
            src={post.bannerImage}
            alt={post.bannerAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-border/50 to-border/20" />
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Date */}
        <time
          dateTime={post.publishedDate}
          className="text-xs font-medium tracking-[0.12em] uppercase text-muted"
        >
          {formattedDate}
        </time>

        {/* Title with overlay link for full-card click */}
        <h2 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight sm:text-[22px]">
          <Link
            href={href}
            className="after:absolute after:inset-0 focus:outline-none focus-visible:after:rounded-2xl"
          >
            {post.title}
          </Link>
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted line-clamp-3">
            {post.summary}
          </p>
        )}

        <div className="mt-auto" />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <ul className="relative z-10 mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex items-center rounded-full border border-border bg-bg px-3 py-1 text-[12px] font-medium text-muted">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
