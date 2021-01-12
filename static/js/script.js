// challenge 1: Your Age in Days

function ageInDay() {
  let godine = prompt("Unesite godinu rodjenja? ");
  let dani = (2020 - godine) * 365;
  let h1 = document.createElement("h1");
  let odgovor = document.createTextNode("Vi ste " + dani + " dana stari!");
  h1.setAttribute("id", "element");
  h1.appendChild(odgovor);
  document.getElementById("flex-box-result").appendChild(h1);
}
function resetDay() {
  document.getElementById("element").remove();
}

//Challenge 2: Cat GENERATOR
function generateCat() {
  let slika = document.createElement("img");
  slika.src = "static/images/giphy.gif";
  slika.setAttribute("id", "slika");
  document.getElementById("flex-result").appendChild(slika);
}
function resetCat() {
  document.getElementById("slika").remove();
}

//Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  console.log(humanChoice);
  botChoice = choiceItem(randomNumber());
  console.log(botChoice);
  result = winnerOfGame(humanChoice, botChoice); //[0,1] izgubljeno [1,0] pobjeda [0.5, 0.5] equals
  console.log(result);
  message = messageWin(result);
  console.log(message);
  rpsFront(humanChoice, botChoice, message);
}

function randomNumber() {
  return Math.floor(Math.random() * 3);
}
function choiceItem(number) {
  return ["rock", "paper", "scissors"][number];
}
function winnerOfGame(humanChoice, botChoice) {
  let dataBaseItem = {
    rock: { rock: 0.5, paper: 0, scissors: 1 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { rock: 0, paper: 1, scissors: 0.5 }
  };
  let yourScore = dataBaseItem[humanChoice][botChoice];
  let botScore = dataBaseItem[botChoice][humanChoice];

  return [yourScore, botScore];
}
function messageWin([yourChoice, computerChoice]) {
  if (yourChoice === 0) {
    return { message: "You Lost! ", color: "red" };
  } else if (yourChoice === 0.5) {
    return { message: "Equals ! ", color: "yellow" };
  } else {
    return { message: "You Win! ", color: "green" };
  }
}

function rpsFront(humanImage, botImage, message) {
  let dataBaseImages = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src
  };

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  let humanDiv = document.createElement("div");
  let messageDiv = document.createElement("div");
  let botDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    dataBaseImages[humanImage] +
    "' width='150' height='150' style='box-shadow: 0px 10px 50px rgba(40, 12, 233, 1);'>";

  messageDiv.innerHTML =
    "<h1 style='color:" +
    message["color"] +
    ";font-size:50px; padding:60px;'>" +
    message["message"] +
    "</h1>";

  botDiv.innerHTML =
    "<img src='" +
    dataBaseImages[botImage] +
    "' width='150' height='150' style='box-shadow: 0px 10px 50px rgba(255, 12, 12, 1);'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

//Challenge 4 Change Color of Buttons

let allButton = document.getElementsByTagName("button");
console.log(allButton);

let copyAllButton = [];
for (let i = 0; i < allButton.length; i++) {
  copyAllButton.push(allButton[i].classList[1]);
}
console.log(copyAllButton);

function btnChangeColor(thisValue) {
  if (thisValue.value === "random") {
    radnomColor();
  } else if (thisValue.value === "red") {
    redColor();
  } else if (thisValue.value === "green") {
    greenColor();
  } else if (thisValue.value === "reset") {
    resetColor();
  }
}

function redColor() {
  for (let i = 0; i < allButton.length; i++) {
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add("btn-danger");
  }
}

function greenColor() {
  for (let i = 0; i < allButton.length; i++) {
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add("btn-success");
  }
}

function radnomColor() {
  for (let i = 0; i < allButton.length; i++) {
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add(choiceColor(Math.floor(Math.random() * 5)));
  }
}

function choiceColor(number) {
  return [
    "btn-danger",
    "btn-success",
    "btn-warning",
    "btn-secondary",
    "btn-primary"
  ][number];
}

function resetColor() {
  for (let i = 0; i < allButton.length; i++) {
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add(copyAllButton[i]);
  }
}

//Challenge 5: Blackjack

let blackjackgame = {
  you: { scoreSpan: "#your-result", div: "#your-blackjack-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-result",
    div: "#dealer-blackjack-box",
    score: 0
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsValue: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11]
  },
  wins: 0,
  loss: 0,
  draw: 0,
  isStand: false,
  turnsOver: false
};

const YOU = blackjackgame["you"];
const DEALER = blackjackgame["dealer"];

document.querySelector("#button-hit").addEventListener("click", blackjackHit);
document.querySelector("#button-deal").addEventListener("click", blackjackDeal);
document
  .querySelector("#button-stand")
  .addEventListener("click", blackjackStand);

const hitAudio = new Audio("static/sounds/swish.m4a");
const winAudio = new Audio("static/sounds/cash.mp3");
const lossAudio = new Audio("static/sounds/aww.mp3");

function blackjackHit() {
  if (blackjackgame["isStand"] === false) {
    let karta = randomCard();
    showCard(YOU, karta);
    updateScore(karta, YOU);
    showScore(YOU);
  }
}

function showCard(activePlayer, cards) {
  if (activePlayer["score"] <= 21) {
    let slika = document.createElement("img");
    slika.src = `static/images/${cards}.png`;
    document.querySelector(activePlayer["div"]).appendChild(slika);
    hitAudio.play();
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackgame["cards"][randomIndex];
}

function blackjackDeal() {
  if (blackjackgame["turnsOver"] === true) {
    blackjackgame["isStand"] = false;

    let yourImage = document
      .querySelector("#your-blackjack-box")
      .querySelectorAll("img");

    let dealerImage = document
      .querySelector("#dealer-blackjack-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImage.length; i++) {
      yourImage[i].remove();
    }

    for (let i = 0; i < dealerImage.length; i++) {
      dealerImage[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-result").textContent = 0;
    document.querySelector("#dealer-result").textContent = 0;

    document.querySelector("#your-result").style.color = "#ffffff";
    document.querySelector("#dealer-result").style.color = "#ffffff";

    document.querySelector("#result-of-game").textContent = "Let's play";
    document.querySelector("#result-of-game").style.color = "black";

    blackjackgame["turnsOver"] = true;
  }
}

function updateScore(cards, activePlayer) {
  if (cards === "A") {
    if (activePlayer["score"] + blackjackgame["cardsValue"][cards][1] <= 21) {
      activePlayer["score"] += blackjackgame["cardsValue"][cards][1];
    } else {
      activePlayer["score"] += blackjackgame["cardsValue"][cards][0];
    }
  } else {
    activePlayer["score"] += blackjackgame["cardsValue"][cards];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
  blackjackgame["isStand"] = true;

  while (DEALER["score"] < 16 && blackjackgame["isStand"] === true) {
    let karta = randomCard();
    showCard(DEALER, karta);
    updateScore(karta, DEALER);
    console.log(DEALER["score"]);
    showScore(DEALER);
    await sleep(1000);
  }
  blackjackgame["turnsOver"] = true;
  let winner = computerWinner();
  showWinner(winner);
}

function computerWinner() {
  let winner;

  if (YOU["score"] <= 21) {
    // Conditional when higer score then dealer on when dealer bust but you are
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      console.log("You won");
      blackjackgame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      console.log("You lost!");
      blackjackgame["loss"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      console.log("You drew!");
      blackjackgame["draw"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    console.log("You lost!");
    blackjackgame["loss"]++;
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    console.log("You drew!");
    blackjackgame["draw"]++;
  }
  console.log("Winner is: ", winner);
  return winner;
}

function showWinner(winner) {
  let message, messageColor;

  if (blackjackgame["turnsOver"] === true) {
    if (winner === YOU) {
      message = "You won!";
      document.querySelector("#wins").textContent = blackjackgame["wins"];
      messageColor = "green";
      winAudio.play();
    } else if (winner === DEALER) {
      message = "You lost!";
      document.querySelector("#lose").textContent = blackjackgame["loss"];
      messageColor = "red";
      lossAudio.play();
    } else {
      document.querySelector("#draws").textContent = blackjackgame["draw"];
      message = "You draw! ";
      messageColor = "black";
    }

    document.querySelector("#result-of-game").textContent = message;
    document.querySelector("#result-of-game").style.color = messageColor;
  }
}
