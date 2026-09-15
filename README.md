# Portfolio

Priyanka Vijaybaskar's personal site. Built with [Astro 4](https://astro.build), Tailwind CSS, and TypeScript. Fully static, deployed to GitHub Pages at the root domain (`prinks-wiz.github.io`).

Throughline: vision for physical AI. Spacecraft work is the proving ground, not the identity — the site is written for a computer vision / perception hiring manager at a physical-AI company.

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # serve the production build locally
```

---

## Adding content

Everything in `src/content/` is a Markdown collection. Drop a file in the right folder and it's picked up automatically — no code changes needed. Schemas are enforced in `src/content/config.ts`; a file with a missing or malformed field fails the build with a clear error rather than shipping broken data.

### Add a project

Create `src/content/projects/your-project-slug.md`. The URL slug comes from the filename.

```markdown
---
title: "Your Project Title"
summary: "One-sentence summary, shown as a fallback. Under 200 characters."
date: 2026-01-01
techStack: ["PyTorch", "ROS 2"]
featured: false                 # true bubbles it to the top of /projects
stat: "One-line impact metric — the number a recruiter should remember"
tags: ["VISION", "GENERALIZATION"]   # see the closed taxonomy below
cardDescription: "Longer recruiter-facing copy shown on the card. Optional — falls back to summary."
links:
  github: "https://github.com/you/your-project"   # optional; card only shows the icon if present
  demo:   "https://your-demo.example.com"          # optional
  blog:   "/writing/your-post-slug"                # optional
---

Full write-up in Markdown. Rendered on the project's detail page.
```

`tags` must come from the shared taxonomy in `content/config.ts` — it's a closed enum on purpose, so every card reads consistently:

```
VISION · GENERALIZATION · EDGE DEPLOYMENT · STATE ESTIMATION · EVALUATION · MULTIMODAL · INFRASTRUCTURE
```

Adding a new tag means editing the enum in `src/content/config.ts` — don't invent one-off tags on a single project.

### Add a work entry

Create `src/content/work/company-name.md`:

```markdown
---
org: "Company Name"
role: "Your Role"
startDate: 2023-01-01
# endDate: 2024-06-01   # omit, or set null, for a current role
description: "One-to-two sentence summary of the role, shown on the card."
techStack: ["Python", "C++"]
location: "City, State"
---

Optional longer body — currently unused by the /work template but available
if the page grows a detail view later.
```

Entries on `/work` sort newest-first by `startDate`.

### Add a writing post

Create `src/content/writing/your-post-slug.md`:

```markdown
---
title: "Your Post Title"
date: 2026-01-01
summary: "One line, shown in the index list."
category: tech   # or "personal"
tags: ["robotics", "ml"]   # optional; not currently rendered on the index
---

Post body in Markdown.
```

The writing index (`/writing`) is intentionally minimal per the site's design spec: title, date, one-line summary, nothing else. Keep `summary` to a single sentence.

---

## Design system

- **Color tokens** are CSS custom properties in `src/styles/global.css` (`--bg`, `--text-primary`, `--accent`, etc.), mapped to Tailwind utilities in `tailwind.config.mjs` (`bg-surface`, `text-content`, `text-accent`, …). Dark mode redeclares the same variable names under `.dark` — components never need `dark:` variants.
- **Dark mode** is cookie-based, not `localStorage`: `ThemeToggle.astro` writes a `theme=dark|light` cookie, and an inline script in `BaseLayout`'s `<head>` reads it before first paint to avoid a flash. Absent an explicit cookie, the site follows `prefers-color-scheme` live (see the `matchMedia` listener in `ThemeToggle.astro`).
- **Fonts**: Inter for prose, JetBrains Mono for labels/metadata/nav/ticker/coordinates, loaded from Google Fonts in `BaseLayout.astro`.
- **The orbit animation** (`OrbitalAnimation.astro`) is the site's only visual motif — three independent Keplerian ellipses on a `<canvas>`, each with true anomaly-based speed variation (fast at periapsis, slow at apoapsis). It pauses via `IntersectionObserver` when scrolled off-screen, redraws its colors on theme change (canvas can't read CSS custom properties directly, so colors are resolved once via `getComputedStyle` and cached), and renders a single static frame under `prefers-reduced-motion`.
- **Coordinates widget** (`CoordinateDisplay.astro`) is static text, not geolocated — it's a fixed piece of page furniture, not a feature.

---

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `npm run build` and publishes `dist/` to GitHub Pages via `actions/deploy-pages`. No manual steps beyond merging to `main`; the repo's Pages source must be set to "GitHub Actions" once (Settings → Pages → Source).

`astro.config.mjs` is already configured for the root-domain repo (`site: 'https://prinks-wiz.github.io'`, `base: '/'`). If this ever moves to a project-page repo (`username.github.io/repo-name`), update `base` to `/repo-name`.

---

## Before going live (checklist)

- [ ] Confirm `public/resume.pdf` is current
- [ ] Confirm GitHub / LinkedIn / email links in `Header.astro`, `Footer.astro`, `about.astro`, `contact.astro` are correct
- [ ] Confirm the Pages source is set to "GitHub Actions" in repo settings
