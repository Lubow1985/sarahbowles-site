# Placeholders

Items that need real content before the site goes live. All are rendered with a yellow dashed highlight in the preview build.

---

## Home page (`src/pages/index.astro`)

| Placeholder | What's needed | Notes |
|---|---|---|
| Hero bio | 2–3 sentences summarising Sarah's research focus and background | Shown directly below her role/affiliation |
| CTA button text | The label for the second hero button | Likely "Take part in the research" — Sarah to confirm |
| Headshot photo | A professional photo of Sarah (square crop works best, min 400×400px) | Used as circular portrait in the hero |

---

## Team page (`src/pages/team.astro`)

| Placeholder | What's needed | Notes |
|---|---|---|
| Sarah headshot | Same photo as home page | Used at 120×120px |
| Anne Cooke photo | Professional photo of Dr Anne Cooke | Used at 120×120px; source from university page or ask directly |
| Gerald Jordan photo | Professional photo of Dr Gerald Jordan | Used at 120×120px; source from university page or ask directly |

---

## CV page (`src/pages/cv.astro`)

| Placeholder | What's needed | Notes |
|---|---|---|
| CV image | A screenshot or scan of Sarah's CV | Could also be a link to a PDF — Sarah to decide |

---

## When a placeholder is filled

1. Replace the `placeholder-headshot.svg` reference (or placeholder div) with the real image path.
2. Remove the `class="placeholder"` or `class="placeholder-link"` attribute from the relevant element.
3. Update this file to remove the resolved row.
4. Once ALL placeholders are resolved, remove the placeholder CSS block from `src/styles/global.css` (marked with `TODO: remove when placeholders resolved`).
