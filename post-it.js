


class becquet {

	constructor(x, y, couleur, texte) {
		
		idMax = idMax + 1;
		this.id = "postIt" + idMax; //Un id unique pour chaque postIt créé
		
		let monElem = document.createElement('div');
		monElem.id = this.id;
		console.log("création " + monElem.id);
		monElem.style.position = "fixed";
		monElem.style.left = x + "px";
		monElem.style.top = y + "px";
		monElem.style.width = "150px";
		monElem.style.height = "150px";
		monElem.style.backgroundColor = couleur;
		monElem.style.padding = "5px";
		monElem.style.color = "black";
		monElem.style.zIndex = 1000; // placement au 1er plan
		
	// Création du contenu du post-it : un lien pour dupliquer, un lien pour supprimer et une zone de saisie de texte
		monElem.innerHTML = "<a href='javascript:dupliquer(" + monElem.id + ")'>Dupliquer</a>" 
		+ "<br/><a href='javascript:supprimer(" + monElem.id + ")'>Supprimer</a>"
		+ "<br/><textarea id='texte" + monElem.id + "' style='border:0;background-color:" + couleur + ";' cols='16' rows='6'>" + texte + "</textarea>";
		

		// Gestion du Drag & Drop lorsqu'on clique sur l'objet
		monElem.onmousedown = function(event) {

			let positionDansLePostItX = monElem.getBoundingClientRect().left;
			let positionDansLePostItY = monElem.getBoundingClientRect().top;
			let positionSourisX = event.clientX;
			let positionSourisY = event.clientY;
			let deplacementX = positionSourisX - positionDansLePostItX;
			let deplacementY = positionSourisY - positionDansLePostItY;
			console.log(positionSourisX + " - " + positionSourisY);

			monElem.style.position = 'absolute';
			monElem.style.zIndex = 1000; // place l'élément au premier plan

			moveAt(event.pageX, event.pageY); // déplace le post-it (voir la fonction ci-dessous)

			function moveAt(x, y) {
				monElem.style.left = x - deplacementX + 'px';
				monElem.style.top = y - deplacementY + 'px';
			}

			function onMouseMove(event) {
				moveAt(event.pageX, event.pageY);
			}

			// Ajoute un écouteur sur le document pour détecter le mouvement de la souris
			document.addEventListener('mousemove', onMouseMove); // la fonction onMouseMove est définie juste avant

			// Evenement lorsqu'on relâche le bouton de la souris
			monElem.onmouseup = function() {
				// Supprime l'écouteur de mouvement de souris
				document.removeEventListener('mousemove', onMouseMove);
				monElem.onmouseup = null;
			};

		};

		// Désactivation du Drag & Drop intégré du navigateur (pour ne pas entrer en conflit avec notre propre gestion du Drag & Drop)
		monElem.ondragstart = function() {
		  return false;
		};
		
		// Crée le postIt sur la page
		document.body.append(monElem);
	}
}

let idMax = 0;

// Création de 3 postIt (le constructeur crée l'objet et l'affiche)
new becquet(100, 200, "yellow", "Post it jaune");
new becquet(200 , 300 , "purple", "Post it violet");
new becquet(300 , 400 , "green", "Post it vert");

// Fonction de duplication
function dupliquer(postIt) {
	console.log("Duplication du post-it " + postIt.id);
	
	var x = postIt.style.left; // cette valeur est de type texte et comporte px à la fin
	var y = postIt.style.top; // cette valeur est de type texte et comporte px à la fin
	var newX = parseInt(x.substring(0, x.length - 2)) + 50; // Je récupère la valeur entière en découpant la chaine (on enlève px) et on lui ajoute 50
	var newY = parseInt(y.substring(0, y.length - 2)) + 50; // Je récupère la valeur entière en découpant la chaine (on enlève px) et on lui ajoute 50
	var couleur = postIt.style.backgroundColor;
	
	// création du nouveau post-it
	new becquet(newX, newY, couleur, "New POST IT");
}
// Fonction de suppression
function supprimer(postIt) {
	console.log("Suppression du post-it " + postIt.id);
	
	postIt.parentNode.removeChild(postIt);
}

	
	

