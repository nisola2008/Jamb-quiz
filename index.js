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
    q: "Which of the following elements will exhibit the most electronegative character?",
    a: ["Al", "Si", "P", "S"],
    correct: "S",
  },
  {
    q: "Acid hydrolysis of nitriles will yield?",
    a: ["Alkanes", "Aldehydes", "Carboxylic acids", "Alcohols"],
    correct: "Carboxylic acids",
  },
  {
    q: "How many isomers of C₄H₉OH will be tertiary alkanol?",
    a: ["1", "2", "3", "4"],
    correct: "1",
  },
  {
    q: "Which of the following makes oils distinguished from fats?",
    a: [
      "Oil contains a higher proportion of unsaturation",
      "Fats contain a higher proportion of unsaturation",
      "Oil and fats have the same proportion of unsaturation",
      "Neither oil nor fats have unsaturation",
    ],
    correct: "Oil contains a higher proportion of unsaturation",
  },
  {
    q: "The characteristic crystalline shape of solid water is due to _____",
    a: ["Covalent bonds", "Hydrogen bonds", "Ionic bonds", "Metallic bonds"],
    correct: "Hydrogen bonds",
  },
  {
    q: "The chemical formula for laughing gas is _____",
    a: ["NO", "NO₂", "N₂O", "N₂O₅"],
    correct: "N₂O",
  },
  {
    q: "The sulphide used in coating electric fluorescent tubes is _____",
    a: ["Iron (II) sulphide", "Sphalerite", "Zinc sulphide", "Sulphide mineral"],
    correct: "Zinc sulphide",
  },
  {
    q: "Calculate the volume in dm³ of oxygen evolved at s.t.p when a current of 5A is passed through acidified water for 772s. (Molar volume = 22.4 dm³)",
    a: ["0.056", "0.224", "224000", "56000"],
    correct: "0.224",
  },
  {
    q: "Hydrogenation of benzene to cyclohexane is called _____",
    a: ["Cracking", "Polymerisation", "Reforming", "Aromatization"],
    correct: "Aromatization",
  },
  {
    q: "The pollutant that contributes to the depletion of the ozone layer is _____",
    a: ["CF", "CS", "CCl", "CFC"],
    correct: "CFC",
  },
  {
    q: "What changes sodium hydroxide pellets to liquid?",
    a: ["Oxygen", "Water vapour", "Carbon (IV) oxide", "Nitrogen"],
    correct: "Water vapour",
  },
  {
    q: "The compound used as ‘antifreeze’ in car radiators is _____",
    a: ["Ethanol", "Ethylene glycol", "Ethanal", "Propan-1,2-diol"],
    correct: "Ethylene glycol",
  },
  {
    q: "What are the laws that form the general gas equation?",
    a: [
      "Boyle’s and Charles’ laws",
      "Boyle’s, Charles’ and Graham’s laws",
      "Gaps between the coils",
      "The area of the coil",
    ],
    correct: "Boyle’s and Charles’ laws",
  },
  {
    q: "Chlorine, bromine, and iodine resemble each other in that all _____",
    a: [
      "Dissolve in alkalis",
      "Displace each other from solutions",
      "React violently with hydrogen",
      "Are electron donors",
    ],
    correct: "Dissolve in alkalis",
  },
  {
    q: "The method suitable for separating suspended particles in a liquid is _____",
    a: ["Decantation", "Distillation", "Centrifugation", "Chromatography"],
    correct: "Centrifugation",
  },
  {
    q: "A hydrocarbon X has molar mass 26 and 92.3% carbon. What is its molecular formula?",
    a: ["C₂H₂", "C₂H₆", "CH₄", "C₃H₈"],
    correct: "C₂H₂",
  },
  {
    q: "Silica gel, when exposed to air, turns liquid. What kind of substance is it?",
    a: ["Deliquescent", "Hygroscopic", "Efflorescent", "Entropy"],
    correct: "Deliquescent",
  },
  {
    q: "In an equilibrium reaction, which condition indicates maximum yield of product?",
    a: [
      "Equilibrium constant is very large",
      "ΔH = TΔS",
      "ΔH ≥ TΔS",
      "K < 0",
    ],
    correct: "Equilibrium constant is very large",
  },
  {
    q: "Under high pressure, real gases do not obey gas laws because their molecules _____",
    a: [
      "Become more energetic",
      "Have become less energetic",
      "Become smaller",
      "Become larger",
    ],
    correct: "Have become less energetic",
  },
  {
    q: "The salt responsible for temporary hardness is _____",
    a: [
      "Calcium sulphate",
      "Magnesium chloride",
      "Calcium bicarbonate",
      "Magnesium sulphate",
    ],
    correct: "Calcium bicarbonate",
  },
  {
    q: "Common salt (NaCl) is used to preserve foods. Which property determines its purity?",
    a: ["Solubility", "Melting point", "Relative density", "Crystalline nature"],
    correct: "Melting point",
  },
  {
    q: "The rate of a chemical reaction is NOT affected by one of these factors:",
    a: ["Colour", "Concentration", "Light", "Surface area"],
    correct: "Colour",
  },
  {
    q: "The functional group represented in the compound below is _____",
    a: ["Alkanol", "Alkanal", "Alkanone", "Alkanoate"],
    correct: "Alkanal",
  },
  {
    q: "On exposure to air, a hydrated salt loses its water of crystallization. This is called _____",
    a: ["Efflorescence", "Deliquescence", "Hydroscopy", "Hydrolysis"],
    correct: "Efflorescence",
  },
  {
    q: "Which of the following statements is true of the electrochemical series?",
    a: [
      "Electropositivity of metals increases down the series",
      "Electropositivity of non-metals decreases down the series",
      "Electronegativity decreases",
      "Electropositivity of metals decreases down the series",
    ],
    correct: "Electropositivity of metals decreases down the series",
  },
  {
    q: "Which of the following pairs are both deliquescent substances?",
    a: [
      "CaCl₂ and H₂SO₄",
      "NaOH and MgSO₄·7H₂O",
      "CaCl₂ and NaOH",
      "CuO and NaCl",
    ],
    correct: "CaCl₂ and NaOH",
  },
  {
    q: "The bond formed between H₂O and H⁺ to form H₃O⁺ is _____",
    a: ["Dative", "Covalent", "Electrovalent", "Ionic"],
    correct: "Dative",
  },
  {
    q: "Gas molecules are said to be perfectly elastic because _____",
    a: [
      "They collide without loss of energy",
      "They move in straight lines",
      "Distances are negligible",
      "Volume negligible",
    ],
    correct: "They collide without loss of energy",
  },
  {
    q: "A solid that absorbs water from the atmosphere and forms an aqueous solution is _____",
    a: ["Hydrophilic", "Efflorescent", "Deliquescent", "Hygroscopic"],
    correct: "Deliquescent",
  },
  {
    q: "Which of the following can undergo both addition and substitution reactions?",
    a: ["Benzene", "Pentane", "Propane", "Hexane"],
    correct: "Benzene",
  },
  {
    q: "The correct name for CH₃(CH₂)₄CH₂CH₂NH₂ is _____",
    a: ["Pentanamine", "Heptanamine", "Hexanamine", "Octanamine"],
    correct: "Heptanamine",
  },
  {
    q: "2Cl⁻(aq) → Cl₂(g) + 2e⁻ represents which type of reaction?",
    a: ["Ionization", "Oxidation", "Reduction", "Recombination"],
    correct: "Oxidation",
  },
  {
    q: "CHCl₃ + Cl₂ → HCl + CCl₄ is an example of _____",
    a: ["Addition", "Decomposition", "Substitution", "Condensation"],
    correct: "Substitution",
  },
  {
    q: "CxHy + 4O₂ → 3CO₂ + 2H₂O. The hydrocarbon CxHy is _____",
    a: ["Butene", "Butane", "Butyne", "Butanone"],
    correct: "Butane",
  },
  {
    q: "To drive the position of equilibrium of an endothermic reaction forward:",
    a: [
      "Increase temperature",
      "Decrease pressure",
      "Cool down",
      "Decrease temperature",
    ],
    correct: "Increase temperature",
  },
  {
    q: "0.92g of ethanol raised 50g of water by 28.6K. Calculate the heat of combustion.",
    a: ["+3000 kJ mol⁻¹", "+300 kJ mol⁻¹", "−300 kJ mol⁻¹", "−3000 kJ mol⁻¹"],
    correct: "−300 kJ mol⁻¹",
  },
  {
    q: "The repeating unit in natural rubber is _____",
    a: ["Alkyne", "Isoprene", "n-propene", "Neoprene"],
    correct: "Isoprene",
  },
  {
    q: "What current will deposit 2.7g of Al in 2 hours? [Al = 27, F = 96500 C mol⁻¹]",
    a: ["32", "8", "4", "16"],
    correct: "4",
  },
  {
    q: "Steam changes the colour of anhydrous cobalt(II) chloride from _____",
    a: ["Blue to pink", "Red to white", "White to green", "White to blue"],
    correct: "Blue to pink",
  },
  {
    q: "Which of the following will change when a catalyst is added to a reaction?",
    a: [
      "Activation energy",
      "Potential energy of reactants",
      "Heat of reaction",
      "Potential energy of products",
    ],
    correct: "Activation energy",
  },
  {
    q: "Which of the following is used to study the arrangement of particles in crystal lattices?",
    a: [
      "A. Alpha-particles",
      "B. Beta-particles",
      "C. Gamma-rays",
      "D. X-rays"
    ],
    correct: "D. X-rays"
  },
  {
    q: "I. It has a varied composition from one place to another.\nII. Its constituents can be separated by physical means.\nIII. It contains unreactive noble gases.\nWhich of the above shows that air is a mixture?",
    a: [
      "A. I and II only",
      "B. II and III only",
      "C. I and III only",
      "D. I, II and III"
    ],
    correct: "A. I and II only"
  },
  {
    q: "The chemicals used to soften hard water involves the addition of:",
    a: [
      "A. Insoluble sodium compounds which form soluble solutions of calcium and magnesium",
      "B. Soluble sodium compounds which form soluble solutions of calcium and magnesium ions",
      "C. Soluble sodium compounds which form insoluble precipitates of calcium and magnesium ions",
      "D. Insoluble precipitates of calcium and magnesium ions"
    ],
    correct: "C. Soluble sodium compounds which form insoluble precipitates of calcium and magnesium ions"
  },
  {
    q: "Chlorination of water for town supply is carried out to:",
    a: [
      "A. Make the water colourless",
      "B. Remove germs from the water",
      "C. Make the water tasteful",
      "D. Remove odour from the water"
    ],
    correct: "B. Remove germs from the water"
  },
  {
    q: "The radioisotope used in industrial radiography for the rapid checking of faults in welds and castings is:",
    a: [
      "A. Carbon-14",
      "B. Phosphorus-32",
      "C. Cobalt-60",
      "D. Iodine-131"
    ],
    correct: "C. Cobalt-60"
  },
  {
    q: "How many unpaired electrons are in the p-orbitals of a fluorine atom?",
    a: [
      "A. 3",
      "B. 0",
      "C. 1",
      "D. 2"
    ],
    correct: "C. 1"
  },
  {
    q: "The radioactive emission with the least ionization power is:",
    a: [
      "A. α-particles",
      "B. X-rays",
      "C. γ-rays",
      "D. β-particles"
    ],
    correct: "C. γ-rays"
  },
  {
    q: "The shape of the carbon (IV) oxide molecule is:",
    a: [
      "A. Pyramidal",
      "B. Linear",
      "C. Angular",
      "D. Tetrahedral"
    ],
    correct: "B. Linear"
  },
  {
    q: "Which of the following molecules is held together by hydrogen bond?",
    a: [
      "A. CH₄",
      "B. HBr",
      "C. H₂SO₄",
      "D. HF"
    ],
    correct: "D. HF"
  },
  {
    q: "A solid that absorbs water from the atmosphere and forms an aqueous solution is _____",
    a: ["Hydrophilic", "Efflorescent", "Deliquescent", "Hygroscopic"],
    correct: "Deliquescent",
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
  } else if (score <= 40) {
    categoryText.textContent = "Wow 🎯 – Genius level almost a GURU!";
  }
  else if (score <= 45) {
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