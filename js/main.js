// ============================================
// MAIN.JS — Briones Hernández
// Config-driven rendering, navigation, 
// testimonial rotation, form, lightbox
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // CONFIG → DOM Injection
    // ============================================
    if (typeof CONFIG !== 'undefined') {

        // Text: data-config="key" → textContent
        document.querySelectorAll('[data-config]').forEach(el => {
            const key = el.getAttribute('data-config');
            if (CONFIG[key] !== undefined) {
                el.textContent = CONFIG[key];
            }
        });

        // Links: data-config-href="key" → href
        document.querySelectorAll('[data-config-href]').forEach(el => {
            const key = el.getAttribute('data-config-href');
            if (CONFIG[key] !== undefined) {
                el.href = CONFIG[key];
            }
        });

        // WhatsApp button
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn && CONFIG.whatsappNumero) {
            const msg = encodeURIComponent(CONFIG.whatsappMensaje || '');
            whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumero}?text=${msg}`;
        }

        // Map iframe
        const mapaIframe = document.getElementById('mapaIframe');
        if (mapaIframe && CONFIG.mapaEmbed) {
            mapaIframe.src = CONFIG.mapaEmbed;
        }

        // Document title
        if (CONFIG.empresa) {
            document.title = `${CONFIG.empresa} | Turismo y Transporte en Calbuco`;
        }

        // ---- Generate: Servicios ----
        if (CONFIG.servicios && CONFIG.servicios.length > 0) {
            const grid = document.querySelector('.servicios__grid');
            if (grid) {
                grid.innerHTML = '';
                CONFIG.servicios.forEach(s => {
                    const card = document.createElement('article');
                    card.className = `servicio-card${s.destacado ? ' servicio-card--destacado' : ''}`;
                    card.innerHTML = `
                        <div class="servicio-card__icon">
                            <i class="${s.icono}"></i>
                        </div>
                        <h3 class="servicio-card__title">${s.titulo}</h3>
                        <p class="servicio-card__desc">${s.descripcion}</p>
                    `;
                    grid.appendChild(card);
                });
            }
        }

        // ---- Generate: Destinos ----
        if (CONFIG.destinos && CONFIG.destinos.length > 0) {
            const grid = document.querySelector('.destinos__grid');
            if (grid) {
                grid.innerHTML = '';
                CONFIG.destinos.forEach(d => {
                    const article = document.createElement('article');
                    article.className = `destino-card${d.destacado ? ' destino-card--destacado' : ''}`;
                    article.innerHTML = `
                        <div class="destino-card__img"></div>
                        <div class="destino-card__body">
                            <h3 class="destino-card__title">${d.nombre}</h3>
                            <p class="destino-card__desc">${d.descripcion}</p>
                            <div class="destino-card__meta">
                                <span class="destino-card__location"><i class="fa-solid fa-location-dot"></i> ${d.ubicacion}</span>
                                <span class="destino-card__coords">${d.coordenadas}</span>
                            </div>
                            <div class="destino-card__footer">
                                <span class="destino-card__distance">${d.distancia}</span>
                                <span class="destino-card__price">${d.precio}</span>
                            </div>
                        </div>
                    `;
                    grid.appendChild(article);
                });
            }
        }

        // ---- Generate: Nosotros diferenciadores ----
        if (CONFIG.nosotrosDiferenciadores && CONFIG.nosotrosDiferenciadores.length > 0) {
            const list = document.querySelector('.presentacion__checks');
            if (list) {
                list.innerHTML = '';
                CONFIG.nosotrosDiferenciadores.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${item}`;
                    list.appendChild(li);
                });
            }
        }

        // ---- Testimonial: single editorial, rotating ----
        if (CONFIG.testimonios && CONFIG.testimonios.length > 0) {
            const textEl = document.getElementById('testimonioText');
            const nameEl = document.getElementById('testimonioName');
            const originEl = document.getElementById('testimonioOrigin');

            if (textEl && nameEl && originEl) {
                let currentTestimonio = 0;

                function showTestimonio(index) {
                    const t = CONFIG.testimonios[index];
                    textEl.style.opacity = '0';
                    setTimeout(() => {
                        textEl.textContent = `\u201c${t.texto}\u201d`;
                        nameEl.textContent = t.nombre;
                        originEl.textContent = t.origen;
                        textEl.style.opacity = '1';
                    }, 300);
                }

                // Show first immediately
                const first = CONFIG.testimonios[0];
                textEl.textContent = `\u201c${first.texto}\u201d`;
                nameEl.textContent = first.nombre;
                originEl.textContent = first.origen;

                // Rotate every 8 seconds
                setInterval(() => {
                    currentTestimonio = (currentTestimonio + 1) % CONFIG.testimonios.length;
                    showTestimonio(currentTestimonio);
                }, 8000);
            }
        }
    }

    // ============================================
    // Navigation
    // ============================================

    // Mobile menu
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    document.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Scroll spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    function handleScrollSpy() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.navbar__link[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // SVG Coastline Animation
    // ============================================
    const costaLine = document.querySelector('.costa-draw__line');
    if (costaLine) {
        const length = costaLine.getTotalLength();
        costaLine.style.strokeDasharray = length;
        costaLine.style.strokeDashoffset = length;
        costaLine.style.transition = 'stroke-dashoffset 2s ease-out 0.5s';

        // Trigger after a small delay for paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                costaLine.style.strokeDashoffset = '0';
            });
        });
    }

    // ============================================
    // Gallery Lightbox
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.galeria__item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.galeria__img');
            if (img && lightbox && lightboxContent) {
                lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt || ''}">`;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ============================================
    // Contact Form
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

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

            // Email validation
            const emailField = contactForm.querySelector('#email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && !emailPattern.test(emailField.value)) {
                emailField.classList.add('error');
                valid = false;
            }

            if (!valid) return;

            // Submit to Netlify
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
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
            });
        });

        // Remove error on input
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => field.classList.remove('error'));
        });
    }

});
