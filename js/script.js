/* =========================================================
   MUZAMMIL GULAB NADAF — PERSONAL PORTFOLIO
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. NAVIGATION — ACTIVE SECTION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       02. NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       03. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
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


    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }

    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       04. STAGGER PROJECT CARDS
    ===================================================== */

    const projectCards = document.querySelectorAll(
        ".project-card"
    );


    projectCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });


    /* =====================================================
       05. STAGGER SERVICE CARDS
    ===================================================== */

    const serviceCards = document.querySelectorAll(
        ".service-card"
    );


    serviceCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });


    /* =====================================================
       06. ANIMATED STATISTICS
    ===================================================== */

    const statElements = document.querySelectorAll(
        ".stat-item strong"
    );


    const animateCounter = element => {

        const originalText =
            element.textContent.trim();


        /*
         * Extract numeric portion.
         *
         * Examples:
         * 3000+
         * 100+
         * 50+
         * 99%+
         * 8.6+
         */

        const numberMatch =
            originalText.match(/[\d.]+/);


        if (!numberMatch) return;


        const target =
            parseFloat(numberMatch[0]);


        const prefix =
            originalText.substring(
                0,
                originalText.indexOf(numberMatch[0])
            );


        const suffix =
            originalText.substring(
                originalText.indexOf(numberMatch[0]) +
                numberMatch[0].length
            );


        const decimalPlaces =
            numberMatch[0].includes(".")
                ? numberMatch[0].split(".")[1].length
                : 0;


        const duration = 1400;

        const startTime = performance.now();


        const updateCounter = currentTime => {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
             * Ease-out effect
             */

            const easedProgress =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                target * easedProgress;


            element.textContent =
                prefix +
                currentValue.toFixed(decimalPlaces) +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    originalText;

            }

        };


        requestAnimationFrame(
            updateCounter
        );

    };


    const statsSection =
        document.querySelector(".stats");


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

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
       07. SMOOTH INTERNAL LINKS
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
                    link.getAttribute("href");


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
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       08. TERMINAL TYPING EFFECT
    ===================================================== */

    const terminalStatus =
        document.querySelector(
            ".terminal-success"
        );


    if (terminalStatus) {

        const originalStatus =
            terminalStatus.textContent;


        terminalStatus.textContent = "";


        let characterIndex = 0;


        const typeStatus = () => {

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
                    45
                );

            }

        };


        setTimeout(
            typeStatus,
            700
        );

    }


    /* =====================================================
       09. TERMINAL CARD MOUSE PARALLAX
    ===================================================== */

    const terminalCard =
        document.querySelector(
            ".terminal-card"
        );


    if (terminalCard) {

        terminalCard.addEventListener(
            "mousemove",
            event => {

                /*
                 * Disable effect on small screens.
                 */

                if (window.innerWidth < 800) {
                    return;
                }


                const rect =
                    terminalCard.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) * 5;


                const rotateX =
                    ((y / rect.height) - 0.5) * -5;


                terminalCard.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        terminalCard.addEventListener(
            "mouseleave",
            () => {

                terminalCard.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       10. PROJECT CARD HOVER
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
       11. CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer p"
        );


    if (footerYear) {

        footerYear.innerHTML =
            footerYear.innerHTML.replace(
                "2026",
                new Date().getFullYear()
            );

    }


    /* =====================================================
       12. EXTERNAL LINKS
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

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


    /* =====================================================
       13. PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
