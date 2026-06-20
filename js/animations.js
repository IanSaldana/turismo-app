// ============================================
// ANIMATIONS.JS — HyB Transporte y Turismo
// GSAP timelines, ScrollTrigger, SVG route
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Reduced Motion Check
    // ============================================
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        gsap.set('.hero__label, .hero__title, .hero__subtitle, .hero__ctas, .hero__scroll-indicator', { opacity: 1, y: 0 });
        gsap.set('.servicios__panel', { opacity: 1 });
        gsap.set('.diferenciador', { opacity: 1, y: 0 });
        gsap.set('.testimonio', { opacity: 1, y: 0 });
        gsap.set('.contacto__form .form-group, .contacto__form .btn', { opacity: 1, y: 0 });
        gsap.set('.whatsapp-btn', { opacity: 1, scale: 1, y: 0 });
        gsap.set('.section__header', { opacity: 1, y: 0 });
        return;
    }

    // ============================================
    // Register Plugins
    // ============================================
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ============================================
    // HERO — Orchestrated Timeline
    // ============================================
    const heroTL = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.2
    });

    heroTL
        .to('.hero__label', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero__title', { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .to('.hero__subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.hero__ctas', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.hero__scroll-indicator', { opacity: 1, duration: 0.4 }, '-=0.1');

    if (isMobile) {
        heroTL.timeScale(1.3);
    }

    // Hero parallax exit on scroll
    gsap.to('.hero__content', {
        y: -60,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
        }
    });

    // ============================================
    // NAVBAR — Transparent to Solid
    // ============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: 80,
            onEnter: () => {
                navbar.classList.remove('navbar--transparent');
                navbar.classList.add('navbar--solid');
                gsap.to('.navbar__logo-img--white', { opacity: 0, duration: 0.3 });
                gsap.to('.navbar__logo-img--dark', { opacity: 1, duration: 0.3 });
            },
            onLeaveBack: () => {
                navbar.classList.remove('navbar--solid');
                navbar.classList.add('navbar--transparent');
                gsap.to('.navbar__logo-img--white', { opacity: 1, duration: 0.3 });
                gsap.to('.navbar__logo-img--dark', { opacity: 0, duration: 0.3 });
            }
        });
    }

    // ============================================
    // SVG ROUTE LINE — Draw on scroll
    // ============================================
    function initRouteLine() {
        if (isMobile) return;

        const svg = document.querySelector('.route-line');
        const path = document.querySelector('.route-line__path');
        const stations = document.querySelectorAll('.route-line__station');
        if (!svg || !path) return;

        const pageHeight = document.body.scrollHeight;
        const pageWidth = window.innerWidth;

        svg.setAttribute('viewBox', `0 0 ${pageWidth} ${pageHeight}`);
        svg.style.height = `${pageHeight}px`;

        // Get section positions for the serpentine path
        const heroBottom = document.querySelector('.hero')?.offsetHeight || 800;
        const serviciosTop = document.getElementById('servicios')?.offsetTop || 900;
        const nosotrosTop = document.getElementById('nosotros')?.offsetTop || 2800;
        const testimoniosTop = document.getElementById('testimonios')?.offsetTop || 3600;
        const contactoTop = document.getElementById('contacto')?.offsetTop || 4400;

        // Generate serpentine path
        const cx = pageWidth * 0.5;
        const leftX = pageWidth * 0.15;
        const rightX = pageWidth * 0.85;

        const d = [
            `M ${cx} ${heroBottom * 0.7}`,
            `C ${cx} ${heroBottom}, ${leftX} ${heroBottom}, ${leftX} ${serviciosTop * 0.8}`,
            `C ${leftX} ${serviciosTop}, ${rightX} ${serviciosTop * 1.1}, ${rightX} ${nosotrosTop * 0.85}`,
            `C ${rightX} ${nosotrosTop}, ${leftX} ${nosotrosTop * 1.05}, ${leftX} ${testimoniosTop * 0.9}`,
            `C ${leftX} ${testimoniosTop}, ${rightX} ${testimoniosTop * 1.05}, ${rightX} ${contactoTop * 0.92}`,
            `C ${rightX} ${contactoTop}, ${cx} ${contactoTop * 1.02}, ${cx} ${contactoTop * 1.05}`
        ].join(' ');

        path.setAttribute('d', d);

        const pathLength = path.getTotalLength();
        path.style.setProperty('--route-length', pathLength);
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        // Animate path draw with scroll
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            }
        });

        // Position and animate station dots
        const stationPositions = [0.15, 0.35, 0.55, 0.75, 0.92];
        stations.forEach((station, i) => {
            if (stationPositions[i] !== undefined) {
                const point = path.getPointAtLength(pathLength * stationPositions[i]);
                station.setAttribute('cx', point.x);
                station.setAttribute('cy', point.y);

                gsap.to(station, {
                    scale: 1,
                    fill: 'var(--color-madera)',
                    duration: 0.4,
                    ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: 'body',
                        start: `${stationPositions[i] * 90}% center`,
                        toggleActions: 'play none none none'
                    }
                });
            }
        });
    }

    // Initialize route line after ScrollTrigger has set up pin spacers
    if (!isMobile) {
        ScrollTrigger.addEventListener('refresh', initRouteLine);
        setTimeout(() => ScrollTrigger.refresh(), 100);
    }

    // ============================================
    // SERVICIOS — Pinned ScrollTrigger
    // ============================================
    if (!isMobile) {
        const panels = gsap.utils.toArray('.servicios__panel');
        const progressFill = document.querySelector('.servicios__progress-fill');
        const counter = document.querySelector('.servicios__counter');

        if (panels.length > 1) {
            const pinTL = gsap.timeline({
                scrollTrigger: {
                    trigger: '.servicios__pin-wrapper',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3,
                    pin: '.servicios__container',
                    onUpdate: (self) => {
                        const progress = self.progress;
                        if (progressFill) {
                            gsap.set(progressFill, { scaleY: progress });
                        }
                        if (counter) {
                            const index = Math.min(Math.floor(progress * 3), 2);
                            counter.textContent = `0${index + 1}`;
                        }
                    }
                }
            });

            // Panel transitions
            pinTL
                .to(panels[0], { opacity: 0, y: -40, duration: 0.3 }, 0.28)
                .to(panels[1], { opacity: 1, y: 0, duration: 0.3 }, 0.33)
                .to(panels[1], { opacity: 0, y: -40, duration: 0.3 }, 0.61)
                .to(panels[2], { opacity: 1, y: 0, duration: 0.3 }, 0.66);
        }
    } else {
        // Mobile: show all panels, simple reveal
        gsap.set('.servicios__panel', { opacity: 1, position: 'relative' });
        gsap.utils.toArray('.servicios__panel').forEach(panel => {
            gsap.from(panel.querySelector('.servicios__text'), {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: panel,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    // ============================================
    // SECTION HEADERS — Reveal
    // ============================================
    gsap.utils.toArray('.section__header').forEach(header => {
        gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ============================================
    // DIFERENCIADORES — Stagger Reveal
    // ============================================
    const diferenciadores = gsap.utils.toArray('.diferenciador');
    if (diferenciadores.length) {
        gsap.to(diferenciadores, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.diferenciadores__grid',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }

    // ============================================
    // TESTIMONIOS — Individual Reveal
    // ============================================
    gsap.utils.toArray('.testimonio').forEach(quote => {
        gsap.to(quote, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: quote,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ============================================
    // CONTACTO — Form Fields Sequence
    // ============================================
    const formElements = gsap.utils.toArray('.contacto__form .form-group, .contacto__form .btn');
    if (formElements.length) {
        gsap.to(formElements, {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contacto__form',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }

    // ============================================
    // WHATSAPP — Delayed Entry + Pulse
    // ============================================
    gsap.to('.whatsapp-btn', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.5)',
        delay: 2.5
    });

    // Subtle pulse after entry
    gsap.to('.whatsapp-btn', {
        scale: 1.08,
        duration: 0.6,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 3.5
    });

    // Tooltip flash
    gsap.to('.whatsapp-btn__tooltip', {
        opacity: 1,
        duration: 0.3,
        delay: 3.5
    });
    gsap.to('.whatsapp-btn__tooltip', {
        opacity: 0,
        duration: 0.3,
        delay: 6
    });

    // ============================================
    // MOBILE MENU — Timeline (paused)
    // ============================================
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = gsap.utils.toArray('.mobile-menu__link');
    const menuFooter = document.querySelector('.mobile-menu__footer');

    if (mobileMenu) {
        const menuTL = gsap.timeline({ paused: true });
        menuTL
            .to(mobileMenu, { visibility: 'visible', opacity: 1, duration: 0.3, ease: 'power2.out' })
            .to(menuLinks, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out' }, '-=0.1')
            .to(menuFooter, { opacity: 1, duration: 0.3 }, '-=0.2');

        window.mobileMenuTL = menuTL;
    }

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    if (!isMobile) {
        document.querySelectorAll('.btn--primary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            });
        });
    }

});
