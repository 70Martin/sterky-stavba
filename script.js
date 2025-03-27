document.addEventListener("DOMContentLoaded", function () {
    // --- Galerie ---
    const galerieLink = document.getElementById("galerie-link");
    const galleryContainer = document.getElementById("galerie");
    const gallery = document.querySelector(".gallery");
    const zavritBtn = document.getElementById("zavrit-galerii");

    const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

    function loadGallery(images) {
        images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = `obrazky/${image}`;
            imgElement.alt = `Obrázek ${image.split('.')[0]}`;
            imgElement.loading = "lazy";

            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");

            const caption = document.createElement("p");
            caption.textContent = image.split('.')[0];

            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(caption);
            gallery.appendChild(galleryItem);
        });
    }

    galerieLink.addEventListener("click", function (event) {
        event.preventDefault();
        if (gallery.children.length === 0) {
            loadGallery(images);
        }
        galleryContainer.style.display = "block";
        window.location.hash = "#galerie";
    });

    if (zavritBtn) {
        zavritBtn.addEventListener("click", function () {
            galleryContainer.style.display = "none";
        });
    }

    // --- Přepínač světlý / tmavý režim ---
    const toggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.textContent = "Světlý režim";
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        toggleBtn.textContent = isDark ? "Světlý režim" : "Tmavý režim";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
});