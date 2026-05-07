# Plan: AI Buildspace Portfolio Site

> Source PRD: `./PRD.md`
> Mode: Direct-to-code (no Pencil.dev mockup phase).

## Architectural decisions

Durable across all phases:

- **Stack**: Next.js 15 (App Router) + TypeScript (strict) + Tailwind CSS + Framer Motion. Package manager: pnpm.
- **Hosting**: Vercel. Domain: `aibuildspace.com`.
- **Routes**: Single page at `/`. Anchors: `#how`, `#services`, `#examples`, `#watch`, `#about`, `#faq`, `#book`. API: `POST /api/lead` (server route).
- **Sections / components**: One component per section in `app/_sections/`: `Nav`, `Hero`, `HowIWork`, `Services`, `Examples`, `Watch`, `About`, `FAQ`, `Booking`, `Footer`. Shared primitives in `app/_components/`.
- **Data layer**: Typed config files in `data/` — `tools.ts`, `examples.ts`, `services.ts`, `faq.ts`, `workshops.ts`, `philosophy.ts`. No CMS.
- **Assets**: SVG tool logos in `public/logos/`. Mini-artifact previews as inline SVG / styled HTML (no screenshot images). Headshot + OG in `public/`. Any MP4 clips lazy-loaded via `<video preload="none">`.
- **External services**:
  - Cal.com inline embed (`@calcom/embed-react`) — placeholder URL until real one supplied.
  - Resend for lead-form delivery (env: `RESEND_API_KEY`, `LEAD_TO_EMAIL`).
  - Plausible (preferred) or Vercel Analytics for traffic.
- **Fonts**: `next/font/google` — Bricolage Grotesque (display, 500/600/700) + Inter (body, 400/500). Tabular nums enabled.
- **Theme**: CSS variables in `app/globals.css` — `--bg` (~#FAFAF7), `--ink`, `--muted`, `--accent` (TBD: cobalt | violet | rust). Single accent token.
- **Motion**: Framer Motion for orbit + reveals; `useReducedMotion()` hook + `@media (prefers-reduced-motion)` fallbacks. Reduced-motion replaces orbit with static 2×2 (or 4-card) artifact grid.
- **A11y**: Semantic landmarks, alt text, aria-labels on interactive logos, keyboard nav (`←/→` cycles orbit examples, `Tab`/`Enter` works everywhere), focus-visible rings.
- **Perf budget**: LCP < 2.0s, CLS < 0.1, JS < 150KB first load. Orbit code-split via `dynamic(() => import('...'), { ssr: false })`.
- **SEO/meta**: Per-section semantic HTML; `metadata` export with title, description, OG image, Twitter card.

---

## Phase 1: Skeleton + nav/footer shell + booking placeholder

**User stories**: 6, 17, 19, 25

### What to build

Greenfield Next.js scaffold deployable to Vercel preview. Sticky minimal nav (wordmark left, anchor links + primary CTA right). Empty placeholder sections rendering as anchor targets so nav scroll works. Footer with mark, social icon row, contact email, year. `#book` section already mounts the Cal.com inline embed (placeholder URL) so every CTA in later phases anchor-scrolls to a working component. Base SEO meta + responsive shell.

### Acceptance criteria

- [ ] `pnpm dev` boots Next.js App Router project with TypeScript strict mode
- [ ] Tailwind configured; `globals.css` defines `--bg`, `--ink`, `--muted`, `--accent` CSS variables
- [ ] `next/font` loads Bricolage Grotesque + Inter; applied via root layout
- [ ] Sticky nav: `AI Buildspace` wordmark, anchor links (Services, Examples, Watch, About), primary `Book a call` CTA → `#book`
- [ ] Mobile nav collapses to hamburger or stacked links; no horizontal scroll
- [ ] Each anchor section (`#how`, `#services`, `#examples`, `#watch`, `#about`, `#faq`, `#book`) renders as a placeholder block with a heading
- [ ] `#book` section mounts `@calcom/embed-react` with placeholder URL constant in `data/booking.ts`
- [ ] Footer: wordmark, Substack/Instagram/YouTube/X icon row, contact email, current year
- [ ] Root `metadata` export sets title, description, viewport
- [ ] `robots.txt` + `sitemap.xml` (App Router conventions)
- [ ] `pnpm build` succeeds with zero TS / lint errors
- [ ] Page renders correctly at 375px / 768px / 1280px / 1920px widths
- [ ] Vercel preview deploy succeeds (manual step, unblocked)

---

## Phase 2: Hero — static fallback first

**User stories**: 1, 4, 9, 10, 15

### What to build

Hero section with headline ("Work smarter with AI..."), sub-headline, dual CTA (primary `Book a call with Rohit` → `#book`; secondary `See what I build` → `#examples`), small Rohit headshot adjacent to CTA. Below the headline, a static 4-card example grid showing composed prompt + outcome artifact pairs. This grid doubles as the `prefers-reduced-motion` fallback for the orbit shipping in P3. "Global, timezone-flexible" microcopy near the CTA.

### Acceptance criteria

- [ ] Hero headline set in Bricolage Grotesque display weight
- [ ] Sub-headline + tagline copy from PRD ("hand-off-able workflows for solopreneurs, owners, and founders")
- [ ] Dual CTA buttons; primary is high-contrast accent, secondary is ghost/outline
- [ ] Rohit headshot rendered via `next/image` (square crop, optimized)
- [ ] "Global · timezone-flexible" microline near CTA
- [ ] Static 4-card grid: each card has composed prompt (Inter) + mini artifact preview (inline SVG / styled HTML)
- [ ] Card layout: 2×2 on desktop, 1-col on mobile, generous whitespace per tokens.xyz aesthetic
- [ ] Hero respects max-width ~1280px, section padding 96–128px desktop
- [ ] Smooth scroll to `#book` and `#examples` on CTA click
- [ ] LCP element (likely headline or headshot) renders < 2.0s on 4G throttle (Lighthouse mobile)
- [ ] `data/examples.ts` defines all 6 PRD examples; hero static grid renders 4 (configurable)

---

## Phase 3: Hero kinetic orbit animation

**User stories**: 12, 13, 15, 20

### What to build

Replace hero's static grid with the kinetic orbit when motion is allowed. 16–17 tool logos arranged in 2–3 concentric rings around the headline pill, rotating continuously at different per-ring speeds. ~5–6s loop: one logo pulls inward, scales up + brightens, morphs into a request card with composed prompt (typewriter feel), paired outcome card slides in beside it, persists ~3s, fades out, logo returns. Hover (desktop) / tap (mobile) on any logo pauses rotation and surfaces that logo's example. Keyboard `←/→` cycles examples. `prefers-reduced-motion` → static grid from P2.

### Acceptance criteria

- [ ] `data/tools.ts` lists 16–17 tools per PRD roster (Claude, Codex, ChatGPT, Gmail, GCal, Slack, Notion, Drive, Granola, Jira, Lovable, Replit, Cal.com, HeyGen, ElevenLabs, Midjourney, Runway) with SVG asset path + display name + linked example id
- [ ] All logos available as optimized SVG in `public/logos/`
- [ ] Orbit component code-split (`dynamic(..., { ssr: false })`); not in critical JS bundle
- [ ] 2–3 concentric rings rotate at distinct speeds via Framer Motion `animate` loop
- [ ] Loop choreography runs end-to-end: pull-in → request card (typewriter) → outcome card → fade-out → return
- [ ] Outcome cards show category-tinted soft glow (mail=blue, deck=violet, slack=green, video=warm) per PRD
- [ ] Hover any logo (desktop) pauses rotation + reveals that logo's request/outcome pair
- [ ] Tap any logo (mobile) does the same
- [ ] Keyboard: focused orbit container responds to `←/→` to cycle, `Enter` to expand
- [ ] Every logo has `aria-label` describing the tool + its example
- [ ] `useReducedMotion()` returns true → orbit not mounted; P2 static grid renders instead
- [ ] No layout shift on mount (CLS contribution < 0.05)
- [ ] Orbit chunk lazy-loaded; first-load JS still under budget

---

## Phase 4: How-I-work + service ladder

**User stories**: 3, 7, 10, 11, 23

### What to build

Two adjacent strips. **How I work**: 3 philosophy tiles ("Hand-off-able", "Single-purpose beats over-engineered", "Custom over locked-in") with one-line copy each. **Service ladder**: 4 tiles — Intro Session, Workshop (with 1:1 / Team toggle inside the tile), Custom Build Sprint, Optional Retainer. Each tile shows duration/scope summary + "Quote on call" + a CTA linking to `#book`. Reinforces the "hand-off-able, no vendor lock-in" moat against Lindy/Zapier-AI.

### Acceptance criteria

- [ ] `data/philosophy.ts` defines 3 tiles (title + one-line body); section `#how` renders them in a 3-up grid (1-col mobile)
- [ ] `data/services.ts` defines 4 tiers with: name, duration/scope summary, 2–3 bullet description, CTA text
- [ ] Workshop tile has a toggle (1:1 / Team) that swaps body copy without re-rendering the section
- [ ] Every service tile shows "Quote on call" prominently — no price anchors
- [ ] Each service tile CTA scrolls to `#book`
- [ ] Section `#services` heading + sub-copy ("Pick the entry point that fits") above the grid
- [ ] Tile layout: 4-up on desktop, 2-up tablet, 1-up mobile; consistent height per row
- [ ] Workshop toggle accessible (radio group, keyboard, aria)
- [ ] Hover/focus state on tiles (subtle elevation or accent border)

---

## Phase 5: Anchor workflow examples grid

**User stories**: 2

### What to build

Section `#examples` rendering the 6 PRD example cards in a grid. Each card shows the composed prompt (1–2 lines) + mini artifact preview built as inline SVG / styled HTML (no screenshots): email-digest mock, Notion-style report mock with table, slide thumbnails (3 visible + "+7 more"), inbox UI mock with highlighted draft, vertical video frame with play overlay, Slack message bubble with bullet list. Single source of truth for example copy/artifact specs is `data/examples.ts` — already populated in P2 for the hero static grid.

### Acceptance criteria

- [ ] `data/examples.ts` has all 6 examples with: id, prompt, artifact-type, category color
- [ ] Each artifact type has a dedicated React component in `app/_components/artifacts/`: `EmailDigest`, `ReportMock`, `SlideThumbs`, `InboxMock`, `VideoFrame`, `SlackMessage`
- [ ] Artifacts use only inline SVG / styled HTML — no PNG screenshots
- [ ] Each card uses category-tinted soft glow matching PRD (mail/deck/slack/video) consistent with orbit outcome cards
- [ ] Grid: 3-up desktop, 2-up tablet, 1-up mobile
- [ ] Section heading + sub-copy frame the examples ("Six example workflows" or similar)
- [ ] Cards keyboard-focusable; focused state visually distinct
- [ ] Same `examples` data drives both hero static grid (P2) and this section

---

## Phase 6: Watch + About + FAQ

**User stories**: 8, 11, 14, 19, 21, 22

### What to build

Three sections in sequence.
**Watch me build** (`#watch`): 3–6 YouTube workshop thumbnail tiles linking out to videos. "Now building: …" anonymized engagement line ("trading research + execution automation for a family office"). Workshop count badge ("[N] workshops hosted live").
**About** (`#about`): 1–2 paragraph Rohit + AI Buildspace origin story, prominent headshot, social icon row (Substack, Instagram, YouTube, X).
**FAQ** (`#faq`): Accordion with the 6 PRD questions (pricing, timeline, what I don't build, tools, handoff, NDAs).

### Acceptance criteria

- [ ] `data/workshops.ts` lists 3–6 YouTube videos: id, title, thumbnail URL (or local fallback), watch URL
- [ ] Watch tiles: 3-up desktop, 2-up tablet, 1-up mobile; YouTube thumbnails with play-icon overlay; tile is a link with `target="_blank" rel="noopener"`
- [ ] Workshop count badge above or beside tiles ("N workshops hosted live") with N from `data/workshops.ts`
- [ ] "Now building" line visually distinct (italic or accent), positioned at end of Watch section
- [ ] About section: paragraphs, prominent headshot (`next/image`), social icons (Substack/Insta/YT/X) with aria-labels
- [ ] FAQ: native `<details>`/`<summary>` accordion or accessible custom; expand/collapse keyboard accessible
- [ ] `data/faq.ts` holds the 6 questions and answers
- [ ] Each FAQ item independently expandable; only one open at a time NOT enforced (keep simple)
- [ ] All sections respect max-width + section padding system
- [ ] Social icons in About are distinct from footer (PRD: "near About, not the hero")

---

## Phase 7: Booking section + lead form

**User stories**: 4, 5, 9, 23

### What to build

Finalize `#book` section as a two-column layout: Cal.com inline embed (left) + "describe your problem" form (right). Form fields: name, email, project description (textarea), data sources (optional). Submission posts to `POST /api/lead` server route, which forwards via Resend to Rohit's inbox. Success/error states. Optional 1-line "scope-fit checker" microcopy above the form ("Tell me your data sources — I'll say if it's a fit"). Keep Cal.com placeholder URL until real URL supplied.

### Acceptance criteria

- [ ] `#book` section heading + sub-copy frame the choice ("Book direct or describe your problem first")
- [ ] Left column: Cal.com inline embed (URL from `data/booking.ts`, env-overridable)
- [ ] Right column: form with `name`, `email`, `description` (textarea, required), `dataSources` (optional)
- [ ] Form uses native HTML validation + accessible labels + `aria-describedby` for hints
- [ ] Submit handler `POST`s JSON to `/api/lead`
- [ ] `app/api/lead/route.ts` validates payload (zod), calls Resend (`RESEND_API_KEY`, `LEAD_TO_EMAIL` env vars), returns 200 / 400 / 500
- [ ] Success state replaces form with thank-you message
- [ ] Error state shows inline error + retry
- [ ] Form respects honeypot field or lightweight spam check (no captcha)
- [ ] Layout collapses to single column on mobile (Cal.com first, form second)
- [ ] `.env.example` lists `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `NEXT_PUBLIC_CAL_URL`
- [ ] Optional scope-fit checker microcopy above form

---

## Phase 8: Polish — analytics, OG, perf, a11y pass

**User stories**: 16, 18, 20, 24

### What to build

Final pass before launch. Wire Plausible (preferred) or Vercel Analytics with event tracking on every CTA. Generate OG image (orbital still or wordmark composition) for link previews. Audit and tune perf to hit budget (LCP < 2.0s, CLS < 0.1, JS < 150KB first load): convert any remaining raster to AVIF/WebP, lazy-load any video clips, defer non-critical scripts. Full a11y sweep: alt text on every image, aria-labels on every interactive element, keyboard navigation works through entire page, color contrast passes WCAG AA, focus-visible rings present.

### Acceptance criteria

- [ ] Plausible (or Vercel Analytics) script added; verified on Vercel preview
- [ ] CTA click events tracked on: nav `Book a call`, hero primary/secondary CTAs, every service tile CTA, FAQ expansions (optional), form submit, Cal.com booking-complete event if exposed
- [ ] OG image at `app/opengraph-image.tsx` (Next.js generated) or static `public/og.png`; renders 1200×630
- [ ] Twitter card meta + OG meta verified via debugger tools
- [ ] Lighthouse mobile run: LCP < 2.0s, CLS < 0.1, performance score ≥ 90
- [ ] First-load JS ≤ 150KB (verify via `next build` output; orbit chunk separate)
- [ ] All `<Image>` uses explicit width/height + responsive `sizes`
- [ ] Any video uses `preload="none"` + lazy mount
- [ ] All `<img>` / `<Image>` have meaningful `alt` (decorative ones: `alt=""`)
- [ ] All interactive non-text elements have `aria-label` or visible label
- [ ] Tab traversal covers nav → hero CTAs → orbit (keyboard cycle) → all sections → form → footer with logical order
- [ ] Color contrast: body text ≥ 4.5:1, large text ≥ 3:1 (verified per accent choice)
- [ ] `prefers-reduced-motion` re-verified end-to-end
- [ ] Production deploy on `aibuildspace.com` (manual cutover step, unblocked)

---

## Unresolved questions

(answer before / during relevant phase)

- Accent color — cobalt, violet, rust, other? (blocks P1 finalization, P2/P3 visuals)
- Headshot — current OK or reshoot? (blocks P2/P6)
- Real Cal.com URL? (placeholder until supplied; blocks P7 final)
- Workshop count N + 4–6 specific YT URLs? (blocks P6)
- Family-office anonymization wording final, or other engagements? (blocks P6)
- Logo lockup — "AI Buildspace" alone or "+ by Rohit"? (blocks P1 nav)
- Substack URL, IG handle, YT channel, X handle? (blocks P1 footer + P6 about)
- Midjourney vs. Imagen (or both) in orbit? (blocks P3 tool roster)
- Any "as featured by" mention? (optional — affects About in P6)
- OG image direction — orbital still / headshot / wordmark? (blocks P8)
- Plausible ($9/mo) vs. Vercel Analytics free? (blocks P8)
- Resend account ready, or use Formspree fallback? (blocks P7)
- Domain `aibuildspace.com` DNS access ready? (blocks P8 cutover)
