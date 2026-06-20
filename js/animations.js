// ============================================
// ANIMATIONS.JS — GSAP-powered interactions
// ScrollTrigger reveals, card tilt, parallax
// Respects prefers-reduced-motion
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // Bail if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // HERO — Stagger content entry + parallax
    // ============================================
    const heroElements = gsap.utils.toArray('.hero__label, .hero__title, .hero__subtitle, .hero__cta');
    if (heroElements.length) {
        gsap.to(heroElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3
        });
    }

    const hero = document.querySelector('.hero');
    if (hero) {
        gsap.to('.hero__overlay', {
            opacity: 0.95,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // ============================================
    // SECTION TITLES — Reveal from below
    // ============================================
    gsap.utils.toArray('.section__title, .presentacion__title').forEach(title => {
        gsap.from(title, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                once: true
            }
        });
    });

    gsap.utils.toArray('.section__subtitle, .presentacion__desc').forEach(sub => {
        gsap.from(sub, {
            y: 24,
            opacity: 0,
            duration: 0.7,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sub,
                start: 'top 85%',
                once: true
            }
        });
    });

    // ============================================
    // SERVICIOS — Stagger entry + 3D tilt on hover
    // ============================================
    const servicioCards = gsap.utils.toArray('.servicio-card');
    if (servicioCards.length) {
        gsap.from(servicioCards, {
            y: 60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.servicios__grid',
                start: 'top 80%',
                once: true
            }
        });

        // 3D Tilt effect on hover
        servicioCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 800,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    // ============================================
    // DESTINOS — Scale + stagger entry
    // ============================================
    const destinoCards = gsap.utils.toArray('.destino-card');
    if (destinoCards.length) {
        gsap.from(destinoCards, {
            scale: 0.92,
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.destinos__grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    // ============================================
    // PRESENTACIÓN — Split reveal (text + image)
    // ============================================
    const presText = document.querySelector('.presentacion__text');
    const presImage = document.querySelector('.presentacion__image');

    if (presText) {
        gsap.from(presText, {
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.presentacion__container',
                start: 'top 75%',
                once: true
            }
        });
    }

    if (presImage) {
        gsap.from(presImage, {
            x: 40,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.presentacion__container',
                start: 'top 75%',
                once: true
            }
        });
    }

    // ============================================
    // TESTIMONIO — Fade scale on scroll entry
    // ============================================
    const testimonioQuote = document.querySelector('.testimonio__quote');
    if (testimonioQuote) {
        gsap.from(testimonioQuote, {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.testimonio',
                start: 'top 70%',
                once: true
            }
        });
    }

    // ============================================
    // GALLERY — Stagger scale reveal
    // ============================================
    const galeriaItems = gsap.utils.toArray('.galeria__item');
    if (galeriaItems.length) {
        gsap.from(galeriaItems, {
            scale: 0.88,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.galeria__grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    // ============================================
    // CONTACTO — Form slide in
    // ============================================
    const formWrapper = document.querySelector('.contacto__form-wrapper');
    const contactInfo = document.querySelector('.contacto__info');

    if (formWrapper) {
        gsap.from(formWrapper, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contacto__grid',
                start: 'top 75%',
                once: true
            }
        });
    }

    if (contactInfo) {
        gsap.from(contactInfo, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contacto__grid',
                start: 'top 75%',
                once: true
            }
        });
    }

    // ============================================
    // MAGNETIC BUTTONS — Subtle follow cursor
    // ============================================
    const magneticBtns = document.querySelectorAll('.btn--primary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });

    // ============================================
    // NAVBAR — Shrink on scroll
    // ============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: (self) => {
                if (self.direction === 1 && self.scroll() > 80) {
                    navbar.classList.add('navbar--compact');
                } else if (self.scroll() <= 80) {
                    navbar.classList.remove('navbar--compact');
                }
            }
        });
    }

    // ============================================
    // SVG DIVIDERS — Draw on scroll
    // ============================================
    gsap.utils.toArray('.divider-costa').forEach(svg => {
        const path = svg.querySelector('path');
        if (path) {
            gsap.from(path, {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 1.2,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: svg,
                    start: 'top 90%',
                    once: true
                }
            });
        }
    });

    // ============================================
    // PRESENTACIÓN CHECKS — Stagger items
    // ============================================
    const checkItems = gsap.utils.toArray('.presentacion__checks li');
    if (checkItems.length) {
        gsap.from(checkItems, {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.presentacion__checks',
                start: 'top 85%',
                once: true
            }
        });
    }

});
