
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
let moves = 0;
let firstCard, secondCard;
let lockBoard = false;

// Initialization
document.addEventListener("DOMContentLoaded", startGame);
document.getElementById("restart").addEventListener("click", startGame);

// Functions
function startGame() {
  moves = 0;
  updateMoves();
  lockBoard = false;
  firstCard = null;
  secondCard = null;

  const doubledValues = [...cardValues, ...cardValues];
  const shuffledValues = shuffle(doubledValues);

  const cardGrid = document.getElementById("card-grid");
  cardGrid.innerHTML = "";
  shuffledValues.forEach(value => createCard(value, cardGrid));
}

function createCard(value, parent) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.cardValue = value;
  card.addEventListener("click", handleCardClick);
  card.innerHTML = `<span class="hidden">${value}</span>`;
  parent.appendChild(card);
}

function handleCardClick(event) {
  if (lockBoard) return;
  const clickedCard = event.currentTarget;

  if (clickedCard === firstCard) return;

  flipCard(clickedCard);

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    moves++;
    updateMoves();
    checkMatch();
  }
}

function flipCard(card) {
  card.classList.add("flipped");
  card.querySelector("span").classList.remove("hidden");
}

function unflipCard(card) {
  card.classList.remove("flipped");
  card.querySelector("span").classList.add("hidden");
}

function checkMatch() {
  lockBoard = true;
  const isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;

  if (isMatch) {
    disableCards();
    checkWin();
  } else {
    setTimeout(() => {
      unflipCard(firstCard);
      unflipCard(secondCard);
      resetBoard();
    }, 1000);
  }
}

function disableCards() {
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);
  resetBoard();
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === cardValues.length * 2) {
    alert(`You won in ${moves} moves!`);
  }
}

function updateMoves() {
  document.getElementById("moves").textContent = `Moves: ${moves}`;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
