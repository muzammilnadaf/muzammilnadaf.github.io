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
       09. TERMINAL TYPING EFFECT
    ===================================================== */

    if (terminalStatus) {

        /*
         * Store the original text BEFORE
         * clearing the element.
         */

        const originalStatus =
            terminalStatus.textContent
                .replace(/\s+/g, " ")
                .trim();


        /*
         * Clear the visible text.
         */

        terminalStatus.textContent = "";


        let characterIndex = 0;


        function typeStatus() {

            if (
                characterIndex <
                originalStatus.length
            ) {

                terminalStatus.textContent +=
                    originalStatus.charAt(
                        characterIndex
                    );


                characterIndex++;


                setTimeout(
                    typeStatus,
                    55
                );

            }

        }


        /*
         * Start typing after a short delay.
         */

        setTimeout(
            typeStatus,
            700
        );

    }


    /* =====================================================
       10. TERMINAL CARD 3D MOUSE TILT
    ===================================================== */

    if (terminalCard) {

        /*
         * Only enable the 3D effect on
         * desktop-sized screens.
         */

        terminalCard.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) {

                    return;

                }


                const rect =
                    terminalCard
                        .getBoundingClientRect();


                /*
                 * Mouse position inside card.
                 */

                const mouseX =
                    event.clientX -
                    rect.left;


                const mouseY =
                    event.clientY -
                    rect.top;


                /*
                 * Convert mouse position
                 * into a range of -1 to +1.
                 */

                const percentX =
                    (mouseX /
                        rect.width) -
                    0.5;


                const percentY =
                    (mouseY /
                        rect.height) -
                    0.5;


                /*
                 * Maximum tilt.
                 *
                 * Increase these values if
                 * you want a stronger effect.
                 */

                const rotateY =
                    percentX * 12;


                const rotateX =
                    percentY * -12;


                /*
                 * Apply the actual 3D transform.
                 */

                terminalCard.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateZ(8px)`;

            }
        );


        /*
         * Reset the card when the
         * mouse leaves it.
         */

        terminalCard.addEventListener(
            "mouseleave",
            () => {

                terminalCard.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";

            }
        );

    }


    /* =====================================================
       11. PROJECT CARD INTERACTION
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
       12. CURRENT YEAR
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
       13. EXTERNAL LINKS
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
       14. PAGE LOADED
    ===================================================== */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "page-loaded"
        );

    });

});
