# Landing Page de Turismo

Landing page profesional, responsive y optimizada para empresas de turismo.

## Stack Tecnológico

- HTML5 semántico
- CSS3 con variables (personalización fácil)
- JavaScript vanilla
- AOS (Animate On Scroll) vía CDN
- Font Awesome vía CDN
- Google Fonts (Poppins + Inter)
- Deploy: Netlify

## Estructura

```
turismo-app/
├── index.html          → Página principal
├── css/
│   ├── styles.css      → Estilos principales + responsive
│   └── animations.css  → Animaciones custom (keyframes)
├── js/
│   └── main.js         → Lógica: menú, slider, contadores, formulario
├── img/                → Imágenes (reemplazar placeholders)
├── robots.txt          → SEO
├── sitemap.xml         → SEO
└── prompt/             → Documentación del proyecto
```

## Personalización Rápida

### 1. Cambiar paleta de colores

Editar las variables en `css/styles.css` dentro del bloque `:root`:

```css
:root {
    --color-primary: #0077B6;
    --color-accent: #FF6B35;
    /* ... etc */
}
```

### 2. Cambiar textos

Buscar en `index.html` los textos placeholder:
- "Nombre de la Empresa" → Tu nombre de empresa
- "[Región/Zona]" → Tu zona geográfica
- "Destino 1", "Destino 2"... → Nombres reales
- Precios "$XX.XXX" → Precios reales

### 3. Reemplazar imágenes

Colocar las imágenes en la carpeta `img/` con estos nombres:
- `logo.png` — Logo de la empresa
- `hero-bg.jpg` — Imagen principal del hero
- `destino-1.jpg` a `destino-4.jpg` — Fotos de destinos
- `about-bg.jpg` — Foto sección nosotros
- `favicon.ico` — Favicon

Para activar imágenes en el hero, cambiar en `styles.css`:
```css
.hero {
    background: url('../img/hero-bg.jpg') center/cover no-repeat;
}
```

### 4. Cambiar número de WhatsApp

En `index.html`, buscar la línea con `wa.me` y cambiar el número:
```
https://wa.me/56TUNUMERO?text=TU%20MENSAJE
```

### 5. Configurar Netlify Forms

El formulario ya tiene `data-netlify="true"`. Al hacer deploy en Netlify:
1. Los envíos aparecen en **Netlify Dashboard → Forms**
2. Configurar notificaciones por email en **Form notifications**

### 6. Cambiar coordenadas del mapa

En `index.html`, buscar el `<iframe>` de Google Maps y reemplazar la URL `src` con el embed de tu ubicación real desde [Google Maps](https://www.google.com/maps) → Compartir → Incorporar mapa.

### 7. Deploy en Netlify

1. Subir el repo a GitHub
2. Ir a [netlify.com](https://www.netlify.com) → New site from Git
3. Conectar el repositorio
4. Build command: dejar vacío (es sitio estático)
5. Publish directory: `.` (raíz)
6. Deploy site
7. Configurar dominio personalizado en Domain settings

## Desarrollo Local

Simplemente abrir `index.html` en el navegador. No requiere servidor ni build tools.

## Licencia

Proyecto privado. Código propiedad del cliente una vez completado el pago.
