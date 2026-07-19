import showAlert from '/js/contact-form/alert.js';

export function init() {
    
    initAboutSection();
    initAboutForm();
}

async function initAboutSection() {
    
    const about = await getAbout();
    renderAboutEditor(about);
}

async function getAbout() {
    
    const res = await fetch('/api/about');
    const {about} = await res.json();
    return about;
}

function renderAboutEditor(about) {
    
    const textarea = document.querySelector('#content-about');
    textarea.textContent = about;
};

function initAboutForm() {

    const post = document.querySelector('#post-about');
    post.addEventListener('click', handleSubmit);
    
}

async function handleSubmit(e) {
        
    e.preventDefault();
    const content = document.getElementById('content-about');
    
    if (content.value === '') {
        sendMessageEmpty();
        return;
    }
    
    try {

        const response = await updateAbout(content);

        if (response.ok) {
            showAlert("success");
        } else {
            showAlert("error");
        }
    } catch {
        showAlert("error");
    }
}

async function updateAbout(content) {
    
    return fetch('/api/about/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            content: content.value
        })
    });
}