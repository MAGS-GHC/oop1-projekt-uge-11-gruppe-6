
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
  }
  // shuffle() {
  //   //--Deck does not shuffle, Dealer shuffles etc.--//
  //   for (let i = this.cards.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // es6 swap
  //   }
  // }
  get length() {
    return this.cards.length;
  }
  
  ShuffleAndDealHalf() {
    const shuffledDeck = this.cards.sort(() => 0.5 - Math.random());
    // const half = Math.ceil(this.cards.length / 2);
    //const half = this.cards.length / 2;
    const deck1Cards = shuffledDeck.slice(0, 26);
    const deck2Cards = shuffledDeck.slice(26);
    this.player1Deck = new Deck();
    this.player2Deck = new Deck();
    this.player1Deck.cards = deck1Cards;
    this.player2Deck.cards = deck2Cards;
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
    if (cards) {
      this.deck.cards.unshift(...cards);
    }
  }
  get length() {
    return this.deck.length;
  }
}

class Dealer {
  constructor() {
    this.deck = new Deck();
    //this.deck.shuffle();
    this.deck.ShuffleAndDealHalf();
    this.player1 = new Player('Player 1', new Deck());
    this.player2 = new Player('Player 2', new Deck());
    this.player1.deck = this.deck.player1Deck;
    this.player2.deck = this.deck.player2Deck;

    console.log(this.deck.cards)
    console.log(this.deck.length);


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

  checkWarResult(player1Cards, player2Cards, player1LastCard, player2LastCard) {
    const winnerTXT = document.querySelector(".winner-text");

        /* Variable til at skrive data */
        let player1Write = document.querySelector(".player1-war-cards")
        let player2Write = document.querySelector(".player2-war-cards")


    
    if (player1LastCard.rank > player2LastCard.rank) {
      console.log("player 1 vinder")
      winnerTXT.innerHTML = `<h2 class="war-winner-text">Player 1 vinder</h2>`;
      this.player1.addCards([...player1Cards, ...player2Cards]);

    } 
    else if (player2LastCard.rank > player1LastCard.rank) {
      console.log("player 2 vinder")
      winnerTXT.innerHTML = `<h2 class="war-winner-text">Player 2 vinder</h2>`;
      this.player2.addCards([...player1Cards, ...player2Cards]);

    } 
    else {
        console.log("tie")
        player1Write.innerHTML = "";
        player2Write.innerHTML = "";
        winnerTXT.innerHTML = `<h2 class="war-winner-text">Det stod lige vi prøver igen</h2>`
        this.war();

    }
  }


  startWar(){
    const modalContainer = document.querySelector(".modal-container")
    const modalLoader = document.querySelector(".loader-container")
    const warCardContainer = document.querySelector(".war-card-container")
    
    modalContainer.classList.add("show")
  
    setTimeout(function() {
      modalLoader.classList.add("hidden");
      warCardContainer.classList.add("show")
    }, 4000);

    const warBTN = document.querySelector(".warBTN")
  }




  endWar() {
    const warBTN = document.querySelector(".warBTN");
    const player1Write = document.querySelector(".player1-war-cards");
    const player2Write = document.querySelector(".player2-war-cards");
    const modalContainer = document.querySelector(".modal-container");
    const modalLoader = document.querySelector(".loader-container");
    const warCardContainer = document.querySelector(".war-card-container");
    const winnerTXT = document.querySelector(".winner-text")



    warBTN.addEventListener("click", () => {
      player2Write.innerHTML = "";
      player1Write.innerHTML = "";
      winnerTXT.innerHTML = ""

      modalContainer.classList.remove("show");
      modalLoader.classList.remove("hidden");
      warCardContainer.classList.remove("show");
    });
  }



  war() {

    const warBTN = document.querySelector(".warBTN");

    let player1Write = document.querySelector(".player1-war-cards")
    let player2Write = document.querySelector(".player2-war-cards")




    this.startWar()

    /* De trukkede kort */
    const player1Cards = [this.player1.currentCard];
    const player2Cards = [this.player2.currentCard];
    /* Det sidste kort af de trukkede kort */
    let player1LastCard = player1Cards[player1Cards.length - 1].rank;
    let player2LastCard = player2Cards[player2Cards.length - 1].rank;

    // draw 3 cards
    for (let i = 0; i < 3; i++) {
      player1Cards.push(this.player1.deck.dealCard());
      player2Cards.push(this.player2.deck.dealCard());
    }

    /* Starter en count til antal clicks på kort */
    let cardsClicked = 0
    /* henter total af kort */
    const totalCards = player1Cards.length;

    /* looper over alle kort */
    for (let i = 0; i < totalCards; i++) {
      const card1 = player1Cards[i];
      const card2 = player2Cards[i];

    
      /* Opretter nye img elementer for hvert kort */
      const img = document.createElement("img");
      img.classList.add(`warCards${i}`);
      img.setAttribute("src", "images/front_black.png");

      img.addEventListener("click", () => {
        img.setAttribute("src", card1.image);
        const img2 = player2Write.querySelectorAll("img")[i];
        img2.setAttribute("src", card2.image);
        cardsClicked++;        
        if (cardsClicked === totalCards-1) {
          this.checkWarResult(player1Cards, player2Cards, card1, card2);
          warBTN.addEventListener("click", () =>{
            this.endWar();
          })                  
        }        
      });
    
      player1Write.appendChild(img);
    
      /* Skriver vores nr 2 kort med bagsiden af kort */
      const img2 = document.createElement("img");
      img2.classList.add(`warCards${i}`);
      img2.setAttribute("src", "images/front_white.png");
      player2Write.appendChild(img2);
    }

  }
}

const newGame = new Dealer();
newGame.start();
