const emojiArray = [
    '😀', '😂', '😉', '😎',
    '😊', '😁', '😃', '👌'
];

let grid = document.getElementById('game-grid');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function shuffleDeck() {
    let deck = [...emojiArray, ...emojiArray];
    deck.sort(() => 0.5 - Math.random());
    return deck;
}

function createCards() {
    let shuffledDeck = shuffleDeck();
    shuffledDeck.forEach((emoji, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.innerText = '';
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.emoji;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === emojiArray.length) {
            setTimeout(() => alert('You won!'), 300);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            flippedCards = [];
        }, 800);
    }
}

function restartGame() {
    grid.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    createCards();
}

document.getElementById('restart-btn').addEventListener('click', restartGame);

createCards();
