const objs = ["paper", "scissors", "rock"];
let counter = 0;
let itsADraw = false;

function houseRandomPick () {
  return objs[Math.floor(Math.random()*3)];
}

function whoWins(yourPick, housePick) {
  if (yourPick === housePick) {
    itsADraw = true;
  } else {
    return {
      "rock_paper":  false,
      "rock_scissors": true,
      "scissors_rock": false,
      "scissors_paper": true,
      "paper_rock": true,
      "paper_scissors": false,
    }
  }
}

// Rules button
$("#rules").click(function () {
  $(".game-rules").css("display", "block");
});

$("#close-rules").click(function (){
  $(".game-rules").css("display", "none");
});

$(".obj-img").click(function(event) {
  // your  pick
  picked = event.target.alt;
  $(".images").css("display", "none");
  $("#your-choice").addClass("circle "+picked+"-picked");
  $("#your-choice").prepend($('<img>', {class:"obj-img", src:"./images/icon-"+picked+".svg", alt:picked}));
  $("#your-choice img").attr("src", "./images/icon-"+picked+".svg");
  $("#your-choice img").attr("alt", picked);
  // house pick
  houseChoice = houseRandomPick();
  setTimeout(function() {
    $("#house-choice").removeClass("circle-tmp");
    $("#house-choice").addClass("circle");
    $("#house-choice").addClass("house-"+houseChoice+"-picked");
    $("#house-choice").prepend($('<img>', {class:"obj-img", src:"./images/icon-"+houseChoice+".svg", alt:houseChoice}));
  }, 200)
  $(".picked").css("display", "block");

  let victory = whoWins(picked, houseChoice);


  if (!itsADraw) {
    let youWin = victory[picked+"_"+houseChoice];
    if (youWin) {
      $(".play-again").prepend("<h1> YOU WIN </h1>");
      counter ++;
    } else {
      $(".play-again").prepend("<h1> YOU LOSE </h1>");
      //counter --;
    }
  } else {
    $(".play-again").prepend("<h1> IT'S A DRAW </h1>");
  }
  setTimeout(function() {
    $("#house").css("bottom", "12.9rem");
    $(".house-picked").css("bottom", "10.9rem");
    $(".play-again").css("display", "block");
    $("#score").html(counter);
  }, 200)
});

// resetting everything after play again button gets clicked
$("#play-again-button").click(function() {
  $("#your-choice").empty();
  $("#house-choice").empty();
  $(".play-again h1").remove();
  $("#your-choice").removeClass("circle "+picked+"-picked");
  $("#house-choice").removeClass("circle");
  $("#house-choice").removeClass("house-"+houseChoice+"-picked");
  $("#house-choice").addClass("circle-tmp");
  $("#house").css("bottom", "7rem");
  $(".house-picked").css("bottom", "5rem");
  $(".images").css("display", "block");
  $(".picked").css("display", "none");
  $(".play-again").css("display", "none");
  itsADraw = false;
});
