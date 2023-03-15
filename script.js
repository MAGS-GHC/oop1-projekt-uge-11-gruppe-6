
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
    console.log(deck1Cards)
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
  start() {
    let buttonStart = document.querySelector('.play-button');
    buttonStart.addEventListener('click', () => {
      this.playRound();
    });
  }
  displayGame() {
    const player1CardElement = document.getElementById('player1-card');
    player1CardElement.setAttribute('src', "./images/front_white.png");
    player1CardElement.addEventListener("click", () => {
      player1CardElement.setAttribute('src', this.player1.currentCard.image);
    });
    const player1DeckElement = document.getElementById('player1-deck');
    player1DeckElement.textContent = `Cards left: ${this.player1.length + 1}`;

    const player2CardElement = document.getElementById('player2-card');
    player2CardElement.setAttribute('src', "./images/front_black.png");
    player2CardElement.addEventListener("click", () => {
      player2CardElement.setAttribute('src', this.player2.currentCard.image);
    });
    const player2DeckElement = document.getElementById('player2-deck');
    player2DeckElement.textContent = `Cards left: ${this.player2.length + 1}`;

    // let rootContainer = [];
    // for (let x = 1; x < 3; x++){
    //   rootContainer[x] = document.querySelector(`.root-container${x}`);   
    //   for(let i = 0; i < this.player1.deck.cards.length; i++){
    //       rootContainer[x].innerHTML += `
    //       <div class="container-content" id="card${i}">
    //           <img class="container-content-img" src="images/front_white.png" alt="">
    //       </div>
    //       ` 
    //   }
    // }
    // console.log(this.player1.deck.cards.length)
    // console.log(this.player2.deck.cards.length)

    let rootContainer1 = document.querySelector(`.root-container1`);   
    for(let i = 0; i < this.player1.deck.cards.length; i++){
      rootContainer1.innerHTML += `
      <div class="container-content" id="card${i}">
      <img class="container-content-img" src="images/front_white.png" alt="">
      </div>
      ` 
    }
    let rootContainer2 = document.querySelector(`.root-container2`);   
    for(let i = 0; i < this.player2.deck.cards.length; i++){
      rootContainer2.innerHTML += `
      <div class="container-content" id="card${i}">
      <img class="container-content-img" src="images/front_black.png" alt="">
      </div>
      ` 
      let card = [];
      card[i] = document.getElementById(`card${i}`);
      card[i].addEventListener("click", () => {
      console.log(`Hej ID ${i}`);
      card[i].style.transform = "scale(1.05)";
      card[i].style.transition = "ease-in-out .3s";
      card[i].innerHTML = `
          <img class="container-content-img" src="${this.player1.deck.cards[i].image}" alt="">
      ` 
      });
    }
  }

  playRound() {
    document.querySelector(".root-container1").innerHTML = "";
    document.querySelector(".root-container2").innerHTML = "";
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
