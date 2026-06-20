# Design

## Color

### Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#0077B6` | Navbar, botones primarios, enlaces, iconos principales |
| `--color-primary-dark` | `#005F8A` | Hover de botones primarios |
| `--color-secondary` | `#00B4D8` | Acentos secundarios, degradados |
| `--color-accent` | `#FF6B35` | CTAs, badges, highlights, botón WhatsApp |
| `--color-dark` | `#1A1A2E` | Texto principal, navbar fondo, footer fondo |
| `--color-light` | `#F8F9FA` | Fondo de secciones alternas |
| `--color-white` | `#FFFFFF` | Fondos base, texto sobre fondos oscuros |
| `--color-gray` | `#6C757D` | Texto secundario, descripciones |
| `--color-gray-light` | `#E9ECEF` | Bordes, separadores, fondos de input |

### Usage Notes

- El azul `#0077B6` evoca el agua del lago y el mar de Calbuco. Es el color de confianza.
- El naranja `#FF6B35` es el color de acción. Solo debe aparecer en CTAs y elementos interactivos que piden atención.
- No mezclar warm grays con cool grays. La paleta es cool (grays con base azulada).
- El fondo del hero usa degradado oscuro sobre la foto para legibilidad: `linear-gradient(135deg, rgba(0,119,182,0.8), rgba(0,180,216,0.6))`.

## Typography

### Type Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | `'Poppins', sans-serif` | H1, H2, H3, nombres de destinos, slogan |
| `--font-body` | `'Inter', sans-serif` | Párrafos, labels, botones, navegación |

Cargadas vía Google Fonts CDN (pesos: Poppins 300/400/600/700/800, Inter 300/400/500/600).

### Scale in Use

- Display (hero H1): `4.5rem` / `font-weight: 800` / `line-height: 1.1`
- H2 (sección): `2.5rem` / `font-weight: 700`
- H3 (card/item): `1.25–1.5rem` / `font-weight: 600`
- Body: `1rem` / `font-weight: 400` / `line-height: 1.7`
- Small / label: `0.85–0.9rem`

### Decorative Underline

Los H2 de sección tienen un `::after` centrado:
```css
width: 60px; height: 4px; background: var(--color-accent); border-radius: 2px;
```

## Spacing & Layout

### Container

```css
max-width: 1200px; margin: 0 auto; padding: 0 2rem;
```

### Section Padding

```css
padding: 5rem 0;  /* Secciones estándar */
```

Secciones alternas usan `background: var(--color-light)` para crear ritmo visual sin bordes.

### Grid System

CSS Grid nativo (no Bootstrap). Principales estructuras:
- Destinos: `grid-template-columns: repeat(2, 1fr)` → `1fr` en mobile
- Experiencias: `repeat(3, 1fr)` → `1fr` en mobile
- Galería: grid mosaico con `grid-template-columns: repeat(4, 1fr)` y `grid-row: span 2` / `grid-column: span 2` para variedad
- Estadísticas: `repeat(4, 1fr)` → `repeat(2, 1fr)` en mobile

### Breakpoints

| Breakpoint | Value |
|-----------|-------|
| Mobile | `max-width: 768px` |
| Tablet | `max-width: 1024px` |

## Components

### Buttons

```css
/* Primary */
background: var(--color-accent);
color: white;
padding: 1rem 2rem;
border-radius: var(--radius);
font-weight: 600;
transition: var(--transition);

/* Secondary */
background: transparent;
border: 2px solid white;
color: white;
```

Hover: `transform: translateY(-2px)` + `box-shadow: var(--shadow-md)`

### Cards (Destinos)

- `border-radius: var(--radius)` (8px)
- `box-shadow: var(--shadow-sm)`
- Hover: `transform: translateY(-8px)` + `shadow-lg`
- Badge de precio en `background: var(--color-accent)`

### Navbar

- Fixed top, `z-index: 1000`
- Fondo transparente → `var(--color-dark)` con `box-shadow` al hacer scroll (>50px)
- Logo y links en blanco
- Active link: `color: var(--color-accent)`

### Cards (Experiencias)

- Ícono circular: `width/height: 80px`, `background: rgba(0,119,182,0.1)`, `border-radius: 50%`
- Hover: ícono con `transform: rotateY(360deg)` (1s)

### Galería Lightbox

- Overlay: `rgba(0,0,0,0.9)`
- Ítem de galería con `background-size: cover`, hover con overlay de color primario al 80%

### Testimonios Slider

- Cards con `border-left: 4px solid var(--color-accent)`
- Auto-play: 5 segundos
- Dots de navegación: círculo pequeño, activo en `var(--color-primary)`

### Formulario de Contacto

- Inputs: `border: 2px solid var(--color-gray-light)`, focus en `var(--color-primary)`
- Error state: `border-color: #e74c3c`
- Submit: botón primary (naranja)

### WhatsApp Button

- Floating bottom-right: `position: fixed; bottom: 2rem; right: 2rem; z-index: 999`
- Color: `#25D366`
- Animación: `pulse` infinita (CSS keyframe)

## Shadows

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
```

## Motion

### Library

AOS (Animate On Scroll) vía CDN. Configuración:

```js
AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
```

### Custom Animations (css/animations.css)

| Keyframe | Uso |
|----------|-----|
| `fadeInUp` | Entrada en cascada de hero (título, subtítulo, botones) |
| `pulse` | Botón WhatsApp (infinita) |
| `bounceDown` | Indicador de scroll en hero |
| `countUp` | Entrada visual de contadores de stats |

### Transitions

```css
--transition: all 0.3s ease;
```

**Nota para mejora**: `transition: all` debe reemplazarse por propiedades específicas (`transform`, `opacity`, `box-shadow`) para mejor performance.

### Contadores Animados

`IntersectionObserver` + `requestAnimationFrame`. Cuenta de 0 al valor objetivo en 2 segundos.

## Border Radius

```css
--radius: 8px;  /* Cards, botones, inputs */
```

Círculos: `border-radius: 50%` (iconos de experiencias, avatar testimonios)
Pills: `border-radius: 50px` (badges de precio)

## Icons

Font Awesome 6 vía CDN. Uso principalmente en:
- Sección Experiencias (íconos de cada servicio)
- Sección Nosotros (checklist)
- Contacto (teléfono, email, ubicación, horario)
- Redes sociales (footer y contacto)

## Section Backgrounds

Alternancia para ritmo visual:
- Secciones pares: `background: white`
- Secciones impares: `background: var(--color-light)` (#F8F9FA)
- Hero: imagen fotográfica + overlay degradado azul
- Navbar / Footer: `var(--color-dark)` (#1A1A2E)
