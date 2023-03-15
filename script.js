
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
    this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "ace"];

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

    console.log(this.player1)

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
    this.player1.drawCard();
    this.player2.drawCard();
    this.displayGame();
  
    const player1Rank = this.player1.deck.ranks.indexOf(this.player1.currentCard.rank);
    const player2Rank = this.player2.deck.ranks.indexOf(this.player2.currentCard.rank);
  
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
  
    if (this.player1.length === 0) {
      alert('Player 2 Wins!');
      location.reload();
    } else if (this.player2.length === 0) {
      alert('Player 1 Wins!');
      location.reload();
    }
  }

  
  
  
  
  
  

  // mangler war method


  war() {
    const warContainer = document.querySelector(".war-container")
    const modalContainer = document.querySelector(".modal-container")

    const player1Write = document.querySelector(".player1-war-cards")
    const player2Write = document.querySelector(".player2-war-cards")


    const warBTN = document.querySelector(".warBTN")

    const player1Cards = [this.player1.currentCard];
    const player2Cards = [this.player2.currentCard];
    
    modalContainer.classList.add("show")



    // draw 3 cards

    for (let i = 0; i < 3; i++) {
      player1Cards.push(this.player1.deck.dealCard());
      player2Cards.push(this.player2.deck.dealCard());
    }



    // display the cards drawn in the war
    console.log(`Player 1 cards: `);
    for (let card of player1Cards) {
      console.log(`${card.rank} of ${card.suit} (${card.image})`);
      player1Write.innerHTML += `<img class="warCards" src="${card.image}"> `
    }



    console.log(`Player 2 cards: `);
    for (let card of player2Cards) {
      console.log(`${card.rank} of ${card.suit} (${card.image})`);
      player2Write.innerHTML += `<img class="warCards" src="${card.image}"> `

    }

  const player1LastCard = parseInt(player1Cards[player1Cards.length - 1].rank);
  const player2LastCard = parseInt(player2Cards[player2Cards.length - 1].rank);


  if (player1LastCard > player2LastCard) {
    console.log("Player 1 wins the war");
    this.player1.deck.push(...player1Cards, ...player2Cards);
    console.log(player1.deck)
    warBTN.addEventListener("click", () =>{
      warContainer.innerHTML = "";
      modalContainer.classList.remove("show");
    })
  } 
  
  else if (player2LastCard > player1LastCard) {

    console.log("Player 2 wins the war");
    console.log(this.player2.deck)
    this.player2.deck.push(...player1Cards, ...player2Cards);
    warBTN.addEventListener("click", () =>{
      warContainer.innerHTML = "";
      modalContainer.classList.remove("show");
    })

  }
  
  else {

    
  }


  
}
}

const game = new Game();
game.start();
