document.addEventListener("DOMContentLoaded", () => {
    // Dynamic Search
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search menu items...");
    searchInput.classList.add("form-control", "my-4");
    document.querySelector(".container").prepend(searchInput);

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            const title = card.querySelector(".card-title").innerText.toLowerCase();
            card.parentElement.style.display = title.includes(query) ? "block" : "none";
        });
    });

    // Mark as Favorite
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const favoriteBtn = document.createElement("button");
        favoriteBtn.classList.add("btn", "btn-outline-warning", "mt-2");
        favoriteBtn.innerText = "⭐ Add to Favorites";
        card.querySelector(".card-body").appendChild(favoriteBtn);

        favoriteBtn.addEventListener("click", () => {
            const title = card.querySelector(".card-title").innerText;
            const price = card.querySelector(".card-text").innerText;
            addToFavorites(title, price);
            favoriteBtn.innerText = "✔️ Favorited";
            favoriteBtn.disabled = true;
        });
    });

    function addToFavorites(title, price) {
        const favoritesSection = document.querySelector("#favorites");
        if (!favoritesSection) {
            const section = document.createElement("section");
            section.setAttribute("id", "favorites");
            section.innerHTML = `<h3 class="fw-bold mt-5">Favorites</h3><div class="row row-cols-1 row-cols-md-3 g-4"></div>`;
            document.querySelector(".container").appendChild(section);
        }

        const row = document.querySelector("#favorites .row");
        const favoriteCard = document.createElement("div");
        favoriteCard.classList.add("col");
        favoriteCard.innerHTML = `
            <div class="card">
                <div class="card-body bg-warning text-center">
                    <h5 class="card-title fw-bold">${title}</h5>
                    <p class="card-text text-danger">${price}</p>
                </div>
            </div>
        `;
        row.appendChild(favoriteCard);
    }

    // Add to Cart
    const cart = [];
    const cartBtn = document.createElement("button");
    cartBtn.innerText = "🛒 View Cart (0)";
    cartBtn.classList.add("btn", "btn-dark", "position-fixed", "bottom-0", "end-0", "m-4");
    document.body.appendChild(cartBtn);

    cards.forEach((card) => {
        const orderBtn = card.querySelector(".btn-danger");
        orderBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const title = card.querySelector(".card-title").innerText;
            const price = parseInt(card.querySelector(".card-text").innerText.replace("Rs", "").trim());
            cart.push({ title, price });
            updateCart();
        });
    });

    function updateCart() {
        cartBtn.innerText = `🛒 View Cart (${cart.length})`;
        cartBtn.addEventListener("click", () => {
            const cartItems = cart.map((item) => `<li>${item.title} - Rs ${item.price}</li>`).join("");
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            alert(`Cart Items:\n${cartItems}\n\nTotal: Rs ${total}`);
        });
    }

    // Ratings
    cards.forEach((card) => {
        const ratingContainer = document.createElement("div");
        ratingContainer.classList.add("mt-2");
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.innerText = "☆";
            star.style.cursor = "pointer";
            star.style.fontSize = "1.5rem";
            star.addEventListener("click", () => {
                ratingContainer.querySelectorAll("span").forEach((s, idx) => {
                    s.innerText = idx < i ? "★" : "☆";
                });
                alert(`You rated ${card.querySelector(".card-title").innerText} ${i} stars!`);
            });
            ratingContainer.appendChild(star);
        }
        card.querySelector(".card-body").appendChild(ratingContainer);
    });
});
