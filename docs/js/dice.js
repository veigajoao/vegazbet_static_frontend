$(document).ready(function () {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // document.getElementById("btn-dice").addEventListener("click", () => rollDice(getRandomInt(1, 6)));

  function rollDice(result) {
    const dice = [...document.querySelectorAll(".die-list")];
    document.getElementById("dice").style.animation = "none";
    setTimeout(() => {
      document.getElementById("dice").style.animation = "roll 2s cubic-bezier(0.785, 0.135, 0.15, 0.86)";
    }, 200);

    dice.forEach((die) => {
      die.classList.toggle("odd-roll");
      // die.classList.toggle("even-roll");
      die.dataset.roll = result;
    });

    // document.getElementById("btn-dice").click();

    //add code to clear current bets list
    $("#highButton").prop("disabled", false);
    $("#lowButton").prop("disabled", false);
  }

  // //function add new bettor to list
  // function addNewBettor(betType, userName, betValue) {
  //   var parent = $("<div>", {
  //     class: "d-flex flex-row justify-content-between bd-highlight mb-3 bg-grey-opaque",
  //   });
  //   $("<div>", {
  //     class: "p-2 bd-highlight",
  //     text: "Symbol",
  //   }).appendTo(parent);
  //   $("<div>", {
  //     class: "p-2 bd-highlight",
  //     text: userName,
  //   }).appendTo(parent);
  //   $("<div>", {
  //     class: "p-2 bd-highlight",
  //     text: betValue,
  //   }).appendTo(parent);

  //   if (betType > 3) {
  //     parent.appendTo("#highBetList");
  //     $("#highNumberBets").html(parseInt($("#highNumberBets").html()) + 1);
  //   } else {
  //     parent.appendTo("#tailsBetList");
  //     $("#lowNumberBets").html(parseInt($("#lowNumberBets").html()) + 1);
  //   }
  // }

  // function eraseAllBettors() {
  //   $("#highNumberBets").html(0);
  //   $("#lowNumberBets").html(0);
  //   $("#highBetList").empty();
  //   $("#lowBetList").empty();
  // }

  // //Socket Coin Game
  // var endPoint = window.location.protocol + "//" + window.location.hostname;
  // //var endPoint = window.location.protocol + "//" + window.location.hostname + ":8000";
  // const socketCoin = io.connect(endPoint + "/dice");

  // var gameState = "";
  // socketCoin.on("gamePing", function (msg) {
  //   if (msg.moment == "final" && gameState != "over") {
  //     updatePendingTime(10);
  //     rollDice(parseInt(msg.meta.round_result));
  //     gameState = "over";
  //     setTimeout(eraseAllBettors, 3000);
  //   } else if (msg.moment == "final" && gameState == "over") {
  //     $("#gameId").attr("content", msg.meta.next_game_id);
  //   } else if (msg.moment == "wait") {
  //     $("#gameId").attr("content", msg.meta.gameId);
  //     gameState = "wait";
  //     updatePendingTime(Math.floor(msg.meta.secs_to_go));
  //   }
  //   $("#currentGameNonce").text("#" + msg.meta.nonce);
  // });

  // socketCoin.on("getBettors", function (msg) {
  //   eraseAllBettors();
  //   msg.bets.forEach((element) => {
  //     addNewBettor((betType = element.choice), (userName = element.user), (betValue = element.value));
  //   });
  // });

  // socketCoin.on("placeBet", function (msg) {
  //   if (msg.status) {
  //     checkUserBalance();
  //   } else {
  //     alert("Error - invalid request");
  //     $("#headsButton").prop("disabled", false);
  //     $("#tailsButton").prop("disabled", false);
  //   }
  //   socketCoin.emit("getBettors");
  // });

  // socketCoin.on("ticketsProcessed", function (msg) {
  //   setTimeout(checkUserBalance, 2500);
  // });

  // // function to bet
  // function placeCoinBet(betChoice) {
  //   var messageData = {
  //     value: parseInt($("#betValueSelect").val()),
  //     gameId: $("#gameId").attr("content"),
  //     choice: betChoice,
  //   };
  //   socketCoin.emit("placeBet", messageData);
  // }

  // $("#highButton").on("click", function () {
  //   $("#highButton").prop("disabled", true);
  //   $("#lowButton").prop("disabled", true);
  //   placeCoinBet(5.0);
  //   $("#betValueSelect").val("");
  // });

  // $("#lowButton").on("click", function () {
  //   $("#highButton").prop("disabled", true);
  //   $("#lowButton").prop("disabled", true);
  //   placeCoinBet(1.0);
  //   $("#betValueSelect").val("");
  // });
});
