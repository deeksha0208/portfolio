// ====================================
// 1. MOBILE NAVIGATION
// ====================================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar a");

menuToggle.addEventListener("click", function () {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// ====================================
// 2. HERO TYPING ANIMATION
// ====================================

const roleText = document.getElementById("roleText");

const roles = [
    "Web Development",
    "Programming",
    "Problem Solving",
    "Learning & Building"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function typeRole() {
    if (reducedMotion) {
        roleText.textContent = roles[0];
        return;
    }

    const currentRole = roles[roleIndex];

    if (!deleting) {
        characterIndex++;
        roleText.textContent = currentRole.substring(0, characterIndex);

        if (characterIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeRole, 1300);
            return;
        }

        setTimeout(typeRole, 85);
    } else {
        characterIndex--;
        roleText.textContent = currentRole.substring(0, characterIndex);

        if (characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 350);
            return;
        }

        setTimeout(typeRole, 40);
    }
}

typeRole();


// ====================================
// 3. SCROLL REVEAL ANIMATION
// ====================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// ====================================
// 4. BACK TO TOP BUTTON
// ====================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
    });
});


// ====================================
// 5. ACTIVE NAVIGATION LINK
// ====================================

const pageSections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
    let activeSection = "home";

    pageSections.forEach(function (section) {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight * 0.4) {
            activeSection = section.id;
        }
    });

    navLinks.forEach(function (link) {
        const isActive =
            link.getAttribute("href") === "#" + activeSection;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);


// ====================================
// 6. CURRENT COPYRIGHT YEAR
// ====================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();