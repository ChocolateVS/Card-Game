alert("Welcome to the game!, The aim is to end with all 4 aces on the bottom. You can remove a top card if there is a card of greater value, and of the same suit, on the top of another pile");
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cardValue = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = [];
var topCards = new Array();
var column1 = new Array();
var column2 = new Array();
var column3 = new Array();
var column4 = new Array();
var moves = 0;
var cardsDiscarded = 0;
var count = 13;
var topCard;
var blankCard = {Value: "0", Suit: "none", CardValue: "0"};
var discardArrH = new Array(12);
var discardArrD = new Array(12);
var discardArrC = new Array(12);
var discardArrS = new Array(12);

var solvableDeck = [];
var snd = new Audio("sound.wav"); 


discardArrays();
function discardArrays () {
    for (i = 0; i < discardArrH.length; i++) {
        discardArrH[i] = blankCard;
    }
    for (i = 0; i < discardArrD.length; i++) {
        discardArrD[i] = blankCard;
    }
    for (i = 0; i < discardArrC.length; i++) {
        discardArrC[i] = blankCard;
    }
    for (i = 0; i < discardArrS.length; i++) {
        discardArrS[i] = blankCard;
    }
}


var discDiv = document.getElementById("disc");
column1.push(blankCard);
column2.push(blankCard);
column3.push(blankCard);
column4.push(blankCard);
function generateDeck()
{
	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < cards.length; x++)
		{
			var card = {Value: cards[x], Suit: suits[i], CardValue: cardValue[x]};
			deck.push(card);
		}
	}
}

function shuffle()
{
    var random = document.getElementById("rand").checked;
    document.getElementById("rem").innerHTML = "Remaining Deals: 13";
    document.getElementById("moves").innerHTML = "Moves: 0";
    if (!random) {
        // for 1000 turns
        // switch the values of two random cards
        for (var i = 0; i < 1000; i++)
        {
            var location1 = Math.floor((Math.random() * deck.length));
            var location2 = Math.floor((Math.random() * deck.length));
            var tmp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
        deck.forEach(element => {
           solvableDeck.push(element); 
        });
    }
    else if (random) {
        deck = [];
        var solvableDecks = [deck1, deck2];
        var chosen = Math.floor(Math.random() * solvableDecks.length);
        solvableDecks[chosen].forEach(element => {
            deck.push(element); 
        });
    }
	//renderDeck();
}

function renderDeck()
{   
    document.getElementById('area').innerHTML = '';
    var columns = document.createElement("div");
    
    var drawColumn1 = document.createElement("button");
    var drawColumn2 = document.createElement("button");
    var drawColumn3 = document.createElement("button");
    var drawColumn4 = document.createElement("button");
    drawColumn1.className = "column";
    drawColumn1.setAttribute("onClick", "columnClicked(1)");
    drawColumn2.className = "column";
    drawColumn2.setAttribute("onClick", "columnClicked(2)");
    drawColumn3.className = "column";
    drawColumn3.setAttribute("onClick", "columnClicked(3)");
    drawColumn4.className = "column";
    drawColumn4.setAttribute("onClick", "columnClicked(4)");

    for (i = 1; i < column1.length; i++) {
        var br = document.createElement("br");
        var card = document.createElement("div");
        var value = document.createElement("div");
        var suit = document.createElement("div");
        card.className = "card";
        value.className = "value";
        suit.className = "suit " + column1[i].Suit;
        value.innerHTML = column1[i].Value;
        card.appendChild(value);
        card.appendChild(suit);
        drawColumn1.appendChild(card);
        drawColumn1.appendChild(br);
    }
    for (i = 1; i < column2.length; i++) {
        var br = document.createElement("br");
        var card = document.createElement("div");
        var value = document.createElement("div");
        var suit = document.createElement("div");
        card.className = "card";
        value.className = "value";
        suit.className = "suit " + column2[i].Suit;
        value.innerHTML = column2[i].Value;
        card.appendChild(value);
        card.appendChild(suit);
        drawColumn2.appendChild(card);
        drawColumn2.appendChild(br);
    }
    for (i = 1; i < column3.length; i++) {
        var br = document.createElement("br");
        var card = document.createElement("div");
        var value = document.createElement("div");
        var suit = document.createElement("div");
        card.className = "card";
        value.className = "value";
        suit.className = "suit " + column3[i].Suit;
        value.innerHTML = column3[i].Value;
        card.appendChild(value);
        card.appendChild(suit);
        drawColumn3.appendChild(card);
        drawColumn3.appendChild(br);
    }
    for (i = 1; i < column4.length; i++) {
        var br = document.createElement("br");
        var card = document.createElement("div");
        var value = document.createElement("div");
        var suit = document.createElement("div");
        card.className = "card";
        value.className = "value";
        suit.className = "suit " + column4[i].Suit;
        value.innerHTML = column4[i].Value;
        card.appendChild(value);
        card.appendChild(suit);
        drawColumn4.appendChild(card);
        drawColumn4.appendChild(br);
    }
    columns.className = "all";
    columns.appendChild(drawColumn1);
    columns.appendChild(drawColumn2);
    columns.appendChild(drawColumn3);
    columns.appendChild(drawColumn4);
    
    document.getElementById("area").appendChild(columns);
}

generateDeck();
shuffle();

function moreCards() {
    var remain = document.getElementById("rem");
    if (count > 0) {
    snd.play();
    var card1 = deck[0];
    var card2 = deck[1];
    var card3 = deck[2];
    var card4 = deck[3];
    deck.shift();
    deck.shift();
    deck.shift();
    deck.shift();
    
    column1.push(card1);
    column2.push(card2);
    column3.push(card3);
    column4.push(card4);
    renderDeck();
    count--;
    
    remain.innerHTML = "Remaining Deals: " + count;
    }
    if (count == 0) {
        //alert("The deck is empty");
        document.getElementById("btn").style.display = "none";
    }
}

function columnClicked(clickedColumn) {
    var column1top = column1[column1.length - 1]; 
    var column2top = column2[column2.length - 1]; 
    var column3top = column3[column3.length - 1]; 
    var column4top = column4[column4.length - 1]; 
    var emptyColumn = 0;
    topCards = [column1top, column2top, column3top, column4top];
    if (clickedColumn == 1) {
         var clicked = column1top;
    }
    if (clickedColumn == 2) {
         var clicked = column2top;
    }
    if (clickedColumn == 3) {
         var clicked = column3top;
    }
    if (clickedColumn == 4) {
         var clicked = column4top;
    }
    if (clicked.CardValue < column1top.CardValue && clicked.Suit == column1top.Suit || clicked.CardValue < column2top.CardValue && clicked.Suit == column2top.Suit || clicked.CardValue < column3top.CardValue && clicked.Suit == column3top.Suit || clicked.CardValue < column4top.CardValue && clicked.Suit == column4top.Suit) {
        if (clickedColumn == 1) {
            var discarded = column1[column1.length - 1];
            updateDiscard(discarded);
            column1.pop();
        }
        if (clickedColumn == 2) {
            var discarded = column2[column2.length - 1];
            updateDiscard(discarded);
            column2.pop();
        }
        if (clickedColumn == 3) {
            var discarded = column3[column3.length - 1];
            updateDiscard(discarded);
            column3.pop();
        }
        if (clickedColumn == 4) {
            var discarded = column4[column4.length - 1];
            updateDiscard(discarded);
            column4.pop();
        }
        snd.play();
        moves++;
        document.getElementById("moves").innerHTML = "Moves: " + moves;
        renderDeck();
    }
    else if (column1.length == 1 && column1[0].CardValue == 0) {
        moveCard(clickedColumn, 1);
    } else if(column2.length == 1 && column2[0].CardValue == 0) {
        moveCard(clickedColumn, 2);
    } else if(column3.length == 1  && column3[0].CardValue == 0) {
        moveCard(clickedColumn, 3);
    } else if(column4.length == 1  && column4[0].CardValue == 0) {
        moveCard(clickedColumn, 4);
    }
    
    else {
        alert("This card requires a card greater than it, and of the same suit to be removed");
    }
    if (column1.length > 0) {
        var top1 = column1[column1.length - 1].Suit;
        var top2 = column2[column2.length - 1].Suit;
        var top3 = column3[column3.length - 1].Suit;
        var top4 = column4[column4.length - 1].Suit;
        
        if (column1[1].CardValue == 14 && column2[1].CardValue == 14 && column3[1].CardValue == 14 && column4[1].CardValue == 14 && column1.length == 2 && column2.length == 2 && column3.length == 2 && column4.length == 2) {
            alert("Congratulations, OMG, WOW, no way you actually completed it!");
        }
        else if (top1 != top2 && top1 != top3 && top1 != top4 && top2 != top3 && top2 != top4 && top3 != top4 && count == 0 && column1.length > 1 && column2.length > 1 && column3.length > 1 && column4.length > 1) {
            alert("Oh No! It seems you are stuck :(, YOU LOSE");
        }
        
    }
}

function moveCard(startPile, endPile) {
    var tempCard;// = topCard[startPile];
    //console.log(startPile, endPile);
    if (startPile == 1) {
        tempCard = column1[column1.length - 1];
        column1.pop();
    }
    if (startPile == 2) {
        tempCard = column2[column2.length - 1];
        column2.pop();
    }
    if (startPile == 3) {
        tempCard = column3[column3.length - 1];
        column3.pop();
    }
    if (startPile == 4) {
        tempCard = column4[column4.length - 1];
        column4.pop();
    }
    //console.log(tempCard);
    if (endPile == 1) {
        column1.push(tempCard);
    }
    if (endPile == 2) {
        column2.push(tempCard);
    }
    if (endPile == 3) {
        column3.push(tempCard);
    }
    if (endPile == 4) {
        column4.push(tempCard);
    }
    snd.play();
    moves++;
    document.getElementById("moves").innerHTML = "Moves: " + moves;
    renderDeck();
}

function updateDiscard2(discarded) {
    cardsDiscarded++;
    //document.getElementById("discard").innerHTML = "";
    var br = document.createElement("br");
    var card = document.createElement("div");
    var value = document.createElement("div");
    var suit = document.createElement("div");
    card.className = "card";
    value.className = "value";
    suit.className = "suit " + discarded.Suit;
    value.innerHTML = discarded.Value;
    card.appendChild(value);
    card.appendChild(suit);
    discDiv.innerHTML = "Discarded: (" + cardsDiscarded + ")";
    document.getElementById("discard").appendChild(card); 
    //document.getElementById("discard").appendChild(br); 
    
}

function updateDiscard(discarded) {
    //console.log("Discarded: ", discarded);
    document.getElementById("discard").innerHTML = "";
    cardsDiscarded++;
    
    var br = document.createElement("br");
    if (discarded.Suit == "hearts") {
        discardArrH.splice(discarded.CardValue, 0, discarded);
    }
    if (discarded.Suit == "diamonds") {
        discardArrD.splice(discarded.CardValue, 0, discarded);
    }
    if (discarded.Suit == "clubs") {
        discardArrC.splice(discarded.CardValue, 0, discarded);
    }
    if (discarded.Suit == "spades") {
        discardArrS.splice(discarded.CardValue, 0, discarded);
    }
    document.getElementById("discard").innerHTML = "Discarded: (" + cardsDiscarded + ")";
    document.getElementById("discard").appendChild(br); 

    //console.log(discardArrH, discardArrD, discardArrC, discardArrS);
    for (i = 0; i < discardArrH.length; i++) {
        if (discardArrH[i].CardValue != 0) {
            //console.log("Heart", i);
            addToDiscard(discardArrH[i]);
        }
    }
    for (i = 0; i < discardArrD.length; i++) {
        if (discardArrD[i].CardValue != 0) {
            //console.log("Diamond", i);
            addToDiscard(discardArrD[i]);
        }
    }
    for (i = 0; i < discardArrC.length; i++) {
        if (discardArrC[i].CardValue != 0) {
            //console.log("Club", i);
            addToDiscard(discardArrC[i]);
        }
    }
    for (i = 0; i < discardArrS.length; i++) {
        if (discardArrS[i].CardValue != 0) {
            //console.log("Spade", i);
            addToDiscard(discardArrS[i]);
        }
    }
}

function addToDiscard(discardCard) {
    //console.log(discardCard);
    var card = document.createElement("div");
    var value = document.createElement("div");
    var suit = document.createElement("div");
    card.className = "card";
    value.className = "value";
    suit.className = "suit " + discardCard.Suit;
    value.innerHTML = discardCard.Value;
    card.appendChild(value);
    card.appendChild(suit);
    
    document.getElementById("discard").appendChild(card); 
}
function restart() {
    var br = document.createElement("br");
    moves = 0;
    cardsDiscarded = 0;
    
    solvableDeck = [];
    document.getElementById("area").innerHTML = "";
    document.getElementById("discard").innerHTML = "Discarded: (0)";
    document.getElementById("discard").appendChild(br); 
    deck = [];
    topCards = new Array();
    column1 = new Array();
    column2 = new Array();
    column3 = new Array();
    column4 = new Array();

    count = 13;
    topCard;
    blankCard = {Value: "0", Suit: "none", CardValue: "0"};
    column1.push(blankCard);
    column2.push(blankCard);
    column3.push(blankCard);
    column4.push(blankCard);
    
    discardArrH = new Array(12);
    discardArrD = new Array(12);
    discardArrC = new Array(12);
    discardArrS = new Array(12);

    discardArrays();

    document.getElementById("btn").style.display = "inline-block";
    generateDeck();
    shuffle();
}