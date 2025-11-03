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
  {
    q: "Socialism developed as a protest against the evils of",
    a: ["Feudalism", "Capitalism", "Fascism", "Oligarchy"],
    correct: "Capitalism",
  },
  {
    q: "Who among the following is associated with fascism?",
    a: ["Joseph Stalin", "Karl Marx", "Benito Mussolini", "Fredrick Engels"],
    correct: "Benito Mussolini",
  },
  {
    q: "Fascism as a system of government originated in",
    a: ["Britain", "Germany", "France", "Italy"],
    correct: "Italy",
  },
  {
    q: "The instrument mostly abused by a totalitarian government is the",
    a: ["Periodic election", "Mass media", "Military", "Youth organization"],
    correct: "Military",
  },
  {
    q: "Government of the few over the majority is _____",
    a: ["Oligarchy", "Feudalism", "Totalitarianism", "Fascism"],
    correct: "Oligarchy",
  },
  {
    q: "The central point of capitalism as expounded by Karl Marx is that _____",
    a: [
      "Capitalist's profit in the surplus value obtained from workers' labour",
      "Workers are inherently incapable of being owners of their labour",
      "Capitalists shall always increase workers' earning capacity through wages",
      "Capitalists shall always be ready",
    ],
    correct:
      "Capitalist's profit in the surplus value obtained from workers' labour",
  },
  {
    q: "Public opinion is important because it _____",
    a: [
      "Tells government what action it must take",
      "Let's government know what the people want",
      "Allows the police to determine troublemakers",
      "Protect minorities",
    ],
    correct: "Let's government know what the people want",
  },
  {
    q: "Which branch of the government is responsible for implementing laws?",
    a: ["The Executive", "The Legislature", "The Judiciary", "The Police"],
    correct: "The Executive",
  },
  {
    q: "Delegated legislation is the power to make laws by _____",
    a: [
      "Local councils when parliament is in recess",
      "Bodies other than parliament",
      "The international law commission",
      "Military rulers",
    ],
    correct: "Bodies other than parliament",
  },
  {
    q: "In a unitary system of government",
    a: [
      "Political power is diffused",
      "There is a high degree of centralization",
      "There is no separation of powers",
      "Parliament is very weak",
    ],
    correct: "There is a high degree of centralization",
  },
  {
    q: "Universal Adult Suffrage means all _____",
    a: [
      "Adult citizens can vote",
      "Citizens can vote",
      "Qualified citizens can vote",
      "Literate citizens can vote",
    ],
    correct: "Qualified citizens can vote",
  },
  {
    q: "A bill that applies to the whole population and is intended to promote the general welfare is called _____",
    a: ["A private bill", "A decree", "An appropriation bill", "A public bill"],
    correct: "A public bill",
  },
  {
    q: "The rule of law implies _____",
    a: [
      "The rule by lawyers",
      "That only the head of state is above the law",
      "The absence of a military government",
      "That no one is above the law",
    ],
    correct: "That no one is above the law",
  },
  {
    q: "A one-party system of government _____",
    a: [
      "Is found in Africa",
      "Allows no official opposition",
      "Is practiced only where the citizens share",
      "Does not provide for a legislature",
    ],
    correct: "Allows no official opposition",
  },
  {
    q: "Constitutionalism means _____",
    a: [
      "The constitution is largely made up of conventions",
      "The constitution is not easy to amend",
      "The provision of the constitution are strictly adhered to",
      "There is a constitutional Head of State",
    ],
    correct: "The provision of the constitution are strictly adhered to",
  },
  {
    q: "Aristocracy is the system of government in which the few rule for _____",
    a: [
      "Their own benefit",
      "The benefit of all",
      "The benefit of their friends",
      "The benefit of a few",
    ],
    correct: "The benefit of all",
  },
  {
    q: "Presidentialism is a system of government in which _____",
    a: [
      "There is elected head of state who exercises actual executive powers",
      "The head of state is not the chief executive",
      "The executive functions are the responsibility of the entire members of a cabinet",
      "All members of cabinet must also be members of the legislature",
    ],
    correct:
      "There is elected head of state who exercises actual executive powers",
  },
  {
    q: "A social system in which power is derived from control over land is called _____",
    a: ["Oligarchy", "Feudalism", "Socialism", "Presidentialism"],
    correct: "Feudalism",
  },
  {
    q: "A system of voting in which the voters are asked a 'yes' or 'no' question on a major issue is called _____",
    a: [
      "'First past the post'",
      "A referendum",
      "An absolute majority",
      "An indirect election",
    ],
    correct: "A referendum",
  },
  {
    q: "Nigeria is NOT a member of _____",
    a: ["The Commonwealth", "OPEC", "ECOWAS", "NATO"],
    correct: "NATO",
  },
  {
    q: "The electorate means _____",
    a: [
      "Elected members of the Assembly",
      "Candidates for election",
      "Electoral officers",
      "Citizens qualified to vote",
    ],
    correct: "Citizens qualified to vote",
  },
  {
    q: "A constitution is rigid if it _____",
    a: [
      "Cannot be amended",
      "Is found only in one written document",
      "Requires special procedures",
      "Is changed only by judicial interpretation",
    ],
    correct: "Requires special procedures",
  },
  {
    q: "The main objective of a pressure group is to _____",
    a: [
      "Win political power",
      "Conduct free and fair elections",
      "Mobilize support on behalf of government",
      "Protect the interest of its members",
    ],
    correct: "Protect the interest of its members",
  },
  {
    q: "A major difference between civilian and military government is that, civilian government is _____",
    a: [
      "Upright and just",
      "Hostile to the military",
      "Financially prudent",
      "Accountable to the people",
    ],
    correct: "Accountable to the people",
  },
  {
    q: "One of the legal ways through which political parties can raise money for their activities is through _____",
    a: [
      "Fund raising",
      "Money laundering",
      "Corporations and labour organizations",
      "Foreign nationals",
    ],
    correct: "Fund raising",
  },
  {
    q: "Traditional rulers can assist local governments authorities in their development agenda by _____",
    a: [
      "Pitching the youth against the authorities",
      "Mobilizing human and material resources",
      "Organizing demonstrations",
      "Preserving the customs of the people",
    ],
    correct: "Preserving the customs of the people",
  },
  {
    q: "In general, constitutions are designed to provide _____",
    a: [
      "General arrangements, rule and national objectives within which political activities are conducted",
      "Legal remedies for all political problems",
      "Codes of ethics for politicians",
      "Alternatives to military take over of elected government",
    ],
    correct:
      "General arrangements, rule and national objectives within which political activities are conducted",
  },
  {
    q: "Rule adjudication is a primary function of the _____",
    a: ["Executive", "Government", "Legislature", "Judiciary"],
    correct: "Judiciary",
  },
  {
    q: "The United Kingdom adopts _____ system of government",
    a: ["Aristocracy", "Mobocracy", "Parliamentary", "Monarchy"],
    correct: "Parliamentary",
  },
  {
    q: "In a military regime, the branches of government that were fixed are _____",
    a: [
      "Executive and legislature",
      "Executive and the judiciary",
      "Legislature and judiciary",
      "Executive, Legislature and Judiciary",
    ],
    correct: "Executive and legislature",
  },
  {
    q: "The Nigerian civil war was fought because _____",
    a: [
      "Biafra was ripe for independence",
      "The Eastern region was marginalized in Nigeria",
      "The Hausa-Fulani wanted to dominate Nigeria",
      "Igbos were massacred in the North between September and October, 1966",
    ],
    correct:
      "Igbos were massacred in the North between September and October, 1966",
  },
  {
    q: "Under the emirate system, the commander of the army is _____",
    a: ["Hakimi", "Sarki Fada", "Madawaki", "Alkali"],
    correct: "Madawaki",
  },
  {
    q: "The ten non-permanent members of the security council are elected by the _____",
    a: [
      "General assembly",
      "Trusteeship council",
      "Security council",
      "Economic and social council",
    ],
    correct: "General assembly",
  },
  {
    q: "Nigeria's non-aligned policy means that she will _____",
    a: [
      "Have nothing to do with the super-powers",
      "Not take side in international issues based on ideology consideration",
      "Avoid any dealing with any country with ideological leanings",
      "Relate only with countries of the non-aligned nations",
    ],
    correct: "Not take side in international issues based on ideology consideration",
  },
  {
    q: "Laws made by Local Governments are called _____",
    a: [
      "Acts of Parliament",
      "Local Government Act",
      "Bye-laws",
      "Local Government Decree",
    ],
    correct: "Bye-laws",
  },
  {
    q: "In Nigeria, the foundation of federalism was laid by _____",
    a: [
      "Lyttleton Constitution",
      "Clifford Constitution",
      "Macpherson Constitution",
      "Richards Constitution",
    ],
    correct: "Richards Constitution",
  },
  {
    q: "One of the basic functions of an electoral commission is to _____",
    a: [
      "Delimit constituency",
      "Conduct elections",
      "Register political parties and voters",
      "Option B & Option C",
    ],
    correct: "Option B & Option C",
  },
  {
    q: "The doctrine of separation of powers is associated with _____",
    a: ["Montesquieu", "Locke", "Marx", "Hobbes"],
    correct: "Montesquieu",
  },
  {
    q: "Which of the following is NOT a mode of constitutional change?",
    a: ["Party Manifesto", "Formal Amendment", "Judicial Decision", "Statutory Revision"],
    correct: "Party Manifesto",
  },
  {
    q: "Which of the following best describes the role of traditional rulers during the colonial era?",
    a: ["Were directly involved in government", "Were directly accountable to the secretary of state for the colonies", "Made laws for the people", "Served as link between the people and the government"],
    correct: "Served as link between the people and the government",
  }
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

  if (score <= 15 ) {
    categoryText.textContent = "Poor 😢 – You need more practice OLODO!";
  } else if (score <= 20) {
    categoryText.textContent = "Fair 🙂 – You can do better READ!";
  } else if (score <= 29) {
    categoryText.textContent = "Good 👍 – Nice effort MORE EFFORT!";
  } else if (score <= 35) {
    categoryText.textContent = "Excellent 🔥 – You really know your stuff BRAINBOX!";
  } else if (score === 40) {
    categoryText.textContent = "Wow 🎯 – Genius level GURU!";
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