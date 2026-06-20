# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Design Context

See [PRODUCT.md](PRODUCT.md) for brand register, target users, personality, and design principles.
See [DESIGN.md](DESIGN.md) for the full visual system: tokens, typography, components, motion.

Summary: Landing inmersiva para HyB (Briones Hernández) — Transporte Escolar, Empresas y Turismo en Calbuco, Los Lagos. Narrativa de 3 actos con GSAP. Firma visual: SVG route line.

## Project Overview

Static landing page (single `index.html`) deployed on Netlify. No build step, no npm, no framework. Stack: HTML5 + CSS3 + Vanilla JS + GSAP 3.12.5 (CDN) + ScrollTrigger + ScrollToPlugin + Font Awesome (CDN) + Google Fonts.

Live URL: https://turismobrioneshernandez.netlify.app/

## Local Development

Open `index.html` directly in a browser. No server required.

For form submission testing, deploy to Netlify — `data-netlify="true"` forms only work on Netlify's infrastructure.

## Architecture

### Config-Driven Content

All personalizable content lives in `js/config.js` as a single `CONFIG` object.

**How it wires to HTML:**

1. `data-config="key"` → `main.js` sets `element.textContent = CONFIG[key]`
2. `data-config-href="key"` → `main.js` sets `element.href = CONFIG[key]`
3. `data-service-features="index"` → `main.js` generates `<li>` elements from `CONFIG.servicios[index].enfoque[]`
4. `data-service-cta="index"` → `main.js` sets WhatsApp link from `CONFIG.servicios[index].whatsappMsg`

**Array-driven sections** — `main.js` clears and rebuilds these containers:
- `CONFIG.diferenciadores[]` → `#diferenciadoresGrid`
- `CONFIG.testimonios[]` → `#testimoniosGrid`

**Script load order:** `config.js` → `gsap.min.js` → `ScrollTrigger.min.js` → `ScrollToPlugin.min.js` → `main.js` → `animations.js`

### 3-Act Narrative Structure

The page follows a journey metaphor:

1. **Act 1 (Embarcar):** Hero — cinematic gradient, GSAP timeline entry
2. **Act 2 (El Recorrido):** Servicios — ScrollTrigger pinned container (300vh), 3 panels crossfade on scrub
3. **Act 3 (El Destino):** Diferenciadores → Testimonios → Contacto

### Servicios Pinning (Desktop)

The `.servicios__pin-wrapper` is 300vh. The `.servicios__container` is `position: sticky; top: 0; height: 100vh`. Three `.servicios__panel` elements are stacked absolutely. GSAP ScrollTrigger pins the container and crossfades panels at 33%/66% progress. On mobile (≤768px), pinning is disabled and panels stack normally.

### SVG Route Line

A full-page SVG (`<svg class="route-line">`) draws a serpentine path as the user scrolls. The path is generated dynamically in `animations.js` based on section `offsetTop` values. Hidden on mobile and with `prefers-reduced-motion`.

## Key Files

| File | Role |
|------|------|
| `js/config.js` | All site content (texts, services, testimonials, contact) |
| `js/main.js` | Config injection, dynamic generation, navigation, form, mobile menu |
| `js/animations.js` | All GSAP: hero timeline, ScrollTrigger scenes, SVG route, pinning |
| `css/styles.css` | Design tokens + all component styles |
| `css/animations.css` | GSAP initial hidden states (opacity: 0, transforms) |
| `css/responsive.css` | All @media queries (480, 768, 1024, 1440px) + reduced-motion |

## CSS Variables (Theming)

Change these in `css/styles.css` `:root` to retheme:

```css
--color-bosque-deep: #1E3329;  /* Hero, footer, mobile menu */
--color-bosque: #2E4A3A;       /* Navbar solid */
--color-canal: #3D5A5B;        /* Primary accent */
--color-oxido: #C4572A;        /* CTAs */
--color-madera: #8B6F4E;       /* SVG route, warm details */
```

## Adding Content

- **Edit service text/features:** Modify the corresponding object in `CONFIG.servicios[]`
- **Add diferenciador:** Add object `{ numero, label, detalle }` to `CONFIG.diferenciadores[]`
- **Add testimonial:** Add object `{ texto, nombre, contexto }` to `CONFIG.testimonios[]`
- **Change contact info:** Edit `CONFIG.telefono`, `CONFIG.email`, etc.
- **Change WhatsApp:** Edit `CONFIG.whatsappNumero` and per-service `whatsappMsg`

## Deployment

Push to `main` branch → Netlify auto-deploys. No build command, publish directory is `.` (root).

## Images

Place in `img/` subdirectories. Currently using logo files only:
- `img/files/logo-blanco-web.png` — White logo (navbar over hero, footer)
- `img/files/logo-web.png` — Dark logo (navbar when solid)
- `img/brand/` — Favicon when available

The design is typography/animation-driven and does not depend on photography.

## SEO

`robots.txt` and `sitemap.xml` at root. Update `sitemap.xml` URLs if the domain changes.
