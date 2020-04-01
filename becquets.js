class becquet {
    constructor(idPostIt, x, y, couleur, texte) {
      this.id = idPostIt; //Un id unique pour chaque postIt créé
      this.texte = texte;
      this.couleur = couleur;
      this.x = x;
      this.y = y;
  
      let monElem = document.createElement("div");
      monElem.id = "postit" + this.id;
      monElem.className = "postit";
      console.log("création " + monElem.id);
      monElem.style.position = "fixed";
      monElem.style.left = this.x + "px";
      monElem.style.top = this.y + "px";
      monElem.style.width = "150px";
      monElem.style.height = "150px";
      monElem.style.backgroundColor = this.couleur;
      monElem.style.padding = "5px";
      monElem.style.color = "black";
      monElem.style.zIndex = 1000; // placement au 1er plan
  
      // Création du contenu du post-it : un lien pour dupliquer, un lien pour supprimer et une zone de saisie de texte
      monElem.innerHTML =
        "<a href='javascript:dupliquer(" +
        this.id +
        ")'><b>Dupliquer</b></a>" +
        "<br/><a href='javascript:supprimer(" +
        this.id +
        ")'>Supprimer</a>" +
        "<br/><textarea id='texte" +
        this.id +
        "' style='border:0;background-color:" +
        this.couleur +
        ";' cols='16' rows='6'>" +
        this.texte +
        "</textarea>";
  
      // Gestion du Drag & Drop lorsqu'on clique sur l'objet
      monElem.onmousedown = function(event) {
        let positionDansLePostItX = monElem.getBoundingClientRect().left;
        let positionDansLePostItY = monElem.getBoundingClientRect().top;
        let positionSourisX = event.clientX;
        let positionSourisY = event.clientY;
        let deplacementX = positionSourisX - positionDansLePostItX;
        let deplacementY = positionSourisY - positionDansLePostItY;
        console.log(positionSourisX + " - " + positionSourisY);
  
        monElem.style.position = "absolute";
        monElem.style.textarea = "red";
        monElem.style.zIndex = 1000; // place l'élément au premier plan
  
        moveAt(event.pageX, event.pageY); // déplace le post-it (voir la fonction ci-dessous)
  
        function moveAt(x, y) {
          monElem.style.left = x - deplacementX + "px";
          monElem.style.top = y - deplacementY + "px";
        }
  
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
  
        // Ajoute un écouteur sur le document pour détecter le mouvement de la souris
        document.addEventListener("mousemove", onMouseMove); // la fonction onMouseMove est définie juste avant
  
        // Evenement lorsqu'on relâche le bouton de la souris
        monElem.onmouseup = function() {
          // Supprime l'écouteur de mouvement de souris
          document.removeEventListener("mousemove", onMouseMove);
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
  
    toString() {
      //Pour Serialiser (en JSON)
      return JSON.stringify(this);
    }
  }
  
  // Création de 3 postIt (le constructeur crée l'objet et l'affiche)
  let postItEncours = [];
  postItEncours.push(new becquet(0, 100, 200, "yellow", "Post it jaune"));
  postItEncours.push(new becquet(1, 200, 300, "purple", "Post it violet"));
  postItEncours.push(new becquet(2, 300, 400, "green", "Post it vert"));
  
  // Fonction de duplication
  function dupliquer(postIt) {
    console.log("Duplication du post-it " + postIt.id);
    let postItElement = document.getElementById("postit" + postIt);
    var x = postItElement.style.left; // cette valeur est de type texte et comporte px à la fin
    var y = postItElement.style.top; // cette valeur est de type texte et comporte px à la fin
    var newX = parseInt(x.substring(0, x.length - 2)) + 50; // Je récupère la valeur entière en découpant la chaine (on enlève px) et on lui ajoute 50
    var newY = parseInt(y.substring(0, y.length - 2)) + 50; // Je récupère la valeur entière en découpant la chaine (on enlève px) et on lui ajoute 50
    var couleur = postItElement.style.backgroundColor;
  
    // création du nouveau post-it
    new becquet(postItEncours.length, newX, newY, couleur, "New POST IT");
  }
  // Fonction de suppression
  function supprimer(postIt) {
    console.log("Suppression du post-it " + postIt.id);
    let postItElement = document.getElementById("postit" + postIt);
    //Supression dans le DOM
    postItElement.remove();
    //Suppression dans le tableau global
    postItEncours.splice(postIt.id, 1);
  }
  function sauvegarderCookie() {
    console.log("Sauvegarde dans le cookie", postItEncours);
    document.cookie = "becquet=" + JSON.stringify(postItEncours);
  }
  function chargerCookie() {
    console.log("Chargement depuis le cookie");
  
    // Efface le tableau des posts en cours
    postItEncours = [];
    //Supprime les posts de l'affichage
    document.querySelectorAll(".postit").forEach(function(a) {
      a.remove();
    });
    //Charge le cookie et deserialise
    let postItFromCookie = JSON.parse(getCookie("becquet"));
  
    //Boucle sur les postIt en provenance du cookie pour les recréer
    for (let i = 0; i < postItFromCookie.length; i++) {
      postItEncours[i] = new becquet(
        postItFromCookie[i].id,
        postItFromCookie[i].x,
        postItFromCookie[i].y,
        postItFromCookie[i].couleur,
        postItFromCookie[i].texte
      );
    }
  }
 
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }