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
});
