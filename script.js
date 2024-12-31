// Scroll-to-Top Button
document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.innerText = "⬆️";
    scrollTopBtn.style.position = "fixed";
    scrollTopBtn.style.bottom = "20px";
    scrollTopBtn.style.right = "20px";
    scrollTopBtn.style.display = "none";
    scrollTopBtn.style.backgroundColor = "black";
    scrollTopBtn.style.color = "white";
    scrollTopBtn.style.border = "none";
    scrollTopBtn.style.borderRadius = "50%";
    scrollTopBtn.style.padding = "10px 15px";
    scrollTopBtn.style.cursor = "pointer";
    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// Dynamic Year in Footer
const yearElement = document.querySelector("footer p.mb-1");
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `&copy; ${currentYear} Andaaz-e-Pakwan. All rights reserved.`;
}

// Basic Form Validation (For Contact Us Page)
function validateContactForm() {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {
        alert("All fields are required!");
        return false;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        alert("Invalid email address!");
        return false;
    }
    return true;
}
