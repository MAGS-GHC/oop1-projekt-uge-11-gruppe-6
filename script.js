
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
    this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    for (let suit of this.suits) {
      for (let rank of this.ranks) {
        let image = `./images/${rank}_of_${suit}.png`;
        this.cards.push(new Card(suit, rank, image));
      }
    }
    //+Unique cards+//
  }
  //+?+//
  shuffle() {
    //--Deck does not shuffle, Dealer shuffles etc.--//
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // es6 swap
    }
  }
  //+?+//
  get length() {
    return this.cards.length;
  }
  //+?+//
  dealHalf() {
    //--Deck does not cut, Dealer cuts--//
    const half = Math.ceil(this.cards.length / 2);
    const deck1Cards = this.cards.slice(0, half);
    const deck2Cards = this.cards.slice(half);
    this.player1Deck = new Deck();
    this.player2Deck = new Deck();
    this.player1Deck.cards = deck1Cards;
    this.player2Deck.cards = deck2Cards;
    console.log(deck1Cards)
  }
  //--Deck does not deal, Dealer deals--//
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
  //+?+//
  get length() {
    return this.deck.length;
  }
}

class Dealer {
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
  displayHands() {
    const player1CardElement = document.getElementById('player1-card');
    player1CardElement.setAttribute('src', this.player1.currentCard.image);
    player1CardElement.addEventListener("click", () => {
      player1CardElement.setAttribute('src', "./images/front_white.png");
    });
    const player1DeckElement = document.getElementById('player1-deck');
    player1DeckElement.textContent = `Cards left: ${this.player1.length + 1}`;

    const player2CardElement = document.getElementById('player2-card');
    player2CardElement.setAttribute('src', this.player2.currentCard.image);
    player2CardElement.addEventListener("click", () => {
      player2CardElement.setAttribute('src', "./images/front_black.png");
    });
    const player2DeckElement = document.getElementById('player2-deck');
    player2DeckElement.textContent = `Cards left: ${this.player2.length + 1}`;

    this.displayPlayerAllCards()
  }

  displayPlayerAllCards(){
    //PLAYER 1
    let rootContainer1 = document.querySelector(`.root-container1`);   
    for(let i = 0; i < this.player1.deck.cards.length; i++){
      rootContainer1.innerHTML += `
      <div class="container-content" id="cardx${i}">
      <img class="container-content-img" src="${this.player1.deck.cards[i].image}" alt="">
      </div>
      ` 
      // cardx[x] = document.getElementById(`cardx${x}`);
      // cardx[x].addEventListener("click", () => {
      // console.log(`Hej ID ${x}`);
      // cardx[x].style.transform = "scale(1.02)";
      // cardx[x].style.transition = "ease-in-out .2s";
      // cardx[x].innerHTML = `
      //     <img class="container-content-img" src="images/front_white.png" alt="">
      // ` 
      // });
      // console.log(cardx)
    }
    for(let i = 0; i < this.player1.deck.cards.length; i++){
      let cardx = []; 
      cardx[i] = document.getElementById(`cardx${i}`);
      cardx[i].addEventListener("click", () => {
      console.log(`Irriterende for(){addEvL(i, ()=> {});} IDx: ${i}`);
      cardx[i].style.transform = "scale(1.02)";
      cardx[i].style.transition = "ease-in-out .2s";
      cardx[i].innerHTML = `
          <img class="container-content-img" src="images/front_white.png" alt="">
      ` 
      });
    }
    //PLAYER 2
    let rootContainer2 = document.querySelector(`.root-container2`); 
    for(let i = 0; i < this.player2.deck.cards.length; i++){
      rootContainer2.innerHTML += `
      <div class="container-content" id="card${i}">
      <img class="container-content-img" src="${this.player2.deck.cards[i].image}" alt="">
      </div>
      ` 
    }
    for(let i = 0; i < this.player2.deck.cards.length; i++){
      let card = []; 
      card[i] = document.getElementById(`card${i}`);
      card[i].addEventListener("click", () => {
      console.log(`Irriterende for(){addEvL(i, ()=> {});} ID: ${i}`);
      card[i].style.transform = "scale(1.02)";
      card[i].style.transition = "ease-in-out .2s";
      card[i].innerHTML = `
          <img class="container-content-img" src="images/front_black.png" alt="">
      ` 
      });
    }
    // let rootContainer = [];
    // for (let x = 1; x < 3; x++){
    //   rootContainer[x] = document.querySelector(`.root-container${x}`);   
    //   for(let i = 0; i < this.deck.length / 2; i++){
    //       rootContainer[x].innerHTML += `
    //       <div class="container-content" id="card${i}">
    //           <img class="container-content-img" src="images/front_white.png" alt="">
    //       </div>
    //       `
    //       let card = [];
    //       card[i] = document.getElementById(`card${i}`);
    //       card[i].addEventListener("click", () => {
    //       console.log(`Hej ID ${i}`);
    //       card[i].style.transform = "scale(1.02)";
    //       card[i].style.transition = "ease-in-out .2s";
    //       card[i].innerHTML = `
    //           <img class="container-content-img" src="${this.player1.deck.cards[i].image}" alt="">
    //       ` 
    //       }); 
    //   }
    // }
    // console.log(this.player1.deck.cards.length)
    // console.log(this.player2.deck.cards.length)
  }

  playRound() {
    document.querySelector(".root-container1").innerHTML = "";
    document.querySelector(".root-container2").innerHTML = "";

    this.player1.drawCard();
    this.player2.drawCard();
    this.displayHands();

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
      //--AlERT--, ++HTML notification++//
      alert('Player 2 Wins!');
            //--reload()--//
      location.reload();
    } else if (this.player2.length < 3) {
       //--AlERT--, ++HTML notification++//
      alert('Player 1 Wins!');
      //--reload()--//
      location.reload();
    }
  }

  war() {
    //++More methods in war++//
    const player1Cards = [this.player1.currentCard];
    const player2Cards = [this.player2.currentCard];

    for (let i = 0; i < 3; i++) {
      player1Cards.push(this.player1.deck.dealCard());
      player2Cards.push(this.player2.deck.dealCard());
    }

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

const newGame = new Dealer();
newGame.start();
