/**const container = document.querySelectorAll('.container');
container.forEach((container) => {
    for (let i = 0; i < 1; i++) {
        let row = document.createElement('div');
        row.classList.add('row-flex');
        container.appendChild(row);
        for (let j = 0; j < 10; j++) {
            let column = document.createElement('div');
            column.classList.add('row-color');
            column.style.filter = `hue-rotate(${i * 36}deg)`;
            row.appendChild(column);
        }
    }
})**/

window.addEventListener('scroll', (e) => {
    
    let speedTitle = -(window.scrollY) * 0.2;
    let speedParallax01 = -(window.scrollY) * 1;
    let speedParallax02 = -(window.scrollY) * 0.8;
    const hero = document.querySelector('#title-hero');
    const parallax01 = document.querySelector('#parallax-01');
    const parallax02 = document.querySelector('#parallax-02');
    hero.setAttribute('style', 'transform: translate(0px, ' + speedTitle + 'px)');
    parallax01.setAttribute('style', 'transform: translate3d(0px, ' + speedParallax01 + 'px, 0px)');
    parallax02.setAttribute('style', 'transform: translate3d(0px, ' + speedParallax02 + 'px, 0px)');
})

about();

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

function sendMessageEmpty() {
    console.log('Le formulaire doit être complété');
}

async function about() {
    const about = await getAbout();
    renderAbout(about);
}

async function getAbout() {
    const res = await fetch('/api/about');
    const {about} = await res.json();
    return about;
}

function renderAbout(about) {
    const skeleton = document.querySelector('.div-skeleton');
    skeleton.remove();
    const aboutSection = document.querySelector('.about-waterfall');
    const p = document.createElement('p');
    p.innerHTML = about;
    aboutSection.appendChild(p);
};