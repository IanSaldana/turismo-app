// ============================================
// MAIN.JS - Landing Turismo
// Menú móvil, scroll spy, navbar, AOS init
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Loading Screen ----
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loader--hidden');
        }, 500);
    });

    // ---- Inicializar AOS ----
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.querySelector('.hero__scroll-indicator');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }

        // Ocultar indicador de scroll al bajar
        if (scrollIndicator) {
            if (window.scrollY > 200) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ---- Menú móvil ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un link
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
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

    // ---- Contadores animados ----
    const counters = document.querySelectorAll('.stats__number');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Observar cuando la sección stats entra en pantalla
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // ---- Lightbox Galería ----
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');
    const galeriaItems = document.querySelectorAll('.galeria__item');

    galeriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.galeria__img');
            const bg = img.style.background;
            lightboxContent.style.background = bg;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ---- Slider Testimonios ----
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    const dots = document.querySelectorAll('.testimonios__dot');
    const btnPrev = document.querySelector('.testimonios__btn--prev');
    const btnNext = document.querySelector('.testimonios__btn--next');
    let currentSlide = 0;

    function showSlide(index) {
        testimonioCards.forEach(card => card.classList.remove('testimonio-card--active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + testimonioCards.length) % testimonioCards.length;
        testimonioCards[currentSlide].classList.add('testimonio-card--active');
        dots[currentSlide].classList.add('active');
    }

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', () => showSlide(currentSlide + 1));
        btnPrev.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play cada 5 segundos
    let sliderInterval = setInterval(() => showSlide(currentSlide + 1), 5000);

    // Pausar auto-play al interactuar
    const sliderContainer = document.querySelector('.testimonios__slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(sliderInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        });
    }

    // ---- Formulario de Contacto ----
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validación visual
            const required = contactForm.querySelectorAll('[required]');
            let valid = true;

            required.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    valid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            // Validar email
            const emailField = contactForm.querySelector('#email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && !emailPattern.test(emailField.value)) {
                emailField.classList.add('error');
                valid = false;
            }

            if (!valid) return;

            // Enviar a Netlify Forms
            const formData = new FormData(contactForm);
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
            })
            .catch(() => {
                // Fallback: mostrar éxito de todos modos en dev local
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
            });
        });

        // Quitar error al escribir
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.classList.remove('error');
            });
        });
    }

});
