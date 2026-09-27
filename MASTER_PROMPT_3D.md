# LAMELLA — Master Build Prompt
### A reusable, award-level immersive WebGL website template

> **For the human (read once):** Put this file in the root of a new repository as `MASTER_PROMPT.md`. Then tell your coding AI:
> *"Read MASTER_PROMPT.md completely before writing any code. Build it phase by phase exactly as Part 20 describes, and stop at the end of every phase to report against that phase's acceptance criteria."*
> Everything written as `{{TOKEN}}` is a brand slot with a placeholder value. Appendix A explains how to reskin the template for a real brand without touching the engine.

---

## ROLE, MISSION AND TIE-BREAKERS

**Role.** You are a senior creative developer: WebGL/Three.js engineer, React Three Fiber specialist, motion designer and frontend architect in one. You are building from an art director's specification. Your job is to execute it with craft, not to reinterpret it.

**Mission.** Build the website for `{{BRAND_NAME}}` = **LAMELLA**, a placeholder "spatial & digital design studio", as one continuous, scroll-driven 3D world. The entire experience is a single monumental **kinetic sculpture** — about 1,200 thin lacquered slats ("lamellae") suspended in a vast, dim hall — that re-choreographs itself into a new form for every section, while the camera moves around it, and eventually through it, like a person walking through an installation.

**How to read the numbers in this document.**
- A single value: use it.
- A range: start at the midpoint, tune by eye in the dev panel (Leva), then commit the final value to config.
- Anything unspecified: choose the quieter, slower, more physically plausible option. Never add an effect this document does not ask for.

**Precedence when two instructions conflict.** Accessibility and performance requirements (Parts 9.5, 14.6 and 16) beat the Do-Not list (Part 22), which beats the scene specifications (Part 13), which beat the DNA sections (Parts 2–8).

**Units.** 1 world unit = 1 metre. The world origin is on the floor at the centre of the sculpture's base. Y is up. The default camera looks down −Z.

---

## PART 0 — REFERENCE STUDY: WHY THESE STUDIOS FEEL PREMIUM

These references were studied for their underlying principles only. Do **not** reproduce any studio's layouts, signature effects, naming or branding. Nothing in this project should be recognisable as "the X-studio effect".

### 0.1 Reference notes

**Active Theory — worlds, not pages.**
- *Visual:* dark, deep, environment-scale scenes; dense light and particle systems; the interface is thin and secondary.
- *Motion:* long, continuous camera flights; objects assemble in front of you; loaders are part of the world.
- *Interaction:* the site behaves like a place you navigate, often closer to a real-time engine than a document.
- *Likely techniques:* bespoke engine code, GPU particles, custom shaders, heavy use of render targets and post-processing.
- *We take:* the site as one place with its own rules; the loader as the first scene. *We leave:* spectacle density and game-like UI.

**Lusion — tactility.**
- *Visual:* handcrafted lighting and shading; soft, readable forms; high polish.
- *Motion:* everything has mass — objects push, settle and overshoot like real things.
- *Interaction:* the cursor behaves like a hand; interactions are toys you want to keep touching.
- *Likely techniques:* custom GLSL, physics or spring systems, soft shadows, careful post.
- *We take:* every interaction must feel physical (springs, inertia, settling). *We leave:* colourful physics-toy heroes, which are their signature.

**Unseen Studio — mood and warmth.**
- *Visual:* soft light, grain and texture, generous typography, emotional colour temperature.
- *Motion:* slow, atmospheric, rarely aggressive.
- *Interaction:* WebGL used as atmosphere around the brand rather than as a gadget.
- *Likely techniques:* fragment-shader gradients and noise, grain, restrained 3D.
- *We take:* texture (grain, dithering), restraint, colour temperature as emotion. *We leave:* painterly or pastel looks.

**Resn — the single strange idea.**
- *Visual:* concept-led; each project has one bold premise.
- *Motion:* unexpected, sometimes humorous choreography.
- *Interaction:* surprise — the site does something you did not expect and commits to it fully.
- *We take:* at least two genuine surprises per visit (the White Room inversion, the pass-through). *We leave:* whimsy that undermines a premium tone.

**14islands — DOM-first craft.**
- *Visual:* editorial layouts with WebGL woven precisely into real HTML.
- *Motion:* WebGL elements track the DOM layout exactly (they open-sourced a scroll-rig for React Three Fiber built on this idea).
- *Interaction:* accessible, fast, progressive; the page still works without the 3D.
- *We take:* all meaningful content lives in the DOM; WebGL enhances; progressive enhancement is mandatory. *We leave:* nothing — this is infrastructure.

**Studio Freight (creators of Lenis, now maintained by darkroom.engineering) — scroll feel as identity.**
- *Visual:* rigorous grids, bold type scale, technical precision.
- *Motion:* tuned inertial scrolling that everything else is synchronised to.
- *We take:* one clock for scroll, DOM and WebGL; grid discipline; extreme type-scale contrast. *We leave:* brutalist layouts.

**Bonhomme — luxury timing.**
- *Visual:* editorial restraint, confident negative space, refined imagery.
- *Motion:* cinematic pacing; transitions that feel like film edits rather than effects.
- *We take:* slowness as luxury; fewer, better transitions. *We leave:* fashion-editorial layouts.

**Current (2025–2026) immersive WebGL practice, in general.** Physically based lighting with filmic tone mapping, screen-space ambient occlusion, soft reflections, film grain, scroll-scrubbed camera paths, DOM-synchronised WebGL, very restrained bloom, subtler custom cursors, optional sound, and growing (but still uneven) use of WebGPU.

### 0.2 The shared principles that make them feel premium

- **P1 · One idea, fully executed.** Premium sites have concept density, not effect density. One world, one protagonist, one set of rules.
- **P2 · Physicality.** Things have mass, inertia and damping. Nothing moves linearly, nothing stops instantly, everything settles.
- **P3 · Light is the art director.** Shaped reflections, controlled darkness, filmic tone mapping. Colour comes from light, not paint.
- **P4 · Extreme typographic contrast.** Monumental display type next to tiny precise labels; almost nothing in between.
- **P5 · Continuity.** A persistent world and camera. Cuts are rare and deliberate; transitions carry objects across boundaries.
- **P6 · Choreography.** Motion is sequenced, staggered and hierarchical; one lead motion at a time.
- **P7 · Restraint.** Most of the frame is empty or dark; effects are whispers; bloom is barely noticeable.
- **P8 · Tactile, discoverable interaction.** Responses are immediate but damped; each scene rewards curiosity with one discovery.
- **P9 · Scroll feel is branding.** Inertial, synchronised, never janky.
- **P10 · Invisible engineering.** 60 fps, no pop-in, no layout shift, graceful loading, content accessible without WebGL.
- **P11 · Texture.** Grain and dithering make CG feel photographed and unify DOM with WebGL.
- **P12 · Surprise with purpose.** Surprises mark meaning (a change of chapter), never decoration.

### 0.3 From principles to an original direction

LAMELLA answers all twelve with one device: **a kinetic sculpture.** A real-world kinetic installation gives motion a believable physical model (weights on wires, springs, settling), gives the world a single persistent protagonist (P1, P5), turns light into the only source of colour (P3), makes every interaction mechanically tactile (P2, P8), and gives the whole UI a motif — the slat seen edge-on is a hairline (P4, P7). None of the reference studios is known for this device, so the result is original rather than derivative.

---

## PART 1 — CREATIVE DIRECTION

### 1.1 Concept: "Many parts. One motion."

The site is an installation in a vast, dim, minimal hall. Suspended in the middle is a kinetic sculpture of ~1,200 lamellae. As the visitor scrolls, the sculpture re-choreographs itself — a louvered monolith, an opening vortex, a split-flap wall that displays the work, four studies in a white room, a tunnel of frames, a murmuration, and finally the brand mark — while the light changes like a day passing through a gallery: **dusk → blue hour → gallery night → white room → passage → dawn.**

The metaphor is the brand promise of a studio: many specialists (parts) choreographed into one coherent result (motion). For any real brand, the metaphor transfers (Appendix A).

### 1.2 Why a kinetic sculpture (the reasoning to preserve)

1. **Continuity for free.** Every transition is the same object changing shape, so the experience never "cuts" between unrelated sections.
2. **Believable physics.** Kinetic installations are real; their motion (lag, overshoot, settling, waves travelling through elements) gives a model to imitate instead of inventing arbitrary animation.
3. **Performance.** All slats are one `InstancedMesh`: one draw call that scales from 1,200 elements on desktop to 360 on phones.
4. **Brand-swappable.** The slat's shape, material and the final mark formation are tokens.
5. **A motif for everything.** Edge-on, a slat is a hairline; flipping slats are a reveal; a row of slats is a loader. The whole UI derives from one object.

### 1.3 The Keystone (the hero inside the hero)

Exactly one lamella is made of **glass**. It is the first thing lit in the loader (the centre hairline), and in every formation it occupies the compositional focal point (golden-section position of the form). The eye tracks it across scenes, the way a film tracks one object through a story. In the finale it becomes the accent of the brand mark. It is the only glass in the world.

### 1.4 Emotional arc and intensity map

| # | Scene | Emotion | Intensity (1–10) |
|---|---|---|---|
| 00 | Loader | Anticipation | 3 |
| 01 | Hero — Monolith | Awe | 8 |
| 02 | Manifesto — Vortex | Understanding | 5 |
| 03 | Work — The Wall | Desire | 9 |
| 04 | Capabilities — White Room | Clarity (surprise) | 6 |
| 05 | Process — The Passage | Momentum | 9 |
| 06 | Proof — Murmuration | Trust (breather) | 3 |
| 07 | Contact — The Mark | Resolution | 7 |

**Pacing rule:** never place two scenes of intensity ≥ 8 back to back without a scene ≤ 6 between them. If the brand removes or reorders scenes, re-check this rule.

### 1.5 Brand slots and voice

| Token | Placeholder value |
|---|---|
| `{{BRAND_NAME}}` | LAMELLA |
| `{{BRAND_DESCRIPTOR}}` | Spatial & digital design studio |
| `{{TAGLINE}}` | Many parts. One motion. |
| `{{PRIMARY_CTA}}` | Start a project |
| `{{CONTACT_EMAIL}}` | hello@example.com |

**Voice:** calm, exact, confident. Short declarative sentences. Concrete nouns. No hype vocabulary ("revolutionary", "cutting-edge", "unleash", "elevate", "next-level"). Never use lorem ipsum: real sentence lengths are needed to tune typography. All placeholder copy is in Appendix B.

**Usability promises that constrain the art:** a first-time visitor understands what the brand does within the first viewport; `{{PRIMARY_CTA}}` is reachable in ≤ 2 interactions from anywhere; every scene can be reached directly from the menu.

---

## PART 2 — VISUAL LANGUAGE

### 2.1 Palette (surfaces and UI)

| Token | Hex | Role |
|---|---|---|
| `--c-void` | `#0B0A09` | The hall. Default page background in dark acts. |
| `--c-carbon` | `#151311` | Raised dark surfaces; overlays at 88% opacity. |
| `--c-stone` | `#8A847B` | Secondary text on dark (≈5.3:1 on void). |
| `--c-bone` | `#ECE6DC` | Primary text on dark. Hairlines at 18% (idle) / 60% (active) alpha. |
| `--c-paper` | `#F4F0E9` | White Room background. |
| `--c-ink` | `#141210` | Text on light. |
| `--c-signal` | `#FF5B1F` | "Ember". Focus rings, active markers, gate light. ≤ 5% of any frame. |

### 2.2 Light colours (3D only — never used as CSS paint)

| Light | sRGB hex | Approx. temperature |
|---|---|---|
| Dusk key | `#FFB27D` | 2,900 K |
| Cool rim | `#A9C1FF` | 7,500 K |
| Gallery spots | `#FFD2A6` | 3,200 K |
| Blue-hour sky (environment) | `#8FA6DA` | — |
| Dawn key | `#FFC9A3` | 3,400 K |
| Dawn sky (environment) | `#D8C6E2` | — |

Colour management: author colours in sRGB, let three.js convert to linear working space (its default colour management). Interpolate between acts in linear space.

### 2.3 Ratios

- Dark acts: 70% neutral dark / 25% bone / ≤ 5% signal.
- White Room: 75% paper / 22% ink / ≤ 3% signal.
- A frame with more than one saturated hue is a bug.

### 2.4 Grid, spacing and form

- **Grid:** 12 columns ≥ 1200 px (margins `clamp(24px, 3vw, 56px)`, gutters 24 px); 8 columns 768–1199 px; 4 columns < 768 px (margins 20 px, gutters 16 px).
- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Section-level spacing in `vh`/`svh`.
- **Hairlines:** 1 CSS px, `--c-bone` at 18% idle, 60% active. The hairline is the slat seen edge-on; rules, dividers, progress bars, the scroll indicator and the cursor are all built from it.
- **Corner radius:** 0 for every layout element. `999px` only for the cursor disc and pill labels. No cards, no boxed sections.
- **Imagery:** no drop shadows, no rounded corners, no tilt effects. Images are revealed through vertical slat masks and share the global grain.
- **Icons:** only arrows (→ ↗ ↓), plus and minus, set in the text face or drawn as 1 px strokes.
- **Grain:** 3–5% animated film grain over everything (WebGL and DOM) plus blue-noise dithering in WebGL.

### 2.5 Recurring composition patterns

- **Monument + label:** a huge form with one tiny monospace label near it. Scale contrast does the work.
- **The third line:** the monument sits on the right vertical third (≈0.62 of width) on desktop; text lives on the left five columns.
- **Text in shadow:** copy sits where the render is darkest, by composition rather than by overlays.
- **Centre is a climax:** dead-centre compositions are reserved for the loader and the final mark.

---

## PART 3 — DESIGN DNA (VISUAL PRINCIPLES)

These are testable rules. Every scene and every screenshot must satisfy them.

- **V1 · One monument per frame.** At every scroll position exactly one 3D form dominates, occupying 40–70% of the viewport's shorter side. Everything else is subordinate (≤ 15% each).
- **V2 · Off-axis by default, centred only at climaxes.** Use the third line; dead centre only for the loader handoff and the final mark.
- **V3 · Three depth planes, always.** Foreground (DOM type, hairline UI, occasionally near slats with depth of field), midground (the sculpture), background (fogged hall, backplates, 3D wordmark). If a frame reads as flat, add fog or parallax before adding objects.
- **V4 · Atmospheric perspective.** Contrast falls with distance: an object three times farther than the monument keeps ≤ 35% of its contrast. Nothing in the background is pure black or pure white.
- **V5 · Light is the only colour.** Saturated hue appears only as emitted or reflected light (key light, emissive gate edges, the signal colour in UI). Surfaces are neutral. No decorative CSS gradients; a gradient exists only where light produced it.
- **V6 · Darkness is a material.** In dark acts 60–75% of the frame sits below 8% luminance, protecting highlights. In the White Room invert it: ≥ 70% of the frame above 85% luminance.
- **V7 · Earned highlights.** Speculars come from shaped rectangular light sources, so reflections read as long, soft bars sliding across slats as they rotate. No pinprick point-light highlights.
- **V8 · Bevels catch light.** Every slat has a rounded edge (radius ≈ 30% of its thickness), so edge-on slats glow as hairlines. Sharp-edged boxes are forbidden.
- **V9 · Believable scale.** The sculpture must read as 6–9 m tall: floor contact (reflection or contact shadow), architectural lines at the periphery, floor seams at a 1.2 m pitch. A floating object with no ground reads as a toy.
- **V10 · Lens discipline.** Vertical FOV 30–38° (≈45–55 mm full-frame) for composed shots; ≤ 44° only during speed moments; +8–10° allowed in mobile portrait. No fisheye. Keep verticals vertical: use lens shift, not camera pitch, to frame tall subjects (Part 5.6).
- **V11 · Typography is architecture.** The wordmark exists in 3D space at monumental scale; DOM text sits on the grid. Paragraphs are never centred; measure 38–62 characters.
- **V12 · Scale contrast.** Pair ≥ 9vw display type with 11–12 px monospace labels. Avoid the middle sizes.
- **V13 · The hairline motif.** All UI linework is 1 px bone at 18% / 60%. Rules, the scroll indicator, the cursor ring and progress ticks derive from the edge-on slat; the loader's lines are the slats themselves, drawn at their projected size.
- **V14 · Negative space.** ≥ 40% of the DOM layer in any viewport is empty; ≤ 3 text blocks visible at once.
- **V15 · Text sits in shadow.** Place copy where the 3D is darkest. A scrim is a last resort (radial, ≤ 30% opacity).
- **V16 · Photographed, not rendered.** 3–5% grain plus dithering to kill banding and unify WebGL with DOM.
- **V17 · One light direction per scene.** Shadows, rim light and highlights agree on a single key direction per act.
- **V18 · Palette ratios hold** (Part 2.3) in every frame.
- **V19 · No containers.** No cards, boxed sections or rounded rectangles; information lives on hairlines, in space, or on the sculpture.
- **V20 · The screenshot test.** Any random scroll position must look like a composed film still. If a frame looks like a transition caught mid-way, the transition is too slow or badly staged.

---

## PART 4 — MOTION DNA

### 4.1 Philosophy: everything moves with purpose

Motion must communicate at least one of: **cause** (you did this), **hierarchy** (this matters most), **continuity** (this came from there). Motion that communicates none of these is removed.

### 4.2 Principles

- **M1 · Mass sets tempo.** Heavier things move slower. Camera: authored moves 1.6–2.4 s, damped following. Sculpture morphs: 1.2–2.0 s per wave. Display type: 0.9–1.2 s. Body and labels: 0.6–0.8 s. UI micro-interactions: 0.18–0.32 s.
- **M2 · One lead motion at a time.** Layers: L1 world (camera, sculpture), L2 display type, L3 supporting text, L4 UI. At any moment only one layer performs its big move; the others rest or move at ≤ 20% amplitude.
- **M3 · World first, word second.** Entrances: world → headline (+150–250 ms) → body (+100–150 ms) → UI (+100 ms). Exits run in reverse (UI → text → world) at 60% of the entrance duration.
- **M4 · Waves, not blocks.** Groups never move in unison. Stagger by a spatial field (distance from an origin: the cursor, the centre, or the previous focal point), never by array index. Stagger spread = 35–55% of the group's total duration.
- **M5 · Damped and frame-rate independent.** Continuous values use exponential damping with delta time: `x = x + (target − x) · (1 − e^(−λ·dt))`. Never lerp by a constant per frame (it breaks on 120/144 Hz displays). Clamp `dt` to ≤ 1/30 s.
- **M6 · Springs for anything physical.** Slats, cursor tilts and magnetic buttons use springs expressed as frequency and damping ratio (tokens below). A slightly underdamped slat (one visible overshoot, then rest) is the signature "kinetic sculpture" feel.
- **M7 · Easing vocabulary is closed.** Use only the tokens below. Scroll-scrubbed motion is linear mapping plus damping — never ease a scrub twice. Forbidden: bounce, elastic, and linear for anything visible.
- **M8 · Anticipation only for mechanisms.** Before a flip, slats counter-rotate 4–6° for 60–90 ms, like a mechanism taking up slack. Nowhere else.
- **M9 · Idle is alive, not busy.** When the user stops, the world breathes: ≤ 3° rotation or ≤ 1.5% position, 0.08–0.25 Hz, driven by low-frequency noise (not sine waves, which read as mechanical). UI is perfectly still when idle.
- **M10 · Velocity is expressive but capped.** Scroll velocity may add slat tilt (≤ 10°), camera FOV (≤ +6°) and dust drift. Always damped and clamped. No skewing of text.
- **M11 · Reversible.** Every scroll-driven transition plays backward correctly. Only click-triggered transitions (route changes, menu, jumps) are one-way.
- **M12 · No competing motion.** During a formation morph, text holds still or fades; it never flies in during the morph.
- **M13 · Interruptible.** Any hover or click animation can be interrupted and reversed from its current value; nothing ever jumps back to its start.
- **M14 · Particles drift, never perform.** Dust drifts at 1–3 cm/s on low-frequency noise, speeds up only with scroll velocity (at most ×3) and never reacts to the cursor. The only elements that respond to people are the slats.

### 4.3 Motion tokens

| Token | Value | Use |
|---|---|---|
| `dur.micro` | 200–320 ms | Hovers, presses |
| `dur.ui` | 450–600 ms | Labels, menu items |
| `dur.text` | 900–1,100 ms (line stagger 80 ms) | Headline reveals |
| `dur.world` | 1,400–1,800 ms | Authored (click-triggered) morphs |
| `dur.route` | 1,600 ms total | Page transitions |
| `ease.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Arrivals, reveals |
| `ease.swift` | `cubic-bezier(0.83, 0, 0.17, 1)` | Authored camera and scene moves |
| `ease.in` | `cubic-bezier(0.5, 0, 0.75, 0)` | Exits |
| `ease.hover` | `cubic-bezier(0.25, 1, 0.5, 1)` | Hover in and out |
| `spring.slat` | f = 1.8 Hz, ζ = 0.62 | Slat positions and scalar rotations |
| `spring.flip` | f = 1.6 Hz, ζ = 0.58 | Wall flips (one overshoot) |
| `spring.tilt` | f = 2.5 Hz, ζ = 0.80 | Cursor-driven tilts |
| `spring.magnet` | f = 4.0 Hz, ζ = 0.65 | Magnetic buttons |
| `damp.story` | λ = 3.5 | Global story time (Part 11) |
| `damp.pointer` | λ = 8 | World-space pointer |
| `damp.cursor` | λ = 30 | Cursor dot |
| `stagger.morph` | S = 0.45 | Formation morphs |
| `stagger.flip` | S = 0.35 | Wall flips |
| `stagger.loader` | S = 0.55 | Loader wave |

Register the cubic-béziers as GSAP `CustomEase`s and as CSS custom properties so DOM and WebGL share one vocabulary.

### 4.4 Transition grammar (each transition type has one meaning)

| Transition | Meaning | Used for |
|---|---|---|
| **Morph** | Same object, new idea | Home scene changes (default) |
| **Flip** | Next item | Changing projects on the Work wall |
| **Shutter** | Change of channel | Menu open/close, long jumps, orientation change |
| **Pass-through** | Going deeper | Entering a case study (from Work or from the previous case study); entering the Passage |
| **Inversion** | Clarity | Once: Work → White Room |
| **Peel-off** | Release | Once: Passage → Proof |

Do not reuse a transition for a different meaning, and do not add transition types.

---

## PART 5 — 3D DIRECTION

### 5.1 The hall (environment)

- A vast, minimal architectural volume. In dark acts no walls are visible: the floor dissolves into fog (≈50% at 25 m and ≈90% by 45–50 m with the Dusk values).
- **Floor:** dark polished concrete with seams on a 1.2 m grid (subtle roughness/normal variation only). It extends into the fog and gives the sculpture contact, reflection and scale.
- **Wires (T3 only, whenever the slats hang as the Monolith — the intro descent, the Hero and the reassembly):** each slat hangs from a hair-thin wire rising into darkness. Wires are visible only where the key light grazes them (alpha ≤ 0.25, fade with distance). They sell the physical premise without explaining it.
- **White Room:** floor and background merge into a seamless paper cyclorama (a floor plane that curves up into a wall with a 4 m cove radius) plus fog of the same colour, so no horizon line is visible anywhere.
- **Scale cues:** floor seams, wires and the 3D wordmark (cap height 2.4 m) make the 6 m sculpture read as monumental rather than as a toy.

### 5.2 The Array (the protagonist)

- **Element:** a rounded box ("lamella"). Local X = length L = 0.60 m, local Y = width W = 0.14 m, local Z = thickness T = 0.022 m. The broad faces point ±Z. Bevel radius 0.007 m (≈30% of T). Geometry segments: T3 = 3, T2 = 2, T1 = 1 (three's `RoundedBoxGeometry` from `three/examples/jsm/geometries`).
- **Counts by quality tier:** T3 (desktop high) 1,200 · T2 (desktop mid / tablet) 720 · T1 (mobile) 360 · T0 (fallback) none. Tiers are defined in Part 16.
- **Per-instance micro-variation (baked once at startup, seeded):** lightness ±3%, roughness ±0.04, spring frequency ±8%, flight arc height 0.4–1.2 m, tumble flag on 30% of instances. No two slats are identical; this is a large part of what makes the render read as physical.
- **Rendering:** one `InstancedMesh`. Keep *every* per-instance transform in `instanceMatrix` (never displace positions in the vertex shader), so shadows, depth and ambient occlusion work without custom depth materials. `frustumCulled = false`; `instanceMatrix.setUsage(DynamicDrawUsage)`; one `needsUpdate` per frame.
- **Roles:** each formation assigns every index a role — `primary` (the readable form), `secondary` (architectural support) or `reserve` (parked out of view, e.g. 14 m above in darkness).

### 5.3 The Keystone

A separate mesh that copies instance 0's matrix every frame (instance 0 itself is scaled to zero). Every formation puts its focal point — the golden-section position of the form — in slot 0, so the Keystone travels through every morph like any other slat and never jumps. Materials by tier are in Part 7. It is always present; it is the thread the eye follows.

### 5.4 Formation library

Formations are pure functions `build(n, layoutContext) → FormationData` (Part 19). They keep their **envelope** (overall size and silhouette) constant across tiers wherever the count allows, and derive spacing from `n`.

**Slot order (critical for good morphs).** Morphs pair slats by index, so every formation emits its slots in one canonical order: slot 0 is the Keystone; then primary slots sorted by height (bottom → top), then by angle around the formation's vertical axis; then secondary slots in the same order; reserve slots last. Neighbours in one formation therefore become neighbours in the next — a tower level becomes a band of the vortex, the vortex's lower turns become the screen — so morphs read as coherent waves instead of swarms. The Flock is simulated, so its order is irrelevant. A transition that needs a different pairing may supply a remap table, built once alongside the formations.

| Formation | Scene | Layout (T3) | T2 / T1 | Signature behaviour |
|---|---|---|---|---|
| **Line** | Loader | 96 vertical slats, edge-on to camera, in a row 8.0 m wide at y = 3.1 m. All other slats parked 14 m above in darkness. | 96 / 48 visible | Slats light from the centre outward with load progress. |
| **Monolith** | Hero | Hollow square louvered tower: 2.4 × 2.4 m footprint, 6.0 m tall. 16 slats per level (4 per side, tangential), louvers tilted 25° like a building facade; 75 levels at 0.08 m pitch. | T2: 45 levels (0.133 m pitch) / T1: 3 per side (a slimmer 1.8 m footprint, which suits portrait), 30 levels at 0.20 m pitch. | Idle: a slow twist wave travels up the tower. Cursor: levels near the pointer's height twist toward it. |
| **Vortex** | Manifesto | Four interleaved helical strands of n/4 slats; radius 1.2 m at the base opening to 4.5 m at 14 m height; 3.5 turns per strand; slats radial, pitched 20° like turbine blades. | Same rule | Idle: the vortex rotates at 0.02 rev/s; strands breathe radially ±3%. |
| **Wall** (+ Wings + Canopy) | Work | *Screen:* 48 × 7 vertical fins (336) at 0.15 m × 0.62 m pitch → 7.2 × 4.34 m (≈5:3; covers are cover-fitted around their focal point), centred at y = 3.2 m, concave with a 14 m radius. *Wings:* 2 × (8 × 7) fins stepping back at 35°, dimmer. *Canopy:* all remaining slats as horizontal baffles at y = 6.2 m in a receding grid. | T2: screen 336, wings 2 × 56, canopy the rest / T1 (portrait): screen 18 × 6 (108), no wings, canopy the rest | Scroll-scrubbed flips between projects; cursor "peek" parts the fins. |
| **Clusters** | Capabilities | Four studies of n/4 slats, ~2.5 m each, floating at y = 1.8 m, x = −6, −2, 2, 6: **Ring** (radial turbine ring, r = 1.3 m, 3 layers), **Fan** (spiral fan, like an opened book), **Lattice** (a woodpile ≈1.8 m square: layers of parallel slats whose direction alternates X/Z layer by layer), **Wave** (20 × 15 sheet on a travelling sine surface). | Proportional | Hover makes a cluster "perform": Ring spins up to 0.25 rev/s and settles; Fan opens 40° further; Lattice separates its layers vertically by 40%; Wave amplitude × 2.5. |
| **Tunnel** | Process | Square frames 3.0 × 3.0 m, 20 slats each (5 per side, end to end), along a 72 m S-curve spline; each frame rotated +4° about the path tangent relative to the previous one (a spiral). Four **gates** at 20/40/60/80% of the path: the frames nearest those points get emissive edges (no extra slats). | T3 60 frames (1.2 m apart) / T2 36 (2.0 m) / T1 18 (4.0 m) | Gates pulse as the camera passes through. |
| **Flock** | Proof | Murmuration in a 30 × 10 × 20 m volume centred at (0, 5, −4): curl-noise flow + slow-moving attractor; each slat orients along its velocity. | All slats | Cursor repels (desktop). |
| **Mark** (+ Rest field) | Contact | The brand mark sampled from its SVG, slats laid as hatching (≈180 slats on T3), centred at (0, 3.2, 0), ≈3.6 m tall. All remaining slats lie on the floor in a precise grid around it (the "rest field"), broad faces up, 0.3 m gaps. | T1: mark 90, rest 270 | Mark tilts toward the cursor; drag spins it with inertia; the rest field ripples when the mark is released. |
| **Canopy** | Case study | All slats as a horizontal baffle ceiling just above the viewport top, receding into fog. | Proportional | Rolls down into a Wall for "next project". |
| **Collapse** | 404 | All slats lying on the floor in a scattered pile (random yaw, some leaning on others). | Proportional | Cursor lifts nearby slats 0.2–0.6 m, as if magnetised. |
| **Edge-on** (modifier, not a formation) | Menu, Shutter | Every visible slat rotates about its long axis to present its edge to the camera. | — | The world "closes its blinds". |

### 5.5 The choreography engine (the heart of the project)

Per frame, for each instance *i*:

1. **Targets.** Formation A (current), formation B (next) and the morph progress `T ∈ [0, 1]` come from the Director (Part 11).
2. **Local progress.** `tᵢ = clamp((T − orderᵢ·S) / (1 − S), 0, 1)`; `eᵢ = easeInOutCubic(tᵢ)`. `orderᵢ ∈ [0, 1]` is a spatial stagger rank computed **per transition** from a field (distance to an origin that the transition defines — never the array index).
3. **Base target.** Position = `lerp(A, B, eᵢ) + up · sin(π·eᵢ) · arcᵢ` (slats travel in arcs, not straight lines, which looks physical and avoids interpenetration). Rotation = `slerp(A, B, eᵢ)`, plus, for tumble-flagged slats, an extra roll of up to `90° · sin(π·eᵢ)`. Scale = `lerp`.
4. **Channels and group transforms.** Per-slat scalar springs whose targets come from scene logic, the cursor and scroll velocity: `flip` rotates about the slat's own long axis; `tilt` about its own width axis; `twist` rotates the slat's target (position and orientation) about the formation's vertical axis; `edgeOn` blends, about the long axis, toward the orientation whose broad face is parallel to the view direction; `emissive` and `metal` affect shading only. Transforms of a whole formation (the Vortex's slow rotation, the Mark's tilt and drag spin, the Ring's spin-up) are applied to the targets here, before the physical layer.
5. **Physical layer.** A position spring (`spring.slat`) pulls the current position toward the base target, producing the lag and overshoot of weights on wires. Clamp speed at 12 m/s.
6. **Idle layer.** Low-frequency noise on rotation (≤ 3°) and position (≤ 2 cm), faded down during morphs and interactions.
7. **Write.** Compose the matrix into `instanceMatrix`; write only the per-instance attributes shaders need (`aFlip`, `aMix`, `aEmissive`, `aMetal`).

Rules: zero allocations in the loop (preallocate scratch objects and typed arrays); formations cached per (formation, n, aspect bucket); output must be a deterministic function of (story time, pointer, clock) so that scrubbing back and forth is stable.

```ts
// kinetic/morph.ts — per-instance staggered morph (typed arrays, zero allocations)
for (let i = 0; i < n; i++) {
  const ti = clamp01((T - order[i] * S) / (1 - S))
  const e = easeInOutCubic(ti)
  const lift = Math.sin(Math.PI * e) * arc[i]
  const i3 = i * 3, i4 = i * 4
  baseP[i3]     = lerp(A.pos[i3],     B.pos[i3],     e)
  baseP[i3 + 1] = lerp(A.pos[i3 + 1], B.pos[i3 + 1], e) + lift
  baseP[i3 + 2] = lerp(A.pos[i3 + 2], B.pos[i3 + 2], e)
  qa.fromArray(A.rot, i4); qb.fromArray(B.rot, i4)   // qa, qb: preallocated THREE.Quaternion
  qa.slerp(qb, e).toArray(baseQ, i4)
}

// kinetic/springs.ts — frequency/damping-ratio spring, inline in the same loop (dt clamped ≤ 1/30)
const w = TWO_PI * freq[i]
vel[i3] += (w * w * (baseP[i3] - pos[i3]) - 2 * zeta * w * vel[i3]) * dt
pos[i3] += vel[i3] * dt   // repeat for y, z and for each scalar channel
```

### 5.6 Camera direction

The camera rig sums six layers every frame:

1. **Path.** Position and aim splines per scene (`CatmullRomCurve3`, centripetal), sampled by the scene's local progress. Segments are C1-continuous: the end point and tangent of segment *i* equal the start of segment *i + 1*. Never cross-fade two camera positions.
2. **Composition by lens shift.** Keep the camera level and shift the lens (`camera.filmOffset` horizontally; `setViewOffset` or a projection-matrix shift vertically) to place subjects on thirds. Verticals stay vertical, as in architectural photography.
3. **Cursor parallax.** Position ±0.25 m (x) / ±0.15 m (y), rotation ±1.2°, damped (λ = 6). Per-scene multiplier: 0 in Loader, 0.5 in Work, 1 elsewhere.
4. **Idle drift.** ≤ 5 cm, noise at 0.05 Hz.
5. **Velocity FOV.** `+min(6°, k·|scrollVelocity|)`, damped (λ = 4). Manifesto and Passage only.
6. **Banking.** Passage only: roll proportional to path curvature, ≤ 3°.

Starting values (desktop, landscape). Tune by eye, then commit to `cameraPaths.ts`.

| Scene | Position (start → end) | Aim | vFOV | Lens shift | Notes |
|---|---|---|---|---|---|
| Loader | (0, 3.1, 12) | Level toward (0, 3.1, 0) | 30° | None | Centred (climax exception) |
| Hero | (−1.2, 1.5, 15.5) → orbit +28° around Y, rise to y = 4.2, radius → 12 | Level, at the tower axis | 34° | Vertical: horizon at 35% from bottom; horizontal: tower on the right third | Eye level, monumental |
| Manifesto | On the vortex axis (0, 2.5, 0) → (0, 11, 0); yaw 0 → 90° | Pitch +18° → 0° | 36° (+ velocity) | None | Text over the vortex |
| Work | (0, 3.2, 12.5) → (0, 3.2, 11.8) | Level at (0, 3.2, 0) | 32° | None | Screen ≈ 60% of frame height |
| Capabilities | Truck x = −7 → +7 at y = 1.7, z = 9 | −Z with a 6° lead toward travel | 36° | Vertical: horizon at 40% | White Room |
| Process | Along the 72 m tunnel spline | Tangent, 2 m look-ahead | 38° → ≤ 44° | None | Banking ≤ 3° |
| Proof | (0, 2.2, 24) with ±0.6 m drift | (0, 4, 0) | 34° | None | Wide and calm |
| Contact | (0, 3.2, 11) | (0, 3.2, 0) | 34° | None | Centred (climax) |

**Mobile portrait:** +8–10° vFOV or pull back until the monument fills 55–65% of screen height inside the upper 60% of the screen; no horizontal lens shift; cursor parallax is replaced by scroll-linked parallax of ±0.1 m.

### 5.7 Atmosphere objects

- **Dust motes:** `Points` (T3 6,000 / T2 3,000 / T1 1,000) in a volume around the camera's region; drifted by noise in the vertex shader (no simulation). Brightness is boosted only inside the key light's shafts, so motes sparkle in light and vanish in shadow. 1–2.5 px, faded near the camera.
- **Light shafts:** 1–5 planes aligned with the key light, additive, textured with a slowly scrolling tileable noise gradient, faded when seen edge-on and near intersecting surfaces (depth-based soft edges). T3 5 / T2 3 / T1 1.
- **Backplates:** a far, soft project-coloured field behind the Work screen (seen through the gaps and during "peek"); a dawn horizon glow behind the Proof and Contact scenes.
- **Philosophy:** particles are atmosphere, never a feature. Never form shapes or words from particles — the slats are this world's particles.

---

## PART 6 — LIGHTING DNA

### 6.1 Principles

- **L1 · One key per act.** Its direction defines the scene; every shadow and highlight agrees with it.
- **L2 · Shaped reflections.** Build the environment procedurally from rectangular `Lightformer`s (long strips, softboxes) so reflections are art-directed. Do not use a generic studio HDRI.
- **L3 · Physically based.** three.js uses physical light units by default (spot and point lights need `decay = 2` and much higher intensities than directional lights). World units are metres.
- **L4 · Filmic.** Tone map with AgX; manage exposure per act.
- **L5 · Fog is depth.** Exponential fog (`FogExp2`) whose colour is the desaturated key tint; it replaces walls.
- **L6 · Bloom is a whisper.** Only HDR emissives and the brightest speculars bloom.
- **L7 · Soft, single-source shadows.** One shadow-casting light, frustum fitted to the formation.
- **L8 · No light pops.** Acts blend continuously with scroll.
- **L9 · Never change the light rig's structure at runtime.** Adding or removing lights, changing a light's type, or toggling `castShadow` forces shader recompilation and a visible hitch. Create the full rig at startup (1 key directional, 1 rim directional, 3 spot lights, 1 hemisphere light) and animate only intensities, colours and transforms. The three spot lights serve as gallery spots in Work and are repositioned along the tunnel as gate lights in the Passage.
- **L10 · No `AmbientLight`.** Fill comes from the environment map (and from the hemisphere light in the White Room); a flat ambient term would flatten the lacquer.

### 6.2 The six acts (starting values)

| Parameter | Dusk | Blue hour | Gallery | White Room | Passage | Dawn |
|---|---|---|---|---|---|---|
| **Used in** | Loader, Hero, early Manifesto | Late Manifesto | Work, case studies | Capabilities | Process | Proof, Contact |
| **Key** | Directional `#FFB27D`, 3.0, from camera-left and behind (azimuth −120°, elevation 12°) | Directional `#FFD9B8`, 0.8, elevation 30° | 3 spots `#FFD2A6` overhead at (−4, 7, 6), (0, 7.5, 6), (4, 7, 6) aimed at the screen; angle 0.35 rad, penumbra 0.9, intensity ≈180 | Directional `#FFFFFF`, 1.4, from top-front (elevation 65°) | Key at 0; the 3 spots move to the next gates ahead, angle 1.2 rad, `#FF5B1F`, ≈25 | Directional `#FFC9A3`, 2.6, from camera-right and behind (azimuth +115°, elevation 8°) |
| **Rim** | Directional `#A9C1FF`, 0.6, right-back, elevation 25° | `#A9C1FF`, 0.5 | 0 | 0 | 0 | `#F0C8D4`, 0.4, left-back |
| **Hemisphere** | 0 | 0 | 0 | Sky `#FFFFFF` / ground `#E9E4DA`, 1.2 | 0 | 0 |
| **Environment** | 2 long horizontal warm strips + 1 vertical cool strip; 0.35 | Cool strips `#8FA6DA`; 0.5 | Dark; 1 overhead soft strip; 0.2 | Large top softbox 3.0 + low ring 0.8 | Near black; 0.1 | Lilac sky `#D8C6E2` 0.45 + bright horizon strip 2.0 (for chrome) |
| **Fog** | `#17120F`, 0.032 | `#0E1218`, 0.030 | `#0C0E12`, 0.024 | `#EFEBE4`, 0.018 | `#07080A`, 0.050 | `#1C1719` → `#2A2224`, 0.028 |
| **Exposure** | 1.00 | 0.95 | 1.05 | 1.10 | 0.95 | 1.00 → 1.08 |
| **Bloom** (intensity / threshold) | 0.28 / 0.92 | 0.22 / 0.92 | 0.15 / 0.95 | 0 | 0.45 / 0.88 | 0.30 / 0.92 |
| **Ambient occlusion** | Off | Off | Off | On (T3 full res, T2 half res) | Off | Off |
| **Shadows** | Key casts long raking shadows | Key casts | Faded out; contact shadow under the screen | Soft top shadows + contact shadows | Faded out | Key casts long dawn shadows |
| **Vignette** | 0.55 | 0.55 | 0.50 | 0.15 | 0.60 | 0.45 |
| **Grain** | 4% | 4% | 4% | 3% | 5% | 4% |

The renderer clear colour always equals the fog colour of the current blend. Intensities assume three.js physical units at metre scale; treat them as starting points.

### 6.3 Shadows

- `PCFShadowMap`, softened with `light.shadow.radius` (start at 4 on T3 and 3 on T2). Do not use `PCFSoftShadowMap`: current three.js deprecates it for WebGL and falls back to PCF with a console warning. Map size: T3 2048², T2 1024², T1 off (use a baked radial blob texture under each formation instead).
- Fit the key light's orthographic shadow camera to the target formation's bounding box plus 1 m. During morphs, interpolate the frustum rather than snapping it.
- Thin slats are prone to shadow acne and peter-panning: prefer `normalBias ≈ 0.02` with a small `bias ≈ −0.0004`; tune per act.
- Keep `castShadow` constant (L9). To fade shadows between acts, use the shadow intensity property if the installed three.js version provides one; otherwise leave shadows on and let the light's intensity carry the change.
- White Room: drei `ContactShadows` (resolution 512, blur 2.5, opacity 0.45, re-rendered at ≤ 30 fps) plus ambient occlusion.

### 6.4 Reflections

- Environment cube from Lightformers (drei `Environment` with children): T3 512, T2 256, T1 128. Re-render it only while an act transition is in progress; otherwise hold the last render.
- Floor: T3 drei `MeshReflectorMaterial` (resolution 1024, blur ≈ [400, 100], mixBlur 1, mixStrength ≈ 1.1, roughness map from concrete, depth-based fade). T2: standard material, roughness 0.35, environment reflections only. T1: unlit floor with a baked gradient and blob shadow.
- In the White Room a separate matte paper floor (part of the cyclorama) fades in over the concrete during the Inversion; once it is fully opaque, hide the reflector floor and confirm its mirror pass has stopped (S04).
- No screen-space reflections: too expensive and artefact-prone for this look.

### 6.5 Tone mapping, exposure and grading

- **AgX** as the final HDR step. With the effect composer active, set the renderer's tone mapping to `NoToneMapping` (never tone-map twice) and use the ToneMapping effect in AgX mode. On the T1 path without a composer, set `renderer.toneMapping = AgXToneMapping` and drive `toneMappingExposure` directly.
- Apply exposure before tone mapping. If the installed tone-mapping effect ignores `renderer.toneMappingExposure`, write a tiny custom exposure Effect placed before it.
- Optional: one global `.cube` LUT for a subtle split tone (warmer shadows, neutral highlights), strength ≤ 0.35.
- Enable dithering on the final pass to prevent banding in fog gradients.
- **Grain:** Noise effect (overlay or soft-light blend, opacity 0.035–0.05, animated per frame). On T1, use a CSS grain overlay (tiled 256 px noise PNG animated with `steps()`) instead of a pass.

### 6.6 Post-processing chain (WebGL, pmndrs `postprocessing`)

Order: scene render → N8AO (White Room only) → depth of field (T3 only; Hero and Proof only; focus on the formation centroid; subtle) → bloom (`mipmapBlur`) → chromatic aberration (0 at rest; ≤ 0.0012 only during pass-throughs) → exposure → tone mapping (AgX) → LUT (optional) → vignette → noise.

- **Grouping (important):** every expensive stage that is used only in some acts — N8AO and depth of field — is its own pass, switched with `pass.enabled` (a disabled pass is skipped entirely and nothing recompiles). Always-on effects share one merged `EffectPass`. If the `@react-three/postprocessing` JSX wrapper does not let you control this grouping, build the chain with the vanilla `postprocessing` API inside a single R3F component.
- **Never add or remove effects mid-scroll:** a merged effect pass recompiles its shader when its list of effects changes. Blend with intensities, switch with `enabled`, and make structural changes only at startup or behind a Shutter.
- **Switch passes at zero:** enable a pass only while its intensity is 0, then ramp it up; ramp it to 0 before disabling it. AO fades in over the first third of the Inversion.
- The pmndrs library merges at most one convolution effect per `EffectPass` (chromatic aberration and SMAA both count), so on T2 SMAA gets its own `EffectPass` directly after the merged one.
- **Anti-aliasing by tier:** T3 composer MSAA ×4 when the device pixel ratio is below 1.75 (none above it); T2 SMAA; T1 has no composer and uses the renderer's own MSAA (`antialias: true`), which is cheap on tile-based mobile GPUs and stops edge-on slats from shimmering.
- HalfFloat frame buffer. Keep the full chain ≤ 4 ms of GPU time on T3.

### 6.7 Act blending

The Director outputs `actA`, `actB` and `actT`. Every numeric parameter interpolates with `smoothstep(actT)`; colours lerp in linear space; fog density interpolates in log space; light directions slerp. Nothing is switched discretely except the material features covered in Part 7.4, which never cross zero.

---

## PART 7 — MATERIAL DNA

### 7.1 Principles

- **Mat1 · Neutral surfaces, coloured light.** Surface colours stay within the neutral palette; light supplies hue.
- **Mat2 · Realism through variation.** Per-instance tone and roughness offsets (Part 5.2).
- **Mat3 · Every material has one job.** One glass object. One chrome moment. One emissive role.
- **Mat4 · Materials change through physical metaphors only.** A material change travels across the sculpture as a wave, as if slats were dipped into light; it never cross-fades globally.
- **Mat5 · Tiers simplify shading, not silhouette.** Lower tiers use cheaper materials that keep the same overall look.

### 7.2 Material library

| Material | Where | Starting parameters | Behaviour | Tier notes |
|---|---|---|---|---|
| **Obsidian lacquer** (glossy; the default slat) | All dark acts | Physical: colour `#0D0C0B`, roughness 0.28 ± 0.04, metalness 0, clearcoat 1, clearcoat roughness 0.06, envMapIntensity 1.3 | Near-black at rest. The image comes from strip reflections sliding across slats as they rotate: motion reveals form. | T1: Standard, roughness 0.2, envMapIntensity 1.5 |
| **Ceramic matte** | White Room | Colour `#EDE8DF`, roughness 0.62, clearcoat 0.15, sheen 0.35 (sheen roughness 0.8, sheen colour `#FFFFFF`) | Chalky and soft; shows occlusion and soft shadows; no sharp highlights. | T1: Standard, roughness 0.7 |
| **Gate emissive** | Passage gates, loader edges | Emissive `#FF5B1F` or bone, intensity 2.5–4.0 (HDR) | The only glowing surfaces; bloom picks them up. | T1: intensity 2.0, bloom off |
| **Chrome** | Contact mark only (≈180 slats), through the per-instance `aMetal` channel | Metalness 1, roughness 0.04, colour `#F2F2F2`, envMapIntensity 1.6 | Pure reflection of the dawn sky and the horizon strip. | T1: roughness 0.1 |
| **Glass** | The Keystone only | T3: drei `MeshTransmissionMaterial` — thickness 0.02, ior 1.5, roughness 0.05, chromaticAberration 0.03, anisotropicBlur 0.1, samples 6, resolution 512 | Refracts the world behind it; a thin dispersion fringe where the key light hits. | T2/T1: fake glass — physical, roughness 0.02, clearcoat 1, envMapIntensity 2, tint `#DDE6EE`, transparent 0.55 |
| **Dark concrete** | Floor, dark acts | Colour `#0E0D0C`, roughness 0.55–0.9 (map) | Grounds the sculpture with soft, blurred reflections. | See 6.4 |
| **Paper cyclorama** | White Room | Colour `#EFEBE4`, roughness 0.95 | Seamless; no horizon. | — |
| **Wordmark stone** | 3D wordmark (Hero) | Colour `#2A2622`, roughness 0.85 | A dark monument; the key light rakes its bevels. | T1: flat text |
| **Iridescent** (holographic) | Hero easter egg, T3 only | Iridescence 1, IOR 1.3, thickness 100–400 nm | A two-second thin-film ripple travels up the tower on long-press. | T3: create the slat material with iridescence 0.0001 so the feature is compiled in, and drive the ripple per slat in the shader. Never on T1/T2 |
| **Brushed champagne metal** | Unused by default (brand variant) | Metalness 1, colour `#C9B79C`, roughness 0.32, anisotropy 0.8 along the slat's length | Highlights stretched along the length. | — |
| **Liquid** | Not used | Brand variants only: a slow viscous backplate shader (≤ 0.03 Hz), never a blob hero. | — | — |
| **Fabric** | Not used | Brand variants only: ribbon-like slats (sheen 1, roughness 0.8) with vertex-wave motion; no cloth simulation. | — | — |
| **Plastic** | Not used | Never glossy. Only "soft-touch polymer" (roughness 0.55–0.7) for playful brand variants. | — | — |
| **Stone** | Floor only | Travertine or limestone allowed in bright brand variants (roughness 0.9, triplanar mapping). | — | — |
| **Translucent / frosted** | Keystone fallback only | The T1/T2 fake-glass Keystone is the only translucent surface (transparent 0.55). No frosted-glass DOM panels: overlays sit directly on the shuttered, dimmed world. | Translucency stands in for real glass; it is never a style. | — |

### 7.3 The slat shader

The slat material is one `MeshPhysicalMaterial` extended with **three-custom-shader-material (CSM)** — or `onBeforeCompile` with a stable `customProgramCacheKey` — so it keeps full PBR lighting, shadows and fog.

- **Per-instance attributes:** `aTone` (lightness offset), `aRough` (roughness offset), `aFlip` (Wall flip angle, excluding the peek offset), `aCell` (this fin's slice of the cover — u0, v0, du, dv — computed with cover-fit cropping around the project's focal point; zero for non-screen roles), `aMix` (material-morph delay rank), `aEmissive`, `aMetal` (0 lacquer → 1 chrome; mixes metalness, roughness and colour per slat). Pass what the fragment shader needs as varyings.
- **Uniforms:** `uMaterialMix` (0 obsidian → 1 ceramic), `uAtlas`, `uAtlasRects[6]`, `uProjectCount`, `uLamella` (L, W, T), `uCoverStrength`.
- **Material morph:** `mᵢ = clamp((uMaterialMix − aMixᵢ·S) / (1 − S), 0, 1)`; colour, roughness and clearcoat interpolate from obsidian to ceramic with `mᵢ`; sheen is driven globally.
- **Cover images on the Wall:** each fin carries its own slice of the project cover. Diffuse = `mix(slatColour, cover, uCoverStrength)`, plus emissive `cover × 0.45`, so images read as lit displays independent of the spot lighting.
- **Deterministic face addressing (no texture swapping, ever).** Each fin's front and back faces choose their project from the fin's own accumulated flip angle. This stays correct with any stagger, damping or back-and-forth scrubbing:

```glsl
// vertex:   vObj = position; vN = normal;  (object space)   vFlip = aFlip; vCell = aCell;
// vFlip = total flip angle about the fin's long axis (radians), excluding the peek offset
int pFront = 2 * int(floor(vFlip / 6.2831853 + 0.5));                  // visible at 0, 2π, 4π…
int pBack  = 2 * int(floor((vFlip - 3.1415927) / 6.2831853 + 0.5)) + 1; // visible at π, 3π…
bool isFront = vN.z >  0.5;
bool isBack  = vN.z < -0.5;                         // |vN.z| ≤ 0.5 → bevel/edge: lacquer only
int p = clamp(isFront ? pFront : pBack, 0, uProjectCount - 1);
// broad face: u across the width (local Y), v along the length (local X, vertical in the Wall)
vec2 faceUv = vec2(vObj.y / uLamella.y, vObj.x / uLamella.x) + 0.5;
if (isBack) faceUv.x = 1.0 - faceUv.x;            // the back face is seen after a 180° turn
vec2 uv = vCell.xy + faceUv * vCell.zw;           // this fin's slice of the cover (gaps excluded)
vec4 r = uAtlasRects[p];                          // project p's rectangle in the cover atlas
vec3 cover = texture(uAtlas, r.xy + uv * r.zw).rgb;
```

### 7.4 Recompile hazards (read carefully)

- three.js recompiles a physical material when `clearcoat`, `sheen`, `iridescence`, `transmission`, `anisotropy` or `dispersion` crosses zero. Never let an animated feature reach exactly 0: rest at 0.0001 instead.
- Pre-compile everything during loading with `renderer.compileAsync(scene, camera)` while all materials and act configurations are present in the scene (hidden objects included), so no shader compiles mid-scroll. Include every material that any route or fallback can show: the case-study tracked-plane material, the fake-glass Keystone (the adaptive fallback for transmission), the gate numerals and the paper floor.
- Never change light counts or types (Part 6.1, L9).

---

## PART 8 — TYPOGRAPHY

### 8.1 Families

| Role | Default (free, OFL, self-hosted) | Premium swap (licensed) | Notes |
|---|---|---|---|
| Display and text | **Mona Sans** variable (weight 200–900, width 75–125) | PP Neue Montreal or Neue Haas Grotesk Display | One family for display and body; the width axis is used expressively. |
| Labels and data | **Geist Mono** | Söhne Mono or GT America Mono | Uppercase labels, indices, coordinates, counters. |
| Human voice (optional) | **Newsreader Italic** (optical size axis) | PP Editorial New Italic | At most one phrase per scene. |

- DOM: `next/font/local`, woff2, Latin subset plus punctuation and arrows, `display: swap` with a metric-adjusted fallback (`size-adjust`) so fonts never shift layout. Preload Mona Sans roman only.
- WebGL: the extruded wordmark needs a typeface JSON made from a static instance, because converters ignore variation axes: instance the variable display font at the wordmark's values (wght 700, wdth 112) with fontTools `varLib.instancer`, then convert that TTF with facetype.js. Troika text needs `.woff` or `.ttf` (check the installed version before relying on woff2).
- Verify every font's licence before shipping a real brand.

### 8.2 Scale

| Token | Size | Weight / width | Tracking | Line height | Use |
|---|---|---|---|---|---|
| `t.mega` (WebGL) | Cap height 2.4 m in world | 700 / 112 | −0.02em | — | Hero wordmark |
| `t.display-1` | `clamp(56px, 9vw, 168px)` | 560 / 100 | −0.045em | 0.88 | Project titles, contact headline |
| `t.display-2` | `clamp(40px, 5.6vw, 104px)` | 500 / 100 | −0.035em | 0.95 | Manifesto |
| `t.heading` | `clamp(28px, 3vw, 56px)` | 500 / 100 | −0.02em | 1.02 | Hero H1, capability names |
| `t.lead` | `clamp(18px, 1.35vw, 22px)` | 400 | −0.005em | 1.45 | Lead paragraphs |
| `t.body` | `clamp(15px, 1.05vw, 17px)` | 400 | 0 | 1.55 | Body |
| `t.label` | 11–12 px Geist Mono, uppercase | 400 | +0.08em | 1.3 | Section labels, metadata |
| `t.micro` | 10–11 px Geist Mono | 400 | +0.06em | 1.3 | Coordinates, counters |

Rules: measure 38–62 characters; never centre paragraphs; tabular numerals in mono; `text-wrap: balance` on headings and `pretty` on paragraphs; section labels formatted as `(03) Work`; display line breaks are authored in content (separately for mobile), never left to chance.

### 8.3 Text motion

- **Line reveal (default for headings):** GSAP SplitText into masked lines; lines travel from `yPercent: 105` to 0 over `dur.text` with `ease.out`, 80 ms stagger, while the width axis settles from 118 to 100 — letters "close into place" like louvers. Width animation on T3/T2 only and on at most two headings at once. T1 and reduced motion: 300 ms opacity fade.
- **Slat-mask reveal (display type and images):** the element is masked by vertical strips (8 for type, 10 for images) that open in a stagger from the left (or from the cursor's side when hover-triggered): 0.9 s total, 40 ms per strip. Build it with a CSS `mask-image` repeating linear gradient whose stops are an `@property`-registered percentage animated by GSAP; fallback: `clip-path: inset()` wipe.
- **Scrubbed word reveal (Manifesto):** words wait in stone at 25% opacity and turn bone as a scroll-scrubbed wave passes them; revealed words stay revealed.
- **Counters:** loader percentage and step numbers roll digits on a vertical reel (mono), 0.5 s per change, `ease.out`.
- **Exits:** lines move up 40% and fade, 0.45 s, `ease.in`, 40 ms stagger.
- **Forbidden:** typewriter effects, scramble or glitch text, per-letter bounce, rotating words, text on paths.

### 8.4 Type in space

- **3D wordmark (Hero):** drei `Text3D`, extrusion 0.35 m, bevel 0.02 m (3 segments), curve segments 8, "wordmark stone" material; placed at z = −7, spanning ≈ 11 m behind the tower; receives the tower's shadows; fog integrates it. Always `aria-hidden` — the DOM carries the real H1.
- **Gate numerals (Passage):** troika text (drei `Text`) in Geist Mono, 1.6 m tall, emissive bone at 1.2 (a hint of bloom), mounted inside each gate frame. You fly through the numbers.
- **DOM text is never CSS-3D-transformed** (no rotateX/rotateY on text). Its depth comes only from parallax factors of 0.9–1.1.
- **Placement:** text anchors to columns 1–5 when the monument sits on the right third; in Work the title sits bottom-left over the floor reflection; in the White Room capability labels are DOM elements tracked to 3D anchor points with 1 px leader hairlines (spatial UI).

---

## PART 9 — UX

### 9.1 Information architecture

- `/` — Home: the scene sequence (Loader → Hero → Manifesto → Work → Capabilities → Process → Proof → Contact).
- `/work/[slug]` — Case study template, statically generated for every project in the content files.
- Overlays (no route change): **Menu**, **Index** (all projects as a list), optional **Contact form**.
- `404` — the Collapse scene.
- Optional `/legal` — a plain editorial page with only the Canopy in WebGL.

### 9.2 Navigation model

- **Top bar** (fixed, transparent). Nav text is bone with `mix-blend-mode: difference`, so it stays legible across dark acts and the White Room automatically. Left: a small wordmark (click = back to top). Right: `Index` · `Menu` · `Sound` · `{{PRIMARY_CTA}} ↗`.
- **Scene ticks** (desktop): right edge, vertically centred, one 1 px tick per home scene. Idle ticks are 8 px long at 18%; the current tick is 24 px at 60%. Hover reveals the scene name in mono; click jumps (Part 11.3).
- **Keyboard:** skip link first; then wordmark, nav, and main content in DOM order. Inside Work, arrow keys move between projects (by scrolling to their snap points). Esc closes overlays. Focus is always visible (2 px signal outline, 3 px offset).
- **Deep links:** `/#work`, `/#contact`, etc. skip the full intro (a 0.8 s fade instead) and place the story directly at that scene.
- **Back/forward:** returning from a case study restores the Work scroll position (stored per route in sessionStorage) and plays the pass-through in reverse.

### 9.3 Onboarding and discoverability

- At most one hint per scene, first visit only (sessionStorage), fading after the first interaction or 6 s: Hero "Scroll"; Work "Move to part the wall · Scroll to flip"; White Room "Hover a study"; Contact "Drag to turn".
- Hints are `t.micro` mono labels near the relevant object. Never modal, never blocking.

### 9.4 Content per scene

| Scene | DOM content | Primary action |
|---|---|---|
| Hero | `(01)` label, H1, one lead line, scroll indicator | Scroll |
| Manifesto | `(02)` label, three statements (`t.display-2`) | Scroll |
| Work | `(03)` label, counter `01 / 05`, project title (`t.display-1`), meta (year · discipline · client), `View project →`, `All work` (opens Index) | Open a case study |
| Capabilities | `(04)` label, heading, 4 × (name, one line, services list) | Hover or tap to expand |
| Process | `(05)` label, heading, 4 × (numeral, title, one line) | Scroll |
| Proof | `(06)` label, three quotes (one at a time), client list | Scroll |
| Contact | `(07)` label, display headline, email, `{{PRIMARY_CTA}}`, socials, footer | Start a project |

### 9.5 Accessibility (non-negotiable)

- All meaningful content lives in semantic DOM: `header`, `nav`, `main`, `section` elements labelled by their headings, `footer`. The canvas is `aria-hidden="true"`.
- **Every interactive 3D object has a DOM twin:** a real `<a>` or `<button>` positioned over the object's screen footprint (tracked each frame), carrying focus, keyboard activation and an accessible name. Pointer interaction with the canvas is a progressive extra.
- `prefers-reduced-motion: reduce` switches to the reduced-motion path (Part 14.6). There is also an in-site **Motion toggle** (menu and footer) that stops idle motion at any time — moving content lasting over 5 s must be pausable (WCAG 2.2.2). Persist the choice in localStorage inside try/catch.
- DOM text keeps ≥ 4.5:1 contrast against the brightest render pixel beneath it. Verify with screenshots in every act, especially during the White Room inversion.
- Touch targets ≥ 44 × 44 px. No information available only on hover.
- Focus is never removed; overlays trap focus and return it to their trigger on close.
- Motion never blocks reading: text is fully legible within 1.2 s of entering the viewport.
- Media: alt text on every image; captions on video with speech; autoplaying video is muted, looped, `playsinline`, and has a pause control.

### 9.6 Performance UX

- Never block scrolling while deferred assets load. Show a low-resolution placeholder and swap in the full asset with a slat reveal.
- Nothing pops in. Every late asset arrives through a reveal.

---

## PART 10 — INTERACTION SYSTEM

Every interaction shares the motion language of Part 4. Hover-out takes 70% of the hover-in duration. Every state is interruptible (GSAP `overwrite: 'auto'` or `quickTo`; springs by nature). Every interactive element has designed hover, focus-visible, pressed and (where relevant) disabled states.

| Element | Trigger | Response | Timing / physics | Touch and mobile |
|---|---|---|---|---|
| Nav link | Hover | Text rolls up: a duplicate line slides up from below while the original exits above (clipped) | 320 ms, `ease.hover` | Press: opacity 0.7 for 120 ms |
| Active nav item | Route or scene | 4 px signal dot left of the label | 300 ms fade | Same |
| Primary CTA | Hover | Magnetic pull within 72 px (moves up to 30% of the cursor offset); fill wipes in through 8 vertical slats from the left (40 ms stagger); label shifts 6 px right; arrow rotates → to ↗ | `spring.magnet`; fill 400 ms `ease.out` | No magnet |
| Primary CTA | Press | Scale 0.97, spring back on release, then act | 100 ms | Same |
| Text link | Hover | 1 px underline draws left → right; on leave it retracts to the right | 350 ms in / 250 ms out, `ease.hover` | Underline always visible at 40% |
| DOM image | Enters viewport | Slat-mask reveal (10 strips) | 900 ms | 6 strips |
| DOM image | Hover | Inner image scales 1.00 → 1.03 | 1.2 s, `ease.out` | None |
| Index row | Hover / focus | Row shifts 12 px right; other rows dim to 40%; cover preview appears in a fixed frame with a slat reveal | 400 ms | Tap opens the case study |
| 3D object | Proximity / hover | The scene's single discovery (Part 12.2) | `spring.tilt` | Touch equivalents per scene |
| Menu | Click | Shutter (Part 13, S09) | 900 ms open / 700 ms close | Same |
| Scroll indicator | Hero, idle | A 64 px hairline with a 12 px bright segment travelling down; the only looping UI animation; fades after 10% of the Hero | 1.6 s loop, `ease.swift` | Same |
| Scene ticks | Scroll, hover, click | Current tick grows 8 → 24 px; hover shows the label; click jumps | 300 ms | Hidden |
| Form field | Focus | Hairline 18% → 60%; label moves up and shrinks to `t.label` | 300 ms, `ease.out` | Same |
| Form field | Error | Hairline turns signal; message slides in from 6 px below. No shaking, no red fills | 300 ms | Same |
| Form | Success | Fields exit line by line; one confirmation line appears; the Mark makes one slow full turn | 900 ms | Same |
| Asset failure | Load error | Quiet mono notice ("Some visuals couldn't load — showing stills.") and that scene switches to its poster | 400 ms fade | Same |
| Sound toggle | Click | Five hairline bars (slats) move at low amplitude when on; static when off | — | Same |
| Any control | Touch press | Scale 0.97 + opacity 0.85 | 120 ms | — |
| Cards | — | Not used (V19): projects appear as Index rows, on the Work wall and as case-study media | — | — |

**Sound (optional, off by default):** once the visitor turns it on, one ambient bed follows the act (dark acts ↔ White Room, 1.5 s crossfade) and a soft mechanical tick plays on each Work flip (at most one per 120 ms, about −24 dB). Nothing else makes sound. Audio pauses when the tab is hidden.

---

## PART 11 — SCROLL CHOREOGRAPHY

### 11.1 One clock

The per-frame order is fixed: **input → Lenis → ScrollTrigger → Director → camera → sculpture → acts and materials → DOM twins → render.** Run the R3F canvas with `frameloop="never"` and advance it from the GSAP ticker immediately after Lenis, so DOM and WebGL can never drift by a frame.

```ts
// motion/clock.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { advance } from '@react-three/fiber'
import { frame } from '@/state/frame'   // mutable per-frame singleton — never React state

gsap.registerPlugin(ScrollTrigger)

export function startClock() {
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false, autoRaf: false })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number, deltaMs: number) => {  // GSAP ticker: time in s, delta in ms
    lenis.raf(time * 1000)               // 1. scroll — Lenis expects ms; fires ScrollTrigger.update
    frame.time = time
    frame.dt = Math.min(deltaMs / 1000, 1 / 30)      // the only dt any system uses (seconds)
    frame.scroll = lenis.scroll
    frame.velocity = lenis.velocity
    advance(time)                        // 2. Director → camera → sculpture → render
  }
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => { gsap.ticker.remove(tick); lenis.destroy() }
}
```

With `frameloop="never"`, R3F treats the value passed to `advance` as its clock time, so pass seconds; systems read `frame.dt` rather than the `delta` argument of `useFrame`. Verify option names against the installed Lenis version. `ReactLenis` from `lenis/react` with `autoRaf: false` is an equivalent setup.

### 11.2 Lenis settings

- `lerp` 0.08–0.10; `smoothWheel: true`; `syncTouch: false` (native momentum on touch devices is more reliable, especially on iOS); `wheelMultiplier: 1`.
- `data-lenis-prevent` on overlays that scroll internally (Index list, forms).
- `history.scrollRestoration = 'manual'`; on load, start at the top unless there is a hash.

### 11.3 Story time

- **Layout.** Each home scene is a `<section data-scene>` of height `length + 100svh` with `margin-bottom: −100svh` (none on the last scene), so consecutive scenes start exactly `length` apart. Inside it, a stage with `position: sticky; top: 0; height: 100svh` holds the scene's DOM content. Each scene is therefore pinned for exactly its `length` of scroll, and its stage slides away only during the first 100svh of the next scene, after its text has exited. Later stages stack above earlier ones; stages are `pointer-events: none`, with interactive children set back to `auto`. **Pin with CSS sticky; measure with ScrollTrigger.** Do not use ScrollTrigger pinning (less layout thrash, and Lenis runs on native scroll, so sticky works). A scene with `pin: false` (Capabilities on mobile) has height `length`, and its blocks scroll naturally.
- **Progress.** For scene *k*, local progress `pₖ ∈ [0, 1]` runs from its section's top reaching the viewport top to the next section's top reaching it — exactly `length` of scroll. Hold progress `hₖ = clamp(pₖ / (1 − τₖ), 0, 1)` covers the part before the transition zone; percentages in the scene specifications mean hold progress unless they say otherwise.
- Raw story time `G_raw = k + pₖ`. Damped story time `G = damp(G, G_raw, λ = 3.5, dt)`. **Every WebGL system reads only the damped `G`** — camera, formations, acts — so they can never disagree.
- **Transition zone:** the last `τₖ = transition.length / length` of each scene. Inside it the morph progress is `T = smoothstep(1 − τₖ, 1, pₖ)` from formation *k* to *k + 1*; acts blend with the same `T`; the camera simply continues along its C1-continuous path.
- **Text timing.** Unless a scene specifies otherwise, its text exits (M3, reverse order) when damped story time enters its transition zone, and the next scene's text enters when damped `G` passes that scene's start. Text triggers read damped `G`, like the world, so words never arrive before the world has landed.
- **Jumps** (ticks, menu, deep links, back to top): crossing ≤ 2 scenes → `lenis.scrollTo(target)` with a distance-based duration clamped to 1.2–2.8 s and `ease.swift`. Crossing > 2 scenes → **shutter-cut**: close the shutter (0.5 s) → `lenis.scrollTo(target, { immediate: true })` → set `G = G_raw` (no catch-up flight) → settle all springs at the target formation → open the shutter (0.6 s). Long flights through unrelated scenes are meaningless and cause motion sickness.

### 11.4 The scene manifest (the template's backbone)

```ts
// content/scenes.ts — reorder, remove or retune scenes here; the Director reads only this file
export const scenes: SceneDef[] = [
  { id: 'hero',         length: 160, formation: 'monolith', act: 'dusk',
    camera: 'heroOrbit',    transition: { length: 60, type: 'morph',       origin: 'towerTop' } },
  { id: 'manifesto',    length: 220, formation: 'vortex',   act: ['dusk', 'blueHour'], // blends across the scene
    camera: 'vortexRise',   transition: { length: 70, type: 'morph',       origin: 'axis' } },
  { id: 'work',         length: { perItem: 80, tail: 40 }, formation: 'wall', act: 'gallery',
    camera: 'gallery',      transition: { length: 80, type: 'inversion',   origin: 'screenCentre' } },
  { id: 'capabilities', length: 260, formation: 'clusters', act: 'whiteRoom',
    camera: 'truck',        transition: { length: 80, type: 'passThrough', origin: 'lastCluster' } },
  { id: 'process',      length: 320, formation: 'tunnel',   act: 'passage',
    camera: 'tunnelFlight', transition: { length: 80, type: 'peelOff',     origin: 'tunnelExit' } },
  { id: 'proof',        length: 160, formation: 'flock',    act: 'dawn',
    camera: 'wideDrift',    transition: { length: 60, type: 'morph',       origin: 'markCentre' } },
  { id: 'contact',      length: 120, formation: 'mark',     act: 'dawn',
    camera: 'finale' },
]
// Lengths are scroll distances in vh on desktop (≈1,680 vh of scroll with five projects). Mobile
// multiplies them by 0.85, and Capabilities becomes four stacked 75 vh blocks with pin: false (Part 14). Dawn ramps its fog and exposure
// across Proof and Contact.
```

### 11.5 What scroll controls

| Scene | Scroll drives | Scroll does not drive |
|---|---|---|
| Hero | Camera orbit and rise; tower unwinding (in the transition zone); wordmark parallax; key-light elevation 12° → 16° | The H1 (it exits with a one-shot animation at 12% progress) |
| Manifesto | Camera rise and yaw; vortex opening (+15% radius); word-reveal wave; dusk → blue hour | — |
| Work | Flip angle (scrubbed per project step); camera dolly; counter; proximity snap | The images themselves |
| Capabilities | Camera truck; horizontal DOM track; "focus" (the study nearest frame centre gets +10% light) | Study performances (hover-triggered) |
| Process | Camera flight; gate activation; velocity FOV; step text | — |
| Proof | Flock attractor path; quote index (by thirds); exposure ramp | Flock micro-motion (time-based) |
| Contact | Mark assembly (in the transition from Proof); exposure ramp; then nothing | Mark interaction (pointer) |

### 11.6 Scroll velocity

Lenis velocity → damped (λ = 6) → normalised to [−1, 1] (clamp around 3,000 px/s). It may only drive: slat tilt ≤ 10° (Monolith, Vortex, Flock), camera FOV ≤ +6° (Manifesto, Passage), and dust drift × (1 + 2|v|). Nothing else responds to velocity.

### 11.7 Snapping

Only in Work: proximity snapping to project boundaries with `lenis/snap` (the official Lenis snap plugin), snapping only when the user stops within ≈12% of a boundary, ≈0.5 s, `ease.swift`. Verify its option names in the installed version. Never snap anywhere else.

### 11.8 Horizontal section (Capabilities)

- Desktop: a sticky 100vh container; the inner track translates by `−(trackWidth − viewportWidth) × h` (hold progress); the camera truck uses the same `h`.
- Mobile: no horizontal scroll hijack. The four studies appear one at a time in a vertical sequence (Part 14).

---

## PART 12 — CURSOR BEHAVIOUR

### 12.1 The cursor (fine pointers only)

- **Default:** 6 px bone dot, `mix-blend-mode: difference`, damped with λ = 30 (the lag should be felt, not seen). Hide the native cursor only while the custom one is active; restore it on touch input and whenever the user starts navigating by keyboard.
- **States** (morph between them in 250 ms, `ease.hover`):
  - `link` — 36 px ring, 1 px stroke.
  - `view` — 84 px bone disc with an ink mono label "VIEW" (Work screen, project images).
  - `drag` — 84 px disc, "DRAG" (Contact mark).
  - `text` — hidden over inputs and selectable text (native I-beam).
  - `busy` — during transitions: the dot plus a 1 px hairline arc rotating once per 1.2 s (the only rotating UI element).
- **Magnetism:** over the CTA and nav items the cursor's centre is pulled 30% toward the element's centre.
- **Never:** trails, particle cursors, blob cursors, or images that follow the cursor.

### 12.2 World interactions — one discovery per scene

| Scene | Discovery | Mapping | Limits |
|---|---|---|---|
| Hero | The tower twists toward the cursor's height, and the key light's azimuth follows cursor x by ±6°, so highlights slide across the slats | Pointer y → band of levels (Gaussian, σ = 8 levels); x → twist direction and strength | Twist ≤ 14°, `spring.tilt` |
| Manifesto | The vortex leans toward the cursor | Pointer NDC → lean axis | ≤ 4° |
| Work | **Peek:** fins near the cursor rotate open, revealing light behind the screen | Radial falloff, r = 1.2 m on the screen plane | ≤ 35°, `spring.tilt`; disabled while a flip is > 20% complete |
| Capabilities | Hover a study → it performs; the others dim 15% | Bounding-sphere hit test | One active at a time |
| Process | Steering: the camera offsets and rolls toward the cursor | Pointer NDC → ±0.35 m, roll ±1.5° | Damped, λ = 4 |
| Proof | The flock parts around the cursor | Repel radius 2.5 m, quadratic falloff | Never displaces more than 20% of the flock |
| Contact | The mark tilts toward the cursor; drag spins it with inertia | Tilt ≤ 8°; drag → angular velocity with friction 2.2/s | Release sends a ripple through the rest field |
| 404 | Nearby fallen slats lift off the floor | Radius 1.5 m | Lift ≤ 0.6 m |

### 12.3 Implementation rules

- Map the pointer into the world by raycasting an invisible interaction plane placed at the formation's depth. Never raycast the instanced mesh.
- Keep two pointers: raw (for the cursor dot) and damped with λ = 8 (for world effects).
- **Idle decay:** after 3 s without pointer movement, world cursor influence decays to 0 over 1.2 s, and the sculpture returns to its choreography.
- **Touch:** no cursor. Touch equivalents are Work swipe-to-flip, Capabilities tap, Contact drag. No gyroscope effects.
- Keyboard users reach every outcome through DOM twins (Part 9.5).

---

## PART 13 — SCENE-BY-SCENE SPECIFICATION

Scenes flow as **scene → transition → scene**. Each transition is specified in the scene it leaves. Camera, act and formation values referenced here are defined in Parts 5 and 6.

---

### S00 · LOADER AND INTRO — "First Light"

**Purpose:** Establish the identity in the first 100 ms, load essential assets honestly, introduce the protagonist, and hand off to the Hero without a cut. The loader *is* the first scene; there is no separate loader artwork or spinner.

**Visual:** Pure void. At first paint (server-rendered DOM, before any JavaScript): one fine bone line, dead centre — the Keystone's edge — sized exactly like a slat seen edge-on from the loader camera (0.022 × 0.60 m at 12 m with a 30° vertical FOV ≈ 0.34vh × 9.3vh; compute both from the camera constants, never hard-code them). As loading progresses, more lines appear to its left and right (96 across 70% of the viewport width), each appearing at 18% and brightening to 60% when progress "lights" it, from the centre outward. Bottom-left: mono counter `000 → 100` (`t.micro`, stone). Bottom-right: `{{BRAND_NAME}}` in `t.label` with 0.3em tracking, one letter revealed per seventh of progress. Nothing else.

**3D:** Formation **Line**: 96 vertical slats edge-on to the camera in a row whose width is derived from the viewport so it always spans 70% of the screen width; the Keystone at the centre; every other slat parked 14 m above in darkness. The WebGL row appears only after its first frame has been compiled and rendered, then crossfades (240 ms) with the identically sized and positioned DOM lines, which must match within 1 px.

**Camera:** (0, 3.1, 12), level, vFOV 30°, no parallax. During the handoff it dollies back and down to the Hero framing while the lens shift ramps in.

**Lighting:** Before 100%: no key light; slats are visible only through emissive edges (bevels only, bone, 0 → 1.2 as lit). At first light: the dusk key rises 0 → 3.0 over 1.2 s while its elevation sweeps 4° → 12° (the light *arrives*); environment 0 → 0.35; fog density 0.06 → 0.032 (the hall reveals itself).

**Materials:** Obsidian lacquer with emissive edges (emissive only where `|vN.z| < 0.5`); Keystone glass.

**Animation (after assets are ready):**
1. **0.0 s** — all 96 lines lit, counter reads 100. Hold 300 ms.
2. **0.3 s — First light.** Slats rotate about their long axes toward the camera — as far as the row's pitch allows without touching, `θ = acos(T / pitch) − 3°` (≈72° on desktop), exactly like a blind closing — in a wave from the centre outward (`stagger.loader`, `spring.flip`, ≈900 ms). As broad faces turn into the rising key light, a striped flash of reflection travels outward — the brand's first image.
3. **0.9 s** — counter and DOM wordmark exit (`ease.in`, 450 ms).
4. **1.0 s — The descent.** The row rises into the tower's upper levels while the 1,104 parked slats descend from the darkness on their wires, filling the Monolith from the top down (order field by target height; vertical travel, no arcs); ≈1.8 s. The camera dollies back and down at the same time (1.8 s, `ease.swift`).
5. **2.2 s** — the 3D wordmark rises out of the floor fog behind the tower (1.2 s, `ease.out`).
6. **2.6 s** — Hero DOM content reveals in M3 order (label → H1 lines → lead → scroll indicator). Scrolling is enabled.
7. **Return visits** (sessionStorage flag) skip steps 1–2 (1.4 s total). **Deep links** to another scene skip the intro entirely: the world fades in at that scene (0.8 s).

**Progress model:** real, weighted progress — 3D chunk loaded 30%, fonts ready 10%, essential textures 40% (drei `useProgress` / `LoadingManager`), shader pre-compilation (`compileAsync` resolved) 20%. The displayed value is damped toward the real one (λ = 4), never decreases, and reaches 100 only after the first Hero-ready frame has rendered offscreen. Minimum loader time 900 ms (no flash). After 8 s, show `Enter anyway →` (mono), which continues with progressive loading and posters for anything missing.

**Scroll:** `lenis.stop()` from load until step 6. Any input during the intro (wheel, key, click, touch) fast-forwards the sequence to its end in 400 ms.

**Cursor:** Hidden until handoff; the custom cursor fades in at step 6.

**Interaction:** Skip by any input. The loader region is a `role="status"` live region announcing "Loading" and "Ready"; a `Skip intro` button appears on keyboard focus.

**Typography:** Counter in Geist Mono, tabular; wordmark letters in `t.label`, revealed by opacity per letter.

**Transition → Hero:** *Morph* (the descent) plus the camera settle. No cut, no fade to black.

**Mobile:** 48 lines across 80% of width; 360 slats (tower 3 per side); no wires; first light 700 ms, descent 1.4 s.

**Technical implementation:** Server-render the DOM loader in the root layout. Mount the canvas via dynamic import (client only). A loader store (zustand) walks phases `booting → loading → ready → firstLight → descent → handoff → done`. GSAP timelines drive an `intro.t` value that the Director treats as a pre-Hero scene whose morph progress comes from the timeline, not from scroll. Before first light, render one hidden frame with the Dusk act at full intensity so the environment cube and shadow map are already warm, then reset intensities.

**Performance considerations:** The descent is the heaviest early moment (every instance moving, first shadow and environment renders). Pre-warm every material and feature combination (Part 7.4) with `compileAsync` during loading. Never start the descent while shaders are still compiling.

---

### S01 · HERO — "Monolith"

**Purpose:** Awe and clarity. Say what the brand is in one line while presenting the protagonist at monumental scale.

**Visual:** Dusk. The louvered tower (6 m) stands on the right third, lit by a low warm raking light from the far left that slices through the louvers: parallel light shafts cross the fog, and long striped shadows fall across the floor toward camera-right. Behind it, the 3D wordmark (≈11 m wide) sits in the fog, partly occluded by the tower; its bevels catch the raking light and the tower's shadow falls across some letters. The floor softly doubles the tower in reflection. Left columns: label, H1, lead. Bottom centre: scroll indicator.

**3D:** Monolith (T3: 75 levels × 16). Wires (T3). Dust motes in the shafts. Keystone at the golden-section point of the camera-facing side (≈ level 46, second slat from the left edge).

**Camera:** (−1.2, 1.5, 15.5), level, vFOV 34°; vertical lens shift puts the horizon 35% from the bottom; horizontal shift places the tower on the right third. Full cursor parallax and idle drift.

**Lighting:** Dusk act. Key directional from azimuth −120°, elevation 12°, `#FFB27D`, 3.0 — its azimuth follows cursor x by ±6°. Cool rim from the right-back. Five shaft cards aligned with the key. Bloom 0.28.

**Materials:** Obsidian lacquer (warm strip reflections slide along the louvers as they twist); wordmark stone; concrete reflector floor; the Keystone throws a thin dispersion fringe.

**Animation:** Idle: a twist wave travels upward — each level's twist = 3° × noise(level × 0.06 − time × 0.12) — plus louver tilt breathing of ±1.5°. The entrance is S00.

**Scroll:** 0–12% of the scene: H1 and lead exit (one-shot; they return if the user scrolls back above 8% — hysteresis). Across the hold: the camera orbits +28° around Y, rises to 4.2 m and closes to a 12 m radius; key elevation 12° → 16°.

**Cursor:** The band of levels at the pointer's height twists toward it (Part 12.2). **Easter egg (T3):** a long press (≥ 800 ms) anywhere in the Hero sends a two-second iridescent ripple up the tower. No hint is ever shown.

**Interaction:** The scroll indicator is a button that scrolls to the Manifesto.

**Typography:** `(01) Spatial & digital design studio` (`t.label`). H1 (`t.heading`): *"We design brands, products and spaces that move as one."* prefixed with visually hidden `{{BRAND_NAME}} —`. Lead (`t.lead`, stone): *"An independent studio for identity, digital products and spatial experiences."* Columns 1–5, bottom-aligned at 72% of viewport height, over the shadowed floor.

**Transition → Manifesto (Morph, 60vh):** The tower unscrews from the top down (origin: tower top): levels rotate progressively, their pitch grows, and each level's slats swing outward into radial treads — the square tower opens into the four-strand vortex. The camera moves inward and down onto the tower's axis at (0, 2.5, 0), turning to look up (+18°). The wordmark sinks back into the fog.

**Mobile:** Portrait composition: tower centred horizontally, filling 55% of the height within the upper 60% of the screen; H1 and lead in the lower 40% over the dark floor. The wordmark is scaled to span 92% of the visible width at its depth, behind the tower. No cursor effects (scroll-linked parallax instead), no wires, one shaft card, no reflector, no easter egg.

**Technical implementation:** `KineticArray` with the Monolith formation; drei `Text3D` wordmark; shaft cards; dust; key light with shadows fitted to the tower plus the wordmark. Depth of field (T3): focus on the tower, bokeh scale ≈1.5, so the wordmark is slightly soft.

**Performance considerations:** This is the most expensive frame of the site: 1,200 instances into a 2048 shadow map, the reflector re-rendering the scene, depth of field, bloom and a transmission material. If a T3 frame exceeds 14 ms, first drop depth of field, then halve the reflector resolution.

---

### S02 · MANIFESTO — "Unfolding"

**Purpose:** Understanding. State the belief in three short statements while the world opens up around the visitor.

**Visual:** Inside the vortex, looking up: four strands of radial slats spiral upward and widen, like standing in the throat of a slowly turning turbine that opens to the sky. The light turns from late dusk to blue hour: the key cools and weakens while a cool environment rises, silhouetting the vortex against deep blue fog above. Text sits large in the left columns of the lower half.

**3D:** Vortex. Keystone on the strand nearest the camera at the golden height. Dust.

**Camera:** On the axis from (0, 2.5, 0) to (0, 11, 0); yaw 0° → 90°; pitch +18° → 0° (by the end it looks level across the top of the vortex); vFOV 36° plus velocity FOV.

**Lighting:** Dusk → Blue hour across the scene: key `#FFB27D` 3.0 → `#FFD9B8` 0.8, elevation 12° → 30°; cool environment strips rise to 0.5; fog shifts to `#0E1218`.

**Materials:** Obsidian lacquer; reflections are now cool, so the vortex reads as dark blue steel.

**Animation:** Time-based rotation of 0.02 rev/s, plus 0.25 rev added by scroll across the scene; strands breathe radially ±3%.

**Scroll:** Camera rise and yaw; vortex opening (+15% radius); act blend; word-reveal wave.

**Cursor:** The vortex leans ≤ 4° toward the pointer.

**Interaction:** None. This is a reading scene.

**Typography:** `(02) Belief`. Three statements in `t.display-2`, one at a time — each scrubs in word by word, holds, then exits upward as the next arrives. Italic words are set in Newsreader Italic:
1. *"Most work shouts. **Ours moves.**"*
2. *"A brand is not a logo. It is a **behaviour** — how it speaks, responds and holds still."*
3. *"So we design the parts, then choreograph them into **one motion**."*

**Transition → Work (Morph, 70vh):** The strands unravel from the top down; slats fly in arcs into the Wall's screen, wings and canopy. Screen fins land already showing their slice of the first project's cover — the first image is literally assembled by the sculpture. The camera descends and pulls back along a curve to (0, 3.2, 12.5). Blue hour → Gallery: the three spots rise from 0 as the screen assembles; the key fades out.

**Mobile:** 90 slats per strand; statements at 34–40 px in the lower 45% of the screen, with the vortex above (looking up works well in portrait); a shorter rise.

**Technical implementation:** SplitText into words; a scrubbed ScrollTrigger timeline animates each word's colour and opacity through CSS custom properties.

**Performance considerations:** Slats pass close to the camera, so overdraw of the physical material is high. No depth of field here.

---

### S03 · WORK — "The Wall"

**Purpose:** Desire. Show 4–6 selected projects with maximum image quality through a tactile, memorable mechanism, and route into case studies.

**Visual:** Gallery night. A concave louvered screen (7.2 × 4.34 m) of 336 vertical fins displays the current project's cover, sliced into fins with hairline gaps, like a kinetic facade in a dark gallery. Three warm overhead spots pool light on the floor; the floor reflects the screen. Wings step back into darkness at both sides; a baffle canopy recedes into the fog overhead. Bottom-left: counter, title, meta and `View project →`.

**3D:** Wall + Wings + Canopy. The Keystone sits in the right wing at eye height — never inside the screen, where it would punch a hole in the image.

**Camera:** (0, 3.2, 12.5) → (0, 3.2, 11.8) across the scene, level, vFOV 32°, parallax × 0.5.

**Lighting:** Gallery act: three spots; covers contribute emissive × 0.45 so they read as lit displays; bloom 0.15 with a high threshold (images must never bloom); contact shadow under the screen.

**Materials:** Fin front and back faces show covers through deterministic face addressing (Part 7.3); bevels are lacquer; wings and canopy are obsidian; concrete reflector floor.

**Animation:**
- **Flip between projects (scroll-scrubbed).** Each project step: 25% hold → 50% flip → 25% hold. For fin *i*: `tᵢ = clamp((flipProgress − orderᵢ·S) / (1 − S))`, target angle `θᵢ = π·(k + ease(tᵢ))`, with the order field a fixed diagonal sweep (`0.8·x̂ + 0.2·ŷ`) so the flip reads like a page turning and stays identical in both scroll directions. Each fin's curve includes a 5° counter-rotation in the first 8% of its travel (M8); `spring.flip` adds a small overshoot as it lands.
- **Idle:** fins breathe ±1° (noise), so the spots' reflections drift slowly across the covers.

**Scroll:** Pinned (sticky) for 80vh per project plus a 40vh tail; n projects give n − 1 flips, so the last project's step is a pure hold. The DOM title and meta swap when a flip passes 50% (600 ms line reveal, direction-aware). Proximity snapping to holds (Part 11.7). Continuous camera dolly.

**Cursor:** Peek — fins within 1.2 m of the pointer rotate open (≤ 35°), revealing the project-coloured light behind the screen. The cursor takes the `view` state over the screen.

**Interaction:** Click the screen, click `View project →`, or press Enter on the screen's DOM twin → pass-through into the case study. Arrow keys → next/previous project. `All work` → Index overlay. Hovering `View project →` makes the nearest fins lean 6° toward it, anticipating the click. Prefetch the case route and its hero cover on hover or focus.

**Typography:** `(03) Selected work`; counter `01 / 05` (digit reel); title `t.display-1`; meta `t.label` (for example *"2026 · Digital archive · Tidewater Maritime Trust"*); text link `View project →`.

**Transition → Case study (Pass-through, click-triggered, 1.6 s):**
1. **0–0.5 s** — fins rotate edge-on in a wave from the click point (`stagger.flip`); the image dissolves into bright vertical hairlines.
2. **0.3–1.2 s** — the camera dollies forward through the gaps (FOV +4°, chromatic aberration peaking at 0.0012 mid-way). The home DOM fades out over 0.3 s; the route changes at 0.6 s. The canvas persists.
3. **1.0–1.6 s** — beyond the wall, the fins arc back into a new wall ahead of the camera showing the same cover; the case-study title reveals.

**Transition → Capabilities (Inversion, 80vh):** All fins turn edge-on, then the world's light inverts: fog and background go from void to paper, exposure 1.05 → 1.10, the top softbox and hemisphere rise, the spots fade. The material morphs from obsidian to ceramic as a wave travelling outward from the screen centre (slats "dipped in light"), while slats fly out into the four studies. The floor becomes matte paper. The camera trucks to the White Room start (x = −7). The largest luminance change happens between T = 0.35 and 0.65 and must be smooth — never a flash.

**Mobile:** Portrait screen of 18 × 6 fins using portrait (4:5) crops of the covers; horizontal swipe on the screen (> 40 px) flips to the next or previous project; title below the screen; no peek, no wings (the Keystone moves to the right end of the canopy's front row).

**Technical implementation:** Cover atlas texture with per-project rectangles; per-instance `aCell` and `aFlip`; the flip channel is a spring toward the scroll-derived target. The DOM twin is a transparent `<a href="/work/[slug]">` positioned each frame over the screen's projected bounds, with `aria-label="View project: {title}"`.

**Performance considerations:** One 2048² atlas per platform: UASTC with 16:10 cells on desktop, ETC1S with 4:5 cells on mobile (Part 17). Peek uses a plane raycast. The reflector showing the screen is worth its cost on T3 only.

---

### S04 · CAPABILITIES — "The White Room"

**Purpose:** Clarity and surprise. After the darkness, a bright, calm, precise room where four studies explain what the brand does.

**Visual:** A paper-white, horizonless space. Four floating ceramic studies are spaced along the room, each under soft top light, with delicate contact shadows on the floor and deep ambient occlusion in their inner crevices. Ink typography. The camera trucks sideways past them, like walking along a gallery wall. Each study has a DOM label connected to it by a 1 px leader line.

**3D:** Clusters — **Ring** (Strategy), **Fan** (Identity), **Lattice** (Digital), **Wave** (Spatial). The Keystone sits inside the Lattice at its golden point; glass in a white room reads as a quiet refraction.

**Camera:** Truck from x = −7 to +7 at y = 1.7, z = 9; level with a 6° lead toward the direction of travel; vFOV 36°; vertical lens shift so the (invisible) horizon sits at 40%.

**Lighting:** White Room act: top softbox 3.0, hemisphere 1.2, soft directional 1.4 from top-front, N8AO on, contact shadows, bloom 0, vignette 0.15, grain 3%. The study nearest frame centre receives +10% key.

**Materials:** Ceramic matte slats; paper cyclorama; Keystone glass.

**Animation:** Each study idles in a way that expresses its idea — Ring rotates at 0.03 rev/s; Fan breathes ±6°; Lattice layers drift ±2 cm in alternating directions; Wave travels at 0.2 Hz. Hover, focus or tap makes a study perform (Part 5.4).

**Scroll:** Horizontal truck synchronised with the DOM track; each study owns 25% of the hold. The in-focus study's description reveals; the others show only their names.

**Cursor:** Hover a study → it performs and the others dim 15%. `link` cursor over study twins.

**Interaction:** Each study has a DOM twin `<button>`. Activating it expands a services list (3–5 items, line reveal) under its label and triggers the performance; one study expanded at a time. Tab moves between studies; Enter toggles.

**Typography:** `(04) Capabilities`; heading `t.heading` *"Four ways in."*; per study: name `t.heading` in ink, one line `t.body`, services as a `t.label` list. Labels are anchored to each study's top-left 3D anchor point with ink hairlines at 30%.

**Transition → Process (Pass-through, 80vh):** The studies disassemble into a single file of slats streaming away from the last study into the depth; the stream becomes the tunnel's frames. The camera turns 90° to face down the stream and enters the first frame. The lights go out: fog goes from paper to near-black, exposure 1.10 → 0.95, the ceramic → obsidian wave runs outward from the camera, and the gate edges ignite ahead.

**Mobile:** No horizontal truck. The studies are stacked vertically in the white void and the camera cranes down past them, one 75vh block each: study centred, name and services below, tap to perform.

**Technical implementation:** N8AO (half resolution on T2); drei `ContactShadows` throttled to 30 fps; DOM labels tracked to projected 3D anchors with `translate3d`, hidden when off-screen. The paper floor fades in over the concrete during the Inversion; then hide the reflector floor and verify in Spector.js that no mirror pass runs. If it still renders while hidden, gate its render callback on visibility rather than unmounting it (remounting would recompile).

**Performance considerations:** AO and contact shadows are this scene's cost; the reflector must be fully off. On T1 there is no AO: use baked blob shadows and rely on the soft top light.

---

### S05 · PROCESS — "The Passage"

**Purpose:** Momentum. Explain four steps as a physical journey — the most kinetic sequence on the site.

**Visual:** A long spiral tunnel of square frames made of slats, in near darkness. Ahead, four gates glow ember at their edges, each with a numeral (01–04) floating inside. The frames rotate progressively as you move, so the tunnel slowly spirals around you; bloom halos sit on the gate edges; fog swallows the depth. As you pass each gate, its step title and line appear in the lower-left.

**3D:** Tunnel (T3: 60 frames). Gate numerals in troika text. The Keystone is embedded in the top edge of gate 03 (≈61.8% along the path).

**Camera:** Along the 72 m spline with a 2 m look-ahead; vFOV 38° plus velocity FOV (≤ +6°); banking ≤ 3°; cursor steering.

**Lighting:** Passage act: key at 0; the three spot lights reposition to the next gates ahead of the camera (wide angle, ember); gate emissive 3.0; fog density 0.05; bloom 0.45; vignette 0.6; grain 5%.

**Materials:** Obsidian frames; gate slats with ember emissive edges; numerals emissive bone.

**Animation:** Each frame's base roll is its index × 4°; scroll adds a further 45° across the scene, so the tunnel turns as you travel. A gate pulses (emissive 3.0 → 4.0 → 3.0 over 600 ms) when the camera passes within 1 m; that moment triggers its step text (one-shot per direction).

**Scroll:** Drives the flight (320vh).

**Cursor:** Steering — camera offset ±0.35 m and roll ±1.5° toward the pointer (λ = 4).

**Interaction:** None beyond steering; the DOM text is the content.

**Typography:** `(05) Process`. Heading `t.heading` at the scene start — *"How the parts find their places."* — exits as the camera enters the first frame. Steps: the numeral lives in 3D (inside the gate); the DOM carries the title (`t.heading`) and one line (`t.body`, stone):
- **01 Listen** — *"We start with what's true about you, not with what's fashionable."*
- **02 Frame** — *"We define the one idea everything else has to serve."*
- **03 Build** — *"Identity, product and space are designed together, in the same room."*
- **04 Tune** — *"We refine motion, copy and detail until nothing is accidental."*

**Transition → Proof (Peel-off, 80vh):** At the tunnel's exit, the last frames peel apart: slats detach in sequence (nearest first) and lift into the open air like birds leaving a wire, becoming the flock ahead. The camera exits into open space and cranes back to the wide shot. Passage → Dawn: fog lightens to `#1C1719`, a warm key rises from the right (azimuth +115°, elevation 8°), bloom settles at 0.3.

**Mobile:** 18 frames (4 m apart); no steering; banking ≤ 1.5°; velocity FOV ≤ +3°; one spot light following the nearest gate.

**Technical implementation:** Frame transforms are generated along the spline with parallel-transport frames (or `computeFrenetFrames` if the curve has no inflection flips) to avoid sudden roll flips. The camera samples the same curve at `u(G)` and aims at `u + Δ`.

**Performance considerations:** Frames surround the camera, so overdraw is high; bloom sits on emissive edges; three spot lights plus two directionals per fragment is fine on T3 and acceptable on T2. On T1, one spot light.

---

### S06 · PROOF — "Murmuration"

**Purpose:** Trust — and a breather. Quiet, wide and slow; client voices and names.

**Visual:** Dawn. A wide shot of the hall at first light: a warm, low sun from the right casts long shadows across the floor. High in the space, the flock of slats flows slowly like a murmuration of starlings; slats glint whenever their faces turn toward the sun, so shimmer ripples through the flock. A large serif italic quote sits in the left half, attribution in mono, and a quiet two-column list of client names below.

**3D:** Flock (all slats). The Keystone flies at the attractor, leading the flock.

**Camera:** (0, 2.2, 24) with slow ±0.6 m drift; vFOV 34°; depth of field on T3, focused on the flock's centroid with shallow bokeh on the nearest slats.

**Lighting:** Dawn act: key `#FFC9A3` 2.6 from azimuth +115°, elevation 8°; soft pink rim; lilac sky environment plus the horizon strip; fog and exposure ramp (exposure 1.00 → 1.04 across Proof).

**Materials:** Obsidian lacquer; under the dawn environment, faces flash warm as they turn to the sun.

**Animation (time-based):** Curl-noise flow (frequency 0.08, speed 1.2 m/s); the attractor follows a slow Lissajous path; each slat's orientation is damped toward its velocity (λ = 3) with ±20° roll variation.

**Scroll:** Moves the attractor along its path (the flock drifts left → right across the scene); switches quotes by thirds (line-reveal crossfade); drives the exposure ramp.

**Cursor:** The flock parts around the pointer (2.5 m radius).

**Interaction:** None. Keyboard users reach every quote by scrolling.

**Typography:** `(06) Proof`. Quote in Newsreader Italic at `t.display-2`, three lines maximum — the one scene where the serif is the main voice. Attribution `t.label`. Client list `t.label`, two columns, 8–12 names, stone. All quotes and names are placeholders until real, attributable testimonials exist (Appendix B).

**Transition → Contact (Morph, 60vh):** The flock slows and descends. About 180 slats converge into the brand mark at the centre, turning chrome as they lock into place (an `aMetal` wave from the mark's centre). The rest drift down like leaves (tumble enabled) and settle one by one into the rest-field grid on the floor, each with a tiny spring settle. The camera moves to the centred finale framing.

**Mobile:** 360 slats; no depth of field; single-column client list.

**Technical implementation:** CPU flock update: curl noise from simplex-noise derivatives (a small noise library or custom code), velocity integration, soft attraction to keep the flock inside its bounds, orientation from velocity via a damped look-rotation quaternion.

**Performance considerations:** The flock update costs < 1 ms of CPU for 1,200 slats; depth of field is T3 only.

---

### S07 · CONTACT — "The Mark"

**Purpose:** Resolution and action. The sculpture's final form is the brand itself; invite contact.

**Visual:** A centred composition — the second and last centred frame after the loader. The brand mark hovers at eye level, built from chrome slats that reflect the dawn sky and a crisp horizon line. Around it on the floor, the rest field lies in a precise grid, catching long dawn shadows. The headline and contact details sit below and to the left.

**3D:** Mark — placeholder: a geometric "L" monogram (a vertical bar 0.8 × 3.6 m plus a base 2.2 × 0.8 m) hatched with horizontal slats. The Keystone is the mark's accent at the corner of the L. The rest field grid lies on the floor.

**Camera:** (0, 3.2, 11), vFOV 34°, centred; full parallax.

**Lighting:** End of the Dawn ramp: exposure 1.08, fog `#2A2224`, bloom 0.3 (the chrome's horizon highlight blooms slightly).

**Materials:** Chrome (mark), obsidian lacquer (rest field), Keystone glass.

**Animation:** Mark idle: slow yaw of ±12° (noise at 0.05 Hz) plus breathing. The rest field is still except for ripples. When the contact form succeeds, the mark makes one slow full turn (2.4 s, `ease.swift`).

**Scroll:** The mark assembles in Proof's transition zone. Within Contact the exposure finishes its ramp; the final 20% of the scene is completely calm — nothing moves except idle breathing.

**Cursor:** The mark tilts toward the pointer (≤ 8°); dragging spins it with inertia; releasing sends a ripple through the rest field (slats lift 3 cm and settle, radiating outward from the mark at 4 m/s).

**Interaction:** `{{PRIMARY_CTA}}` opens the optional contact-form overlay (or a `mailto:` link if the form module is disabled). Clicking the email address copies it and shows a `Copied` micro-label, with a separate `Open mail app` link beside it. `Back to top ↑` performs a shutter-cut, after which the rest field rises on its wires and reassembles the Monolith (1.8 s) — the loop closes.

**Typography:** `(07) Contact`; headline `t.display-1` — *"Start with a conversation."*; email `t.heading` as a link; CTA button; socials `t.label`; footer `t.micro`: © year, Privacy, Motion on/off, Sound on/off, Back to top.

**Transition:** None forward — this is the end. Back to top as described above.

**Mobile:** Mark at 60% of the screen width; smaller rest field; drag to spin; the CTA may become a wide tap target but keeps the hairline style.

**Technical implementation:** Load the mark SVG with three's `SVGLoader`, convert it to shapes, and sample hatching by scanlines at the slat pitch (slat lengths clipped to the shape). The SVG declares the Keystone's position with an element such as `<circle id="keystone">`.

**Performance considerations:** Chrome on ≈180 instances is cheap. The rest field widens the shadow frustum: 2048 on T3, 1024 on T2.

---

### S08 · CASE STUDY TEMPLATE — "Through the Wall" (`/work/[slug]`)

**Purpose:** Depth. Tell a project's story in a readable editorial layout while staying inside the same world.

**Visual:** On arrival, the project's cover is rebuilt on a wall of fins in front of you, gallery-lit, with the title large over its lower-left. As you scroll, the wall rolls up into a baffle canopy — fins rotate to horizontal and rise row by row from the bottom, like a louvered blind being raised — revealing the editorial content on the void. The canopy stays visible at the top of the viewport near the top of the page and fades into fog deeper down. Content: intro (title, client, year, role, services, summary), media blocks (full-bleed image, two-up images, video with poster, pull quote, credits), next project.

**3D:** Case hero wall (screen only; all other slats in the canopy) → Canopy. **DOM-tracked image planes** (T3/T2) for media blocks, in the scroll-rig pattern: each image is a WebGL plane tracked to its DOM placeholder and rendered with a **louver-shear** shader — the image is divided into 24 vertical strips that lag behind scroll velocity by up to 12 px (lag grows with a strip's distance from the image centre), and on hover the strips separate by 1 px, revealing darkness between them. T1 uses plain DOM images with slat-mask reveals.

**Camera:** Fixed at the case origin with light parallax; the canopy is positioned relative to the camera so it sits just above the viewport's top edge.

**Lighting:** Gallery act (static), exposure 1.05.

**Materials:** Obsidian fins showing the cover; obsidian canopy.

**Animation:** Arrival (from the pass-through) → title line reveal. Roll-up scrubbed over the first 100vh. Media reveals on enter. Next-project assembly at the end.

**Scroll:** Native content scroll with tracked planes. **Next-project zone** (last 100vh): the canopy descends into a wall showing the next project's cover (scrubbed), and a hairline progress bar fills. At 100% the site navigates automatically after a 400 ms grace period (cancelled if the user scrolls back); a click works at any time.

**Cursor:** `view` over media; peek on the arrival wall.

**Interaction:** `← All work` (under the nav) returns to Home at this project's position in Work, with the pass-through reversed. Next project. Every link is keyboard reachable.

**Typography:** Title `t.display-1`; a four-column meta grid (Client, Year, Role, Services) in `t.label` separated by hairlines; summary `t.lead`; body `t.body`; captions `t.micro`; pull quote in Newsreader Italic at `t.display-2`.

**Transition → next project:** Pass-through again, through the next project's wall.

**Mobile:** Portrait arrival wall; the same roll-up; no tracked planes; the next-project zone works with a tap.

**Technical implementation:** Route with `generateStaticParams` from `content/projects.ts`. The persistent canvas switches the Director into case mode (formations: caseWall → canopy). Prefetch the next project's cover on entering the next-project zone.

**Performance considerations:** Tracked planes share one material; textures lazy-load one viewport ahead (IntersectionObserver) and are disposed more than three viewports away; at most 8 tracked planes are alive at once.

---

### S09 · MENU AND INDEX OVERLAYS — "Shutter"

**Purpose:** Instant navigation from anywhere without leaving the world.

**Visual:** *Menu:* the world closes its blinds — every visible slat turns edge-on, the scene becomes a field of fine glowing hairlines, and exposure dims to 0.35. Over it, the DOM menu: large links (`t.display-2`) with mono indices, the current scene marked with the signal dot; a secondary column with email, socials, Motion toggle and Sound toggle. *Index:* the same shutter; a list of every project (title `t.heading`, year and discipline `t.label`) with a cover preview frame on the right.

**3D:** The edge-on modifier (Part 5.4) — each slat rotates about its long axis until its broad face is parallel to the view direction, blended over whatever formation is active.

**Camera:** Holds; parallax continues at 50%.

**Lighting:** Exposure → 0.35 (Menu) or 0.45 (Index). Hovering a menu link shifts the key colour toward that scene's act — a cheap, evocative preview.

**Animation:** Open (900 ms): edge-on wave spreading from the Menu button's position (`stagger.flip`, `spring.flip`); DOM links line-reveal from 300 ms with a 60 ms stagger. Close (700 ms): DOM first, then slats.

**Scroll:** `lenis.stop()` while open; overlay content scrolls natively (`data-lenis-prevent`).

**Cursor:** `link` state on links; nav roll hovers.

**Interaction:** A scene link closes the menu, then jumps (Part 11.3 rules). Esc closes. Focus is trapped; the trigger has `aria-expanded`; the page behind is `inert`.

**Typography:** Links `t.display-2` with `t.micro` indices; Index rows `t.heading`.

**Transition:** None — overlays don't change scenes.

**Mobile:** Full-screen overlays; links at `t.heading`; the Index is a single column with small static thumbnails (no hover preview).

**Technical implementation:** The edge-on modifier is a per-slat scalar spring channel, so it composes with any formation.

**Performance considerations:** Negligible. Keep rendering at full rate; the hairline field is the backdrop.

---

### S10 · 404 — "Collapse"

**Purpose:** Turn an error into a moment of character, and get the visitor home fast.

**Visual:** Dim dusk light. The sculpture has fallen: slats lie scattered on the floor in a loose pile, a few leaning on one another, with long raking shadows. Large `404` (`t.display-1`, DOM) and one line — *"This part of the field hasn't been built."* — with the link `Back to the start →`.

**3D:** Collapse formation; the Keystone lies on top of the pile, catching the light.

**Camera:** Low angle, (0, 0.6, 7), looking slightly down at the pile; vFOV 34°.

**Lighting:** Dusk, with the key lowered to 8° elevation for long shadows.

**Materials:** Obsidian lacquer; Keystone glass.

**Animation:** On arrival, slats fall into the pile from wherever they were (gravity-like ease-in with small spring settles, staggered by height). Idle: completely still — a collapsed sculpture does not breathe — except for cursor lifts.

**Scroll:** None (one viewport).

**Cursor:** Nearby slats lift up to 0.6 m, as if magnetised.

**Interaction:** `Back to the start →` makes the slats rise and reassemble into the Monolith (1.8 s) while routing home with the intro skipped.

**Typography:** As described in Visual.

**Transition:** The reassembly.

**Mobile:** 360 slats; tapping near a slat lifts it briefly.

**Technical implementation:** A deterministic pseudo-physics generator: seeded positions on the floor within a 2.5 m radius, with some slats leaning so their ends rest on others. No physics engine.

**Performance considerations:** Trivial.

---

## PART 14 — RESPONSIVE EXPERIENCE

### 14.1 Two independent axes

- **Layout class** (viewport and pointer): Desktop ≥ 1200 px with a fine pointer · Laptop 1024–1199 px · Tablet 768–1023 px (touch; landscape or portrait) · Mobile < 768 px (touch, usually portrait).
- **Quality tier** (GPU capability, Part 16): T3 · T2 · T1 · T0.
- They combine: a landscape iPad Pro uses desktop compositions with T2 quality and touch interactions; a small laptop with a weak integrated GPU uses the desktop layout with T2 or T1 quality. Never infer quality from screen width alone.

### 14.2 Desktop — the full cinematic experience

Everything in Parts 5–13, at T3 or T2 quality.

### 14.3 Tablet — the same world, less complexity

- T2 defaults: 720 slats, 1024 shadow map, half-resolution AO in the White Room, bloom at 0.75 resolution, no depth of field, environment reflections instead of the reflector floor, 3 shaft cards, 3,000 dust motes.
- Landscape uses desktop compositions; portrait uses mobile compositions.
- No custom cursor. Hover discoveries become touch equivalents (Work swipe, Capabilities tap, Contact drag). Scene ticks are hidden in portrait.

### 14.4 Mobile — recomposed for touch and portrait

- **What disappears:** custom cursor, scene ticks, depth of field, ambient occlusion, reflector floor, wires, the iridescent easter egg, chromatic aberration, Work peek, Work wings, width-axis type animation, the horizontal truck in Capabilities, all but one light shaft, long-press interactions, transmission (the Keystone becomes fake glass), the effect composer itself.
- **What simplifies:** 360 slats; every formation regenerated for portrait (tower 3 slats per side × 30 levels; Wall 18 × 6; Tunnel 18 frames; Mark 90 + rest field 270); no shadow maps (baked blob shadows); standard instead of physical materials where Part 7 says; 1,000 dust motes; DPR clamped to 1.0–1.5 (start at 1.25).
- **What becomes touch-controlled:** Work — horizontal swipe flips projects while vertical scrolling keeps working; Capabilities — tap a study to make it perform and expand its services; Contact — drag to spin the mark; 404 — tap to lift slats; Menu — a full-screen overlay.
- **Camera changes:** portrait framing (monument centred horizontally, inside the upper 60% of the screen, filling 55–65% of the height); vFOV +8–10° or a pulled-back camera; no horizontal lens shift; scroll-linked parallax of ±0.1 m instead of cursor parallax; Passage banking ≤ 1.5° and velocity FOV ≤ +3°; Capabilities becomes a vertical crane down past stacked studies.
- **Particles:** 1,000 dust motes; nothing else.
- **Post-processing:** no composer. The renderer applies AgX tone mapping and exposure directly; grain is a CSS overlay; there is no bloom (emissive colour alone carries the gates).
- **Typography:** clamp-based sizes; `t.display-1` ≥ 44 px; manifesto 34–40 px; labels 11 px; display line breaks authored separately for mobile; copy sits below the monument in the lower 40%.
- **Navigation:** top bar shows only the wordmark and `Menu`; `Index`, Sound and the CTA move into the menu (the CTA also lives in Contact); large tap targets.
- **Scroll:** all scene lengths × 0.85; Capabilities becomes four stacked 75vh blocks (`pin: false`, Part 11.3).
- **Viewport units:** sticky scenes use `100svh`. Ignore height-only resize events smaller than 120 px on touch devices (the URL bar appearing or disappearing must never trigger a relayout or a formation rebuild).

### 14.5 Orientation changes and resizing

- Debounce resize by 250 ms. If the aspect bucket changes (portrait ↔ landscape), regenerate formations behind a **Shutter** (edge-on → rebuild → open) so nobody sees slats jump.
- Width-only resizes on desktop update the DOM layout, camera aspect and lens shift; formations stay unless the aspect bucket changes.

### 14.6 Reduced motion and the Motion toggle

- No scroll-scrubbed camera flights: each scene shows a composed still — its formation at rest, the camera at its hold position.
- Scene changes: fade the canvas to the current fog colour (200 ms), switch formation and act with springs settled, fade back in (300 ms).
- No idle breathing, no velocity effects, no parallax, no world cursor effects, no peek. Text reveals become 300 ms opacity fades. The loader becomes a simple fade.
- The world is still there — just still.
- The in-site Motion toggle applies exactly the same mode instantly.

### 14.7 Lite mode and fallbacks

- **Save-Data** (`navigator.connection.saveData`): start at T1 and defer the Work atlas until Work is one scene away.
- **T0** (no WebGL 2, context creation fails, `failIfMajorPerformanceCaveat`, very low memory, or a second context loss in the session): no canvas. Per-scene posters (pre-rendered stills, 1920×1080 and 1080×1920 AVIF) become fixed backgrounds that crossfade by scene; all DOM content and interactions still work.
- **Context loss:** stop advancing the canvas, show the current scene's poster, and attempt one restore. A second loss in the session drops to T0.

---

## PART 15 — TECHNICAL ARCHITECTURE

### 15.1 The stack and why each piece exists

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js** (latest stable, App Router), **React 19**, TypeScript strict | Static generation for every page (instant DOM first paint, SEO, metadata), file routing for case studies, `next/font` for zero-shift fonts, easy Vercel deployment. |
| Renderer | **three.js `WebGLRenderer`** (WebGL 2) | Mature and predictable on every target browser, including iOS Safari. Nothing in this spec needs compute shaders (see 15.2). |
| React binding | **@react-three/fiber**, latest stable v9.x (the React 19 line) | Declarative scene graph; one persistent canvas across routes; manual frame loop (`frameloop="never"` + `advance`). |
| Helpers | **@react-three/drei**, the major that pairs with the installed R3F | `Text3D`, `Text`, `Environment` + `Lightformer`, `MeshReflectorMaterial`, `MeshTransmissionMaterial`, `ContactShadows`, `PerformanceMonitor`, KTX2 loading. Import per component. |
| Post-processing | **postprocessing** (pmndrs) + **n8ao**, optionally via **@react-three/postprocessing** v3 | Merged effect passes (fewer full-screen passes), AgX tone mapping, mipmap bloom, N8AO, depth of field, SMAA and MSAA. |
| Custom shading | **three-custom-shader-material** | Extends `MeshPhysicalMaterial` with per-instance attributes while keeping PBR lighting, shadows and fog. |
| Motion | **GSAP 3.13+** — core, ScrollTrigger (measurement only), SplitText, CustomEase; **@gsap/react** `useGSAP` | Authored timelines, text splitting, scroll measurement, one easing vocabulary shared with CSS. Every GSAP plugin has been free, including for commercial use, since 3.13. |
| Scroll | **Lenis** (`lenis`, `lenis/react`, `lenis/snap`) | Inertial smoothing on top of native scroll, so sticky positioning, anchors and accessibility keep working; syncs with GSAP and WebGL on one clock. |
| State | **zustand** | Low-frequency app state with transient subscriptions. Per-frame values live in a plain mutable object. |
| Maths | **maath** | Damping helpers (`damp`, `damp3`, `dampQ`, `dampLookAt`), easing, random distributions. |
| Noise | **simplex-noise** (or ~60 lines of custom noise) | Idle motion; curl noise for the flock. |
| Tiering | **detect-gpu** (self-host its benchmark data) + drei **PerformanceMonitor** | An initial tier guess plus runtime correction. |
| Styling | **Tailwind CSS v4**, tokens as CSS custom properties (`@theme`) | Fast layout utilities; one source of truth for tokens, shared with GSAP. |
| Audio (optional) | **Howler.js** or raw Web Audio | Unlock handling and format fallback; loaded only after the user turns sound on. |
| Development only | **Leva**, **stats-gl** or **r3f-perf**, **Spector.js** | Art-direction tuning; frame, draw-call and pass inspection. Never shipped. |

**Deliberately not used:**
- WebGPURenderer and TSL (15.2).
- Motion (formerly Framer Motion): GSAP already covers DOM animation, and two animation engines means two timing systems.
- A physics engine (Rapier, Cannon): slats are kinematic springs, not rigid bodies; a solver would cost CPU without visible gain.
- Theatre.js or a Spline runtime: extra weight; camera and choreography are authored in code and tuned in Leva.
- GPGPU/FBO simulations: unnecessary at ≤ 1,200 elements and ≤ 6,000 motes.
- OffscreenCanvas workers: they complicate the DOM–WebGL synchronisation this design depends on.
- ScrollTrigger pinning and ScrollSmoother: CSS sticky + Lenis instead.

### 15.2 Decision record: WebGL 2, not WebGPU (as of September 2026)

- The official three.js manual still describes `WebGPURenderer` as experimental (current release r186), although it falls back to WebGL 2 automatically.
- drei components that patch shaders (notably `Text`) and `@react-three/postprocessing` do not run on `WebGPURenderer`. Post-processing would have to be rebuilt on three's node-based `RenderPipeline` (named `PostProcessing` before r183), and every custom shader rewritten in TSL.
- First-class WebGPU support in React Three Fiber arrives with v10, which is still in alpha, alongside an alpha drei v11.
- WebGPU availability across browser, OS and GPU combinations is still uneven, so a WebGL 2 path is required regardless.
- This design needs no compute shaders; its costs are fill rate and shading, which WebGL 2 handles well.
- Coding assistants are far more reliable with GLSL, `WebGLRenderer` and pmndrs postprocessing (stable APIs) than with TSL, whose APIs are still being renamed.

**Revisit** when R3F v10 and a WebGPU-compatible drei are stable *and* a feature genuinely needs compute (for example > 500k simulated particles). To keep a future port cheap, isolate renderer-specific code in `webgl/materials` and `webgl/post`, and keep choreography, formations and state renderer-agnostic.

**Version policy:** install the latest stable versions at project start and pin them exactly. Never install alpha, beta or canary majors. Check peer dependencies (three ↔ R3F ↔ drei ↔ postprocessing ↔ CSM) before adding anything.

### 15.3 Page structure

```
app/
  layout.tsx            // fonts, <Providers> (store + clock), <DomLoader/>, <Experience/> (persistent canvas),
                        // <Nav/>, <Cursor/>, <Overlays/>
  page.tsx              // Home: <main> with one <section data-scene> per entry in content/scenes.ts
  work/[slug]/page.tsx  // Case study (static params from content/projects.ts)
  not-found.tsx         // 404 (Collapse)
  legal/page.tsx        // optional
```

- The canvas is `position: fixed; inset: 0; z-index: 0; pointer-events: none`. DOM content sits above it. World pointer interactions listen on `window` and raycast; clickable 3D uses DOM twins.
- The canvas mounts once in the root layout and never unmounts across route changes. Each route tells the Director which world mode it needs (`home`, `case`, `404`, `legal`).
- The initial quality tier is detected *before* the canvas mounts, because context attributes such as `antialias` cannot change later.

### 15.4 3D scene architecture

```tsx
<Canvas
  frameloop="never"                         // advanced by the single clock (Part 11.1)
  dpr={tier.dpr}
  flat                                      // tone mapping handled explicitly (Part 6.5)
  shadows={tier.shadows ? 'percentage' : false}  // PCFShadowMap (Part 6.3); decided once, never toggled
  gl={{ antialias: tier.id === 'T1', powerPreference: 'high-performance', stencil: false }}
>
  <QualityProvider/>      {/* tier, DPR, feature flags; listens to PerformanceMonitor            */}
  <Director/>             {/* story time G → scene, formations A/B, morph T, acts A/B            */}
  <CameraRig/>            {/* paths, lens shift, parallax, velocity FOV, banking                 */}
  <LightRig/>             {/* fixed rig: key, rim, 3 spots, hemisphere — animated, never rebuilt */}
  <EnvironmentRig/>       {/* Lightformers; re-rendered only during act transitions            */}
  <Fog/>                  {/* FogExp2 + clear colour from the act blend                          */}
  <World>
    <Floor/>              {/* reflector (T3) / standard (T2) / unlit (T1) + paper (White Room)   */}
    <Cyclorama/>          {/* White Room cove                                                    */}
    <KineticArray/>       {/* THE sculpture: one InstancedMesh + the Keystone mesh               */}
    <Wires/> <Wordmark3D/> <GateNumerals/> <Backplates/> <Dust/> <LightShafts/>
  </World>
  <TrackedPlanes/>        {/* case-study media, scroll-rig pattern                               */}
  <DomTwins/>             {/* writes projected rects of interactive 3D objects to DOM twins      */}
  <PostFX/>               {/* per-tier chain (Part 6.6); renders the frame                       */}
</Canvas>
```

`useFrame` priorities (ascending): Director −50 → CameraRig −40 → KineticArray −30 → lights, environment, fog −20 → DomTwins −10 → PostFX 1. `PostFX` renders the frame on every tier: through the composer on T3 and T2; on T1 it sets `gl.toneMapping = AgXToneMapping` and `gl.toneMappingExposure` from the act blend, then calls `gl.render(scene, camera)`, so no configuration-time default (such as `flat`) can override the tone mapping.

### 15.5 Animation architecture — three layers, one clock

1. **Continuous (render loop):** Director (damped story time), camera rig, kinetic engine (springs), acts, dust and shafts, tracked planes. All deterministic from story time + pointer + clock.
2. **Authored one-shots (GSAP timelines):** intro, text reveals, menu, route transitions, jumps. They never move WebGL objects directly — they write normalised progress values into the store (`intro.t`, `menu.t`, `route.t`) that WebGL systems read. One-way data flow: timelines → store → render loop.
3. **Measurement (ScrollTrigger):** section progress only; `onUpdate` writes `pₖ` into the frame object. No ScrollTrigger animations drive WebGL.

**Contract:** no React state updates per frame. React re-renders only on discrete events (scene change, overlay open, tier change, route change).

### 15.6 State management

- `state/frame.ts` — a plain mutable singleton written and read every frame: `{ time, dt, scroll, velocity, vNorm, pointer: { raw, damped, ndc, world }, story: { G_raw, G, scene, local, T }, acts: { a, b, t } }`.
- `state/store.ts` (zustand): `phase` (intro phases), `route`, `scene` (discrete, for UI), `overlay` (`none | menu | index | contact`), `tier`, `features`, `reducedMotion`, `motionEnabled`, `soundEnabled`, `transition` (`{ type, t, from, to }`), `hintsSeen`.
- Per-frame consumers read `frame` inside `useFrame` or ticker callbacks. DOM components subscribe to the store with selectors (transient subscriptions for anything faster than a few hertz).

### 15.7 Asset management

- `content/assets.ts` is a manifest with three priority classes: **critical** (DOM fonts, blue noise, floor maps, wordmark typeface, mark SVG), **scene** (Work atlas, gate font, LUT), **deferred** (case-study media, audio).
- Critical assets load during the intro. Scene assets start fetching when story time is one scene away. Deferred assets load on intent (hover or focus prefetch) or proximity.
- Loaders: drei `useTexture` / `useKTX2` with a Suspense boundary per scene group — never one global Suspense that could unmount the world. Self-host the KTX2 transcoder under `/public/basis/`.
- Dispose textures and geometries that a new route no longer needs (case-study media). The kinetic array and core materials live for the whole session.
- **Build scripts** (Node, run locally):
  - `scripts/placeholder-covers.ts` — generates placeholder covers (Part 17).
  - `scripts/build-atlas.ts` — sharp: packs covers into the atlas with 8 px padding and writes `atlas.json` rectangles.
  - `scripts/ktx2.sh` — KTX-Software `toktx`: UASTC + zstd for the desktop atlas, ETC1S for mobile.
  - `scripts/posters.ts` — Playwright: captures every scene at its hold frame via `?capture=<scene>` at 1920×1080 and 1080×1920, then encodes AVIF.
- **Capture mode** (`?capture=<scene>`): freezes time, hides UI, cursor and grain animation, sets story time to the scene's hold midpoint, waits for textures, then signals readiness to Playwright.

### 15.8 Content model (what makes this a template)

- `content/site.ts` — brand tokens (name, descriptor, tagline, CTA, email, socials), surface and light colours, fonts, SEO defaults.
- `content/scenes.ts` — the scene manifest (Part 11.4).
- `content/projects.ts` — `Project { slug, title, year, client, discipline, services[], color, featured, cover { src, focal, portraitCrop }, summary, blocks[] }`, where blocks are `text | image | twoUp | video | quote | credits`. The Work wall shows the featured projects (4–6); the Index lists every project.
- `content/capabilities.ts` — `{ id, name, line, services[], form: 'ring' | 'fan' | 'lattice' | 'wave' }`.
- `content/process.ts` — `{ n, title, line }[]`.
- `content/proof.ts` — `{ quote, name, role, company }[]` plus `clients[]`.
- `public/brand/mark.svg` — the mark, including its `#keystone` marker.
- Validate all content with zod at build time. Missing required fields (for example a project without a cover) fail the build.

### 15.9 Routing and transitions

- `TransitionLink` wraps `next/link`. On a plain same-origin click it prevents the default, prefetches, plays the exit half of the transition (`transition.t` 0 → 0.6), calls `router.push`, and the destination's `useEnterTransition` completes it (0.6 → 1) once its content is mounted and its critical assets are ready (maximum wait 1.2 s). Modifier-key clicks and middle clicks behave natively.
- Browser back/forward: detect with `popstate`; play the reverse pass-through, or a short Shutter if the previous state is unknown.
- Per-route scroll restoration as in Part 9.2.
- Metadata through the Next.js metadata API; Open Graph images are the pre-rendered posters.

### 15.10 Resilience

- An error boundary around the canvas falls back to T0 posters.
- `webglcontextlost` / `webglcontextrestored` handling as in Part 14.7.
- Asset errors → scene poster plus the quiet notice (Part 10).
- PerformanceMonitor decline → step down (Part 16.3). Never step back up more than once per session.
- When the document is hidden, the GSAP ticker pauses naturally; pause audio too; on return, `dt` is clamped so nothing jumps.

---

## PART 16 — PERFORMANCE REQUIREMENTS

### 16.1 Targets

- **Frame rate:** stable 60 fps on T3 and T2. Everything is frame-rate independent, so 120/144 Hz displays look identical, only smoother. T1: 60 fps target, never below 45 fps in the heaviest scene.
- **Core Web Vitals (mobile):** LCP ≤ 2.5 s — the LCP element is DOM text, never the canvas; CLS ≤ 0.05; INP ≤ 200 ms.
- **JavaScript:** initial DOM shell ≤ 180 KB gzipped. The 3D chunk (three, R3F, the drei subset, postprocessing and the app's WebGL code) ≤ 380 KB gzipped, loaded after first paint by dynamic import.
- **Main thread per frame:** ≤ 4 ms on T3, ≤ 6 ms on T1; the kinetic update ≤ 1 ms for 1,200 instances.
- **GPU per frame:** ≤ 10 ms on T3 (1440p class), ≤ 12 ms on T2, ≤ 14 ms on T1.
- **Texture memory:** ≤ 256 MB on T3, ≤ 160 MB on T2, ≤ 96 MB on T1. No growth over a 10-minute session.
- **Shader compilation:** zero compiles after the intro (`renderer.info.programs` stays constant).

### 16.2 Quality tiers

| Setting | T3 — desktop high | T2 — desktop mid / tablet | T1 — mobile | T0 — fallback |
|---|---|---|---|---|
| Detection | GPU tier 3 or measured headroom | GPU tier 2, tablets | Phones, GPU tier ≤ 1 | No WebGL 2, failed context, second context loss |
| DPR clamp | 1–2 | 1–1.5 | 1–1.5 (start 1.25) | — |
| Slats | 1,200 | 720 | 360 | — |
| Geometry segments | 3 | 2 | 1 | — |
| Shadow map | 2048 | 1024 | None (baked blobs) | — |
| Ambient occlusion | White Room, full res | White Room, half res | None | — |
| Bloom | Mipmap, full res | Mipmap, 0.75 res | None | — |
| Depth of field | Hero, Proof | None | None | — |
| Floor | Reflector 1024 | Environment reflections | Unlit gradient | — |
| Keystone | Transmission | Fake glass | Fake glass | — |
| Dust motes | 6,000 | 3,000 | 1,000 | — |
| Shaft cards | 5 | 3 | 1 | — |
| Environment cube | 512 | 256 | 128 | — |
| Anti-aliasing | Composer MSAA ×4 if DPR < 1.75 | SMAA | Renderer MSAA | — |
| Materials | Physical | Physical | Standard where Part 7 says | — |
| Tracked planes | Yes | Yes | No | — |
| Grain | Pass | Pass | CSS overlay | CSS overlay |
| Max draw calls | 90 | 60 | 35 | — |
| Max triangles | 900k | 450k | 180k | — |

### 16.3 Adaptive degradation

On a sustained decline (for example an average below 50 fps over 2 s), step down one level per decline, re-measuring between steps:

1. DPR −0.25 (never below 1.0).
2. Disable the depth-of-field pass.
3. Keystone transmission → fake glass (saves a full scene re-render every frame).
4. Reflector floor → environment reflections (switch floor mesh visibility).
5. AO full → half resolution → pass disabled.
6. Bloom resolution → 0.5.
7. Shadow map 2048 → 1024 → 512 (resolution only; shadows are never switched off at runtime).
8. Dust −50%.
9. Slat count down one tier: reduce `InstancedMesh.count` (buffers are allocated once for the starting tier) and regenerate formations for the new count — only behind a Shutter, never mid-scene.

On a sustained incline, only DPR may step back up, once per session. Visible changes (steps 2–5 and 9) happen only at a hold or behind a Shutter.

### 16.4 Rules

- No allocations in per-frame code: no `new Vector3()`, no array literals, no closures created per frame.
- No React state per frame.
- Upload only what changed: one `instanceMatrix.needsUpdate` per frame; custom attributes only when their channel moved (partial uploads with `addUpdateRange`).
- Throttle expensive renders: the environment cube only during act transitions; contact shadows ≤ 30 fps; the shadow map every frame while formations or the key light move, and every other frame when only idle motion is present (`shadow.autoUpdate = false` with explicit `needsUpdate`).
- Textures: KTX2 for WebGL, AVIF/WebP for DOM; power-of-two sizes where mipmapped; anisotropic filtering (4) on the floor and covers only.
- Fonts: subset; preload one; no invisible-text flash.
- Pause rendering only behind fully opaque overlays (for example the mobile contact form); the menu uses the world as its backdrop.
- **Measure on real hardware at every phase:** a mid-range Android phone 2–3 years old, an iPhone 12–13 class device, an Apple-silicon MacBook Air, a Windows laptop with integrated graphics, and a desktop with a discrete GPU at 1440p or 4K.

---

## PART 17 — ASSET REQUIREMENTS

| Asset | Format and size | Notes |
|---|---|---|
| Brand mark | `mark.svg`: square viewBox, ≤ 20 paths, fills only, plus a `#keystone` marker element | Sampled into the Mark formation; also the favicon source |
| 3D wordmark font | Typeface JSON of a static instance of the display font (wght 700, wdth 112), subset to the brand name's glyphs | For `Text3D` (Part 8.1) |
| DOM fonts | woff2, Latin subset: Mona Sans variable, Geist Mono, Newsreader Italic (optional) | Self-hosted; preload Mona Sans roman |
| WebGL mono font | Geist Mono `.woff` or `.ttf` | Troika gate numerals |
| Project covers | Master 2400 × 1500 (16:10) and a portrait crop 1200 × 1500 (4:5) | DOM via `next/image` (AVIF/WebP); WebGL via the atlas |
| Cover atlas | 2048², six cells (one per featured project), 8 px padding, `atlas.json` rectangles. Desktop: 16:10 cells of ≈1,000 × 630 px, KTX2 UASTC + zstd. Mobile: 4:5 cells of ≈665 × 830 px, KTX2 ETC1S | Featured projects only (the Work wall shows 4–6) |
| Case-study media | Images: 2400 px masters → responsive AVIF/WebP. Video: H.264 MP4 + WebM, 1080p, ≤ 8 MB, with a poster frame | Lazy-loaded |
| Floor maps | Concrete roughness + normal, 1024² KTX2, tileable, with the 1.2 m seam grid baked into roughness | — |
| Noise | Blue noise 128² PNG (dithering); tileable value noise 256² (light shafts) | Tiny |
| LUT (optional) | `.cube`, 33³ | One global grade |
| Environment | Procedural (Lightformers) — no HDR file | A 1k `.hdr` only if a brand needs photographic reflections |
| 3D models | None by default — all geometry is procedural | A brand-supplied GLB (a custom lamella, Appendix A) goes through gltfpack with Meshopt compression and KTX2 textures; Draco only for dense static meshes |
| Posters | Per scene: 1920 × 1080 and 1080 × 1920 AVIF (≈150–300 KB each) | Generated from the finished build |
| Open Graph image | 1200 × 630 JPEG (hero poster crop) | — |
| Favicons | SVG favicon, 180 px Apple touch icon, manifest icons | Derived from the mark |
| Audio (optional) | Two ambient beds (dark acts, White Room), 60–90 s loops, Opus/WebM + AAC fallback, ≤ 900 KB each; a flip-tick sprite ≤ 30 KB | Loaded only after the user enables sound |

**Placeholder media policy:** until real media exists, generate placeholder covers with `scripts/placeholder-covers.ts`: 2400 × 1500, each a distinct composition of the project's colour against void, with the project title set large in the display face and grain applied. Never use stock photos, and never present invented work as real.

**Transfer budget (home, desktop, excluding case-study media):** critical ≤ 1.2 MB; Work atlas ≤ 3 MB; total ≤ 5 MB.

---

## PART 18 — ANIMATION SPECIFICATIONS

Every named animation. "Scrubbed" means mapped to scroll inside a transition zone and smoothed through damped story time. **RM** = the reduced-motion variant.

| ID | Animation | Trigger | Duration / physics | Easing | Stagger / order | RM |
|---|---|---|---|---|---|---|
| A01 | Loader lines | Load progress | Damped, λ = 4 | — | Centre → out | Lines appear without brightening |
| A02 | First light | Assets ready | ≈0.9 s | `spring.flip` | `stagger.loader`, centre → out | 300 ms fade |
| A03 | Descent (Line → Monolith) | Intro | 1.8 s | `ease.swift` (camera), `spring.slat` (slats) | By target height, top first | Cut to settled Hero |
| A04 | Wordmark rise | Intro, 2.2 s | 1.2 s | `ease.out` | — | Static |
| A05 | Hero text in | Intro, 2.6 s | `dur.text` | `ease.out` | Label → H1 lines → lead → indicator | 300 ms fade |
| A06 | Monolith idle twist | Always (Hero) | Noise, 0.08–0.25 Hz | — | Travels upward | Off |
| A07 | Cursor twist band | Pointer | `spring.tilt` | — | Gaussian band | Off |
| A08 | Unscrew (Monolith → Vortex) | Scroll, 60vh | Scrubbed | `easeInOutCubic` per slat | Tower top first | Crossfade (14.6) |
| A09 | Word wave | Scroll (Manifesto) | Scrubbed | Linear + damping | Word order | Words shown in full |
| A10 | Unravel (Vortex → Wall) | Scroll, 70vh | Scrubbed | Per slat | Vortex top first | Crossfade |
| A11 | Project flip | Scroll step | Scrubbed (50% of a step) + `spring.flip` | Per fin, 5° anticipation | Diagonal sweep | Cover crossfade |
| A12 | Peek | Pointer | `spring.tilt` | — | Radial, r = 1.2 m | Off |
| A13 | Title swap | Flip passes 50% | 600 ms | `ease.in` out / `ease.out` in | Lines, 60 ms | Fade |
| A14 | Pass-through (to a case study) | Click | 1.6 s | `ease.swift` | From the click point | 300 ms crossfade |
| A15 | Inversion (Work → White Room) | Scroll, 80vh | Scrubbed | Smoothstep luminance; per-slat material wave | From screen centre | 300 ms crossfade |
| A16 | Study performance (× 4) | Hover / focus / tap | 0.9–1.4 s, then settle | `spring.slat` | Per study | Label highlight only |
| A17 | Stream (Clusters → Tunnel) | Scroll, 80vh | Scrubbed | Per slat | From the last study | Crossfade |
| A18 | Gate pulse | Camera passes a gate | 600 ms | `ease.out` / `ease.in` | — | Off |
| A19 | Step text | Gate pass | `dur.text` | `ease.out` | Lines | Fade |
| A20 | Peel-off (Tunnel → Flock) | Scroll, 80vh | Scrubbed | Per slat + tumble | Nearest first | Crossfade |
| A21 | Flock | Always (Proof) | Time-based | — | — | Frozen flock |
| A22 | Converge (Flock → Mark + rest field) | Scroll, 60vh | Scrubbed; spring settles | Per slat | Mark first, then rest by distance | Crossfade |
| A23 | Mark idle, tilt and drag | Time / pointer | `spring.tilt`; friction 2.2/s | — | — | Static |
| A24 | Rest-field ripple | Mark released | 4 m/s wave, 3 cm lift | `spring.slat` | Radial | Off |
| A25 | Menu shutter | Click | 900 ms open / 700 ms close | `spring.flip`; `ease.out` (DOM) | From the Menu button | 200 ms fade |
| A26 | Shutter-cut jump | Jump > 2 scenes | 0.5 s close + 0.6 s open | `ease.in` / `ease.out` | From centre | Fade |
| A27 | Reassembly (back to top, 404) | Click | 1.8 s | `spring.slat` | By target height, top first (lifted by the wires) | Cut |
| A28 | Case roll-up | Scroll (case study) | Scrubbed, 100vh | Per row | Bottom row first | Static canopy |
| A29 | Next-project descent | Scroll (case end) | Scrubbed, 100vh | Per row | Top row first | Poster |
| A30 | Louver shear | Scroll velocity | Damped, λ = 6 | — | By strip distance from centre | Off |
| A31 | Line reveal | Enters viewport | `dur.text` | `ease.out` + width 118 → 100 | Lines, 80 ms | 300 ms fade |
| A32 | Slat-mask reveal | Enters viewport | 0.9 s | `ease.out` | 40 ms per strip | 300 ms fade |
| A33 | Nav roll | Hover | 320 ms | `ease.hover` | — | Colour change |
| A34 | CTA magnet + fill | Hover | `spring.magnet`; 400 ms fill | `ease.out` | 40 ms per slat | Fill without motion |
| A35 | Link underline | Hover | 350 / 250 ms | `ease.hover` | — | Instant |
| A36 | Cursor morphs | Context | 250 ms | `ease.hover` | — | Native cursor |
| A37 | Scroll indicator | Hero idle | 1.6 s loop | `ease.swift` | — | Static line |
| A38 | Collapse fall (404) | Arrival | 1.2 s | Gravity-like ease-in + spring settle | By height | Static pile |
| A39 | Iridescent ripple | Long press (T3) | 2 s | `ease.swift` | Travels up the tower | Off |

---

## PART 19 — COMPONENT ARCHITECTURE

### 19.1 Folder structure

```
app/                        # routes (Part 15.3)
content/                    # site.ts, scenes.ts, projects.ts, capabilities.ts, process.ts, proof.ts, assets.ts
public/
  brand/mark.svg   fonts/   textures/   atlas/   posters/   audio/   basis/
scripts/                    # placeholder-covers.ts, build-atlas.ts, ktx2.sh, posters.ts
src/
  state/      frame.ts  store.ts
  motion/     clock.ts  gsap.ts  eases.ts  tokens.ts  useLineReveal.ts  useSlatReveal.ts
  webgl/
    Experience.tsx                     # <Canvas>, renderer setup per tier
    core/       QualityProvider.tsx  tiers.ts  Director.tsx  story.ts  acts.ts
                LightRig.tsx  EnvironmentRig.tsx  Fog.tsx
    camera/     CameraRig.tsx  paths.ts  lensShift.ts
    kinetic/    KineticArray.tsx  engine.ts  springs.ts  morph.ts  orderFields.ts  keystone.ts  config.ts
                formations/  line.ts  monolith.ts  vortex.ts  wall.ts  clusters.ts  tunnel.ts
                             flock.ts  mark.ts  canopy.ts  caseWall.ts  collapse.ts  rest.ts
    materials/  slatMaterial.ts  slat.glsl.ts  keystoneMaterial.tsx  floor.tsx  wordmark.ts
    world/      Floor.tsx  Cyclorama.tsx  Wires.tsx  Wordmark3D.tsx  GateNumerals.tsx
                Backplates.tsx  Dust.tsx  LightShafts.tsx
    tracking/   TrackedPlanes.tsx  useDomRect.ts  DomTwins.tsx
    post/       PostFX.tsx  ExposureEffect.ts
  ui/         Nav.tsx  Menu.tsx  IndexOverlay.tsx  Cursor.tsx  MagneticButton.tsx  HairlineLink.tsx
              SceneTicks.tsx  ScrollIndicator.tsx  DomLoader.tsx  SoundToggle.tsx  MotionToggle.tsx
              SplitHeading.tsx  SlatReveal.tsx  SlatImage.tsx  Counter.tsx  SpatialLabel.tsx
              DomTwin.tsx  TransitionLink.tsx  Hint.tsx
  sections/   Hero.tsx  Manifesto.tsx  Work.tsx  Capabilities.tsx  Process.tsx  Proof.tsx  Contact.tsx
              case-study/*
  a11y/       SkipLink.tsx  useReducedMotion.ts  LiveRegion.tsx
  audio/      sound.ts (optional)
```

### 19.2 Key interfaces

```ts
export type FormationId = 'line' | 'monolith' | 'vortex' | 'wall' | 'clusters' | 'tunnel'
  | 'flock' | 'mark' | 'canopy' | 'caseWall' | 'collapse'
export type Role = 0 | 1 | 2                       // primary | secondary | reserve
export type TransitionType = 'morph' | 'flip' | 'shutter' | 'passThrough' | 'inversion' | 'peelOff'

export interface LayoutContext { aspect: number; tier: TierId; projectCount?: number; markShapes?: Shape[] }

export interface FormationData {
  position: Float32Array   // n * 3 — canonical slot order (Part 5.4); slot 0 is the Keystone
  rotation: Float32Array   // n * 4 (quaternions)
  scale: Float32Array      // n * 3
  role: Uint8Array         // n
  cell?: Float32Array      // n * 4 — Wall cover slices
  group?: Uint8Array       // n — cluster ids
}
export interface Formation { id: FormationId; build(n: number, ctx: LayoutContext): FormationData }

export interface Act {
  id: ActId
  key: DirectionalState; rim: DirectionalState; spots: [SpotState, SpotState, SpotState]; hemi: HemiState
  env: EnvState; fog: { color: string; density: number }; exposure: number
  bloom: { intensity: number; threshold: number }; ao: boolean; vignette: number; grain: number; shadow: number
}

export interface SceneDef {
  id: string
  length: number | { perItem: number; tail: number }   // vh, desktop
  formation: FormationId
  act: ActId | [ActId, ActId]                          // a pair blends across the scene
  camera: CameraPathId
  transition?: { length: number; type: TransitionType; origin: OriginId }
  pin?: boolean                                        // default true; false = blocks scroll naturally (Part 11.3)
}
```

### 19.3 Reusable components and their contracts

- **`KineticArray`** — formation-agnostic. Reads the Director; exposes channel setters (`flip`, `twist`, `tilt`, `edgeOn`, `emissive`, `metal`) and formation group transforms (Part 5.5) that scene modules use.
- **Scene module pattern** — every scene has a WebGL module (channel targets and its cursor discovery) and a DOM section component. They communicate only through the store and the frame object.
- **`SplitHeading`** — line reveal with width-axis settle. Props: `as`, `trigger` (`enter | manual`), `delay`.
- **`SlatReveal` / `SlatImage`** — strip-mask reveals. Props: `strips`, `origin`, `duration`.
- **`MagneticButton`** — spring magnet plus slat fill; renders `<a>` or `<button>`.
- **`HairlineLink`** — underline draw and retract.
- **`SpatialLabel`** — a DOM label tracked to a 3D anchor with a leader hairline.
- **`DomTwin`** — an invisible, accessible `<a>` or `<button>` positioned over a projected 3D rect.
- **`TransitionLink`** — route transitions (Part 15.9).
- **`Counter`** — mono digit reel.
- **`SceneTicks`, `ScrollIndicator`, `Hint`, `Cursor`, `DomLoader`, `MotionToggle`, `SoundToggle`.**
- **`TrackedPlane`** — scroll-rig plane for case-study media.

These are the only components allowed to animate the DOM. Sections compose them; they never write ad-hoc animations.

---

## PART 20 — DEVELOPMENT INSTRUCTIONS

### 20.1 Ground rules for you, the coding AI

1. **DOM first.** At the end of every phase the site must be complete, readable and navigable with WebGL disabled.
2. **Never invent content.** Use `content/*` (Appendix B) and flag gaps in your report.
3. **Never add effects, libraries or scenes that this document doesn't specify.** If you believe something is missing, propose it in your phase report instead of building it.
4. **One clock; no per-frame allocations; no React state per frame.**
5. **Tunables:** expose every tunable number (camera, acts, springs, staggers, post) in Leva during development, grouped by Part; commit approved values to config files; strip Leva from production.
6. **Isolate renderer-specific code** in `webgl/materials` and `webgl/post`.
7. **Frame-rate independence everywhere** — test on a 120/144 Hz display or by throttling.
8. **Accessibility is part of "done" in every phase**, not a final pass.
9. **Ambiguity:** choose the quieter, slower, more physically plausible option and record the decision in your report.
10. **Commit** after each coherent step with a descriptive message.

### 20.2 Phases — stop and report at the end of each

**Phase 0 — Foundation**
- Scaffold Next.js (App Router, TypeScript strict), Tailwind v4 tokens (Part 2), fonts (Part 8), content files with Appendix B copy, zod validation.
- Lenis + GSAP + the clock (Part 11.1), with `advance` as a no-op until Phase 1.
- Every DOM section with real layout, typography and text reveals (`SplitHeading`, `SlatReveal`); nav, menu, Index, cursor, ticks, footer, 404, case-study template (DOM only).
- Reduced-motion path, Motion toggle, skip link, focus styles.
- *Acceptance:* Lighthouse accessibility ≥ 95; CLS < 0.05; every page navigable by keyboard alone; reveal timings match Part 18; no WebGL present.

**Phase 1 — World skeleton (grey boxes)**
- Persistent canvas (dynamic import), tier detection, `QualityProvider`, clock integration (`frameloop="never"` + `advance`).
- Director with story time, the scene manifest and act blending; camera rig with paths and lens shift.
- `KineticArray` with plain grey rounded boxes: every formation built parametrically in canonical slot order; morphs with order fields; no springs yet.
- Fixed light rig with acts as numbers; fog; a basic floor.
- *Acceptance:* scrolling the whole home page moves the camera and morphs formations smoothly and reversibly at 60 fps on T3 and ≥ 45 fps on T1; screenshots at three positions per scene; formation envelopes match Part 5.4; no shader compiles after load.

**Phase 2 — The kinetic engine**
- Springs (position and scalar channels), group transforms, idle noise, arcs, tumble, the Keystone (slot 0), the edge-on modifier, the velocity channel.
- Cursor discoveries per scene (Part 12.2) with DOM twins.
- The Work flip mechanism with deterministic face addressing (on placeholder covers), peek, snapping.
- *Acceptance:* flips scrub forward and backward at any speed with no texture errors; springs show one overshoot and settle; idle decay works; Work is fully operable by keyboard.

**Phase 3 — Light and material**
- Slat material (CSM) with per-instance variation and the material morph; Keystone materials per tier; floor variants; cyclorama; wordmark stone.
- Lightformer environments per act; shadow fitting; contact shadows; the post chain per tier; grain, dithering, AgX.
- Dust, shafts, wires, backplates.
- *Acceptance:* every act matches Part 6.2 within tuning; every hold frame passes the screenshot test (Part 23); GPU budgets met per tier; no banding in fog gradients.

**Phase 4 — Choreography and transitions**
- The intro (S00) including the DOM → WebGL handoff; every scene transition according to the grammar (Part 4.4); pass-through route transitions; Shutter; shutter-cut jumps; reassembly; type in space (`Text3D`, gate numerals); spatial labels; hints.
- *Acceptance:* the intro completes in ≤ 3.2 s after assets are ready; every transition is reversible (scroll) or one-way as specified; no cut or flash anywhere it isn't specified; M2 and M3 visibly respected (record videos).

**Phase 5 — Case studies, 404, overlays, sound**
- Case-study template with roll-up canopy, tracked planes with louver shear, next-project flow; 404 Collapse; Index preview; optional contact form; optional sound module.
- *Acceptance:* route transitions work in both directions, including browser back; tracked planes stay within 1 px of their DOM placeholders during fast scrolling; memory is stable across 20 route changes.

**Phase 6 — Responsive and mobile recomposition**
- Portrait formations, camera framings, touch interactions, mobile navigation, the T1 material and no-composer path, `svh` handling, the orientation Shutter.
- *Acceptance:* tested on a real iPhone and a real Android phone; ≥ 45 fps in the heaviest scene; no URL-bar jumps; every interaction reachable by touch.

**Phase 7 — Hardening**
- Performance pass with adaptive degradation (Part 16); T0 posters via the capture script; error and context-loss handling; SEO metadata; Open Graph images; asset pipeline scripts; the QA checklist (Part 21) and the visual checklist (Part 23).
- *Acceptance:* every checklist passes; Web Vitals targets met; production build contains no development tools.

### 20.3 Phase report template

- What was built, mapped to spec sections.
- Screenshots of every scene at 25 / 50 / 75% of its hold, on desktop and mobile.
- Short screen recordings of every transition.
- Metrics per scene on T3 and T1 hardware (or the closest available proxy — say which): fps min/avg, draw calls, triangles, program count, JavaScript bundle sizes.
- Deviations from the spec, with reasons.
- Open questions.

### 20.4 Development tooling

- Leva groups: Camera, Acts, Kinetic, Materials, Post, Motion, Debug. The Debug group can show formation bounds, order fields as colours, story time and the act blend.
- `?debug` enables stats and the panel on preview builds only.
- `?capture=<scene>` for poster capture (Part 15.7).
- `?tier=0|1|2|3` forces a tier; `?rm=1` forces reduced motion.

---

## PART 21 — QA CHECKLIST

**Functional**
- [ ] Every scene is reachable by scroll, scene ticks, menu and deep link.
- [ ] Work: flips forward and back at any speed; snapping; arrow keys; swipe on touch; Index preview; opening a case study by click, Enter and link.
- [ ] Case study: arrival, roll-up, tracked planes, next project (automatic and by click), returning to Work at the right project.
- [ ] Menu and Index: open and close by click and Esc; focus trap; inert background; scrolling locked.
- [ ] Contact: copy email, `mailto:` link, optional form validation, error and success states.
- [ ] Back to top: shutter-cut followed by reassembly.
- [ ] 404: collapse, lift, back to start.
- [ ] Motion and Sound toggles persist across reloads.

**Motion and choreography**
- [ ] One clock: no one-frame drift between DOM and WebGL during fast flicks (step through frames in DevTools).
- [ ] Every scroll transition is reversible, with no pops when scrolling back.
- [ ] Frame-rate independence verified at 60, 120 and 144 Hz.
- [ ] One lead motion at a time (M2); world first, word second (M3) in every entrance.
- [ ] No text moves during a formation morph.
- [ ] Springs overshoot once and settle within 1.2 s; no jitter at rest.
- [ ] World cursor influence decays after 3 s of stillness.
- [ ] Jumps across more than two scenes use the shutter-cut.
- [ ] Morphs read as coherent waves (canonical slot order): no crossing swarms except the Flock's convergence into the Mark.
- [ ] Each scene stays pinned for exactly its manifest length; no text slides during a morph.

**Visual**
- [ ] Hold frames match their acts (compared with the approved Phase 3 reference screenshots).
- [ ] No banding; grain present; no shimmer on edge-on slats at any tier.
- [ ] No shadow acne or peter-panning on slats.
- [ ] White Room: no visible horizon; occlusion visible in crevices; soft contact shadows.
- [ ] Wall covers read correctly (never mirrored) on both faces after any number of flips in either direction.
- [ ] The Keystone is present at the focal point of every formation.

**Performance**
- [ ] Part 16 budgets met per tier on real devices.
- [ ] Zero shader compiles after the intro (program count constant).
- [ ] No memory growth over 10 minutes or 20 route changes.
- [ ] Adaptive degradation steps correctly and never oscillates.
- [ ] LCP element is DOM text; mobile LCP ≤ 2.5 s; CLS ≤ 0.05; INP ≤ 200 ms.

**Devices and browsers**
- [ ] Latest Chrome, Edge, Firefox and Safari on desktop; iOS Safari (two latest major versions); Chrome on Android.
- [ ] Laptop with integrated graphics; discrete-GPU desktop at 1440p and 4K; high-DPR phones.
- [ ] Portrait, landscape, orientation change, iPad split view, window resizing.
- [ ] Trackpad, mouse wheel, touch, keyboard only, and screen readers (VoiceOver and NVDA).

**Accessibility**
- [ ] The reduced-motion path is correct, and the Motion toggle stops all idle motion.
- [ ] All content is in the DOM with a correct heading hierarchy, landmarks, alt text and captions.
- [ ] Every 3D interaction has a DOM twin with an accessible name and keyboard activation.
- [ ] Contrast ≥ 4.5:1 over rendered backgrounds in every act, including mid-inversion.
- [ ] Focus is visible everywhere; no traps outside overlays.
- [ ] Touch targets ≥ 44 px.

**Resilience**
- [ ] WebGL disabled → T0 posters and a fully working site.
- [ ] Context loss → poster → restore; a second loss → T0.
- [ ] An asset 404 or timeout → poster and notice; the site continues.
- [ ] Slow 3G with 4× CPU throttling: the loader stays honest; `Enter anyway` appears after 8 s and works.
- [ ] Hiding and returning to the tab causes no jumps.

**Content and SEO**
- [ ] Metadata, Open Graph images, sitemap, robots, canonical URLs, organisation structured data.
- [ ] Every placeholder in Appendix B replaced before launch; no placeholder testimonial ever ships.
- [ ] Font and media licences verified.

---

## PART 22 — DO NOT DO THIS

- Do not copy or imitate any reference studio's site, layouts, signature effects or branding.
- Do not put a rotating object in the centre of the hero — or anywhere.
- Do not use a generic HDRI studio look or neon-on-black palettes.
- Do not use decorative CSS gradients, glassmorphism cards, glowing borders or drop shadows.
- Do not use cards, boxed sections or rounded rectangles.
- Do not let bloom exceed the act values. Only emissives and the brightest speculars may bloom; images never bloom.
- Do not move everything at once, and do not animate text during a morph.
- Do not use bounce or elastic easing, linear easing for visible motion, or constant per-frame lerps.
- Do not build particle shapes, particle text, cursor trails, blob cursors or images that follow the cursor.
- Do not hijack scrolling beyond the documented sticky scenes; no horizontal scroll hijack on mobile.
- Do not snap scrolling anywhere except Work.
- Do not add sections, effects or libraries that aren't specified — propose them instead.
- Do not change light counts or types, toggle `castShadow`, let material features cross zero, or add/remove post effects mid-scroll.
- Do not update React state per frame or allocate inside per-frame code.
- Do not use ScrollTrigger pinning or ScrollSmoother.
- Do not put meaningful text only in WebGL, and do not rely on the canvas for any content or navigation.
- Do not use WebGPU, alpha/beta/canary packages, or unpinned versions.
- Do not use lorem ipsum, stock photos, or invented testimonials, clients or work presented as real.
- Do not show a spinner, a meaningless percentage, or a loader that misrepresents progress.
- Do not make a scene longer than specified, and never make users wait for animation before they can read.
- Do not centre paragraphs, and do not use more than one sans, one mono and the optional capped serif.
- Do not use chromatic aberration outside pass-throughs, or depth of field on mobile.
- Do not autoplay sound.
- Do not ship development tools (Leva, stats, debug queries) to production.

---

## PART 23 — FINAL VISUAL QUALITY CHECKLIST (the art director's pass)

Run it on every hold frame and every transition midpoint, on desktop and on mobile.

- [ ] **Screenshot test:** a random scroll position looks like a composed film still.
- [ ] **Squint test:** in greyscale, squinting, the monument reads first, the headline second, everything else after.
- [ ] **One monument** at 40–70% of the short side, on the third line — centred only in the Loader and Contact.
- [ ] **Depth:** three planes present; atmospheric falloff visible.
- [ ] **Light:** one key direction; highlights are soft bars, never dots; shadows agree with the key.
- [ ] **Colour:** only light is saturated; palette ratios hold; no second hue.
- [ ] **Darkness:** 60–75% of the frame below 8% luminance in dark acts (inverted in the White Room).
- [ ] **Materials:** slats read as lacquered physical objects with visible variation up close — not CG boxes.
- [ ] **Hairlines:** edge-on slats are crisp, with no shimmer.
- [ ] **Type:** extreme scale contrast; measure 38–62 characters; no widows in display lines; crisp mono labels.
- [ ] **Space:** ≥ 40% of the DOM layer empty; ≤ 3 text blocks visible.
- [ ] **Motion:** one lead motion; world first, word second; waves, not blocks; one overshoot, then stillness.
- [ ] **Idle:** alive but not busy; UI perfectly still.
- [ ] **Transitions:** each carries its single meaning (Part 4.4); none feels like a gimmick; none runs longer than specified.
- [ ] **Surprise:** the Inversion and the Pass-through land as genuine surprises on first viewing.
- [ ] **Texture:** grain unifies DOM and WebGL; no banding anywhere.
- [ ] **Mobile** feels like the same world, not a shrunken desktop.
- [ ] **"Is it expensive?"** If any frame could be mistaken for a template or a tech demo, find the DNA rule it breaks and fix the rule's implementation, not the symptom.

---

## APPENDIX A — BRAND SWAP GUIDE

**What changes for a real brand, and where:**

1. **Tokens** — `content/site.ts`: name, descriptor, tagline, CTA, email, socials.
2. **Copy** — every file in `content/`.
3. **Mark** — replace `public/brand/mark.svg` (keep a `#keystone` marker); the Mark formation resamples automatically.
4. **Colour** — one signal hue in `content/site.ts`, plus the act light colours. Derive light temperature from the brand's emotional register: warm, human brands → keys at 2,700–3,400 K; cool, technical brands → keys at 4,500–6,500 K with warmer rims.
5. **The element** — lamella dimensions in `webgl/kinetic/config.ts`, or a custom GLB (Meshopt-compressed, ≤ 300 triangles, pivot at centre, long axis = local X). Ideas: tiles for a technology brand, petals for beauty, discs for music, bricks for architecture, pages for publishing.
6. **Materials** — choose from Part 7.2 (brushed champagne metal for luxury, ceramic for wellness, soft-touch polymer for playful brands). Keep exactly one glass Keystone.
7. **Fonts** — swap families in `content/site.ts`, keeping the role structure (one sans, ideally with a width axis; one mono; an optional serif).
8. **Scenes** — reorder or remove them in `content/scenes.ts`, then re-check the pacing rule (Part 1.4).

**Section mapping for other kinds of site:**

| Site type | Work becomes | Capabilities becomes | Process becomes | Proof becomes |
|---|---|---|---|---|
| Studio / agency | Selected work | Services | Process | Clients and testimonials |
| Personal portfolio | Projects | Skills | Approach / timeline | Recognition |
| Product launch | Product views (flip = variants) | Feature pillars | How it works | Reviews and press |
| Fashion / retail | Collection (flip = looks) | Materials and craft | Making-of | Press |
| Cultural organisation / festival | Programme | Disciplines | The journey / timeline | Partners |

**What must never change (the DNA):** one persistent sculpture; light as the only colour; the transition grammar; one clock; DOM-first content; the quality tiers.

---

## APPENDIX B — PLACEHOLDER COPY

Everything below is placeholder copy for a fictional studio. Replace it before launch. Project names are invented. Testimonials are deliberately unattributed placeholders and must never ship.

**Site**
- Name: LAMELLA · Descriptor: Spatial & digital design studio · Tagline: Many parts. One motion.
- CTA: Start a project · Email: hello@example.com · Socials: Instagram, LinkedIn, Are.na (placeholder URLs)

**Hero**
- Label: (01) Spatial & digital design studio
- H1: We design brands, products and spaces that move as one.
- Lead: An independent studio for identity, digital products and spatial experiences.

**Manifesto** — the three statements in S02.

**Projects (fictional)**

| # | Title | Year · Discipline · Client | Summary | Backplate colour |
|---|---|---|---|---|
| 1 | Tidewater Archive | 2026 · Digital archive · Tidewater Maritime Trust | A living archive of three centuries of harbour records, designed to be browsed like a tide chart. | `#2B3A42` |
| 2 | Kestrel & Vane | 2025 · Identity & launch · Kestrel & Vane Instruments | An identity for precision weather instruments, built on the rhythm of a barometer's needle. | `#5A3E2B` |
| 3 | North Quay Pavilion | 2025 · Spatial installation · North Quay Arts | A timber pavilion whose louvers track the sun, with a digital twin visitors can control. | `#3F4A36` |
| 4 | Softfield OS | 2024 · Digital product · Softfield | The interface for a home-energy system that explains itself at a glance. | `#2F2D45` |
| 5 | Low Tide Festival | 2024 · Festival identity & website · Low Tide Collective | A three-day festival identity that changes with the tide tables. | `#4A2F2F` |

Case-study block order for every placeholder project: context text → full-bleed image → two-up images → placeholder pull quote → video → credits.

**Capabilities**
- **Strategy** (Ring) — "Finding the one idea everything else serves." — Positioning · Naming · Brand architecture · Research
- **Identity** (Fan) — "Systems that stay recognisable in any motion." — Visual identity · Type and motion systems · Guidelines · Packaging
- **Digital** (Lattice) — "Products and sites engineered to feel inevitable." — Websites · Product design · Creative development · Design systems
- **Spatial** (Wave) — "Rooms, installations and exhibitions that respond." — Installations · Exhibitions · Retail environments · Wayfinding

**Process** — 01 Listen · 02 Frame · 03 Build · 04 Tune, with the lines in S05.

**Proof**
- Quotes (× 3): "[Placeholder — one or two sentences from a real client about the work and the collaboration.]" — Client Name, Role — Company
- Clients: Client 01 … Client 10

**Contact**
- Label: (07) Contact · Headline: Start with a conversation.
- Line: Tell us what you're making. We reply within two working days.
- Footer: © 2026 LAMELLA · Privacy · Motion: On · Sound: Off · Back to top ↑

**404** — "404" · "This part of the field hasn't been built." · "Back to the start →"

**Hints** — "Scroll" · "Move to part the wall · Scroll to flip" · "Hover a study" · "Drag to turn"

**Loader** — "Skip intro" · "Enter anyway →"

---

## APPENDIX C — GLOSSARY

- **Lamella / slat** — one element of the sculpture (a rounded box, 0.60 × 0.14 × 0.022 m).
- **The Array** — all lamellae, rendered as one `InstancedMesh`.
- **Keystone** — the single glass lamella (always slot 0) that marks each formation's focal point.
- **Formation** — a pure function that lays out all lamellae for a scene.
- **Act** — a complete lighting state (Part 6.2).
- **Story time (G)** — damped global scroll progress in scene units; the only input WebGL systems read.
- **Transition zone** — the last part of a scene, where formation, act and camera move into the next scene.
- **Order field** — the spatial stagger rank that turns a morph into a wave.
- **Channel** — a per-slat scalar spring (flip, twist, tilt, edge-on, emissive, metal) layered on top of a formation.
- **Hold progress (h)** — a scene's progress through the part before its transition zone.
- **DOM twin** — an invisible, accessible HTML control positioned over an interactive 3D object.
- **Shutter / shutter-cut** — all slats turn edge-on to change channel; a shutter-cut hides a long jump.
- **Pass-through / Inversion / Peel-off** — the transition types of Part 4.4.

---

## APPENDIX D — REFERENCES (verified September 2026; re-check versions at build start)

- three.js manual, WebGPU post-processing: https://threejs.org/manual/en/webgpu-postprocessing.html
- WebGPU migration checklist for three.js r186 (which drei and pmndrs pieces do not run on `WebGPURenderer`; the `RenderPipeline` rename): https://www.utsubo.com/blog/webgpu-threejs-migration-guide
- React Three Fiber releases (v10 WebGPU work): https://github.com/pmndrs/react-three-fiber/releases
- GSAP 3.13 release notes (every plugin free; SplitText rewrite): https://gsap.com/blog/3-13/
- Lenis (React adapter `lenis/react`, snapping `lenis/snap`): https://github.com/darkroomengineering/lenis
- @react-three/postprocessing: https://github.com/pmndrs/react-postprocessing
- `PCFSoftShadowMap` deprecated for WebGL since r182 (falls back to `PCFShadowMap`): https://github.com/Tresjs/tres/pull/1483

---

**Start with Part 20, Phase 0. Read Parts 0–19 first. End of master prompt.**
