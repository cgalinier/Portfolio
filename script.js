document.addEventListener("DOMContentLoaded", function () {

    console.log("script.js v4 chargé");

    /* ================= LIGNES ANIMÉES ================= */
    const linesContainer = document.getElementById('linesContainer');
    if (linesContainer && linesContainer.children.length === 0) {
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'line' + (i % 5 === 0 ? ' thick' : '');
            line.style.left = (i * 5) + '%';
            line.style.animationDelay = (i * 0.4) + 's';
            linesContainer.appendChild(line);
        }
    }

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

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    /* ================= MENU DÉROULANT + NAVIGATION ================= */
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    const dropContent = document.querySelector('.dropdown-content');

    const isMobile = () => window.matchMedia('(hover: none), (max-width: 900px)').matches;

    const closeMenu = () => {
        if (!dropdown) return;
        dropdown.classList.remove('open');
        if (dropContent) dropContent.style.display = '';
    };

    // Active l'onglet qui contient la cible, puis défile jusqu'à elle
    const goToSection = (id) => {
        const target = document.getElementById(id);
        if (!target) {
            console.warn("Section introuvable :", id);
            return;
        }
        const tab = target.closest('.tab-content');
        if (tab) activateTab(tab);

        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
    };

    if (dropdown && dropbtn && dropContent) {

        // Toucher sur "Projets ▾"
        dropbtn.addEventListener('click', (e) => {
            if (!isMobile()) return;          // ordinateur : survol CSS
            e.preventDefault();
            e.stopPropagation();

            if (dropdown.classList.contains('open')) {
                closeMenu();
            } else {
                dropdown.classList.add('open');
                dropContent.style.display = 'block';
            }
        });

        // Toucher sur un sous-lien
        dropContent.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = link.getAttribute('href').replace('#', '');
                closeMenu();
                goToSection(id);
            });
        });

        // Toucher en dehors du menu
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) closeMenu();
        });
    } else {
        console.warn("Menu déroulant introuvable dans le HTML");
    }

});