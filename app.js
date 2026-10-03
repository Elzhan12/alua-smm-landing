document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const reveals = document.querySelectorAll(".reveal");
    const navToggle = document.querySelector(".nav-toggle");
    const navList = document.querySelector(".nav-list");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.style.boxShadow = "0 30px 60px -40px rgba(244, 114, 182, 0.8)";
                header.style.background = "rgba(20, 5, 16, 0.82)";
            } else {
                header.style.boxShadow = "none";
                header.style.background = "rgba(20, 5, 16, 0.62)";
            }
        });
    }

    if (reveals.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        reveals.forEach((el) => observer.observe(el));
    }

    if (navToggle && navList) {
        navToggle.addEventListener("click", () => {
            const isOpen = navList.classList.toggle("open");
            navToggle.classList.toggle("active", isOpen);
        });

        navList.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navList.classList.remove("open");
                navToggle.classList.remove("active");
            });
        });
    }

    // Stagger reveal for card grids
    const staggerGroups = document.querySelectorAll(".stagger");
    if (staggerGroups.length > 0 && "IntersectionObserver" in window) {
        const staggerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        staggerObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
        );

        staggerGroups.forEach((el) => staggerObserver.observe(el));
    } else {
        staggerGroups.forEach((el) => el.classList.add("in"));
    }

    // Count-up numbers
    const counters = document.querySelectorAll("[data-count]");
    const animateCounter = (el) => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    if (counters.length > 0 && "IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach((el) => counterObserver.observe(el));
    }

    // Soft parallax on background blobs
    const blobs = document.querySelectorAll(".bg-blob");
    if (blobs.length > 0 && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        window.addEventListener(
            "scroll",
            () => {
                const offset = window.scrollY * 0.06;
                blobs.forEach((blob, i) => {
                    blob.style.marginTop = offset * (i + 1) * 0.5 + "px";
                });
            },
            { passive: true }
        );
    }
});
