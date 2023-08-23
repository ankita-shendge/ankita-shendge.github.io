// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "correct number";

// document.querySelector(".guess").value = 12;

// document.querySelector(".message").textContent =
//   document.querySelector(".guess").value;

// document.querySelector(".number").textContent =
//   document.querySelector(".guess").value;

// console.log(document.querySelector(".message").textContent);
// console.log(document.querySelector(".message").value);

// console.log(document.querySelector(".message").value);

let number = Math.trunc(Math.random() * 20 + 1);
console.log(number);

let score = 20;
let highScore = 0;

document.querySelector(".check").addEventListener("click", function () {
  let guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    document.querySelector(".message").textContent = "no number";
  } else if (guess == number) {
    document.querySelector(".message").textContent = "correct number";
    document.querySelector(".score").textContent = score;
    // highScore++;
    // document.querySelector(".highscore").textContent = highScore;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = score;
    }

    document.querySelector("body").style.background = "green";
  } else if (guess > number) {
    if (score <= 0) {
      document.querySelector(".message").textContent = "you lost the game";
    } else {
      document.querySelector(".message").textContent = "too high";
      score--;
      document.querySelector(".score").textContent = score;
    }
  } else if (guess < number) {
    if (score <= 0) {
      document.querySelector(".message").textContent = "you lost the game";
    } else {
      document.querySelector(".message").textContent = "too low";
      score--;
      document.querySelector(".score").textContent = score;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  number = Math.trunc(Math.random() * 20 + 1);
  document.querySelector(".message").textContent = "start guessing...";
  document.querySelector(".score").textContent = 20;
  document.querySelector("body").style.background = "black";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
});
