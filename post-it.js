//alert('Hello world'); test ok

/*class becquet{    hauteur; largeur;  Couleur; texte; visible; nonVisible ; position
         constructor(   hauteur, largeur, Couleur, texte, visible, nonVisible , position)
     {    this.position= position;     
          this.nonVisible=nonVisible;         
          this.visible=visible;
          this.texte=texte;  
          this.Couleur=Couleur;  
          this.largeur=largeur;  
          this.hauteur=hauteur;  }
          afficher(){
              return "afficher"

          }*/
          class becquet {
            x;
            y;
            vitesse;
            couleur;
        
            constructor(x, y, vitesse, couleur) {
                this.x = x;
                this.y = y;
                this.vitesse = vitesse;
                this.couleur = couleur;
            }
        
            changeVitesse(vitesse) {
                this.vitesse = vitesse;
            }
        
            changePlace(x, y) {
                this.x = x;
                this.y = y;
            }
        
            changeCouleur(coul) {
                this.couleur = coul;
            }
        
            afficheTest() {
                let monElem = document.createElement('div')
                monElem.style.position = "fixed";
                monElem.style.top = this.y + "px";
                monElem.style.left = this.x + "px";
                monElem.style.width = "150px";
                monElem.style.height = "150px";
                monElem.style.backgroundColor = this.couleur;
                monElem.style.padding = "5px";
                monElem.style.color = "black";
                monElem.innerHTML = " " //+ this.vitesse + "";
                document.body.appendChild(monElem);
            }
        }
        
        monTest = new becquet(100, 200, 30, 'yellow');
        violet  =  new becquet( 200 , 300 , 30 , "purple" ) ;	
        vert =  new becquet( 300 , 400 , 30, "green" ) ;
        monTest . afficheTest ( ) ;	
        violet. afficheTest ( ) ;	
        vert . afficheTest ( ) ;