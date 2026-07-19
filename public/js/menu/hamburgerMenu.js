initHamburgerMenu();

function initHamburgerMenu() {
    
    initHamburgerToggle();
    initMenuLinkListeners();
}

function initHamburgerToggle() {
    
    const hamburgerIcon = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.menu-hamburger');
    
    hamburgerIcon.addEventListener('click', () => {
        toggleMobileMenu(mobileMenu)
    });
}

function initMenuLinkListeners() {
    
    const linkHamburger = document.querySelectorAll('.link-hamburger');
    const mobileMenu = document.querySelector('.menu-hamburger');
    
    linkHamburger.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        })
    })
}

function toggleMobileMenu(mobileMenu) {
    
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}