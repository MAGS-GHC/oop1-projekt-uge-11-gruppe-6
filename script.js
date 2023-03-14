class Card {
    constructor(name, type, rank, img, front) {
      this.name = name;
      this.type = type;
      this.rank = rank;
      this.img = img;
      this.front = front;
    }
  }
    
  class Deck {
    constructor() {
      this.cards = [];
      const types = ["spades", "diamonds", "clubs", "hearts"];
      const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "ace"];
  
      for (let type of types) {
        for (let i = 0; i < ranks.length; i++) {
          let name = ranks[i] + "_of_" + type;
          let rank = i + 1;
          let img = name + ".png";
          let front = true;
          let card = new Card(name, type, rank, img, front);
          this.cards.push(card);
        }
      }
    }
}
let kortSpil = new Deck();
console.log(kortSpil)