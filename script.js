import Deck from "./deck.js"

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let playerDeck, playerDeckSlot, computerDeck, computerDeckSlot, inRound, stop

document.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards()
  }
})

startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  playerDeckSlot = new Deck([])
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  computerDeckSlot = new Deck([])
  inRound = false
  stop = false

  cleanBeforeRound()
}

function cleanBeforeRound() {
  inRound = false
  computerCardSlot.innerHTML = "<div></div>"
  playerCardSlot.innerHTML = "<div></div>"
  text.innerText = ""

  updateDeckCount()
}

function flipCards() {
  const playerCard = playerDeck.pop()
  playerDeckSlot.push(playerCard)
  const computerCard = computerDeck.pop()
  computerDeckSlot.push(playerCard)  

  playerCardSlot.replaceChild(playerCard.getHTML(), playerCardSlot.childNodes[0])
  computerCardSlot.replaceChild(computerCard.getHTML(), computerCardSlot.childNodes[0])

  updateDeckCount()

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win"
    playerDeck.stack(playerDeckSlot.removeAllCards())
    playerDeck.stack(computerDeckSlot.removeAllCards())
    inRound = true
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Lose"
    computerDeck.stack(playerDeckSlot.removeAllCards())
    computerDeck.stack(computerDeckSlot.removeAllCards())
    inRound = true
  } else {
    text.innerText = "Draw"
    inRound = false
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!"
    stop = true
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!"
    stop = true
  }
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards
  playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
  return deck.numberOfCards === 0
}
