"use strict";
//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Starting conditions
//We do this so the variable inside the init function
//will be accessable as global scope
let scores, currentScore, activePlayer, playing;
//for reseting and start new game

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player-active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  //switch to next player
  //here we say that the play one is 0 and the player 2 is one
  //so we give it name based on id and it switches player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle will remove a class if it is there
  //and add a class if it is not there
  //this is for the change in the background
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//Rolling dice functinality:
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.generate random dice roll
    //we define the dice variable localy meaning inside the function so that each time it gives us new one
    //if we did it globally meaning outside the function
    //it will have the same number till we refresh the page
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. check for rolled 1 and if so switch player
    if (dice !== 1) {
      //we need to store the dice roll in some variable so
      //we can add it to the score
      currentScore += dice;
      //knwing which one is the active player
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.Add current score to the score of active player
    //scores[activePlayer] means the score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check that score is >= 100 ==> wins
    if (scores[activePlayer] >= 20) {
      //finish the game
      //we set playing to false so that the button cannot be working
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3.if not switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
