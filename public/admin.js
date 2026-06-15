initDashboard();

async function initDashboard() {
    await renderMessageTable();
    initDeleteSelection();
    initAboutEditor();
    initAboutForm();
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