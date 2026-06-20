# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Design Context

See [PRODUCT.md](PRODUCT.md) for brand register, target users, personality, and design principles.
See [DESIGN.md](DESIGN.md) for the full visual system: tokens, typography, components, motion.

Summary: landing page de marca para empresa familiar de turismo en Calbuco, Los Lagos. Personalidad: familiar, confiable, acogedor. Anti-referencias: genérico, corporativo, recargado.

## Project Overview

Static tourism landing page (single `index.html`) deployed on Netlify. No build step, no npm, no framework. Stack: HTML5 + CSS3 + Vanilla JS + AOS (CDN) + Font Awesome (CDN).

Live URL: https://turismobrioneshernandez.netlify.app/

## Local Development

Open `index.html` directly in a browser. No server required.

For form submission testing, deploy to Netlify — `data-netlify="true"` forms only work on Netlify's infrastructure, not locally.

## Architecture: Config-Driven Content

All personalizable content lives in `js/config.js` as a single `CONFIG` object. Changing this file updates the entire site — no HTML edits needed for content.

**How it wires to HTML:**

1. `data-config="key"` → `main.js` sets `element.textContent = CONFIG[key]`
2. `data-config-href="key"` → `main.js` sets `element.href = CONFIG[key]`
3. `data-config-target="key"` → `main.js` sets `element.dataset.target = CONFIG[key]` (animated counters)

**Array-driven sections** — `main.js` clears and rebuilds these containers from CONFIG arrays:
- `CONFIG.destinos[]` → `.destinos__grid`
- `CONFIG.experiencias[]` → `.experiencias__grid`
- `CONFIG.testimonios[]` → `.testimonios__slider`
- `CONFIG.nosotros.diferenciadores[]` → `.nosotros__checklist`

**Script load order matters:** `config.js` loads before `main.js` in `index.html`, so `CONFIG` is global when `main.js` runs.

## Key Files

| File | Role |
|------|------|
| `js/config.js` | Single source of truth for all site content |
| `js/main.js` | DOM injection, dynamic section generation, all interactive features |
| `css/styles.css` | All styles + responsive (breakpoints: 768px, 1024px) |
| `css/animations.css` | Custom keyframes (pulse, fadeInUp, bounceDown, etc.) |

## CSS Variables (Theming)

Defined in `css/styles.css` `:root`. Change these to retheme the entire site:

```css
--color-primary: #0077B6;    /* Main blue */
--color-accent: #FF6B35;     /* CTAs / orange */
--color-dark: #1A1A2E;       /* Navbar, dark backgrounds */
```

## main.js Feature Map

| Lines | Feature |
|-------|---------|
| 9–45 | CONFIG → DOM attribute injection |
| 48–150 | Dynamic HTML generation from CONFIG arrays |
| 160–165 | Loading screen (500ms hide) |
| 168–173 | AOS init |
| 176–196 | Navbar scroll effect |
| 199–221 | Mobile hamburger menu |
| 224–245 | Scroll spy (active nav link) |
| 248–285 | Animated counters (IntersectionObserver) |
| 288–325 | Gallery lightbox |
| 328–375 | Testimonios slider (auto-play 5s) |
| 378–432 | Contact form validation + Netlify POST |

## Adding Content

- **New destination/experience/testimony:** Add object to the corresponding array in `CONFIG` — `main.js` regenerates the section automatically.
- **New static text field:** Add `data-config="newKey"` to HTML element and `newKey: "value"` to `CONFIG`.
- **New link:** Use `data-config-href="newKey"` in HTML and add the URL to `CONFIG`.

## Deployment

Push to `main` branch → Netlify auto-deploys. No build command, publish directory is `.` (root).

Form submissions appear in Netlify Dashboard → Forms. Configure email notifications there.

## Images

Place in `img/` subdirectories by section:
- `img/hero/` — Hero background
- `img/destinos/` — Destination cards
- `img/nosotros/` — About section
- `img/galeria/` — Gallery grid
- `img/brand/` — Logo, favicon

Reference images in `css/styles.css` background-image properties, not in HTML.

## SEO

`robots.txt` and `sitemap.xml` are present at root. Update `sitemap.xml` URLs if the domain changes.
