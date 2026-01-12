document.addEventListener('DOMContentLoaded', () => {
    initializeProfileMenu();
    initializeProjectToggle();
    initializeGallery();
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

// Gallery initialization
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCurrent = document.querySelector('.lightbox-current');
    const lightboxTotal = document.querySelector('.lightbox-total');

    if (!galleryItems.length || !lightbox) {
        console.warn('Gallery elements not found');
        return;
    }

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('.gallery-image');
        return {
            src: img.src,
            alt: img.alt,
            element: img
        };
    });

    // Update total count in lightbox
    if (lightboxTotal) {
        lightboxTotal.textContent = images.length;
    }

    // Open lightbox when clicking on gallery items
    galleryItems.forEach((item, index) => {
        const expandBtn = item.querySelector('.gallery-btn-expand');
        if (expandBtn) {
            expandBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        }
        // Also allow clicking on the image itself
        const imageWrapper = item.querySelector('.gallery-image-wrapper');
        if (imageWrapper) {
            imageWrapper.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImage() {
        const image = images[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        if (lightboxCurrent) {
            lightboxCurrent.textContent = currentImageIndex + 1;
        }
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }

    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Next button
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }

    // Previous button
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });
}
