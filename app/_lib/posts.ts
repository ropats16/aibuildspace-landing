import { createReader } from '@keystatic/core/reader';
import type { DocumentNode } from '@keystatic/core';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Post {
  slug: string;
  title: string;
  publishedDate: string;
  draft: boolean;
  summary: string;
  metaDescription: string | null;
  keywords: readonly string[];
  tags: readonly string[];
  bannerImage: string | null;
  bannerAlt: string;
  videoUrl: string | null;
  /** Lazy async accessor — call `await post.content()` to get the document nodes. */
  content: () => Promise<readonly DocumentNode[]>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Walk a Keystatic document node tree and concatenate all text leaves.
 * Nodes are either `{ text: string }` leaves or `{ children: DocumentNode[] }` elements.
 */
export function documentToPlainText(nodes: readonly DocumentNode[]): string {
  const parts: string[] = [];
  for (const node of nodes) {
    if ('text' in node) {
      parts.push((node as { text: string }).text);
    } else if ('children' in node && Array.isArray(node.children)) {
      parts.push(documentToPlainText(node.children as DocumentNode[]));
    }
  }
  return parts.join(' ');
}

/**
 * Estimate reading time in minutes at ~200 wpm; minimum 1.
 */
export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Split a comma/newline-separated string (keywords, tags) into a trimmed,
 * de-duplicated list. Empty/blank entries are dropped.
 */
export function splitList(value: string | null | undefined): string[] {
  if (!value) return [];
  const seen = new Set<string>();
  for (const part of value.split(/[\n,]+/)) {
    const trimmed = part.trim();
    if (trimmed) seen.add(trimmed);
  }
  return [...seen];
}

// ---------------------------------------------------------------------------
// Reader API
// ---------------------------------------------------------------------------

/**
 * Map a raw reader entry + slug to our `Post` shape (without resolving the document body).
 */
function entryToPost(
  slug: string,
  entry: Awaited<ReturnType<(typeof reader.collections.posts.read)>>,
): Post {
  if (!entry) throw new Error('entryToPost called with null entry');
  return {
    slug,
    title: entry.title,
    publishedDate: entry.publishedDate ?? '',
    draft: entry.draft,
    summary: entry.summary,
    metaDescription: entry.metaDescription ?? null,
    keywords: splitList(entry.keywords),
    tags: splitList(entry.tags),
    bannerImage: entry.bannerImage ?? null,
    bannerAlt: entry.bannerAlt,
    videoUrl: entry.videoUrl ?? null,
    content: entry.content as () => Promise<readonly DocumentNode[]>,
  };
}

/**
 * Return all posts sorted newest-first. Drafts excluded by default.
 * Safe on an empty collection — returns [].
 */
export async function getAllPosts(
  { includeDrafts = false }: { includeDrafts?: boolean } = {},
): Promise<Post[]> {
  const all = await reader.collections.posts.all();
  const posts = all
    .map(({ slug, entry }) => entryToPost(slug, entry))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
  return posts;
}

/**
 * Return a single post by slug, or null if not found.
 * The `content` field is a lazy async accessor — not resolved here.
 */
export async function getPost(slug: string): Promise<Post | null> {
  const entry = await reader.collections.posts.read(slug);
  if (!entry) return null;
  return entryToPost(slug, entry);
}

/**
 * Return published (non-draft) slugs — used by `generateStaticParams`.
 */
export async function getPostSlugs(): Promise<string[]> {
  const all = await reader.collections.posts.all();
  return all.filter(({ entry }) => !entry.draft).map(({ slug }) => slug);
}
