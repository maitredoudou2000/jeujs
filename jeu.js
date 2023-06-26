// Variables globales
let scores, roundScore, activePlayer, gamePlaying;

// Initialisation du jeu
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('player1-round').textContent = '0';
  document.getElementById('player1-global').textContent = '0';
  document.getElementById('player2-round').textContent = '0';
  document.getElementById('player2-global').textContent = '0';
  document.getElementById('player1').classList.remove('winner');
  document.getElementById('player2').classList.remove('winner');
  document.getElementById('player1').textContent = 'Joueur 1';
  document.getElementById('player2').textContent = 'Joueur 2';
}

// Fonction pour lancer le dé
function rollDice() {
  if (gamePlaying) {
    // Générer un nombre aléatoire entre 1 et 6
    let dice = Math.floor(Math.random() * 6) + 1;

    // Afficher l'image du dé correspondante
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // Mettre à jour le score ROUND si le résultat n'est pas 1
    if (dice !== 1) {
      roundScore += dice;
      document.getElementById('player' + (activePlayer + 1) + '-round').textContent = roundScore;
    } else {
      // Passer au joueur suivant
      nextPlayer();
    }
  }
}

// Fonction pour retenir le score ROUND
function holdScore() {
  if (gamePlaying) {
    // Ajouter le score ROUND au score GLOBAL
    scores[activePlayer] += roundScore;

    // Mettre à jour l'affichage
    document.getElementById('player' + (activePlayer + 1) + '-global').textContent = scores[activePlayer];

    // Vérifier si le joueur a gagné
    if (scores[activePlayer] >= 100) {
      document.getElementById('player' + (activePlayer + 1)).textContent = 'Gagné!';
      document.getElementById('player' + (activePlayer + 1)).classList.add('winner');
      gamePlaying = false;
    } else {
      // Passer au joueur suivant
      nextPlayer();
    }
  }
}

// Fonction pour passer au joueur suivant
function nextPlayer() {
  roundScore = 0;
  document.getElementById('player' + (activePlayer + 1) + '-round').textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Réinitialiser l'affichage du dé
  document.querySelector('.dice').style.display = 'none';

  // Mettre à jour le style du joueur actif
  document.getElementById('player1').classList.toggle('active');
  document.getElementById('player2').classList.toggle('active');
}

// Événement pour le bouton Nouvelle partie
document.getElementById('new-game').addEventListener('click', init);

// Événement pour le bouton Lancer le dé
document.getElementById('roll-dice').addEventListener('click', rollDice);

// Événement pour le bouton Retenir le score
document.getElementById('hold-score').addEventListener('click', holdScore);

// Initialiser le jeu
init();
