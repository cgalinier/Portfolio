document.addEventListener("DOMContentLoaded", function() {

    /* ================= MODAL VIDEO ================= */
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("video-frame");
    const closeBtn = document.querySelector(".close");

    if (modal && iframe && closeBtn) {
        document.querySelectorAll(".video-link").forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const videoId = link.getAttribute("data-video-id");
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                modal.style.display = "flex";
            });
        });

        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            iframe.src = "";
        });

        window.addEventListener("click", e => {
            if (e.target === modal) {
                modal.style.display = "none";
                iframe.src = "";
            }
        });
    }

    /* ================= ONGLET PROJETS ================= */
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const target = document.getElementById(button.dataset.tab);
            if (target) target.classList.add('active');
        });
    });

    /* ================= LIGHTBOX ================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
        document.querySelectorAll('.lightbox-trigger').forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.dataset.caption;
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // fermer au clic sur le fond
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    /* ================= MENU DÉROULANT (MOBILE) ================= */
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');

    if (dropdown && dropbtn) {
        // Toucher sur "Projets ▾" : ouvre/ferme le menu au lieu de naviguer
        dropbtn.addEventListener('click', (e) => {
            if (window.matchMedia('(hover: none), (max-width: 768px)').matches) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });

        // Toucher sur un sous-lien : on referme le menu, la navigation se fait normalement
        dropdown.querySelectorAll('.dropdown-content a').forEach(link => {
            link.addEventListener('click', () => dropdown.classList.remove('open'));
        });

        // Toucher en dehors du menu : on le ferme
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }

});