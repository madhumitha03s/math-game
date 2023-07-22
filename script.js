var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if start/reset button is clicked
document.getElementById("startreset").onclick = function () {
  // if user is playing
  if (playing == true) {
    location.reload(); // reload page
  } else {
    // if user is not playing

    // change mode to playing
    playing = true;

    // hide welcome message
    // hide("welcome");

    // set score to 0
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    // show countdown box
    show("timeremaining");
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    // hide gameover box
    hide("gameOver");

    // change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";

    // start countdown
    startCountdown();

    // generate a new q&a
    generateQA();
  }
};

// clicking the answer boxes
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    // check if user is playing
    if (playing == true) {
      if (this.innerHTML == correctAnswer) {
        // correct answer
        score++;
        document.getElementById("scorevalue").innerHTML = score;

        // hide wrong box and show correct answer
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        // generate new Q&A
        generateQA();
      } else {
        // wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

// start counter
function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      // game over
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>Game Over!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

// stop counter
function stopCountdown() {
  clearInterval(action);
}

// hide an element
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

// show an element
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

// generate questions and multiple answers
function generateQA() {
  var x = Math.round(9 * Math.random()) + 1;
  var y = Math.round(9 * Math.random()) + 1;
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;

  // fill one box with the correct answer
  var correctPosition = Math.round(3 * Math.random()) + 1;
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

  // fill the other boxes with wrong answers
  var answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (Math.round(3 * Math.random()) + 1) *
          (Math.round(3 * Math.random()) + 1);
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
