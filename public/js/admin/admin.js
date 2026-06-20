initDashboard();

async function initDashboard() {
    await renderMessageTable();
    initDeleteSelection();
    initAboutEditor();
    initAboutForm();
    initAdminProjetcts();
}

async function renderMessageTable() {
    const messages = await fetchMessages();
    const table = document.querySelector('.table-messages');
    
    messages.forEach((msg) => {
        const tr = document.createElement('tr');
        tr.dataset.id = msg.id;
        
        for (const key in msg) {
            const td = document.createElement('td');
            td.textContent = msg[key];
            tr.append(td);   
        }
        
        const options = document.createElement('td');
        options.classList.add('td-delete');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.classList.add('check-delete');
        checkbox.type = 'checkbox';
        label.append(checkbox);
        options.append(label);
        tr.append(options);
        table.appendChild(tr);
    })
}

async function fetchMessages() {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    return messages;
}

function handleMessageClick(msg) {
    const tr = document.querySelectorAll('tr');
    console.log(msg);
}

async function initAboutEditor() {
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

    post.addEventListener('click', async (e) => {
        e.preventDefault();

        const content = document.getElementById('content-about');
        
        if (content.value === '') {
            sendMessageEmpty();
            return;
        }

        const response = await fetch('/api/about/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                content: content.value
            })
        });

        if (response.ok) {
            console.log('Envoyé');
        } else {
            // Afficher un message d'erreur sans recharger
        }
    });
}

function initDeleteSelection() {
    const checkboxes = document.querySelectorAll('.check-delete');
    const checkAll = document.querySelector('#check-all');
    let ids = [];
    
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const checked = [...checkboxes].filter(cb => cb.checked);
            checkAll.checked = [...checkboxes].every(cb => cb.checked);
            if (checked.length > 0) {
                if (!document.querySelector('.trash-icon')) {
                    const heroMessages = document.querySelector('.hero-messages');
                    const buttonDelete = document.createElement('button');
                    buttonDelete.classList.add('trash-icon');
                    buttonDelete.textContent = 'Supprimer';
                    heroMessages.append(buttonDelete);
                    buttonDelete.addEventListener('click', () => deleteSelectedMessages(checked));
                }
            } else {
                if (document.querySelector('.trash-icon')) {
                    document.querySelector('.trash-icon').remove();
                }
            }
        });
    })
    
    checkAll.addEventListener('change', () => {
        checkboxes.forEach(cb => cb.checked = checkAll.checked);
        // Déclencher manuellement le change sur une checkbox pour mettre à jour le bouton supprimer
        checkboxes[0]?.dispatchEvent(new Event('change'));
    })
}

async function deleteSelectedMessages() {
    const checkboxes = document.querySelectorAll('.check-delete');
    const checked = [...checkboxes].filter(cb => cb.checked);
    const ids = checked.map(cb => cb.closest('tr').dataset.id);
    const response = await fetch('api/messages/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids })
    });
    
    if (response.ok) {
        checked.forEach(cb => cb.closest('tr').remove());
        document.querySelector('.trash-icon')?.remove();
    }
}

async function initAdminProjetcts() {
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
    
    document.querySelector('.admin-projects').appendChild(clone);
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