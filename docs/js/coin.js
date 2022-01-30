$(document).ready(function () {
  function spinCoin(result) {
    console.log("TESTE");
    coin.style.animation = "none";
    if (result == "1.00") {
      setTimeout(function () {
        coin.style.animation = "spin-heads 3s forwards";
        setTimeout(() => {
          coin.setAttribute("data-spin", "heads");
          coin.style.animation = "rotate3d 12s ease-in-out infinite";
        }, 3500);
      }, 100);
    } else {
      setTimeout(function () {
        coin.style.animation = "spin-tails 3s forwards";
        setTimeout(() => {
          coin.setAttribute("data-spin", "tails");
          coin.style.animation = "rotate3d 12s ease-in-out infinite";
        }, 3500);
      }, 100);
    }

    //add code to clear current bets list
    $("#headsButton").prop("disabled", false);
    $("#tailsButton").prop("disabled", false);
  }

  //progress bar time
  function updatePendingTime(correctTime) {
    var styleStr = $("#progressElem").attr("style");
    var currentPercent =
      parseFloat(styleStr.substring(7, styleStr.length - 2)) - 0.1;

    var barWidth = correctTime * 10;

    if (currentPercent > barWidth || correctTime == 10) {
      $("#progressElem").attr("style", `width: ${barWidth}%;`);
    }

    if (correctTime >= 10) {
      $("#timeCounter").html(`00:${correctTime}`);
    } else if (correctTime >= 0) {
      $("#timeCounter").html(`00:0${correctTime}`);
    }
  }

  // setInterval(function () {
  //   var styleStr = $("#progressElem").attr("style");
  //   var currentPercent =
  //     parseFloat(styleStr.substring(7, styleStr.length - 2)) - 0.1;
  //   if (currentPercent >= 0 && gameState == "wait") {
  //     $("#progressElem").attr("style", `width: ${currentPercent}%;`);
  //   }
  // }, 10);

  // //function add new bettor to list
  // function addNewBettor(betType, userName, betValue) {
  //   var parent = $("<div>", {
  //     class:
  //       "d-flex flex-row justify-content-between bd-highlight mb-3 bg-grey-opaque",
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

  //   if (betType == "1.00") {
  //     parent.appendTo("#headsBetList");
  //     $("#headsNumberBets").html(parseInt($("#headsNumberBets").html()) + 1);
  //   } else {
  //     parent.appendTo("#tailsBetList");
  //     $("#tailsNumberBets").html(parseInt($("#tailsNumberBets").html()) + 1);
  //   }
  // }

  // function eraseAllBettors() {
  //   $("#headsNumberBets").html(0);
  //   $("#tailsNumberBets").html(0);
  //   $("#headsBetList").empty();
  //   $("#tailsBetList").empty();
  // }

  // //Socket Coin Game
  // var endPoint =
  //   window.location.protocol + "//" + window.location.hostname + ":8000";
  // //var endPoint = window.location.protocol + "//" + window.location.hostname;
  // const socketCoin = io.connect(endPoint + "/coin");

  // var gameState = "";
  // socketCoin.on("gamePing", function (msg) {
  //   if (msg.moment == "final" && gameState != "over") {
  //     updatePendingTime(10);
  //     spinCoin(msg.meta.round_result);
  //     gameState = "over";
  //     setTimeout(eraseAllBettors, 3000);
  //   } else if (msg.moment == "final" && gameState == "over") {
  //     $("#gameId").attr("content", msg.meta.next_game_id);
  //   } else if (msg.moment == "wait") {
  //     $("#gameId").attr("content", msg.meta.gameId);
  //     gameState = "wait";
  //     updatePendingTime(Math.floor(msg.meta.secs_to_go) - 1);
  //   }
  //   $("#currentGameNonce").text("#" + msg.meta.nonce);
  //   console.log(msg);
  // });

  // socketCoin.on("getBettors", function (msg) {
  //   eraseAllBettors();
  //   msg.bets.forEach((element) => {
  //     addNewBettor(
  //       (betType = element.choice),
  //       (userName = element.user),
  //       (betValue = element.value)
  //     );
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
  //     currency: "MockCoin",
  //     value: parseInt($("#betValueSelect").val()),
  //     gameId: $("#gameId").attr("content"),
  //     choice: betChoice,
  //   };
  //   socketCoin.emit("placeBet", messageData);
  // }

  // $("#headsButton").on("click", function () {
  //   $("#headsButton").prop("disabled", true);
  //   $("#tailsButton").prop("disabled", true);
  //   placeCoinBet(1.0);
  //   $("#betValueSelect").val("");
  // });

  // $("#tailsButton").on("click", function () {
  //   $("#headsButton").prop("disabled", true);
  //   $("#tailsButton").prop("disabled", true);
  //   placeCoinBet(0.0);
  //   $("#betValueSelect").val("");
  // });
});
