// get dealer-hand element
const dealerHand = document.getElementById("dealer-hand");
// get dealer hand points value
const dealerValue = document.getElementById("dealer-points")
// get pllayer-hand element
const playerHand = document.getElementById("player-hand");
// get player hand points value
const playerValue = document.getElementById("player-points")
// get deal button
const dealButton = document.getElementById("deal-button");
//get hit button
const hitButton = document.getElementById("hit-button")
// get stand button
const standButton = document.getElementById("stand-button")
// make empty deck array
const deck = [];
// define suits array
const suits = ["hearts", "spades", "clubs", "diamonds"];
// define ranks array
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"]
// character sums
let dealerSum = 0
let playerSum = 0
let playerCards = []
let dealerCards = []

// makeDeck function(rank & suit arguements)
const makeDeck = (rank, suit) => {
    // define card object
    const card = {
    rank: rank,
    suit: suit,
    src: `./images/${rank}_of_${suit}.png`
    };
    // // assign point value
    if (card.rank === "king"){
        card.pointValue = 10
    }else if(card.rank === "queen"){
        card.pointValue = 10
    }else if(card.rank === "jack"){
        card.pointValue = 10
    }else if(card.rank === "ace"){
        card.pointValue = 11
    }else {
        card.pointValue = rank
    }
    deck.push(card);
}
// adding arguements to makeDeck function
for (let suit of suits) {
    for (const rank of ranks) {
        makeDeck(rank, suit);
    }
}

// =========== CHECK ACE FUNCTION ===========
const checkAce = (points,arr) =>{
    if (points > 21){
        arr.forEach((element)=>{
        if(element.rank === 'ace'){
            element.pointValue = 1
        }
    })
    }
}

// =========== SHUFFLE FUNCTION ===========
// geeks for geeks solution 2 - this works
const shuffle = (array) => {
    return array.sort(()=>Math.random()-0.5)
}
const getCard = () =>{
    return deck.pop();
}
const getImage = (card) => {
    cardImage = document.createElement('img')
    cardImage.src = `./images/${card.rank}_of_${card.suit}.png` 
    return cardImage
}
const playerRender = (arr) =>{
    arr.forEach((element) => {
        playerHand.append(getImage(element))
    });
}
const dealerRender = (arr) =>{
    arr.forEach((element) => {
        dealerHand.append(getImage(element))
    });
}

const playerPointCalc = (arr) => {
    let points = 0
    for(const i of arr){
        points+= i.pointValue
    }
    playerSum = points
    return playerSum
}
const dealerPointCalc = (arr) => {
    let points = 0
    for(const i of arr){
        points+= i.pointValue
    }
    dealerSum = points
    return dealerSum
}

// =========== DEAL FUNCTION ===========
const deal = () =>{
    dealButton.disabled = true
    dealerCards.push(getCard())
    dealerCards.push(getCard())
    dealerRender(dealerCards)
    checkAce(dealerPointCalc(dealerCards), dealerCards)

    playerCards.push(getCard())
    playerCards.push(getCard())
    playerRender(playerCards)
    playerValue.innerText = playerPointCalc(playerCards)
    checkAce(playerPointCalc(playerCards), playerCards)
}

// =========== HIT FUNCTION ===========
const hit = () =>{
    playerHand.innerHTML = null
    playerCards.push(getCard())
    playerRender(playerCards)
    checkAce(playerPointCalc(playerCards), playerCards)
    playerValue.innerText = playerPointCalc(playerCards)
    if(playerSum >= 21){
        hitButton.disabled = true
        // kills the ability to stand because player busted
        stand()
    }
}
// =========== STAND FUNCTION ===========
const stand = () =>{
    dealButton.disabled = true
    hitButton.disabled = true
    while (dealerSum < 17) {
        dealerHand.innerHTML = null
        dealerCards.push(getCard())
        dealerRender(dealerCards)
        checkAce(dealerPointCalc(dealerCards), dealerCards)
        dealerValue.innerText = dealerPointCalc(dealerCards)
    }
    let message = ""
    // player sum is more than dealer sum && player sum is less than or equal to 21
    if(playerSum > dealerSum && playerSum <= 21){
        message = "You Win"
    // player sum is less than 21 && dealer sum is more than 21
    }else if(playerSum <= 21 && dealerSum > 21){
        message = "You Win"
    // player sum is less than dealer sum && dealer sum is less than or equal to 21
    }else if(playerSum < dealerSum && dealerSum <= 21){
        message = "You Lose"
    // player sum is more than 21 (doesn't matter if dealer sum is more than 21)
    }else if(playerSum > 21){
        message = "You busted"
    // player sum and dealer sum are the same
    }else if(playerSum === dealerSum){
        message = "It's A Draw"
    }
    const messageText = document.getElementById("message")
    messageText.innerText = message
    const dealerScore = document.getElementById("dealer-points")
    dealerScore.innerText = dealerSum
    return
}


// load game when window opened
window.addEventListener("DOMContentLoaded", () =>{

    shuffle(deck)
    console.log(deck)
    dealButton.addEventListener("click", deal)
    hitButton.addEventListener("click", hit)
    standButton.addEventListener("click", stand)
})