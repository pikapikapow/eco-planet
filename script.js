const questionbtn1 = document.getElementById("questionbtn1");
const checkBtn = document.getElementById("checkBtn");
let winSnd = new Audio("./sounds/cheersfx.mp3");
let failSnd = new Audio("./sounds/failsfx.mp3");
let correctAnswer;

function generateProblem() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "*"];
  const op = operators[Math.floor(Math.random() * operators.length)];
  checkBtn.style.display = "block";
  if (op === "+") correctAnswer = num1 + num2;
  else if (op === "-") correctAnswer = num1 - num2;
  else if (op === "*") correctAnswer = num1 * num2;

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
  } else {
    result.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    failSnd.play();
  }
}

document
  .getElementById("questionbtn1")
  .addEventListener("click", generateProblem);
document.getElementById("checkBtn").addEventListener("click", checkAnswer);
