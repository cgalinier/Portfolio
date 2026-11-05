document.addEventListener("DOMContentLoaded", function () {

    console.log("script.js v5 chargé");

    /* ================= MODAL VIDEO ================= */
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("video-frame");
    const closeBtn = document.querySelector("#video-modal .close");

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

        modal.addEventListener("click", e => {
            if (e.target === modal) {
                modal.style.display = "none";
                iframe.src = "";
            }
        });
    }

    /* ================= ONGLETS PROJETS ================= */
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const activateTab = (tab) => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const btn = document.querySelector(`.tab-button[data-tab="${tab.id}"]`);
        if (btn) btn.classList.add('active');
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = document.getElementById(button.dataset.tab);
            if (target) activateTab(target);
            else console.warn("Onglet introuvable :", button.dataset.tab);
        });
    });

  /* ================= LIGHTBOX ================= */

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg && lightboxClose) {

    // Ouverture des images
    document.querySelectorAll('.lightbox-trigger').forEach(img => {

        img.style.cursor = 'zoom-in';

        img.addEventListener('click', () => {

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;

            if (lightboxCaption) {
                lightboxCaption.textContent =
                    img.dataset.caption || img.alt || '';
            }

            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermeture
    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Clic en dehors de l'image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

    /* ================= NAVIGATION + MENU DÉROULANT ================= */
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    const dropContent = document.querySelector('.dropdown-content');

    const isMobile = () => window.matchMedia('(hover: none), (max-width: 900px)').matches;

    const closeMenu = () => {
        if (!dropdown) return;
        dropdown.classList.remove('open');
        if (dropContent) dropContent.style.display = '';
    };

    const goToSection = (id) => {
        const target = document.getElementById(id);
        if (!target) {
            console.warn("Section introuvable :", id);
            return;
        }
        // Si la cible est dans un onglet (ou est un onglet), on l'active d'abord
        const tab = target.closest('.tab-content');
        if (tab) activateTab(tab);

        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

