# Design

> Sistema visual para Turismo Briones Hernández — empresa familiar multi-servicio (turismo, transporte escolar, empresas, taxi) en Calbuco, Los Lagos.
> Paleta territorial, tipografía con carácter, layout editorial-modular.
> TODO: Secciones de servicios serán expandidas cuando llegue la info completa del cliente.

---

## Design Direction

**Design Read:** Landing de empresa familiar multi-servicio para audiencia local + turistas, con un lenguaje editorial-territorial, leaning toward vanilla CSS + Google Fonts + animación SVG mínima.

**Dials:**
- `DESIGN_VARIANCE: 8` — Asimétrico, no plantilla
- `MOTION_INTENSITY: 4` — Un momento orquestado, el resto estático
- `VISUAL_DENSITY: 3` — Respira, no es catálogo

**Narrativa:** "Tu familia local que conoce cada camino" — no corporativo, no template de agencia.

---

## Color

### Palette

Extraída del territorio real de Calbuco: agua del canal, madera de muelles, bosque valdiviano, niebla costera, óxido de caleta.

| Token | Name | Value | Usage |
|-------|------|-------|-------|
| `--color-canal` | Canal | `#3D5A5B` | Color principal — textos destacados, bordes activos, iconos |
| `--color-madera` | Madera de muelle | `#8B6F4E` | Acento cálido — detalles, hovers, elementos secundarios |
| `--color-bosque` | Bosque siempreverde | `#2E4A3A` | Fondos oscuros — navbar, footer, hero overlay |
| `--color-niebla` | Niebla costera | `#E8E5E0` | Fondo base de página |
| `--color-espuma` | Espuma | `#F5F3F0` | Fondo de cards, secciones alternas |
| `--color-oxido` | Óxido de caleta | `#C4572A` | CTA único — botones de acción, WhatsApp hover |
| `--color-text` | Tinta | `#1E2B2B` | Texto body principal (tinted dark, no pure black) |
| `--color-text-soft` | Tinta suave | `#5C6B6B` | Texto secundario, descripciones |

### Usage Rules

- **Un solo color de acción:** `--color-oxido` es el ÚNICO color que dice "haz clic aquí". No hay segundo acento.
- **Sin mezcla warm/cool:** La paleta es uniformemente cool-tinted. Los grays heredan el tono verde-azulado del canal.
- **Overlays sobre fotos:** `linear-gradient(to top, var(--color-bosque) 0%, transparent 60%)` — gradiente desde abajo para texto legible sin cubrir la imagen.
- **Sombras tintadas:** Las sombras usan `rgba(45, 74, 58, 0.12)` (bosque con opacidad), no negro puro.

---

## Typography

### Fonts

| Token | Font | Weight(s) | Source | Role |
|-------|------|-----------|--------|------|
| `--font-display` | `DM Serif Display` | 400 | Google Fonts | Titulares H1, H2, citas grandes |
| `--font-body` | `Outfit` | 300, 400, 500, 600 | Google Fonts | Body, UI, navegación, botones |
| `--font-mono` | `JetBrains Mono` | 400 | Google Fonts | Datos: precios, coordenadas, distancias, horarios |

### Type Scale

| Element | Size | Weight | Font | Extra |
|---------|------|--------|------|-------|
| H1 (hero) | `clamp(2.5rem, 6vw, 4rem)` | 400 | Display | `letter-spacing: -0.02em; line-height: 1.1` |
| H2 (sección) | `clamp(1.8rem, 4vw, 2.8rem)` | 400 | Display | `line-height: 1.2` |
| H3 (card/servicio) | `1.25rem` | 400 | Display | `line-height: 1.3` |
| Body | `1rem` | 400 | Body | `line-height: 1.75; max-width: 65ch` |
| Body small | `0.875rem` | 400 | Body | `line-height: 1.6` |
| Label/utility | `0.75rem` | 500 | Body | `letter-spacing: 0.05em; text-transform: uppercase` |
| Data | `0.85rem` | 400 | Mono | `letter-spacing: 0.02em` |

### Typography Rules

- Headlines DM Serif Display a peso 400 ya tienen presencia — NO usar bold.
- Body paragraphs limitados a `max-width: 65ch` siempre.
- `text-wrap: balance` en H1, H2 para evitar orphans.
- Números y datos (precios, distancias, horarios) siempre en `--font-mono`.

---

## Spacing & Layout

### Container

```css
--container-max: 1200px;
--container-padding: clamp(1.5rem, 4vw, 3rem);
```

### Section Spacing

```css
--section-padding-top: clamp(4rem, 8vw, 7rem);
--section-padding-bottom: clamp(5rem, 10vw, 9rem);
/* Asimétrico: más espacio abajo que arriba (optically balanced) */
```

### Spacing Scale

```css
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2.5rem;
--space-xl: 4rem;
--space-2xl: 6rem;
```

### Grid — Modular por servicio

```css
/* Servicios principales: asimétrico 2-col */
grid-template-columns: 1.2fr 0.8fr;

/* Destinos/cards: masonry-like escalonado */
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

/* Galería: irregular */
grid-template-columns: repeat(3, 1fr);
```

### Breakpoints

| Name | Value | Notes |
|------|-------|-------|
| Mobile | `max-width: 768px` | Stack todo vertical |
| Tablet | `max-width: 1024px` | 2 cols donde aplique |

---

## Components

### Buttons

```css
/* Primary (único CTA) */
background: var(--color-oxido);
color: white;
padding: 0.875rem 2rem;
border-radius: 4px;
font-family: var(--font-body);
font-weight: 500;
font-size: 0.9rem;
letter-spacing: 0.02em;

/* Hover: --color-oxido-dark + translateY(-1px) */
/* Active: translateY(0) */

/* Secondary (solo bordes) */
background: transparent;
border: 1.5px solid var(--color-canal);
color: var(--color-canal);
```

### Cards (Servicios / Destinos)

```css
background: var(--color-espuma);
border-radius: 6px;
padding: var(--space-lg);
border: 1px solid rgba(61, 90, 91, 0.08);
/* Sin box-shadow por defecto — solo en hover */

/* Hover: shadow-md + translateY(-3px) */
```

### Data Badge (precios, distancias, horarios)

```css
font-family: var(--font-mono);
font-size: 0.8rem;
background: var(--color-niebla);
padding: 0.3rem 0.6rem;
border-radius: 3px;
color: var(--color-canal);
```

### Navbar

- Fixed top, `background: var(--color-bosque)` (siempre sólido)
- Links: `color: var(--color-espuma); opacity: 0.85`
- Active: `color: var(--color-oxido)`
- z-index: 100

### WhatsApp Button

- Fixed bottom-right, `background: #25D366`, border-radius: 50%
- Sin animación pulse — solo `transform: scale(1.08)` en hover
- z-index: 99

### Testimonial (editorial)

```css
font-family: var(--font-display);
font-size: clamp(1.3rem, 3vw, 1.8rem);
line-height: 1.5;
color: var(--color-canal);
border-left: 3px solid var(--color-madera);
padding-left: var(--space-lg);
max-width: 50ch;
```

---

## Firma Visual — Silueta Costera SVG

SVG simplificado de la línea costera del archipiélago de Calbuco como divisor entre secciones.

### Rules

- `aria-hidden="true"` — decorativo
- 1 path simplificado (~20 puntos)
- Máximo 2-3 usos en la página
- Animación `stroke-dashoffset` al cargar (ÚNICO momento de animación compleja)
- Color: `var(--color-niebla)` con opacity 0.6

---

## Motion

### Philosophy

Un solo momento orquestado. El resto es estático o con transiciones funcionales.

### Animation (hero load)

```css
.costa-draw {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  animation: draw 2s ease-out 0.5s forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }
```

### Transitions (functional only)

```css
a, button { transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease; }
.card { transition: box-shadow 0.3s ease, transform 0.3s ease; }
```

### Removed

- ~~AOS library~~ — Eliminada
- ~~Parallax~~
- ~~Hover rotate 360deg~~
- ~~Pulse infinito~~

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Section Architecture

1. **Hero** — Frase ancla + foto territorial + CTA WhatsApp
2. **Presentación** — Quiénes somos (empresa familiar, Calbuco)
3. **Servicios** — Grid modular: Turismo / Transporte Escolar / Empresas / Taxi
4. **Destinos** (turismo) — Masonry escalonado con coordenadas
5. **Testimonio** — Uno editorial grande, rotativo (8s)
6. **Galería** — Mosaico irregular
7. **Contacto** — Formulario + mapa + datos integrados
8. **Footer** — Mínimo

---

## Icons

Font Awesome 6 via CDN:
- Turismo: `fa-solid fa-compass`
- Transporte escolar: `fa-solid fa-van-shuttle`
- Empresas: `fa-solid fa-building`
- Taxi: `fa-solid fa-taxi`
