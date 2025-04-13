function initMemory() {
    const memoryBoard = document.getElementById('memory-board');
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let flippedCards = [];
    let matchedPairs = 0;

    // Shuffle cards
    cards.sort(() => 0.5 - Math.random());

    // Create board
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        memoryBoard.appendChild(cardElement);
    });

    function flipCard() {
        if(flippedCards.length < 2 && !flippedCards.includes(this) && !this.textContent) {
            this.textContent = this.dataset.value;
            this.style.backgroundColor = 'white';
            flippedCards.push(this);
            
            if(flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        
        if(card1.dataset.value === card2.dataset.value) {
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            matchedPairs++;
            
            if(matchedPairs === cards.length / 2) {
                setTimeout(() => alert('Congratulations! You won!'), 100);
            }
        } else {
            card1.textContent = '';
            card2.textContent = '';
            card1.style.backgroundColor = '#ddd';
            card2.style.backgroundColor = '#ddd';
        }
        
        flippedCards = [];
    }
}
