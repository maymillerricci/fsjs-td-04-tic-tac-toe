var ticTacToe = (function() {
  "use strict"

  // on click start button, hide start page and show board
  $("#start-game").on("click", function(e) {
    e.preventDefault();
    $("#start").addClass("hidden");
    $("#board").removeClass("hidden");
  });

  // instantiate game object starting with player 1
  var game = new Game(1);

  // game object constructor
  function Game(playerNumber) {
    this.playerNumber = playerNumber;
    $("#player" + this.playerNumber).addClass("active");
  }

  // fill in square with x/o, switch player, adjust header to show new player's turn
  Game.prototype.playTurn = function(clickedBox) {
    clickedBox.addClass("filled").addClass("box-filled-" + this.playerNumber);
    this.playerNumber = this.switchPlayer();
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

  // show light x/o over square if not filled on hover
  $(".box").on("mouseenter", function() {
    if (!($(this).hasClass("filled"))) {
      $(this).addClass("hover-" + game.playerNumber);
    }
  })

  // remove x/o on stop hovering
  $(".box").on("mouseleave", function() {
    $(this).removeClass("hover-" + game.playerNumber);
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
