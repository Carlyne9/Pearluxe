# Design system

Status: **v0 approved 2026-10-12.** Palette switched to the purple range. Code lives in `src/styles/tokens.css`. Change both together.

## Direction
Polène's calm restraint + Winnie & Co's shopping patterns + video as the hero. Soft near-white backgrounds, near-black text, plum / violet / lavender as the brand color (inspired by The Bag Shop GH's plum `#9E1E65`, shifted more violet so it's ours).

## Breakpoints (mobile-first)
| Token | Min width | Targets | Product grid |
|-------|-----------|---------|--------------|
| base | 0 | Tiny screens (Galaxy Fold front, <300px) | 1 column |
| phone | 300px | Phones | 2 columns |
| `--bp-tablet` | 768px | iPad portrait (768–834), iPad landscape (1024–1194) | 3 columns |
| `--bp-desktop` | 1280px | Laptops, desktops, iPad Pro 12.9" landscape (1366) | 4 columns |
| `--bp-wide` | 1600px | Large screens | 4 columns, max width caps |

Rules:
- Hover effects (second image, underline) only inside `@media (hover: hover)`. iPads and phones get swipe / tap instead.
- Tap targets ≥ 44×44px on all sizes.
- Test sizes: 280, 320, 375, 390, 768, 820, 1024, 1180, 1366, 1440.
- Product cards adapt to their own width (container query): under 170px wide, buttons say "Add" / "Sold out" and badges shrink.

## Tokens
### Color
| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#FAF8FB` | Page background (near-white, lavender hint) |
| `--color-surface` | `#FFFFFF` | Cards, drawers |
| `--color-ink` | `#1C1622` | Text (purple-black) |
| `--color-ink-muted` | `#6D6475` | Secondary text, edition line |
| `--color-line` | `#E7E1EC` | Borders, dividers |
| `--color-plum` | `#8A2A6E` | Lighter plum accent |
| `--color-plum-dark` | `#6E1F57` | **Brand primary** (chosen 2026-10-12) |
| `--color-primary` | `var(--color-plum-dark)` | Use this in components: buttons, sale price, links, badges, logo |
| `--color-primary-hover` | `#561845` | Button hover / pressed |
| `--color-violet` | `#5E3B8C` | Secondary accent, focus ring |
| `--color-lavender` | `#C9B6E4` | Highlights, selected swatch ring |
| `--color-lavender-soft` | `#F1EBF8` | Announcement bar, image placeholders, soft fills |
| `--color-on-dark` | `#FFFFFF` | Text on plum / over video |

### Typography
| Token | Value | Use |
|-------|-------|-----|
| `--font-display` | "Geist", sans-serif | Headings, hero |
| `--font-ui` | "Geist", sans-serif | Body, nav, buttons, prices (Google Fonts, same on every device) |
| `--tracking-caps` | `0.2em` | Uppercase labels (matches "PEARLUXE" wordmark) |

Scale (fluid with `clamp()`, mobile → desktop):
| Token | Size |
|-------|------|
| `--text-xs` | 12px |
| `--text-sm` | 14px |
| `--text-base` | 16px |
| `--text-lg` | 18 → 20px |
| `--text-xl` | 24 → 32px |
| `--text-2xl` | 32 → 48px |
| `--text-hero` | 40 → 80px |

### Spacing
4px base: `--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--space-6` 24 · `--space-8` 32 · `--space-12` 48 · `--space-16` 64 · `--space-24` 96

Page gutter: 16px mobile · 32px tablet · 48px desktop. Max content width: 1440px.

### Shape, motion
- Radius: `--radius-md: 8px` on buttons, badges and product images; `2px` on inputs
- Image ratio: `4 / 5` portrait for product cards; `9 / 16` for social video tiles
- Motion: `200ms ease-out` for UI; image swap `400ms`. Respect `prefers-reduced-motion` (no autoplay video, no transitions).

## Components
| Component | Notes |
|-----------|-------|
| Announcement bar | Blush background, one line, xs caps |
| Header / nav | Logo centered; menu drawer on mobile + tablet, inline nav + mega menu on desktop; search, cart with count |
| Video hero | Muted autoplay loop, poster image first, pause button; paused under reduced motion. Client videos are portrait (9:16), so: full-screen video with copy on top on mobile, headline left / video right on tablet + desktop. **Built:** `src/components/VideoHero.astro` (videos: `public/videos/`, originals: `assets/Videos/Raw/`) |
| Homepage hero (`src/pages/index.astro`) | Headline "Carry with elegance." Plays the client clips **one at a time in sequence** (600ms fade), then starts over. Phones/iPad portrait: clip fills the screen. ≥1024px: sharp clip at 44% width (starts at 40%), blurred + darkened copy of the same clip fills the sides, copy on the left 40%. Reduced-motion users see the first poster. Copy + CTAs overlaid at the bottom. |
| Category tiles | Portrait image + caps label; horizontal scroll on mobile, grid on tablet+ |
| Product card | 4:5 image, second image on hover (desktop) / swipe (touch); name, edition line, price `GH₵ 1,250` (sale: plum price + struck-through old price); color swatches; optional "New" badge. **Built:** `src/components/ProductCard.astro` (swatches + swipe still todo) |
| Product page | Gallery left / details right on tablet+, stacked on mobile; color swatches, quantity stepper, Add to cart + wishlist heart, description (from The Bag Shop GH) |
| Filter panel | Bottom sheet on mobile, slide-in drawer on tablet, sidebar on desktop; live result count |
| Product gallery | Swipe carousel on mobile; thumbnails + main image on tablet+; includes video |
| Social video strip | 9:16 tiles, horizontal scroll, plays on view (muted) |
| Cart drawer | Full screen on mobile, side drawer on tablet+; delivery progress message |
| Badge | `.badge` (New: white + plum dark text), `.badge--sale` ("30% off", auto-calculated from old price), `.badge--muted` ("Out of stock", image dimmed). 8px radius, tight 0.02em tracking. **Built:** `src/styles/global.css` |
| Button | Primary (`--color-primary` fill, caps, 8px radius), secondary (outline), text link. **Built:** `.btn` in `src/styles/global.css` |
| Footer | Newsletter, links, WhatsApp, Instagram, TikTok, payment icons |

## Logo
Traced to vector from `assets/brand/logo-reference.jpg` (source is low-res, so edges are slightly soft; replace with the designer's original vector file if the client has one).

- **Site use:** `src/components/Logo.astro`, `variant="logo" | "monogram" | "wordmark"`. Takes its color from CSS `color`, so any token works.
- **Files** (`assets/brand/logo/`): `pearluxe-{logo|monogram|wordmark}-{black|grey|white|plum|plum-dark|violet}.svg` (18 files)
- **Primary brand color:** plum dark `#6E1F57` → use `pearluxe-*-plum-dark.svg` files

## Shop pages (built 2026-10-12)
- **`/bags`**: all bags, with tabs **All / New / Sale / Favourites**. Favourites are saved in the shopper's browser.
- **Product card:** swipe through photos (arrows appear on hover with a mouse), color swatches (out-of-stock colors are struck through and can't be picked; tapping a color switches the photos), bold price, heart, **Add to cart** (adds 1 in the selected color).
- **`/bags/<name>`**: photo gallery per color, color, size (if any), quantity 1–10, Add to cart, heart, description, dimensions.
- Data: `src/data/products.ts` (sample bags + generated placeholder photos until real ones arrive).
- Cart + favourites: `src/lib/store.ts` (browser-only for now; moves server-side with Paystack checkout).

## Header, cart pop-up, cart (built 2026-10-12)
- **Header** (`src/components/Header.astro`, in every page via `Base.astro`): logo, Shop / New in / Sale (New in + Sale from 768px), favourites heart, cart bag icon with plum-dark item count. Homepage: transparent over the video, turns solid on scroll.
- **Cart pop-up** (`src/components/CartToast.astro`): after Add to cart, shows "<bag> (<color>) added to cart" with **Continue shopping** / **Checkout**. Bottom of screen on phones, bottom-right on tablet/desktop; closes after 6s.
- **`/cart`**: bare list + subtotal for now. Next: full cart UI, then checkout (Paystack + mobile money).
- **Cart** (`/cart`, rebuilt): rows with photo, color dot, size, unit + sale price, quantity stepper (1–10), line total, Save for later (→ favourites), Remove. Order summary card (sticky on desktop) with reassurance box; sticky Total + Checkout bar on phones; empty state.
- **Checkout** (`/checkout`): one page, logo-only header. Contact (name, +233 phone, email, WhatsApp updates) → Delivery (Delivery/Pickup switch; region, city, landmark, GhanaPost GPS; zone list with fees, outside Greater Accra = bus station only) → Payment (Paystack: card + mobile money). Order summary with photo + quantity badges; folds up at the top on phones. Zones/fees: `src/data/delivery.ts` (placeholders). Paystack not connected yet.
- **Bag page video**: a color can have `video: { src, poster }` (`public/products/<slug>/video.mp4` + `video-poster.jpg`). It plays muted on loop as the first slide; photos follow. Pauses when swiped away, resumes on return; paused for reduced-motion users. Product cards in grids show photos only.
