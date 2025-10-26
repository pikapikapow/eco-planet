const questionbtn1 = document.getElementById("questionbtn1");
const checkBtn = document.getElementById("checkBtn");
const treeContain = document.getElementById("treeContainer");
const treeCounter = document.getElementById("treeCount");
treeCounter.style.display = "none";
let trees = 0;
let winSnd = new Audio("./sounds/cheersfx.mp3");
let failSnd = new Audio("./sounds/failsfx.mp3");
let correctAnswer;
let num1;
let num2;
let op;
let pollutionCounter = 0;

function generatePollution() {
  for (let i = 0; i < 50; i++) {
    const newPollution = document.createElement("div");
    newPollution.style.background = "#8b8b8bb4";
    newPollution.classList.add("pollution");
    newPollution.style.width = "70px";
    newPollution.style.height = "70px";
    newPollution.style.position = "absolute";
    newPollution.style.borderRadius = "50%";
    newPollution.style.border = "1px solid black";
    const containerWidth = window.innerWidth * 0.8;
    const containerHeight = window.innerHeight * 0.3;
    const randomX = Math.floor(Math.random() * (containerWidth - 70));
    const randomY = Math.floor(Math.random() * (containerHeight - 70));
    newPollution.style.left = randomX + "px";
    newPollution.style.top = randomY + "px";
    pollutionCounter++;

    document.body.appendChild(newPollution);
  }
}

generatePollution();
console.log(pollutionCounter);

function generateProblem() {
  num1 = Math.floor(Math.random() * 100) + 1;
  num2 = Math.floor(Math.random() * 100) + 1;
  const operators = ["+", "-"];
  op = operators[Math.floor(Math.random() * operators.length)];
  checkBtn.style.display = "block";
  if (op === "+") correctAnswer = num1 + num2;
  else if (op === "-") correctAnswer = num1 - num2;

  document.getElementById(
    "questionbtn1"
  ).textContent = `${num1} ${op} ${num2} = ?`;
  document.getElementById("result").textContent = "";
  document.getElementById("answer").value = "";
}

function checkAnswer() {
  checkBtn.style.display = "none";
  const userAnswer = Number(document.getElementById("answer").value);
  const result = document.getElementById("result");
  const pollution = document.querySelectorAll(".pollution");

  if (userAnswer === correctAnswer) {
    result.textContent = `Correct!`;
    winSnd.play();
    let randomPollution = Math.floor(Math.random() * pollutionCounter);
    let pollutionToDelete = pollution[randomPollution];
    if (pollution.length === 0) {
      alert("Congrats! All the pollution has disappeared!");
    } else {
      pollutionToDelete.style.background = "red";
      setTimeout(() => {
        pollutionToDelete.remove();
        pollutionCounter -= 1;
        console.log(pollutionCounter);
      }, 1000);
    }
    const newTree = document.createElement("i");
    newTree.classList.add("fa", "fa-solid", "fa-tree");
    newTree.style.fontSize = "40px";
    newTree.style.color = "#0b5232ff";
    treeContain.appendChild(newTree);
    trees++;
    questionbtn1.innerHTML = `Next?`;
  } else {
    result.innerHTML = `Incorrect. <br> ${num1} ${op} ${num2} equals ${correctAnswer}.`;
    failSnd.play();
    questionbtn1.innerHTML = `Next?`;
  }
  treeCounter.style.display = "block";
  if (trees === 1) {
    treeCounter.innerHTML = `You have planted your first tree!`;
  } else {
    treeCounter.innerHTML = `Woah! You have planted ${trees} trees!`;
  }
  if (trees >= 50) {
    alert(
      "You have beaten this level! You can choose to go on, or do the next level!"
    );
  }
}

document
  .getElementById("questionbtn1")
  .addEventListener("click", generateProblem);
document.getElementById("checkBtn").addEventListener("click", checkAnswer);
