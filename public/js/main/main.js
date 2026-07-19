import '/js/contact-form/form.js';
import '/js/menu/hamburgerMenu.js';
import initParallax from '/js/parallax/parallax.js';

initAboutSection();
initProjectsSection();
initParallax();

async function initProjectsSection() {
    const projects = await fetchProjectsContent();
    projects.forEach(project => renderProjectsContent(project));
}

async function fetchProjectsContent() {
    const res = await fetch('/api/projects');
    const projects = await res.json();
    return projects;
}

function renderProjectsContent(project) {
    const template = document.querySelector('#projects-template');
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('.card-title').textContent = project.title;
    clone.querySelector('.card-description').textContent = project.description;
    clone.querySelector('.card-link').href = project.link;
    clone.querySelector('.card-image').src = project.cover;
    
    document.querySelector('.div-projects').appendChild(clone);
}

async function initAboutSection() {
    const about = await fetchAboutContent();
    renderAboutContent(about);
}

async function fetchAboutContent() {
    const res = await fetch('/api/about');
    const {about} = await res.json();
    return about;
}

function renderAboutContent(about) {
    const skeleton = document.querySelector('.div-skeleton');
    skeleton.remove();
    const aboutSection = document.querySelector('.about-waterfall');
    const p = document.createElement('p');
    p.innerHTML = about;
    aboutSection.appendChild(p);
}