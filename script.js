document.addEventListener("DOMContentLoaded", function () {
    // --- Galerie ---
    const galerieLink = document.getElementById("galerie-link");
    const galleryContainer = document.getElementById("galerie");
    const gallery = document.querySelector(".gallery");
    const zavritBtn = document.getElementById("zavrit-galerii");

    const images = [
        { src: "1.jpg", alt: "Příprava stěny před aplikací" },
        { src: "2.jpg", alt: "Druhá vrstva stěrky" },
        { src: "3.jpg", alt: "Odstranění původní malby" },
        { src: "4.jpg", alt: "Druhá vrstva stěrky pod malbu" },
        { src: "5.jpg", alt: "Samonosná konstrukce stropu" },
        { src: "6.jpg", alt: "Vysokopevnostní sádrokarton Habito H" },
        { src: "7.jpg", alt: "Vizualizace koupelny" }
    ];

    function loadGallery(images) {
        images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = `obrazky/${image.src}`;
            imgElement.alt = image.alt;
            imgElement.loading = "lazy";

            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");

            const caption = document.createElement("p");
            caption.textContent = image.alt;

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
        // Otevření galerie - sledování události
        gtag('event', 'open_gallery', { 'event_category': 'Gallery', 'event_label': 'Open Gallery' });
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

    // --- Sledování scrollování ---
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        if (scrollPercentage >= 25 && !window.scroll25Tracked) {
            gtag('event', 'scroll', { 'event_category': 'Scroll', 'event_label': '25%' });
            window.scroll25Tracked = true;
        }
        if (scrollPercentage >= 50 && !window.scroll50Tracked) {
            gtag('event', 'scroll', { 'event_category': 'Scroll', 'event_label': '50%' });
            window.scroll50Tracked = true;
        }
        if (scrollPercentage >= 75 && !window.scroll75Tracked) {
            gtag('event', 'scroll', { 'event_category': 'Scroll', 'event_label': '75%' });
            window.scroll75Tracked = true;
        }
        if (scrollPercentage >= 100 && !window.scroll100Tracked) {
            gtag('event', 'scroll', { 'event_category': 'Scroll', 'event_label': '100%' });
            window.scroll100Tracked = true;
        }
    });

    // --- Odeslání formuláře ---
    document.querySelector('form[name="kontakt-formular"]').addEventListener('submit', function() {
        gtag('event', 'submit_form', { 'event_category': 'Form', 'event_label': 'Submit Form' });
    });
});