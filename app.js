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
});
