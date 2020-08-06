//alert("Welcome to the game!, The aim is to end with all 4 aces on the bottom. You can remove a top card if there is a card of greater value, and of the same suit, on the top of another pile");
var cards = ["2", "3", "4", "5", "6", "7", "8", "9"];
var cardValue = [2, 3, 4, 5, 6, 7, 8, 9];
var deck = [];

var column1 = new Array();
var column2 = new Array();
var column3 = new Array();

var moves = 0;

var blankCard = {Value: "0", Suit: "none", CardValue: "1000"};

var snd = new Audio("sound.wav"); 

var discDiv = document.getElementById("disc");
column1.push(blankCard);
column2.push(blankCard);
column3.push(blankCard);

function generateDeck()
{
    for(var x = 0; x < cards.length; x++)
    {
        var card = {Value: cards[x], Suit: "hearts", CardValue: cardValue[x]};
        deck.push(card);
    }
}

function shuffle()
{
    document.getElementById("moves").innerHTML = "Moves: 0";
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
    
    column1.push(deck[0]);
    column1.push(deck[1]);
    column1.push(deck[2]);
    column2.push(deck[3]);
    column2.push(deck[4]);
    column2.push(deck[5]);
    column3.push(deck[6]);
    column3.push(deck[7]);
}

var startColumn;
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(dropColumn) {
    console.log("Start", startColumn)
    console.log("Drop", dropColumn);
    var startCol;
    var dropCol;
    columnsArr = [column1, column2, column3];
    startCol = columnsArr[startColumn];
    dropCol = columnsArr[dropColumn];
    console.log(startCol, dropCol);
    if (startCol[startCol.length - 1].CardValue < dropCol[dropCol.length - 1].CardValue) {
        console.log("YEP");
        var tempCard;
        if (startColumn == 0) {
            tempCard = column1[column1.length - 1];
            column1.pop();
        }
        if (startColumn == 1) {
            tempCard = column2[column2.length - 1];
            column2.pop();
        }
        if (startColumn == 2) {
            tempCard = column3[column3.length - 1];
            column3.pop();
        }
        
        if (dropColumn == 0) {
            column1.push(tempCard);
        }
        if (dropColumn == 1) {
            column2.push(tempCard);
        }
        if (dropColumn == 2) {
            column3.push(tempCard);
        }
        moves++;
    }
    startColumn = "";
    
    snd.play();
    renderDeck();
    if (column1.length == 9 || column2.length == 9 || column3.length == 9) {
        alert("YOUUUUUUUU WINNNN!..... :(");
    }

}

function cardDrag(startC) {
  startColumn = startC;
}

function renderDeck()
{   
    document.getElementById('area').innerHTML = '';
    var columns = document.createElement("div");
    
    var drawColumn1 = document.createElement("div");
    var drawColumn2 = document.createElement("div");
    var drawColumn3 = document.createElement("div");
    drawColumn1.className = "long_column";
    drawColumn1.setAttribute("ondrop", "drop(0)");
    drawColumn1.setAttribute("ondragover", "allowDrop(event)");
    drawColumn2.className = "long_column";
    drawColumn2.setAttribute("ondrop", "drop(1)");
    drawColumn2.setAttribute("ondragover", "allowDrop(event)");
    drawColumn3.className = "Long_column";
    drawColumn3.setAttribute("ondrop", "drop(2)");
    drawColumn3.setAttribute("ondragover", "allowDrop(event)");
    
    //ondrop="drop(event)" ondragover="allowDrop(event)
    //ondragstart="drag(event)"
    
    for (i = 0; i < column1.length; i++) {
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
        
        if (i == column1.length - 1) {
            card.setAttribute("draggable", "true");
            card.setAttribute("ondragstart", "cardDrag(0)");
            card.setAttribute("id", "card");
        }
        drawColumn1.appendChild(card);
        drawColumn1.appendChild(br);
    }
    for (i = 0; i < column2.length; i++) {
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
        
        if (i == column2.length - 1) {
            card.setAttribute("draggable", "true");
            card.setAttribute("ondragstart", "cardDrag(1)");
            card.setAttribute("id", "card");
        }
        drawColumn2.appendChild(card);
        drawColumn2.appendChild(br);
    }
    for (i = 0; i < column3.length; i++) {
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
    
        if (i == column3.length - 1) {
            card.setAttribute("draggable", "true");
            card.setAttribute("ondragstart", "cardDrag(2)");
            card.setAttribute("id", "card");
        }
        drawColumn3.appendChild(card);
        drawColumn3.appendChild(br);
    }
    columns.className = "all";
    columns.appendChild(drawColumn1);
    columns.appendChild(drawColumn2);
    columns.appendChild(drawColumn3);
    document.getElementById("area").appendChild(columns);
    document.getElementById("moves").innerHTML = "Moves: " + moves;
}

generateDeck();
shuffle();
renderDeck();

function restart() {
    var br = document.createElement("br");
    moves = 0;

    document.getElementById("area").innerHTML = "";
    document.getElementById("moves").innerHTML = "Moves: 0";

    deck = [];
    column1 = new Array();
    column2 = new Array();
    column3 = new Array();

    count = 13;
    blankCard = {Value: "0", Suit: "none", CardValue: "1000"};
    column1.push(blankCard);
    column2.push(blankCard);
    column3.push(blankCard);

    generateDeck();
    shuffle();
    renderDeck();
}