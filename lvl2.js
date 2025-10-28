const questionbtn1 = document.getElementById("questionbtn1");
const checkBtn = document.getElementById("checkBtn");
const fishContain = document.getElementById("fishContainer");
const fishCounter = document.getElementById("fishCount");
const count = document.getElementById("countCorrect1");
const close = document.getElementById("close2");
const modal = document.getElementById("modal2");
fishCounter.style.display = "none";
let counter = 0;
let fish = 58;
let lvl2Snd = new Audio("./sounds/ocean.mp3");
let winSnd = new Audio("./sounds/cheersfx.mp3");
let failSnd = new Audio("./sounds/failsfx.mp3");
let correctAnswer;
let num1;
let num2;
let op;
let completeCheck = true;

window.onload = function () {
  lvl2Snd.play();
};

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width < 768) {
    // mobile layout

    function generateTrashOcean() {
      for (let i = 0; i < 60; i++) {
        const newTrash = document.createElement("i");
        newTrash.classList.add("fa", "fa-solid", "fa-bottle-water");
        newTrash.style.color = "#555555";
        newTrash.style.fontSize = "20px";
        newTrash.style.position = "absolute";
        const containerWidth = window.innerWidth * 1;
        const containerHeight = window.innerHeight * 0.3;
        const randomX = Math.floor(Math.random() * (containerWidth - 20));
        const randomY = Math.floor(Math.random() * (containerHeight - 20));
        newTrash.style.left = randomX + "px";
        newTrash.style.bottom = randomY + 120 + "px";
        document.body.appendChild(newTrash);
      }
    }
    generateTrashOcean();
    console.log("Small screen layout");
  } else if (width >= 768 && width < 1024) {
    // tablet layout
    function generateTrashOcean() {
      for (let i = 0; i < 60; i++) {
        const newTrash = document.createElement("i");
        newTrash.classList.add("fa", "fa-solid", "fa-bottle-water");
        newTrash.style.color = "#555555";
        newTrash.style.fontSize = "25px";
        newTrash.style.position = "absolute";
        const containerWidth = window.innerWidth * 1;
        const containerHeight = window.innerHeight * 0.3;
        const randomX = Math.floor(Math.random() * (containerWidth - 25));
        const randomY = Math.floor(Math.random() * (containerHeight - 25));
        newTrash.style.left = randomX + "px";
        newTrash.style.bottom = randomY + 120 + "px";
        document.body.appendChild(newTrash);
      }
    }
    generateTrashOcean();
  } else {
    // Desktop layout
    function generateTrashOcean() {
      for (let i = 0; i < 60; i++) {
        const newTrash = document.createElement("i");
        newTrash.classList.add("fa", "fa-solid", "fa-bottle-water");
        newTrash.style.color = "#555555";
        newTrash.style.fontSize = "30px";
        newTrash.style.position = "absolute";
        const containerWidth = window.innerWidth * 0.8;
        const containerHeight = window.innerHeight * 0.3;
        const randomX = Math.floor(Math.random() * (containerWidth - 30));
        const randomY = Math.floor(Math.random() * (containerHeight - 30));
        newTrash.style.left = randomX + "px";
        newTrash.style.bottom = randomY + "px";
        document.body.appendChild(newTrash);
      }
    }
    generateTrashOcean();
  }
}

handleResize();

window.addEventListener("click", handleResize());

function generateProblem() {
  if (completeCheck === true) {
    num1 = Math.floor(Math.random() * 100) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
    const operators = ["+", "-", "*", "/"];
    op = operators[Math.floor(Math.random() * operators.length)];
    if (num1 > num2) {
      generateProblem();
    }

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
  const trash = document.querySelectorAll(".fa-bottle-water");

  console.log(trash);

  if (userAnswer === correctAnswer) {
    result.textContent = `Correct!`;
    winSnd.play();
    counter++;
    count.innerHTML = counter;
    const randomTrash = Math.floor(Math.random() * trash.length);
    let trashToDelete = trash[randomTrash];
    if (trash.length === 0) {
      alert("Congrats! All the trash has disappeared!");
    } else {
      trashToDelete.style.color = "red";
      setTimeout(() => {
        trashToDelete.remove();
      }, 1000);
    }
    const newFish = document.createElement("i");
    newFish.classList.add("fa", "fa-solid", "fa-fish");
    newFish.style.fontSize = "50px";
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let rgbColorString = `rgb(${r}, ${g}, ${b})`;
    newFish.style.color = rgbColorString;
    newFish.style.position = "absolute";
    const containerWidth = window.innerWidth * 0.8;
    const containerHeight = window.innerHeight * 0.7;
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
  if (fish >= 60) {
    const modalShow = () => modal.classList.add("show-modal");
    modalShow();
  }
}

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
