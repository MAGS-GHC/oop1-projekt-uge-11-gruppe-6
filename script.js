// const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
// const ranks = [
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
//   '8',
//   '9',
//   '10',
//   'jack',
//   'queen',
//   'king',
//   'ace',
// ];
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
    this.deck.cards.unshift(...cards);
  }

  get length() {
    return this.deck.length;
  }
}

class Game {
  constructor() {
    // this.deck = new Deck();
    // this.deck.shuffle();
    // const [player1Cards, player2Cards] = this.deck.dealHalf();
    // this.player1 = new Player('Player 1', new Deck(player1Cards));
    // this.player2 = new Player('Player 2', new Deck(player2Cards));

    this.deck = new Deck();
    this.deck.shuffle();

    this.player1 = new Player('Player 1', new Deck());
    this.player2 = new Player('Player 2', new Deck());

    for (let i = 0; i < this.deck.length; i++) {
      if (i % 2 === 0) {
        this.player1.deck.cards.push(this.deck.cards[i]);
      } else {
        this.player2.deck.cards.push(this.deck.cards[i]);
      }
    }
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
    player1DeckElement.textContent = `Cards left: ${this.player1.length}`;

    const player2CardElement = document.getElementById('player2-card');
    player2CardElement.setAttribute('src', this.player2.currentCard.image);
    const player2DeckElement = document.getElementById('player2-deck');
    player2DeckElement.textContent = `Cards left: ${this.player2.length}`;
  }

  playRound() {
    // let buttonStart = document.querySelector('.play-button');
    // buttonStart.addEventListener('click', () => {
    this.player1.drawCard();
    this.player2.drawCard();
    this.displayGame();

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

  // mangler war method
  war() {
    const player1Cards = [this.player1.currentCard];
    const player2Cards = [this.player2.currentCard];

    // draw 3 cards

    for (let i = 0; i < 3; i++) {
      player1Cards.push(this.player1.deck.dealCard());
      player2Cards.push(this.player2.deck.dealCard());
    }

    // check the last card
    const player1Rank = this.deck.ranks.indexOf(
      player1Cards[player1Cards.length - 1].rank
    );
    const player2Rank = this.deck.ranks.indexOf(
      player2Cards[player2Cards.length - 1].rank
    );

    if (player1Rank > player2Rank) {
      // this.player1.addCards([
      //   ...player1Cards,
      //   ...player2Cards,
      //   player1Cards,
      //   player2Cards,
      // ]);
    } else if (player2Rank > player1Rank) {
      // this.player2.addCards([
      //   ...player1Cards,
      //   ...player2Cards,
      //   player1Cards,
      //   player2Cards,
      // ]);
    } else {
      this.war();
    }
  }
}

const game = new Game();
game.start();
