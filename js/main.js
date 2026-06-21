// ============================================
// MAIN.JS — HyB Transporte y Turismo
// Config injection, navigation, form,
// dynamic content generation
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // CONFIG → DOM Injection
    // ============================================
    if (typeof CONFIG !== 'undefined') {

        document.querySelectorAll('[data-config]').forEach(el => {
            const key = el.getAttribute('data-config');
            if (CONFIG[key] !== undefined) {
                el.textContent = CONFIG[key];
            }
        });

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

        // Mobile WhatsApp link
        const mobileWa = document.getElementById('mobileWhatsapp');
        if (mobileWa && CONFIG.whatsappNumero) {
            const msg = encodeURIComponent(CONFIG.whatsappMensaje || '');
            mobileWa.href = `https://wa.me/${CONFIG.whatsappNumero}?text=${msg}`;
        }

        // Map iframe
        const mapaIframe = document.getElementById('mapaIframe');
        if (mapaIframe && CONFIG.mapaEmbed) {
            mapaIframe.src = CONFIG.mapaEmbed;
        }

        // ---- Inject: Service panel text from config ----
        document.querySelectorAll('[data-service]').forEach(panel => {
            const id = panel.getAttribute('data-service');
            const service = CONFIG.servicios.find(s => s.id === id);
            if (!service) return;
            const label = panel.querySelector('.servicios__label');
            const title = panel.querySelector('.servicios__title');
            const desc = panel.querySelector('.servicios__desc');
            const cta = panel.querySelector('.servicios__cta');
            if (label) label.textContent = service.titulo;
            if (title) title.textContent = service.subtitulo;
            if (desc) desc.textContent = service.descripcion;
            if (cta) cta.textContent = service.cta;
        });

        // ---- Generate: Service features ----
        document.querySelectorAll('[data-service-features]').forEach(ul => {
            const index = parseInt(ul.getAttribute('data-service-features'));
            const service = CONFIG.servicios[index];
            if (service && service.enfoque) {
                ul.innerHTML = '';
                service.enfoque.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });
            }
        });

        // ---- Generate: Service CTA WhatsApp links ----
        document.querySelectorAll('[data-service-cta]').forEach(btn => {
            const index = parseInt(btn.getAttribute('data-service-cta'));
            const service = CONFIG.servicios[index];
            if (service && CONFIG.whatsappNumero) {
                const msg = encodeURIComponent(service.whatsappMsg || CONFIG.whatsappMensaje);
                btn.href = `https://wa.me/${CONFIG.whatsappNumero}?text=${msg}`;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
            }
        });

        // ---- Generate: Diferenciadores (carousel) ----
        const diffGrid = document.getElementById('diferenciadoresGrid');
        const diffDots = document.getElementById('diferenciadorDots');
        if (diffGrid && CONFIG.diferenciadores) {
            diffGrid.innerHTML = '';
            CONFIG.diferenciadores.forEach((d, i) => {
                const item = document.createElement('div');
                item.className = 'diferenciador' + (i === 0 ? ' active' : '');
                item.innerHTML = `
                    <span class="diferenciador__numero">${d.numero}</span>
                    <div class="diferenciador__content">
                        <h3 class="diferenciador__label">${d.label}</h3>
                        <p class="diferenciador__detalle">${d.detalle}</p>
                    </div>
                `;
                diffGrid.appendChild(item);
            });

            if (diffDots) {
                diffDots.innerHTML = '';
                CONFIG.diferenciadores.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.className = 'diferenciadores__dot' + (i === 0 ? ' active' : '');
                    dot.setAttribute('aria-label', `Ver diferenciador ${i + 1}`);
                    dot.dataset.index = i;
                    diffDots.appendChild(dot);
                });
            }
        }

        // ---- Generate: Testimonios ----
        const testGrid = document.getElementById('testimoniosGrid');
        if (testGrid && CONFIG.testimonios) {
            testGrid.innerHTML = '';
            CONFIG.testimonios.forEach(t => {
                const block = document.createElement('blockquote');
                block.className = 'testimonio';
                block.innerHTML = `
                    <p class="testimonio__text">${t.texto}</p>
                    <footer class="testimonio__footer">
                        <cite class="testimonio__name">${t.nombre}</cite>
                        <span class="testimonio__contexto">${t.contexto}</span>
                    </footer>
                `;
                testGrid.appendChild(block);
            });
        }
    }

    // ============================================
    // Navigation — Smooth scroll with ScrollToPlugin
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 72 },
                    duration: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // ============================================
    // Scroll Spy
    // ============================================
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

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
        navToggle.classList.add('active');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (window.mobileMenuTL) window.mobileMenuTL.play();
    }

    function closeMenu() {
        menuOpen = false;
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        if (window.mobileMenuTL) {
            window.mobileMenuTL.reverse();
            setTimeout(() => {
                mobileMenu.setAttribute('aria-hidden', 'true');
            }, 500);
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            menuOpen ? closeMenu() : openMenu();
        });
    }

    // Close menu on link click
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                setTimeout(() => {
                    gsap.to(window, {
                        scrollTo: { y: target, offsetY: 72 },
                        duration: 1,
                        ease: 'power2.inOut'
                    });
                }, 400);
            }
        });
    });

    // ESC key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            closeMenu();
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

            const emailField = contactForm.querySelector('#email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && !emailPattern.test(emailField.value)) {
                emailField.classList.add('error');
                valid = false;
            }

            if (!valid) return;

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

        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => field.classList.remove('error'));
        });
    }

});
