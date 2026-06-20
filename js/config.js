// ============================================
// CONFIG.JS — Contenido del sitio
// Editar SOLO este archivo para cambiar
// textos, datos y servicios.
// ============================================

const CONFIG = {

    // ---- EMPRESA ----
    empresa: "Briones Hernández",
    slogan: "Tu familia local que conoce cada camino",
    region: "Calbuco, Los Lagos",
    descripcion: "Empresa familiar de turismo y transporte en Calbuco, Los Lagos. Conocemos cada ruta porque las recorremos todos los días.",

    // ---- HERO ----
    heroTitulo: "Conocemos cada camino del archipiélago",
    heroSubtitulo: "Turismo, transporte y servicios desde Calbuco para todo el sur de Chile.",
    heroCta: "Conversemos",

    // ---- PRESENTACIÓN ----
    presentacionTitulo: "Una familia, todos los caminos",
    presentacionTexto: "Somos Briones Hernández, empresa familiar de Calbuco. Desde hace más de 10 años movemos personas — al trabajo, a la escuela, al aeropuerto, o a descubrir las islas del archipiélago. Conocemos cada ruta porque las recorremos todos los días.",

    // ---- SERVICIOS ----
    serviciosTitulo: "Lo que hacemos",
    serviciosSubtitulo: "Cuatro servicios, un mismo compromiso: llevarte bien.",
    servicios: [
        {
            id: "turismo",
            icono: "fa-solid fa-compass",
            titulo: "Turismo",
            descripcion: "Tours por el archipiélago de Calbuco, islas, volcanes y bosques del sur. Rutas que solo un local conoce.",
            destacado: true
        },
        {
            id: "escolar",
            icono: "fa-solid fa-van-shuttle",
            titulo: "Transporte Escolar",
            descripcion: "Traslado seguro y puntual para estudiantes. Rutas establecidas en Calbuco y alrededores.",
            destacado: false
        },
        {
            id: "empresas",
            icono: "fa-solid fa-building",
            titulo: "Transporte Empresas",
            descripcion: "Servicio de transporte para personal y ejecutivos. Horarios flexibles, vehículos cómodos.",
            destacado: false
        },
        {
            id: "taxi",
            icono: "fa-solid fa-taxi",
            titulo: "Taxi y Traslados",
            descripcion: "Traslados al aeropuerto, terminales y puntos específicos. Disponible todos los días.",
            destacado: false
        }
    ],

    // ---- DESTINOS ----
    destinosTitulo: "Rutas y destinos",
    destinosSubtitulo: "Desde Calbuco hacia las islas, volcanes y bosques del sur.",
    destinos: [
        {
            nombre: "Isla Puluqui",
            descripcion: "La isla más grande del archipiélago. Playas de arena volcánica, bosques nativos y caletas de pescadores.",
            ubicacion: "Archipiélago de Calbuco",
            coordenadas: "-41.72° S, -73.10° W",
            distancia: "20 min desde Calbuco",
            precio: "Desde $25.000",
            destacado: true
        },
        {
            nombre: "Volcán Calbuco",
            descripcion: "Senderos con vista al volcán activo. Trekking por bosques de lenga y coigüe hasta miradores naturales.",
            ubicacion: "Parque Nacional",
            coordenadas: "-41.33° S, -72.61° W",
            distancia: "45 min desde Calbuco",
            precio: "Desde $35.000",
            destacado: false
        },
        {
            nombre: "Caleta La Vega",
            descripcion: "Caleta artesanal activa. Mariscos frescos, botes de colores y la vida cotidiana del sur de Chile.",
            ubicacion: "Costa de Calbuco",
            coordenadas: "-41.77° S, -73.13° W",
            distancia: "10 min desde centro",
            precio: "Desde $15.000",
            destacado: false
        },
        {
            nombre: "Isla Tabón",
            descripcion: "Isla menor del archipiélago. Naturaleza virgen, aves marinas y silencio. Solo accesible en bote.",
            ubicacion: "Archipiélago de Calbuco",
            coordenadas: "-41.75° S, -73.17° W",
            distancia: "35 min desde Calbuco",
            precio: "Desde $30.000",
            destacado: false
        }
    ],

    // ---- TESTIMONIOS ----
    testimonios: [
        {
            texto: "Contratamos el transporte escolar para nuestros hijos. Puntuales todo el año, los niños los quieren. Se nota que es una empresa familiar de verdad.",
            nombre: "Patricia Muñoz",
            origen: "Calbuco"
        },
        {
            texto: "Hicimos el tour a Puluqui con mi familia. El guía conocía cada rincón, nos llevó a una caleta que ni Google Maps muestra. Volvemos en verano.",
            nombre: "Rodrigo Soto",
            origen: "Puerto Montt"
        },
        {
            texto: "Uso el servicio de traslado al aeropuerto de Puerto Montt cada mes por trabajo. Siempre a la hora, siempre amables. Los recomiendo sin dudar.",
            nombre: "Carolina Vega",
            origen: "Calbuco"
        }
    ],

    // ---- CONTACTO ----
    contactoTitulo: "Hablemos",
    contactoSubtitulo: "Escríbenos o completa el formulario. Respondemos el mismo día.",
    telefono: "+56 9 5406 6578",
    email: "ian.saldana2608@gmail.com",
    direccion: "Calbuco, Región de Los Lagos, Chile",
    ciudad: "Calbuco, Chile",
    horario: "Lunes a Viernes: 9:00 - 18:00",
    horario2: "Sábado: 9:00 - 13:00",

    // ---- WHATSAPP ----
    whatsappNumero: "56954066578",
    whatsappMensaje: "Hola! Me interesa conocer más sobre sus servicios. ¿Podrían darme información?",

    // ---- REDES SOCIALES ----
    facebook: "#",
    instagram: "#",
    tiktok: "#",

    // ---- NOSOTROS (diferenciadores) ----
    nosotrosDiferenciadores: [
        "Empresa familiar con raíces en Calbuco",
        "Más de 10 años recorriendo la región",
        "Vehículos mantenidos y seguros",
        "Atención directa — sin intermediarios"
    ],

    // ---- MAPA ----
    mapaEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12000!2d-73.13249!3d-41.771904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961842f010ed59ab%3A0xeb0bc3f39a71bc24!2sCalbuco%2C%20Los%20Lagos!5e0!3m2!1ses!2scl!4v1",

    // ---- FOOTER ----
    copyright: "© 2026 Briones Hernández. Todos los derechos reservados.",
    desarrollador: "Ian Saldaña",
    desarrolladorUrl: "https://github.com/IanSaldana"
};
