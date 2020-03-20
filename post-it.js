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

          }*/
          class becquet {
            x;
            y;
            vitesse;
            couleur;
            postIt;f
        
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
                let monElem;
                let creation = false;
      

            if (document.getElementById('posIt') == null){
                //création post-it
                monElem = document.createElement('div');
                creation = true;
            }
            else {
                //je la récupère
                console.log("Mon elem Existe")
              monElem = document.createElement('div');
            }
              
                monElem.style.position = "fixed";
                monElem.id = "posIt"
                monElem.style.top = this.y + "px";
                monElem.style.left = this.x + "px";
                monElem.style.width = "150px";
                monElem.style.height = "150px";
                monElem.style.backgroundColor = this.couleur;
                monElem.style.padding = "5px";
                monElem.style.color = "black";
                monElem.innerHTML = " " + this.vitesse + "";
                document.body.appendChild(monElem);

                monElem.addEventListener('click', () => {
                    console.log("on bouge !")
                    onBouge = true;
                })
        
            
                if (creation) {
                    document.body.appendChild(monElem);
                }
            }
        }
        
       

let onBouge = false;
let x;
let y;

let  monTest = new becquet(100, 200, 30, 'yellow');
monTest . afficheTest ( ) ;	
let violet  =  new becquet( 200 , 300 , 30 , "purple" ) ;	
violet. afficheTest ( ) ;
let vert =  new becquet( 300 , 400 , 30, "green" ) ;
	
vert . afficheTest ( ) ;
document.addEventListener('mousemove', e => {
    x = e.clientX;
    y = e.clientY;
})
document.addEventListener('mouseup', () => {
    console.log("on stop !")
    onBouge = false;
})

function refresh() {
    if (onBouge) {
        console.log("je déplace !")
  monTest.changePlace(x, y);
  monTest.afficheTest();
    }
    setTimeout(refresh, 300)
}

refresh();