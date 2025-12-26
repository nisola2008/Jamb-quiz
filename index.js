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
    q: "Which of the following substances is used for road surfacing?",
    a: ["Bitumen", "Coal tar", "Kerosene", "Diesel"],
    correct: "Bitumen"
  },
  {
    q: "The name of the compound CH₂Br-CH₂-CH(Cl)-CH₂-CH₂Br is _____",
    a: [
      "1,5-dibromo-2-chloropentane",
      "1,1-dibromo-2-chloropentane",
      "1,1-dibromo-4-chloropentane",
      "1-bromo-4-chloropentane"
    ],
    correct: "1,5-dibromo-2-chloropentane"
  },
  {
    q: "The process that converts ethanol to ethanoic acid is _____",
    a: ["Combustion", "Oxidation", "Halogenation", "Reduction"],
    correct: "Oxidation"
  },
  {
    q: "In electroplating steel with chromium, the cathode is _____",
    a: ["Chromium", "Steel", "Iron", "Copper"],
    correct: "Steel"
  },
  {
    q: "When monoclinic sulphur is cooled below its transition temperature, it _____",
    a: [
      "Freezes",
      "Crumbles",
      "Changes to rhombic sulphur",
      "Evaporates"
    ],
    correct: "Changes to rhombic sulphur"
  },
  {
    q: "The bond that exists in oxonium ions are _____",
    a: [
      "Covalent and dative",
      "Covalent and ionic",
      "Dative and ionic",
      "Metallic and dative"
    ],
    correct: "Covalent and dative"
  },
  {
    q: "The property of butane and propane that makes them suitable for cooking is _____",
    a: ["Diffusion", "Solubility", "Boiling", "Colour"],
    correct: "Boiling"
  },
  {
    q: "The structure of diamond is _____",
    a: ["Cubic", "Hexagonal", "Tetrahedral", "Trigonal"],
    correct: "Tetrahedral"
  },
  {
    q: "Which of the following are secondary air pollutants?",
    a: [
      "Ozone and SO₂",
      "Ozone and CO₂",
      "Ozone and NO₂",
      "NO and SO₂"
    ],
    correct: "Ozone and NO₂"
  },
  {
    q: "During the preparation of ethene, it is passed through _____ to remove impurities",
    a: ["NaHCO₃", "NaOH", "K₂CO₃", "Water"],
    correct: "NaOH"
  },
  {
    q: "The technique commonly used in the purification of solids is _____",
    a: ["Chromatography", "Crystallization", "Centrifugation", "Nitrogen"],
    correct: "Crystallization"
  },
  {
    q: "The presence of impurity in a substance will cause the melting point to _____",
    a: ["Reduce", "Increase", "Be stable", "Be zero"],
    correct: "Reduce"
  },
  {
    q: "Which of these is used in the manufacture of cosmetics?",
    a: ["Toluene", "Phenol", "Ethene", "Ethane"],
    correct: "Phenol"
  },
  {
    q: "Which of these metals will liberate hydrogen from steam?",
    a: ["Copper", "Iron", "Mercury", "Gold"],
    correct: "Iron"
  },
  {
    q: "The electronic configuration of Na⁺ is _____",
    a: [
      "1s²2s²2p⁶3s¹",
      "1s²2s²2p⁶",
      "1s²2s²2p⁶3s²",
      "None of the above"
    ],
    correct: "1s²2s²2p⁶"
  },
  {
    q: "If 50 cm³ of hydrogen reacts with 75 cm³ of oxygen, the volume of unreacted oxygen is _____",
    a: ["50 cm³", "25 cm³", "30 cm³", "100 cm³"],
    correct: "50 cm³"
  },
  {
    q: "An example of a homogeneous mixture is _____",
    a: ["Colloids", "Sols", "Emulsion", "Solution"],
    correct: "Solution"
  },
  {
    q: "Which technique would be used in a food industry?",
    a: [
      "Distillation",
      "Chromatography",
      "Filtration",
      "Fractional distillation"
    ],
    correct: "Filtration"
  },
  {
    q: "H⁺ + OH⁻ → H₂O is an example of _____ reaction",
    a: [
      "Crystallization",
      "Precipitation",
      "Neutralization",
      "Double decomposition"
    ],
    correct: "Neutralization"
  },
  {
    q: "When methane burns in excess air, it gives _____",
    a: ["CO", "CO₂", "O₂", "CO₂ + H₂O"],
    correct: "CO₂ + H₂O"
  },
  {
    q: "Which process will result in a chemical change?",
    a: [
      "Addition of salt to water",
      "Evaporation of water",
      "Copper(II) oxide mixed with tetraoxosulphate(VI) acid",
      "Melting of candle"
    ],
    correct: "Copper(II) oxide mixed with tetraoxosulphate(VI) acid"
  },
  {
    q: "Which method is used to obtain alkanol from alkene?",
    a: ["Dehydration", "Hydrolysis", "Hydration", "Fermentation"],
    correct: "Hydration"
  },
  {
    q: "What is the anode in aluminium extraction?",
    a: [
      "Iron, reduction",
      "Graphite, oxidation",
      "Graphite, reduction",
      "Iron, oxidation"
    ],
    correct: "Graphite, oxidation"
  },
  {
    q: "All these are natural air pollutants except _____",
    a: ["CO", "NO", "O₂", "SO₂"],
    correct: "O₂"
  },
  {
    q: "Which is not evidence of particulate nature of matter?",
    a: ["Diffusion", "Osmosis", "Dilution", "Crystallization"],
    correct: "Crystallization"
  },
  {
    q: "What element is common to permalloy, steel and alnico?",
    a: ["Carbon", "Iron", "Silicon", "Aluminium"],
    correct: "Iron"
  },
  {
    q: "The method of preparing a salt depends on its _____",
    a: ["Colour", "Density", "Solubility", "None"],
    correct: "Solubility"
  },
  {
    q: "The bonds in naphthalene molecules are _____",
    a: ["Ionic", "Metallic", "Dative", "Van der Waals"],
    correct: "Van der Waals"
  },
  {
    q: "Addition of charcoal in water purification is to _____",
    a: [
      "Prevent goitre",
      "Prevent tooth decay",
      "Kill germs",
      "Remove odour"
    ],
    correct: "Remove odour"
  },
  {
    q: "How many isomers does C₂H₄Br₂ have?",
    a: ["2", "3", "5", "4"],
    correct: "2"
  },
  {
    q: "What bond is present in hydrated copper(II) ions?",
    a: ["Electrovalent", "Dative", "Covalent", "Metallic"],
    correct: "Dative"
  },
  {
    q: "Which gas burns with a blue flame?",
    a: ["SO₂", "H₂S", "HCl", "NO₂"],
    correct: "H₂S"
  },
  {
    q: "Silicon(IV) oxide when cooled after melting forms _____",
    a: [
      "Flint glass",
      "Coloured glass",
      "Quartz glass",
      "Heat resistant glass"
    ],
    correct: "Quartz glass"
  },
  {
    q: "Which of the following pairs are oxidizing agents?",
    a: [
      "Chlorine and bromine",
      "Chlorine and hydrogen sulphide",
      "Hydrogen and oxygen",
      "Iron and sulphur(IV) oxide"
    ],
    correct: "Chlorine and bromine"
  },
  {
    q: "Which of the following particles has the least mass?",
    a: ["Proton", "Neutron", "Electron", "Alpha particle"],
    correct: "Electron"
  },
  {
    q: "Which of the following is used as a drying agent for ammonia gas?",
    a: ["Concentrated H₂SO₄", "Calcium oxide", "Anhydrous CaCl₂", "Silica gel"],
    correct: "Calcium oxide"
  },
  {
    q: "Which of the following is a strong electrolyte?",
    a: ["Glucose", "Ethanol", "Sodium chloride", "Acetic acid"],
    correct: "Sodium chloride"
  },
  {
    q: "The gas that turns moist blue litmus paper red is _____",
    a: ["Ammonia", "Carbon dioxide", "Hydrogen chloride", "Oxygen"],
    correct: "Hydrogen chloride"
  },
  {
    q: "Which of the following is an example of a covalent compound?",
    a: ["NaCl", "MgO", "H₂O", "KBr"],
    correct: "H₂O"
  },
  {
    q: "The rusting of iron is an example of _____",
    a: ["Oxidation", "Reduction", "Neutralization", "Hydrolysis"],
    correct: "Oxidation"
  },
  {
    q: "Which of the following gases is collected over water?",
    a: ["Ammonia", "Hydrogen chloride", "Sulphur dioxide", "Oxygen"],
    correct: "Oxygen"
  },
  {
    q: "What is the pH of a neutral solution at room temperature?",
    a: ["0", "7", "10", "14"],
    correct: "7"
  },
  {
    q: "Which of the following metals is extracted by electrolysis?",
    a: ["Iron", "Copper", "Aluminium", "Zinc"],
    correct: "Aluminium"
  },
  {
    q: "Which of the following substances is amphoteric?",
    a: ["NaOH", "HCl", "Al₂O₃", "NH₃"],
    correct: "Al₂O₃"
  },
  {
    q: "Which of the following indicators is suitable for strong acid–strong base titration?",
    a: ["Methyl orange", "Litmus", "Phenolphthalein", "All of the above"],
    correct: "All of the above"
  },
  {
    q: "Which of the following is not a fossil fuel?",
    a: ["Coal", "Petroleum", "Natural gas", "Charcoal"],
    correct: "Charcoal"
  },
  {
    q: "The process by which solid changes directly to gas is called _____",
    a: ["Melting", "Sublimation", "Evaporation", "Condensation"],
    correct: "Sublimation"
  },
  {
    q: "Which of the following compounds will undergo addition reaction?",
    a: ["Ethane", "Ethene", "Methane", "Propane"],
    correct: "Ethene"
  },
  {
    q: "Which of the following is responsible for temporary hardness of water?",
    a: ["Calcium chloride", "Calcium carbonate", "Calcium hydrogencarbonate", "Sodium carbonate"],
    correct: "Calcium hydrogencarbonate"
  },
  {
    q: "Which of the following pairs are oxidizing agents?",
    a: [
      "Chlorine and bromine",
      "Chlorine and hydrogen sulphide",
      "Hydrogen and oxygen",
      "Iron and sulphur(IV) oxide"
    ],
    correct: "Chlorine and bromine"
  },
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
  else{
    showToast("Login Successful");
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
    <p>Thanks for playing <span class="wow">${playerName}!</span></p>
    `;

  const categoryText = document.createElement("p");
  categoryText.classList.add("category");

  if (score <= 15 ) {
    categoryText.textContent = "Poor 😢 – You need more practice OLODO!";
  } else if (score <= 20) {
    categoryText.textContent = "Fair 🙂 – You can do better READ!";
  } else if (score <= 30) {
    categoryText.textContent = "Good 👍 – Nice effort MORE EFFORT!";
  } else if (score <= 35) {
    categoryText.textContent = "Excellent 🔥 – You really know your stuff BRAINBOX!";
  } else if (score <= 40) {
    categoryText.textContent = "Wow 🎯 – Genius level GURU!";
  } else if (score == 50) {
    categoryText.textContent = "Father of CHEMISTRY";
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
  };
