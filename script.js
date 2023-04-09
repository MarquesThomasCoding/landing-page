//Sélection de l'élément avec l'id "icon" et stockage dans la constante icon. Cela représente l'oiseau situé en haut de la page d'accueil
const icon = document.getElementById("icon")

//Stockage de l'audio "bird.mp3" dans la constante audio.
const audio = new Audio('bird.mp3');

//Délclaration de la variable rotation et initialisation à 0
let rotation = 0


//Ecoute d'un évenement de clic sur l'icon (l'oiseau)
icon.addEventListener("click", reaction => {

    //Modification du style "transitionDuration" à 1s pour que la transition entre deux styles dure 1 seconde
    icon.style.transitionDuration = "1s"

    //Rotation de l'icon de 20 degré
    icon.style.transform = `rotate(${rotation+20}deg)`

    //Ajout de 20 à la variable rotation
    rotation+=20

    //Lecture de l'audio "bird.mp3"
    audio.play()
})


//Définition de la fonction "clock" permettant d'afficher l'heure
function clock() {

    //Variable date contenant la date actuelle
    let date = new Date()

    //Récupération de l'heure actuelle dans la variable hour
    let heur = date.getHours()
    //Récupération des minutes actuelles dans la variable minutes
    let minutes = date.getMinutes()
    //Récupération des secondes actuelles edans la variable secondes
    let secondes = date.getSeconds()

    //Sélection de l'élément avec l'id "clock", qui représente l'élément qui contient l'heure
    const p = document.getElementById("clock")

    //Modification de l'HTML contenu dans l'élément "p" pour afficher l'heure
    p.innerHTML = `${heure}:${minutes}:${secondes}`
}


//Mise en place d'un interval d'1 seconde entre chaque appel de la fonction "clock", pour changer l'heure toutes les secondes
setInterval(clock,1000)


//Sélection de l'élément avec l'ID "game-zone" et stockage dans la constante "jeu". Cet élément représente la zone de jeu du jeu.
const jeu = document.querySelector("#game-zone")

//Sélection de l'élément avec l'ID "bird-user" et stockage dans la constante "bird". Cet élément représente l'oiseau contrôlé par l'utilisateur.
const bird = document.getElementById("bird-user")

//Déclaration de la variable "posXBird" avec une valeur initiale de 345. Cette variable représente la position horizontale de l'oiseau sur l'axe X.
let posXBird = 345
//Définition de la position horizontale de l'oiseau à 345 pixels
bird.style.left = "345px"

//Ecouteur d'événements pour détecter lorsque l'utilisateur appuie sur une touche du clavier
document.addEventListener('keydown', function(event) {

    //Condition 1 : la touche appuyée est la flèche droite
    if (event.key == 'ArrowRight') {

        //Dans ce cas, si l'oiseau n'a pas atteint la limite droite de la zone de jeu
        if(posXBird <= 625) {

            //l'oiseau se déplace de 10 pixels vers la droite, en augmentant son style "left"
            bird.style.left= `${posXBird + 10}px`

            //l'oiseau se retourne pour le faire regarder dans la bonne direction
            bird.style.transform = "scaleX(1)"

            //on ajoute 10 à la variable "posXBird"
            posXBird += 10
        }
    }

    //Condition 2 : la touche appuyée est la flèche gauche
    if (event.key == 'ArrowLeft') {

        //Dans ce cas, si l'oiseau n'a pas atteint la limite gauche de la zone de jeu
        if(posXBird >= 0) {

            //l'oiseau se déplace de 10 pixels vers la gauche, en diminuant son style "left"
            bird.style.left= `${posXBird - 10}px`

            //l'oiseau se retourne pour le faire regarder dans la bonne direction
            bird.style.transform = "scaleX(-1)"

            //on enlève 10 à la variable "posXBird"
            posXBird -= 10
        }
    }
  });


//Sélection de l'élément avec l'id "score" et stockage dans la constante "score". Cela représente la zone dans laquelle le score est écrit
const score = document.getElementById("score")

//Déclaration de la variable "score_count" dans laquelle sera stockée le score du joueur
let score_count = 0

//Sélection des éléments possédant la class "fruit" et stockage dans la constante "fruits". Cela représente les pommes qui tombent
const fruits = document.querySelectorAll(".fruit")


//Boucle pour parcourir la liste des pommes
fruits.forEach(element => {
    
    //pour définir aléatoirement leur position horizontale
    element.style.left = `${Math.floor(Math.random() * 651)}px`

    //et les placer tout en haut de la zone de jeu
    element.style.top = "0px"
});


//Fonction pour déplacer les pommes vers le bas
const movePomme = () => {

    //Boucle pour parcourir chaque pomme
    fruits.forEach(element => {

        //Ajout de 10 pixels au style "top" de chaque pomme (pour les faire descendre de 10 pixels)
        element.style.top = `${parseInt(element.style.top)+10}px`

        //Condition 1 : la pomme touche l'oiseau
        if((parseInt(element.style.top) >= 592 && parseInt(element.style.top) <=752) && (parseInt(element.style.left)+42+parseInt(`${Array.from(fruits).indexOf(element)*(42)}`) >= parseInt(bird.style.left) && parseInt(element.style.left)+parseInt(`${Array.from(fruits).indexOf(element)*(42)}`) <= (parseInt(bird.style.left) + 160))) {
            
            //Lecture de l'audio "bird.mp3"
            audio.play()

            //Ajout d'un point au score
            score_count += 1

            //Modification de l'élément HTML "score" pour afficher le nouveau score
            score.innerHTML = `Score : ${score_count}`

            //Placement de la pomme en haut de la zone de jeu
            element.style.top = `${0}px`

            //Placement horizontal aléatoire de la pomme
            element.style.left = `${Math.floor(Math.random() * 651)}px`
        }

        //Condition 2 : la pomme atteint le bas de la zone de jeu sans toucher l'oiseau
        else if(parseInt(element.style.top) == 750) {

            //Fin de la partie, appel de la fonction "endGame"
            endGame()
        }
    });
}

//Définiton de la fonction "startGame", permettant de démarrer le jeu
const startGame = () => {

    //Mise en place d'un interval de 0.2 secondes entre chaque déplacement vertical des pommes
    setInterval(movePomme,200)
}


//Définition de la fonction "playGame", qui lance le jeu
const playgame = () => {

    //Sélection de l'élément avec l'id "menu" et ajout de la class "hide", permettant de le cacher
    document.querySelector(".menu").classList.add("hide")

    //Sélection de l'élément avec l'id "jeu" et suppression de la class "hide" permettant de le rendre visible
    document.querySelector(".jeu").classList.remove("hide")

    //Appel de la fonction "startGame" permettant de démarrer le jeu
    startGame()
}


//Définition de la fonction "endGame", qui arrête le jeu
const endGame = () => {

    //Sélection de l'élément avec l'id "jeu" et ajout de la class "hide", permettant de le cacher
    document.querySelector(".jeu").classList.add("hide")

    //Sélection de l'élément avec l'id "menu" et suppression de la class "hide" permettant de le rendre visible
    document.querySelector(".menu").classList.remove("hide")

    //Affichage d'une boite de dialogue annonçant la défaite et affichant le score final
    alert(`PERDU !\nScore final : ${score_count}`)

    //Rechargement de la page
    location.reload()
}