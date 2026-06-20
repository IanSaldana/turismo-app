# Prompt de Rediseno: Landing Page de Turismo con Identidad Propia

## Contexto

Existe un prompt previo que define una landing page de turismo con HTML, CSS y JS vanilla, deploy en Netlify, boton flotante de WhatsApp, formulario de contacto con Netlify Forms, y animaciones de scroll. Ese prompt produce un resultado funcional pero generico: se ve como cualquier otra landing de turismo generada por IA o sacada de una plantilla.

Este prompt reemplaza las decisiones de diseno de ese documento. Las funcionalidades se mantienen (WhatsApp, formulario, responsive, SEO), pero el aspecto visual, la estructura narrativa, la tipografia, el uso del color, las animaciones y el copywriting deben reconstruirse desde cero con una identidad que no pueda confundirse con otra pagina.

---

## Instruccion Principal

Actua como director creativo de un estudio de diseno pequeno conocido por dar a cada cliente una identidad visual que no se parece a la de nadie mas. Este cliente (una empresa de turismo en Chile) ya rechazo propuestas que se veian "como plantilla". Esta pagando por un punto de vista distintivo.

Antes de escribir una sola linea de codigo, haz lo siguiente:

---

## Paso 1: Definir el sujeto con precision

No disenar "una pagina de turismo generica". Definir primero:

- Que tipo de turismo es: aventura, cultural, naturaleza, gastronomico, rural, lujo, mochilero. Elegir uno o una combinacion concreta. Si el cliente no lo ha definido aun, elegir una direccion y declararla explicitamente para que el diseno tenga punto de vista.
- Quien es la audiencia: familias, parejas, jovenes aventureros, extranjeros, ejecutivos buscando desconexion. Definir un perfil.
- Cual es el trabajo unico de esta pagina: convencer a alguien de que haga clic en WhatsApp para preguntar por un tour. Todo lo demas es secundario.

Declarar estas decisiones antes de disenar. El diseno nace del sujeto, no al reves.

---

## Paso 2: Plan de diseno (antes de codificar)

Crear un plan compacto con cuatro ejes. No empezar a codificar hasta tener esto resuelto:

### Color (4-6 valores hex con nombre)

No usar la paleta default de "turismo" (azul oceano + naranja). Extraer los colores del mundo real del sujeto elegido: si es turismo de bosques patagonicos, los colores vienen de la corteza del lenga, el verde musgo, la piedra volcanica, el cielo de atardecer austral. Si es turismo costero, del agua turbia del pacifico chileno (que no es caribe), la espuma, la madera de los botes, el oxido de las caletas. Los colores deben poder nombrarse con referencia a algo tangible del territorio, no con nombres genericos como "primary" y "accent".

Definir los valores hex y sus nombres antes de codificar. Ejemplo de formato:

- Piedra volcanica: #2D2926 (textos, fondos oscuros)
- Musgo seco: #7A8450 (acento principal)
- Corteza lenga: #A67B5B (acento calido)
- Niebla: #E8E4DF (fondos claros)
- Nieve: #F5F3F0 (fondo base)
- Agua glaciar: #6B9DAD (enlaces, detalles)

Estos son ejemplo. Los colores reales deben salir del territorio y tipo de turismo definido en el Paso 1.

### Tipografia (2-3 roles con justificacion)

No usar Poppins + Inter, que es la combinacion que generaria cualquier IA por defecto. Elegir tipografias de Google Fonts que tengan caracter propio y se justifiquen por el sujeto:

- Display (titulos): una tipografia con personalidad que se use con mesura. Serif editorial si el tono es premium, sans condensada si es aventura, slab serif si es rustico. Justificar la eleccion.
- Body (cuerpo): legible, neutral pero no invisible. Que complemente a la display sin competir.
- Utility (datos, precios, etiquetas): opcional, solo si hay elementos que necesiten otro registro (monoespaciada para datos, una sans compacta para UI).

Definir el type scale: tamanos concretos para h1, h2, h3, body, small. Pesos y espaciados deliberados.

### Layout (concepto + wireframe ASCII)

No usar la estructura generica de landing (hero fullscreen, grid de tarjetas iguales, seccion con 3 iconos centrados, testimonios con carrusel). Esa estructura es reconocible a kilometros como template.

Disenar una estructura narrativa que guie al visitante como lo haria un buen guia de turismo: no le muestra una lista de destinos, le cuenta una historia. Pensar en la pagina como un recorrido, no como un catalogo.

Opciones a explorar (elegir o inventar una propia):

- Editorial: la pagina se siente como una revista de viajes. Grandes fotos asimetricas, texto que fluye alrededor, ritmo visual variado entre secciones.
- Cinematografico: bloques de pantalla completa que se van revelando como escenas. Poco texto, imagenes inmersivas, transiciones entre secciones.
- Cartografico: la pagina se organiza como un mapa o una ruta. Los destinos no estan en un grid sino en un recorrido visual que sugiere el viaje.
- Documental: fotos en blanco y negro con acentos de color. Tipografia editorial grande. Se siente como un proyecto fotografico, no como una tienda.

Hacer wireframes ASCII simples de 2-3 secciones clave para visualizar el layout antes de codificar.

### Firma visual (un elemento memorable)

Definir un unico elemento que haga que esta pagina se recuerde. No puede ser un efecto generico (parallax no cuenta, gradientes no cuentan). Debe estar conectado al sujeto. Ejemplos:

- Una linea topografica animada que recorre la pagina como un hilo conductor, representando la elevacion del terreno real de los destinos.
- Las fotos tienen un recorte organico irregular, como si fueran rasgadas a mano, evocando papel de diario de viaje.
- Un cursor personalizado que cambia segun la seccion (brujula, zoom, ola).
- La transicion entre secciones usa una silueta de cordillera como divisor SVG en vez de lineas rectas.
- Los precios o datos aparecen escritos como sellos de pasaporte.

Elegir UNA firma y ejecutarla bien. No acumular efectos.

---

## Paso 3: Autocritica antes de codificar

Revisar el plan completo y preguntarse:

- Si le pido a otra IA que disene una landing de turismo en Chile, llegaria a estas mismas decisiones? Si la respuesta es si en algun eje, revisar ese eje.
- El color palette es intercambiable con cualquier otra pagina de turismo? Si si, buscar mas especificidad.
- La estructura de secciones es la misma de siempre (hero, servicios, galeria, testimonios, contacto)? Si si, romper el orden o fusionar secciones de forma no convencional.
- Las animaciones son las mismas fade-up y fade-in que tiene toda landing? Si si, reducirlas o reemplazarlas por una sola animacion orquestada que tenga sentido narrativo.

Solo despues de esta revision, empezar a codificar.

---

## Paso 4: Directrices de animacion y movimiento

No aplicar AOS con fade-up a cada elemento. Eso es el equivalente visual de poner negrita en todo: si todo se anima igual, nada destaca.

En su lugar:

- Elegir un momento de animacion principal: una secuencia orquestada al cargar la pagina, o un efecto de revelado al llegar a la seccion clave. Invertir ahi la complejidad.
- El resto de la pagina puede ser estatico o con transiciones minimas (opacidad, no movimiento). Menos es mas cuando las animaciones son indistinguibles de las que genera cualquier template.
- Los hovers deben ser sutiles y funcionales (indicar que algo es clickeable), no espectaculares.
- Respetar prefers-reduced-motion: si el usuario tiene animaciones reducidas activadas en su sistema operativo, desactivar todas las animaciones.
- Un solo efecto de scroll bien ejecutado vale mas que 15 fade-ups identicos.

---

## Paso 5: Copywriting como material de diseno

Los textos placeholder no pueden ser "Descubre los mejores destinos" ni "Experiencias unicas" ni "Lo que dicen nuestros viajeros". Esas frases son el equivalente textual de una foto de stock.

Directrices para el copy:

- Los titulos de seccion deben decir algo concreto sobre el sujeto, no algo que aplique a cualquier empresa de turismo del mundo. "Nuestros destinos" es generico. "Tres valles, un solo sendero" es especifico (ejemplo).
- Evitar superlativos vacios: "los mejores", "unicos", "increibles", "inolvidables". Reemplazar por descripciones tangibles que el visitante pueda imaginar.
- El CTA principal no tiene que decir "Explorar Destinos". Puede decir algo que conecte con la experiencia: "Elige tu ruta", "Arma tu viaje", "Empieza aqui".
- Los textos del boton de WhatsApp y del formulario deben sonar como una persona hablando, no como un sistema: "Conversemos sobre tu viaje" en vez de "Enviar Mensaje".

Estos son placeholders, pero incluso los placeholders deben tener el tono correcto para que cuando el cliente ponga su contenido real, el diseno no se sienta roto.

---

## Paso 6: Directrices tecnicas que se mantienen

Estas funcionalidades del prompt original se mantienen sin cambio:

- HTML5 semantico, CSS3 con variables, JS vanilla
- Boton flotante de WhatsApp con link wa.me y mensaje predeterminado
- Formulario de contacto funcional con Netlify Forms (data-netlify="true")
- Responsive design mobile-first con breakpoints en 768px y 1024px
- Google Fonts via CDN (las que defina el plan de diseno, no Poppins/Inter)
- Font Awesome via CDN para iconos
- Google Maps embebido en seccion de contacto
- SEO basico: meta tags, Open Graph, semantica, alt texts, heading hierarchy
- Lazy loading en imagenes
- README.md con instrucciones de personalizacion
- Variables CSS en :root para facilitar cambio de paleta y tipografia
- Deploy en Netlify desde repositorio GitHub
- Sin base de datos, sin backend, sin dependencias pesadas

---

## Paso 7: Entregables

1. Plan de diseno escrito (Pasos 1-3 resueltos) antes de cualquier codigo
2. Codigo completo de la landing page (index.html, css/, js/, img/ con placeholders)
3. README.md con instrucciones de personalizacion
4. Archivo robots.txt y sitemap.xml basicos

---

## Resumen ejecutivo

Este prompt no cambia lo que hace la pagina. Cambia como se ve, como se siente y como se recuerda. La funcionalidad es identica al prompt anterior. La diferencia es que antes de escribir codigo, se toman decisiones de diseno fundamentadas en el sujeto especifico, se critican contra los defaults genericos, y solo entonces se construye. El resultado debe ser una pagina que si la pones al lado de otras 10 landings de turismo, no se confunda con ninguna.
