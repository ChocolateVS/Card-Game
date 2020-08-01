var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cardValue = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = [];
var topCards = new Array();
var column1 = new Array();
var column2 = new Array();
var column3 = new Array();
var column4 = new Array();

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
    console.log(deck);
}

function shuffle()
{
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
        drawColumn3.appendChild(card);
        drawColumn3.appendChild(br);
    }
    for (i = 0; i < column4.length; i++) {
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
}

function columnClicked(clickedColumn) {
    var column1top = column1[column1.length - 1]; 
    var column2top = column2[column2.length - 1]; 
    var column3top = column3[column3.length - 1]; 
    var column4top = column4[column4.length - 1]; 
    
    if (column1.length == 0)
    var topCards = [column1top, column2top, column3top, column4top];
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
    console.log(clicked.CardValue, column1top.CardValue, clicked.Suit, column1top.Suit, clicked.CardValue, column2top.CardValue, clicked.Suit, column2top.Suit, clicked.CardValue, column3top.CardValue, clicked.Suit, column3top.Suit, clicked.CardValue, column4top.CardValue, clicked.Suit, column4top.Suit);

    if (clicked.CardValue < column1top.CardValue && clicked.Suit == column1top.Suit || clicked.CardValue < column2top.CardValue && clicked.Suit == column2top.Suit || clicked.CardValue < column3top.CardValue && clicked.Suit == column3top.Suit || clicked.CardValue < column4top.CardValue && clicked.Suit == column4top.Suit) {
        if (clickedColumn == 1) {
            column1.pop();
        }
        if (clickedColumn == 2) {
             column2.pop();
        }
        if (clickedColumn == 3) {
             column3.pop();
        }
        if (clickedColumn == 4) {
             column4.pop();
        }
        renderDeck();
    }
    else if (column1.length == 0 || column2.length == 0 || column3.length == 0 || column2.length == 0) {
        alert("Can be moved to empty pile");
    }
    else {
        alert("This card requires a card greater than it of the same suit to be removed");
    }
}