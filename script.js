/* ----------------------------------------------------

   PORTFOLIO ENGINE - SCRIPT.JS

   ---------------------------------------------------- */

// Flag for CSS gating: reveal elements stay hidden ONLY when JS is alive.

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

    // 1. SYSTEM INITIALIZATION

    initPreloader();

    initTheme();

    initCustomCursor();

    initLenisScroll();

    initTypingEffect();

    initCareerObjectiveTyping();

    initMagneticButtons();

    initScrollAnimations();

    initStatsCounter();

    initScrollReveals();

    initTextReveals();

    initSkillsOrbit();

    initProjectSearchFilter();

    initCaseStudyModals();

    initCommandPalette();

    initDirectConnectEmail();

    initInteractiveTechField();

    initPortfolioChatbot();

});

/* ----------------------------------------------------
   PRELOADER CONTROLLER - Premium Curtain Split
   ---------------------------------------------------- */
function initPreloader() {
    const preloader = document.getElementById('premium-preloader');
    const fillEl = document.getElementById('loader-fill');
    const percentEl = document.getElementById('loader-percent');
    const statusEl = document.getElementById('loader-status');
    if (!preloader || !fillEl) return;

    const greetingName = document.querySelector('.intro-name');
    if (greetingName) {
        greetingName.innerHTML = [...greetingName.textContent].map((character, index) => {
            const letter = character === ' ' ? String.fromCharCode(160) : character;
            return `<span style="--char-index: ${index}">${letter}</span>`;
        }).join('');
    }

    const previousBodyOverflow = document.body.style.overflow;
    const keepPageAtTop = () => {
        if (!preloader.classList.contains('loaded')) window.scrollTo(0, 0);
    };

    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    window.addEventListener('scroll', keepPageAtTop, { passive: true });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let progress = 0;
    let targetProgress = 0;
    let progressFrame;
    let ready = false;

    function renderProgress() {
        progress += (targetProgress - progress) * (reducedMotion ? .35 : .08);
        if (Math.abs(targetProgress - progress) < .1) progress = targetProgress;
        fillEl.style.width = `${progress}%`;
        if (percentEl) percentEl.textContent = Math.round(progress);

        if (statusEl) {
            const status = progress < 34 ? 'Calibrating interface' : progress < 72 ? 'Assembling experience' : 'Opening portfolio';
            if (statusEl.textContent !== status) {
                statusEl.classList.remove('status-change');
                void statusEl.offsetWidth;
                statusEl.textContent = status;
                statusEl.classList.add('status-change');
            }
        }

        if (progress < 100) progressFrame = requestAnimationFrame(renderProgress);
        else markReady();
    }

    function markReady() {
        if (ready) return;
        ready = true;
        progress = targetProgress = 100;
        setTimeout(enterPortfolio, reducedMotion ? 120 : 320);
    }

    function enterPortfolio() {
        if (!ready || preloader.classList.contains('loaded')) return;
        preloader.classList.add('loaded');
        window.removeEventListener('scroll', keepPageAtTop);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (progressFrame) cancelAnimationFrame(progressFrame);

        if (window.gsap) {
            const heroEntrance = gsap.timeline({ delay: 0.1, defaults: { overwrite: 'auto' } });

            // 1. Hero Profile Visual Stage & Core Avatar start blooming
            heroEntrance.fromTo('.hero-profile-orbit-stage',
                { y: 35, scale: 0.85, opacity: 0 },
                { y: 0, scale: 1, opacity: 1, duration: 0.95, ease: 'power4.out' }
            );

            heroEntrance.fromTo('.profile-avatar-core',
                { scale: 0.88, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(1.4)' },
                '-=.75'
            );

            // 2. Left side text begins IMMEDIATELY in parallel overlap - NO WAITING GAP!
            heroEntrance.fromTo('.hero-badge',
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
                '-=.8'
            );

            heroEntrance.fromTo('.title-sub',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65, ease: 'power4.out' },
                '-=.45'
            );

            heroEntrance.fromTo('.title-name',
                { y: 48, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.85, ease: 'power4.out' },
                '-=.48'
            );

            // 3. Orbit rings & sparkles bloom in background rhythm
            heroEntrance.fromTo('.profile-orbit-ring',
                { scale: 0.72, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.75, stagger: 0.07, ease: 'power3.out' },
                '-=.75'
            );

            heroEntrance.fromTo('.sparkle',
                { scale: 0.35, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.8)' },
                '-=.65'
            );

            // 4. Job Subtitle, Description & CTA buttons follow in fluid rhythm
            heroEntrance.fromTo('.hero-subtitle',
                { y: 22, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
                '-=.6'
            );

            heroEntrance.fromTo('.hero-description',
                { y: 22, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                '-=.5'
            );

            // 5. CTA Buttons Staggered Spring Reveal
            heroEntrance.set('.hero-ctas', { opacity: 1, y: 0 });

            heroEntrance.fromTo('.hero-ctas .btn',
                { y: 24, opacity: 0, scale: 0.94 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.5)' },
                '-=.5'
            );

            heroEntrance.fromTo('.hero-ctas .btn i',
                { x: -5, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.35, stagger: 0.12, ease: 'power3.out' },
                '-=.55'
            );

            // Remaining reveal elements
            heroEntrance.fromTo('.reveal-item:not(.hero-badge):not(.hero-title):not(.hero-subtitle):not(.hero-description):not(.hero-ctas):not(.hero-visual)',
                { y: 25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.75, stagger: 0.07, ease: 'power3.out' },
                '-=.4'
            );
        } else {
            document.querySelectorAll('.reveal-item').forEach(el => el.style.opacity = '1');
        }

        setTimeout(() => {
            preloader.style.display = 'none';
            if (window.ScrollTrigger) {
                ScrollTrigger.refresh();
            }
        }, reducedMotion ? 80 : 1250);
    }

    preloader.addEventListener('pointermove', event => {
        preloader.style.setProperty('--loader-x', `${event.clientX / window.innerWidth * 100}%`);
        preloader.style.setProperty('--loader-y', `${event.clientY / window.innerHeight * 100}%`);
    }, { passive: true });

    window.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && ready) { event.preventDefault(); enterPortfolio(); } }, { passive: false });
    window.addEventListener('wheel', event => { if (!preloader.classList.contains('loaded')) { event.preventDefault(); targetProgress = Math.min(100, targetProgress + 3); } }, { passive: false });
    const loadingInterval = setInterval(() => { targetProgress = Math.min(100, targetProgress + (reducedMotion ? 10 : 5.2)); if (targetProgress >= 100) clearInterval(loadingInterval); }, reducedMotion ? 80 : 100);
    progressFrame = requestAnimationFrame(renderProgress);

    // Fail-safe release timer to guarantee page is 100% unlocked on all mobile devices
    setTimeout(() => {
        if (!preloader.classList.contains('loaded')) {
            enterPortfolio();
        }
        window.removeEventListener('scroll', keepPageAtTop);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }, 2200);
}

/* ----------------------------------------------------

    DARK THEME SWITCHER

    ---------------------------------------------------- */

function initTheme() {

    const themeBtn = document.getElementById('theme-btn');

    const themeBtnMobile = document.getElementById('theme-btn-mobile');

    const body = document.body;

    const savedTheme = localStorage.getItem('theme');

    const currentTheme = savedTheme === 'midnight' ? 'midnight' : 'dark';

    applyTheme(currentTheme);

    function toggleTheme() {

        const nextTheme = body.classList.contains('midnight-theme') ? 'dark' : 'midnight';

        applyTheme(nextTheme);

        showToast(`Theme switched to ${nextTheme} mode`, 'info');

    }

    function applyTheme(theme) {

        body.classList.remove('light-theme', 'midnight-theme');

        if (theme === 'midnight') body.classList.add('midnight-theme');

        localStorage.setItem('theme', theme);

        updateThemeIcons(theme);

    }

    function updateThemeIcons(theme) {

        const iconClass = theme === 'midnight' ? 'fa-cloud-moon' : 'fa-moon';

        const nextLabel = theme === 'midnight' ? 'Switch to Obsidian Theme' : 'Switch to Midnight Theme';

        if (themeBtn) {

            themeBtn.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

            themeBtn.setAttribute('aria-label', nextLabel);

        }

        if (themeBtnMobile) {

            themeBtnMobile.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${nextLabel}`;

            themeBtnMobile.setAttribute('aria-label', nextLabel);

        }

    }

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

}

/* ----------------------------------------------------

   CUSTOM CURSOR CONTROLLER

   ---------------------------------------------------- */

function initCustomCursor() {
    if (window.innerWidth <= 768 || 'ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) {
        return;
    }
    const glow = document.getElementById('cursor-glow');

    const dot = document.getElementById('cursor-dot');

    if (!glow || !dot) return;

    let mouseX = -100;

    let mouseY = -100;

    let glowX = -100;

    let glowY = -100;

    let dotX = -100;

    let dotY = -100;

    let hasMouse = false;

    window.addEventListener('mousemove', (e) => {

        if (!hasMouse) {

            hasMouse = true;

            document.body.classList.add('mouse-active');

        }

        mouseX = e.clientX;

        mouseY = e.clientY;

    }, { passive: true });

    // Inertial motion frame updates (60/120 FPS compositor hardware acceleration)

    function updateCursor() {

        glowX += (mouseX - glowX) * 0.12;

        glowY += (mouseY - glowY) * 0.12;

        glow.style.transform = `translate3d(${glowX.toFixed(1)}px, ${glowY.toFixed(1)}px, 0) translate(-50%, -50%)`;

        dotX += (mouseX - dotX) * 0.35;

        dotY += (mouseY - dotY) * 0.35;

        dot.style.transform = `translate3d(${dotX.toFixed(1)}px, ${dotY.toFixed(1)}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(updateCursor);

    }

    requestAnimationFrame(updateCursor);

    // Add hover listener mappings

    const hoverTargets = 'a, button, input, textarea, .skill-satellite, .project-card, kbd, .cmd-option';

    document.addEventListener('mouseover', (e) => {

        if (e.target.closest(hoverTargets)) {

            document.body.classList.add('hover-state');

        }

    }, { passive: true });

    document.addEventListener('mouseout', (e) => {

        if (e.target.closest(hoverTargets)) {

            document.body.classList.remove('hover-state');

        }

    }, { passive: true });

}

/* ----------------------------------------------------

   LENIS SMOOTH SCROLL INTEGRATION

   ---------------------------------------------------- */

let lenisInstance = null;

function initLenisScroll() {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress');
    let lastScrollTop = 0;

    const isTouchMobile = window.innerWidth <= 1024 || 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

    if (!isTouchMobile && typeof Lenis !== 'undefined') {
        lenisInstance = new Lenis({
            duration: 1.15,

            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

            smoothWheel: true,

            smoothTouch: false,

            wheelMultiplier: 1.0,

            touchMultiplier: 1.5,

            autoRaf: true

        });

        if (window.ScrollTrigger) {
            lenisInstance.on('scroll', ScrollTrigger.update);
            window.addEventListener('scroll', () => {
                ScrollTrigger.update();
            }, { passive: true });
            if (window.gsap) {
                gsap.ticker.lagSmoothing(0);
            }
        }

        // Lenis-synchronized scroll listener (frame-locked, 0 jitter)

        lenisInstance.on('scroll', (e) => {

            const scrollTop = e.scroll;

            const progress = e.progress;

            if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

            if (scrollTop > 150) {

                if (scrollTop > lastScrollTop) {

                    navbar.classList.add('hidden');

                } else {

                    navbar.classList.remove('hidden');

                }

            } else {

                navbar.classList.remove('hidden');

            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        });

    } else {

        // High-performance fallback for native scroll with RAF throttling

        let ticking = false;

        window.addEventListener('scroll', () => {

            if (!ticking) {

                requestAnimationFrame(() => {

                    const scrollTop = window.scrollY || document.documentElement.scrollTop;

                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

                    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

                    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

                    if (scrollTop > 150) {

                        if (scrollTop > lastScrollTop) {

                            navbar.classList.add('hidden');

                        } else {

                            navbar.classList.remove('hidden');

                        }

                    } else {

                        navbar.classList.remove('hidden');

                    }

                    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

                    ticking = false;

                });

                ticking = true;

            }

        }, { passive: true });

    }

}

/* ----------------------------------------------------

   HERO TYPING EFFECT

   ---------------------------------------------------- */

function initTypingEffect() {

    const target = document.getElementById('typing-text');

    if (!target) return;

    const phrases = [

        "I am an AI Developer",

        "I had been a Data Analytics Intern",

        "I had been a UI/UX Design Intern",

        "I had been a Web Development Intern"

    ];

    let phraseIndex = 0;

    let charIndex = phrases[0].length;

    let isDeleting = true;

    function type() {

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {

            target.textContent = currentPhrase.substring(0, charIndex - 1);

            charIndex--;

        } else {

            target.textContent = currentPhrase.substring(0, charIndex + 1);

            charIndex++;

        }

        let typeSpeed = isDeleting ? 30 : 70;

        if (!isDeleting && charIndex === currentPhrase.length) {

            typeSpeed = 2200; // Comfortable pause to read completed title

            isDeleting = true;

        } else if (isDeleting && charIndex === 0) {

            isDeleting = false;

            phraseIndex = (phraseIndex + 1) % phrases.length;

            typeSpeed = 400; // Brief pause before typing next title

        }

        setTimeout(type, typeSpeed);

    }

    // Initial pause before cycling through titles

    setTimeout(type, 2000);

}

/* ----------------------------------------------------

   CAREER OBJECTIVE - Accessible expandable panel

   ---------------------------------------------------- */

function initCareerObjectiveTyping() {

    const objective = document.getElementById('career-objective');

    const toggle = objective?.querySelector('.career-objective-toggle');

    const panel = document.getElementById('career-objective-panel');

    if (!objective || !toggle || !panel) return;

    toggle.addEventListener('click', () => {

        const isOpen = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', String(!isOpen));

        objective.classList.toggle('is-open', !isOpen);

        panel.classList.remove('panel-reveal');

        panel.hidden = isOpen;

        if (!isOpen) {

            void panel.offsetWidth;

            panel.classList.add('panel-reveal');

        }

    });

}

/* ----------------------------------------------------

   SCROLL-REVEAL OBSERVER (reveal-item / reveal-left / reveal-right)

   ---------------------------------------------------- */

function initScrollReveals() {

    const items = document.querySelectorAll('.reveal-item:not(#hero *), .reveal-left, .reveal-right, .reveal-up, .journey-reveal-item');

    if (!items.length) return;

    // Fallback: reveal everything if IO is unsupported

    if (!('IntersectionObserver' in window)) {

        items.forEach(el => el.classList.add('active', 'is-visible', 'settled'));

        return;

    }

    const settleTimers = new Map();

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const el = entry.target;

            if (entry.isIntersecting) {

                // Replay entrance whenever reached

                el.classList.add('active', 'is-visible');

                // Start organic floating animation once the reveal transition completes

                const timer = setTimeout(() => {

                    el.classList.add('settled');

                    settleTimers.delete(el);

                }, 850);

                settleTimers.set(el, timer);

            } else {

                // Reset state when scrolling away so animation repeats on re-entry

                el.classList.remove('active', 'is-visible', 'settled');

                const timer = settleTimers.get(el);

                if (timer) {

                    clearTimeout(timer);

                    settleTimers.delete(el);

                }

            }

        });

    }, { threshold: 0.12 });

    items.forEach(el => {

        el.style.willChange = 'transform, opacity';

        observer.observe(el);

    });

    // Contact cards replay their directional entrance whenever the section returns.

    const contactReplayItems = document.querySelectorAll('.contact-replay');

    if (contactReplayItems.length && 'IntersectionObserver' in window) {

        const contactReplayObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                entry.target.classList.toggle('active', entry.isIntersecting);

                entry.target.classList.toggle('is-visible', entry.isIntersecting);

            });

        }, { threshold: 0.25 });

        contactReplayItems.forEach(el => contactReplayObserver.observe(el));

    }

    // Slide-from-left observer (re-triggers on every scroll in/out)

    const slideItems = document.querySelectorAll('.slide-from-left, .slide-stat');

    if (slideItems.length && 'IntersectionObserver' in window) {

        const settleTimers = new Map();

        const slideObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('appear');

                    const settleTimer = setTimeout(() => {

                        entry.target.classList.add('settled');

                        settleTimers.delete(entry.target);

                    }, 850);

                    settleTimers.set(entry.target, settleTimer);

                } else {

                    entry.target.classList.remove('appear');

                    entry.target.classList.remove('settled');

                    const settleTimer = settleTimers.get(entry.target);

                    if (settleTimer) {

                        clearTimeout(settleTimer);

                        settleTimers.delete(entry.target);

                    }

                }

            });

        }, { threshold: 0.15 });

        slideItems.forEach(el => slideObserver.observe(el));

    }

    // Slide-academic observer

    const academicItems = document.querySelectorAll('.slide-academic');

    if (academicItems.length && 'IntersectionObserver' in window) {

        const academicObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('appear');

                    setTimeout(() => entry.target.classList.add('settled'), 850);

                } else {

                    entry.target.classList.remove('appear', 'settled');

                }

            });

        }, { threshold: 0.15 });

        academicItems.forEach(el => academicObserver.observe(el));

    }

    // Project card reveal (replays whenever reached)

    const projectRevealItems = document.querySelectorAll('.project-reveal');

    if (projectRevealItems.length) {

        if (!('IntersectionObserver' in window)) {

            projectRevealItems.forEach(el => el.classList.add('project-reveal-visible'));

        } else {

            const projectRevealObserver = new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    entry.target.classList.toggle('project-reveal-visible', entry.isIntersecting);

                });

            }, { threshold: 0.12 });

            projectRevealItems.forEach(el => projectRevealObserver.observe(el));

        }

    }

}

/* ----------------------------------------------------

   BODY COPY REVEALS - Paragraph-level reading rhythm

   ---------------------------------------------------- */

function initTextReveals() {

    const paragraphs = document.querySelectorAll('#main-content p:not(.hero-description)');

    if (!paragraphs.length) return;

    const parentCounts = new Map();

    paragraphs.forEach((paragraph) => {

        const parent = paragraph.parentElement;

        const position = parentCounts.get(parent) || 0;

        parentCounts.set(parent, position + 1);

        paragraph.classList.add('text-reveal');

        paragraph.style.setProperty('--text-delay', `${Math.min(position * 90, 180)}ms`);

    });

    if (!('IntersectionObserver' in window)) {

        paragraphs.forEach(paragraph => paragraph.classList.add('is-visible'));

        return;

    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            entry.target.classList.toggle('is-visible', entry.isIntersecting);

        });

    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    paragraphs.forEach(paragraph => observer.observe(paragraph));

}

/* ----------------------------------------------------

   MAGNETIC BUTTONS ENGINE

   ---------------------------------------------------- */

function initMagneticButtons() {
    if (window.innerWidth <= 1024 || 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)) {
        return; // Bypass magnetic mouse cursor physics on touch mobile
    }

    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {

        let frame = null;

        let rect = null;

        btn.addEventListener('mouseenter', () => {

            rect = btn.getBoundingClientRect();

        });

        btn.addEventListener('mousemove', (e) => {

            if (!rect) rect = btn.getBoundingClientRect();

            if (frame) return;

            frame = requestAnimationFrame(() => {

                frame = null;

                const x = e.clientX - rect.left - rect.width / 2;

                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;

                const inner = btn.querySelector('span') || btn.querySelector('i');

                if (inner) {

                    inner.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0)`;

                }

            });

        }, { passive: true });

        btn.addEventListener('mouseleave', () => {

            if (frame) cancelAnimationFrame(frame);

            frame = null;

            rect = null;

                btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;

            const inner = btn.querySelector('span') || btn.querySelector('i');

            if (inner) {

                    inner.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0)`;

            }

        });

    });

}

/* ----------------------------------------------------

   SCROLL TRIGGERS & REVEAL ANIMATIONS

   ---------------------------------------------------- */

function initScrollAnimations() {

    // Mobile Drawer navigation

    const mobileToggle = document.getElementById('mobile-toggle');

    const mobileDrawer = document.getElementById('mobile-drawer');

    const drawerLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileToggle && mobileDrawer) {

        mobileToggle.addEventListener('click', () => {

            mobileToggle.classList.toggle('active');

            mobileDrawer.classList.toggle('open');

            // Toggle hamburger icon lines shape

            const spans = mobileToggle.querySelectorAll('span');

            if (mobileDrawer.classList.contains('open')) {

                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';

                spans[1].style.opacity = '0';

                spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';

            } else {

                spans[0].style.transform = 'none';

                spans[1].style.opacity = '1';

                spans[2].style.transform = 'none';

            }

        });

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileDrawer.classList.contains('open')) {
                    mobileToggle.click();
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (mobileDrawer.classList.contains('open') && 
                !mobileDrawer.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                mobileToggle.click();
            }
        });

    }

    // High-performance ScrollSpy active link tracking with cached section metrics

    const sections = Array.from(document.querySelectorAll('section'));

    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    let sectionPositions = [];

    function updateSectionPositions() {

        sectionPositions = sections.map(sec => ({

            id: sec.getAttribute('id'),

            top: sec.offsetTop

        }));

    }

    updateSectionPositions();

    window.addEventListener('resize', updateSectionPositions, { passive: true });

    let spyTicking = false;

    function checkScrollSpy() {

        const scrollY = window.scrollY || window.pageYOffset;

        let current = '';

        for (let i = 0; i < sectionPositions.length; i++) {

            const sec = sectionPositions[i];

            if (scrollY >= sec.top - 240) {

                current = sec.id;

            }

        }

        navLinks.forEach(link => {

            const href = link.getAttribute('href');

            if (href) {

                const match = href.substring(1) === current;

                if (link.classList.contains('active') !== match) {

                    link.classList.toggle('active', match);

                }

            }

        });

        spyTicking = false;

    }

    if (lenisInstance) {

        lenisInstance.on('scroll', checkScrollSpy);

    } else {

        window.addEventListener('scroll', () => {

            if (!spyTicking) {

                requestAnimationFrame(checkScrollSpy);

                spyTicking = true;

            }

        }, { passive: true });

    }

    // GSAP ScrollTrigger Animations

    if (window.gsap && window.ScrollTrigger) {

        gsap.registerPlugin(ScrollTrigger);

        // Animate Timeline Items (Academic Journey / Internships cards)
        const academicCards = gsap.utils.toArray('.academic-card');

        if (academicCards.length) {
            academicCards.forEach((card, index) => {
                const parentItem = card.closest('.timeline-item') || card;
                gsap.fromTo(card,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.75,
                        delay: index * 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: parentItem,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                            once: true
                        }
                    }
                );
            });
        }

        // Timeline dots

        gsap.utils.toArray('.timeline-dot').forEach(dot => {

            gsap.fromTo(dot,

                { scale: 0 },

                {

                    scale: 1,

                    duration: 0.5,

                    ease: 'back.out(2)',

                    scrollTrigger: {

                        trigger: dot,

                        start: 'top 85%',

                        toggleActions: (window.innerWidth <= 768 || 'ontouchstart' in window) ? 'play none none none' : 'play reverse play reverse'

                    }

                }

            );

        });

        // Section header reveal: tag slides in, title unveils via clip mask

        gsap.utils.toArray('.section-header').forEach(header => {

            const tag = header.querySelector('.section-tag');

            const title = header.querySelector('.section-title');

            if (!title) return;

            const tl = gsap.timeline({

                scrollTrigger: {

                    trigger: header,

                    start: 'top 85%',

                    toggleActions: (window.innerWidth <= 768 || 'ontouchstart' in window) ? 'play none none none' : 'play reverse play reverse'

                }

            });

            tl.fromTo(tag, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0)

              .fromTo(title, { clipPath: 'inset(0 0 100% 0)', yPercent: 60, opacity: 0 }, { clipPath: 'inset(0 0 0% 0)', yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, 0.08);

        });

        // Sub-heading fade-up reveals

        gsap.utils.toArray('.narrative-heading, .merit-subheading').forEach(h => {

            gsap.fromTo(h,

                { y: 24, opacity: 0 },

                {

                    y: 0,

                    opacity: 1,

                    duration: 0.8,

                    ease: 'power3.out',

                    scrollTrigger: {

                        trigger: h,

                        start: 'top 85%',

                        toggleActions: (window.innerWidth <= 768 || 'ontouchstart' in window) ? 'play none none none' : 'play reverse play reverse'

                    }

                }

            );

        });

        // Awards & Publications cinematic clip reveal

        gsap.utils.toArray('.award-reveal-item').forEach((item, i) => {

            const card = item.querySelector('.award-card, .publication-card, .cert-card');

            if (!card) return;

            gsap.fromTo(card,

                { y: 90, opacity: 0, scale: 0.92 },

                {

                    y: 0,

                    opacity: 1,

                    scale: 1,

                    duration: 1,

                    ease: 'power3.out',

                    delay: Math.min(i, 6) * 0.07,

                    scrollTrigger: {

                        trigger: item,

                        start: 'top 88%',

                        toggleActions: (window.innerWidth <= 768 || 'ontouchstart' in window) ? 'play none none none' : 'play reverse play reverse'

                    }

                }

            );

        });

    } else {

        // Fallback layout reveals using standard class injections

        const observerOptions = {

            threshold: 0.15,

            rootMargin: '0px 0px -50px 0px'

        };

        const revealObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = '1';

                    entry.target.style.transform = 'translateY(0)';

                } else {

                    entry.target.style.opacity = '0';

                    entry.target.style.transform = 'translateY(25px)';

                }

            });

        }, observerOptions);

        document.querySelectorAll('.timeline-content, .award-card, .publication-card, .cert-card').forEach(el => {

            el.style.opacity = '0';

            el.style.transform = 'translateY(25px)';

            el.style.transition = 'opacity 0.8s ease, transform 0.8s var(--ease-spring)';

            revealObserver.observe(el);

        });

    }

    // Cursor-tracking spotlight for award cards

    document.querySelectorAll('.award-reveal-item').forEach(card => {

        let frame = null;

        card.addEventListener('mousemove', (e) => {

            if (frame) return;

            frame = requestAnimationFrame(() => {

                frame = null;

                const rect = card.getBoundingClientRect();

                card.style.setProperty('--mx', `${e.clientX - rect.left}px`);

                card.style.setProperty('--my', `${e.clientY - rect.top}px`);

            });

        }, { passive: true });

    });

}

/* ----------------------------------------------------

   STATS COUNTER CONTROLLER

   ---------------------------------------------------- */

function initStatsCounter() {

    const stats = document.querySelectorAll('.stat-num');

    const runningTimers = new Map();

    const countObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const target = entry.target;

            const value = parseInt(target.getAttribute('data-val'));

            const suffix = target.getAttribute('data-suffix') || '';

            if (entry.isIntersecting) {

                if (runningTimers.has(target)) {

                    clearInterval(runningTimers.get(target));

                    runningTimers.delete(target);

                }

                let current = 0;

                target.textContent = '0' + suffix;

                const duration = 1200; // ms

                const steps = 30;

                const stepVal = value / steps;

                const stepTime = duration / steps;

                const interval = setInterval(() => {

                    current += stepVal;

                    if (current >= value) {

                        current = value;

                        clearInterval(interval);

                        runningTimers.delete(target);

                    }

                    target.textContent = Math.floor(current) + (current >= value ? suffix : '');

                }, stepTime);

                runningTimers.set(target, interval);

            } else {

                if (runningTimers.has(target)) {

                    clearInterval(runningTimers.get(target));

                    runningTimers.delete(target);

                }

                target.textContent = '0' + suffix;

            }

        });

    }, { threshold: 0.3 });

    stats.forEach(stat => countObserver.observe(stat));

}

/* ----------------------------------------------------

   INTERACTIVE SKILLS ORBIT ENGINE

   ---------------------------------------------------- */

function initSkillsOrbit() {

    const satellites = document.querySelectorAll('.skill-satellite');

    const tabButtons = document.querySelectorAll('.skill-tab-btn');

    const panes = document.querySelectorAll('.skills-pane');

    const rings = document.querySelectorAll('.sat-ring');

    const core = document.getElementById('skill-core');

    const detailCard = document.getElementById('node-detail-card');

    const detailTag = document.getElementById('node-detail-tag');

    const detailTitle = document.getElementById('node-detail-title');

    const detailChips = document.getElementById('node-detail-chips');

    const detailClose = document.getElementById('node-detail-close');

    const CATEGORY_NAMES = {

        ai: 'AI, ML & Libraries',

        prog: 'Programming & Web',

        viz: 'Data Visualization & BI',

        design: 'Design & Prototyping',

        tools: 'Developer Tools'

    };

    let resumeTimer = null;

    // Per-chip stagger delay for reveal transitions (0.08s apart, capped at 0.3s)

    panes.forEach(pane => {

        pane.querySelectorAll('.skill-chip').forEach((chip, i) => {

            chip.style.setProperty('--delay', `${Math.min(i * 0.08, 0.3)}s`);

        });

    });

    // Replay the staggered chip entrance for the given pane

    function replayChipEntrance(id) {

        const pane = document.getElementById(`pane-${id}`);

        if (!pane) return;

        const chips = pane.querySelectorAll('.skill-chip');

        // Re-apply capped stagger delays (the reveal observer strips --delay after first entry)

        chips.forEach((chip, i) => chip.style.setProperty('--delay', `${Math.min(i * 0.08, 0.3)}s`));

        chips.forEach(chip => chip.classList.remove('active'));

        requestAnimationFrame(() => {

            chips.forEach(chip => chip.classList.add('active'));

        });

    }

    // Pause / resume the orbit rotation

    function setOrbitPaused(paused) {

        rings.forEach(ring => ring.classList.toggle('paused', paused));

    }

    // Show the glass detail card in the center with the category's skills

    function openDetailCard(category) {

        if (!detailCard) return;

        const pane = document.getElementById(`pane-${category}`);

        if (!pane) return;

        detailTag.textContent = CATEGORY_NAMES[category];

        detailTitle.textContent = pane.querySelector('.pane-title').textContent;

        const chipTexts = Array.from(pane.querySelectorAll('.skill-chip')).map(chip => chip.textContent.trim());

        detailChips.innerHTML = chipTexts.map(text => `<span class="node-detail-chip">${text}</span>`).join('');

        detailCard.classList.add('open');

        setOrbitPaused(true);

    }

    // Hide the detail card and resume the orbit

    function closeDetailCard() {

        if (detailCard) detailCard.classList.remove('open');

        setOrbitPaused(false);

        satellites.forEach(sat => sat.classList.remove('active'));

    }

    function activateSkillTab(id, replayEntrance = false) {

        // Toggle tab buttons

        tabButtons.forEach(btn => {

            btn.classList.toggle('active', btn.getAttribute('data-target') === id);

        });

        // Toggle panes

        panes.forEach(pane => {

            pane.classList.toggle('active', pane.getAttribute('id') === `pane-${id}`);

        });

        // Highlight active satellite

        satellites.forEach(sat => {

            sat.classList.toggle('active', sat.getAttribute('data-category') === id);

        });

        // Staggered fade-in for the newly displayed pills

        if (replayEntrance) replayChipEntrance(id);

    }

    // Clicking a satellite opens its category, pauses the orbit, and shows the detail card

    satellites.forEach(satellite => {

        satellite.addEventListener('click', () => {

            clearTimeout(resumeTimer);

            const category = satellite.getAttribute('data-category');

            activateSkillTab(category, true);

            openDetailCard(category);

            showToast(`${CATEGORY_NAMES[category]} selected`, 'info');

        });

    });

    // On touch, pause the orbit the moment a node is touched so the tap lands

    satellites.forEach(satellite => {

        satellite.addEventListener('touchstart', () => {

            if (!detailCard || !detailCard.classList.contains('open')) {

                setOrbitPaused(true);

                clearTimeout(resumeTimer);

                resumeTimer = setTimeout(() => {

                    if (!detailCard.classList.contains('open')) setOrbitPaused(false);

                }, 1200);

            }

        });

    });

    // Clicking the core resumes the orbit and closes the detail card

    if (core) {

        core.addEventListener('click', closeDetailCard);

    }

    // Close button on the detail card

    if (detailClose) {

        detailClose.addEventListener('click', (e) => {

            e.stopPropagation();

            closeDetailCard();

        });

    }

    // Pause the orbit while hovering a node so it stops moving and is easy to tap

    satellites.forEach(satellite => {

        satellite.addEventListener('mouseenter', () => {

            if (!detailCard || !detailCard.classList.contains('open')) setOrbitPaused(true);

        });

        satellite.addEventListener('mouseleave', () => {

            if (!detailCard || !detailCard.classList.contains('open')) setOrbitPaused(false);

        });

    });

    // Clicking a tab opens its category (and syncs the card if it is open)

    tabButtons.forEach(btn => {

        btn.addEventListener('click', () => {

            const target = btn.getAttribute('data-target');

            activateSkillTab(target, true);

            if (detailCard && detailCard.classList.contains('open')) openDetailCard(target);

        });

    });

    // Preselect the first category on load

    activateSkillTab('ai');

}

/* ----------------------------------------------------

   PROJECT CARD TILT & SEARCH / FILTER ENGINE

   ---------------------------------------------------- */

function initProjectSearchFilter() {

    const searchInput = document.getElementById('project-search');

    const filterButtons = document.querySelectorAll('.filter-btn');

    const projectCards = document.querySelectorAll('.project-card');

    if (!searchInput) return;

    // Keyup search query filter

    searchInput.addEventListener('keyup', () => {

        filterProjects();

    });

    // Category click filters

    filterButtons.forEach(btn => {

        btn.addEventListener('click', () => {

            filterButtons.forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            filterProjects();

        });

    });

    // Normalize the grid on load: force "All" state and clear any residual

    // inline opacity/transform so cards can never start hidden.

    // slugify is declared BEFORE this call: const arrows are not hoisted, and

    // calling filterProjects() first would throw a TDZ ReferenceError that

    // silently kills the tilt listeners attached below.

    const slugify = (value) => String(value || '')

        .toLowerCase()

        .replace(/\s+/g, '-')

        .replace(/[^a-z0-9-]/g, '')

        .trim();

    filterProjects();

    function filterProjects() {

        const query = searchInput.value.toLowerCase().trim();

        const activeBtn = document.querySelector('.filter-btn.active');

        const activeFilter = activeBtn ? slugify(activeBtn.getAttribute('data-filter')) : 'all';

        projectCards.forEach(card => {

            const title = card.querySelector('.project-card-title').textContent.toLowerCase();

            const summary = card.querySelector('.project-card-summary').textContent.toLowerCase();

            const tech = Array.from(card.querySelectorAll('.tech-badge')).map(el => el.textContent.toLowerCase()).join(' ');

            // Slug-normalize every category so "Web Dev" => "web-dev" always matches.

            const cardCategories = (card.getAttribute('data-category') || '')

                .split(/\s+/)

                .map(slugify)

                .filter(Boolean);

            const matchesSearch = title.includes(query) || summary.includes(query) || tech.includes(query);

            const matchesFilter = activeFilter === 'all' || 
                cardCategories.includes(activeFilter) ||
                (activeFilter === 'ai-ml' && (cardCategories.includes('ai') || cardCategories.includes('ml') || cardCategories.includes('ai-ml')));

            if (matchesSearch && matchesFilter) {
                card.classList.remove('project-filtered-out');
                card.style.setProperty('display', 'flex', 'important');
                card.style.removeProperty('opacity');
                card.style.removeProperty('transform');
            } else {
                card.classList.add('project-filtered-out');
                card.style.setProperty('display', 'none', 'important');
            }

        });

    }

    // 3D Perspective Card Tilt (Desktop Mouse + Mobile Touch + Gyroscope)
    projectCards.forEach(card => {
        let isTouching = false;

        function applyTilt(clientX, clientY) {
            const rect = card.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const maxTilt = 18;
            let rotateX = (centerY - y) / 12;
            let rotateY = (x - centerX) / 12;
            rotateX = Math.max(-maxTilt, Math.min(maxTilt, rotateX));
            rotateY = Math.max(-maxTilt, Math.min(maxTilt, rotateY));

            card.classList.add('is-tilted');
            card.style.transition = 'none';
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
        }

        function resetTilt() {
            card.classList.remove('is-tilted');
            card.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            setTimeout(() => {
                if (!card.classList.contains('is-tilted')) {
                    card.style.transition = '';
                }
            }, 400);
        }

        // Desktop Mouse Listeners
        card.addEventListener('mousemove', (e) => {
            applyTilt(e.clientX, e.clientY);
        });

        card.addEventListener('mouseleave', () => {
            resetTilt();
        });

        // Mobile Touch Listeners (passive: true allows smooth fluid native scrolling)
        card.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length === 1) {
                isTouching = true;
                applyTilt(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        card.addEventListener('touchmove', (e) => {
            if (isTouching && e.touches && e.touches.length === 1) {
                const touch = e.touches[0];
                const rect = card.getBoundingClientRect();
                if (touch.clientX >= rect.left - 40 && touch.clientX <= rect.right + 40 &&
                    touch.clientY >= rect.top - 40 && touch.clientY <= rect.bottom + 40) {
                    applyTilt(touch.clientX, touch.clientY);
                } else {
                    isTouching = false;
                    resetTilt();
                }
            }
        }, { passive: true });

        card.addEventListener('touchend', () => {
            if (isTouching) {
                isTouching = false;
                resetTilt();
            }
        }, { passive: true });

        card.addEventListener('touchcancel', () => {
            if (isTouching) {
                isTouching = false;
                resetTilt();
            }
        }, { passive: true });
    });

    // Mobile Device Orientation (Gyroscope) Tilt (Zero Layout Thrashing via IntersectionObserver)
    if (window.DeviceOrientationEvent && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        const activeCards = new Set();
        if ('IntersectionObserver' in window) {
            const tiltObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        activeCards.add(entry.target);
                    } else {
                        activeCards.delete(entry.target);
                        if (!entry.target.classList.contains('is-tilted')) {
                            entry.target.style.transform = '';
                        }
                    }
                });
            }, { threshold: 0.15 });
            projectCards.forEach(card => tiltObserver.observe(card));
        }

        let gyroRaf = null;
        let isTouchInteracting = false;
        window.addEventListener('touchstart', () => { isTouchInteracting = true; }, { passive: true });
        window.addEventListener('touchend', () => { setTimeout(() => { isTouchInteracting = false; }, 200); }, { passive: true });
        window.addEventListener('touchcancel', () => { isTouchInteracting = false; }, { passive: true });

        window.addEventListener('deviceorientation', (e) => {
            if (isTouchInteracting || e.gamma === null || e.beta === null || activeCards.size === 0) return;
            const gamma = Math.max(-20, Math.min(20, e.gamma));
            const restingPitch = 45;
            const beta = Math.max(-25, Math.min(25, e.beta - restingPitch));

            if (gyroRaf) cancelAnimationFrame(gyroRaf);
            gyroRaf = requestAnimationFrame(() => {
                const rotY = (gamma / 20) * 8;
                const rotX = (-beta / 25) * 8;
                activeCards.forEach(card => {
                    if (card.classList.contains('is-tilted') && card.style.transition === 'none') {
                        return; // Active touch or mouse takes priority
                    }
                    card.style.transition = 'transform 0.15s ease-out';
                    card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
                });
            });
        }, { passive: true });
    }

}

/* ----------------------------------------------------

   CASE STUDY MODALS SYSTEM

   ---------------------------------------------------- */

function initCaseStudyModals() {

    const backdrop = document.getElementById('project-modal-backdrop');

    const closeButtons = document.querySelectorAll('.modal-close');

    const allModals = document.querySelectorAll('.modal');

    if (!backdrop) return;

    // Open a specific modal by ID

    function openModal(modalId) {

        backdrop.classList.add('active');

        const targetModal = document.getElementById(modalId);

        if (targetModal) {

            targetModal.classList.add('active');

            document.body.style.overflow = 'hidden'; // Stop scrolling

            if (lenisInstance) lenisInstance.stop(); // Stop Lenis scroll

            showToast(`Loaded Case Study: ${targetModal.querySelector('.modal-title').textContent}`, 'info');

        }

    }

    // Close all modals and hide the backdrop

    function closeAllModals() {

        backdrop.classList.remove('active');

        allModals.forEach(modal => modal.classList.remove('active'));

        document.body.style.overflow = '';

        if (lenisInstance) lenisInstance.start();

    }

    // Wire the "Read Case Study" buttons (data-modal attribute)

    document.querySelectorAll('.open-modal-btn').forEach(btn => {

        btn.addEventListener('click', () => {

            openModal(`modal-${btn.getAttribute('data-modal')}`);

        });

    });

    // Clicking anywhere on a project card opens its case study

    document.querySelectorAll('.project-card').forEach(card => {

        card.addEventListener('click', (e) => {

            if (e.target.closest('.open-modal-btn') || e.target.closest('a')) return;

            const id = card.getAttribute('data-id');

            if (id) openModal(`modal-${id}`);

        });

    });

    // Attach click events to the 'X' buttons

    closeButtons.forEach(btn => {

        btn.addEventListener('click', closeAllModals);

    });

    // Close if user clicks anywhere outside the modal window

    backdrop.addEventListener('click', (e) => {

        if (e.target === backdrop) {

            closeAllModals();

        }

    });

    // Close on Escape key

    document.addEventListener('keydown', (e) => {

        if (e.key === 'Escape') {

            closeAllModals();

        }

    });

    // Student Dashboard Demo: Tab Switching between Overview and Courses views

    const demoTabBtns = document.querySelectorAll('.demo-tab-btn');

    const demoPanels = {

        overview: document.getElementById('demo-panel-overview'),

        courses: document.getElementById('demo-panel-courses')

    };

    demoTabBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            const view = btn.getAttribute('data-view');

            demoTabBtns.forEach(b => {

                b.classList.toggle('active', b === btn);

                b.setAttribute('aria-selected', b === btn ? 'true' : 'false');

            });

            if (demoPanels.overview) demoPanels.overview.classList.toggle('active', view === 'overview');

            if (demoPanels.courses) demoPanels.courses.classList.toggle('active', view === 'courses');

            const fsBtn = document.getElementById('demo-fullscreen-btn');

            if (fsBtn) {

                fsBtn.setAttribute('data-index', view === 'courses' ? '1' : '0');

            }

        });

    });

    // ----------------------------------------------------

    // FULLSCREEN DASHBOARD LIGHTBOX CONTROLLER

    // ----------------------------------------------------

    const DASHBOARDS_DATA = [

        {

            title: 'Student Analytics Dashboard: Overview & KPIs',

            tag: 'Student Analytics · Overview',

            src: 'dashboard/student_dashboard_overview.png',

            modalId: 'student-dashboard'

        },

        {

            title: 'Student Analytics Dashboard: Courses & Demographics',

            tag: 'Student Analytics · Courses',

            src: 'dashboard/student_dashboard_courses.png',

            modalId: 'student-dashboard'

        },

        {

            title: 'Spotify Music Intelligence Dashboard',

            tag: 'Spotify Music Intelligence',

            src: 'dashboard/spotify_2k.png',

            modalId: 'spotify-dashboard'

        },

        {

            title: 'BigMart Sales Analysis Dashboard',

            tag: 'BigMart Sales Analytics',

            src: 'dashboard/bigmart_2k.png',

            modalId: 'bigmart-dashboard'

        }

    ];

    const lbBackdrop = document.getElementById('dashboard-fullscreen-lightbox');

    const lbImg = document.getElementById('dash-lightbox-img');

    const lbTitle = document.getElementById('dash-lightbox-title');

    const lbNewTab = document.getElementById('dash-lightbox-newtab');

    const lbClose = document.getElementById('dash-lightbox-close');

    const lbPrev = document.getElementById('dash-lightbox-prev');

    const lbNext = document.getElementById('dash-lightbox-next');

    const lbCanvas = document.getElementById('dash-lightbox-canvas');

    const lbThumbs = document.querySelectorAll('.dash-thumb-btn');

    let currentDashIndex = 0;

    function renderLightbox(idx) {

        currentDashIndex = (idx + DASHBOARDS_DATA.length) % DASHBOARDS_DATA.length;

        const currentData = DASHBOARDS_DATA[currentDashIndex];

        if (lbImg) {

            lbImg.style.opacity = '0.5';

            lbImg.src = currentData.src;

            lbImg.alt = currentData.title;

            lbImg.onload = () => { lbImg.style.opacity = '1'; };

        }

        if (lbTitle) lbTitle.textContent = currentData.title;

        if (lbNewTab) lbNewTab.href = currentData.src;

        const lbTag = document.querySelector('.dash-lightbox-tag');

        if (lbTag && currentData.tag) {

            let iconHtml = '<i class="fa-solid fa-graduation-cap"></i> ';

            if (currentDashIndex === 2) {

                iconHtml = '<i class="fa-brands fa-spotify" style="color: #1db954;"></i> ';

            } else if (currentDashIndex === 3) {

                iconHtml = '<i class="fa-solid fa-cart-shopping" style="color: #f59e0b;"></i> ';

            }

            lbTag.innerHTML = iconHtml + currentData.tag;

        }

        const lbGoDemoBtn = document.getElementById('dash-lightbox-go-demo');

        if (lbGoDemoBtn) {

            lbGoDemoBtn.setAttribute('data-modal', currentData.modalId || 'student-dashboard');

            let demoTitle = 'Go to Interactive Student Dashboard Demo';

            if (currentDashIndex === 2) demoTitle = 'Go to Interactive Spotify Dashboard Demo';

            if (currentDashIndex === 3) demoTitle = 'Go to Interactive BigMart Dashboard Demo';

            lbGoDemoBtn.title = demoTitle;

        }

        const dynamicThumbs = document.querySelectorAll('.dash-thumb-btn');

        dynamicThumbs.forEach((thumb, tIdx) => {

            thumb.classList.toggle('active', tIdx === currentDashIndex);

        });

        if (lbCanvas) {

            lbCanvas.classList.remove('zoomed');

            const stage = lbCanvas.closest('.dash-lightbox-stage');

            if (stage) stage.classList.remove('is-zoomed');

        }

    }

    function openDashLightbox(idx = 0) {

        if (!lbBackdrop) return;

        renderLightbox(idx);

        lbBackdrop.classList.add('active');

        lbBackdrop.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

        if (lenisInstance) lenisInstance.stop();

        showToast(`Fullscreen: ${DASHBOARDS_DATA[currentDashIndex].title}`, 'info');

    }

    function closeDashLightbox() {

        if (!lbBackdrop || !lbBackdrop.classList.contains('active')) return;

        lbBackdrop.classList.remove('active');

        lbBackdrop.setAttribute('aria-hidden', 'true');

        if (lbCanvas) {

            lbCanvas.classList.remove('zoomed');

            const stage = lbCanvas.closest('.dash-lightbox-stage');

            if (stage) stage.classList.remove('is-zoomed');

        }

        // Only restore scrolling if no project modal is still open

        const anyModalActive = document.querySelector('.modal.active');

        if (!anyModalActive) {

            document.body.style.overflow = '';

            if (lenisInstance) lenisInstance.start();

        }

    }

    // Attach trigger to all full-screen dashboard buttons & images

    document.querySelectorAll('.trigger-dash-lightbox').forEach(el => {

        el.addEventListener('click', (e) => {

            e.stopPropagation();

            const idx = parseInt(el.getAttribute('data-index') || '0', 10);

            openDashLightbox(idx);

        });

    });

    if (lbClose) lbClose.addEventListener('click', closeDashLightbox);

    if (lbPrev) lbPrev.addEventListener('click', () => renderLightbox(currentDashIndex - 1));

    if (lbNext) lbNext.addEventListener('click', () => renderLightbox(currentDashIndex + 1));

    document.querySelectorAll('.dash-thumb-btn').forEach((thumb, idx) => {

        thumb.addEventListener('click', () => renderLightbox(idx));

    });

    // Zoom on canvas click

    if (lbCanvas) {

        lbCanvas.addEventListener('click', (e) => {

            if (e.target.closest('.dash-nav-arrow')) return;

            const isZoomed = lbCanvas.classList.toggle('zoomed');

            const stage = lbCanvas.closest('.dash-lightbox-stage');

            if (stage) stage.classList.toggle('is-zoomed', isZoomed);

        });

    }

    // Backdrop click outside canvas closes lightbox

    if (lbBackdrop) {

        lbBackdrop.addEventListener('click', (e) => {

            if (e.target === lbBackdrop || e.target.classList.contains('dash-lightbox-stage')) {

                closeDashLightbox();

            }

        });

    }

    // Keyboard navigation when lightbox is active

    document.addEventListener('keydown', (e) => {

        if (!lbBackdrop || !lbBackdrop.classList.contains('active')) return;

        if (e.key === 'Escape') {

            closeDashLightbox();

        } else if (e.key === 'ArrowLeft') {

            renderLightbox(currentDashIndex - 1);

        } else if (e.key === 'ArrowRight') {

            renderLightbox(currentDashIndex + 1);

        }

    });

    // "Interactive Demo" button inside Lightbox opens the matching modal

    const lbGoDemo = document.getElementById('dash-lightbox-go-demo');

    if (lbGoDemo) {

        lbGoDemo.addEventListener('click', () => {

            const targetModal = lbGoDemo.getAttribute('data-modal') || 'student-dashboard';

            closeDashLightbox();

            setTimeout(() => {

                openModal(`modal-${targetModal}`);

            }, 120);

        });

    }

}

/* ----------------------------------------------------

   COMMAND PALETTE SYSTEM (Ctrl + K)

   ---------------------------------------------------- */

function initCommandPalette() {

    const backdrop = document.getElementById('cmd-backdrop');

    const input = document.getElementById('cmd-input');

    const closeBtn = document.getElementById('cmd-close-btn');

    const kbdBtn = document.getElementById('kbd-btn');

    const options = document.querySelectorAll('.cmd-option');

    if (!backdrop || !input) return;

    let selectedIndex = 0;

    // Toggle Menu

    function togglePalette() {

        backdrop.classList.toggle('open');

        if (backdrop.classList.contains('open')) {

            input.value = '';

            filterOptions('');

            setTimeout(() => input.focus(), 100);

            if (lenisInstance) lenisInstance.stop();

            selectOption(0);

        } else {

            if (lenisInstance) lenisInstance.start();

        }

    }

    // Listen for Ctrl+K

    window.addEventListener('keydown', (e) => {

        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {

            e.preventDefault();

            togglePalette();

        }

        // Navigation shortcuts when command palette is open

        if (backdrop.classList.contains('open')) {

            const visibleOptions = Array.from(options).filter(opt => opt.style.display !== 'none');

            if (e.key === 'ArrowDown') {

                e.preventDefault();

                selectedIndex = (selectedIndex + 1) % visibleOptions.length;

                selectOption(selectedIndex);

            } else if (e.key === 'ArrowUp') {

                e.preventDefault();

                selectedIndex = (selectedIndex - 1 + visibleOptions.length) % visibleOptions.length;

                selectOption(selectedIndex);

            } else if (e.key === 'Enter') {

                e.preventDefault();

                if (visibleOptions[selectedIndex]) {

                    executeOption(visibleOptions[selectedIndex]);

                }

            } else if (e.key === 'Escape') {

                togglePalette();

            }

        } else {

            // Direct hotkeys when menu is closed

            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {

                if (e.key.toLowerCase() === 't') {

                    const themeBtn = document.getElementById('theme-btn');

                    if (themeBtn) themeBtn.click();

                } else if (e.key.toLowerCase() === 'a') {

                    scrollToSection('#about');

                } else if (e.key.toLowerCase() === 's') {

                    scrollToSection('#skills');

                } else if (e.key.toLowerCase() === 'p') {

                    scrollToSection('#projects');

                } else if (e.key.toLowerCase() === 'e') {

                    scrollToSection('#experience');

                } else if (e.key.toLowerCase() === 'r') {

                    document.getElementById('resume-download-btn').click();

                } else if (e.key.toLowerCase() === 'c') {

                    copyEmail();

                }

            }

        }

    });

    if (kbdBtn) kbdBtn.addEventListener('click', togglePalette);

    if (closeBtn) closeBtn.addEventListener('click', togglePalette);

    backdrop.addEventListener('click', (e) => {

        if (e.target === backdrop) togglePalette();

    });

    // Input filter

    input.addEventListener('input', (e) => {

        filterOptions(e.target.value);

    });

    function filterOptions(query) {

        let visibleCount = 0;

        options.forEach(opt => {

            const text = opt.querySelector('span').textContent.toLowerCase();

            if (text.includes(query.toLowerCase())) {

                opt.style.display = 'flex';

                visibleCount++;

            } else {

                opt.style.display = 'none';

            }

        });

        selectedIndex = 0;

        selectOption(0);

    }

    function selectOption(index) {

        const visibleOptions = Array.from(options).filter(opt => opt.style.display !== 'none');

        options.forEach(opt => opt.classList.remove('selected'));

        if (visibleOptions[index]) {

            visibleOptions[index].classList.add('selected');

            visibleOptions[index].scrollIntoView({ block: 'nearest' });

        }

    }

    // Execute command operations

    function executeOption(element) {

        const action = element.getAttribute('data-action');

        const value = element.getAttribute('data-value');

        togglePalette(); // close first

        if (action === 'nav') {

            scrollToSection(value);

        } else if (action === 'theme') {

            const themeBtn = document.getElementById('theme-btn');

            if (themeBtn) themeBtn.click();

        } else if (action === 'download') {

            document.getElementById('resume-download-btn').click();

        } else if (action === 'contact') {

            copyEmail();

        }

    }

    options.forEach((opt, index) => {

        opt.addEventListener('click', () => executeOption(opt));

    });

    function scrollToSection(selector) {

        const target = document.querySelector(selector);

        if (target) {

            if (lenisInstance) {

                lenisInstance.scrollTo(target);

            } else {

                target.scrollIntoView({ behavior: 'smooth' });

            }

        }

    }

    function copyEmail() {

        const email = "faseehazulaika@gmail.com";

        navigator.clipboard.writeText(email).then(() => {

            showToast("Email address copied to clipboard!", "success");

        }).catch(() => {

            showToast("Failed to copy email, please select manually", "info");

        });

    }

}

/* ----------------------------------------------------

   DIRECT CONNECT EMAIL TRIGGER

   ---------------------------------------------------- */

function initDirectConnectEmail() {

    const emailBtn = document.getElementById('connect-email-btn');

    if (!emailBtn) return;

    emailBtn.addEventListener('click', (e) => {

        const href = emailBtn.getAttribute('href');

        if (!href || !href.startsWith('mailto:')) return;

        // Force navigation so the mail client opens reliably even in

        // embedded/preview contexts that suppress anchor navigation.

        e.preventDefault();

        window.location.href = href;

    });

}

/* ----------------------------------------------------

   INTERACTIVE NEURAL COSMOS BACKGROUND

   High-performance canvas particle network with:

   - Dynamic cursor tracking & ambient luminescence

   - Magnetic synaptic filaments connecting to the cursor

   - Elastic repulsion physics

   - Click shockwave energy pulses

   - Smooth scroll parallax velocity

   - Obsidian Black (#050508) & Cobalt/Cyan palette

   ---------------------------------------------------- */

function initTechBackground() {
    // Disabled: constellation/network pattern removed as requested
}

/* ----------------------------------------------------
   INTERACTIVE TECHNOLOGY BADGES SYSTEM

   - Magnetic Proximity Elasticity (badges angle & deflect towards cursor)

   - 3D Viewport Parallax (moving mouse shifts field in stereoscopic depth)

   - Cosmic Energy Click Shockwave & Toast Feedback

   - Mobile Device Orientation Gyro Tilt

   ---------------------------------------------------- */

function initInteractiveTechField() {
    const field = document.querySelector('.persistent-tech-field');
    const nodes = document.querySelectorAll('.persistent-tech-field .tech-node');
    if (!field || !nodes.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMouseActive = false;
    let idleTimeout = null;

    // Cache node positions relative to the field to avoid forced layout reflows during RAF
    const nodeCoords = [];
    function cacheNodeCenters() {
        nodeCoords.length = 0;
        nodes.forEach(node => {
            const rect = node.getBoundingClientRect();
            nodeCoords.push({
                el: node,
                cx: rect.left + rect.width / 2,
                cy: rect.top + rect.height / 2
            });
        });
    }
    setTimeout(cacheNodeCenters, 300);
    window.addEventListener('resize', cacheNodeCenters, { passive: true });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isMouseActive) {
            isMouseActive = true;
            cacheNodeCenters();
        }
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => { isMouseActive = false; }, 2500);
    }, { passive: true });

    // Interactive Click Cosmic Shockwave & Micro Toast Feedback
    nodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            const techName = node.getAttribute('data-tech') || 'Skill';

            const oldPulse = node.querySelector('.tech-node-pulse');
            if (oldPulse) oldPulse.remove();

            const pulse = document.createElement('span');
            pulse.className = 'tech-node-pulse';
            node.appendChild(pulse);
            setTimeout(() => pulse.remove(), 750);

            node.classList.add('is-active');
            setTimeout(() => node.classList.remove('is-active'), 1200);

            if (typeof showToast === 'function') {
                showToast(`Explored ${techName} · Integrated in Portfolio`, 'info');
            }
        });
    });

    // Mobile gyroscope tilt
    let tiltX = 0;
    let tiltY = 0;
    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.gamma !== null && e.beta !== null) {
                tiltX = Math.max(-15, Math.min(15, e.gamma)) * 0.7;
                tiltY = Math.max(-15, Math.min(15, e.beta - 45)) * 0.7;
            }
        }, { passive: true });
    }

    // High-performance RAF animation loop with IntersectionObserver
    let physicsRaf = null;
    let isFieldVisible = false;

    function updateFieldPhysics() {
        if (!isFieldVisible) return;

        // Smooth lerp
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (currentX - centerX) / (centerX || 1);
        const deltaY = (currentY - centerY) / (centerY || 1);

        // 3D field parallax with hardware-accelerated translate3d
        const shiftX = (deltaX * 14) + tiltX;
        const shiftY = (deltaY * 10) + tiltY;
        field.style.transform = `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0)`;

        // Magnetic proximity deflection using cached coordinates (0 layout reflows!)
        if (isMouseActive) {
            for (let i = 0; i < nodeCoords.length; i++) {
                const item = nodeCoords[i];
                const node = item.el;
                if (node.matches(':hover')) continue;

                const diffX = mouseX - item.cx;
                const diffY = mouseY - item.cy;
                const distSq = diffX * diffX + diffY * diffY;

                // Threshold: 160px (distSq < 25600)
                if (distSq < 25600) {
                    const distance = Math.sqrt(distSq) || 1;
                    const force = 1 - (distance / 160);
                    const repelX = -(diffX / distance) * force * 15;
                    const repelY = -(diffY / distance) * force * 15;
                    const rotX = -(diffY / 160) * 16 * force;
                    const rotY = (diffX / 160) * 16 * force;

                    node.style.setProperty('--mag-x', `${repelX.toFixed(1)}px`);
                    node.style.setProperty('--mag-y', `${repelY.toFixed(1)}px`);
                    node.style.setProperty('--mag-rotX', `${rotX.toFixed(1)}deg`);
                    node.style.setProperty('--mag-rotY', `${rotY.toFixed(1)}deg`);
                    node.classList.add('is-magnetic');
                } else if (node.classList.contains('is-magnetic')) {
                    node.classList.remove('is-magnetic');
                    node.style.removeProperty('--mag-x');
                    node.style.removeProperty('--mag-y');
                    node.style.removeProperty('--mag-rotX');
                    node.style.removeProperty('--mag-rotY');
                }
            }
        } else {
            // Clean up any remaining magnetic styles when mouse stops
            const activeNodes = field.querySelectorAll('.is-magnetic');
            if (activeNodes.length) {
                activeNodes.forEach(node => {
                    node.classList.remove('is-magnetic');
                    node.style.removeProperty('--mag-x');
                    node.style.removeProperty('--mag-y');
                    node.style.removeProperty('--mag-rotX');
                    node.style.removeProperty('--mag-rotY');
                });
            }
        }

        if (isFieldVisible) {
            physicsRaf = requestAnimationFrame(updateFieldPhysics);
        }
    }

    if ('IntersectionObserver' in window) {
        const skillsSection = document.getElementById('skills') || field;
        const fieldObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isFieldVisible = entry.isIntersecting;
                if (isFieldVisible) {
                    if (!physicsRaf) physicsRaf = requestAnimationFrame(updateFieldPhysics);
                } else {
                    if (physicsRaf) {
                        cancelAnimationFrame(physicsRaf);
                        physicsRaf = null;
                    }
                }
            });
        }, { threshold: 0.05 });
        fieldObserver.observe(skillsSection);
    } else {
        isFieldVisible = true;
        physicsRaf = requestAnimationFrame(updateFieldPhysics);
    }
}

/* Helper: Toast Notifications */

function showToast(message, type = 'info') {

    const container = document.getElementById('toast-container');

    if (!container) return;

    const toast = document.createElement('div');

    toast.className = `toast toast-${type}`;

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';

    toast.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <span>${message}</span>

    `;

    container.appendChild(toast);

    // Auto destroy

    setTimeout(() => {

        toast.style.animation = 'toastShow 0.3s ease reverse forwards';

        setTimeout(() => toast.remove(), 300);

    }, 3200);

}

/* ----------------------------------------------------

   PORTFOLIO ASSISTANT - Local knowledge guide

   ---------------------------------------------------- */

function initPortfolioChatbot() {

    const chatbot = document.getElementById('portfolio-chatbot');

    const launcher = document.getElementById('portfolio-chatbot-launcher');

    const panel = document.getElementById('portfolio-chatbot-panel');

    const messages = document.getElementById('portfolio-chatbot-messages');

    const suggestions = document.getElementById('portfolio-chatbot-suggestions');

    const form = document.getElementById('portfolio-chatbot-form');

    const input = document.getElementById('portfolio-chatbot-input');

    const closeButton = document.getElementById('portfolio-chatbot-close');

    const clearButton = document.getElementById('portfolio-chatbot-clear');

    const recruiterButton = document.getElementById('portfolio-chatbot-recruiter');
    const sendButton = form ? form.querySelector('.chatbot-send-button') : null;

    if (!chatbot || !launcher || !panel || !messages || !suggestions || !form || !input) return;

    if (sendButton) {
        input.addEventListener('input', () => {
            sendButton.disabled = !input.value.trim();
        });
    }

    const fallback = "I don't have that detail in her portfolio yet, but I can help you explore her projects, skills, experience, or career journey.";

    const initialQuestions = ['Who is Faseeha?', 'Explore My Projects', 'AI & GenAI Work', 'Data & Analytics', 'Experience', 'Achievements', 'Career Objective'];

    const primaryActions = [

        { icon: 'fa-user', title: 'About Me', description: 'Background, skills & profile', question: 'Who is Faseeha?' },

        { icon: 'fa-wand-magic-sparkles', title: 'AI & GenAI', description: 'AI capabilities & projects', question: 'AI & GenAI Work' },

        { icon: 'fa-chart-column', title: 'Data & Analytics', description: 'Power BI, insights & analysis', question: 'Data & Analytics' },

        { icon: 'fa-briefcase', title: 'Experience', description: 'Internships & professional journey', question: 'Experience' }

    ];

    const questionSets = {

        ai: ['What is ZingyByte AI?', 'What is PHOENIX?', 'What AI technologies does she use?', 'Which project uses RAG?'],

        projects: ['Show me the AI projects', 'Show me the data projects', 'Which project achieved 95% accuracy?', 'Which project uses computer vision?'],

        experience: ['Where did she intern?', 'What did she do in Data Analytics?', 'What did she do in Web Development?', 'Does she have UI/UX experience?'],

        achievements: ['What awards has she won?', 'Has she published research?', 'What is the Young Researcher Award?']

    };

    const projectDetails = {

        zingybyte: { title: 'ZingyByte AI — Smart Serve', summary: 'Real-time AI food concierge', tech: 'Streamlit · LangChain · RAG', modal: 'zingybyte' },

        phoenix: { title: 'Next-Gen PHOENIX', summary: 'Personalized educational recommendation platform', tech: 'Flask · Python · Scikit-learn · TF-IDF · SQLite', modal: 'phoenix' },

        sentiment: { title: 'ZendiMind AI', summary: 'Real-time document & text sentiment intelligence platform', tech: 'Python · NLP · Document Intelligence · Vercel', modal: 'sentiment' },

        dashboards: { title: 'Power BI Data Analytics Dashboards', summary: 'Spotify, BigMart, and student analytics insights', tech: 'Power BI', modal: 'dashboards' },

        parking: { title: 'Smart Parking Detection', summary: 'Computer vision parking occupancy detection', tech: 'Python · OpenCV · NumPy', modal: 'parking' },

        brandtouch: { title: 'The Brand Touch by FZ', summary: 'Luxury graphic design & branding studio website', tech: 'Front-End · UI/UX · Brand Identity', modal: 'brandtouch' },

        aurafaz: { title: 'AuraFaz Fragrance Hub', summary: 'Perfume e-commerce website with interactive booking flow', tech: 'HTML · CSS · JavaScript · UI/UX', modal: 'aurafaz' }

    };

    function openChat() {
        panel.hidden = false;
        launcher.setAttribute('aria-expanded', 'true');
        chatbot.classList.add('chat-open');
        document.body.classList.add('chat-open-locked');
        if (!messages.children.length) {
            addWelcomeMessage();
            renderStarterSuggestions();
        }
        if (window.innerWidth > 768 && !('ontouchstart' in window)) {
            setTimeout(() => input.focus(), 80);
        }
    }

    function closeChat() {
        panel.hidden = true;
        launcher.setAttribute('aria-expanded', 'false');
        chatbot.classList.remove('chat-open');
        document.body.classList.remove('chat-open-locked');
        launcher.focus();
    }

    function addMessage(text, role, project) {

        const row = document.createElement('div');

        row.className = `chatbot-message ${role}`;

        const bubble = document.createElement('div');

        bubble.className = 'chatbot-bubble';

        bubble.textContent = text;

        row.appendChild(bubble);

        if (project) {

            const card = document.createElement('div');

            card.className = 'chatbot-project-card';

            card.innerHTML = `<strong>${project.title}</strong><span>${project.summary}</span><span>Tech · ${project.tech}</span>`;

            const action = document.createElement('button');

            action.type = 'button';

            action.className = 'chatbot-project-action';

            action.textContent = 'Explore Project';

            action.addEventListener('click', () => {

                const modalButton = document.querySelector(`.open-modal-btn[data-modal="${project.modal}"]`);

                if (modalButton) modalButton.click();

                closeChat();

            });

            card.appendChild(action);

            bubble.appendChild(card);

        }

        messages.appendChild(row);

        messages.scrollTop = messages.scrollHeight;

    }

    function attachSuggestionChips(container, items) {

        if (!items || !items.length) return;

        if (container.querySelector('.chatbot-suggestion-list')) return;

        const wrapper = document.createElement('div');

        wrapper.className = 'chatbot-suggestion-list';

        const separator = document.createElement('div');

        separator.className = 'chatbot-suggestion-separator';

        wrapper.appendChild(separator);

        items.slice(0, 5).forEach((question) => {

            const chip = document.createElement('button');

            chip.type = 'button';

            chip.className = 'chatbot-suggestion';

            chip.textContent = question;

            chip.addEventListener('click', () => sendQuestion(question));

            wrapper.appendChild(chip);

        });

        container.appendChild(wrapper);

        requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; });

    }

    function addMessageStreaming(text, role, project, suggestions) {

        const row = document.createElement('div');

        row.className = `chatbot-message ${role}`;

        const bubble = document.createElement('div');

        bubble.className = 'chatbot-bubble';

        const textEl = document.createElement('span');

        textEl.className = 'chatbot-bubble-text';

        textEl.style.overflowWrap = 'break-word';

        textEl.style.wordBreak = 'break-word';

        textEl.style.whiteSpace = 'normal';

        textEl.style.transition = 'opacity 0.18s ease, transform 0.18s ease';

        textEl.style.opacity = '1';

        textEl.style.transform = 'translateY(0)';

        bubble.appendChild(textEl);

        const cursor = document.createElement('span');

        cursor.className = 'streaming-cursor';

        cursor.setAttribute('aria-hidden', 'true');

        bubble.appendChild(cursor);

        if (project) {

            const card = document.createElement('div');

            card.className = 'chatbot-project-card';

            card.innerHTML = `<strong>${project.title}</strong><span>${project.summary}</span><span>Tech · ${project.tech}</span>`;

            const action = document.createElement('button');

            action.type = 'button';

            action.className = 'chatbot-project-action';

            action.textContent = 'Explore Project';

            action.addEventListener('click', () => {

                const modalButton = document.querySelector(`.open-modal-btn[data-modal="${project.modal}"]`);

                if (modalButton) modalButton.click();

                closeChat();

            });

            card.appendChild(action);

            bubble.appendChild(card);

        }

        row.appendChild(bubble);

        messages.appendChild(row);

        messages.scrollTop = messages.scrollHeight;

        const chars = Array.from(text);

        let i = 0;

        textEl.textContent = '';

        const typeNextChar = () => {

            if (i >= chars.length) {

                cursor.remove();

                textEl.style.opacity = '1';

                textEl.style.transform = 'translateY(0)';

                attachSuggestionChips(bubble, suggestions);

                return;

            }

            const currentChar = chars[i];

            textEl.textContent += currentChar;

            i += 1;

            const nextDelay = currentChar === ' ' ? 22 : currentChar === '\n' ? 34 : /[.,!?;:]/.test(currentChar) ? 42 : 16;

            if (i >= chars.length) {

                setTimeout(() => {

                    cursor.remove();

                    textEl.style.opacity = '1';

                    textEl.style.transform = 'translateY(0)';

                    attachSuggestionChips(bubble, suggestions);

                }, 120);

                return;

            }

            setTimeout(typeNextChar, nextDelay);

        };

        textEl.style.opacity = '0';

        textEl.style.transform = 'translateY(6px)';

        requestAnimationFrame(() => {

            textEl.style.opacity = '1';

            textEl.style.transform = 'translateY(0)';

            setTimeout(typeNextChar, 40);

        });

    }

    function addWelcomeMessage() {

        const row = document.createElement('div');

        row.className = 'chatbot-message assistant';

        const bubble = document.createElement('div');

        bubble.className = 'chatbot-bubble chatbot-welcome';

        const p = document.createElement('p');

        p.className = 'chatbot-welcome-title';

        const textSpan1 = document.createElement('span');

        textSpan1.className = 'welcome-text-line1';

        const cursor = document.createElement('span');

        cursor.className = 'streaming-cursor';

        cursor.setAttribute('aria-hidden', 'true');

        p.appendChild(textSpan1);

        p.appendChild(cursor);

        bubble.appendChild(p);

        const subSpan = document.createElement('span');

        subSpan.className = 'chatbot-welcome-sub';

        const textSpan2 = document.createElement('span');

        textSpan2.className = 'welcome-text-line2';

        subSpan.appendChild(textSpan2);

        bubble.appendChild(subSpan);

        row.appendChild(bubble);

        messages.appendChild(row);

        const text1 = "Hi! I am Faseeha's AI assistant.";

        const text2 = "Ask me about her projects, skills, experience, and journey.";

        let i = 0;

        let j = 0;

        function typeLine1() {

            if (i < text1.length) {

                textSpan1.textContent += text1.charAt(i);

                i++;

                const delay = text1.charAt(i - 1) === '!' ? 180 : text1.charAt(i - 1) === '\'' ? 40 : 28;

                setTimeout(typeLine1, delay);

                messages.scrollTop = messages.scrollHeight;

            } else {

                // Line 1 complete -> Move cursor to line 2 after short pause

                subSpan.appendChild(cursor);

                setTimeout(typeLine2, 160);

            }

        }

        function typeLine2() {

            if (j < text2.length) {

                textSpan2.textContent += text2.charAt(j);

                j++;

                const delay = text2.charAt(j - 1) === ',' ? 130 : text2.charAt(j - 1) === '.' ? 220 : 24;

                setTimeout(typeLine2, delay);

                messages.scrollTop = messages.scrollHeight;

            } else {

                // Typing complete -> Remove blinking cursor after brief rest

                setTimeout(() => {

                    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);

                }, 450);

            }

        }

        setTimeout(typeLine1, 180);

    }

    function renderStarterSuggestions() {

        suggestions.replaceChildren();

        const starterQuestions = ['About Faseeha', 'AI & GenAI Work', 'Data & Analytics', 'Experience'];

        starterQuestions.forEach((question) => {

            const button = document.createElement('button');

            button.type = 'button';

            button.className = 'chatbot-suggestion';

            button.textContent = question;

            button.addEventListener('click', () => sendQuestion(question));

            suggestions.appendChild(button);

        });

        requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; });

    }

    function renderSuggestions(items) {

        suggestions.replaceChildren();

        const latestAssistantBubble = messages.querySelector('.chatbot-message.assistant:last-of-type .chatbot-bubble');

        if (latestAssistantBubble) {

            attachSuggestionChips(latestAssistantBubble, items);

            return;

        }

        items.slice(0, 7).forEach((question) => {

            const button = document.createElement('button');

            button.type = 'button';

            button.className = 'chatbot-suggestion';

            button.textContent = question;

            button.addEventListener('click', () => sendQuestion(question));

            suggestions.appendChild(button);

        });

        requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; });

    }

    function showTyping() {

        const row = document.createElement('div');

        row.className = 'chatbot-message assistant';

        row.id = 'chatbot-typing';

        row.innerHTML = '<div class="chatbot-bubble"><span class="chatbot-typing" aria-label="Assistant is typing"><i></i><i></i><i></i></span></div>';

        messages.appendChild(row);

        messages.scrollTop = messages.scrollHeight;

    }

    function getLocalResponse(question) {

        const text = question.toLowerCase();

        if (text.includes('recruiter')) return { text: 'Faseeha is an AI & Data Science graduate with hands-on experience across Generative AI, RAG, data analytics, machine learning, Python development, Power BI, and UI/UX.', suggestions: ['Skills', 'Projects', 'Experience', 'Resume', 'Contact'] };

        if (text.includes('who is') || text.includes('about faseeha')) return { text: "I'm Faseeha, an AI & Data Science graduate who enjoys building with data, AI, and code. I learn by experimenting and turning ideas into practical projects.", suggestions: initialQuestions.slice(1, 5) };

        if (text.includes('career objective') || text.includes('career goal')) return { text: 'I want to work on meaningful challenges, learn continuously, and contribute ideas that create real value. Most importantly, I want to keep building things worth building.', suggestions: ['Skills', 'Experience', 'Resume'] };

        if (text.includes('skill') || text.includes('technology') || text.includes('tech stack')) return { text: 'My core skills include Python, SQL, Power BI, Streamlit, LangChain, Figma, and Git, with hands-on experience across AI, data analytics, and application development.', suggestions: ['AI & GenAI Work', 'Data & Analytics', 'Explore My Projects'] };

        if (text.includes('design tool')) return { text: 'I use Figma and Canva for design and prototyping work, including wireframing and layout planning.', suggestions: ['Does she have UI/UX experience?', 'Skills', 'Experience'] };

        if (text.includes('zingybyte') || text.includes('smart serve') || text.includes('rag')) return { text: 'ZingyByte AI is a real-time AI food concierge built using Streamlit, LangChain, and RAG. It provides grounded food-related responses using menu information.', project: projectDetails.zingybyte, suggestions: ['How It Works', 'Tech Stack', 'Other AI Projects'] };

        if (text.includes('phoenix')) return { text: 'PHOENIX is a personalized educational recommendation platform built with Flask, Python, Scikit-learn, TF-IDF, and SQLite. It provides personalized course, learning-mode, and job recommendations.', project: projectDetails.phoenix, suggestions: ['How It Works', 'Tech Stack', 'Other AI Projects'] };

        if (text.includes('zendimind') || text.includes('sentiment') || text.includes('document intelligence') || text.includes('95%') || text.includes('feedback')) return { text: 'ZendiMind AI (https://zendimind.vercel.app/) is a real-time sentiment analysis and document intelligence platform. It analyzes raw text, customer reviews, Excel spreadsheets, CSVs, PDFs, and Word documents, evaluating polarity, emotion drivers, and generating actionable business recommendations.', project: projectDetails.sentiment, suggestions: ['Explore My Projects', 'AI & GenAI Work'] };

        if (text.includes('computer vision') || text.includes('parking')) return { text: 'Smart Parking Detection (https://smart-vacantrix.vercel.app) is an AI & computer vision project built with Python, OpenCV, and NumPy. It uses Canny Edge Detection, ROI extraction, and edge-density analysis to track parking occupancy and vacant spots in real time.', project: projectDetails.parking, suggestions: ['Explore My Projects', 'AI & GenAI Work'] };

        if (text.includes('brand touch') || text.includes('brandtouch')) return { text: 'The Brand Touch by FZ (https://the-brand-touch.brandtouchfz.workers.dev) is a luxury portfolio and digital showcase developed for a high-end graphic design studio, featuring bespoke branding, typography, packaging, brochures, and fluid interactive animations.', project: projectDetails.brandtouch, suggestions: ['Explore My Projects', 'Where did she intern?'] };

        if (text.includes('perfume') || text.includes('aurafaz') || text.includes('fragrance')) return { text: 'AuraFaz Fragrance Hub (https://fasee9831.github.io/Perfume-ecommerce-website/) is a luxury perfume e-commerce website with responsive design, smooth UI animations, and a completed booking flow that improved conversions by 15%.', project: projectDetails.aurafaz, suggestions: ['Explore My Projects', 'Where did she intern?'] };

        if (text.includes('student dashboard') || text.includes('student analytics')) return { text: 'The Student Analytics Dashboard is an interactive Power BI project covering student performance, enrollment, revenue, certificates, average fees, course trends, demographics, and key insights.', project: projectDetails.studentDashboard, suggestions: ['What Power BI dashboards did she build?', 'Show me the data projects', 'Data & Analytics'] };

        if (text.includes('dashboard') || text.includes('spotify') || text.includes('bigmart') || text.includes('data project')) return { text: 'Her Power BI work includes interactive dashboards for Spotify, BigMart, and student analytics. I focused on data cleaning, analysis, visualization, KPI tracking, and turning the results into useful business or academic insights.', project: projectDetails.dashboards, suggestions: ['What is the Student Analytics Dashboard?', 'What did she do in Data Analytics?', 'Explore My Projects'] };

        if ((text.includes('ai') || text.includes('genai')) && text.includes('project')) return { text: 'Her AI projects are grouped into four areas: AI & GenAI, NLP, machine learning, and computer vision. They include ZingyByte AI Smart Serve (Streamlit, LangChain, RAG), PHOENIX (Flask and Scikit-learn recommendations), ZendiMind AI (real-time document & text sentiment intelligence at https://zendimind.vercel.app/), and Smart Parking Detection (live at https://smart-vacantrix.vercel.app using OpenCV and NumPy). Power BI dashboards belong to her separate Data Analytics category.', suggestions: questionSets.ai };

        if (text.includes('project')) return { text: 'Her projects include ZingyByte AI, PHOENIX, ZendiMind AI, Power BI dashboards, and Smart Parking Detection. They span Generative AI, recommendations, NLP, analytics, and computer vision.', suggestions: questionSets.projects };

        if (text.includes('ui/ux') || text.includes('ui ux') || text.includes('wirefram') || text.includes('prototyp') || text.includes('design intern')) return { text: 'Yes. During her UI/UX Design internship at AK Info Park in Nagercoil, I worked on UI/UX workflows, wireframing, prototyping, layout planning, and responsive layouts for a WhatsApp Clone and the ZingyByte Food Delivery App.', suggestions: ['Where did she intern?', 'What design tools does she use?', 'Explore My Projects'] };

        if (text.includes('intern') || text.includes('experience')) return { text: "I've completed internships in Data Analytics at Alric Info Tech, Web Development at M2 Web Development, and UI/UX Design at AK Info Park.", suggestions: questionSets.experience };

        if (text.includes('data analytics') || text.includes('data & analytics')) return { text: 'My data analytics experience includes an internship at Alric Info Tech in Trivandrum, where I worked with SQL, data cleaning, preprocessing, analysis, Power BI, and business insights. I also built Power BI dashboards for Spotify, BigMart, and student analytics, focusing on data cleaning, visualization, KPI tracking, and insights.', project: projectDetails.dashboards, suggestions: ['What did she do in Data Analytics?', 'What is the Student Analytics Dashboard?', 'What Power BI dashboards did she build?'] };

        if (text.includes('web development')) return { text: 'At M2 Web Development in Technopark Trivandrum, I worked with HTML, CSS, and JavaScript. The internship resulted in a 15% increase in completed perfume e-commerce bookings.', suggestions: ['Does she have UI/UX experience?', 'Where did she intern?'] };

        if (text.includes('education') || text.includes('degree') || text.includes('cgpa')) return { text: 'I am pursuing a B.Tech in Artificial Intelligence and Data Science at Arunachala College of Engineering for Women, from 2022 to 2026, with a CGPA of 8.5.', suggestions: ['Skills', 'Career Objective', 'Experience'] };

        if (text.includes('certif')) return { text: 'Her certifications include NPTEL Foundations of Cloud, IoT, Edge & ML, Tata and Deloitte data analytics simulations, AWS Solutions Architecture, Excel for Data Analysis, Django Essentials, and Essentials of Business Analytics.', suggestions: ['Achievements', 'Education', 'Skills'] };

        if (text.includes('award') || text.includes('achievement') || text.includes('young researcher')) return { text: 'Her awards include the Young Researcher Award, prizes in paper presentations and poster pitch at Avenora’24 and Biotronix’24, and the Project Mastery Award at Axelyra v.25.', suggestions: questionSets.achievements };

        if (text.includes('publish') || text.includes('research')) return { text: 'My publication is “Enhancing Smart Agriculture through Digital Twin Technology,” published through the Institution of Engineers (India) Students’ Chapter in 2024.', suggestions: ['What awards has she won?', 'Career Objective'] };

        if (text.includes('resume')) return { text: 'You can download my resume from the “Get Resume” button in the hero section.', suggestions: ['Skills', 'Experience', 'Contact'] };

        if (text.includes('contact') || text.includes('email')) return { text: 'You can reach me at faseehazulaika@gmail.com or connect with me on LinkedIn and GitHub in the Contact section.', suggestions: ['Career Objective', 'Resume', 'Projects'] };

        if (text.includes('ai') || text.includes('genai')) return { text: 'My AI and GenAI work includes ZingyByte AI with RAG and LangChain; PHOENIX with machine learning recommendations; ZendiMind AI document and sentiment intelligence; and Smart Parking Detection.', suggestions: questionSets.ai };

        return { text: fallback, suggestions: initialQuestions.slice(1, 5) };

    }

    async function answerQuestion(question) {

        if (typeof window.portfolioChatbotProvider === 'function') return window.portfolioChatbotProvider(question);

        return getLocalResponse(question);

    }

    async function sendQuestion(question) {

        const cleanQuestion = question.trim();

        if (!cleanQuestion) return;

        suggestions.replaceChildren();

        addMessage(cleanQuestion, 'user');

        input.value = '';
        if (sendButton) sendButton.disabled = true;

        showTyping();

        const response = await answerQuestion(cleanQuestion);

        const typing = document.getElementById('chatbot-typing');

        if (typing) typing.remove();

        addMessageStreaming(response.text || fallback, 'assistant', response.project, response.suggestions || initialQuestions.slice(1, 5));

    }

    launcher.addEventListener('click', () => panel.hidden ? openChat() : closeChat());

    closeButton.addEventListener('click', closeChat);

    clearButton.addEventListener('click', () => {

        messages.replaceChildren();

        suggestions.replaceChildren();

        openChat();

    });

    form.addEventListener('submit', (event) => { event.preventDefault(); sendQuestion(input.value); });

    if (recruiterButton) recruiterButton.addEventListener('click', () => sendQuestion('Recruiter Mode'));

    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !panel.hidden) closeChat(); });

}
