# Matching-Game-Project

/*
    Author : Abdullah Muhammed.(abdo56668@gmail.com)
    content : FEND Memory Game Project.
    Start date : 26/3/2018
    End date : 
*/
//_______________________________________________________Instrutions_________________________________________________//
/*
 * Create a list that holds all of your cards. 
 */


/*
 * Display the cards on the page 
 *   - shuffle the list of cards using the provided "shuffle" method below 
 *   - loop through each card and create its HTML 
 *   - add each card's HTML to the page 
 */



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) 
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 
 
//______________________________________________________________________________________________________________________//

- The project has been divided to two main sections :
    - Runner/Controller Area
    - Operation/Model Area
    
- Runner/Controller Area : contains variables decleration. Which will be use in Operation/Model Area.

- Operation/Model Area   : contains all functions that will run functionalities of the game. 
  This area divided to six parts : 
      - On page loaded
      - Setting Deck of cards.. before start the game. 
      - Game Functionalities.
      - Start count : Moves -- Timer -- Clicks -- Rating.
      - Restart Game.
      - End game and show results when all cards are matched.
      - Helper Functions.
