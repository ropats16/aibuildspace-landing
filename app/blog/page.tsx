import type { Metadata } from "next";
import { Container } from "@/app/_components/Container";
import { PlaceholderNote } from "@/app/_components/Section";
import { getAllPosts } from "@/app/_lib/posts";
import { site } from "@/data/site";
import { PostCard } from "./_components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides, tools, and ideas from building with AI. Practical writing drawn from real projects.",
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
      "Guides, tools, and ideas from building with AI. Practical writing drawn from real projects.",
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
            Writing on building with AI
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Guides, tools, and ideas from my work with AI. I write to make the
            useful parts clear, and to think out loud about where this is all
            heading.
          </p>
        </div>

        {/* Post grid */}
        {posts.length === 0 ? (
          <PlaceholderNote>
            No posts yet. Check back soon.
          </PlaceholderNote>
        ) : (
          <ul className="mt-10 flex flex-col gap-6 lg:mt-12">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
