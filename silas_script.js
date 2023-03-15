class Card {
  constructor(suit, rank, image, id) {
    this.suit = suit;
    this.rank = rank;
    this.image = image;
    this.id = id;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    this.ranks = [
      // {value: 2, name: '2'},
      // {value: 3, name: '3'},
      // {value: 4, name: '4'},
      // {value: 5, name: '5'},
      // {value: 6, name: '6'},
      // {value: 7, name: '7'},
      // {value: 8, name: '8'},
      // {value: 9, name: '9'},
      // {value: 10, name: '10'},
      // {value: 11, name: 'jack'},
      // {value: 12, name: 'queen'},
      // {value: 13, name: 'king'},
      // {value: 14, name: 'ace'},
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
      'ace'
    ];
    for (let suit of this.suits) {
      for (let rank of this.ranks) {
        // image file name
        let image = `./images/${rank}_of_${suit}.png`;

        let id = `${rank}_of_${suit}`;

        this.cards.push(new Card(suit, rank, image, id));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // es6 swap
    }
  }
  get length() {
    return this.cards.length;
  }
  dealHalf() {
    const half = Math.ceil(this.cards.length / 2);
    const deck1Cards = this.cards.slice(0, half);
    const deck2Cards = this.cards.slice(half);
    this.player1Deck = new Deck();
    this.player2Deck = new Deck();
    this.player1Deck.cards = deck1Cards;
    this.player2Deck.cards = deck2Cards;
    console.log(deck1Cards);
  }
  dealCard() {
    return this.cards.pop();
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
    this.deck = new Deck();
    this.deck.shuffle();
    this.player1 = new Player('Player 1', new Deck());
    this.player2 = new Player('Player 2', new Deck());
    this.deck.dealHalf();
    this.player1.deck = this.deck.player1Deck;
    this.player2.deck = this.deck.player2Deck;
  }

  displayGame() {
    //player 1
    let rootContainer1 = document.querySelector(`.root-container1`);
    for (let i = 0; i < this.player1.deck.cards.length; i++) {
      const cardId = this.player1.deck.cards[i].id;
      rootContainer1.innerHTML += `
  <div class="container-content" id="cardx${cardId}">
  <img class="container-content-img" src="images/front_white.png" alt="">
  </div>
  `;
    }
    for (let i = 0; i < this.player1.deck.cards.length; i++) {
      const cardId = this.player1.deck.cards[i].id;
      let cardx = [];
      cardx[cardId] = document.getElementById(`cardx${cardId}`);
      // eventlistener for every card with id
      cardx[cardId].addEventListener('click', () => {
        // eventlistener for  current card ( top )
        const player1CardElement = document.getElementById('player1-card');
        player1CardElement.setAttribute('src', './images/front_white.png');
        player1CardElement.addEventListener('click', () => {
          player1CardElement.setAttribute(
            'src',
            this.player1.deck.cards[i].image
            // this.player1.currentCard.image
          );
        });
        const player1DeckElement = document.getElementById('player1-deck');
        player1DeckElement.textContent = `Cards left: ${this.player1.length}`;
        console.log(`Irriterende for(){addEvL(i, ()=> {});} IDx: ${cardId}`);
        cardx[cardId].style.transform = 'scale(1.02)';
        cardx[cardId].style.transition = 'ease-in-out .2s';
        cardx[cardId].innerHTML = `
    <img class="container-content-img" src="${this.player1.deck.cards[i].image}" alt="">
    `;
      });
    }

    //PLAYER 2
    let rootContainer2 = document.querySelector(`.root-container2`);
    for (let i = 0; i < this.player2.deck.cards.length; i++) {
      const cardId = `card-${this.player2.deck.cards[i].id}`; // add unique ID to card element
      rootContainer2.innerHTML += `
    <div class="container-content" id="${cardId}">
      <img class="container-content-img" src="images/front_black.png" alt="">
    </div>
  `;
    }

    for (let i = 0; i < this.player2.deck.cards.length; i++) {
      const cardId = `card-${this.player2.deck.cards[i].id}`; // retrieve card element by ID
      const cardElement = document.getElementById(cardId);

      // event listener for player 2 card
      cardElement.addEventListener('click', () => {
        const player2CardElement = document.getElementById('player2-card');
        player2CardElement.setAttribute('src', './images/front_black.png');
        player2CardElement.addEventListener('click', () => {
          player2CardElement.setAttribute(
            'src',
            this.player2.deck.cards[i].image
          );
        });

        const player2DeckElement = document.getElementById('player2-deck');
        player2DeckElement.textContent = `Cards left: ${this.player2.length}`;

        console.log(
          `Irriterende for(){addEvL(i, ()=> {});} ID: ${this.player2.deck.cards[i].id}`
        );
        cardElement.style.transform = 'scale(1.02)';
        cardElement.style.transition = 'ease-in-out .2s';
        cardElement.innerHTML = `
      <img class="container-content-img" src="${this.player2.deck.cards[i].image}" alt="">
    `;
      });

      // console.log(this.player2.deck.cards[i].id);
    }
  }

  playRound() {
    document.querySelector('.root-container1').innerHTML = '';
    document.querySelector('.root-container2').innerHTML = '';
    
    this.player1.drawCard();
    this.player2.drawCard();
    this.displayGame();

    const player1Rank = this.deck.ranks.indexOf(this.player1.currentCard.rank);
    const player2Rank = this.deck.ranks.indexOf(this.player2.currentCard.rank);

    if (player1Rank > player2Rank) {
      this.player1.addCards([
        this.player1.currentCard,
        this.player2.currentCard
      ]);
    } else if (player2Rank > player1Rank) {
      this.player2.addCards([
        this.player1.currentCard,
        this.player2.currentCard
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
  
  }

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


  start() {
    let buttonStart = document.querySelector('.play-button');
    let buttonPlay = document.querySelector('.new-button');
    buttonStart.addEventListener('click', () => {
      buttonStart.style.display = 'none';
      buttonPlay.style.display = 'block';
      this.displayGame();
    });
  }

  play() {
    let buttonPlay = document.querySelector('.new-button');
    buttonPlay.addEventListener('click', () => {
      this.playRound();
    });
  }
}

const game = new Game();
game.start();
game.play();
