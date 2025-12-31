// ====================================
// ASSIATOU SHOP - CUISINE GUINÉENNE
// JAVASCRIPT COMPLET - VERSION 1.0
// ====================================

(function() {
    'use strict';

    // =====================================
    // VARIABLES GLOBALES
    // =====================================
    const header = document.getElementById('header');
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // =====================================
    // NAVIGATION BURGER MENU (MOBILE)
    // =====================================
    function initBurgerMenu() {
        if (!burgerMenu || !navMenu) return;

        // Toggle menu au clic sur burger
        burgerMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // =====================================
    // HEADER STICKY AVEC SHADOW AU SCROLL
    // =====================================
    function initHeaderScroll() {
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Ajouter/retirer shadow selon scroll
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }

            lastScroll = currentScroll;
        });
    }

    // =====================================
    // SMOOTH SCROLL POUR ANCRES INTERNES
    // =====================================
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignorer les liens vides ou juste "#"
                if (!href || href === '#') return;

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // Offset pour le header sticky (hauteur du header + marge)
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // =====================================
    // BOUTON SCROLL TO TOP
    // =====================================
    function initScrollToTop() {
        if (!scrollTopBtn) return;

        // Afficher/masquer le bouton selon scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top au clic
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =====================================
    // ANIMATIONS AU SCROLL
    // =====================================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec la classe .animate-on-scroll
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        // Ajouter automatiquement la classe aux cards
        const cards = document.querySelectorAll('.signature-card, .testimonial-card, .step-card, .menu-item');
        cards.forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // =====================================
    // FAQ ACCORDÉON (OPTIONNEL)
    // =====================================
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (!question || !answer) return;

            // Masquer toutes les réponses par défaut (optionnel)
            // answer.style.display = 'none';

            question.addEventListener('click', function() {
                // Toggle la réponse
                const isOpen = answer.style.display === 'block';
                
                // Fermer toutes les autres réponses (accordéon exclusif)
                // faqItems.forEach(otherItem => {
                //     otherItem.querySelector('.faq-answer').style.display = 'none';
                // });

                // Ouvrir/fermer la réponse actuelle
                answer.style.display = isOpen ? 'none' : 'block';
                
                // Ajouter une classe pour styling
                item.classList.toggle('active');
            });
        });
    }

    // =====================================
    // LAZY LOADING IMAGES
    // =====================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Si l'image a un data-src, le charger
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }

                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // =====================================
    // PROTECTION CONTRE FERMETURE ACCIDENTELLE
    // =====================================
    function initFormProtection() {
        // Si vous ajoutez un formulaire de commande plus tard
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            let formModified = false;

            form.addEventListener('input', function() {
                formModified = true;
            });

            window.addEventListener('beforeunload', function(e) {
                if (formModified) {
                    e.preventDefault();
                    e.returnValue = '';
                }
            });

            form.addEventListener('submit', function() {
                formModified = false;
            });
        });
    }

    // =====================================
    // TRACKING LIENS TÉLÉPHONE & WHATSAPP
    // =====================================
    function initLinkTracking() {
        // Tracking des clics sur le numéro de téléphone
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Clic téléphone:', this.href);
                // Vous pouvez ajouter Google Analytics ici :
                // gtag('event', 'click', { 'event_category': 'Contact', 'event_label': 'Phone' });
            });
        });

        // Tracking des clics WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
        whatsappLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Clic WhatsApp:', this.href);
                // gtag('event', 'click', { 'event_category': 'Contact', 'event_label': 'WhatsApp' });
            });
        });
    }

    // =====================================
    // HOVER EFFECTS SUR IMAGES
    // =====================================
    function initImageHoverEffects() {
        const imageWrappers = document.querySelectorAll('.hero-image-wrapper, .signature-image');

        imageWrappers.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            if (!img) return;

            wrapper.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.1)';
            });

            wrapper.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1)';
            });
        });
    }

    // =====================================
    // PERFORMANCE : DEFER NON-CRITICAL JS
    // =====================================
    function deferNonCritical() {
        // Charger les ressources non-critiques après le chargement complet
        window.addEventListener('load', function() {
            // Exemple : charger Google Analytics après le load
            // loadGoogleAnalytics();
        });
    }

    // =====================================
    // UTILITAIRE : DÉTECTION MOBILE
    // =====================================
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // =====================================
    // UTILITAIRE : DÉTECTION TOUCH DEVICE
    // =====================================
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // =====================================
    // AJUSTER COMPORTEMENTS SELON DEVICE
    // =====================================
    function initDeviceAdaptations() {
        // Ajouter classe sur body selon device
        if (isTouchDevice()) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.add('no-touch');
        }

        // Désactiver hover effects sur touch devices
        if (isTouchDevice()) {
            document.body.classList.add('no-hover');
        }
    }

    // =====================================
    // GESTION ERREURS IMAGES
    // =====================================
    function initImageErrorHandling() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            img.addEventListener('error', function() {
                console.warn('Erreur chargement image:', this.src);
                
                // Optionnel : remplacer par image placeholder
                // this.src = '/path/to/placeholder.jpg';
                
                // Ou masquer l'image
                this.style.display = 'none';
            });
        });
    }

    // =====================================
    // CONSOLE LOG PERSONNALISÉ
    // =====================================
    function initConsoleMessage() {
        console.log('%c🌍 Assiatou Shop - Cuisine Guinéenne', 'font-size: 16px; font-weight: bold; color: #E8744F;');
        console.log('%cDéveloppé avec ❤️ pour partager les saveurs de la Guinée', 'font-size: 12px; color: #666;');
        console.log('%c📞 Commandez au 06 60 26 51 27', 'font-size: 14px; color: #2D5F3F; font-weight: bold;');
    }

    // =====================================
    // INITIALISATION AU CHARGEMENT DOM
    // =====================================
    function init() {
        // Initialiser tous les modules
        initBurgerMenu();
        initHeaderScroll();
        initSmoothScroll();
        initScrollToTop();
        initScrollAnimations();
        initFAQAccordion();
        initLazyLoading();
        initFormProtection();
        initLinkTracking();
        initImageHoverEffects();
        initDeviceAdaptations();
        initImageErrorHandling();
        initConsoleMessage();
        deferNonCritical();

        console.log('✅ Assiatou Shop JS initialisé');
    }

    // Lancer l'initialisation quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // =====================================
    // RESIZE HANDLER (DEBOUNCED)
    // =====================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            console.log('Window resized:', window.innerWidth);
            // Vous pouvez réinitialiser certains modules ici si nécessaire
        }, 250);
    });

})();

// ====================================
// FIN DU JAVASCRIPT
// ====================================
