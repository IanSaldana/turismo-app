// ============================================
// MAIN.JS - Landing Turismo
// Menú móvil, scroll spy, navbar, AOS init
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Aplicar CONFIG al DOM ----
    if (typeof CONFIG !== 'undefined') {
        // Textos: data-config="key" → textContent = CONFIG[key]
        document.querySelectorAll('[data-config]').forEach(el => {
            const key = el.getAttribute('data-config');
            if (CONFIG[key] !== undefined) {
                el.textContent = CONFIG[key];
            }
        });

        // Links: data-config-href="key" → href = CONFIG[key]
        document.querySelectorAll('[data-config-href]').forEach(el => {
            const key = el.getAttribute('data-config-href');
            if (CONFIG[key] !== undefined) {
                el.href = CONFIG[key];
            }
        });

        // Stats: data-config-target="key" → data-target = CONFIG[key]
        document.querySelectorAll('[data-config-target]').forEach(el => {
            const key = el.getAttribute('data-config-target');
            if (CONFIG[key] !== undefined) {
                el.setAttribute('data-target', CONFIG[key]);
            }
        });

        // WhatsApp
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn && CONFIG.whatsappNumero) {
            const msg = encodeURIComponent(CONFIG.whatsappMensaje || '');
            whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumero}?text=${msg}`;
        }

        // Mapa
        const mapaIframe = document.getElementById('mapaIframe');
        if (mapaIframe && CONFIG.mapaEmbed) {
            mapaIframe.src = CONFIG.mapaEmbed;
        }

        // Testimonios
        if (CONFIG.testimonios && CONFIG.testimonios.length > 0) {
            const track = document.querySelector('.testimonios__track');
            const dotsContainer = document.querySelector('.testimonios__dots');
            if (track && dotsContainer) {
                track.innerHTML = '';
                dotsContainer.innerHTML = '';

                CONFIG.testimonios.forEach((t, i) => {
                    const stars = '&#9733;'.repeat(t.estrellas || 5);
                    const card = document.createElement('div');
                    card.className = `testimonio-card${i === 0 ? ' testimonio-card--active' : ''}`;
                    card.innerHTML = `
                        <div class="testimonio-card__stars">
                            ${'<i class="fa-solid fa-star"></i>'.repeat(t.estrellas || 5)}
                        </div>
                        <p class="testimonio-card__text">\u201c${t.texto}\u201d</p>
                        <div class="testimonio-card__author">
                            <div class="testimonio-card__avatar"></div>
                            <div>
                                <h4 class="testimonio-card__name">${t.nombre}</h4>
                                <span class="testimonio-card__origin">${t.origen}</span>
                            </div>
                        </div>
                    `;
                    track.appendChild(card);

                    const dot = document.createElement('span');
                    dot.className = `testimonios__dot${i === 0 ? ' active' : ''}`;
                    dotsContainer.appendChild(dot);
                });
            }
        }

        // Destinos
        if (CONFIG.destinos && CONFIG.destinos.length > 0) {
            const destinosGrid = document.querySelector('.destinos__grid');
            if (destinosGrid) {
                destinosGrid.innerHTML = '';
                CONFIG.destinos.forEach((d, i) => {
                    const article = document.createElement('article');
                    article.className = 'destino-card';
                    article.setAttribute('data-aos', 'fade-up');
                    if (i > 0) article.setAttribute('data-aos-delay', String(i * 100));
                    article.innerHTML = `
                        <div class="destino-card__img">
                            ${d.badge ? `<span class="destino-card__badge">${d.badge}</span>` : ''}
                        </div>
                        <div class="destino-card__body">
                            <h3 class="destino-card__title">${d.nombre}</h3>
                            <p class="destino-card__desc">${d.descripcion}</p>
                            <div class="destino-card__meta">
                                <span><i class="fa-solid fa-location-dot"></i> ${d.ubicacion}</span>
                                <span class="destino-card__price">${d.precio}</span>
                            </div>
                            <a href="#contacto" class="btn btn--primary btn--sm">Consultar</a>
                        </div>
                    `;
                    destinosGrid.appendChild(article);
                });
            }
        }

        // Experiencias
        if (CONFIG.experiencias && CONFIG.experiencias.length > 0) {
            const experienciasGrid = document.querySelector('.experiencias__grid');
            if (experienciasGrid) {
                experienciasGrid.innerHTML = '';
                const aosDirections = ['fade-right', 'fade-up', 'fade-left'];
                CONFIG.experiencias.forEach((e, i) => {
                    const card = document.createElement('div');
                    card.className = 'experiencia-card';
                    card.setAttribute('data-aos', aosDirections[i % 3] || 'fade-up');
                    if (i > 0) card.setAttribute('data-aos-delay', String(i * 100));
                    card.innerHTML = `
                        <div class="experiencia-card__icon">
                            <i class="${e.icono}"></i>
                        </div>
                        <h3 class="experiencia-card__title">${e.titulo}</h3>
                        <p class="experiencia-card__desc">${e.descripcion}</p>
                    `;
                    experienciasGrid.appendChild(card);
                });
            }
        }

        // Nosotros
        const nosotrosTexts = document.querySelectorAll('.nosotros__text');
        if (nosotrosTexts.length >= 1 && CONFIG.nosotrosTexto1) {
            nosotrosTexts[0].textContent = CONFIG.nosotrosTexto1;
        }
        if (nosotrosTexts.length >= 2 && CONFIG.nosotrosTexto2) {
            nosotrosTexts[1].textContent = CONFIG.nosotrosTexto2;
        }
        if (CONFIG.nosotrosDiferenciadores && CONFIG.nosotrosDiferenciadores.length > 0) {
            const nosotrosList = document.querySelector('.nosotros__list');
            if (nosotrosList) {
                nosotrosList.innerHTML = '';
                CONFIG.nosotrosDiferenciadores.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${item}`;
                    nosotrosList.appendChild(li);
                });
            }
        }

        // Title del documento
        if (CONFIG.empresa) {
            document.title = `${CONFIG.empresa} | Destinos y Experiencias Únicas`;
        }
    }

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
    let testimonioCards = document.querySelectorAll('.testimonio-card');
    let dots = document.querySelectorAll('.testimonios__dot');
    const btnPrev = document.querySelector('.testimonios__btn--prev');
    const btnNext = document.querySelector('.testimonios__btn--next');
    let currentSlide = 0;

    function showSlide(index) {
        // Re-query in case they were rebuilt by config
        testimonioCards = document.querySelectorAll('.testimonio-card');
        dots = document.querySelectorAll('.testimonios__dot');

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

    // Bind dots (use event delegation)
    const dotsContainerEl = document.querySelector('.testimonios__dots');
    if (dotsContainerEl) {
        dotsContainerEl.addEventListener('click', (e) => {
            const dot = e.target.closest('.testimonios__dot');
            if (dot) {
                const allDots = [...dotsContainerEl.children];
                const index = allDots.indexOf(dot);
                if (index !== -1) showSlide(index);
            }
        });
    }

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
