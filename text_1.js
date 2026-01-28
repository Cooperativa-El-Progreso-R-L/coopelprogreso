/* =========================
   SLIDER FUNCTIONALITY
========================= */
let currentSlideIndex = 0;
let autoSlideInterval = null;

function goToSlide(index) {
    const sliderImages = document.querySelectorAll('.slider img');
    const sliderNav = document.querySelectorAll('.slider-nav a');
    
    if (index >= sliderImages.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = sliderImages.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Scroll horizontally sin afectar el scroll vertical
    const sliderContainer = document.querySelector('.slider');
    if (sliderContainer) {
        sliderContainer.scrollLeft = sliderImages[currentSlideIndex].offsetLeft;
    }
    
    // Actualizar indicadores activos
    sliderNav.forEach((nav, idx) => {
        nav.style.opacity = idx === currentSlideIndex ? '1' : '0.75';
        nav.style.backgroundColor = idx === currentSlideIndex ? '#73FF26' : '#f5f6f7';
    });
}

function nextSlide() {
    goToSlide(currentSlideIndex + 1);
}

function prevSlide() {
    goToSlide(currentSlideIndex - 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

/* =========================
   VALIDACIÓN AL CARGAR
========================= */
// Inicializar slider inmediatamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

function initializeAll() {
    // Inicializar slider
    goToSlide(0);
    startAutoSlide();

    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const dropdownLinks = document.querySelectorAll('.dropdown li button[data-page]');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    const brand = document.querySelector('.brand');

    const closeDropdowns = () => {
        document.querySelectorAll('.has-dropdown.open').forEach(item => item.classList.remove('open'));
    };

    const setActive = (target) => {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('is-active'));
        const parentDropdown = target.closest('.has-dropdown');
        if (parentDropdown) {
            const trigger = parentDropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.classList.add('is-active');
            }
        } else {
            target.classList.add('is-active');
        }
    };

    const loadPage = (page) => {
        if (page && typeof pages !== 'undefined' && pages[page]) {
            document.getElementById('page-content').innerHTML = pages[page];
            window.scrollTo(0, 0);
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            const page = link.dataset.page;
            closeDropdowns();
            setActive(link);
            loadPage(page);
        });
    });

    dropdownLinks.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const page = item.dataset.page;
            setActive(item);
            loadPage(page);
            closeDropdowns();
        });
    });

    // Agregar hover en desktop para desplegar dropdowns automáticamente
    const hasDropdownItems = document.querySelectorAll('.has-dropdown');
    let closeDropdownTimeout;

    const closeOtherDropdowns = (excludeItem) => {
        hasDropdownItems.forEach(item => {
            if (item !== excludeItem) {
                item.classList.remove('open');
            }
        });
    };

    hasDropdownItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Solo abrir en hover en dispositivos desktop (no móvil)
            if (window.innerWidth > 768) {
                clearTimeout(closeDropdownTimeout);
                closeOtherDropdowns(item);
                item.classList.add('open');
            }
        });
        item.addEventListener('mouseleave', () => {
            // Cerrar en hover solo en desktop, con delay para permitir interacción
            if (window.innerWidth > 768) {
                closeDropdownTimeout = setTimeout(() => {
                    item.classList.remove('open');
                }, 100);
            }
        });

        // Agregar eventos al dropdown mismo para mantenerlo abierto
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    clearTimeout(closeDropdownTimeout);
                    item.classList.add('open');
                }
            });
            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    closeDropdownTimeout = setTimeout(() => {
                        item.classList.remove('open');
                    }, 100);
                }
            });
        }
    });

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = trigger.closest('.has-dropdown');
            // En móvil, usar click para abrir/cerrar
            if (window.innerWidth <= 768) {
                const isOpen = parent.classList.contains('open');
                closeDropdowns();
                if (!isOpen) {
                    parent.classList.add('open');
                }
            }
        });
    });

    document.addEventListener('click', () => {
        // Cerrar dropdowns al hacer click fuera en móvil
        if (window.innerWidth <= 768) {
            closeDropdowns();
        }
    });

    if (brand) {
        brand.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDropdowns();
            const homeLink = document.querySelector('.nav-link[data-page="home"]');
            if (homeLink) {
                setActive(homeLink);
            }
            loadPage('home');
        });
    }

    const homeLink = document.querySelector('.nav-link[data-page="home"]');
    if (homeLink) {
        setActive(homeLink);
    }
}

// Pausar slider al pasar el mouse
const sliderWrapper = document.querySelector('.slider-wrapper');
if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);
}

/* =========================
   MENÚ HAMBURGUESA MÓVIL
========================= */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMain = document.querySelector('.nav-main');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownButtons = document.querySelectorAll('.dropdown li button');

    if (!menuToggle || !navMain || !mobileOverlay) return;

    // Función para abrir el menú
    const openMenu = () => {
        menuToggle.classList.add('active');
        navMain.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Función para cerrar el menú
    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMain.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Toggle del menú
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMain.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar menú al hacer clic en el overlay
    mobileOverlay.addEventListener('click', () => {
        closeMenu();
    });

    // Cerrar menú al hacer clic en un enlace del nav principal (solo si no tiene dropdown)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && !link.classList.contains('dropdown-trigger')) {
                closeMenu();
            }
        });
    });

    // Cerrar menú solo al hacer clic en un enlace de dropdown (submenú)
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Cerrar el menú solo después de que se cargue la página
                setTimeout(() => {
                    closeMenu();
                }, 100);
            }
        });
    });

    // Cerrar menú al hacer clic en el brand
    const brand = document.querySelector('.brand');
    if (brand) {
        brand.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navMain.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Limpiar overflow al cambiar de tamaño la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Inicializar menú móvil después de cargar el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}
