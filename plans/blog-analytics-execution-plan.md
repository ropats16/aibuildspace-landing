# Execution Plan — Blog + Analytics for AI Buildspace

Derived from PRD.md. Read `.superpowers/sdd/global-constraints.md` for stack/design/rules that bind every task. Each task below is self-contained. Tasks run sequentially; later tasks build on committed work from earlier ones.

Content model summary (defined in Task 2, consumed everywhere):
- Collection `posts` at `content/posts/<slug>/index.{mdoc,yaml}`.
- Fields: `title` (slug source), `publishedDate` (date), `draft` (checkbox), `summary` (text), `metaDescription` (text), `keywords` (array of text), `tags` (array of text, optional), `bannerImage` (image), `bannerAlt` (text), `videoUrl` (url, optional), `content` (document — the body).
- Public reader helper (Task 4) exposes typed posts, draft filtering, newest-first sort, reading time.

---

## Task 1: Dependencies, env scaffolding, next.config, analytics helper stub

**Goal:** Install all new dependencies at verified versions, scaffold env vars, update `next.config.ts` image hosts, and add a safe analytics `capture` helper that later client components import.

**Steps:**
1. Install exact versions: `pnpm add @keystatic/core@0.5.50 @keystatic/next@5.0.4 @markdoc/markdoc posthog-js @vercel/speed-insights`. Then `pnpm add -D @keystar/ui` is NOT needed — instead verify the resolved transitive `@keystar/ui` is `>= 0.7.20` via `pnpm why @keystar/ui` (report the version). If it resolves `< 0.7.20`, add an override in `package.json` `pnpm.overrides` pinning `@keystar/ui` to its latest `0.7.x` and reinstall.
2. Add to `.env.example` (with a short comment per var; do NOT touch `.env`):
   - `KEYSTATIC_STORAGE=local` — `local` for now; set `github` once upstream #1549 is fixed.
   - `KEYSTATIC_GITHUB_CLIENT_ID=` / `KEYSTATIC_GITHUB_CLIENT_SECRET=` / `KEYSTATIC_SECRET=` — filled by Keystatic when you create the GitHub App (GitHub mode only).
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=` — GitHub App slug (GitHub mode only).
   - `NEXT_PUBLIC_POSTHOG_KEY=` / `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com` — PostHog project key + host (optional; analytics no-ops if key absent).
   - `NEXT_PUBLIC_GSC_VERIFICATION=` — Google Search Console verification token (optional).
3. Update `app/_lib/` (create dir if needed) with `app/_lib/analytics.ts`:
   - `"use client"`-safe module exporting `capture(event: string, properties?: Record<string, unknown>): void` and `getPosthog()`. Lazy-access the `posthog-js` default singleton. Guard so calling `capture` before init is a no-op and never throws (check `posthog.__loaded` or wrap in try/catch). Do NOT initialize PostHog here (that is Task 13). Export a typed list of event names as a const union for reuse: `"pageview" | "blog_post_view" | "video_play" | "share_click" | "social_click" | "cta_book_call_click" | "scroll_depth"`.
4. Update `next.config.ts` `images.remotePatterns`: keep the existing `i.ytimg.com` entry; add Instagram CDN hosts for IG embeds/thumbnails: `{ protocol: 'https', hostname: '**.cdninstagram.com' }` and `{ protocol: 'https', hostname: '**.fbcdn.net' }`. Use the object form (not deprecated `domains`).

**Verification:** `pnpm install` clean; `pnpm why @keystar/ui` reported; `pnpm lint` clean; `pnpm build` succeeds. Report the `@keystar/ui` version.

---

## Task 2: Keystatic config — posts collection, env storage, document field with custom blocks

**Goal:** Create `keystatic.config.ts` at the repo root defining the `posts` collection and the configurable storage. This is the content model the whole blog reads.

**Steps:**
1. Create `keystatic.config.ts` at repo root. Import `config, fields, collection, component` from `@keystatic/core`.
2. Storage: env-configurable exactly as in global-constraints (github when `KEYSTATIC_STORAGE==='github'` with `repo: { owner: 'ropats16', name: 'aibuildspace-landing' }`, else `{ kind: 'local' }`).
3. Collection `posts`:
   - `label: 'Posts'`, `slugField: 'title'`, `path: 'content/posts/*'`, `format: { contentField: 'content' }`, `entryLayout: 'content'`.
   - `schema`:
     - `title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } })`
     - `publishedDate: fields.date({ label: 'Published date', defaultValue: { kind: 'today' }, validation: { isRequired: true } })`
     - `draft: fields.checkbox({ label: 'Draft', description: 'Hidden from the blog, sitemap, and search until unchecked.', defaultValue: true })`
     - `summary: fields.text({ label: 'Summary', description: 'Shown on cards and used as OG description fallback.', multiline: true, validation: { isRequired: true, length: { max: 320 } } })`
     - `metaDescription: fields.text({ label: 'Meta description', description: 'SEO meta description (~150-160 chars).', multiline: true })`
     - `keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords', itemLabel: (p) => p.value })`
     - `tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value })`
     - `bannerImage: fields.image({ label: 'Banner image', description: '~1200x630 (16:9). Doubles as the social preview image.', directory: 'public/images/blog/banners', publicPath: '/images/blog/banners/', validation: { isRequired: true } })`
     - `bannerAlt: fields.text({ label: 'Banner alt text', validation: { isRequired: true } })`
     - `videoUrl: fields.url({ label: 'Source video URL', description: 'YouTube or Instagram. Optional.' })`
     - `content: fields.document({ label: 'Body', formatting: true, dividers: true, links: true, tables: true, images: { directory: 'public/images/blog/inline', publicPath: '/images/blog/inline/', schema: { alt: fields.text({ label: 'Alt text' }), title: fields.text({ label: 'Caption' }) } }, componentBlocks: { ... } })`
   - `componentBlocks` (define with `component()`):
     - `videoEmbed`: schema `{ url: fields.url({ label: 'Video URL (YouTube or Instagram)', validation: { isRequired: true } }) }`, `preview` returns a simple labeled box (string is fine). No `chromeless`.
     - `captionedImage`: schema `{ src: fields.image({ label: 'Image', directory: 'public/images/blog/inline', publicPath: '/images/blog/inline/', validation: { isRequired: true } }), alt: fields.text({ label: 'Alt text', validation: { isRequired: true } }), caption: fields.text({ label: 'Caption' }) }`. (Note: Keystatic's built-in document `images` already supports alt+caption; this explicit block is for guaranteed caption rendering. Implement both — built-in images enabled AND this block.)
4. Export `default config({...})`.

**Interfaces produced:** the `posts` schema field names above are the contract for Task 4 (reader) and all rendering tasks. `componentBlocks` keys `videoEmbed` and `captionedImage` are the contract for Task 9 (ArticleRenderer).

**Verification:** `pnpm build` succeeds (config typechecks); `pnpm lint` clean. (Admin UI itself is verified in Task 3.)

---

## Task 3: Keystatic admin routes (local-mode admin)

**Goal:** Wire the Keystatic admin app + API route so `/keystatic` works in local mode.

**Steps:** Create these files (note: app is at repo root `app/`, so relative import depth is from `app/...` to root `keystatic.config`):
1. `app/keystatic/keystatic.tsx`:
   ```tsx
   "use client";
   import { makePage } from "@keystatic/next/ui/app";
   import config from "../../keystatic.config";
   export default makePage(config);
   ```
2. `app/keystatic/layout.tsx`:
   ```tsx
   import KeystaticApp from "./keystatic";
   export default function Layout() { return <KeystaticApp />; }
   ```
   This layout must NOT render the site Nav/Footer or import globals that conflict; Keystatic ships its own UI. It should render only the Keystatic app. (Root `app/layout.tsx` still wraps it with `<html><body>` — that is fine.)
3. `app/keystatic/[[...params]]/page.tsx`:
   ```tsx
   export { default } from "../keystatic";
   ```
4. `app/api/keystatic/[[...params]]/route.ts`:
   ```ts
   import { makeRouteHandler } from "@keystatic/next/route-handler";
   import config from "../../../../keystatic.config";
   export const { POST, GET } = makeRouteHandler({ config });
   ```
   (Verify the `../` depth resolves to repo-root `keystatic.config`; adjust count if the build complains.)
5. Ensure the Keystatic admin is excluded from indexing: it lives under `/keystatic` — confirm `app/robots.ts` (Task 12 will add a disallow) or note it. For this task, just make the routes work.

**Verification:** `pnpm build` succeeds with the new routes. Run `pnpm dev` and confirm (report the manual result if reachable) that `http://127.0.0.1:3000/keystatic` loads the Keystatic UI (use 127.0.0.1, not localhost). If dev-server interactive check is not possible in the subagent, state that and rely on a clean build + correct file contents.

---

## Task 4: Content reader library

**Goal:** A typed server-only module that the blog pages, sitemap, and RSS use to read posts. Single source of truth for listing, draft filtering, sorting, and reading time.

**Steps:** Create `app/_lib/posts.ts`:
1. Import `createReader` from `@keystatic/core/reader` and `keystaticConfig` from the root `keystatic.config`.
2. `const reader = createReader(process.cwd(), keystaticConfig);`
3. Export a `Post` type capturing: `slug`, `title`, `publishedDate` (string), `draft`, `summary`, `metaDescription` (string | null), `keywords` (string[]), `tags` (string[]), `bannerImage` (string | null), `bannerAlt`, `videoUrl` (string | null). Derive from the reader entry type where possible.
4. `getAllPosts({ includeDrafts = false } = {})`: read `reader.collections.posts.all()`, map to `Post` metadata (NOT resolving the document body), filter out drafts unless `includeDrafts`, sort by `publishedDate` descending (newest first). Return `Post[]`.
5. `getPost(slug)`: `reader.collections.posts.read(slug)`; return `null` if missing. Return an object with the metadata fields plus an async `content()` accessor (or return the raw entry plus metadata) so the post page can `await entry.content()`. Keep the document body lazy.
6. `getPostSlugs()`: published slugs only (for `generateStaticParams`).
7. `readingTimeMinutes(text: string)`: ~200 wpm, min 1. Provide a helper that estimates from the rendered/plain text; since the document is structured, compute from a plaintext extraction of the document nodes (walk text nodes) — implement a small `documentToPlainText(nodes)` util here and export it for reuse.
8. Mark the file as server-only (it uses `process.cwd()` + fs via the reader). Do not add `"use client"`.

**Interfaces produced:** `getAllPosts`, `getPost`, `getPostSlugs`, `readingTimeMinutes`, `documentToPlainText`, `Post` type. These are consumed by Tasks 6, 7, 11, 12.

**Verification:** `pnpm build` succeeds; `pnpm lint` clean. If no posts exist yet, functions must return empty arrays / null without throwing.

---

## Task 5: Shared chrome + site data (nav, footer, social, blog layout)

**Goal:** Make `Nav` + `Footer` appear on blog routes, make nav links cross-route aware, and add LinkedIn across the site.

**Steps:**
1. `data/site.ts`:
   - Add `linkedin: "https://www.linkedin.com/in/rohit-pathare-88205b162/"` to `site.social`.
   - Change `navLinks` anchors to cross-route absolute form so they work from `/blog`: `/#services`, `/#examples` (label "Sample prompts"), `/#builds`, `/#about`. Add a `{ href: "/blog", label: "Blog" }` entry (place it last, or after About — choose a sensible order; Blog should be discoverable).
2. `app/_components/SocialIcons.tsx`: add `LinkedinIcon({ className })` using the **official LinkedIn glyph path** (do not invent one), matching the existing convention (`viewBox="0 0 24 24"`, `fill="currentColor"`, `aria-hidden`, `className` prop).
3. `app/_sections/Footer.tsx`: add LinkedIn to the `socials` array (label "LinkedIn", `site.social.linkedin`, `LinkedinIcon`). Keep order sensible (e.g. Substack, Instagram, LinkedIn, YouTube, X).
4. `app/_sections/Nav.tsx`: links already map `navLinks`. Confirm the "Book a call" href becomes `/#book` (cross-route). Ensure clicking a `/#...` link from `/blog` navigates home then scrolls. Keep the existing mobile menu behavior. No visual redesign.
5. `app/blog/layout.tsx`: a server layout that renders `<Nav />`, `<main className="flex-1">{children}</main>`, `<Footer />` — mirroring `app/page.tsx`'s structure so blog pages get the same chrome. (Root layout provides `<html><body className="min-h-full flex flex-col ...">`.)

**Interfaces produced:** `site.social.linkedin`, `LinkedinIcon`, cross-route `navLinks` with Blog link, `app/blog/layout.tsx` chrome. Consumed by Tasks 6, 7, 10, 11.

**Verification:** `pnpm build` + `pnpm lint` clean. Landing page anchors still work (the `/#services` form resolves on `/`). Report that `app/page.tsx` was NOT broken (it renders its own Nav/Footer; the blog layout is separate — do not double-wrap).

---

## Task 6: Seed content — one published post + one draft + banner asset

**Goal:** Commit real content files in Keystatic's on-disk format so the blog renders, `generateStaticParams` is non-empty, and draft filtering is testable. Author replaces these later via the editor.

**Steps:**
1. Determine the exact on-disk format Keystatic writes for this collection (`format: { contentField: 'content' }`, `path: 'content/posts/*'`): a directory per slug `content/posts/<slug>/` containing `index.mdoc` (YAML frontmatter for the non-document fields + Markdoc body for `content`). Inspect `@keystatic/core` reader/writer or the docs to confirm the frontmatter key names match the schema field names from Task 2. The safest way to get a perfectly-valid file is to run the local Keystatic admin and create a post — but if that is not feasible headlessly, hand-author the files to match the schema and verify by reading them back through `app/_lib/posts.ts` (write a tiny throwaway script run via `pnpm tsx`/node, or rely on `pnpm build` rendering the index without error).
2. Create a published post, e.g. `content/posts/welcome-to-ai-buildspace/index.mdoc`:
   - Frontmatter: `title`, `publishedDate` (a past date), `draft: false`, `summary`, `metaDescription`, `keywords` (2-3), `tags` (1-2), `bannerImage` (path to a committed banner), `bannerAlt`, optional `videoUrl` (a real YouTube URL, e.g. a short).
   - Body: a few headings, a paragraph or two (no em dashes), a list, a quote, and one inline image or `captionedImage` block, plus one `videoEmbed` block if straightforward.
3. Create a draft post `content/posts/draft-sample/index.mdoc` with `draft: true` and minimal body — used to prove drafts are hidden.
4. Banner asset: add a real ~1200x630 placeholder image at `public/images/blog/banners/welcome.png` (or reuse/generate a simple brand-colored placeholder; do NOT hotlink). If you cannot generate an image, create a lightweight SVG/PNG placeholder in brand colors. Reference it from the post frontmatter.
5. Ensure the inline image (if used) exists at the referenced `public/images/blog/inline/...` path.

**Verification:** `app/_lib/posts.ts` `getAllPosts()` returns exactly the 1 published post (draft excluded); `getAllPosts({ includeDrafts: true })` returns 2. Prove via `pnpm build` succeeding with the blog index/post pages (after Tasks 7/11 they consume it) OR a tiny node script. At minimum `pnpm build` must not error on the content files.

---

## Task 7: Blog index page + PostCard

**Goal:** `/blog` lists published posts newest-first in a responsive card grid. Use the `/frontend-design` skill for polish; match brand tokens.

**Steps:**
1. **Invoke the `frontend-design` skill** before building UI.
2. `app/blog/_components/PostCard.tsx` (server component): props = a `Post`. Renders an `<article>` link card: banner image (Next `<Image>`, 16:9, `alt={bannerAlt}`, rounded top), title (`font-display`, link to `/blog/<slug>`), summary (muted, clamp 2-3 lines), date (formatted, e.g. "Jun 12, 2026"), and tags as small pills. Use the card pattern from global-constraints (rounded-2xl, ring, hover elevation). Whole card clickable via a `next/link` wrapping or an overlay link with accessible title.
3. `app/blog/page.tsx` (server component): `getAllPosts()`; render a page header (use `Section` or a custom hero header: eyebrow "Blog", h1 title like "Notes & how-tos", short lede) then a responsive grid (`grid gap-6 sm:grid-cols-2 lg:grid-cols-3` or similar) of `PostCard`. Empty state: a tasteful "No posts yet" card if the list is empty. Optional lightweight tag filter is allowed but not required (keep v1 simple — you may skip it).
4. Export `metadata` for `/blog`: title "Blog", description, canonical `/blog`, OpenGraph. (Per-post metadata is Task 11.)
5. Uses the chrome from `app/blog/layout.tsx` (Task 5) — do not re-add Nav/Footer here.

**Verification:** `pnpm build` + `pnpm lint` clean. `/blog` renders the seed published post and not the draft. Note the responsive behavior implemented.

---

## Task 8: VideoEmbed component (YouTube lite-embed + Instagram + fallback)

**Goal:** A client component that detects the platform from a URL and renders an inline player. YouTube is the polished path; Instagram is best-effort.

**Steps:**
1. `app/blog/_components/VideoEmbed.tsx` (`"use client"`): props `{ url: string; title?: string }`.
2. Detect platform:
   - YouTube / Shorts (`youtube.com/watch?v=`, `youtu.be/`, `youtube.com/shorts/`): extract the video id. Render a **lite-embed** (responsive 16:9 wrapper, `aspect-video`): show the thumbnail (`https://i.ytimg.com/vi/<id>/hqdefault.jpg` via Next `<Image>`) with a play button overlay; on click, swap in an `<iframe>` to `https://www.youtube-nocookie.com/embed/<id>?autoplay=1` with proper `allow` + `title`. Emit `capture("video_play", { platform: "youtube", url })` on first play.
   - Instagram (`instagram.com/reel/`, `/p/`, `/tv/`): render the IG embed via blockquote + loading `https://www.instagram.com/embed.js` (load the script once, call `window.instgrm?.Embeds.process()` after mount). Style the wrapper to look clean and centered. Emit `capture("video_play", { platform: "instagram", url })` when the embed becomes visible/loaded (best-effort).
   - Unknown/failed: render a **branded link card** (rounded-2xl, accent) "Watch the video ->" linking out (target _blank, rel noopener).
3. No layout shift: reserve aspect ratio. Lazy: do not autoload heavy iframes/scripts until interaction/visible.

**Interfaces produced:** `VideoEmbed` consumed by Task 9 (the `videoEmbed` component block) and Task 11 (top-level `videoUrl`).

**Verification:** `pnpm build` + `pnpm lint` clean. Describe the YouTube lite-embed click behavior. (Runtime IG embed verified later manually.)

---

## Task 9: ArticleRenderer + prose styles + ReadingMeta

**Goal:** Render a Keystatic `document` to branded HTML, with hand-styled prose (no typography plugin), custom blocks mapped to components, and heading anchors.

**Steps:**
1. Add hand-styled prose to `app/globals.css`: a `.prose` class (Tailwind v4 — use `@layer` or plain CSS with the design tokens/CSS vars) styling `h2/h3/h4` (font-display, tracking-tight, spacing), `p` (leading-relaxed, muted-ink), `ul/ol/li`, `blockquote` (left border accent, muted), `a` (accent, underline on hover), `code`/`pre` (mono, card bg, rounded), `hr`, `img` (rounded-2xl), `figure/figcaption` (caption = small muted centered). Keep it readable max-width when used standalone. Match brand; no generic defaults.
2. `app/blog/_components/ArticleRenderer.tsx` (server component): props = the resolved document `content` (array of nodes). Use `DocumentRenderer` from `@keystatic/core/renderer` wrapped in a `<div className="prose">`.
   - `renderers.block.heading`: render `h2/h3/...` with an `id` slugified from the text (for deep links / anchor links). Provide a stable slugify.
   - `renderers.block.image`: render `<figure>` with Next `<Image>` (or `<img>` if dimensions unknown), `alt`, and `<figcaption>` from the image `title`/caption when present.
   - Other block/inline renderers: keep defaults or light wrappers; ensure links get `rel="noopener noreferrer"` + `target="_blank"` for external.
   - `componentBlocks`:
     - `videoEmbed: (props) => <VideoEmbed url={props.url} />` (import from Task 8).
     - `captionedImage: (props) => <figure>...Next Image src={props.src} alt={props.alt}...<figcaption>{props.caption}</figcaption></figure>`.
   - Note: `props.src`/image fields from the renderer are the public path strings; handle accordingly.
3. `app/blog/_components/ReadingMeta.tsx` (server component): props `{ date: string; minutes: number }`. Renders byline "By Rohit", formatted date, and "<n> min read", separated by dots, in muted small text.

**Interfaces produced:** `ArticleRenderer`, `ReadingMeta`, `.prose`. Consumed by Task 11.

**Verification:** `pnpm build` + `pnpm lint` clean. Heading anchors present (ids). Custom blocks compile against the Task 2 schema shape.

---

## Task 10: ShareBar + follow row

**Goal:** A client component with copy-link + share-to-X + share-to-LinkedIn, and a "follow me" row, each emitting analytics events.

**Steps:**
1. `app/blog/_components/ShareBar.tsx` (`"use client"`): props `{ url: string; title: string }` (url = absolute post URL).
   - Copy link: Clipboard API; show "Copied" feedback (timeout). `capture("share_click", { method: "copy" })`.
   - Share to X: open `https://twitter.com/intent/tweet?url=...&text=...` (encode title). `capture("share_click", { method: "x" })`.
   - Share to LinkedIn: open `https://www.linkedin.com/sharing/share-offsite/?url=...`. `capture("share_click", { method: "linkedin" })`.
   - Use icon buttons (reuse `XIcon`, `LinkedinIcon` from SocialIcons; a simple copy/link icon is fine to hand-draw since it is not a brand logo). Accessible `aria-label`s.
2. Follow row: render links to `site.social` (Instagram, X, LinkedIn, YouTube, Substack) using the existing SocialIcons, styled like the Footer social pills. Each emits `capture("social_click", { network })`. Label the row "Follow along" or similar.
3. Layout: responsive, unobtrusive; fits within the post reading column.

**Interfaces produced:** `ShareBar`. Consumed by Task 11.

**Verification:** `pnpm build` + `pnpm lint` clean. Describe the copy/X/LinkedIn intent URLs used.

---

## Task 11: Post page + generateMetadata + JSON-LD

**Goal:** `/blog/<slug>` reading page assembling banner, title, ReadingMeta, optional top video, ArticleRenderer, ShareBar; full per-post SEO; static generation.

**Steps:**
1. `app/blog/[slug]/page.tsx` (server component, async):
   - `generateStaticParams()` -> `getPostSlugs()` mapped to `{ slug }` (published only).
   - `Page({ params })`: `const { slug } = await params;` `const post = await getPost(slug);` if missing -> `notFound()`. In production, if `post.draft` -> `notFound()` (drafts not publicly reachable). 
   - Layout (reading column, e.g. `max-w-3xl mx-auto` inside Container): h1 title (`font-display`), `<ReadingMeta date minutes={readingTimeMinutes(plainText)} />`, banner image (Next `<Image>`, `alt={bannerAlt}`, 16:9, rounded), optional `<VideoEmbed url={post.videoUrl} />` when present (top of article), then `<ArticleRenderer content={await post.content()} />`, then `<ShareBar url={absoluteUrl} title={post.title} />`.
   - Compute plain text for reading time via `documentToPlainText` (Task 4) on the resolved content.
   - Inject JSON-LD: a `<script type="application/ld+json">` with a `BlogPosting` object — `headline` (title), `description` (metaDescription || summary), `image` (absolute banner URL), `datePublished` (publishedDate), `dateModified` (publishedDate), `author` (`{ "@type": "Person", "name": "Rohit" }`), `publisher` (`{ "@type": "Organization", "name": "AI Buildspace", logo: ... }`), `mainEntityOfPage` (absolute post URL), `keywords` (joined). Use `JSON.stringify` (safe — no user HTML); render via `dangerouslySetInnerHTML`.
2. `generateMetadata({ params })` (async): await params, get post. Return `Metadata`:
   - `title: post.title` (root template appends "· AI Buildspace").
   - `description: post.metaDescription || post.summary`.
   - `keywords: post.keywords`.
   - `alternates: { canonical: '/blog/' + slug }`.
   - `openGraph: { type: 'article', url, title, description, publishedTime: publishedDate, authors: ['Rohit'], images: [{ url: bannerImage (absolute), width: 1200, height: 630, alt: bannerAlt }] }`.
   - `twitter: { card: 'summary_large_image', title, description, images: [bannerImage] }`.
   - If `post.draft` (only reachable in dev) or missing: `robots: { index: false, follow: false }` and minimal metadata. Missing post -> return a not-found-ish metadata.
   - Build absolute URLs from `site.url` (metadataBase already set in root layout, but JSON-LD needs absolute strings explicitly).
3. Use chrome from `app/blog/layout.tsx`.

**Verification:** `pnpm build` succeeds and statically generates the seed post route; `pnpm lint` clean. View built HTML / `generateMetadata` output: title, description, keywords, canonical, OG (type article, image), twitter, and the JSON-LD `BlogPosting` are present and well-formed. Draft route not generated.

---

## Task 12: Sitemap + RSS + Google Search Console verification

**Goal:** Search engines can crawl published posts; RSS feed exists; GSC verification wired.

**Steps:**
1. `app/sitemap.ts`: keep the homepage entry; add a `/blog` entry; add one entry per **published** post (`getAllPosts()`), `url = site.url + '/blog/' + slug`, `lastModified = new Date(publishedDate)`, sensible `changeFrequency`/`priority`. Drafts excluded (getAllPosts already excludes them). Keep it a sync or async default export per Next 16 (async allowed).
2. `app/rss.xml/route.ts`: a `GET` route handler returning RSS 2.0 XML (hand-rolled, no dep). Channel: title "AI Buildspace", link `site.url`, description, language. One `<item>` per published post: `title`, `link` (absolute `/blog/<slug>`), `guid` (same), `pubDate` (RFC-822 from publishedDate), `description` (summary, XML-escaped). Return `new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })`. Escape all dynamic text. Add `<atom:link rel="self">` to self URL.
3. `app/robots.ts`: add a `disallow` for `/keystatic` and `/api/keystatic` (admin should not be crawled). Keep sitemap reference.
4. Google Search Console verification: in `app/layout.tsx` root `metadata`, add `verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }` (only meaningful when the env var is set; harmless when undefined). 
5. Optional: add a `<link rel="alternate" type="application/rss+xml">` to the blog index/head so feed readers discover it.

**Verification:** `pnpm build` + `pnpm lint` clean. `sitemap.xml` includes `/blog` + the published post and NOT the draft. `/rss.xml` returns valid XML (well-formed; check escaping). `robots` disallows `/keystatic`.

---

## Task 13: Analytics provider + Speed Insights + event wiring

**Goal:** Initialize PostHog (deferred), capture pageviews on route changes, mount Vercel Speed Insights, and wire the remaining events. Make `capture()` (Task 1 helper) actually work.

**Steps:**
1. `app/_components/PostHogProvider.tsx` (`"use client"`): on mount, **deferred** (e.g. `requestIdleCallback`/`setTimeout` post-load), if `NEXT_PUBLIC_POSTHOG_KEY` present, `posthog.init(key, { api_host, capture_pageview: false, ... })`. Respect prior opt-out from localStorage (if user opted out, call `posthog.opt_out_capturing()` after init or skip capture). Provide route-change pageview capture: a child that uses `usePathname()` + `useSearchParams()` in an effect to `capture("pageview", { path })` (wrap the `useSearchParams` part in `<Suspense>` per Next requirements). If no key, render children only (no-op).
2. Root `app/layout.tsx`: wrap `{children}` with `<PostHogProvider>` and add `<SpeedInsights />` from `@vercel/speed-insights/next`. Keep existing fonts/metadata. Ensure provider does not block render (it is a client island around children; children remain server-rendered).
3. Event wiring (use the Task 1 `capture` helper everywhere):
   - `cta_book_call_click`: on the "Book a call" links in `app/_sections/Nav.tsx` (both desktop + mobile) and any primary booking CTA in `Hero`/`Booking` sections. Add lightweight `onClick` handlers (Nav is already a client component; Hero/Booking — only add client handlers if those are client components, otherwise wrap the specific CTA in a tiny client component to avoid converting whole sections). Keep changes minimal and non-visual.
   - `blog_post_view`: fire once on the post page mount — add a tiny client component (e.g. `PostViewTracker` with `{ slug }`) rendered by Task 11's page, calling `capture("blog_post_view", { slug })` in an effect.
   - `scroll_depth`: in the same post tracker, fire `capture("scroll_depth", { slug, percent })` at 25/50/75/100% milestones (debounced, each fired once).
   - `video_play` / `share_click` / `social_click`: already emitted by Tasks 8/10 — confirm they flow once the provider is live.
4. Do not break the build when env vars are absent (analytics fully optional).

**Note for controller:** this task edits the post page (add `<PostViewTracker />`) and Nav — coordinate that Task 11's page renders the tracker, or add it here.

**Verification:** `pnpm build` + `pnpm lint` clean. With no PostHog key, app behaves normally (no errors, no network). Describe how pageview + blog_post_view + scroll depth fire. Confirm `<SpeedInsights />` mounted.

---

## Task 14: Consent banner

**Goal:** A small, non-intrusive consent banner. Default opt-IN; user can opt out; choice persisted; opt-out calls `posthog.opt_out_capturing()`.

**Steps:**
1. **Invoke the `frontend-design` skill** for polish.
2. `app/_components/ConsentBanner.tsx` (`"use client"`): pinned bottom-left, small card (brand tokens, rounded-2xl, subtle shadow), short copy ("We use privacy-friendly analytics to improve the site." no em dashes), with "Got it" (dismiss, keep opt-in) and "Opt out" actions, plus a small link/text. On mount, read `localStorage` consent key:
   - If unset: show the banner; default state is opted-in (analytics already capturing). "Got it" sets consent=`granted` and hides. "Opt out" sets consent=`denied`, calls `posthog.opt_out_capturing()`, hides.
   - If `granted`: do not show; ensure capturing on. If `denied`: do not show; call `posthog.opt_out_capturing()` (idempotent) so it persists across reloads.
3. Mount `<ConsentBanner />` in root `app/layout.tsx` (after children, before `</body>`), so it shows on landing + blog.
4. Ensure it does not cause layout shift or block content; dismissible via keyboard; `role="dialog"`/appropriate aria or a simple region with a labeled close.

**Verification:** `pnpm build` + `pnpm lint` clean. Describe persistence + opt-out behavior. With no PostHog key, the banner still renders and the opt-out is a safe no-op.
