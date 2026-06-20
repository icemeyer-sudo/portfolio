************************************************************
    CSS
************************************************************

width: fit-content
--> Prend la largeur de son contenu

Sélecteur d'attribut [attribut="valeur"]
--> Sélectionne les éléments dont l'attribut correspond exactement à la valeur
--> Exemple : document.querySelector('[data-id="42"]')
--> Variantes : [attr^="début"], [attr$="fin"], [attr*="contient"]
--> Très utile pour cibler des attributs data-* personnalisés

************************************************************
    JAVASCRIPT 
************************************************************

Opérateur de chaînage optionnel : element?.remove()
--> Le ? vérifie si l'élément n'est pas null ou undefined avant d'appeler la méthode
--> Sans ?, une erreur serait levée si element est null
--> Fonctionne aussi pour accéder à des propriétés : element?.value

Opérateur de coalescence nulle : valeur ?? "défaut"
--> Retourne le côté droit uniquement si le côté gauche est null ou undefined
--> Différent de || qui retourne le côté droit pour toute valeur falsy (0, "", false...)
--> Exemple : user.age ?? 18  --> retourne 18 seulement si age est null/undefined
--> Exemple : user.age || 18  --> retourne 18 aussi si age vaut 0

Array.from(document.querySelectorAll('HTMLElement'))
--> Convertit en tableau tous les éléments du DOM sélectionnés
--> querySelectorAll retourne une NodeList, pas un vrai tableau
--> Array.from permet d'utiliser les méthodes de tableau : map, filter, reduce...

element.getBoundingClientRect()
--> Retourne un objet avec les coordonnées et dimensions d'un élément
--> Permet également de faire un reflow (recalculer le layout)

Object.fromEntries(new FormData(form))
--> Convertit les champs d'un formulaire en objet JS { name: "valeur", ... }
--> FormData récupère automatiquement tous les champs ayant un attribut `name`
--> Object.fromEntries transforme les paires [clé, valeur] en objet
--> Equivalent à récupérer manuellement chaque getElementById/querySelector

addEventListener avec une fonction nommée
--> Passer la référence de la fonction, sans parenthèses
--> element.addEventListener('click', handleClick)   ✅
--> element.addEventListener('click', handleClick())  ❌ appelle la fonction immédiatement
--> Le navigateur injecte automatiquement l'event (e) au déclenchement
--> Le mot-clé async se place dans la déclaration de la fonction, pas dans addEventListener
--> async function handleClick(e) { ... }   ✅
--> Pour passer un argument supplémentaire, utiliser un wrapper : (e) => handleClick(e, arg)