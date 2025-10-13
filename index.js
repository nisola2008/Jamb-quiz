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
    q: "The mode of nutrition in which digestion is extracellular is _____",
    a: ["Saprophytic", "Parasitic", "Holophytic", "Holozoic"],
    correct: "Saprophytic"
  },
  {
    q: "Emergent trees are at _____ layer of the forest",
    a: ["Upper", "Lower", "Canopy", "Understory"],
    correct: "Upper"
  },
  {
    q: "The principle of survival of the fittest is regarded as _____",
    a: ["Darwinism", "Lamarckism", "Mendelism", "Naturalism"],
    correct: "Darwinism"
  },
  {
    q: "An example of Estuarine habitat is _____",
    a: ["Pond", "Lagoon", "Ocean", "Lake"],
    correct: "Lagoon"
  },
  {
    q: "An edaphic factor of growth of plants is _____",
    a: ["Soil PH", "Temperature", "Light intensity", "Humidity"],
    correct: "Soil PH"
  },
  {
    q: "What is the relationship between cattle and cattle egret?",
    a: ["Commensalism", "Mutualism", "Parasitism", "Competition"],
    correct: "Commensalism"
  },
  {
    q: "Inbreed crossing refers to the breeding of _____",
    a: ["Unrelated species", "Closely related species", "Species with different habitats", "Genetically modified organisms"],
    correct: "Closely related species"
  },
  {
    q: "A man of AS genotype marries a woman of AS genotype, what is the probability of having a sickle cell anemia offspring?",
    a: ["0%", "25%", "50%", "100%"],
    correct: "25%"
  },
  {
    q: "The effect of the lack of vascular roots of a bryophyte is _____",
    a: ["Reduced water absorption", "Efficient nutrient transport", "Unlimited growth potential", "Improved structural support"],
    correct: "Reduced water absorption"
  },
  {
    q: "The national park of Nigeria is located at _____",
    a: ["Ogun state", "Lagos state", "Cross River State", "Yobe State"],
    correct: "Cross River State"
  },
  {
    q: "A criminal can be traced through which of the following?",
    a: ["Blood group", "Fingerprint", "Genotype", "Shoe size"],
    correct: "Fingerprint"
  },
  {
    q: "The vegetative part of a plant is _____",
    a: ["Leaves", "Flowers", "Stems", "Root"],
    correct: "Leaves"
  },
  {
    q: "The immature fruits of opium poppy are _____",
    a: ["Capsules", "Berries", "Drupes", "Achenes"],
    correct: "Capsules"
  },
  {
    q: "Pneumatophores developed by white mangroves are used for _____",
    a: ["Gaseous exchange", "Anchoring the plant in the soil", "Storing water", "Photosynthesis"],
    correct: "Gaseous exchange"
  },
  {
    q: "Which type of cartilage is found in the external ear, epiglottis and larynx?",
    a: ["Hyaline cartilage", "Fibrocartilage", "Elastic cartilage", "None of the above"],
    correct: "Elastic cartilage"
  },
  {
    q: "Which of these lacks a true nucleus?",
    a: ["Amoeba", "Moss", "Rhizopus", "Bacteria"],
    correct: "Bacteria"
  },
  {
    q: "Arthropods are distinguished from vertebrates because they possess _____",
    a: ["Bones", "Chitin", "Feathers", "Scales"],
    correct: "Chitin"
  },
  {
    q: "Digested food in the body is transported by _____",
    a: ["White blood cells (WBC)", "Red blood cells (RBC)", "Platelets", "Plasma"],
    correct: "Plasma"
  },
  {
    q: "The breeding of related species is known as _____",
    a: ["Inbreeding", "Self-breeding", "Outbreeding", "Cross breeding"],
    correct: "Inbreeding"
  },
  {
    q: "Unicellular organisms are mostly found among _____",
    a: ["Plants", "Animals", "Microorganisms", "Viruses"],
    correct: "Microorganisms"
  },
  {
    q: "The aphotic zone is characterized by _____",
    a: ["Absence of light", "Constant sunlight", "High temperature", "High oxygen levels"],
    correct: "Absence of light"
  },
  {
    q: "Plants in a mangrove swamp have _____",
    a: ["Spines", "Breathing roots", "Thick stems", "Large leaves"],
    correct: "Breathing roots"
  },
  {
    q: "The highest energy level is found in _____",
    a: ["Carbohydrates", "Proteins", "Fats and oil", "Water"],
    correct: "Fats and oil"
  },
  {
    q: "What is the relationship between zebra and lion?",
    a: ["Parasitism", "Predation", "Symbiosis", "Commensalism"],
    correct: "Predation"
  },
  {
    q: "Which of the following is an example of genetic variation?",
    a: ["Person's hair color", "A person's haircut", "A person's clothing style", "A person's shoe size"],
    correct: "Person's hair color"
  },
  {
    q: "Which of the following is an example of continuous variation?",
    a: ["Height in humans", "Blood type in humans", "Flower color in plants", "Fur pattern in animals"],
    correct: "Height in humans"
  },
  {
    q: "The mixture of fresh water and sea water is called _____",
    a: ["Brackish water", "Saline water", "Potable water", "Fresh water"],
    correct: "Brackish water"
  },
  {
    q: "A tree growing with broad and ever-green leaves is likely located in _____",
    a: ["A tropical rainforest", "A desert biome", "A tundra ecosystem", "A deciduous forest"],
    correct: "A tropical rainforest"
  },
  {
    q: "Which inorganic material is needed for photosynthesis?",
    a: ["Oxygen", "Carbon dioxide", "Nitrogen", "Iron"],
    correct: "Carbon dioxide"
  },
  {
    q: "What is the excretory organ of the earthworm?",
    a: ["Kidneys", "Malpighian tubules", "Nephridia", "Lungs"],
    correct: "Nephridia"
  },
  {
    q: "Opium poppy produces _____",
    a: ["Nicotine", "Quinine", "Morphine", "Caffeine"],
    correct: "Morphine"
  },
  {
    q: "Agglutination occurs when blood is passed from blood group _____",
    a: ["A to AB", "AB to A", "O to AB", "O to A"],
    correct: "AB to A"
  },
  {
    q: "The part of the fish's body that is sensitive to vibration is _____",
    a: ["Lateral fin", "Dorsal fin", "Gills", "Tail fin"],
    correct: "Lateral fin"
  },
  {
    q: "The bird (Woodpecker) performs which activity?",
    a: ["Captures fast-moving prey in flight", "Probes for insects hidden in tree bark", "Sips nectar", "Catches fish in shallow water"],
    correct: "Probes for insects hidden in tree bark"
  },
  {
    q: "Which type of cartilage provides a smooth surface for joint movement and is commonly found in the ribs, trachea and bronchi?",
    a: ["Fibrocartilage", "Elastic cartilage", "Hyaline cartilage", "Articular cartilage"],
    correct: "Hyaline cartilage"
  },
  {
    q: "The pectoral fin is the part labelled _____",
    a: ["IV", "VII", "V", "III"],
    correct: "VII"
  },
  {
    q: "Most cells in higher animals retain their power of cell division except _____",
    a: ["Lymphocytes", "Malpighian cells", "Nerve cells", "Germ cells"],
    correct: "Nerve cells"
  },
  {
    q: "The function of ribosomes in cells is _____",
    a: ["Protein synthesis", "Starch synthesis", "Lipid storage", "Transport of materials"],
    correct: "Protein synthesis"
  },
  {
    q: "The membrane surrounding the vacuole in plants is called _____",
    a: ["Plasmalemma", "Tonoplast", "Sarcolemma", "Nuclear membrane"],
    correct: "Tonoplast"
  },
  {
    q: "A man of AS genotype marries a woman of AS genotype, what is the probability of having a sickle cell anemia offspring?",
    a: ["0%", "25%", "50%", "100%"],
    correct: "25%"
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