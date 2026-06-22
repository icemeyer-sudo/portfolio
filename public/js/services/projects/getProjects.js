import showAlert from "/js/alert/alert.js";

async function getProjects() {
    
    try {
        
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
            throw new Error();
        }
        
        return await response.json();
        
    } catch {
        
        //showAlert("error");
        // Remplacer par message dans le skeleton
        // "Le contenu n'a pas pu être chargé."
        throw new Error();
    }
}

export default getProjects;