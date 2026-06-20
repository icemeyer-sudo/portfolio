import paperPlane from '/js/contact-form/paper-plane.js';
import showAlert from '/js/contact-form/alert.js';

const form = document.querySelector('#contact form');

document.querySelector('.post').addEventListener('click', handleSubmit);
    
async function handleSubmit(e) {
    
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    
    if (!data.name.trim() || !data.email.trim() || !data.content.trim()) {
        showAlert("incomplete");
        return;
    }

    try {
        const response = await fetch('/api/messages/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            form.reset();
            showAlert("success");
            paperPlane();
        } else {
            showAlert("error");
        }
    } catch {
        showAlert("error");
    }
};
