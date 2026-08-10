/* =========================================================
   MUZAMMIL GULAB NADAF
   PERSONAL PORTFOLIO WEBSITE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT REFERENCES
    ===================================================== */

    const navLinks = Array.from(
        document.querySelectorAll(".nav-menu a[href^='#']")
    );

    const sections = Array.from(
        document.querySelectorAll(
            "main section[id]"
        )
    );

    const navbar = document.querySelector(".navbar");



    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const ACTIVE_OFFSET = 140;

    const SECTION_IDS = [
        "about",
        "experience",
        "projects",
        "playbook",
        "skills",
        "services",
        "contact"
    ];



    /* =====================================================
       GET NAV LINK FOR SECTION
    ===================================================== */

    function getNavLink(sectionId) {

        return navLinks.find(
            link =>
                link.getAttribute("href") === `#${sectionId}`
        );

    }



    /* =====================================================
       SET ACTIVE NAVIGATION ITEM
    ===================================================== */

    function setActiveNav(sectionId) {

        navLinks.forEach(link => {

            link.classList.remove("active");

        });


        const activeLink = getNavLink(sectionId);

        if (activeLink) {

            activeLink.classList.add("active");

        }

    }



    /* =====================================================
       DETERMINE CURRENT SECTION
    ===================================================== */

    function getCurrentSection() {

        const scrollPosition =
            window.scrollY + ACTIVE_OFFSET;


        let currentSection = null;


        /*
         * Check sections from top to bottom.
         *
         * The last section whose top has been crossed
         * becomes the current section.
         */

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top +
                window.scrollY;


            if (scrollPosition >= sectionTop) {

                currentSection = section.id;

            }

        });


        /*
         * IMPORTANT:
         *
         * Contact is the final section.
         * When the user reaches the bottom of the page,
         * Contact MUST become active.
         */

        const viewportBottom =
            window.scrollY + window.innerHeight;

        const documentBottom =
            document.documentElement.scrollHeight;


        if (
            viewportBottom >=
            documentBottom - 10
        ) {

            currentSection = "contact";

        }


        return currentSection;

    }



    /* =====================================================
       UPDATE ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNavigation() {

        const currentSection =
            getCurrentSection();


        if (currentSection) {

            setActiveNav(currentSection);

        }

    }



    /* =====================================================
       NAVIGATION CLICK HANDLER
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {

                return;

            }


            const targetSection =
                document.querySelector(targetId);


            if (!targetSection) {

                return;

            }


            event.preventDefault();


            /*
             * Immediately update the active item.
             */

            setActiveNav(
                targetSection.id
            );


            /*
             * Calculate scroll position.
             *
             * The navbar is fixed, so we leave some
             * space above the section heading.
             */

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                20;


            window.scrollTo({

                top: Math.max(
                    targetPosition,
                    0
                ),

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       LOGO → HOME
    ===================================================== */

    const logo =
        document.querySelector(".logo");


    if (logo) {

        logo.addEventListener(
            "click",
            event => {

                const homeSection =
                    document.querySelector("#home");


                if (!homeSection) {

                    return;

                }


                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });


                /*
                 * No "Home" navigation item currently exists,
                 * so remove any section highlight when returning
                 * to the top of the page.
                 */

                navLinks.forEach(link => {

                    link.classList.remove("active");

                });

            }
        );

    }



    /* =====================================================
       SCROLL HANDLER
    ===================================================== */

    let scrollTicking = false;


    function handleScroll() {

        if (!scrollTicking) {

            window.requestAnimationFrame(() => {

                updateActiveNavigation();

                scrollTicking = false;

            });


            scrollTicking = true;

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );



    /* =====================================================
       RESIZE HANDLER
    ===================================================== */

    let resizeTimeout;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimeout
            );


            resizeTimeout = setTimeout(
                () => {

                    updateActiveNavigation();

                },
                150
            );

        }
    );



    /* =====================================================
       INITIAL ACTIVE NAVIGATION
    ===================================================== */

    updateActiveNavigation();



    /* =====================================================
       SCROLL REVEAL
       
       This section only activates if elements with
       the "reveal" class exist.
       
       Therefore it will not interfere with the current
       website if your CSS/HTML doesn't use it yet.
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* =====================================================
       EXTERNAL LINKS
       
       Adds safe target behaviour to external links
       that open in a new tab.
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            "a[target='_blank']"
        );


    externalLinks.forEach(link => {

        const existingRel =
            link.getAttribute("rel") || "";


        const relValues =
            existingRel
                .split(" ")
                .filter(Boolean);


        if (
            !relValues.includes("noopener")
        ) {

            relValues.push("noopener");

        }


        if (
            !relValues.includes("noreferrer")
        ) {

            relValues.push("noreferrer");

        }


        link.setAttribute(
            "rel",
            relValues.join(" ")
        );

    });



    /* =====================================================
       KEYBOARD ACCESSIBILITY
       
       Allows ESC to remove active navigation state
       only when appropriate. Does not interfere with
       normal page navigation.
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {

                return;

            }


            /*
             * If focus is inside a navigation link,
             * return focus to the body.
             */

            if (
                document.activeElement &&
                document.activeElement.closest(
                    ".nav-menu"
                )
            ) {

                document.activeElement.blur();

            }

        }
    );



    /* =====================================================
       DEBUG / DEVELOPMENT CHECK
       
       These warnings help identify broken section links
       during development without affecting the website.
    ===================================================== */

    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            href &&
            href.startsWith("#") &&
            href !== "#"
        ) {

            const target =
                document.querySelector(href);


            if (!target) {

                console.warn(
                    `Navigation target not found: ${href}`
                );

            }

        }

    });



    /* =====================================================
       READY
    ===================================================== */

    console.log(
        "Muzammil Nadaf portfolio initialized successfully."
    );

});
