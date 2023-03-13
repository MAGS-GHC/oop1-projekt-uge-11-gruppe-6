import cardsArray from "./cards.js";
let deck = cardsArray;
function giveFullDeck(){
    let rootContainer = document.querySelector(".root-container");    
    for(let i = 0; i < deck.length; i++){
        rootContainer.innerHTML += `
        <div class="container-content dealer" id="card-${i}">
            <img class="container-content-img dealer" src="images/${deck[i].img}" alt="">
        </div>
        ` 
    }
}
function shuffleAndSplitDeck(){
    let shuffledDeck = [];
    shuffledDeck = deck.sort(() => 0.5 - Math.random());
    let deckSplit1 = [];
    deckSplit1 = shuffledDeck.slice(0, 27); 
    console.log(deckSplit1)
    console.log("DECK SHUFFLED, SPLITTED AND HANDED")
    handPlayerOne(deckSplit1)
    let deckSplit2 = [];
    deckSplit2 = shuffledDeck.slice(27, 54); 
    console.log(deckSplit2)
    console.log("DECK SHUFFLED, SPLITTED AND HANDED")
    handPlayerTwo(deckSplit2)
}
function handPlayerOne(input){
    let rootContainer1 = document.querySelector(".root-container1");   
    for(let i = 0; i < input.length; i++){
        rootContainer1.innerHTML += `
        <div class="container-content" id="card-${i}">
            <img class="container-content-img" src="images/${input[i].img}" alt="">
        </div>
        ` 
    }
}
function handPlayerTwo(input){
    let rootContainer2 = document.querySelector(".root-container2");   
    for(let i = 0; i < input.length; i++){
        rootContainer2.innerHTML += `
        <div class="container-content" id="card-${i}">
            <img class="container-content-img" src="images/${input[i].front}" alt="">
        </div>
        ` 
    }
    //rootContainer2 = document.querySelector(".root-container2").style.display = "none"
}
shuffleAndSplitDeck()
giveFullDeck()