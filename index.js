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
  { q: "Adisa had very good remarks on his report card", 
    a: ["details", "design", "comment", "ideas"], 
    correct: "comment" 
  },

  { q: "We must work hard in order to surmount our difficulties", 
    a: ["decrease", "overcome", "remove", "meet"], 
    correct: "overcome" 
  },

  { q: "The government gets most of its revenue from tax and custom dues.", 
    a: ["riches", "fees", "income", "support"], 
    correct: "income" 
  },

  { q: "The monitor was told to look into the cause of the confusion in the classroom.", 
    a: ["investigate", "punish", "spy on", "watch"], 
    correct: "investigate" 
  },

  { q: "The workers protested about the cut in their wages", 
    a: ["decrease", "lateness", "amount", "gap"], 
    correct: "decrease" 
  },

  { q: "She found a naira note on the field", 
    a: ["hid", "discovered", "lost", "dropped"], 
    correct: "discovered" 
  },

  { q: "The man asked his wife to buy expensive materials for her dresses", 
    a: ["beautiful", "gay", "costly", "many"], 
    correct: "costly" 
  },

  { q: "Mr Subomi wants to give up his appointment", 
    a: [
      "transfer his appointment to another",
      "resign his appointment",
      "keep the appointment for the son",
      "share his appointment with others"
    ],
    correct: "resign his appointment"
  },

  { q: "I passed my entrance examination ……….. unfortunately, I was not accepted by the university", 
    a: ["and", "because", "for", "but"], 
    correct: "but" 
  },

  { q: "The only witness to the theft was so shocked that he couldn't describe exactly ……..", 
    a: [
      "what the thief looked like",
      "how the thief looked like",
      "that the thief looked like",
      "which the thief looked like"
    ],
    correct: "what the thief looked like"
  },

  { q: "The lady accompanied by her two friends …………", 
    a: ["has arrived", "have arrived", "have been arriving", "is being arrived"], 
    correct: "has arrived" 
  },

  { q: "When one lecturer had an accident last semester I often go to the hospital …………*", 
    a: ["for visit", "to be visiting", "to visit", "visit"], 
    correct: "to visit" 
  },

  { q: "Ade was unhappy after the race …….. he failed to get a medal", 
    a: ["because", "since", "but", "for"], 
    correct: "because" 
  },

  { q: "This is the lady ……. stole my car", 
    a: ["who", "which", "whom", "would have"], 
    correct: "who" 
  },

  { q: "If you were around, I …….. happy", 
    a: ["would be", "would have been", "have been", "was"], 
    correct: "would be" 
  },

  { q: "A was bedridden for a week, Akeem was too ……… to assist", 
    a: ["smart", "gently", "head", "reluctant"], 
    correct: "smart" 
  },

  { q: "While I was gone who ……… here", 
    a: ["came", "comes", "have come", "has come"], 
    correct: "came" 
  },

  { q: "Good children assist their mothers ……….*", 
    a: ["cooked", "to cook", "to be cooking", "in cooking"], 
    correct: "in cooking" 
  },

  { q: "The football team supporters ………. wildly when a goal was scored", 
    a: ["cheered", "groaned", "wept", "shouted"], 
    correct: "cheered" 
  },

  { q: "When the fire alarm came on, we ……….. building", 
    a: ["rushed", "walked", "strolled", "crawled"], 
    correct: "rushed" 
  },

  { q: "The party has …….. the country for a long time", 
    a: ["tormented", "promised", "ruled", "lied"], 
    correct: "ruled" 
  },

  { q: "The father died only ……….. arrived from Russia", 
    a: ["a", "those", "an", "the"], 
    correct: "a" 
  },

  { q: "A long time was expended before Sisi Caro could settle …….. the price", 
    a: ["in", "to", "on", "with"], 
    correct: "on" 
  },

  { q: "When the children heard the ………. of their father’s car, they all ran", 
    a: ["horn", "humming", "sound", "brake"], 
    correct: "horn" 
  },

  { q: "In the lecture hall the lecturer gave the ………….. to the students", 
    a: ["lecture", "dialogue", "warning", "talk"], 
    correct: "lecture" 
  },

  { q: "When the pupils heard the ………. they ran to their classes", 
    a: ["bell", "head master's voice", "sound of rain", "ringing"], 
    correct: "bell" 
  },

  { q: "The priest gave ………. in the church", 
    a: ["dialogue", "counselling", "sermon", "advice"], 
    correct: "sermon" 
  },

  { q: "Olumide is absent …………. the lecture of today", 
    a: ["from", "of", "over", "in"], 
    correct: "from" 
  },

  { q: "The man in black suit should ………. the horse", 
    a: ["mount", "sit", "in", "by"], 
    correct: "mount" 
  },

  { q: "I was asked to share the ……….. among my siblings", 
    a: ["ice cream", "horse", "car", "phone"], 
    correct: "ice cream" 
  },

  { q: "I ………. to Uyo tomorrow", 
    a: ["probably", "shall probably", "have probably gone", "were probably going"], 
    correct: "shall probably" 
  },

  
  { q: "They all agree that John was a fast runner", 
    a: ["cheered", "denied", "said", "shouted"], 
    correct: "denied" 
  },

  { q: "Last year our well was empty", 
    a: ["few", "full", "shallow", "low"], 
    correct: "full" 
  },

  { q: "Solomon did not feel comfortable because the coat was rough", 
    a: ["light", "cheap", "smooth", "delicate"], 
    correct: "smooth" 
  },

  { q: "Olu is a very good friend on..... I can rely", 
    a: ["where", "which", "whom", "who"], 
    correct: "whom" 
  },

  { q: "Thought...... the pencil by now", 
    a: ["to sent", "to be sent", "to have send", "to have sent"], 
    correct: "to have sent" 
  },

  { q: "Janet's fever was so acute that she … an injection", 
    a: ["must have", "ought to have", "had to have", "had"], 
    correct: "had to have" 
  },

  { q: "I know of an elephant... has only three legs", 
    a: ["who", "which", "whom", "of which"], 
    correct: "which" 
  },

  { q: "Yemisi, this is not my keys", 
    a: ["whose", "of which", "who's", "whom"], 
    correct: "whose" 
  },

  { q: "There was no tomatoes in the supermarket … Ronke bought some pepper", 
    a: ["unless", "so", "whereas", "since"], 
    correct: "so" 
  },

  { q: "The security vehicle raced ….. full speed", 
    a: ["on", "with", "at", "in"], 
    correct: "at" 
  },

  { q: "William loves reading love story books to take his mind … his worries", 
    a: ["from", "out", "away", "off"], 
    correct: "off" 
  },

  { q: "They are always quarreling ……….", 
    a: ["themselves", "myself", "one another", "each of them"], 
    correct: "one another" 
  },

  { q: "David couldn't have said a thing like that ……..", 
    a: ["did he?", "could he?", "would he?", "can he?"], 
    correct: "could he?" 
  },

  { q: "If he had known, he wouldn't have come …….*", 
    a: ["wasn't?", "would he?", "couldn't he?", "wouldn't?"], 
    correct: "would he?" 
  },

  { q: "Sack of workers could be the ……… of the workers' protest", 
    a: ["curse", "course", "oparse", "cause"], 
    correct: "cause" 
  },

  { q: "Neither James nor Stella felt happy …….. the incident", 
    a: ["by", "in", "about", "for"], 
    correct: "about" 
  },

  { q: "Anybody would be impressed …….. such impressive performance", 
    a: ["for", "at", "with", "from"], 
    correct: "with" 
  },

  { q: "Morunfolu wanted to show …….. with her necklace", 
    a: ["on", "of", "back", "over"], 
    correct: "of" 
  },

  { q: "Ajose and Emmanuel …….. the work yesterday", 
    a: ["finished", "finish", "shall finish", "would finish"], 
    correct: "finished" 
  },

  { q: "A large number of spectators … at the match", 
    a: ["were been", "were", "was", "have been"], 
    correct: "were" 
  },

  { q: "Tom and his wife ......... killed in an accident", 
    a: ["were", "was", "were been", "had been"], 
    correct: "were" 
  },

  { q: "My mother instructed me that I must ……… before breakfast", 
    a: ["bath", "have my bathe", "take my bath", "bath myself"], 
    correct: "bath" 
  },

  { q: "Take your umbrella because it ......", 
    a: ["is raining", "wanted to rain", "had rained", "was raining"], 
    correct: "is raining" 
  },

  { q: "When I heard the deafening sound I .......... under the bed", 
    a: ["hidden", "had hid", "hid", "am hiding"], 
    correct: "hid" 
  },

  { q: "Babatope wishes he …….. a such man", 
    a: ["am being", "was", "were", "am"], 
    correct: "was" 
  },

  { q: "Janet sat for the examination ……… she had malaria", 
    a: ["while", "since", "though", "why"], 
    correct: "though" 
  },

  { q: "Amina wore a man's hat ………. looked very funny", 
    a: ["that", "who", "which", "whose"], 
    correct: "that" 
  },

  { q: "When Ade came in, he sat on a chair and ……… for a drink", 
    a: ["was asking", "asked", "will ask", "after"], 
    correct: "asked" 
  },

  { q: "Please if you come .......... my brother in town, inform him", 
    a: ["over", "across", "through", "after"], 
    correct: "across" 
  },

  { q: "Charles quickly got a match and struck it on ……… sole of my shoe", 
    a: ["this", "the", "a", "each"], 
    correct: "the" 
  } 
];
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
function startQuiz() {

  playerName = nameInput.value.trim();
  if(playerName == "") {
    showToast("Please enter your name!");
    return;
  }
  else if (playerName.length < 5) {
    showToast("Please enter at least 5 characters");
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
  resultBox.innerHTML = `<div class="name"> 
    <h2>Quiz Completed 👍</h2>
    <p>Your Final Score: <span id="score">${score}</span> / ${questions.length}</p>
    <p>Thanks for playing <span class="name2">${playerName}!</span></p>
    </div>
    `;

  const categoryText = document.createElement("p");
  categoryText.classList.add("category");

  if (score <= 20 ) {
    categoryText.textContent = "Poor 😢 – You need more practice OLODO!";
  } else if (score <= 30) {
    categoryText.textContent = "Fair 🙂 – You can do better READ!";
  } else if (score <= 40) {
    categoryText.textContent = "Good 👍 – Nice effort MORE EFFORT!";
  } else if (score <= 50) {
    categoryText.textContent = "Excellent 🔥 – You really know your stuff BRAINBOX!";
  } else if (score <= 55) {
    categoryText.textContent = "Wow 🎯 – Genius level almost a GURU!";
  }
  else if (score <= 60) {
    categoryText.textContent = "A Guru, take your flower";
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
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] =[questions[j], questions[i]];
  }
}
function restartQuiz() {
  clearInterval(timer);
currentQuestion = 0;
score = 0;
timeLeft = 20;
shuffleQuestions()
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
function showToast(message, type = "success") {
    console.log("Toast call function");
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.innerHTML = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}