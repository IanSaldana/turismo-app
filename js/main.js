// ============================================
// MAIN.JS - Landing Turismo
// Menú móvil, scroll spy, navbar, AOS init
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Inicializar AOS ----
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ---- Menú móvil ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un link
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Scroll Spy (link activo según sección visible) ----
    const sections = document.querySelectorAll('section[id]');

    function handleScrollSpy() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.navbar__link[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScrollSpy);

});
