document.addEventListener('DOMContentLoaded', () => {
    initializeProfileMenu();
    initializeProjectToggle();
});

function initializeProfileMenu() {
    const toggle = document.querySelector('.profile-toggle');
    const menu = document.querySelector('.profile-menu');

    if (!toggle || !menu) {
        console.warn('Profile menu elements not found');
        return;
    }

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isExpanded));
        menu.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnToggle = toggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('show');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu.classList.contains('show')) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('show');
            toggle.focus();
        }
    });
}

function initializeProjectToggle() {
    const toggleBtn = document.getElementById('toggleProjectBtn');

    if (!toggleBtn) {
        console.warn('Toggle project button not found');
        return;
    }

    let isShowing = false;
    const projectImages = document.querySelectorAll('.project-image-item.school-project');

    if (projectImages.length === 0) {
        console.warn('No project images found');
        return;
    }

    toggleBtn.addEventListener('click', () => {
        isShowing = !isShowing;

        projectImages.forEach((item, index) => {
            if (index === 0) {
                return;
            }

            item.style.display = isShowing ? 'block' : 'none';
        });

        updateToggleButton(toggleBtn, isShowing);
    });
}

function updateToggleButton(button, isShowing) {
    const icon = isShowing ? 'bi-eye-slash' : 'bi-eye';
    const text = isShowing ? 'Verberg Extra Afbeeldingen' : 'Toon Alle Afbeeldingen';

    button.innerHTML = `<i class="bi ${icon}"></i> ${text}`;
}
