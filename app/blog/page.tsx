import type { Metadata } from "next";
import { Container } from "@/app/_components/Container";
import { PlaceholderNote } from "@/app/_components/Section";
import { getAllPosts } from "@/app/_lib/posts";
import { site } from "@/data/site";
import { PostCard } from "./_components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes, how-tos, and workflow breakdowns on building with AI. Practical content from real projects.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": [
        { url: `${site.url}/rss.xml`, title: "AI Buildspace RSS Feed" },
      ],
    },
  },
  openGraph: {
    title: "Blog | Rohit",
    description:
      "Notes, how-tos, and workflow breakdowns on building with AI. Practical content from real projects.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <Container>
        {/* Page header */}
        <div className="max-w-2xl">
          <p className="mb-4 text-xs tracking-[0.18em] uppercase text-muted">
            Blog
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Notes and how-tos
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Workflow breakdowns, prompt patterns, and lessons from building
            real AI projects. Everything here is tested, not theoretical.
          </p>
        </div>

        {/* Post grid */}
        {posts.length === 0 ? (
          <PlaceholderNote>
            No posts yet. Check back soon.
          </PlaceholderNote>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-12">
            {posts.map((post) => (
              <li key={post.slug} className="h-full">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
