# Grind Burger Kitchen — website

A ground-up rebuild of [grindburgerkitchen.com](https://www.grindburgerkitchen.com) (formerly Wix) as a fast, static, SEO-complete Next.js site.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out (deploy anywhere: Netlify, Cloudflare Pages, S3…)
npm run images       # regenerate /public/img from /source-assets (sharp)
npm run sync:beer    # pull the live TapHunter list → src/data/beer.json, then rebuild
```

## Creative direction — "The Grinder Plate"

The Grind logo is a meat-grinder die. That plate is the whole idea: on the homepage the real
food photo is only visible *through the plate's holes*; scrolling turns the plate and pushes
through the centre bore into the full photo. Holes recur as dotted rules (lifted from the
printed menu), the favicon, the 404 and the typographic burger cards.

Palette comes from the printed menu, not a luxury template: butcher-paper cream `#F1EADF`,
ink `#141110`, char `#0F0D0C` and Grind red `#A3182F`.

| Role | Font | Why |
|---|---|---|
| Display | Alfa Slab One | Echoes the heavy slab "Grind" wordmark |
| Text / UI | Archivo (variable width + weight) | One file covers body text and condensed labels |
| Voice | Instrument Serif Italic | The human, editorial aside |

Motion: one GSAP ScrollTrigger timeline (home hero only, loaded on demand). Everything else
is CSS + a single IntersectionObserver. `prefers-reduced-motion` disables pinning, reveals
and the marquee.

## Architecture

- `src/data/` — **the single source of truth** for every fact: `site.ts` (address, hours, links),
  `menu.ts` (transcribed from the Nov-2024 printed menu), `story.ts`, `faq.ts`, `beer.json`.
  Each file names its source; anything inferred is marked `// CONFIRM`.
- URLs match the old Wix slugs (`/food-menu/`, `/beer-menu/`, `/order-online/`, `/about-us/`,
  `/contact/`, `/faq/`, `/jobs/`), so search rankings and existing links carry over.
  `public/_redirects` and `public/_headers` are for Netlify / Cloudflare Pages.
- SEO: unique titles/descriptions, canonical URLs, Open Graph/Twitter, `Restaurant` JSON-LD
  (hours, geo, order and reserve actions), `Menu` with prices, `FAQPage`, breadcrumbs,
  `sitemap.xml`, `robots.txt`, and a native, indexable menu (no PDF or image).
- Ordering stays on **Toast** (`order.toasttab.com/online/grind-burger-kitchen`), reservations
  on **OpenTable** (rid 1246489, from the original widget) and gift cards on **SwipeIt**.
  Nothing in the ordering infrastructure was rebuilt.

## QA (run Nov 2026)

All 8 pages were checked at desktop (1440) and iPhone 13 sizes. No console errors, no horizontal
overflow, no broken images, no images missing `alt`. Every internal link resolves.

Interaction tests passed: menu search and empty state; category rail and scroll-spy; beer tabs
with arrow keys; FAQ disclosure; jobs-form validation, focus management and the composed email;
mobile drawer (open, Escape, close on navigate); skip link; reduced motion.

Throttled mobile (4× CPU): LCP is about 1.9 s on the home page and 2.3 s on the menu. CLS is 0.

## Needs the client

**Assets**
1. **Video.** The original site has no footage. The hero is built so a short, muted loop
   (grill, smash, cheese melt) can go behind the plate in place of the still.
2. **Photography for four of the six signature burgers** (B&B, Grind, Shroom & Cheddar,
   Veggie). Until it exists they use typographic cards; no stock or AI photos were added.
3. **A higher-resolution Southern photo.** The original is only 640 px.
4. **Interior, bar, patio, team and food-truck photos.** Only one people photo exists (the
   owners).
5. **A vector logo (SVG).** The wordmark is keyed from the 2875 px JPG. The grinder-plate mark
   was redrawn as geometry.

**Facts to confirm**
6. **Monday hours.** The published hours leave Monday out, and the site shows it as closed.
7. **Founding year.** The logo says "Est 2011"; the story says the truck started in spring
   2012. The site uses the story's dates.
8. **Press links.** The 2014–2015 URLs on the old site couldn't be verified: LEO Weekly
   returns 404, tasteofinnovation.com is now a parked domain, and the others block automated
   checks. Press appears as text only; the old URLs are kept in `story.ts` as `source`.
9. **Jobs form.** The Wix form backend doesn't move with the site. Applications now open as a
   pre-filled email to JoinOurTeam@UffdaHospitality.com. Connect a form service (for example
   Netlify Forms) if they'd rather receive submissions.
10. **Beer list.** It's a snapshot that TapHunter last updated on October 31. Run
    `npm run sync:beer` and rebuild, or schedule it.
11. **`priceRange`** in the structured data is set to `$$`.
