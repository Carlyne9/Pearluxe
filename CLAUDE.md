# Pearluxe Bagshop

E-commerce site for **Pearluxe**, a bag brand (bags first; shoes and accessories later).

## Read before working
- [docs/brief.md](docs/brief.md): what we're building and for whom
- [docs/references.md](docs/references.md): inspiration sites and what we take from each
- [docs/design-system.md](docs/design-system.md): tokens and components (source of truth for styling)
- [docs/social-content.md](docs/social-content.md): plan for bringing in Instagram/TikTok content

## Stack
[Astro](https://astro.build). Static-first, with islands only where interaction is needed (cart, filters, gallery).

Run: `npm install` then `npm run dev` (the `--host` flag lets you open it on a phone/iPad on the same Wi-Fi). The dev server runs in the background; stop it with `node node_modules/astro/bin/astro.mjs dev stop`.

The parent folder `:Developments` contains a colon, which breaks `PATH`, so bare `astro` / `npx` commands fail. Scripts call `node node_modules/astro/bin/astro.mjs` directly; do the same for any new CLI tool.

Payments: Paystack (card + mobile money), prices in GH₵.

## Current phase
1. ~~Project docs~~ (done)
2. ~~Collect reference sites~~ (done; see `docs/references.md`)
3. ~~Design tokens~~ (v0 approved, purple palette; `src/styles/tokens.css`)
4. Built: `/` home (hero + new arrivals), `/bags`, `/bags/<name>`, `/styleguide` (internal). **Next: header + cart.**

## Rules
- Three layouts are first-class: **mobile, tablet (iPad), desktop**. Build mobile-first and check every component at all three breakpoints in `docs/design-system.md`.
- Many shoppers use iPads: no feature may depend on hover.
- Never hard-code a color, font, or spacing value; use a token from `docs/design-system.md`.
- **The homepage hero is always the client's video with the copy overlaid on it. Never replace it with a still image.** Videos live in `public/videos/` (portrait 9:16 + `.jpg` poster). Keep them fast to load, muted, with a pause button.
- Before building, check `public/` and `assets/` for files the user has added.
- Brand assets live in `assets/brand/`.
