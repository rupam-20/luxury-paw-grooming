// ===== Elements =====


const emptyState = document.getElementById("emptyState");
const bookingForm = document.getElementById("bookingForm");
const loader = document.getElementById("loader");
const successMessage = document.getElementById("successMessage");

const petName = document.getElementById("petName");
const ownerName = document.getElementById("ownerName");
const service = document.getElementById("service");

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

const darkModeBtn = document.querySelector(".dark-mode-toggle");
if (successMessage) {
    successMessage.style.display = "none";
}
// ===== Sanitize Input =====

function sanitizeInput(input) {
    return input
        .trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// ===== Hamburger Menu =====

if (menuToggle) {
    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

        menuToggle.textContent =
            navbar.classList.contains("active")
                ? "✕"
                : "☰";
    });
}

// ===== Dark Mode =====

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            darkModeBtn.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            darkModeBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "☀️";
    }
}

// ===== Remove Error =====

if (petName && ownerName && service) {

    [petName, ownerName, service].forEach(field => {

        field.addEventListener("input", () => {
            field.classList.remove("error");
        });

        field.addEventListener("change", () => {
            field.classList.remove("error");
        });
    });
}

// ===== Booking Form =====

if (bookingForm) {

    bookingForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let isValid = true;

        [petName, ownerName, service].forEach(field => {
            field.classList.remove("error");
        });

        if (petName.value.trim() === "") {
            petName.classList.add("error");
            isValid = false;
        }

        if (ownerName.value.trim() === "") {
            ownerName.classList.add("error");
            isValid = false;
        }

        if (service.value === "") {
            service.classList.add("error");
            isValid = false;
        }

        if (!isValid) return;

        const bookingData = {
            petName: sanitizeInput(petName.value),
            ownerName: sanitizeInput(ownerName.value),
            service: sanitizeInput(service.value)
        };

        loader.style.display = "block";
        successMessage.style.display = "none";

        setTimeout(() => {

            loader.style.display = "none";
            successMessage.style.display = "block";

            console.log("Booking Saved:", bookingData);

            console.log(
                "[Analytics] User interacted with Luxury Pet Grooming Salon Pricing Page"
            );

            bookingForm.reset();

            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);

        }, 1500);
    });
}

// ===== Book Now Buttons =====

document.querySelectorAll(".book-btn").forEach(button => {

    button.addEventListener("click", () => {

        document
            .getElementById("booking")
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});

// ===== Hero Image Slider =====

const hero = document.querySelector(".hero");

const images = [
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&q=80",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&q=80"
];
images.forEach(src => {
    const img = new Image();
    img.src = src;
});

let current = 0;

function changeHeroImage() {

    if (!hero) return;

    hero.style.background =
        `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)),
        url('${images[current]}') center/cover no-repeat`;
}

changeHeroImage();

// Next Button

const nextBtn = document.getElementById("nextBtn");

if (nextBtn) {
    nextBtn.addEventListener("click", () => {

        current = (current + 1) % images.length;

        changeHeroImage();
    });
}

// Previous Button

const prevBtn = document.getElementById("prevBtn");

if (prevBtn) {
    prevBtn.addEventListener("click", () => {

        current = (current - 1 + images.length) % images.length;

        changeHeroImage();
    });
}

//Auto Change Every 5 Seconds

if (hero) {
    setInterval(() => {
        current = (current + 1) % images.length;
        changeHeroImage();
    }, 5000);
}