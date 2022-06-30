'use strict';

// Storing elements in variables.
const score1El = document.querySelector('.player-1-total-score');
const score2El = document.querySelector('.player-2-total-score');
const diceEl = document.querySelector('.dice-image');
const newGame = document.querySelector('.new-game');
const rollDice = document.querySelector('.roll-dice');
const holdGame = document.querySelector('.hold');
const current1El = document.querySelector('.player-1-current-score');
const current2El = document.querySelector(".player-2-current-score");
const playerCard1 = document.querySelector(`.player-1-card`);
const playerCard2 = document.querySelector(`.player-2-card`);
const hideDice = function () {
  diceEl.classList.add("hidden");
};
let overlay1 = document.querySelector(".overlay-1");
let overlay2 = document.querySelector(".overlay-2");
let gameOn, scores, currentScore, activePlayer;
  

// Starting conditions

const start = function () {
  gameOn = true;
  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playerCard1.classList.remove("winner-card");
  playerCard2.classList.remove("winner-card");
  overlay1.classList.add("active");
  overlay2.classList.remove("active");
  hideDice();
};
start();




const switchPlayer = function () {
  // Change the activeplayer's score to 0
  document.querySelector(
    `.player-${activePlayer}-current-score`
  ).textContent = 0;

  // change activePlayer
  activePlayer = activePlayer === 1 ? 2 : 1;

  // change the current score to 0 so the second player doesn't inherit it
  currentScore = 0;

  // Change Overlay by toggling the class.
  overlay1.classList.toggle("active");
  overlay2.classList.toggle("active");
};




// Roll Dice Function
// 1. Generate a random dice roll
// 2. Display dice
// 3. Check if its a 1. If true, games goes to next player.

rollDice.addEventListener('click', function () {

  if (gameOn) {
    // 1
    const dice = Math.ceil(Math.random() * 6);

    // 2
    diceEl.classList.remove("hidden");
    diceEl.src = `images\\dice-${dice}.png`;

    // 3
    if (dice !== 1) {
      currentScore += dice;

      // change the current score of the active player
      document.querySelector(
        `.player-${activePlayer}-current-score`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}) 


// when the player holds the game
// 1. add current score to total score
// 2. End game if score  >= 100


holdGame.addEventListener('click', function () {

  if (gameOn) {
    // Add and assign the current sore of the active player
    let currentPlayer = activePlayer - 1;
    scores[currentPlayer] += currentScore;

    // Display score
    document.querySelector(`.player-${activePlayer}-total-score`).textContent =
      scores[currentPlayer];

    // Check if total score >= 100
    if (scores[currentPlayer] < 100) {
      switchPlayer();
    } else {
      // Finish the game
      gameOn = false;
      hideDice();
      document
        .querySelector(`.player-${activePlayer}-card`)
        .classList.add("winner-card");

      document
        .querySelector(`overlay-${activePlayer}`)
        .classList.remove("active");

    }
  }
})

newGame.addEventListener("click", start);