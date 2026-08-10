/* =========================================================
   MUZAMMIL GULAB NADAF
   PERSONAL PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENT REFERENCES
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-menu a");

    const navbar =
        document.querySelector(".navbar");

    const terminalCard =
        document.querySelector(".terminal-card");

    const terminalStatus =
        document.querySelector(".terminal-success");

    const statsSection =
        document.querySelector(".stats");

    const statElements =
        document.querySelectorAll(
            ".stat-item strong"
        );

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    /* =====================================================
       02. ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 140;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       03. GLASS NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();


    /* =====================================================
       04. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-main, " +
            ".about-focus, " +
            ".timeline-item, " +
            ".project-card, " +
            ".playbook-card, " +
            ".skill-group, " +
            ".service-card, " +
            ".contact-container"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       05. STAGGER PROJECT CARDS
    ===================================================== */

    projectCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       06. STAGGER SERVICE CARDS
    ===================================================== */

    serviceCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       07. ANIMATED STATISTICS
    ===================================================== */

    function animateCounter(element) {

        const originalText =
            element.textContent.trim();

        const numberMatch =
            originalText.match(/[\d.]+/);

        if (!numberMatch) return;

        const target =
            parseFloat(
                numberMatch[0]
            );

        const numberStart =
            originalText.indexOf(
                numberMatch[0]
            );

        const prefix =
            originalText.substring(
                0,
                numberStart
            );

        const suffix =
            originalText.substring(
                numberStart +
                numberMatch[0].length
            );

        const decimalPlaces =
            numberMatch[0].includes(".")
                ? numberMatch[0]
                    .split(".")[1]
                    .length
                : 0;

        const duration = 1400;

        const startTime =
            performance.now();


        function updateCounter(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;

            const progress =
                Math.min(
                    elapsed /
                        duration,
                    1
                );

            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const currentValue =
                target *
                easedProgress;


            element.textContent =
                prefix +
                currentValue.toFixed(
                    decimalPlaces
                ) +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    originalText;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if (
        statsSection &&
        statElements.length &&
        "IntersectionObserver"
        in window
    ) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            statElements.forEach(
                                animateCounter
                            );

                            statsObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );


        statsObserver.observe(
            statsSection
        );

    }


    /* =====================================================
       08. SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }
        );

    });


    /* =====================================================
       09. PROJECT CARD INTERACTION
    ===================================================== */

    projectCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "project-hover"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "project-hover"
                );

            }
        );

    });


    /* =====================================================
       10. CURRENT YEAR
    ===================================================== */

    const footerParagraphs =
        document.querySelectorAll(
            ".footer p"
        );


    if (
        footerParagraphs.length
    ) {

        footerParagraphs.forEach(
            paragraph => {

                paragraph.innerHTML =
                    paragraph.innerHTML.replace(
                        /©\s*2026/,
                        `© ${new Date()
                            .getFullYear()}`
                    );

            }
        );

    }


    /* =====================================================
       11. EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    externalLinks.forEach(link => {

        if (
            !link.hasAttribute("target")
        ) {

            link.setAttribute(
                "target",
                "_blank"
            );

        }


        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       12. PAGE LOADED
    ===================================================== */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "page-loaded"
        );

    });

});

/* =========================================================
   13. TERMINAL TYPING + 3D TILT
========================================================= */

(function () {

    /*
     * Wait until the complete page is loaded.
     */

    function initializeTerminalEffects() {

        const terminal =
            document.querySelector(
                ".terminal-card"
            );

        const status =
            document.querySelector(
                "#freelance-status"
            );


        /*
         * Stop safely if the elements
         * don't exist.
         */

        if (!terminal || !status) {

            console.warn(
                "Terminal elements not found."
            );

            return;

        }


        /* =================================================
           14. TYPING EFFECT
        ================================================= */

        const text =
            status.dataset.text ||
            "✓ Available for freelance";


        /*
         * Make absolutely sure the element
         * starts empty.
         */

        status.textContent = "";

        status.classList.add(
            "typing"
        );


        let index = 0;


        function typeNextCharacter() {

            if (
                index < text.length
            ) {

                status.textContent +=
                    text.charAt(index);

                index++;


                setTimeout(
                    typeNextCharacter,
                    55
                );

            } else {

                /*
                 * Typing finished.
                 */

                status.classList.remove(
                    "typing"
                );

                status.classList.add(
                    "typed"
                );

            }

        }


        /*
         * Start after 500 ms.
         */

        setTimeout(
            typeNextCharacter,
            500
        );


        /* =================================================
           15. 3D MOUSE TILT
        ================================================= */

        terminal.addEventListener(
            "mousemove",
            function (event) {

                /*
                 * Don't run this effect
                 * on small screens.
                 */

                if (
                    window.innerWidth < 800
                ) {

                    return;

                }


                const rect =
                    terminal.getBoundingClientRect();


                /*
                 * Mouse position inside
                 * the terminal.
                 */

                const mouseX =
                    event.clientX -
                    rect.left;

                const mouseY =
                    event.clientY -
                    rect.top;


                /*
                 * Convert mouse position
                 * to -1 ... +1.
                 *
                 * -1 = left / top
                 *  0 = center
                 * +1 = right / bottom
                 */

                const normalizedX =
                    (mouseX /
                        rect.width) * 2 - 1;


                const normalizedY =
                    (mouseY /
                        rect.height) * 2 - 1;


                /*
                 * Maximum rotation.
                 *
                 * Increase from 12 to 15
                 * if you want it even stronger.
                 */

                const maxTilt = 12;


                /*
                 * Mouse on RIGHT
                 * -> terminal rotates right.
                 *
                 * Mouse on LEFT
                 * -> terminal rotates left.
                 */

                const rotateY =
                    normalizedX *
                    maxTilt;


                /*
                 * Mouse on TOP
                 * -> terminal tilts toward top.
                 *
                 * Mouse on BOTTOM
                 * -> terminal tilts toward bottom.
                 */

                const rotateX =
                    normalizedY *
                    -maxTilt;


                /*
                 * Apply the 3D transform.
                 */

                terminal.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateZ(8px)`;


                terminal.classList.add(
                    "is-tilting"
                );

            }
        );


        /* =================================================
           16. RESET WHEN MOUSE LEAVES
        ================================================= */

        terminal.addEventListener(
            "mouseleave",
            function () {

                terminal.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";


                terminal.classList.remove(
                    "is-tilting"
                );

            }
        );

    }


    /*
     * DOMContentLoaded may already have
     * happened if this script is loaded
     * dynamically, so handle both cases.
     */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeTerminalEffects
        );

    } else {

        initializeTerminalEffects();

    }

})();
