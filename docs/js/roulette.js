const ANIMATION_TIME = 5000;
const LIST_NUMBER = 15;
const ITEM_WIDTH = 82.5;

document.addEventListener("DOMContentLoaded", function(event) {
  for (i = 0; i < 3; i++) {
    $(".roulette-list li").clone().appendTo(".roulette-list");
  }

  $("#login_but").click(() => {
    const sortedNumber = Math.floor(Math.random() * LIST_NUMBER) + 1;
    handleRoulette(sortedNumber);
  });
});

function handleRoulette(sortedIndex) {
  $(".window").css({
    right: "0",
  });

  const LIST_WIDTH = document.getElementById("wraper").clientWidth;

  const x = sortedIndex + LIST_NUMBER * 6;

  $(".window").animate(
    {
      right: x * ITEM_WIDTH - ITEM_WIDTH / 2 - LIST_WIDTH / 2,
    },
    ANIMATION_TIME
  );

  setTimeout(() => {
    const choosen_li = document.querySelector(".roulette-list").children[x - 1];

    choosen_li.style.animation = "none";
    setTimeout(() => {
      choosen_li.style.animation = "choosen 2s";
    }, 1000);
  }, ANIMATION_TIME + 100);
}
