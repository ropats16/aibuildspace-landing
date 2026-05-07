# PRD — AI Buildspace Portfolio Site

## Context

Rohit runs **AI Buildspace** — AI consulting (sessions, workshops, custom-workflow builds) for solopreneurs, SMB owners, and founders. Today, all leads come from Instagram (tagline: *helping business owners, solopreneurs, and founders work smarter with AI*) but there's nowhere for that traffic to land, evaluate fit, and book a call. Trust currently lives in YouTube workshop livestreams + Insta reels — but it isn't aggregated anywhere. This PRD specifies a single-page portfolio site that:

1. Anchors a kinetic hero (orbiting tool logos animating into request → outcome cards) over tokens.xyz-clean visual hygiene.
2. Sells a 4-tier service ladder (intro → workshop → custom-build sprint → optional retainer).
3. Routes everything to a single primary CTA: book a discovery call with Rohit (Cal.com embed). Pricing is quote-based, scoped on call.
4. Uses Rohit's existing public body of work (livestreamed YT workshops, IG reels) as the proof surface — replacing absent client-logo trust strips.
5. Differentiates against vendor-locked agent platforms (Lindy etc.) by selling **hand-off-able**, client-tweakable workflows.

The site is the conversion engine for Rohit's existing Instagram audience. Substack stays separate for thought-leadership essays.

---

## Problem Statement

Rohit's prospects (solopreneurs, SMB owners, early-stage founders) discover him on Instagram and have nowhere to:

- Quickly grasp what AI Buildspace concretely does (vs. abstract "AI consulting").
- See real workflows (daily prep, research → report, deck from brief, inbox triage, single-format video, custom skills).
- Pick the right entry point (one-off session vs. workshop vs. ship-a-system sprint vs. retainer).
- Book a call without DM ping-pong.

Result: warm Insta traffic doesn't convert, qualifying conversations are inefficient, and there's no asset to share with a referrer's friend.

## Solution

A **single-page** portfolio at `aibuildspace.com` with:

- A **kinetic hero**: 16–17 tool logos in 2–3 orbital rings; on a ~5–6s loop, one logo pulls to center, becomes a request card with a composed prompt, and reveals a paired outcome card (mini artifact preview — email digest, deck slide, Slack message, report mock, dashboard tile, video frame). Reduced-motion fallback: static grid of 4 example pairs.
- **Service ladder**: 4 tiers (Intro Session → Workshop → Custom Build Sprint → Optional Retainer) with workshop sub-toggle (1:1 or team).
- **Anchor workflow examples**: 6 cards, each with composed prompt + mini visual artifact preview.
- **Proof via creator content**: "Watch me build" tile group (YT workshop thumbnails) + a single anonymized in-progress engagement line.
- **How I work** philosophy section: hand-off-able, client-tweakable workflows; no vendor lock-in; explicit scope ceiling reframed positively.
- **One primary CTA** repeated with intent — Cal.com booking embed + a "describe your problem" form for async leads.
- Visual: light, near-white, tokens.xyz-clean; Bricolage Grotesque + Inter; confident plain-English voice.

## User Stories

1. As an Instagram-driven solopreneur, I want to grasp what AI Buildspace does within 5 seconds of landing, so I know whether to keep reading.
2. As a founder evaluating consultants, I want to see concrete workflow examples with outcomes, so I can judge whether Rohit's scope fits my needs.
3. As an SMB owner shopping AI help, I want a clear service ladder (intro / workshop / build / retainer), so I pick the right entry point for my budget.
4. As a visitor not ready to commit, I want to book a 15–30 min discovery call without friction, so I can evaluate fit live.
5. As an async-preferring buyer, I want to submit a project-brief form instead of scheduling, so I can describe my problem in writing first.
6. As a mobile visitor (Instagram tap-through), I want the site to feel fast and look great on my phone, so I don't bounce.
7. As a buyer comparing Rohit to Lindy/Zapier-AI, I want to understand why custom Claude/Codex workflows beat vendor-locked agents, so I see Rohit's moat.
8. As a curious lurker, I want to see Rohit's livestreamed YouTube workshops directly on the site, so I can pre-evaluate his teaching/building style.
9. As an audience member who already follows on Insta, I want a 1-tap booking with no re-introduction, so conversion is friction-less.
10. As a visitor in a non-PT timezone, I want to see "global, timezone-flexible" stated, so I don't assume a region mismatch.
11. As a buyer worried about being abandoned, I want to see "I hand off systems you can tweak yourself" reassurance, so I trust the engagement won't lock me in.
12. As a visitor curious about specific tools (Claude, Granola, Replit, ElevenLabs), I want to see them as part of Rohit's working set, so I trust delivery.
13. As a visitor exploring the orbit animation, I want hovering on a tool to be responsive and informative, so I can drill into tools I care about.
14. As a returning visitor reading the FAQ, I want to see what Rohit *doesn't* do (full multi-source agentic OS), so I don't waste a call on a misfit.
15. As a visitor with `prefers-reduced-motion`, I want the orbit to respect my preference, so the site doesn't make me nauseous.
16. As a slow-connection visitor, I want logos as SVG and video clips lazy-loaded, so the page loads quickly.
17. As an SEO-driven visitor (searching "Claude consultant", "AI workflow builder"), I want clean semantic copy + meta tags, so I find the page.
18. As a visitor wanting to share with my team, I want a clean OG image / link preview, so I can pitch internally.
19. As a content-curious lurker, I want to find Rohit's Substack from the site without it dominating, so I can lurk before booking.
20. As an accessibility-aware visitor, I want alt-tagged images and keyboard-navigable orbits, so I can use the site.
21. As a returning lurker, I want a "now building" / "latest workshop" cue, so I have a reason to revisit.
22. As a visitor reading the workshop section, I want to see counts ("N workshops hosted") with verifiable links to YouTube, so the proof feels real.
23. As a buyer wanting transparency, I want to know Rohit quotes after understanding my problem (no hidden surprises), so I trust the process.
24. As an Instagram-pixel-aware visitor, I want trackable clicks on CTAs (Plausible/Vercel Analytics) so Rohit can iterate on what's working.
25. As a visitor on a tablet between mobile and desktop, I want responsive layouts that don't break the orbit, so the experience scales.

## Implementation Decisions

### Brand & positioning
- Studio name: **AI Buildspace** (wordmark only, set in Bricolage Grotesque — no separate icon mark for v1; user can add later).
- Personal layer: subline "by Rohit" near the wordmark; photo of Rohit small in hero (alongside CTA) and prominent in About; primary CTA copy reads "Book a call with Rohit".
- Tagline (refined working draft): "Work smarter with AI — hand-off-able workflows for solopreneurs, owners, and founders."
- Voice: confident, plain-English, no jargon. Short sentences. Tools named when they help (Claude, Codex), never as buzzword decoration.

### Information architecture (single page, vertical scroll)
1. **Nav**: AI Buildspace wordmark · Services · Examples · Watch · About · [Book a call] (sticky, minimal).
2. **Hero**: orbital animation centerpiece + headline + sub-headline + dual CTA (primary: Book a call, secondary: See what I build) + small Rohit headshot adjacent to CTA.
3. **How I work** (philosophy strip): 3 short tiles framing the moat — "Hand-off-able", "Single-purpose beats over-engineered", "Custom over vendor-locked".
4. **Service ladder**: 4 tiles — Intro Session · Workshop (1:1 / Team toggle) · Custom Build Sprint · Optional Retainer.
5. **Anchor workflow examples**: 6-card grid; each card has a composed prompt + mini artifact preview.
6. **Watch me build**: 3–6 YouTube workshop thumbnail tiles (links out) + a single anonymized "Now building: …" line.
7. **About**: Rohit's story, AI Buildspace origin (1–2 paragraphs), headshot, social links.
8. **FAQ**: ~6 questions — pricing posture, timelines, what I don't build, tools I work with, handoff & maintenance, NDAs.
9. **Booking section**: Cal.com inline embed on the left, "describe your problem" form on the right (form posts to Rohit's inbox via Resend or Formspree-equivalent).
10. **Footer**: AI Buildspace mark, Substack · Instagram · YouTube · X icons, contact email, year.

### Visual system
- Palette: light, near-white bg (~#FAFAF7); ink black headlines; muted grey body; **single accent** (defer pick to mock phase — propose cobalt blue or violet; warmer alt: rust/amber). Outcome cards use a soft tinted glow per category (mail = blue, deck = violet, slack = green, video = warm).
- Type: **Bricolage Grotesque** (display, weights 500/600/700) + **Inter** (body, 400/500). Tabular nums for any numeric UI.
- Spacing: tokens.xyz-level generous whitespace; max content width ~1280px; section padding ~96–128px on desktop.
- Animation library: **Framer Motion** for the orbit + outcome reveals; CSS transitions for hover/focus.
- Reduced motion: replace orbit with a 4-card static grid; replace outcome reveals with static artifact images.

### Hero choreography (the centerpiece)
- 16–17 tool logos arranged in 2–3 concentric rings around a central headline pill.
- Continuous slow rotation (different speeds per ring for parallax).
- Loop cycle (~5–6s):
  1. One logo "pulls" inward toward the center (scales up, brightens).
  2. Logo morphs/segues into a **request card** displaying its composed prompt (typewriter-feel, 1–2 lines).
  3. A paired **outcome card** slides in beside it showing a mini visual artifact preview.
  4. Cards persist ~3s, fade out, logo returns to its orbital position.
  5. Next logo begins the cycle.
- Hover (desktop): rotation pauses; user can hover any logo to surface its specific example.
- Tap (mobile): same pause + reveal pattern.
- Accessibility: keyboard `←/→` cycles examples; reduced-motion users see a static 2×2 artifact grid; all logos have `aria-label`.

### Tools in orbit (final roster)
- **AI core**: Claude · OpenAI Codex · ChatGPT
- **Productivity**: Gmail · Google Calendar · Slack · Notion · Google Drive · Granola · Jira
- **Build**: Lovable · Replit · Cal.com
- **Media**: HeyGen · ElevenLabs · Midjourney · Runway

### Anchor composed prompts → outcomes (the 6 cards)
| Prompt (1–2 lines) | Outcome artifact preview |
|---|---|
| "Brief me at 7am every weekday: top 5 unread emails, today's calendar, urgent Slack threads." | Email digest preview ("Your morning briefing — Tuesday") |
| "Compare the top 5 CRMs for our 20-person retail team and produce a 2-page report with pricing." | Notion-style report mock with comparison table |
| "Turn last quarter's traffic data into a 10-slide investor update on our brand template." | Slide thumbnails (3 visible, "+7 more") |
| "Hourly: triage my inbox, draft replies for the urgent bucket, archive newsletters." | Inbox UI mock with drafted reply highlighted |
| "Make a 30s vertical reel of our product update using my HeyGen avatar + ElevenLabs voice." | Vertical video frame with play overlay |
| "Every Monday, post a 5-bullet GA4 + Stripe summary into #leadership on Slack." | Slack message bubble with bullet list |

### Service ladder (final copy direction)
1. **Intro Session** — 60–90 min, 1:1. Walk through your most-pressing AI question. Walk away with a written next-step plan.
2. **Workshop** — half-day or full-day. 1:1 or team (2–15). Hands-on: we build a working system together.
3. **Custom Build Sprint** — fixed-scope, 1–2 weeks. Single-source automation, skill, or lightweight dashboard/CRM. You own it and can tweak it.
4. **Optional Retainer** — monthly support hours after a sprint. Maintenance, additions, office hours.

(Pricing: every tier shows "Quote on call" — no anchors per user instruction.)

### "How I work" framing (3 tiles)
- **Hand-off-able** — "I build systems you can tweak yourself. No vendor lock-in."
- **Single-purpose beats over-engineered** — "Most needs are solved by one focused workflow, not a multi-source agent."
- **Custom over locked-in** — "Built on Claude/Codex you control — not opaque agent platforms."

### Trust / Proof strip
- "Watch me build" tile group: 3–6 YouTube workshop covers (Claude Code apps, Lovable apps, deck automation, email+cal automation, research+deck).
- One-line anonymized current engagement: "*Now building*: trading research + execution automation for a family office."
- Workshop count badge: "[N] workshops hosted live" (specific N from user).
- Subtle Substack / Instagram / YouTube icon row near the About section (not the hero).

### FAQ (initial 6)
1. **How does pricing work?** — Quote-based after a discovery call. No hidden fees; you'll know the full number before we start.
2. **How long does a custom build take?** — Sprints run 1–2 weeks for fixed scope. Larger needs are split into sequential sprints.
3. **What don't you build?** — Full multi-source agentic systems with deep long-term memory ("AI Operating Systems"). I'll be honest if your need needs that and refer you out.
4. **What tools do you work with?** — Claude, Codex, ChatGPT for AI; Gmail/Cal/Slack/Notion/Drive/Granola/Jira for productivity; Lovable/Replit/Cal.com for builds; HeyGen/ElevenLabs/Midjourney/Runway for media.
5. **Will I be able to maintain the system after?** — Yes. Every build is documented and tweakable. Optional retainer if you want me on call.
6. **Do you sign NDAs?** — Yes, on request. Engagements default to confidential.

### Tech stack
- **Frontend**: Next.js (App Router) + Tailwind CSS + Framer Motion.
- **Hosting**: Vercel.
- **Domain**: `aibuildspace.com` (owned).
- **Booking**: Cal.com inline embed.
- **Lead form**: posts to Rohit's inbox via Resend (recommended) or Formspree.
- **Analytics**: Plausible ($9/mo) — recommended; or Vercel Analytics free tier as fallback.
- **Email/list**: Substack stays separate (linked out as "Thinking"). No on-site newsletter signup.
- **Asset pipeline**: SVG logos (CDN-served), MP4 mini-clips (lazy-loaded), `<Image>` for mocks.
- **Performance budget**: LCP < 2.0s, CLS < 0.1, JS < 150KB on first load (orbit code-split).

### Mockup → implementation flow
- After PRD approval: break into a multi-phase plan file (separate from this PRD, per user instruction — Rohit will trigger this).
- Mockup phase: ui-ux-pro-max skill + Pencil.dev — produce 2–3 hero variants (orbit density / accent color) + full single-page mockup.
- Implementation phase: build per the approved mockup with the stack above.

## Out of Scope

- Multi-page CMS / blog-on-site (Substack handles thinking).
- Cohort / course platform.
- Client portal / authenticated areas.
- Multilingual / i18n (English only for v1).
- Payment / checkout on the site (pay-on-call only).
- Custom CMS for case studies (case studies are hard-coded in v1; revisit when 5+ live engagements exist).
- Service-specific landing pages (one page only for v1).

## Further Notes

- The site is sales-conversion-first; SEO is secondary in v1 (semantic copy + clean meta is enough).
- Substack and Instagram drive traffic; this site converts it. Don't fragment the audience with another newsletter.
- Once Rohit ships 2–3 paid engagements, v1.1 should add a real Case Studies block (replacing "Watch me build" or co-existing).
- Brand-logo usage (Claude, OpenAI, Slack, etc.) in the orbit is standard "tools we work with" usage and generally permissible; double-check each brand's guidelines if any logo gets large/standalone treatment.
- Headshot quality matters — should be a clean, friendly, well-lit shot (square crop). Consider a quick reshoot if current shots are uneven.
- Consider adding a 1-line "scope-fit checker" in the booking section ("Tell me your data sources — I'll say if it's a fit") to filter early.

## Unresolved questions

- Accent color — cobalt, violet, rust, or other?
- Headshot ready, or need a fresh one?
- Workshop count number for the badge?
- Specific 4–6 YouTube workshop URLs to feature?
- Family-office anonymization wording OK as drafted? Any other in-progress engagements to mention?
- Logo lockup: nav shows just "AI Buildspace" or "AI Buildspace" + "by Rohit"?
- Substack URL, IG handle, YT channel, X handle for footer?
- Which Midjourney vs. Imagen (or both) in the orbit?
- Any "as featured by" mention (podcast, newsletter, brand) Rohit forgot?
- OG image direction — orbital still, headshot, or wordmark-only?
