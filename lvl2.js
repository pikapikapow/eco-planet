const questionbtn1 = document.getElementById("questionbtn1");
const checkBtn = document.getElementById("checkBtn");
const fishContain = document.getElementById("fishContainer");
const fishCounter = document.getElementById("fishCount");
fishCounter.style.display = "none";
let fish = 0;
let winSnd = new Audio("./sounds/cheersfx.mp3");
let failSnd = new Audio("./sounds/failsfx.mp3");
let correctAnswer;
let num1;
let num2;
let op;
let completeCheck = true;

function generateTrash() {
  newFish.classList.add("fa", "fa-solid", "fa-fish");
  newFish.style.fontSize = "70px";
  newFish.style.color = "#ff9900ff";
}

function generateProblem() {
  if (completeCheck === true) {
    num1 = Math.floor(Math.random() * 100) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
    const operators = ["+", "-", "*", "/", "/"];
    op = operators[Math.floor(Math.random() * operators.length)];
    checkBtn.style.display = "block";
    if (op === "+") correctAnswer = num1 + num2;
    else if (op === "-") correctAnswer = num1 - num2;
    else if (op === "*") correctAnswer = num1 * num2;
    else if (op === "/") {
      if (num1 % num2 != 0) {
        generateProblem();
      } else {
        correctAnswer = num1 / num2;
      }
    }

    document.getElementById(
      "questionbtn1"
    ).textContent = `${num1} ${op} ${num2} = ?`;
    document.getElementById("result").textContent = "";
    document.getElementById("answer").value = "";
    completeCheck = false;
  }
}

function checkAnswer() {
  checkBtn.style.display = "none";
  const userAnswer = Number(document.getElementById("answer").value);
  const result = document.getElementById("result");
  if (userAnswer === correctAnswer) {
    result.textContent = `Correct!`;
    winSnd.play();
    const newFish = document.createElement("i");
    newFish.classList.add("fa", "fa-solid", "fa-fish");
    newFish.style.fontSize = "70px";
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let rgbColorString = `rgb(${r}, ${g}, ${b})`;
    newFish.style.color = rgbColorString;
    newFish.style.position = "absolute";
    const containerWidth = window.innerWidth * 0.8;
    const containerHeight = window.innerHeight * 0.9;
    const randomX = Math.floor(Math.random() * (containerWidth - 70));
    const randomY = Math.floor(Math.random() * (containerHeight - 70));
    newFish.style.left = randomX + "px";
    newFish.style.top = randomY + "px";
    document.body.appendChild(newFish);
    fish++;
    questionbtn1.innerHTML = `Next?`;
    completeCheck = true;
  } else {
    result.innerHTML = `Incorrect. <br> ${num1} ${op} ${num2} equals ${correctAnswer}.`;
    failSnd.play();
    questionbtn1.innerHTML = `Next?`;
    completeCheck = true;
  }
  fishCounter.style.display = "block";
  if (fish === 1) {
    fishCounter.innerHTML = `You have bred your first fish!`;
  } else {
    fishCounter.innerHTML = `Woah! You have bred ${fish} fish!`;
  }
  if (fish >= 100) {
    window.alert(
      "You have beaten this level! You can choose to go on, or do the next level!"
    );
  }
}

document
  .getElementById("questionbtn1")
  .addEventListener("click", generateProblem);
document.getElementById("checkBtn").addEventListener("click", checkAnswer);
