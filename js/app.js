"use strict"

var ticTacToe = (function() {
  // on click start button, hide start page and show board
  $("#start-game").on("click", function(e) {
    e.preventDefault();
    $("#start").addClass("hidden");
    $("#board").removeClass("hidden");
  });

  // o goes first
  // maybe: next game winner goes first?
  // o is highlighted
  // hover is o shaped over spaces
  // on click square, if empty, square fills with solid o
  // then x's turn...
  // method for playing a turn, pass in x/o

  // alternate playing turns until 3 in a row, or board filled

  // at the end of each turn, check for 3 in a row
  // if winner, end game
  // else next turn

  // if winner, end game = o winner view or x winner view
  // if tie, tie view
  // on click new game button, starts it all over again

}());
