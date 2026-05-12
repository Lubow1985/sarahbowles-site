# sarahbowles.co.uk

Personal website for Dr Sarah Bowles, Trainee Clinical Psychologist.

Built with Astro 5, Tailwind CSS v4, deployed to Vercel.

## Dev commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Structure

- `src/pages/` — one file per route
- `src/layouts/` — BaseLayout (main site) and ResearchLayout (research project page)
- `src/components/` — reusable components
- `src/styles/global.css` — design tokens and base styles
- `public/` — static assets (images, favicon)
