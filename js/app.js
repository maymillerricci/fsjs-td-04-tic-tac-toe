var ticTacToe = (function() {
  "use strict"
 
   var game;

  // on click start button, hide start page and show board
  $("#start-game").on("click", function(e) {
    e.preventDefault();
    $("#start").addClass("hidden");
    $("#board").removeClass("hidden");
    
    // instantiate game object starting with player 1
    game = new Game(1);
  });

  // on click new game button, hide finish page and reset game
  $("#new-game").on("click", function(e) {
    e.preventDefault();
    $("#finish").addClass("hidden");
    $("#board").removeClass("hidden");
    
    game.resetBoard();
    game = new Game(1);
  });

  // game object constructor
  function Game(playerNumber) {
    this.playerNumber = playerNumber;
    $("#player" + this.playerNumber).addClass("active");
    this.winningIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  }

  // fill in square with x/o, switch player, adjust header to show new player's turn
  Game.prototype.playTurn = function(clickedBox) {
    clickedBox.addClass("filled").addClass("box-filled-" + this.playerNumber);
    this.playerNumber = this.switchPlayer();
    game.checkForWin();
    $(".players").removeClass("active");
    $("#player" + this.playerNumber).addClass("active");
  }

  // switch between player 1 and 2
  Game.prototype.switchPlayer = function() {
    if (this.playerNumber === 1) {
      return 2;
    }
    else {
      return 1;
    }
  }

  // reset game board
  Game.prototype.resetBoard = function() {
    $(".players").removeClass("active");
    $(".box").removeClass("filled").removeClass("box-filled-1").removeClass("box-filled-2");
    $("#finish").removeClass("screen-win-one").removeClass("screen-win-two").removeClass("screen-win-tie");
  }

  // determine if o or x has won the game, if so show win screen
  // if all squares filled and no winner, show tie screen
  Game.prototype.checkForWin = function() {
    var xsOs = game.getXsOs();
    var winner = game.check3InARow(xsOs.oIndexes, xsOs.xIndexes)
    
    if (winner === "o") {
      game.finishGame("screen-win-one", "Winner");
    } else if (winner === "x") {
      game.finishGame("screen-win-two", "Winner");
    }

    if (xsOs.oIndexes.length + xsOs.xIndexes.length === 9) {
      game.finishGame("screen-win-tie", "It's a Tie!");
    }
  }

  // return arrays for o and x of the indexes of the boxes they have filled in
  Game.prototype.getXsOs = function() {
    var oIndexes = [];
    var xIndexes = [];
    $(".box").each(function(i) {
      if ($(this).hasClass("box-filled-1")) {
        oIndexes.push(i);
      } else if ($(this).hasClass("box-filled-2")) {
        xIndexes.push(i);
      }
    });
    return {oIndexes: oIndexes, xIndexes: xIndexes};
  }

  // for each set of winning indexes, check if o or x has them all filled in
  Game.prototype.check3InARow = function(oIndexes, xIndexes) {
    for (var i = 0; i < this.winningIndexes.length; i++) {
      if (arrayIsSubset(this.winningIndexes[i], oIndexes)) {
        return "o";
      } else if (arrayIsSubset(this.winningIndexes[i], xIndexes)) {
        return "x";
      }
    }
  }

  // hide board and show finish win/tie screen with passed in css class and message
  Game.prototype.finishGame = function(cssClass, message) {
    $("#board").addClass("hidden");
    $("#finish").removeClass("hidden").addClass(cssClass);
    $(".message").text(message);
  }

  // check if all items in subset array are in larger array 
  function arrayIsSubset(subsetArray, largeArray) {
    return subsetArray.every(function(val) { return largeArray.indexOf(val) >= 0 });
  }

  // show light x/o over square if not filled on hover
  $(".box").on("mouseenter", function() {
    if (!($(this).hasClass("filled"))) {
      $(this).addClass("hover-" + game.playerNumber);
    }
  })

  // remove x/o on stop hovering
  $(".box").on("mouseleave", function() {
    $(this).removeClass("hover-1").removeClass("hover-2");
  })

  // play turn on click a square if not filled
  $(".box").on("click", function() {
    if (!($(this).hasClass("filled"))) {
      game.playTurn($(this));
    }
  });



  // maybe: next game winner goes first?

  // alternate playing turns until 3 in a row, or board filled

  // at the end of each turn, check for 3 in a row
  // if winner, end game
  // else next turn

  // if winner, end game = o winner view or x winner view
  // if tie, tie view
  // on click new game button, starts it all over again

}());
