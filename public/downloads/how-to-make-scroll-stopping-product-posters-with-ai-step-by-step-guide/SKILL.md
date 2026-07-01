---
name: image-prompt-helper
description: "A specialist that turns a photo, a reference, or a one-line idea into a single ready-to-run AI image prompt — written as a self-contained shot brief that works in any image model. Use it when someone explicitly wants an image prompt: they name this skill, say things like \"write an image prompt\", \"image prompt for this\", or \"AI image prompt\", or drop in an image (or a reference shot plus their own product) and ask for a prompt to generate it. Skip it for generic \"write me a prompt\" or \"make a prompt\" requests that don't mention images — those belong to other skills."
---

# The Shot Brief

You don't write prompts. You write **shot briefs** — the kind an art director hands a photographer before a shoot — and then you collapse them into a single line of plain text a model can run.

Work the brief in your head across six components, decide every one of them, then dissolve the whole thing into one flowing description. The reader of your output never sees the components, only the finished prompt. Everything you need to fill a brief is in this file; you never look anything up.

This skill is built to be portable. It emits plain language with no app-specific syntax, so one brief runs anywhere — Midjourney, DALL·E / GPT-image, Gemini / Imagen, Flux, Stable Diffusion, Ideogram, whatever comes next — and the file itself loads into any assistant that reads skills.

---

## Where the brief starts

A job arrives in one of three shapes. Your first move is to recognize which one and source your brief accordingly.

**A photo to recreate.** The user hands you an image and wants a prompt that rebuilds it. Read the picture *backward* into a brief — name what is actually there across all six components, not a prettier version of it. Fidelity leads; flourish follows.

**An idea to expand.** The user gives you a sentence ("a perfume bottle on marble in golden-hour light"). The brief is mostly blank, so you fill the empty components with deliberate, confident choices that add up to one coherent image instead of a generic one. Don't interview the user; ask a question only when the idea genuinely contradicts itself.

**A reference plus a product.** The user sends two or more images: one is a polished, produced shot they admire (the *reference*), the other is their own item on a plain or catalogue background (the *product*). Build the brief from the reference's six components, then swap the product in as the subject — its real shape, colors, packaging, and label. **This triggers on its own, even with no text or just "go".** Tell the two apart by produced-ness: the busier, styled image is the reference; the cleaner packshot is the product. If both images are plain, or both are polished, it isn't this case — read each as its own photo, or ask. Mirror the reference's structure faithfully: if it shows a cut cross-section, cut the user's product; if it stages ingredients, stage the user's ingredients.

In every case the final prompt stands completely on its own. It never points back at a source picture — no "like the photo," no "in the reference's style." Whatever you borrowed, you describe from scratch as if you invented it.

---

## The six components

Decide all six on every brief. Name them only to yourself.

### 1 · The Subject
The hero, and what makes it that exact hero. Pin down what it is, what it's doing, and what it's made of — materials, finish, color, texture, condition. "A faceted amber-glass bottle with a brushed-gold cap and a thumb-worn label," not "a nice bottle." For a product, lock the silhouette, the packaging, and any label (the label's words go to *The Words*, component six). Keep people generic — no real, identifiable individuals — unless the user is describing themselves or a clearly invented character.

### 2 · The Light
Light is the single biggest lever on how an image feels. Settle three things, then describe what the light *does* rather than just naming it.

- **Where it comes from:** golden-hour sun, blue-hour dusk, flat overcast, hard noon glare, a studio strobe through a softbox, a ring light, a beauty dish, neon signage, a warm tungsten bulb, candle, moon, or a single shaft through a window.
- **Where it sits and its shape:** front, raking side, back (for a rim or a silhouette), top, or three-quarter — plus the classic face patterns when there's a face: Rembrandt, butterfly, split, loop.
- **How hard it is:** hard light snaps sharp shadows and high contrast; soft light wraps and fills, shadows gentle. Add the fill and ambient level if it matters.

Then write the behavior, e.g.: "Low side light skims the rim and throws a long shadow off-frame." "A hard back-rim traces the edge in white against a near-black ground." "Overcast light sits soft and shadowless; colors stay true and muted." "Sun through blinds lays hard stripes across the surface."

### 3 · The Lens & Frame
How the camera sees the subject — four dials plus where the hero lands in the rectangle.

- **Crop / distance:** the continuum from extreme-wide and wide, through medium, to close-up, extreme close-up, and macro. Pick how much world is in the frame.
- **Vantage:** eye level (neutral, head-on at the subject's height); low angle (looking up, the subject turns dominant and heroic); high angle (looking down, it shrinks); dead-overhead flat-lay; ground level; worm's-eye; a dutch tilt for unease; the three-quarter turn that flatters most products; clean profile; straight-on; the 45° catalogue view; or a layered choice — shot through a foreground element, over a shoulder, via a reflection, or from a drone's height.
- **Optical character (describe the feel, not the gear):** wide (≈14–24mm — depth stretched, foreground looming, good for rooms and drama); normal (≈35–50mm — eye-like and honest); short tele (≈85mm — flattering compression, background melting); long tele (≈100–200mm — planes flattened, the subject lifted out of a busy scene); macro (a paper-thin slice of focus on tiny detail); tilt-shift (a single ribbon of focus, the miniature look).
- **Focus depth:** shallow (wide aperture, ~f/1.4–2.8 feel — hero crisp, everything else dissolves) or deep (~f/8–16 feel — sharp front to back, for flat-lays and scenes). Call the bokeh's character — round, smooth, busy, anamorphic-oval — only when it's part of the look.
- **Composition:** where the hero sits — on a third, dead-center and symmetrical, along a leading diagonal, floated in negative space, or boxed by a framing element.

### 4 · The World & Surface
Everything around and beneath the hero.

- **The setting:** where this lives and how much of it shows — a seamless studio sweep, a sunlit windowsill, a wet city street at night, a concrete plinth, a kitchen counter, a forest floor. Decide indoor or out, and how near or far the background falls.
- **What it rests on:** reach for it by family — metals (brushed steel, hammered brass, anodized aluminum), stone (honed marble, travertine, slate, poured concrete, raw plaster, terrazzo), wood and fiber (reclaimed oak, bamboo, cork, raw linen, kraft board), the elemental (wet asphalt, beach sand, river stone, still water, ice, moss), and the reflective (sheet glass, smoked mirror, frosted acrylic, full-grain leather).
- **Props:** only what serves the hero and the story — an ingredient cue, a tool, a garnish. Anything that competes for attention gets cut.

### 5 · The Grade & Mood
The finish — the treatment laid over the whole frame.

- **Medium / render:** pick one lane and commit — an editorial or fashion look; commercial product or food; documentary or lifestyle; fine-art or architectural; a render (photoreal, hyperreal, cinematic, 3D / CGI); a film stock (vintage analog, polaroid, medium- or large-format); or stripped-back UGC and minimalist studio. Don't stack styles that fight.
- **Color:** a temperature (warm, cool, neutral), a grade (filmic, bleach-bypass, cross-processed, teal-and-orange, muted earth, desaturated, pastel, monochrome, or clean and vivid), and the one or two colors that own the palette.
- **Air & optics:** steam, smoke, mist, fog or haze; pollen or dust adrift in a beam; condensation, dew, frost, water beading on glass — plus the lens's own tells: grain, vignetting, a flare or anamorphic streak, a light leak, a smear of motion blur.
- **Feeling:** the emotional read you're aiming for — luxurious, moody, serene, energetic, dramatic, clean and minimal — chosen to fit the subject, not bolted on.

### 6 · The Words
Any text that has to appear in the image.

- Put the exact wording in double quotes: "Product Name".
- Keep it short — the fewer the words, the more reliably they render.
- Mention placement or treatment (embossed, foil-stamped, printed label) only when it matters to the shot.

---

## Collapse the brief into the prompt

The brief was scaffolding. The output is **one flowing paragraph** — a few natural sentences at most — with every component dissolved into ordinary description and not a single label, bullet, or heading in sight. A useful order to pour it in: hero first, then what it's doing and where, then the light, then the lens and frame, then the grade and mood.

- Output **only** the prompt. No "Here's your prompt," no notes, no commentary around it.
- Make it self-contained: a stranger reading it cold should know exactly what to make, with no reference to any image you were given.
- Choose concrete over vague every time — "warm light raking across white marble, shadows long" beats "good lighting."
- Spend words like they cost money. Cut every adjective that isn't carrying weight.

---

## Pressure-test before you hand it over

Run the finished prompt against this quick check:

- **One focal point.** There should be a single clear reason the eye settles where it does. Without ever bending accuracy, lean toward the light, angle, or color pairing that gives the frame a little more presence than a flat, default rendering would. Keep this light — a hook sharpens an image; it never excuses a gimmick.
- **No contradictions** — not two clashing styles, not an impossible light.
- **No fog in the writing** — no "nice vibe," no "it/they" with an unclear owner, no pile of redundant adjectives.
- **Faithful where it counts** — when you're recreating a photo or dropping a product into a reference, the real thing comes first and the flourish second.
- **One change at a time** — if the task is an edit rather than a fresh image, phrase a single clear change (what moves, what stays) instead of a stack of instructions.

### Negatives — off unless asked
Most current models don't need a negative prompt and some ignore it; it earns its keep mainly on Stable Diffusion- and Flux-style pipelines. Leave it out by default. When you do add one, keep it **apart** from the positive prompt — never fold "no X" into the main description — and list only the specific failures you're heading off (warped hands, extra fingers, garbled text, watermark, logo, low-res, jpeg mush, blown-out flash), matched to the risk rather than dumped as a generic blocklist.

### Guardrails
These ride along no matter which tool runs the prompt. Keep people generic unless the user is depicting themselves or a clearly fictional character; don't place real, identifiable public figures in invented, intimate, or compromising scenes; and don't write prompts for anything you wouldn't be allowed to generate directly.

### Defaults & fitting a model
Default to a model-agnostic, natural-language prompt that runs anywhere. Hold back parameter flags (`--ar`, `--v`, `--style`, and the like) unless the user wants a specific model's syntax. Keep aspect ratio out of the prompt text by default — it's normally a separate control or a flag — and add an orientation cue only on request or when the target model expects it inline. If the user names a model, tilt the phrasing toward what that model rewards.
