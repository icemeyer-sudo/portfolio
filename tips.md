Dans cette exemple : element?.remove();
--> le ? permet de vérifier si element n'est pas null ou undefined
--> le ? s'appelle l'opérateur de chaînage optionnel

Array.from(document.querySelectorAll('HTMLElement'));
--> Convervit en tableau tous les éléments du DOM sélectionné

width: fit-content
--> Prend la largeur de son contenu

element.getBoundingClientRect()
--> Retourne un objet avec les coordonnées et dimensions d'un élément
--> Permet également de faire un reflow (recalculer le layout)

Sélecteur d'attribut [attribut="valeur"]
--> Sélectionne les éléments dont l'attribut correspond exactement à la valeur
--> Exemple : document.querySelector('[data-id="42"]')
--> Variantes : [attr^="début"], [attr$="fin"], [attr*="contient"]
--> Très utile pour cibler des attributs data-* personnalisés