# Design

> Sistema visual para HyB — Transporte Escolar, Empresas y Turismo. Empresa familiar en Calbuco, Los Lagos.
> Paleta territorial, tipografía con carácter, experiencia narrativa de 3 actos con GSAP.

---

## Design Direction

**Design Read:** Landing inmersiva de empresa familiar multi-servicio. Narrativa de viaje: embarcar → recorrer → llegar. GSAP-driven motion con firma visual SVG.

**Dials:**
- `DESIGN_VARIANCE: 9` — Narrativa de 3 actos, servicios pinned, SVG route line
- `MOTION_INTENSITY: 7` — GSAP timelines orquestadas, ScrollTrigger scrub, parallax
- `VISUAL_DENSITY: 3` — Respira, tipografía y composición sobre fotografía

**Narrativa:** "Cada viaje empieza con confianza" — el scroll es un recorrido, cada sección es un tramo.

---

## Color

### Palette

Extraída del territorio real de Calbuco: agua del canal, madera de muelles, bosque valdiviano, niebla costera, óxido de caleta.

| Token | Name | Value | Usage |
|-------|------|-------|-------|
| `--color-canal` | Canal | `#3D5A5B` | Color principal — textos destacados, bordes activos, iconos |
| `--color-madera` | Madera de muelle | `#8B6F4E` | Acento cálido — SVG route line, detalles, labels |
| `--color-bosque` | Bosque siempreverde | `#2E4A3A` | Navbar sólido, hero gradient medio |
| `--color-bosque-deep` | Bosque profundo | `#1E3329` | Hero gradient base, footer, mobile menu |
| `--color-niebla` | Niebla costera | `#E8E5E0` | Fondo base de página, secciones alternas |
| `--color-espuma` | Espuma | `#F5F3F0` | Fondo de paneles de servicio, secciones alternas |
| `--color-oxido` | Óxido de caleta | `#C4572A` | CTA único — botones de acción, números destacados |
| `--color-text` | Tinta | `#1E2B2B` | Texto body principal |
| `--color-text-soft` | Tinta suave | `#5C6B6B` | Texto secundario, descripciones |

### Usage Rules

- **Un solo color de acción:** `--color-oxido` es el ÚNICO color que dice "haz clic aquí".
- **Hero gradient:** `linear-gradient(145deg, bosque-deep 0%, bosque 45%, canal 100%)`
- **Sombras tintadas:** `rgba(45, 74, 58, opacity)` — nunca negro puro.

---

## Typography

### Fonts

| Token | Font | Weight(s) | Role |
|-------|------|-----------|------|
| `--font-display` | `DM Serif Display` | 400 | H1, H2, testimonios |
| `--font-body` | `Outfit` | 300, 400, 500, 600 | Body, UI, navegación, botones |
| `--font-mono` | `JetBrains Mono` | 400 | Labels, números, progress counter |

### Type Scale

| Element | Size | Font | Extra |
|---------|------|------|-------|
| H1 (hero) | `clamp(2.5rem, 6vw, 4.5rem)` | Display | `letter-spacing: -0.02em; line-height: 1.08` |
| H2 (sección) | `clamp(1.8rem, 4vw, 2.8rem)` | Display | `line-height: 1.2` |
| Body | `1rem` | Body | `line-height: 1.75; max-width: 65ch` |
| Label | `0.7-0.75rem` | Mono | `letter-spacing: 0.08em; text-transform: uppercase` |

---

## Spacing & Layout

### Container
```css
--container-max: 1200px; /* 1360px en 1440px+ */
--container-padding: clamp(1.5rem, 4vw, 3rem);
```

### Breakpoints

| Name | Value |
|------|-------|
| Small mobile | `max-width: 480px` |
| Mobile | `max-width: 768px` |
| Tablet | `max-width: 1024px` |
| Large desktop | `min-width: 1440px` |

---

## Section Architecture (3 Actos)

1. **Hero (Acto 1: Embarcar)** — 100dvh, gradient cinematográfico, timeline GSAP orquestada
2. **Servicios (Acto 2: El Recorrido)** — ScrollTrigger pinned, 3 paneles con crossfade (300vh wrapper)
3. **Diferenciadores (Acto 3: El Destino)** — Números grandes + texto, grid asimétrico
4. **Testimonios** — Blockquotes editoriales, reveal individual
5. **Contacto** — Formulario Netlify + info + mapa, entrada secuencial
6. **Footer** — bosque-deep, cierre de experiencia

---

## Firma Visual — SVG Route Line

Path SVG serpentino que recorre toda la altura de la página, dibujándose con `stroke-dashoffset` via ScrollTrigger scrub.

### Rules
- `pointer-events: none`, `z-index: 1`
- Stroke: `--color-madera`, opacity 0.2, width 1.5
- 5 station dots en puntos de transición entre secciones
- Path generado dinámicamente en JS basado en `offsetTop` de secciones
- Oculto en mobile (`display: none` bajo 768px)
- Oculto con `prefers-reduced-motion`

---

## Motion

### Philosophy

GSAP controla toda la motion. CSS solo maneja hover states simples. Cada animación tiene propósito: guiar atención, revelar información en orden, crear continuidad.

### Easing
- Entradas: `power3.out`
- Transiciones: `power2.inOut`
- Hover: `power2.out`
- Bounce sutil: `back.out(1.5)`
- Magnetic snap-back: `elastic.out(1, 0.4)`

### Key Animations
- **Hero timeline:** label → título → subtítulo → CTAs → scroll indicator (~2s)
- **Servicios pin:** crossfade entre paneles con scrub
- **SVG route:** stroke-dashoffset scrub 0→0
- **Diferenciadores:** stagger 0.15s
- **WhatsApp:** delayed entry 2.5s + subtle pulse
- **Mobile menu:** timeline pausada, play/reverse

### Reduced Motion
- JS: `gsap.set()` todo visible, return early
- CSS: `animation-duration: 0.01ms !important`
- SVG route line: hidden
