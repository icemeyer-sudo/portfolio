window.addEventListener('scroll', applyParallax);

function applyParallax() {
    
    const elementParallax01 = document.querySelector('.parallax-01');
    const elementParallax02 = document.querySelector('.parallax-02');
    const elementHero = document.querySelector('.hero');
    
    const scrollYel01 = (window.scrollY) * 0.4;
    const scrollYel02 = (window.scrollY) * 0.2;
    const scrollHero = (window.scrollY) * -0.2;

    elementParallax01.setAttribute('style', 'transform: translateY(' + scrollYel01 + 'px)');
    elementParallax02.setAttribute('style', 'transform: translateY(' + scrollYel02 + 'px)');
    elementHero.setAttribute('style', 'transform: translateY(' + scrollHero + 'px)');
    
}