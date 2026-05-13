# Website Refinement Build Spec: Sarah Bowles Portfolio

## Project context

- **Site:** https://sarahbowles-site.vercel.app/ (canonical: sarahbowles.co.uk)
- **Stack:** Astro v6.3.1 (confirmed via live site `<meta generator>`)
- **Goal:** Visual and structural refinement only — transform the current generic layout into a warm, professional, elegantly designed space appropriate for a clinical psychologist's doctoral project.
- **Approach:** Execute the phases in order. **Stop after each phase, summarise what changed, and wait for review before starting the next.**

---

## Hard rules (apply to every phase)

1. **Do not change written content.** Body copy, headings, link text, image alt text, page titles, and metadata must remain exactly as currently written unless this spec explicitly asks for a removal. Sarah will review and revise wording herself once the visual and structural pass is complete. If a styling change appears to require a copy edit, leave the copy alone and flag it as a question.
2. **Do not change information architecture.** Existing pages, routes, navigation order, and the order of sections within each page stay as-is unless this spec explicitly says otherwise.
3. **Single source of truth for tokens.** Place all design tokens (colour, type, spacing, radius, shadow) as CSS custom properties in one global stylesheet — e.g. `src/styles/global.css` or whatever the project already uses. Reference them via `var(--token-name)` from component-scoped styles. **Do not duplicate raw hex values across components.**
4. **Mobile-first.** Every spacing, type, and layout rule must look right at a 375px viewport before scaling up. Verify on mobile before signing off a phase.
5. **Accessibility.** All text/background colour pairings must meet WCAG AA contrast (4.5:1 body, 3:1 large headings). Verify with a contrast checker after applying the palette.
6. **No new dependencies** beyond Google Fonts unless strictly required. If a new package is unavoidable, note the reason in the phase summary.
7. **Work in small commits per phase.** One semantic commit per logical change so the diffs are reviewable.

---

## Phase 1: Content pruning

**Objective:** Remove redundant elements so subsequent phases work on a clean canvas.

- **Header navigation:** Remove the "Sarah Bowles" wordmark/link in the top-left of the nav bar. The page titles carry the identity; the wordmark is redundant.
- **Research project detail page** (`/research/growth-oriented-practice-in-psychosis`):
  - Remove the "A doctoral research project" eyebrow line above the main `<h1>`.
  - Remove the entire "A look at the poster" section: the `<h2>`, the poster image, the caption, and any wrapping container or surrounding divider so no empty rule is left behind.

**Do not** touch any other text on this page.

**Acceptance:**
- Header no longer contains the wordmark on any page.
- Research detail page no longer contains the eyebrow or the poster section.
- No leftover empty containers, dividers, or whitespace artefacts.
- No copy changes elsewhere.

---

## Phase 2: Global theme — colour & typography

**Objective:** Establish a single cohesive warm-earthy palette and typography system, applied consistently across every page.

### 2.1 Colour palette

Define these on `:root` in the global stylesheet:

```css
:root {
  /* Surfaces */
  --color-bg:           #F7F1E3; /* warm cream — primary page background */
  --color-surface:      #FBF7EC; /* slightly lighter cream — cards, raised blocks */
  --color-surface-tint: #EFE7D2; /* tinted surface — alt sections, blockquotes */

  /* Text */
  --color-text:         #2B2520; /* deep warm charcoal — body & headings */
  --color-text-muted:   #5C544A; /* secondary text — meta, eyebrows, captions */

  /* Accent (sage/teal) */
  --color-accent:       #6B8E83; /* primary accent — links, key UI */
  --color-accent-deep:  #4F6E64; /* darker sage — link default, hover on light */
  --color-accent-soft:  #DCE5E1; /* very soft sage — accent surface tint */

  /* Lines & shadow */
  --color-border:       #E5DCC8; /* warm taupe — hairlines, dividers */
  --shadow-sm:          0 1px 2px rgba(43, 37, 32, 0.05);
  --shadow-md:          0 2px 4px rgba(43, 37, 32, 0.04),
                        0 8px 16px rgba(43, 37, 32, 0.06);
}
```

Apply `background: var(--color-bg)` to `body`. Replace **every** hardcoded colour value in the codebase (including the jarring mix of pure white and cream) with a reference to one of these tokens. Pure `#FFFFFF` should no longer appear anywhere in the rendered site.

### 2.2 Typography

- **Headings (serif):** [Fraunces](https://fonts.google.com/specimen/Fraunces) via Google Fonts. Fraunces is chosen over Playfair Display because it's a contemporary variable serif with optical sizing — it stays elegant at large display sizes and warm/readable at smaller heading sizes, which suits a cream palette.
- **Body (sans-serif):** [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts — clean, modern, high readability at body sizes.

In the global stylesheet (or the Astro layout `<head>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

Then add to `:root`:

```css
:root {
  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

html { font-family: var(--font-body); color: var(--color-text); }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-display); }
```

### 2.3 Type scale (fluid, mobile-first)

```css
:root {
  --fs-h1:    clamp(2rem, 1.4rem + 2.5vw, 3rem);     /* 32 → 48px */
  --fs-h2:    clamp(1.5rem, 1.2rem + 1.5vw, 2rem);   /* 24 → 32px */
  --fs-h3:    clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);/* 20 → 24px */
  --fs-body:  1.0625rem;                              /* 17px */
  --fs-small: 0.9375rem;                              /* 15px */

  --lh-display: 1.2;
  --lh-body:    1.65;
}

h1 { font-size: var(--fs-h1); line-height: var(--lh-display); font-weight: 500; letter-spacing: -0.01em; }
h2 { font-size: var(--fs-h2); line-height: var(--lh-display); font-weight: 500; }
h3 { font-size: var(--fs-h3); line-height: var(--lh-display); font-weight: 500; }
p, li { font-size: var(--fs-body); line-height: var(--lh-body); }
small, .meta { font-size: var(--fs-small); color: var(--color-text-muted); }
strong { font-weight: 600; }
```

Notes:
- Fraunces at weight 500 is anchored without shouting — that's why headings are 500, not 700.
- The homepage "Sarah Bowles" `<h1>` should land at ~48px on desktop, not the current giant. The clamp above handles this — do not add page-specific overrides.

**Acceptance:**
- All colours sourced from tokens. A search for `#` in the codebase returns hex values only inside `:root`.
- Fonts loading from Google Fonts with `display=swap` and `preconnect` set up.
- All headings render in Fraunces; all body text renders in Inter (verify in DevTools).
- Homepage H1 fits comfortably above the fold on a 1440px desktop and a 375px mobile.
- WCAG AA contrast verified for: text on `--color-bg`, text on `--color-surface`, text on `--color-surface-tint`, accent on bg.

---

## Phase 3: Spacing & structural polish

**Objective:** Tighten the layout. The current site has voids of vertical whitespace that make sections feel disconnected. Bring everything into a deliberate rhythm.

### 3.1 Spacing scale

```css
:root {
  --space-xs:  0.5rem;   /*  8px */
  --space-sm:  1rem;     /* 16px */
  --space-md:  1.5rem;   /* 24px */
  --space-lg:  2.5rem;   /* 40px */
  --space-xl:  4rem;     /* 64px */
  --space-2xl: clamp(3.5rem, 5vw, 5.5rem); /* section padding */
}
```

### 3.2 Apply

- **Section vertical padding:** `padding-block: var(--space-2xl)` on top-level page sections. This is *significantly* less than the current site uses.
- **Heading → following paragraph:** `var(--space-md)` margin-top on the paragraph (or margin-bottom on the heading — pick one approach and use it everywhere).
- **Paragraph → paragraph:** `var(--space-sm)`.
- **Section → section:** rely on the section's own block padding; do not stack extra margins.
- **Card internal padding:** `var(--space-md)` minimum, `var(--space-lg)` on the homepage hero cards.
- **Prose max-width:** `max-width: 68ch` on prose containers. The current full-width paragraphs feel loose — constraining the measure tightens the page without changing copy.

### 3.3 Container

Use a single shared content container:

```css
.container {
  width: 100%;
  max-width: 72rem;     /* ~1152px */
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 2rem);
}
```

**Acceptance:**
- Scrolling any page, no section requires scrolling through visible empty space to reach the next block of content.
- The site reads as one rhythm — no page feels noticeably tighter or looser than another.
- 375px viewport: no horizontal scroll, no cramped text, no clipped padding.
- Prose lines on desktop are comfortably readable (60–75 characters wide).

---

## Phase 4: Component & aesthetic polish

**Objective:** Soften the existing "corporate tech" components and integrate them with the new palette.

### 4.1 Cards (homepage grid, related-work grid, any card)

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: transform 200ms ease,
              box-shadow 200ms ease,
              background-color 200ms ease;
  color: var(--color-text);
  text-decoration: none;
}

.card:hover,
.card:focus-visible {
  background: var(--color-surface-tint);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  outline: none;
}

.card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

Remove any existing harsh dark border, square corner, or hover-outline on cards. Card titles inside use `--font-display`; supporting text uses `--font-body`.

### 4.2 Blockquote (About page)

The current quote is sized close to an H1. Bring it down:

```css
blockquote {
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 1rem + 0.5vw, 1.375rem); /* well below H2 */
  font-style: italic;
  font-weight: 400;
  line-height: 1.45;
  color: var(--color-text);
  border-left: 3px solid var(--color-accent);
  padding-inline-start: var(--space-md);
  margin-block: var(--space-lg);
  max-width: 60ch;
}
```

### 4.3 Links (in prose)

```css
a {
  color: var(--color-accent-deep);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color 150ms ease;
}
a:hover { color: var(--color-text); }
a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

Navigation links use the same colour but no underline by default; underline on hover.

### 4.4 Botanical SVG (homepage)

- Recolour all strokes/fills to use `--color-accent` and `--color-accent-soft` only. No third colour.
- Reduce stroke weight by approximately 30% if currently bold — the graphic should read as a delicate accent, not a dominant graphic.
- Confirm it scales cleanly down to mobile (no clipping, not visually dominant on a 375px viewport).

### 4.5 Buttons (if present)

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.75rem 1.25rem;
  background: var(--color-accent);
  color: var(--color-bg);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--fs-body);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 150ms ease;
}
.button:hover { background: var(--color-accent-deep); }
.button:focus-visible {
  outline: 2px solid var(--color-accent-deep);
  outline-offset: 2px;
}
```

**Acceptance:**
- Cards: soft shadow, rounded corners, subtle lift on hover, no harsh outline.
- Blockquote: noticeably smaller than the existing oversized treatment, italic serif, elegant sage left rule.
- SVG: integrated into the palette, scaled to feel like accent rather than centrepiece.
- Keyboard focus is visible on every interactive element (sage ring, never absent).

---

## Design tokens — master reference

The full token block that should live in the global stylesheet:

```css
:root {
  /* Colour */
  --color-bg:           #F7F1E3;
  --color-surface:      #FBF7EC;
  --color-surface-tint: #EFE7D2;
  --color-text:         #2B2520;
  --color-text-muted:   #5C544A;
  --color-accent:       #6B8E83;
  --color-accent-deep:  #4F6E64;
  --color-accent-soft:  #DCE5E1;
  --color-border:       #E5DCC8;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(43, 37, 32, 0.05);
  --shadow-md: 0 2px 4px rgba(43, 37, 32, 0.04),
               0 8px 16px rgba(43, 37, 32, 0.06);

  /* Typography */
  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --fs-h1:    clamp(2rem, 1.4rem + 2.5vw, 3rem);
  --fs-h2:    clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
  --fs-h3:    clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);
  --fs-body:  1.0625rem;
  --fs-small: 0.9375rem;
  --lh-display: 1.2;
  --lh-body:    1.65;

  /* Spacing */
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  1.5rem;
  --space-lg:  2.5rem;
  --space-xl:  4rem;
  --space-2xl: clamp(3.5rem, 5vw, 5.5rem);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
}
```

---

## Working pattern for Claude Code

- Complete one phase. Stop. Summarise the diff and any decisions made. Wait for review before proceeding to the next phase.
- For each phase, list the files changed and one-line reason for each.
- Where reasonable, link a Vercel preview deployment so the change can be reviewed visually.
- If you find existing copy that seems awkward, untrue, or out of place: **leave it alone and flag it as a question for Sarah**. Do not edit it.
- If the codebase makes any of the above tokens unworkable (e.g. existing Tailwind config you'd need to fight), surface that before implementing a workaround — don't silently diverge from the spec.
