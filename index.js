// Main JavaScript file for portfolio

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.profile-toggle');
    const menu = document.querySelector('.profile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            menu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('show');
            }
        });
    }

    // Toggle project images visibility
    const toggleBtn = document.getElementById('toggleProjectBtn');
    if (toggleBtn) {
        let isShowing = false;
        const hiddenImages = document.querySelectorAll('.project-image-item.school-project');

        toggleBtn.addEventListener('click', () => {
            isShowing = !isShowing;

            hiddenImages.forEach((item, index) => {
                if (index === 0) {
                    // First image is always visible
                    return;
                }

                if (isShowing) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update button text and icon
            const icon = toggleBtn.querySelector('i');
            if (isShowing) {
                toggleBtn.innerHTML = '<i class="bi bi-eye-slash"></i> Verberg Extra Afbeeldingen';
            } else {
                toggleBtn.innerHTML = '<i class="bi bi-eye"></i> Toon Alle Afbeeldingen';
            }
        });
    }
});
