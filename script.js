
class Card {
  constructor(suit, rank, image) {
    this.suit = suit;
    this.rank = rank;
    this.image = image;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    this.ranks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'jack',
      'queen',
      'king',
      'ace',
    ];
    for (let suit of this.suits) {
      for (let rank of this.ranks) {
        // image file name
        let image = `./images/${rank}_of_${suit}.png`;
        this.cards.push(new Card(suit, rank, image));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // es6 swap
    }
  }
  
   dealHalf() {
    const half = Math.ceil(this.cards.length / 2);
    const deck1Cards = this.cards.slice(0, half);
    const deck2Cards = this.cards.slice(half);
    this.player1Deck = new Deck();
    this.player2Deck = new Deck();
    this.player1Deck.cards = deck1Cards;
    this.player2Deck.cards = deck2Cards;
  }

  dealCard() {
    return this.cards.pop();
  }

  get length() {
    return this.cards.length;
  }
}

class Player {
  constructor(name, deck) {
    this.name = name;
    this.deck = deck;
    this.currentCard = null;
  }

  drawCard() {
    this.currentCard = this.deck.dealCard();
  }

  addCards(cards) {
    if (cards) {
      this.deck.cards.unshift(...cards);
    }
  }

  get length() {
    return this.deck.length;
  }
}

class Game {
  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.player1 = new Player('Player 1', new Deck());
    this.player2 = new Player('Player 2', new Deck());
    this.deck.dealHalf();
    this.player1.deck = this.deck.player1Deck;
    this.player2.deck = this.deck.player2Deck;
    console.log(this.deck.length);


  }
  start() {
    let buttonStart = document.querySelector('.play-button');
    buttonStart.addEventListener('click', () => {
      this.playRound();
    });
  }
  displayGame() {
    const player1CardElement = document.getElementById('player1-card');
    player1CardElement.setAttribute('src', this.player1.currentCard.image);
    const player1DeckElement = document.getElementById('player1-deck');
    player1DeckElement.textContent = `Cards left: ${this.player1.length + 1}`;

    const player2CardElement = document.getElementById('player2-card');
    player2CardElement.setAttribute('src', this.player2.currentCard.image);
    const player2DeckElement = document.getElementById('player2-deck');
    player2DeckElement.textContent = `Cards left: ${this.player2.length + 1}`;
  }

  playRound() {
    // let buttonStart = document.querySelector('.play-button');
    // buttonStart.addEventListener('click', () => {
    this.player1.drawCard();
    this.player2.drawCard();
    this.displayGame();

    console.log(this.player1.deck)
    console.log(this.player2.deck)

    const player1Rank = this.deck.ranks.indexOf(this.player1.currentCard.rank);
    const player2Rank = this.deck.ranks.indexOf(this.player2.currentCard.rank);

    if (player1Rank > player2Rank) {
      this.player1.addCards([
        this.player1.currentCard,
        this.player2.currentCard,
      ]);
    } else if (player2Rank > player1Rank) {
      this.player2.addCards([
        this.player1.currentCard,
        this.player2.currentCard,
      ]);
    } else {
      this.war();
    }

    if (this.player1.length < 3) {
      alert('Player 2 Wins!');
      location.reload();
    } else if (this.player2.length < 3) {
      alert('Player 1 Wins!');
      location.reload();
    }
    // });
  }



  war() {
    const warContainer = document.querySelector(".war-container")
    const modalContainer = document.querySelector(".modal-container")

    const player1Write = document.querySelector(".player1-war-cards")
    const player2Write = document.querySelector(".player2-war-cards")


    const warBTN = document.querySelector(".test")

    const player1Cards = [this.player1.currentCard];
    const player2Cards = [this.player2.currentCard];
    
console.log(this.player1.currentCard)
    
    modalContainer.classList.add("show")

    console.log(warBTN)

    // draw 3 cards

    for (let i = 0; i < 3; i++) {
      player1Cards.push(this.player1.deck.dealCard());
      player2Cards.push(this.player2.deck.dealCard());
    }

    // display the cards drawn in the war
    console.log(`Player 1 cards:`);
    for (let card of player1Cards) {
      console.log(`${card.rank} of ${card.suit} (${card.image})`);
      player1Write.innerHTML += `<img class="warCards" src="${card.image}"> `
    }

    
    console.log(`Player 2 cards:`);
    for (let card of player2Cards) {
      console.log(`${card.rank} of ${card.suit} (${card.image})`);
      player2Write.innerHTML += `<img class="warCards" src="${card.image}"> `

    }

  const player1LastCard = player1Cards[player1Cards.length - 1].rank;
  const player2LastCard = player2Cards[player2Cards.length - 1].rank;


  if (player1LastCard > player2LastCard) {
    console.log("Player 1 wins the war");
    player1Cards.splice(0, 1)
    player2Cards.splice(0, 1)
    this.player1.addCards([
      this.player1.currentCard,
      this.player2.currentCard,
      ...player1Cards,
      ...player2Cards,
    ]);

    warBTN.addEventListener("click", () =>{
      player2Write.innerHTML = "";
      player1Write.innerHTML = "";
      modalContainer.classList.remove("show");
    })
  } 
  
  else if (player2LastCard > player1LastCard) {

    player1Cards.splice(0, 1)
    player2Cards.splice(0, 1)

    this.player2.addCards([
      this.player1.currentCard,
      this.player2.currentCard,
      ...player1Cards,
      ...player2Cards,
    ]);

      warBTN.addEventListener("click", () =>{
      player2Write.innerHTML = "";
      player1Write.innerHTML = "";
      modalContainer.classList.remove("show");
    })
  }

  else {
    console.log("tie")
    this.war()  
  }
}

}

const game = new Game();
game.start();
