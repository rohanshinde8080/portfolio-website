/* =========================================================
   ROHAN SHINDE PORTFOLIO
   PREMIUM JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. ANIMATED STAT COUNTERS
       ===================================================== */

    const counters = document.querySelectorAll(
        ".stat-number[data-count]"
    );

    counters.forEach(function (counter) {

        const target = Number(
            counter.getAttribute("data-count")
        );

        const decimals = Number(
            counter.getAttribute("data-decimals") || 0
        );

        const suffix =
            counter.getAttribute("data-suffix") || "";

        let started = false;

        function startCounter() {

            if (started) return;

            started = true;

            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                const value =
                    target * eased;

                counter.textContent =
                    value.toFixed(decimals) + suffix;

                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target.toFixed(decimals) +
                        suffix;
                }
            }

            requestAnimationFrame(updateCounter);
        }


        /* Start counter when visible */

        if ("IntersectionObserver" in window) {

            const counterObserver =
                new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    startCounter();

                                    observer.unobserve(
                                        entry.target
                                    );
                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );

            counterObserver.observe(counter);

        } else {

            startCounter();

        }

    });


    /* =====================================================
       2. GENERAL SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal-on-scroll"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                observer.unobserve(
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
            function (element) {

                revealObserver.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       3. GENERAL 3D CARD TILT
       ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".tilt-card"
        );


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        tiltCards.forEach(
            function (card) {

                card.addEventListener(
                    "mousemove",
                    function (event) {

                        const rect =
                            card.getBoundingClientRect();

                        const mouseX =
                            event.clientX -
                            rect.left;

                        const mouseY =
                            event.clientY -
                            rect.top;


                        const rotateY =
                            (
                                mouseX /
                                rect.width -
                                0.5
                            ) * 8;


                        const rotateX =
                            (
                                mouseY /
                                rect.height -
                                0.5
                            ) * -8;


                        card.style.transform =
                            "perspective(900px) " +
                            "rotateX(" +
                            rotateX +
                            "deg) " +
                            "rotateY(" +
                            rotateY +
                            "deg) " +
                            "translateY(-5px)";

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {

                        card.style.transform =
                            "perspective(900px) " +
                            "rotateX(0deg) " +
                            "rotateY(0deg) " +
                            "translateY(0)";

                    }
                );

            }
        );

    }


    /* =====================================================
       4. ACTIVE NAVBAR LINK
       ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if ("IntersectionObserver" in window) {

        const navObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            navLinks.forEach(
                                function (link) {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const activeLink =
                                document.querySelector(
                                    '.nav-link[href="#' +
                                    entry.target.id +
                                    '"]'
                                );


                            if (activeLink) {

                                activeLink.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(
            function (section) {

                navObserver.observe(section);

            }
        );

    }


    /* =====================================================
       5. MOBILE MENU
       ===================================================== */

    const mobileButton =
        document.getElementById(
            "mobile-menu-btn"
        );

    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    if (
        mobileButton &&
        mobileMenu
    ) {

        mobileButton.addEventListener(
            "click",
            function () {

                mobileMenu.classList.toggle(
                    "open"
                );


                const icon =
                    mobileButton.querySelector(
                        "i"
                    );


                if (icon) {

                    if (
                        mobileMenu.classList.contains(
                            "open"
                        )
                    ) {

                        icon.classList.remove(
                            "fa-bars"
                        );

                        icon.classList.add(
                            "fa-xmark"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );


        /* Close menu after clicking link */

        mobileMenu
            .querySelectorAll("a")
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            mobileMenu.classList.remove(
                                "open"
                            );


                            const icon =
                                mobileButton.querySelector(
                                    "i"
                                );


                            if (icon) {

                                icon.classList.remove(
                                    "fa-xmark"
                                );

                                icon.classList.add(
                                    "fa-bars"
                                );

                            }

                        }
                    );

                }
            );

    }


    /* =====================================================
       6. MAGNETIC BUTTON EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".hero-btn, .nav-connect"
        );


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "mousemove",
                    function (event) {

                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        button.style.transform =
                            "translate(" +
                            x * 0.08 +
                            "px, " +
                            y * 0.08 +
                            "px)";

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    function () {

                        button.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       7. SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

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


                        if (target) {

                            event.preventDefault();


                            target.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            }
        );


    /* =====================================================
       8. CURSOR GLOW
       ===================================================== */

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "cursor-glow";

        document.body.appendChild(
            cursorGlow
        );


        document.addEventListener(
            "mousemove",
            function (event) {

                cursorGlow.style.left =
                    event.clientX + "px";

                cursorGlow.style.top =
                    event.clientY + "px";

            }
        );

    }


    /* =====================================================
       9. SKILLS SECTION
       SCROLL REVEAL
       ===================================================== */

    const skillRevealElements =
        document.querySelectorAll(
            ".reveal-skill"
        );


    if ("IntersectionObserver" in window) {

        const skillObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "skill-visible"
                                );

                                observer.unobserve(
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


        skillRevealElements.forEach(
            function (element) {

                skillObserver.observe(
                    element
                );

            }
        );

    } else {

        skillRevealElements.forEach(
            function (element) {

                element.classList.add(
                    "skill-visible"
                );

            }
        );

    }


    /* =====================================================
       10. SKILLS 3D TILT
       ===================================================== */

    const skillCards =
        document.querySelectorAll(
            ".tilt-skill"
        );


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        skillCards.forEach(
            function (card) {

                card.addEventListener(
                    "mousemove",
                    function (event) {

                        const rect =
                            card.getBoundingClientRect();


                        const mouseX =
                            event.clientX -
                            rect.left;


                        const mouseY =
                            event.clientY -
                            rect.top;


                        const rotateY =
                            (
                                mouseX /
                                rect.width -
                                0.5
                            ) * 8;


                        const rotateX =
                            (
                                mouseY /
                                rect.height -
                                0.5
                            ) * -8;


                        card.style.transform =
                            "perspective(900px) " +
                            "rotateX(" +
                            rotateX +
                            "deg) " +
                            "rotateY(" +
                            rotateY +
                            "deg) " +
                            "translateY(-10px) " +
                            "scale(1.015)";

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       11. SKILLS HOVER EFFECT
       ===================================================== */

    skillCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "skill-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "skill-hover"
                    );

                }
            );

        }
    );

    /* =========================================================
   PROJECTS SECTION JAVASCRIPT
========================================================= */


/* =========================================================
   PROJECT SCROLL REVEAL
========================================================= */

const projectRevealItems = document.querySelectorAll(
    ".reveal-project"
);

const projectRevealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "project-visible"
                );

            }

        });

    },
    {
        threshold: 0.12
    }
);


projectRevealItems.forEach((item) => {

    projectRevealObserver.observe(item);

});


/* =========================================================
   PROJECT 3D TILT
========================================================= */

const projectTiltCards = document.querySelectorAll(
    ".tilt-project"
);


projectTiltCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        /*
         * Mobile devices don't need tilt.
         */

        if (window.innerWidth <= 640) {
            return;
        }


        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -4;

        const rotateY =
            ((x - centerX) / centerX) * 5;


        card.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

    });

});


/* =========================================================
   PROJECT CARD MOUSE GLOW
========================================================= */

projectTiltCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth <= 640) {
            return;
        }


        const rect =
            card.getBoundingClientRect();


        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        card.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });

});


/* =========================================================
   PROJECT LINK HOVER
========================================================= */

const projectLinks =
    document.querySelectorAll(
        ".project-link, .project-btn"
    );


projectLinks.forEach((link) => {

    link.addEventListener(
        "mouseenter",
        () => {

            link.style.transform =
                "translateY(-2px)";

        }
    );


    link.addEventListener(
        "mouseleave",
        () => {

            link.style.transform =
                "";

        }
    );

});


/* =========================================================
   PROJECT SECTION ACTIVE NAV
========================================================= */

const projectsSection =
    document.querySelector("#work");

const projectsNavLink =
    document.querySelector(
        '.nav-link[href="#work"]'
    );


if (projectsSection && projectsNavLink) {

    const projectNavObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        document
                            .querySelectorAll(".nav-link")
                            .forEach((link) => {

                                link.classList.remove(
                                    "active"
                                );

                            });


                        projectsNavLink.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    projectNavObserver.observe(
        projectsSection
    );

}


/* =========================================================
   PROJECTS LOADED
========================================================= */

console.log(
    "Projects section loaded successfully 🚀"
);


    /* =====================================================
       12. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "🚀 Rohan Shinde Portfolio Loaded Successfully"
    );

});