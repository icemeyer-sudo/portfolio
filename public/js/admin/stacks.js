export async function init() {
    await initStacksList();
    initAddStackForm();
}

async function initStacksList() {
    const stacks = await fetchStacks();
    stacks.forEach(stack => renderStack(stack));
}

async function fetchStacks() {
    const res = await fetch('/api/stacks');
    return res.json();
}

function renderStack(stack) {
    const div = document.createElement('div');
    div.dataset.id = stack.id;
    div.classList.add('stack-item-admin');
    div.innerHTML = `
        <img src="/${stack.logo}" alt="${stack.name}">
        <span>${stack.name}</span>
        <input type="text" class="edit-stack-name" value="${stack.name}" style="display:none">
        <input type="text" class="edit-stack-logo" value="${stack.logo}" style="display:none">
        <button class="btn-edit-stack">Modifier</button>
        <button class="btn-save-stack" style="display:none">Sauvegarder</button>
        <button class="btn-delete-stack">Supprimer</button>
    `;

    div.querySelector('.btn-edit-stack').addEventListener('click', () => toggleEdit(div));
    div.querySelector('.btn-save-stack').addEventListener('click', () => handleSaveStack(div));
    div.querySelector('.btn-delete-stack').addEventListener('click', () => handleDeleteStack(div));

    document.querySelector('.stacks-list').appendChild(div);
}

function toggleEdit(div) {
    div.querySelector('span').style.display = 'none';
    div.querySelector('.edit-stack-name').style.display = '';
    div.querySelector('.edit-stack-logo').style.display = '';
    div.querySelector('.btn-edit-stack').style.display = 'none';
    div.querySelector('.btn-save-stack').style.display = '';
}

async function handleSaveStack(div) {
    const id = div.dataset.id;
    const name = div.querySelector('.edit-stack-name').value;
    const logo = div.querySelector('.edit-stack-logo').value;

    const res = await fetch(`/api/stacks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, logo })
    });

    if (res.ok) {
        div.querySelector('span').textContent = name;
        div.querySelector('img').src = `/${logo}`;
        div.querySelector('span').style.display = '';
        div.querySelector('.edit-stack-name').style.display = 'none';
        div.querySelector('.edit-stack-logo').style.display = 'none';
        div.querySelector('.btn-edit-stack').style.display = '';
        div.querySelector('.btn-save-stack').style.display = 'none';
    }
}

async function handleDeleteStack(div) {
    const id = div.dataset.id;
    const res = await fetch(`/api/stacks/${id}`, { method: 'DELETE' });
    if (res.ok) div.remove();
}

function initAddStackForm() {
    const form = document.querySelector('#form-add-stack');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('#stack-name').value;
        const logo = document.querySelector('#stack-logo').value;

        const res = await fetch('/api/stacks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, logo })
        });

        if (res.ok) {
            const newStack = await res.json();
            renderStack(newStack);
            form.reset();
        }
    });
}