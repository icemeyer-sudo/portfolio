const parallaxElements = [
    [document.querySelector('.parallax-01'), 0.4],
    [document.querySelector('.parallax-02'), 0.2],
    [document.querySelector('.hero'), 0.8],
];

window.addEventListener('scroll', applyParallax);

function applyParallax() {
    
    for (const [element, speed] of parallaxElements) {
        
        element.style.transform = `translateY(${ window.scrollY * speed }px)`;
    }
}