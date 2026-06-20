function showAlert(type) {
    
    const alert = {
        incomplete: { message: 'Formulaire incomplet', class: '--incomplete' },
        success: { message: 'Message Envoyé', class: '--success' },
        error: { message: 'Erreur serveur', class: '--error' }
    };
    
    const clone = document.querySelector('#alert').content.cloneNode(true);
    const alertForm = clone.querySelector('.alert-form');
    
    alertForm.querySelector('p').textContent = alert[type].message;
    alertForm.classList.add(alert[type].class);
    
    const container = clone.querySelector('.alert-form-container');
    document.body.append(clone);
    closeAlert(container);
};

function closeAlert(alertContainer) {
    
    const closeBtn = alertContainer.querySelector('.close-alert');
    
    closeBtn.addEventListener('click', dismiss);
    const autoCloseTimer = setTimeout(dismiss, 5000);
    
    function dismiss() {
        
        alertContainer.remove();
        clearTimeout(autoCloseTimer);
    }
}

export default showAlert;