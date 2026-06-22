import showAlert from "/js/alert/alert.js";

async function getAbout() {
    
    try {
        
        const response = await fetch('/api/about');
        
        if (!response.ok) {
            throw new Error();
        }
        
        const { about } = await response.json();
        return about;
        
    } catch {
        
        //showAlert("error");
        // Remplacer par message dans le skeleton
        // "Le contenu n'a pas pu être chargé."
        throw new Error();
    }
}

export default getAbout;