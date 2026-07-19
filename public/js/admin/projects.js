export async function init() {
    
    await initProjectsSection();
    initProjectSubmit();
}

async function initProjectsSection() {
    const res = await fetch('/api/projects');
    const projects = await res.json();
    
    projects.forEach(project => renderProject(project));
    moveItem(projects);
}

function renderProject(project) {
    const template = document.querySelector('#project-template');
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('#title').value = project.title;
    clone.querySelector('#description').value = project.description;
    clone.querySelector('#link').value = project.link;
    clone.querySelector('#url').value = project.cover;
    clone.querySelector('.div-title').dataset.position = project.position;
    clone.querySelector('.div-title').dataset.id = project.id;
    clone.querySelector('.post-project').dataset.id = project.id;
    
    document.querySelector('.admin-projects').appendChild(clone);
}

function initProjectSubmit() {
    
    const btnPostProjects = document.querySelectorAll('.post-project');
    btnPostProjects.forEach(project => {
        project.addEventListener('click', handleProjectSubmit);
    })
}

async function handleProjectSubmit(e) {
    
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    const form = e.currentTarget.closest('form');
    
    const project = {
        title: form.querySelector('#title').value,
        description: form.querySelector('#description').value,
        link: form.querySelector('#link').value,
        cover: form.querySelector('#url').value,
    };
    
    try {
        
        const response = await updateProject(id, project);
        if (!response.ok) throw new Error('Erreur lors de la mise à jour');
        
    } catch {
        
        console.error('Echec de la mise à jour');
    }
}

async function updateProject(id, project) {
    
    return fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    });
} 

function moveItem(projects) {
    const moveUp = document.querySelectorAll('.move-up');
    const moveDown = document.querySelectorAll('.move-down');
    
    moveUp.forEach(btn => moveToUp(btn));
    moveDown.forEach(btn => moveToDown(btn));
    
}

function moveToUp(btn) {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const position = parseInt(e.target.parentNode.dataset.position);
        if ((position - 1 <= 0)) {
            return;
        }
        
        const newPosition = position - 1;
        const currentElement = e.target.parentNode;
        const topElement = document.querySelector(`[data-position="${newPosition}"]`);
        
        currentElement.dataset.position = newPosition;
        topElement.dataset.position = position;
        
        const currentId = parseInt(currentElement.dataset.id);
        const topId = parseInt(topElement.dataset.id);
        
        const response = await fetch('/api/projects/positions', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                swaps: [
                    { id: currentId, position: newPosition },
                    { id: topId,     position: position }
                ]
            })
        });

        if (!response.ok) {
            // Annuler le swap visuel si la requête échoue
            currentElement.dataset.position = position;
            topElement.dataset.position = newPosition;
            return;
        }
        
        const currentContainer = currentElement.closest('.admin-projects > *');
        const topContainer = topElement.closest('.admin-projects > *');
        
        const currentRect = currentContainer.getBoundingClientRect();
        const topRect = topContainer.getBoundingClientRect();
        
        const parentContainer = document.querySelector('.admin-projects');
        const adminProjects = document.querySelector('.admin-projects');
        adminProjects.style.height = adminProjects.getBoundingClientRect().height + 'px';
        
        topContainer.before(currentContainer);
        
        const deltaForCurrent = currentRect.top - currentContainer.getBoundingClientRect().top;
        const deltaForTop = topRect.top - topContainer.getBoundingClientRect().top;
        
        currentContainer.style.transform = `translateY(${deltaForCurrent}px)`;
        topContainer.style.transform = `translateY(${deltaForTop}px)`;
        
        currentContainer.getBoundingClientRect();
        
        currentContainer.style.transition = 'transform 1s ease';
        topContainer.style.transition = 'transform 1s ease';
        currentContainer.style.transform = '';
        topContainer.style.transform = '';
        
        currentContainer.addEventListener('transitionend', () => {
            adminProjects.style.height = '';
            currentContainer.style.transition = '';
        }, { once: true });

        topContainer.addEventListener('transitionend', () => {
            topContainer.style.transition = '';
        }, { once: true });
    })
}

function moveToDown(btn) {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const position = parseInt(e.target.parentNode.dataset.position);
        if ((position + 1 > 3)) {
            return;
        }
        
        const newPosition = position + 1;
        const currentElement = e.target.parentNode;
        const downElement = document.querySelector(`[data-position="${newPosition}"]`);
        
        currentElement.dataset.position = newPosition;
        downElement.dataset.position = position;
        
        const currentId = parseInt(currentElement.dataset.id);
        const downId = parseInt(downElement.dataset.id);
        
        const response = await fetch('/api/projects/positions', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                swaps: [
                    { id: currentId, position: newPosition },
                    { id: downId,     position: position }
                ]
            })
        });

        if (!response.ok) {
            // Annuler le swap visuel si la requête échoue
            currentElement.dataset.position = position;
            topElement.dataset.position = newPosition;
            return;
        }
        
        const currentContainer = currentElement.closest('.admin-projects > *');
        const downContainer = downElement.closest('.admin-projects > *');
        
        const currentRect = currentContainer.getBoundingClientRect();
        const downRect = downContainer.getBoundingClientRect();
        
        const parentContainer = document.querySelector('.admin-projects');
        const adminProjects = document.querySelector('.admin-projects');
        adminProjects.style.height = adminProjects.getBoundingClientRect().height + 'px';
        
        downContainer.after(currentContainer);
        
        const deltaForCurrent = currentRect.top - currentContainer.getBoundingClientRect().top;
        const deltaForTop = downRect.top - downContainer.getBoundingClientRect().top;
        
        currentContainer.style.transform = `translateY(${deltaForCurrent}px)`;
        downContainer.style.transform = `translateY(${deltaForTop}px)`;
        
        currentContainer.getBoundingClientRect();
        
        currentContainer.style.transition = 'transform 1s ease';
        downContainer.style.transition = 'transform 1s ease';
        currentContainer.style.transform = '';
        downContainer.style.transform = '';
        
        currentContainer.addEventListener('transitionend', () => {
            adminProjects.style.height = '';
            currentContainer.style.transition = '';
        }, { once: true });

        downContainer.addEventListener('transitionend', () => {
            downContainer.style.transition = '';
        }, { once: true });
    })
}