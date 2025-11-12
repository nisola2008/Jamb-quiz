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
    q: "What is the force on a segment of wire that is 0.5m long and has a current of 2A, when placed in a magnetic field of 2T at an angle of 30° to the field?",
    a: ["1.0N", "2.0N", "0.1N", "0.2N"],
    correct: "1.0N"
  },
  {
    q: "The mode of heat transfer that is electromagnetic in nature is _____",
    a: ["Conduction", "Evaporation", "Convection", "Radiation"],
    correct: "Radiation"
  },
  {
    q: "The condition for resonance to occur in RLC series circuit is _____",
    a: [
      "When the angular frequency of the applied voltage is equal to the natural angular frequency of the circuit",
      "When the angular frequency of the applied voltage is greater than the natural angular frequency of the circuit",
      "When the angular frequency of the applied voltage is less than the natural angular frequency of the circuit",
      "When the angular frequency of the applied voltage is zero"
    ],
    correct: "When the angular frequency of the applied voltage is equal to the natural angular frequency of the circuit"
  },
  {
    q: "A solid weighs 10.5N in air and 5.5N when immersed in a liquid of density 900kgm⁻³. Calculate the volume of the solid. (g = 10m/s²)",
    a: ["1.17×10⁻⁴ m³", "5.56×10⁻⁴ m³", "3.24×10⁻⁴ m³", "2.24×10⁻⁴ m³"],
    correct: "5.56×10⁻⁴ m³"
  },
  {
    q: "A uniform metre rule AB balances on a knife edge 60cm from end B when a load of 33g is kept 10cm away from the end A. What is the weight of the metre rule?",
    a: ["40g", "55g", "66g", "37g"],
    correct: "66g"
  },
  {
    q: "A particle in simple harmonic motion while passing through mean position will have",
    a: [
      "Minimum kinetic energy and maximum potential energy",
      "Maximum potential energy and minimum kinetic energy",
      "Minimum kinetic energy and minimum potential energy",
      "Maximum kinetic energy and minimum potential energy"
    ],
    correct: "Maximum kinetic energy and minimum potential energy"
  },
  {
    q: "A pin floats on water due to the phenomenon of?",
    a: ["Viscosity in fluid", "Surface tension", "Capillary tension", "Gravitation"],
    correct: "Surface tension"
  },
  {
    q: "(i) It converts electrical energy into mechanical energy (ii) It generates electricity (iii) It is based on the principle of electromagnetic induction (iv) It follows Fleming's left hand rule. Which statements are true for an electric motor?",
    a: ["(i) only", "(i) and (ii) only", "(i), (ii) and (iii) only", "(i) and (iv) only"],
    correct: "(i) and (iv) only"
  },
  {
    q: "A thick glass tumbler cracks when hot water is poured into it because of?",
    a: [
      "Anomalous expansion of water",
      "Uneven expansion of the glass tumbler",
      "Thermal expansion of water",
      "Even expansion of the glass tumbler"
    ],
    correct: "Uneven expansion of the glass tumbler"
  },
  {
    q: "Which of the following is the function of a p-n junction diode of a semiconductor device?",
    a: [
      "It can be used to convert AC to DC",
      "It can be used to convert DC to AC",
      "It can be used to amplify the electric current",
      "It can be used to step down the electric current"
    ],
    correct: "It can be used to convert AC to DC"
  },
  {
    q: "Which of the following is true of a particle in stable equilibrium?",
    a: ["Potential energy is constant", "Potential energy is maximum", "Potential energy is minimum", "Potential energy is zero"],
    correct: "Potential energy is minimum"
  },
  {
    q: "Determine the equivalent capacitance of the capacitors shown in the circuit.",
    a: ["1.20μF", "6.00μF", "0.55μF", "1.33μF"],
    correct: "1.33μF"
  },
  {
    q: "The power factor of a series RLC circuit at resonance is",
    a: ["0", "1", "π", "π/2"],
    correct: "1"
  },
  {
    q: "In the given circuit, what is the ammeter reading given that the voltages across the capacitor and inductor are 300 volts each?",
    a: ["1.2A", "2.2A", "3.2A", "0.2A"],
    correct: "2.2A"
  },
  {
    q: "One of these is not an example of a mechanical wave?",
    a: ["Sound waves", "Water waves", "Light waves", "Seismic wave"],
    correct: "Light waves"
  },
  {
    q: "Which of the following is a scalar quantity?",
    a: ["Electric potential", "Electric field", "Angular momentum", "Linear momentum"],
    correct: "Electric potential"
  },
  {
    q: "Given three capacitors each of capacitance C. The resultant capacitance of 2C/3 can be obtained by",
    a: [
      "Combining all in parallel",
      "All in series",
      "Two of them in series and in parallel with the third",
      "Two in parallel and third in series with this combination"
    ],
    correct: "Two in parallel and third in series with this combination"
  },
  {
    q: "If two plane mirrors are positioned side by side, the number of images formed is 8. At what angle are they positioned?",
    a: ["30°", "40°", "60°", "90°"],
    correct: "40°"
  },
  {
    q: "If the half-life of a particle is 4.5 days, how long will it decay to 3/4 of its original mass?",
    a: ["9 days", "12 days", "15 days", "21 days"],
    correct: "9 days"
  },
  {
    q: "A transformer core is laminated to reduce _____",
    a: ["Hysteresis loss", "Copper loss", "Eddy current loss", "Stray and dielectric losses"],
    correct: "Eddy current loss"
  },
  {
    q: "A glass rod is charged when rubbed with silk cloth because",
    a: ["It transfers negative charge", "It transfers positive charges", "It accepts negative charges", "It accepts positive charges"],
    correct: "It transfers negative charge"
  },
  {
    q: "Addition of trivalent impurity to a semiconductor",
    a: ["Increases the number of holes", "Decreases the number of holes", "Increases the number of free electrons", "Decreases the number of free electrons"],
    correct: "Increases the number of holes"
  },
  {
    q: "A charge of 1.6×10⁻¹⁹C is placed in a uniform electric field of intensity 1,200V/m. Calculate its acceleration if the mass of the charge is 9.1×10⁻³¹kg.",
    a: ["2.11×10¹² m/s²", "2.11×10¹⁴ m/s²", "6.83×10¹² m/s²", "6.83×10¹⁴ m/s²"],
    correct: "2.11×10¹⁴ m/s²"
  },
  {
    q: "The defect of the eye lens which occurs when the ciliary muscles are weak is called _____",
    a: ["Longsightedness", "Shortsightedness", "Presbyopia", "Astigmatism"],
    correct: "Presbyopia"
  },
  {
    q: "A light of 6.22eV is incident on a cadmium surface. If a stopping voltage of 2.1eV is required to reduce the photocurrent to zero, calculate the work function of cadmium in eV.",
    a: ["4.07eV", "2.15eV", "6.22eV", "8.37eV"],
    correct: "4.07eV"
  },
  {
    q: "The fundamental frequency of an open organ pipe is the same as that of the second overtone of a closed organ pipe of length 0.2m. What is the length of the open organ pipe?",
    a: ["0.132m", "0.160m", "0.125m", "0.080m"],
    correct: "0.080m"
  },
  {
    q: "What is the maximum possible wavelength in an open organ pipe of length a cm?",
    a: ["a cm", "2a cm", "3a cm", "4a cm"],
    correct: "2a cm"
  },
  {
    q: "Mercury is used as a thermometric substance because (i) its specific heat is low (ii) it does not wet glass (iii) it is opaque",
    a: ["i only", "i and ii only", "ii and iii only", "i, ii and iii"],
    correct: "i, ii and iii"
  },
  {
    q: "The magnetic field inside a solenoid is _____",
    a: ["Non-uniform", "Uniform", "Zero", "Weak"],
    correct: "Uniform"
  },
  {
    q: "A gun with a muzzle velocity of 500m/s shoots a bullet at a bird 50m away. To hit the bird, the gun should be aimed (take g = 10m/s²)",
    a: ["5cm high above the bird", "10cm high above the bird", "Directly towards", "15cm high above the bird"],
    correct: "5cm high above the bird"
  },
  {
    q: "If the distance between two suspended masses 50kg each is quadrupled, the gravitational force of attraction between them is",
    a: ["Reduced by four", "Increased by four", "Increased by sixteen", "Reduced by sixteen"],
    correct: "Reduced by sixteen"
  },
  {
    q: "In a simple machine, the variation of the efficiency with load is _____",
    a: ["A parabola", "A straight line", "A hyperbola", "Logarithmic"],
    correct: "A parabola"
  },
  {
    q: "Binding energy is _____",
    a: [
      "The amount of energy released when protons change energy level",
      "The amount of energy released when electrons change energy levels",
      "The amount of energy required to break a nucleus apart into protons and neutrons",
      "The amount of energy required to break a nucleus apart into protons and electrons"
    ],
    correct: "The amount of energy required to break a nucleus apart into protons and neutrons"
  },
  {
    q: "If the heat capacity of 100g of a substance is 3000JK⁻¹, what would be the heat capacity of 10g of the substance?",
    a: ["30JK⁻¹", "300JK⁻¹", "30,000JK⁻¹", "3JK⁻¹"],
    correct: "300JK⁻¹"
  },
  {
    q: "Wooden ladles are commonly used domestically to scoop hot soup because of its",
    a: [
      "Good insulation of electricity",
      "Good insulation of heat and electricity",
      "Bad conduction of heat and electricity",
      "Good insulation of heat"
    ],
    correct: "Good insulation of heat"
  },
  {
    q: "Which of these thermometers uses the volume of a fixed mass of liquid as its thermometric property?",
    a: ["Mercury-in-glass thermometer", "Thermocouple thermometer", "Constant-volume gas thermometer", "Resistance thermometer"],
    correct: "Mercury-in-glass thermometer"
  },
  {
    q: "As pressure is increased,",
    a: [
      "The melting point of ice decreases",
      "The melting point of ice increases",
      "The boiling point of water increases",
      "No change in melting or boiling point"
    ],
    correct: "The melting point of ice decreases"
  },
  {
    q: "Which of the following statements about the gamma ray is/are true? (i) It carries a negative charge (ii) It can be deflected by magnetic/electric fields (iii) It can be stopped by paper (iv) It has zero rest mass and a neutral charge",
    a: ["(i) only", "(i) and (ii) only", "(ii) and (iv) only", "(iv) only"],
    correct: "(iv) only"
  },
  {
    q: "A cyclist of mass 30kg exerts a force of 250N to move his bicycle. The acceleration produced is 4m/s². What is the frictional force between the road and the tires?",
    a: ["200N", "120N", "130N", "180N"],
    correct: "130N"
  },
  {
    q: "The temperature of land rises more quickly than that of the sea because the specific heat of soil is",
    a: ["More than that of water", "Less than that of water", "Equal to that of water", "Negligible"],
    correct: "Less than that of water"
  },
  {
    q: "Which of the following is a chemical change?",
    a: [
      "Melting of ice",
      "Boiling of water",
      "Rusting of iron",
      "Breaking of glass"
    ],
    correct: "Rusting of iron"
  },
  {
    q: "What is the oxidation number of sulfur in H₂SO₄?",
    a: ["+4", "+6", "-2", "0"],
    correct: "+6"
  },
  {
    q: "Which of the following gases is not a greenhouse gas?",
    a: ["CO₂", "CH₄", "N₂", "H₂O vapour"],
    correct: "N₂"
  },
  {
    q: "Which particle has the same number of protons and electrons but different number of neutrons?",
    a: ["Isomer", "Isotope", "Ion", "Molecule"],
    correct: "Isotope"
  },
  {
    q: "What is the molar volume of an ideal gas at STP?",
    a: ["22.4 dm³", "24 dm³", "1.0 dm³", "2.24 dm³"],
    correct: "22.4 dm³"
  },
  {
    q: "Find the frequencies of the first three harmonics of a piano string of length 1.5m, if the velocity of the string is 120m/s.",
    a: [
      "40Hz, 80Hz, 120Hz",
      "180Hz, 360Hz, 540Hz",
      "80Hz, 160Hz, 240Hz",
      "360Hz, 180Hz, 90Hz"
    ],
    correct: "40Hz, 80Hz, 120Hz"
  },
  {
    q: "Two forces whose resultant is 100N are at right angles to each other. If one of them makes an angle of 30° with the resultant, find the magnitude of the other force.",
    a: ["8.66N", "86.6N", "50.0N", "5.0N"],
    correct: "50.0N"
  },
  {
    q: "A body of weight W N rests on a smooth plane inclined at an angle θ° to the horizontal. The component of the weight down the slope is",
    a: ["Wsinθ", "Wcosθ", "Wtanθ", "Wsecθ"],
    correct: "Wsinθ"
  },
  {
    q: "A body of mass 100g moves with a velocity of 10.0ms⁻¹ and collides with a wall. After the collision, the body moves with a velocity of 2.0ms⁻¹ in the opposite direction. The change in momentum is",
    a: ["8.0Ns", "1.2Ns", "12.0Ns", "80Ns"],
    correct: "1.2Ns"
  },
  {
    q: "A 12V battery supplying a current of 20A was used to melt 1.5kg of ice at 0°C. Calculate the time required if the latent heat of fusion of ice is 336×10³ J/kg.",
    a: ["35.0min", "3.5min", "76min", "21.0min"],
    correct: "35.0min"
  },
  {
    q: "The light from the sun reaches the earth mainly by",
    a: ["convection", "conduction", "radiation", "reflection"],
    correct: "radiation"
  },
  {
    q: "One valid assumption of the kinetic theory of gases is that",
    a: [
      "the molecules are in random motion and the number of collisions is constant",
      "the number of molecules increases with the pressure",
      "the molecules of the gas are all identical and are very small in size",
      "the number of molecules increases with temperature"
    ],
    correct: "the molecules of the gas are all identical and are very small in size"
  },
  {
    q: "An astronomical telescope is said to be in normal adjustment when the",
    a: [
      "eye is accommodated",
      "focal length of objective lens is longer than that of the eye piece",
      "final image is at the near point of the eye",
      "final image is at infinity"
    ],
    correct: "final image is at infinity"
  },
  {
    q: "Dispersion of light by a glass prism is due to the",
    a: [
      "different hidden colours of the glass",
      "different speeds of the various colours in glass",
      "defects in the glass",
      "high density of glass"
    ],
    correct: "different speeds of the various colours in glass"
  },
  {
    q: "A guitar string of length 33cm is under a tension of 55N. If the fundamental frequency is 196Hz, find the speed of wave on the string.",
    a: ["6m/s", "0.33m/s", "129m/s", "726m/s"],
    correct: "129m/s"
  },
  
  {
    q: "A transformer has 400 turns as its primary winding and 100 turns as secondary winding. If the primary coil is connected to a 12V source, the transformer functions as",
    a: [
      "a step down transformer with secondary emf = 6V",
      "a step down transformer with secondary emf = 3V",
      "a step up transformer with secondary emf = 24V",
      "a step up transformer with secondary emf = 48V"
    ],
    correct: "a step down transformer with secondary emf = 3V"
  },
  {
    q: "Which of the following is NOT conserved in an inelastic collision?",
    a: ["momentum", "mass", "kinetic energy", "total energy"],
    correct: "kinetic energy"
  },
  {
    q: "A series RLC circuit has a resistance of 50.0Ω, a capacitance of 6.00 nF, and an inductance of 28.0 mH. The circuit is connected to a wide-range, adjustable frequency voltage source with an output of 25.0 V. What is the resonance frequency of the circuit?",
    a: ["12.3 KHz", "12.3 Hz", "12.3 mHz", "12.3 μHz"],
    correct: "12.3 KHz"
  },
  {
    q: "The area under a force-distance graph represents",
    a: ["acceleration", "velocity", "work", "momentum"],
    correct: "work"
  },
  {
    q: "Determine the inductive reactance when a 30.0mH inductor with negligible resistance is connected to a 1.3KHz oscillator.",
    a: ["39.0Ω", "122.5Ω", "245.0Ω", "39KΩ"],
    correct: "245.0Ω"
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