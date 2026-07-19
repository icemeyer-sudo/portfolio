function initParallax() {

    const parallaxElements = [
        [document.querySelector('#title-hero'), 0.3],
        [document.querySelector('#parallax-forest'), 1],
        [document.querySelector('#parallax-mountains'), 0.70],
        [document.querySelector('#parallax-sky'), 0.55],
    ];

    if (window.innerWidth > 768) {
    
        window.addEventListener('scroll', () => {
            
            applyParallax(parallaxElements)
        });
        
    }
}

function applyParallax(parallaxElements) {
    
    for (const [element, speed] of parallaxElements) {
        
        element.style.transform = `translateY(-${ window.scrollY * speed }px)`;
    }
}

export default initParallax;