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

Attribut inert
--> Rend un élément et tous ses descendants non-interactifs, non-focusables et invisibles aux lecteurs d'écran
--> Utile pour bloquer l'arrière-plan lorsqu'une modale ou une alerte est affichée
--> En JS : element.setAttribute('inert', '') pour activer, element.removeAttribute('inert') pour désactiver
--> Ciblage CSS : [inert] { ... }  --> sélectionne tous les éléments portant l'attribut inert
--> Exemple : [inert] { opacity: 0.5; pointer-events: none; }

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

Déstructuration d'objet : const { clé } = objet
--> Extrait une propriété d'un objet dans une variable locale du même nom
--> const { about } = await response.json() équivaut à const about = data.about
--> Le nom de la variable DOIT correspondre exactement à la clé de l'objet
--> Pour renommer : const { about: content } = data  --> clé "about", variable "content"
--> Fonctionne aussi en paramètre de fonction : function render({ title, description }) { ... }

Déstructuration de tableau : const [ var ] = tableau
--> Extrait les éléments d'un tableau par POSITION (pas par nom)
--> const [premier, deuxième] = [1, 2]  --> premier = 1, deuxième = 2
--> Le nom de la variable est libre, c'est l'index qui détermine la valeur extraite
--> Utile avec Promise.all : const [data] = await Promise.all([fetch(...), timer])
    --> data = résultat index 0, le timer (index 1) est ignoré
--> Pour ignorer un élément : const [, deuxième] = tableau  (virgule sans variable)

Object.fromEntries(new FormData(form))
--> Convertit les champs d'un formulaire en objet JS { name: "valeur", ... }
--> FormData récupère automatiquement tous les champs ayant un attribut `name`
--> Object.fromEntries transforme les paires [clé, valeur] en objet
--> Equivalent à récupérer manuellement chaque getElementById/querySelector

throw dans un try/catch : deux rôles distincts
--> throw dans le try  → déclenche le catch du même bloc (gestion locale de l'erreur)
--> throw dans le catch → propage l'erreur vers l'appelant (promesse rejetée)
--> Sans throw dans le catch, la fonction retourne undefined en cas d'erreur
    ce qui peut provoquer des bugs silencieux si l'appelant utilise la valeur retournée
--> Avec throw dans le catch, l'appelant sait qu'il y a eu une erreur et peut s'arrêter proprement
--> Exemple :
    try {
        if (!response.ok) throw new Error(response.status);  // --> atterrit dans le catch
        return data;
    } catch {
        showAlert("error");
        throw new Error();  // --> propage vers l'appelant
    }

addEventListener avec une fonction nommée
--> Passer la référence de la fonction, sans parenthèses
--> element.addEventListener('click', handleClick)   ✅
--> element.addEventListener('click', handleClick())  ❌ appelle la fonction immédiatement
--> Le navigateur injecte automatiquement l'event (e) au déclenchement
--> Le mot-clé async se place dans la déclaration de la fonction, pas dans addEventListener
--> async function handleClick(e) { ... }   ✅
--> Pour passer un argument supplémentaire, utiliser un wrapper : (e) => handleClick(e, arg)

Les différentes boucles
--> for classique : contrôle total sur l'index, adapté aux tableaux quand on a besoin de i
    for (let i = 0; i < tableau.length; i++) { ... }

--> for...of : itère sur les valeurs, plus lisible que le for classique pour les tableaux
    for (const item of tableau) { ... }
    ⚠ Ne fonctionne pas sur les objets plain ({ clé: valeur })

--> for...in : itère sur les clés d'un objet (ou les indices d'un tableau)
    for (const clé in objet) { ... }
    ⚠ Déconseillé sur les tableaux (peut inclure des propriétés héritées)

--> forEach : méthode de tableau, adapté quand on n'a pas besoin de break/return
    tableau.forEach(item => { ... })
    ⚠ Ne supporte pas break, continue, ou return pour sortir de la boucle

--> while : boucle tant qu'une condition est vraie, utile quand le nombre d'itérations est inconnu
    while (condition) { ... }

--> Méthodes fonctionnelles (retournent un nouveau tableau, ne modifient pas l'original)
    tableau.map(item => ...)      --> transforme chaque élément
    tableau.filter(item => ...)   --> garde les éléments qui passent le test
    tableau.find(item => ...)     --> retourne le premier élément qui passe le test
    tableau.reduce((acc, item) => ..., valeurInitiale)  --> accumule en une seule valeur