# Prompt de Desarrollo: Landing Page de Turismo

## Instruccion para el desarrollador (o IA asistente)

Necesito que desarrolles una landing page completa para una empresa de turismo. El sitio debe ser profesional, moderno, visualmente atractivo y orientado a generar confianza en visitantes que buscan servicios turisticos. A continuacion detallo todas las especificaciones tecnicas, de diseno y de contenido.

---

## Stack Tecnologico

- HTML5 semantico
- CSS3 con variables CSS para colores y tipografia (facilitar personalizacion posterior)
- JavaScript vanilla (sin frameworks ni librerias pesadas)
- AOS (Animate On Scroll) via CDN para animaciones de scroll: https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css y https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js
- Font Awesome via CDN para iconos: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css
- Google Fonts para tipografia (sugerencia: Poppins para titulos, Inter o Open Sans para cuerpo)
- Deploy en Netlify desde repositorio GitHub
- Sin base de datos, sin backend, sin frameworks CSS. Todo en archivos planos

---

## Estructura de Archivos

```
landing-turismo/
  index.html
  css/
    styles.css
    animations.css        (animaciones custom adicionales a AOS)
  js/
    main.js               (menu movil, smooth scroll, boton whatsapp, formulario contacto)
  img/
    logo.png              (placeholder: dejar espacio y alt text)
    hero-bg.jpg           (placeholder: usar gradiente hasta tener imagen real)
    destino-1.jpg
    destino-2.jpg
    destino-3.jpg
    destino-4.jpg
    experiencia-1.jpg
    experiencia-2.jpg
    about-bg.jpg
    favicon.ico
  README.md               (instrucciones de personalizacion y deploy)
```

---

## Paleta de Colores (definir via variables CSS)

Usar variables CSS en :root para poder cambiar toda la paleta editando solo un bloque. Valores iniciales sugeridos (tema turismo/naturaleza):

```css
:root {
  --color-primary: #0077B6;        /* azul oceano - botones, enlaces, acentos */
  --color-primary-dark: #005F8A;   /* hover de botones */
  --color-secondary: #00B4D8;      /* azul claro - detalles, iconos */
  --color-accent: #FF6B35;         /* naranja calido - CTA, elementos que destaquen */
  --color-dark: #1A1A2E;           /* textos oscuros, fondo navbar */
  --color-light: #F8F9FA;          /* fondo secciones alternas */
  --color-white: #FFFFFF;
  --color-gray: #6C757D;           /* textos secundarios */
  --color-gray-light: #E9ECEF;     /* bordes, separadores */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

Dejar un comentario en el CSS que diga: "PERSONALIZAR AQUI: cambiar estos valores para adaptar toda la paleta del sitio".

---

## Secciones de la Pagina (en orden de arriba a abajo)

### 1. Navbar / Header

- Fijo en la parte superior (sticky/fixed) con efecto de fondo que aparece al hacer scroll (transparente arriba, solido al bajar)
- Logo a la izquierda (imagen placeholder con alt="Logo Empresa Turismo")
- Menu de navegacion a la derecha con links ancla a cada seccion: Inicio, Destinos, Experiencias, Nosotros, Contacto
- Menu hamburguesa en movil con animacion de apertura suave
- Al hacer clic en un link del menu, smooth scroll hacia la seccion correspondiente
- El link activo debe resaltarse segun la seccion visible (scroll spy basico con JS)

### 2. Hero Section

- Ocupa el 100% del viewport (100vh)
- Imagen de fondo a pantalla completa con overlay oscuro semitransparente para legibilidad (usar gradiente como placeholder hasta tener la imagen real)
- Contenido centrado vertical y horizontalmente:
  - Titulo principal: "[Nombre de la Empresa]" (placeholder editable)
  - Subtitulo: "Descubre los mejores destinos de [Region/Zona]" (placeholder editable)
  - Boton CTA principal: "Explorar Destinos" que lleva a la seccion de destinos
  - Boton CTA secundario: "Contactanos" que lleva a la seccion de contacto
- Animacion de entrada: el titulo aparece con fade-in desde abajo, el subtitulo 200ms despues, los botones 400ms despues (efecto cascada)
- Efecto parallax suave en la imagen de fondo al hacer scroll

### 3. Barra de Confianza / Stats

- Franja horizontal con fondo de color primario
- 3 o 4 contadores animados que suben desde 0 al ser visibles:
  - "+500 Viajeros Felices"
  - "+50 Destinos"
  - "+10 Anos de Experiencia"
  - "100% Recomendados"
- Los numeros deben animarse con un contador progresivo cuando la seccion entra en pantalla (IntersectionObserver + JS)
- Animacion AOS: fade-up en cada contador con delay escalonado

### 4. Destinos Destacados

- Titulo de seccion centrado: "Nuestros Destinos" con linea decorativa debajo
- Subtitulo: "Conoce los lugares mas increibles que tenemos para ti"
- Grid de 4 tarjetas de destinos (2x2 en desktop, 1 columna en movil)
- Cada tarjeta:
  - Imagen del destino (placeholder con fondo gradiente y texto "Imagen Destino X")
  - Nombre del destino
  - Breve descripcion (2-3 lineas)
  - Icono de ubicacion + texto de ubicacion
  - Precio desde: "$XX.XXX por persona"
  - Boton "Ver mas" o "Consultar"
- Efecto hover en tarjetas: elevacion con sombra (transform: translateY(-8px) + box-shadow)
- Animacion AOS: cada tarjeta aparece con fade-up y delay escalonado (0, 100, 200, 300ms)

### 5. Experiencias / Servicios

- Fondo alterno (usar --color-light para diferenciar visualmente de la seccion anterior)
- Titulo: "Experiencias Unicas"
- Subtitulo: "Servicios pensados para que disfrutes al maximo"
- Layout: 3 bloques con icono grande (Font Awesome), titulo y descripcion
  - Ejemplo placeholder 1: icono de montana + "Trekking y Aventura" + descripcion
  - Ejemplo placeholder 2: icono de camara + "Tours Fotograficos" + descripcion
  - Ejemplo placeholder 3: icono de utensils + "Gastronomia Local" + descripcion
- Cada bloque aparece con animacion AOS fade-right, fade-up, fade-left respectivamente
- Hover: el icono rota o cambia de color suavemente

### 6. Galeria de Fotos

- Titulo: "Galeria"
- Subtitulo: "Momentos que hablan por si solos"
- Grid tipo mosaico (CSS Grid con diferentes tamanos) con 6-8 imagenes placeholder
- Hover sobre imagen: overlay con icono de lupa o expansion
- Opcional: lightbox simple con JS al hacer clic (imagen se abre en modal sobre fondo oscuro, clic fuera o boton X cierra)
- Animacion AOS: zoom-in en cada imagen al aparecer

### 7. Testimonios

- Fondo con imagen fija (parallax) + overlay oscuro, o fondo de color solido
- Titulo: "Lo que dicen nuestros viajeros"
- Carrusel o slider simple con 3 testimonios placeholder:
  - Foto circular del cliente (placeholder)
  - Texto del testimonio entre comillas
  - Nombre y procedencia
  - Estrellas de valoracion (5 estrellas con Font Awesome)
- Navegacion con flechas o dots
- Animacion AOS: fade-in del contenido

### 8. Sobre Nosotros

- Layout: imagen a un lado, texto al otro (en movil se apilan)
- Titulo: "Sobre Nosotros"
- Texto placeholder: parrafo sobre la historia, mision y valores de la empresa (3-4 parrafos cortos)
- Lista con checkmarks de diferenciadores:
  - "Guias locales certificados"
  - "Grupos reducidos y personalizados"
  - "Compromiso con el turismo sustentable"
  - "Atencion 24/7 durante tu viaje"
- Boton: "Conoce mas sobre nosotros" o "Habla con nosotros" (enlaza a contacto o WhatsApp)
- Animacion AOS: imagen fade-right, texto fade-left

### 9. Contacto

- Fondo alterno (--color-light)
- Titulo: "Contactanos"
- Subtitulo: "Estamos listos para planificar tu proxima aventura"
- Layout en dos columnas (en movil se apilan):

**Columna izquierda: Informacion de contacto**
  - Icono telefono + numero placeholder
  - Icono email + correo placeholder
  - Icono ubicacion + direccion placeholder
  - Iconos de redes sociales (Facebook, Instagram, TikTok) con links placeholder
  - Horario de atencion

**Columna derecha: Formulario de contacto**
  - Campo: Nombre completo
  - Campo: Email
  - Campo: Telefono (opcional)
  - Campo: Asunto (dropdown con opciones: Consulta general, Reserva de tour, Cotizacion, Otro)
  - Campo: Mensaje (textarea)
  - Boton de envio: "Enviar Mensaje"
  - El formulario debe usar Netlify Forms (agregar atributo netlify al form) para recibir los mensajes directamente en el dashboard de Netlify sin backend. Agregar el atributo data-netlify="true" y name="contacto" al formulario
  - Validacion basica con HTML5 (required, type="email") y JS para feedback visual
  - Al enviar exitosamente, mostrar mensaje de confirmacion en pantalla

### 10. Mapa

- Google Maps embebido con iframe mostrando la ubicacion de la empresa
- Placeholder: usar coordenadas genericas de la zona, editar luego con las reales
- Ancho completo, altura 300-400px

### 11. Footer

- Fondo oscuro (--color-dark)
- Tres columnas:
  - Logo + breve descripcion de la empresa
  - Links rapidos: Destinos, Experiencias, Nosotros, Contacto
  - Redes sociales con iconos + texto de contacto rapido
- Linea separadora
- Copyright: "(c) 2025 [Nombre Empresa]. Todos los derechos reservados."
- Link discreto: "Desarrollado por [Tu nombre/empresa]"

---

## Boton Flotante de WhatsApp

- Boton circular fijo en la esquina inferior derecha (position: fixed, z-index alto)
- Icono de WhatsApp (Font Awesome: fa-brands fa-whatsapp)
- Color verde WhatsApp (#25D366) con sombra
- Al hacer hover: escala ligeramente (transform: scale(1.1)) y sombra mas pronunciada
- Animacion de pulso sutil continua para llamar la atencion (CSS keyframe)
- Al hacer clic, abre WhatsApp con mensaje predeterminado:
  - URL: https://wa.me/56XXXXXXXXX?text=Hola!%20Me%20interesa%20conocer%20mas%20sobre%20sus%20tours%20y%20destinos.%20Podrian%20darme%20mas%20informacion?
  - El numero de telefono es placeholder, se debe reemplazar con el real
  - El mensaje predeterminado es placeholder, se debe personalizar
- Tooltip al hacer hover: "Escribenos por WhatsApp"
- En movil: un poco mas grande para facilitar el toque
- Debe tener un pequeno badge o etiqueta que diga "Chatea con nosotros" que aparece y desaparece cada ciertos segundos

---

## Animaciones y Efectos

### Animaciones de Scroll (AOS)

Aplicar a todos los elementos principales con variaciones para que no sea monotono:
- fade-up: tarjetas, bloques de contenido
- fade-right / fade-left: secciones con imagen + texto
- zoom-in: imagenes de galeria
- flip-up: contadores de stats
- Duracion: 800-1000ms
- Delay escalonado en grupos: 0, 100, 200, 300ms entre elementos hermanos

### Animaciones CSS Custom

- Navbar: transicion suave de transparente a solido al scrollear
- Hero: texto con efecto cascada de aparicion (keyframes con translateY y opacity)
- Contadores: animacion de numeros subiendo desde 0 hasta el valor final
- Boton WhatsApp: pulso continuo (keyframe scale 1 a 1.15 y vuelta)
- Hover en botones: transicion de color y sombra (transition: all 0.3s ease)
- Hover en tarjetas: elevacion y sombra ampliada
- Hover en imagenes de galeria: zoom suave + overlay
- Smooth scroll global: html { scroll-behavior: smooth; }
- Loading de pagina: breve pantalla de carga con logo y spinner que desaparece al cargar todo (opcional pero profesional)

---

## Responsive Design

- Mobile first approach
- Breakpoints:
  - Movil: hasta 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px en adelante
- El menu se convierte en hamburguesa en movil
- Las grids pasan de multiples columnas a una sola en movil
- Las imagenes se adaptan con max-width: 100%
- Los textos reducen tamano proporcionalmente
- El boton de WhatsApp se mantiene visible y accesible en todas las resoluciones
- Testear que el formulario de contacto sea usable en movil

---

## SEO Basico

- Meta tags: title, description, keywords en el head
- Open Graph tags para compartir en redes sociales (og:title, og:description, og:image)
- Estructura semantica: header, nav, main, section, article, footer
- Atributos alt en todas las imagenes
- Heading hierarchy correcta: un solo h1, h2 por seccion, h3 para sub-elementos
- Archivo robots.txt basico
- Sitemap.xml simple
- Favicon configurado
- Meta viewport para responsive
- Lang="es" en el html

---

## Instrucciones de Personalizacion

El sitio debe incluir un archivo README.md con las siguientes instrucciones:

1. Como cambiar la paleta de colores (editar variables en :root)
2. Como cambiar textos (buscar los placeholders en index.html)
3. Como reemplazar imagenes (mismos nombres de archivo en la carpeta img/)
4. Como cambiar el numero de WhatsApp y el mensaje predeterminado
5. Como configurar el email de destino en Netlify Forms
6. Como cambiar las coordenadas del mapa de Google Maps
7. Como hacer deploy en Netlify paso a paso

---

## Notas Importantes para el Desarrollo

- No usar librerias pesadas. Solo AOS y Font Awesome por CDN
- Optimizar imagenes antes de subir (formato WebP preferido, fallback JPG)
- Lazy loading en imagenes que no estan en el viewport inicial (loading="lazy")
- Minificar CSS y JS en produccion o dejar que Netlify lo haga
- El codigo debe estar limpio, comentado y organizado para que alguien con conocimientos basicos pueda editarlo
- Priorizar rendimiento: buscar puntaje alto en Google Lighthouse
- El sitio debe funcionar sin JavaScript para el contenido principal (JS es mejora progresiva para animaciones e interactividad)
