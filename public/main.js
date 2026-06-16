initParallax();
initContactForm();
initAboutSection();
initProjectsSection();

async function initProjectsSection() {
    const projects = await fetchProjectsContent();
    renderProjectsContent(projects);
}

async function fetchProjectsContent() {
    const res = await fetch('/api/projects');
    const projects = await res.json();
    console.log(projects);
    return projects;
}

function renderProjectsContent(projects) {
    const cards = document.querySelectorAll('.cards');
    for (let i = 0; i < projects.length; i++) {
        const title = cards[i].querySelector('h3');
        title.textContent = projects[i].title;
        
        const description = cards[i].querySelector('p');
        description.textContent = projects[i].description;
        
        const link = cards[i].querySelector('a');
        link.textContent = projects[i].link;
        
        const image = cards[i].querySelector('img');
        image.src = projects[i].cover;
        
    }
}

function initContactForm() {
    const post = document.querySelector('.post');

    post.addEventListener('click', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const content = document.getElementById('content');
        
        if (name.value === '') {
            sendMessageEmpty();
            return;
        }
        if (email.value === '') {
            sendMessageEmpty();
            return;
        }
        if (content.value === '') {
            sendMessageEmpty();
            return;
        }

        const response = await fetch('/api/messages/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: name.value,
                email: email.value,
                content: content.value
            })
        });

        if (response.ok) {
            console.log('Envoyé');
            name.value = '';
            email.value = '';
            content.value = '';
        } else {
            // Afficher un message d'erreur sans recharger
        }
    });
}

function notifyEmptyFields() {
    console.log('Le formulaire doit être complété');
};

async function initAboutSection() {
    const about = await fetchAboutContent();
    renderAboutContent(about);
};

async function fetchAboutContent() {
    const res = await fetch('/api/about');
    const {about} = await res.json();
    return about;
};

function renderAboutContent(about) {
    const skeleton = document.querySelector('.div-skeleton');
    skeleton.remove();
    const aboutSection = document.querySelector('.about-waterfall');
    const p = document.createElement('p');
    p.innerHTML = about;
    aboutSection.appendChild(p);
};

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