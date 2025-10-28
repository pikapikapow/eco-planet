const questionbtn1 = document.getElementById("questionbtn1");
const checkBtn = document.getElementById("checkBtn");
const treeContain = document.getElementById("treeContainer");
const treeCounter = document.getElementById("treeCount");
const count = document.getElementById("countCorrect");
const close = document.getElementById("close");
const modal = document.getElementById("modal");
treeCounter.style.display = "none";
let trees = 49;
let counter = 0;
let winSnd = new Audio("./sounds/cheersfx.mp3");
let failSnd = new Audio("./sounds/failsfx.mp3");
let lvl1Snd = new Audio("./sounds/forest.mp3");

let correctAnswer;
let num1;
let num2;
let op;
let pollutionCounter = 0;

window.onload = function () {
  lvl1Snd.play();
};

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width < 768) {
    // mobile layout
    function generatePollution() {
      for (let i = 0; i < 50; i++) {
        const newPollution = document.createElement("div");
        newPollution.style.background = "#8b8b8bb4";
        newPollution.classList.add("pollution");
        newPollution.style.width = "25px";
        newPollution.style.height = "25px";
        newPollution.style.position = "absolute";
        newPollution.style.borderRadius = "50%";
        newPollution.style.border = "1px solid black";
        const containerWidth = window.innerWidth * 1;
        const containerHeight = window.innerHeight * 0.3;
        const randomX = Math.floor(Math.random() * (containerWidth - 25));
        const randomY = Math.floor(Math.random() * (containerHeight - 25));
        newPollution.style.left = randomX + "px";
        newPollution.style.top = randomY + "px";
        pollutionCounter++;

        document.body.appendChild(newPollution);
      }
    }

    generatePollution();

    console.log("Small screen layout");
  } else if (width >= 768 && width < 1024) {
    function generatePollution() {
      // Tablet layout
      for (let i = 0; i < 50; i++) {
        const newPollution = document.createElement("div");
        newPollution.style.background = "#8b8b8bb4";
        newPollution.classList.add("pollution");
        newPollution.style.width = "40px";
        newPollution.style.height = "40px";
        newPollution.style.position = "absolute";
        newPollution.style.borderRadius = "50%";
        newPollution.style.border = "1px solid black";
        const containerWidth = window.innerWidth * 1;
        const containerHeight = window.innerHeight * 0.3;
        const randomX = Math.floor(Math.random() * (containerWidth - 40));
        const randomY = Math.floor(Math.random() * (containerHeight - 40));
        newPollution.style.left = randomX + "px";
        newPollution.style.top = randomY + "px";
        pollutionCounter++;

        document.body.appendChild(newPollution);
      }
    }
    generatePollution();
  } else {
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
  }
}

handleResize();

window.addEventListener("click", handleResize());

console.log(pollutionCounter);

function generateProblem() {
  num1 = Math.floor(Math.random() * 100) + 1;
  num2 = Math.floor(Math.random() * 100) + 1;
  const operators = ["+", "-"];
  op = operators[Math.floor(Math.random() * operators.length)];
  if (op === "-" && num1 > num2) {
    generateProblem();
  }
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
    counter++;
    count.innerHTML = counter;
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
    const modalShow = () => modal.classList.add("show-modal");
    modalShow();
  }
}

questionbtn1.addEventListener("click", () => console.log("test"));
document
  .getElementById("questionbtn1")
  .addEventListener("click", generateProblem);
document.getElementById("checkBtn").addEventListener("click", checkAnswer);

if (close) {
  close.addEventListener("click", () => modal.classList.remove("show-modal"));
}

close.addEventListener("click", function () {
  window.location.href = "/index.html";
});
