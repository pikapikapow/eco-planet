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
  if (userAnswer === correctAnswer) {
    result.textContent = `Correct!`;
    winSnd.play();
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
}

document
  .getElementById("questionbtn1")
  .addEventListener("click", generateProblem);
document.getElementById("checkBtn").addEventListener("click", checkAnswer);
