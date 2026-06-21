# Prompt Final: Landing Page Inmersiva — HyB Transporte y Turismo

> Este prompt esta disenado para ser ejecutado por Claude Opus 4.6 en Copilot/Claude Code. Debe leerse en conjunto con las skills `impeccable` y `emil-kowalski` instaladas en el proyecto. Claude debe consultar ambas skills ANTES de tomar cualquier decision de diseno o escribir codigo.

---

## Instruccion critica antes de empezar

Lee y aplica las siguientes skills del proyecto:

1. **Skill `impeccable`**: Consulta su SKILL.md completo. Aplica cada principio de diseno, calidad visual, espaciado, tipografia y pulido que defina. Esta skill es tu norte estetico. Si el resultado no cumple con lo que impeccable define como estandar, no esta listo.

2. **Skill `emil-kowalski`**: Consulta su SKILL.md completo. Actua como critico de diseno con los criterios de Emil Kowalski: calidad de animaciones, timing, easing, microinteracciones, atencion al detalle en transiciones, y la filosofia de que cada movimiento en pantalla debe tener intencion y sentirse fisicamente correcto. Usa esta skill para evaluar tu propio trabajo antes de entregarlo.

3. **Skill `frontend-design`**: Consulta su SKILL.md. Sigue el proceso de plan de diseno antes de codificar: paleta, tipografia, layout, firma visual. Autocritica contra defaults genericos.

No escribas una sola linea de codigo hasta haber leido las tres skills y haber producido el plan de diseno.

---

## Sobre el proyecto

**Cliente**: HyB — Transporte Escolar, Empresas y Turismo.
**Logo**: Archivo `logo.png` en la carpeta `img/` del proyecto (negro con fondo transparente). Existe version blanca `logo-blanco.png` para fondos oscuros.
**Tipo de pagina**: Landing page unica (single page), contenido estatico, sin backend, sin base de datos.
**Deploy**: Netlify desde repositorio GitHub.
**Objetivo**: Que un visitante sienta confianza, profesionalismo y cercanía, y termine haciendo clic en WhatsApp o llenando el formulario de contacto.

---

## Stack tecnico obligatorio

- HTML5 semantico
- CSS3 con custom properties (variables) en :root
- JavaScript vanilla + GSAP (GreenSock Animation Platform)
- GSAP via CDN: gsap.min.js, ScrollTrigger.min.js, ScrollToPlugin.min.js
- Google Fonts (las que defina el plan de diseno, NO Poppins/Inter por defecto)
- Font Awesome via CDN para iconografia
- Netlify Forms para el formulario de contacto (data-netlify="true")
- Sin frameworks CSS. Sin React. Sin dependencias de build. Archivos planos servidos directamente.

### Sobre GSAP

GSAP es la libreria de animacion central del proyecto. No usar CSS @keyframes para animaciones de scroll ni transiciones complejas. GSAP maneja:

- Todas las animaciones de entrada de elementos al hacer scroll (ScrollTrigger)
- La secuencia de animacion del hero al cargar la pagina (timeline)
- Parallax de imagenes y fondos
- Transiciones suaves entre secciones
- Microinteracciones en hover donde CSS transitions no sean suficientes
- Smooth scroll al navegar entre secciones (ScrollToPlugin)
- Pinning de secciones si el diseno lo requiere

CSS maneja: hover states simples, color transitions, cursor effects, responsive layout. Todo lo demas es GSAP.

Registrar plugins al inicio:
```javascript
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
```

Respetar prefers-reduced-motion:
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0);
  ScrollTrigger.defaults({ animation: null });
}
```

---

## Direccion de diseno: La experiencia inmersiva

### El problema a resolver

Las paginas de transporte y turismo en Chile se ven todas iguales: un hero con foto de stock de un bus, una lista de servicios con iconitos, un formulario, fin. Son utilitarias. No transmiten la experiencia de viajar, de confiar en alguien que te lleva. El visitante las escanea en 3 segundos y se va.

### Lo que esta pagina debe lograr

El visitante debe sentir que esta en movimiento. No literalmente (no queremos mareo), sino emocionalmente. La pagina debe evocar la sensacion de un viaje: tiene un inicio (embarcar), un desarrollo (el recorrido), y un destino (el contacto). Cada scroll es un tramo del camino. Cuando llega al final, siente que ya conoce a HyB, que confia en ellos, y que quiere hablar.

### Tono visual

Profesional pero calido. No corporativo frio (sin azul marino + gris). No turistico generico (sin azul caribe + naranja). El logo de HyB es negro con curvas fluidas que sugieren movimiento y ruta. El diseno debe partir de ahi: movimiento controlado, curvas, fluidez, pero con la solidez de una empresa que lleva personas.

---

## Plan de diseno (ejecutar antes de codificar)

Sigue el proceso de la skill `frontend-design`. Produce los siguientes entregables ANTES de escribir codigo:

### 1. Paleta de colores (5-6 hex con nombre)

Extraer del mundo del transporte y el territorio chileno. No colores genericos. Los colores deben poder nombrarse con referencia a algo real:

Ejemplo de direccion (no copiar literalmente, crear la propia):
- Asfalto mojado: un gris oscuro profundo para textos y fondos hero
- Ruta amanecer: un tono calido para acentos principales
- Ventanilla: un azul desaturado, como el cielo visto desde un bus en movimiento
- Polvo de camino: un beige terroso para fondos de secciones alternas
- Senal vial: un color de alta visibilidad para CTAs y elementos de accion

El acento principal debe funcionar tanto en botones como en detalles. Debe haber suficiente contraste para accesibilidad (WCAG AA minimo).

### 2. Tipografia (2-3 roles)

Buscar en Google Fonts combinaciones con personalidad. Criterios:

- Display: debe sugerir movimiento o solidez. No generica. Puede ser una sans-serif con caracter (ancha, condensada, con personalidad geometrica) o una serif editorial si el tono va por lo premium. Usar con mesura: solo titulos principales.
- Body: legible, con buena altura de linea para lectura en pantalla. Que complemente sin competir.
- Accent (opcional): para etiquetas de servicio, precios, datos clave. Puede ser la misma body en un peso diferente.

Definir type scale concreto: h1, h2, h3, body, small con tamanos, pesos y letter-spacing.

### 3. Layout y estructura narrativa

La pagina NO sigue la estructura generica de landing. Sigue una narrativa de viaje:

**Acto 1 — Embarcar (primera pantalla)**
El hero es una declaracion. No una foto de stock con texto encima. Debe comunicar en 3 segundos: quienes son, que hacen, y por que importa. La animacion de carga debe ser una secuencia GSAP orquestada (timeline) donde los elementos aparecen con timing cinematografico, no todo de golpe.

**Acto 2 — El recorrido (secciones de servicio)**
Los tres servicios (Transporte Escolar, Empresas, Turismo) no se presentan como tres tarjetas identicas. Cada uno tiene su propia personalidad visual dentro del sistema de diseno. Pueden ser secciones de altura completa que se revelan al scrollear, con transiciones GSAP entre ellas. O pueden usar un layout asimetrico donde cada servicio ocupa el espacio de forma diferente.

Considerar: pinning con ScrollTrigger donde una seccion se fija mientras el contenido interno cambia. O un efecto de revelado horizontal. O secciones que se transforman una en otra. Lo que el diseno pida, no lo que sea mas facil.

**Acto 3 — El destino (confianza y contacto)**
Testimonios, trayectoria, numeros que importen. No contadores animados subiendo de 0 a 500 (eso es generico). Encontrar una forma de mostrar credibilidad que se sienta real: una frase de un cliente con nombre y contexto, los anos de operacion presentados como una linea de tiempo visual, la flota o la cobertura mostrada en un mapa estilizado.

El cierre es el formulario de contacto y WhatsApp. Debe sentirse como una invitacion, no como un formulario burocrático. El copy, el espacio, la animacion de entrada — todo debe decir "queremos hablar contigo".

### 4. Firma visual (un elemento memorable)

Definir UN elemento que haga esta pagina irreconocible como template. Debe conectar con el sujeto (transporte, movimiento, rutas, viaje). Ejemplos de direcciones posibles:

- Una linea de ruta SVG que serpentea por toda la pagina como un hilo conductor, dibujandose a medida que el usuario scrollea (GSAP drawSVG o stroke-dashoffset animado con ScrollTrigger).
- Transiciones entre secciones con siluetas de cordillera o carretera como clip-path animado.
- Las fotos de servicio se revelan con un efecto de ventanilla: como si el usuario mirara por la ventana de un bus y el paisaje apareciera.
- Un cursor personalizado que cambia segun la seccion, sugiriendo navegacion/direccion.
- Las secciones se conectan visualmente con una linea de carretera discontinua (como la ruta) que avanza con el scroll.

Elegir UNA. Ejecutarla con calidad. No acumular efectos.

---

## Secciones detalladas

### Navbar

- Fijo en la parte superior, comienza transparente sobre el hero
- Al hacer scroll, transicion suave a fondo solido con blur (backdrop-filter: blur) — GSAP controla esta transicion basada en scroll position
- Logo HyB a la izquierda: version blanca sobre hero, cambia a version negra cuando el navbar se vuelve solido (o viceversa segun paleta)
- Links de navegacion: Inicio, Servicios, Nosotros, Contacto
- Smooth scroll con GSAP ScrollToPlugin al hacer clic en los links
- Menu hamburguesa en movil: animacion de apertura fullscreen con timeline GSAP (no un simple slideDown)
- El menu movil debe ser una experiencia en si: overlay a pantalla completa con los links apareciendo en secuencia

### Hero

- Pantalla completa (100vh), es la primera impresion y define todo
- NO usar una foto de stock generica como fondo. Opciones:
  - Gradiente cinematografico con el logo grande y una frase poderosa
  - Una composicion con formas abstractas que sugieran movimiento
  - Si hay foto, que sea propia de la empresa o una muy bien seleccionada con tratamiento visual (duotono, overlay con blend-mode)
- Animacion de carga GSAP: un timeline orquestado donde:
  - Primero aparece un elemento (logo, linea, forma)
  - Luego el titulo principal con split-text o reveal
  - Luego el subtitulo
  - Luego los CTAs
  - Duracion total: 1.5-2.5 segundos. Debe sentirse rapido pero elegante
- Contenido:
  - Titulo principal: frase que comunique la esencia de HyB (placeholder editable)
  - Subtitulo: que especifique los tres servicios
  - CTA primario: lleva a servicios o WhatsApp
  - CTA secundario: lleva a contacto
- Indicador de scroll animado en la parte inferior (flecha o texto "scroll" con animacion sutil loop)

### Servicios (Acto 2)

Tres servicios con identidad propia dentro del sistema de diseno:

**Transporte Escolar**
- Enfoque: seguridad, confianza, puntualidad
- Copy que hable a los padres: tranquilidad de saber que sus hijos viajan seguros
- Icono o ilustracion representativa
- Datos clave: cobertura de colegios, anos de servicio, certificaciones

**Transporte de Empresas**
- Enfoque: profesionalismo, eficiencia, puntualidad
- Copy que hable a ejecutivos/RRHH: solucion de traslado corporativo
- Datos clave: empresas atendidas, flexibilidad de horarios, flota

**Turismo**
- Enfoque: experiencia, aventura, comodidad
- Copy que invite al viaje: conocer destinos con la comodidad de un transporte confiable
- Datos clave: destinos, tipos de tour, capacidad de grupos

Cada servicio debe tener:
- Animacion de entrada con GSAP ScrollTrigger (no la misma para los tres)
- Un CTA que lleve a WhatsApp con mensaje predeterminado especifico para ese servicio
- Espacio para imagen representativa (placeholder con indicacion de que foto poner)

La transicion entre servicios debe sentirse fluida. Considerar:
- ScrollTrigger pinning con contenido que cambia dentro de un contenedor fijo
- Transiciones con clip-path o transformaciones entre secciones
- Parallax diferencial entre texto e imagen

### Flota / Por que elegirnos

- Seccion que muestre los diferenciadores de HyB
- NO usar la estructura generica de 3-4 iconos con texto debajo
- Encontrar una forma visualmente interesante de mostrar: seguridad, puntualidad, experiencia, flota moderna
- Puede ser una composicion asimetrica, un scroll horizontal, tarjetas que se revelan en secuencia, o texto grande con detalles que aparecen al interactuar
- Animacion GSAP: scrub (vinculada 1:1 al scroll) para que el usuario sienta control

### Testimonios

- NO carrusel generico con dots
- Encontrar otra forma: testimonios grandes que ocupan toda la seccion y cambian con scroll, o un mosaico, o citas superpuestas sobre una imagen
- Cada testimonio: texto, nombre, contexto (padre de alumno / gerente de empresa / turista)
- Animacion GSAP de transicion entre testimonios

### Contacto

- Formulario funcional con Netlify Forms (data-netlify="true", name="contacto")
- Campos: Nombre, Email, Telefono (opcional), Tipo de servicio (Escolar/Empresas/Turismo/Otro), Mensaje
- Validacion HTML5 + feedback visual con JS
- El formulario debe sentirse invitante, no burocrático
- Copy: algo como "Conversemos sobre tu proximo viaje" o "Tu ruta empieza aqui" (placeholder)
- Al lado del formulario: datos de contacto, telefono, email, direccion, horario, redes sociales
- Mapa de Google Maps embebido con ubicacion de la empresa (placeholder con coordenadas editables)
- Animacion GSAP de entrada de los campos del formulario en secuencia

### Footer

- Fondo oscuro de la paleta
- Logo blanco de HyB
- Links rapidos de navegacion
- Redes sociales (iconos Font Awesome)
- Copyright y credito del desarrollador
- Debe cerrar la experiencia de la pagina, no ser un bloque generico pegado al final

### Boton flotante de WhatsApp

- Posicion fija, esquina inferior derecha
- Icono WhatsApp, color verde WhatsApp (#25D366)
- Animacion de pulso con GSAP (no CSS keyframes)
- Tooltip animado que aparece y desaparece: "Escríbenos"
- Link: https://wa.me/56XXXXXXXXX?text=Hola!%20Necesito%20informacion%20sobre%20los%20servicios%20de%20HyB
- No debe tapar contenido importante en movil
- Aparece despues de 2-3 segundos de carga, no inmediatamente (entrada con GSAP)

---

## Directrices de animacion GSAP (criticas)

### Filosofia (aplicar criterio de emil-kowalski)

Cada animacion debe responder a la pregunta: que aporta esto a la experiencia? Si la respuesta es "se ve bonito", no es suficiente. La animacion debe guiar la atencion, revelar informacion en el orden correcto, o crear continuidad entre secciones.

### Timing y easing

- NO usar "linear" para nada que involucre elementos de UI
- Easing por defecto: "power2.out" para entradas, "power2.inOut" para transiciones
- Para elementos que sugieren peso o fisicalidad: "power3.out" o "back.out(1.2)"
- Duraciones tipicas: 0.6-1s para entradas de seccion, 0.3-0.4s para hovers, 1.5-2.5s para la secuencia del hero
- Stagger en grupos: 0.08-0.15s entre elementos (no mas, se vuelve lento)

### ScrollTrigger

- Usar scrub para animaciones vinculadas al scroll donde tenga sentido (parallax, la firma visual)
- Usar toggleActions: "play none none none" para animaciones de entrada que solo se reproducen una vez
- Definir start y end precisos, no dejar defaults
- Usar markers durante desarrollo (markers: true) y removerlos en produccion

### Secuencia del hero (timeline)

```javascript
const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });
// Definir la secuencia completa aqui
// Cada elemento con su delay preciso
// La secuencia debe sentirse como una coreografia, no como elementos apareciendo al azar
```

### Lo que NO hacer

- No animar todo. Las secciones que son de lectura (texto largo, formulario) no necesitan animaciones elaboradas. Un fade-in suave basta.
- No usar bounce o elastic para elementos de negocio/corporativos. Eso es para apps ludicas.
- No animar la misma propiedad de dos formas diferentes en la misma pagina (si los titulos entran con clipPath reveal, que todos los titulos entren asi, no unos con opacity y otros con clipPath).
- No hacer animaciones que bloqueen la interaccion. Si el usuario quiere scrollear rapido hasta contacto, debe poder hacerlo.

---

## Critica de diseno (aplicar skill emil-kowalski)

Antes de dar el codigo por terminado, actuar como critico de diseno y revisar:

### Checklist de calidad visual
- Los espaciados son consistentes y generosos? El contenido respira?
- La jerarquia tipografica es clara en cada seccion?
- Los colores tienen suficiente contraste (WCAG AA)?
- Los bordes redondeados son consistentes en toda la pagina?
- Las sombras (si las hay) son sutiles y consistentes?
- Los hover states son claros y responsivos?

### Checklist de animacion
- Cada animacion tiene un proposito claro?
- Los easings se sienten naturales, con peso fisico real?
- La secuencia del hero esta orquestada con timing preciso?
- Las animaciones de scroll son suaves y no entrecortadas?
- En movil, las animaciones son mas sutiles o estan reducidas?
- prefers-reduced-motion esta respetado?

### Checklist de funcionalidad
- El formulario envia correctamente con Netlify Forms?
- El boton de WhatsApp abre con el mensaje correcto?
- La navegacion con smooth scroll funciona en todos los links?
- El menu movil abre, cierra, y navega correctamente?
- Las imagenes tienen lazy loading?
- El sitio carga en menos de 3 segundos?
- Google Lighthouse da 90+ en Performance, Accessibility, Best Practices, SEO?

### Si algo no pasa la critica

Corregir antes de entregar. No dejar TODOs. No decir "esto se puede mejorar despues". La primera version que el cliente ve debe estar pulida.

---

## Responsive

- Mobile first
- Breakpoints: 480px (movil pequeno), 768px (tablet), 1024px (desktop), 1440px (desktop grande)
- En movil: las animaciones GSAP se simplifican (menos parallax, menos pinning, duraciones mas cortas)
- El menu se convierte en hamburguesa con animacion fullscreen
- Las grids colapsan a una columna
- El boton de WhatsApp se mantiene accesible sin tapar contenido
- Testear que el formulario sea usable con teclado en movil

---

## SEO y meta

- Meta tags: title, description, keywords
- Open Graph: og:title, og:description, og:image (crear una imagen OG de 1200x630 con el logo y colores de la marca)
- HTML semantico: header, nav, main, section con id, footer
- Un solo h1, h2 por seccion, h3 para sub-elementos
- Alt text descriptivo en todas las imagenes
- Lang="es" en el html
- robots.txt y sitemap.xml basicos
- Favicon generado desde el logo

---

## Estructura de archivos

```
hyb-landing/
  index.html
  css/
    styles.css
    responsive.css
  js/
    main.js               (inicializacion GSAP, ScrollTrigger, navegacion)
    animations.js          (todas las animaciones GSAP organizadas por seccion)
  img/
    logo.png              (negro, fondo transparente)
    logo-blanco.png       (blanco, fondo transparente)
    favicon.ico
    og-image.jpg          (imagen para redes sociales)
    hero/                 (imagenes del hero)
    servicios/            (imagenes de servicios)
    testimonios/          (fotos de clientes)
  robots.txt
  sitemap.xml
  README.md              (instrucciones de personalizacion y deploy)
```

---

## README.md debe incluir

1. Como cambiar la paleta de colores (variables CSS en :root)
2. Como cambiar tipografias (link de Google Fonts + variables)
3. Como reemplazar textos placeholder en cada seccion
4. Como reemplazar imagenes (indicar tamanos recomendados por seccion)
5. Como cambiar el numero de WhatsApp y los mensajes predeterminados por servicio
6. Como configurar Netlify Forms para recibir los mensajes
7. Como cambiar las coordenadas del mapa
8. Como hacer deploy en Netlify paso a paso (con capturas si es posible)
9. Que CDNs se usan y sus versiones (GSAP, Font Awesome, Google Fonts)

---

## Resumen para Claude

Tienes tres skills que DEBES consultar antes de cualquier decision: `impeccable` para el estandar de calidad visual, `emil-kowalski` para criticar tus propias animaciones e interacciones, y `frontend-design` para el proceso de diseno (plan antes de codigo, autocritica contra defaults).

El resultado debe ser una landing page que:
- No se confunda con ninguna plantilla
- Use GSAP para crear una experiencia de scroll inmersiva y fluida
- Transmita confianza, profesionalismo y calidez
- Guie al visitante desde el hero hasta el formulario de contacto como un viaje
- Funcione impecablemente en movil y desktop
- Pase su propia critica de diseno antes de ser entregada
