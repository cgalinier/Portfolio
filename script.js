<script>
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("video-frame");
    const closeBtn = document.querySelector(".close");

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
});
</script>
