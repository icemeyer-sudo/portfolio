import '/js/contact-form/form.js';
import getAbout from '/js/services/about/getAbout.js';
import getProjects from '/js/services/projects/getProjects.js';

const SKELETON_DELAY = 500;

initParallax();
initAbout();
initProjects();

async function initProjects() {
    
    const [projects] = await Promise.all([
        getProjects(),
        new Promise(resolve => setTimeout(resolve, SKELETON_DELAY))
    ]);
    
    renderProjects(projects);
}

async function initAbout() {
    
    const [about] = await Promise.all([
        getAbout(),
        new Promise(resolve => setTimeout(resolve, SKELETON_DELAY))
    ]);
    
    renderAbout(about);
}

function renderProjects(projects) {
    
    const cards = document.querySelectorAll('.cards');
    
    for (let i = 0; i < projects.length; i++) {
        
        cards[i].querySelector('h3').textContent = projects[i].title;
        cards[i].querySelector('p').textContent = projects[i].description;
        cards[i].querySelector('a').textContent = projects[i].link;
        cards[i].querySelector('img').src = projects[i].cover;
    }
}

function renderAbout(about) {
    
    document.querySelector('.div-skeleton').remove();
    const p = document.createElement('p');
    p.innerHTML = about;
    document.querySelector('.about-waterfall').appendChild(p);
}

function initParallax() {
    
    window.addEventListener('scroll', applyParallax);
    applyParallax();
}

function applyParallax() {
    
    let speedTitle = -(window.scrollY) * 0.3;
    let speedParallaxForest = -(window.scrollY) * 0.55;
    let speedParallaxMountains = -(window.scrollY) * 0.7;
    let speedParallaxSky = -(window.scrollY) * 1;
    const hero = document.querySelector('#title-hero');
    const parallaxSky = document.querySelector('#parallax-sky');
    const parallaxMountains = document.querySelector('#parallax-mountains');
    const parallaxForest = document.querySelector('#parallax-forest');
    hero.setAttribute('style', 'transform: translate(0px, ' + speedTitle + 'px)');
    parallaxSky.setAttribute('style', 'transform: translate3d(0px, ' + speedParallaxForest + 'px, 0px)');
    parallaxMountains.setAttribute('style', 'transform: translate3d(0px, ' + speedParallaxMountains + 'px, 0px)');
    parallaxForest.setAttribute('style', 'transform: translate3d(0px, ' + speedParallaxSky + 'px, 0px)');
    
    const middleScreen = window.innerHeight / 2;
    
    const projects = document.querySelectorAll('.cards');
    projects.forEach(project => {
        const screenY = window.scrollY + window.innerHeight / 1.2;
        const elementY = project.offsetTop + project.offsetHeight / 2;
        let diffY = elementY - screenY;
        if (diffY < 0) {
            diffY = 0;
        } else {
            diffY = diffY * 0.1;
        }
        
        project.setAttribute('style', 'transform: translate3d(' + diffY + 'px, ' + diffY + 'px, 0px)');
    });
    
    const inv = document.querySelector('.inv');

    let diffYInvInv;
    const screenYInv = window.scrollY + window.innerHeight / 1.2;
    const elementYInv = inv.offsetTop + inv.offsetHeight / 2;
    let diffYInv = elementYInv - screenYInv;
    if (diffYInv < 0) {
        diffYInvInv = 0;
        diffYInv = 0;
    } else {
        diffYInvInv = diffYInv * 0.1;
        diffYInv = diffYInv * -0.1;
    }
    
    inv.setAttribute('style', 'transform: translate3d(' + diffYInv + 'px, ' + diffYInvInv + 'px, 0px)');

}