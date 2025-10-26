const questionbtn1 = document.getElementById("questionbtn1");
let correctAnswer;

function generateProblem() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "*"];
  const op = operators[Math.floor(Math.random() * operators.length)];

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
  const userAnswer = Number(document.getElementById("answer").value);
  const result = document.getElementById("result");
  if (userAnswer === correctAnswer) {
    result.textContent = `Correct!`;
    result.style.color = "green";
  } else {
    result.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    result.style.color = "red";
  }
}

document
  .getElementById("questionbtn1")
  .addEventListener("click", generateProblem);
document.getElementById("checkBtn").addEventListener("click", checkAnswer);
