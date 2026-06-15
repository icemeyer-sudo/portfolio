initParallax();
initContactForm();
initAboutSection();

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
    window.addEventListener('scroll', (e) => {
    
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
    })
}