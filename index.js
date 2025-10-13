const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const startScreen = document.getElementById("start-screen");
const resultBox = document.getElementById("result-box");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const timerDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const questionCount = document.getElementById("current");
const nameInput = document.getElementById("username");
const playerNameDisplay = document.getElementById("player-name");

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let playerName = "";

const questions = [
  { q: "The principal bent over backwards to admit the student into school. What does this mean?", 
    a: [
      "Tried very hard to admit the student", 
      "Allowed some concession in admitting the students", 
      "Broke the school rules to admit the student", 
      "Admitted the student through the backdoor"
    ], 
    correct: "Tried very hard to admit the student" 
  },

  { q: "The students had hardly come in when the bell rang. What does this mean?", 
    a: [
      "Just after the students came in, the bell rang",
      "The student found it difficult to come in, and then the bell rang",
      "The bell rang while the students were still coming in",
      "None of the options"
    ], 
    correct: "Just after the students came in, the bell rang" 
  },

  { q: "All our plans fell through at the last moment. What does this mean?", 
    a: ["Were successful", "Were abandoned", "Failed", "Were exposed"], 
    correct: "Failed" 
  },

  { q: "After his prison experience, Etim decided to go straight. What does this mean?", 
    a: [
      "Hold his head up and walk with defiance",
      "Change his religion",
      "Live an honest life",
      "Stop using drugs"
    ], 
    correct: "Live an honest life" 
  },

  { q: "They did not know what to expect and so decided to play it ear by ear. What does this mean?", 
    a: [
      "Listen attentively to everyone",
      "Act according to circumstances",
      "Pretend to be deaf",
      "Be played with them"
    ], 
    correct: "Act according to circumstances" 
  },

  { q: "Don't believe all _____ he has told you.", 
    a: ["What", "Which", "That", "There"], 
    correct: "That" 
  },

  { q: "He succeeded _____ the odds he faced.", 
    a: ["After", "Despite", "Even on", "In addition to"], 
    correct: "Despite" 
  },

  { q: "If I had known that he was going _____ him the book.", 
    a: ["I should have given", "I have given", "I will have given", "I would have given"], 
    correct: "I would have given" 
  },

  { q: "During the surgery, the doctor realised that the patient's legs _____.", 
    a: ["Had been decayed", "Have long decayed", "Had long decayed", "None of the options"], 
    correct: "Had long decayed" 
  },

  { q: "_____ guests enjoyed themselves at Joy's birthday party.", 
    a: ["All of the", "All the", "Every of the", "The whole"], 
    correct: "All the" 
  },

  { q: "For the management, your remarks amount to a slap _____ the face.", 
    a: ["On", "Upon", "At", "In"], 
    correct: "In" 
  },

  { q: "The chairman told members he was open _____ suggestions.", 
    a: ["On", "About", "To", "For"], 
    correct: "To" 
  },

  { q: "The portion is to be shared between _____.", 
    a: ["Us and them", "We and them", "Us and they", "We and they"], 
    correct: "Us and them" 
  },

  { q: "If found guilty he will _____ all the wealth he amassed illegally.", 
    a: ["Forgo", "Abandon", "Repay", "Forfeit"], 
    correct: "Forfeit" 
  },

  { q: "To _____ Nigerians, corruption in high places is not strange.", 
    a: ["We", "Us", "Ours", "Ourselves"], 
    correct: "Us" 
  },

  { q: "The man as well as his sons _____ in the band.", 
    a: ["Plays", "Play", "Are playing", "Played"], 
    correct: "Plays" 
  },

  { q: "_____ escalating food prices, government seems to have no solution.", 
    a: ["As regards", "With regards to", "As regard", "The regard to"], 
    correct: "As regards" 
  },

  { q: "The poor _____ our attention and kindness.", 
    a: ["Deserves", "Does deserve", "Do deserve", "Deserve"], 
    correct: "Deserve" 
  },

  { q: "The conference turned out to be an enlightening _____ experience.", 
    a: ["Five-days", "Five-day", "Five-day's", "Five days"], 
    correct: "Five-day" 
  },

  { q: "My _____ to you student is to be good.", 
    a: ["Advise", "Advice", "Adverse", "Advance"], 
    correct: "Advice" 
  },

  { q: "People are afraid of Mr. Niyi because he is _____.", 
    a: ["An army", "A soldier", "An army man", "Military"], 
    correct: "A soldier" 
  },

  { q: "I cannot concentrate, here is too much _____.",
    a: ["Detraction", "Distraction", "People", "Sound"],
    correct: "Distraction"
  },
  
   { q: "Bus ____ are going to increase. So, comuters are worried.",
    a: ["Fees", "Rates", "Bill", "Fares"],
    correct: "Fares"
  },

   { q: "Chinese ____ met foreign office officials in London.",
    a: ["Console", "Counsel", "Councel", "Consul"],
    correct: "Consul"
  },

   { q: "His belief that he could do this, is his ____ .",
    a: ["Allusion", "Illusion", "Delusion", "Depict"],
    correct: "Delusion"
  },
];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
function startQuiz() {

  playerName = nameInput.value.trim();
  if(playerName == "") {
    alert("Please enter your name!");
    return;
  }
  else if (playerName.length < 5) {
    alert("Please enter at least 5 characters");
    return;
  }
  startScreen.classList.add("hide");
  quizBox.classList.remove("hide");
  currentQuestion = 0;
  score = 0;
  timeLeft = 20;
  showQuestion();
  startTimer();

}
function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.q;
  optionsContainer.innerHTML = "";
  questionCount.textContent = currentQuestion + 1;
  
  q.a.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.onclick = () => selectAnswer(btn, q.correct);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(btn, correct) {
  clearInterval(timer);
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => opt.disabled = true);
  if (btn.textContent === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    allOptions.forEach(opt => {
      if (opt.textContent === correct) opt.classList.add("correct");
    });
  }
  nextBtn.classList.remove("hide");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    nextBtn.classList.add("hide");
    timeLeft = 20;
    showQuestion();
    startTimer();
  } else {
    showResult();
  }
}

function startTimer() {
  timerDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  scoreDisplay.textContent = score;
  playerNameDisplay.textContent = playerName;
  // Reset the entire resultBox content (except fixed elements like score title if any)
  resultBox.innerHTML = ` 
    <h2>Quiz Completed 👍</h2>
    <p>Your Final Score: <span id="score">${score}</span> / ${questions.length}</p>
    <p>Thanks for playing!</p>
    `;

  const categoryText = document.createElement("p");
  categoryText.classList.add("category");

  if (score <= 10) {
    categoryText.textContent = "Poor 😢 – You need more practice!";
  } else if (score <= 15) {
    categoryText.textContent = "Fair 🙂 – You can do better!";
  } else if (score <= 20) {
    categoryText.textContent = "Good 👍 – Nice effort!";
  } else if (score <= 24) {
    categoryText.textContent = "Excellent 🔥 – You really know your stuff!";
  } else if (score === 25) {
    categoryText.textContent = "Wow 🎯 – Genius level!";
  }

  resultBox.appendChild(categoryText);

  //add play again button
  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Try Again";
  playAgainBtn.style.marginTop = "1em";
  playAgainBtn.style.backgroundColor = "white";
  playAgainBtn.style.color = "black";
  playAgainBtn.classList.add("retry-btn");
  playAgainBtn.addEventListener("click", restartQuiz);
  resultBox.appendChild(playAgainBtn);

}
function restartQuiz() {
  clearInterval(timer);
currentQuestion = 0;
score = 0;
timeLeft = 20;
startBtn.classList.add("hide");
resultBox.classList.add("hide");
quizBox.classList.remove("hide");
nextBtn.classList.add("hide");
startQuiz();
}
/*resultBox.classList.add("hide");
quizBox.classList.remove("hide");
//to reset values
currentQuestion = 0;
score = 0;
clearInterval(timer);

scoreDisplay.textContent = score;
//start quiz again 
loadQuestion();
startTimer();
*/