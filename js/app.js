/*
    Author : Abdullah Muhammed.(abdo56668@gmail.com)
    content : FEND Memory Game Project.
    Start date : 26/3/2018
    End date : 
*/


//............................... Runner/Controller Area .................//
let OpenedCards = []; // contain two card to check if matched or not.
let moveCounter=0; // counting move that player did.
let ratingStars = 0; // progress of 3 starts.
let card; // assign to any card will be clicked.
let card1; // will assign to the first item in OpenedCard Array.
let card2; // will assign to the second item in OpenedCard Array.
let listOfOpenedCards = []; // contain all opened cards.
let arrayCards = []; // grid of cards to be shuffled.
let domCards;
let shuffled; // array sorting his element randomly.
let createGrid; // to display shuffled array as grid of array(display on interface).
let setTimer;
let clicks = 0; // count number of clicks.
let winModal;
let totalSeconds = 0;

//............................... Operation/Model Area ...................//

/*
 * On page loaded
 */
$(document).ready(function(){
    CardsFactory(); // To shuffle grid of cards.
    displayGrid(); // To display shuffled grid every time page load.
    startView(); 
    window.setTimeout(removeStartView,3000);
   
/*    $(".card").mouseover(function(){ 
        $(this).addClass('cardHover');
*/ //.............TODO...........//
    
        $(".card").click(function(){
            startGame(this);
        });
    
/*    });
    
    $(".card").mouseleave(function(){
        $(this).removeClass('cardHover');
    });*/ //.............TODO...........//
   
});


/*
 * Setting Deck of cards.. before start the game.   
 */
function CardsFactory(){
    arrayCards = document.querySelectorAll('.card');
    shuffled = objToArray(arrayCards);
    shuffled = shuffle(shuffled);
    return shuffled;
}

function displayGrid(){
    const list = document.createElement("ul");
    for(let i = 0; i < shuffled.length; i++){
        let li = document.createElement("li");
        li.innerHTML = shuffled[i];
        li.classList.add("card");
        list.appendChild(li);
    }

    createGrid =  document.getElementsByClassName("deck")[0].innerHTML = list.innerHTML;        
    return createGrid;
}

function startView(){
    domCards = document.querySelectorAll(".card");
    for(let i=0; i<domCards.length; i++){
        $(domCards[i]).addClass('open show');
    }
}

function removeStartView(){
    domCards = document.querySelectorAll(".card");
    for(let i=0; i<domCards.length; i++){
        $(domCards[i]).removeClass('open show');
    }
}
//_________________________________________________//

/*
 * Game Functionalities.
 */
function startGame(card){
    domCards = document.querySelectorAll('.card');
    $(card).addClass('show open');

    if(OpenedCards.length > 0){
        OpenedCards.push(card);
        isMatched(OpenedCards);
    } else{
       OpenedCards.push(card); 
    }

    if(OpenedCards.length == 2){
        setTimeout(function(){removeIncorrenct(OpenedCards);},200);
        setTimeout(function(){removeCorrenct(OpenedCards);},200);
        setTimeout(function(){OpenedCards.length = [];},300);
    }

    countClicks();
    rateSystem(clicks);
}

function isMatched(OpenedCards){
    card1 = OpenedCards[0].innerHTML;
    card2 = OpenedCards[1].innerHTML;
    
        let cond1 = $(OpenedCards[0]).is($(OpenedCards[1]));
    
    if(cond1){
        OpenedCards.pop(card2);
        return false;
    } else {
        if (card1 == card2){
            matched(OpenedCards);
        } else{
            notMatched(OpenedCards);
        }
    }  
}

function matched(OpenedCards){
    for(let i = 0; i < OpenedCards.length; i++){
        $(OpenedCards[i]).addClass("match");
        $(OpenedCards[i]).addClass('correct');
        
        if($(OpenedCards[i]).hasClass('match')){
        listOfOpenedCards.push(OpenedCards[i]);
        }
    }
            
    if(listOfOpenedCards.length == 16){
        winFunction();
    }
    CountMoves();
}

function removeCorrenct(OpenedCards){
    for(let i = 0; i < OpenedCards.length; i++){
        $(OpenedCards[i]).removeClass('correct');
    }
}

function notMatched(OpenedCards){
    for(let i = 0; i < OpenedCards.length; i++){
        $(OpenedCards[i]).removeClass('open show', 1000, "easeInBack");
        $(OpenedCards[i]).addClass('incorrect');
    }
    CountMoves();
}

function removeIncorrenct(OpenedCards){
    for(let i = 0; i < OpenedCards.length; i++){
        $(OpenedCards[i]).removeClass('incorrect');
    }
}
//__________________________________________________//

/*
 Start count : 
    Moves -- Timer -- Clicks -- Rating.
 */
function CountMoves(){
    moveCounter++;
    $('.moves').text(moveCounter);
}

function countTimer() {
   ++totalSeconds;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);
    
    if(seconds < 10){
        document.getElementById("timer").innerHTML =minute + ":" + "0" + seconds; 
    } else{
        document.getElementById("timer").innerHTML = minute + ":" + seconds;
    }
}

function countClicks(){
    clicks++;
    if(clicks == 1){
        setTimer = setInterval(countTimer, 1000);
    } 
}

function rateSystem(clicks){
    var stars = document.querySelectorAll('.fa-star');
    
    if(clicks > 24){
        $(stars[2]).css('color', '#f4d8c8');
    }
    if(clicks > 30){
        $(stars[1]).css('color', '#f4d8c8');
    }
    if(clicks > 36){
        $(stars[0]).css('color', '#f4d8c8');
    }
}
//__________________________________________________//

/*
 * Restart Game.
 */

function restart(){
    // remove all classes from each opened card.
    $(".open").removeClass("open");
    $(".show").removeClass("show");
    $(".match").removeClass("match");
    
    document.getElementById('timer').innerHTML = "0:00";
    document.querySelector(".moves").innerHTML = '0';
    
    starts = document.querySelectorAll('.fa-star');
    for(let i=0; i<starts.length; i++){
        $(starts[i]).css('color', 'gold');
    }
    clicks = 0;
    moveCounter = 0;
    totalSeconds = 0;
    OpenedCards.length = [];
    window.clearInterval(setTimer);
    
    // restart setting deck of cards.
    CardsFactory(); // To shuffle grid of cards.
    displayGrid(); // To display shuffled grid every time page load.
    startView();
    
    $(".card").click(function(){
        startGame(this);
    });
    window.setTimeout(removeStartView,3000);
}

/*
 * End game and show results when all cards are matched.
 */
function winFunction(){
    window.clearInterval(setTimer);
    winModal = document.getElementById('win-modal');
    setTimeout(function() {
    winModal.style.display = "block";
  }, 500);
    
    stars = document.querySelectorAll('.fa-star');
    // display final rating stars on modal.
    document.getElementById('win-stars').innerHTML = 
        "<ul class=\"stars\">" + stars[0].outerHTML + stars[1].outerHTML + stars[2].outerHTML + "</ul>";
    // display final time on modal.
    document.getElementById('win-time').innerHTML = document.getElementById("timer").innerHTML;
    // display moves on modal.
    document.getElementById('win-moves').innerHTML = moveCounter + 1;
    
    listOfOpenedCards.length = [];
}

function hideModal(){
    $('#win-modal').hide();
}
//__________________________________________________//

/*
 * Helper Functions.
 */
// function to convert object to array from https://stackoverflow.com/a/4608021/7997431
function objToArray(obj) {
    var result = [];
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
           result.push(obj[key].innerHTML);
       }
    }
    return result;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//__________________________________________________//



