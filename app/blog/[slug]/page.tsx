import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/app/_components/Container";
import {
  getPost,
  getPostSlugs,
  readingTimeMinutes,
  documentToPlainText,
} from "@/app/_lib/posts";
import { ArticleRenderer } from "@/app/blog/_components/ArticleRenderer";
import { ReadingMeta } from "@/app/blog/_components/ReadingMeta";
import { VideoEmbed } from "@/app/blog/_components/VideoEmbed";
import { ShareBar } from "@/app/blog/_components/ShareBar";
import { PostViewTracker } from "@/app/blog/_components/PostViewTracker";
import { site } from "@/data/site";

// ---------------------------------------------------------------------------
// Static generation — published posts only
// ---------------------------------------------------------------------------

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Per-post metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Not found",
      robots: { index: false, follow: false },
    };
  }

  const description = post.metaDescription ?? post.summary;
  const title = post.title;
  const bannerImage = post.bannerImage ?? "/thumbnail_alt.png";

  const base: Metadata = {
    title,
    description,
    keywords: post.keywords as string[],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title,
      description,
      publishedTime: post.publishedDate,
      authors: ["Rohit"],
      images: [
        {
          url: bannerImage,
          width: 1200,
          height: 630,
          alt: post.bannerAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [bannerImage],
    },
  };

  // Drafts: only reachable in dev; mark noindex
  if (post.draft) {
    return { ...base, robots: { index: false, follow: false } };
  }

  return base;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  // Not found
  if (!post) notFound();

  // Drafts are invisible in production
  if (post.draft && process.env.NODE_ENV === "production") notFound();

  // Resolve body + reading time
  const content = await post.content();
  const minutes = readingTimeMinutes(documentToPlainText(content));

  // Absolute URLs (for JSON-LD — metadataBase does not apply there)
  const postUrl = `${site.url}/blog/${slug}`;
  const bannerAbsolute = post.bannerImage
    ? `${site.url}${post.bannerImage}`
    : `${site.url}/thumbnail_alt.png`;

  // BlogPosting JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription ?? post.summary,
    image: bannerAbsolute,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: {
      "@type": "Person",
      name: "Rohit",
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/thumbnail_alt.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: (post.keywords as string[]).join(", "),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Analytics: fires blog_post_view + scroll_depth milestones client-side */}
      <PostViewTracker slug={slug} />

      <section className="py-14 sm:py-16 lg:py-20">
        <Container>
          {/* Reading column — centered, prose width */}
          <div className="mx-auto max-w-3xl">
            <article>
              {/* Label */}
              <p className="mb-4 text-xs tracking-[0.18em] uppercase text-muted">
                Blog
              </p>

              {/* Title */}
              <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl text-ink">
                {post.title}
              </h1>

              {/* Byline / reading meta */}
              <div className="mt-5">
                <ReadingMeta date={post.publishedDate} minutes={minutes} />
              </div>

              {/* Banner image */}
              {post.bannerImage && (
                <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)]">
                  <Image
                    src={post.bannerImage}
                    alt={post.bannerAlt}
                    width={1200}
                    height={630}
                    className="w-full object-cover"
                    priority
                    sizes="(min-width: 1024px) 768px, 100vw"
                  />
                </div>
              )}

              {/* Optional top video (shown after banner) */}
              {post.videoUrl && (
                <div className="mt-8">
                  <VideoEmbed url={post.videoUrl} title={post.title} />
                </div>
              )}

              {/* Article body */}
              <div className="mt-10">
                <ArticleRenderer document={content} />
              </div>

              {/* Divider */}
              <div
                className="mt-14 border-t border-border/60"
                aria-hidden="true"
              />

              {/* Share bar */}
              <div className="mt-10">
                <ShareBar url={postUrl} title={post.title} />
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
