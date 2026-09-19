(() => {
    "use strict";

    const body = document.body;
    const nav = document.querySelector("[data-nav]");
    const menuButton = document.querySelector("[data-menu-button]");
    const menu = document.querySelector("[data-menu]");

    const onScroll = () => {
        if (nav) {
            nav.classList.toggle("is-scrolled", window.scrollY > 16);
        }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            const open = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!open));
            menu.classList.toggle("is-open", !open);
            body.classList.toggle("tv-menu-open", !open);
        });

        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menuButton.setAttribute("aria-expanded", "false");
                menu.classList.remove("is-open");
                body.classList.remove("tv-menu-open");
            });
        });
    }

    const revealElements = document.querySelectorAll(".tv-reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((el) => el.classList.add("tv-visible"));
    } else {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("tv-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -8% 0px",
            }
        );

        revealElements.forEach((el) => observer.observe(el));
    }

    const system = document.querySelector("[data-system]");

    if (system && window.matchMedia("(pointer: fine)").matches) {
        system.addEventListener("pointermove", (event) => {
            const rect = system.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            system.style.setProperty("--rx", `${(-y * 1.6).toFixed(2)}deg`);
            system.style.setProperty("--ry", `${(x * 2.2).toFixed(2)}deg`);
        });

        system.addEventListener("pointerleave", () => {
            system.style.setProperty("--rx", "0deg");
            system.style.setProperty("--ry", "0deg");
        });
    }
})();
