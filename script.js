let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game, Powerd by &copy El-Shafey`;

let messageArea = document.querySelector(".message");

let triesNumber = 6;
let lettersNumber = 6;
let currentTry = 1;
let hintsNumber = 2;
const checkButton = document.querySelector(".check");
const hintButton = document.querySelector(".hint");
let wordToGuess = "";
let words = [
  "update",
  "create",
  "delete",
  "master",
  "branch",
  "elzero",
  "school",
  "planet",
  "friend",
  "bright",
  "lovely",
  "charge",
  "driver",
  "frozen",
  "garden",
  "island",
  "jungle",
  "leader",
  "market",
  "nature",
  "pocket",
  "travel",
  "yellow",
  "zodiac",
  "bridge",
  "castle",
  "desert",
  "editor",
  "flower",
  "glider",
  "hunger",
  "insect",
  "jigsaw",
  "keeper",
  "laptop",
  "mirror",
  "neuron",
  "office",
  "pirate",
  "quiver",
  "rocket",
  "sailor",
  "throne",
  "uncle",
  "violet",
  "wander",
  "xenons",
  "yogurt",
  "zapper",
  "absent",
  "ballet",
  "candle",
  "deluxe",
  "effort",
  "forest",
  "guitar",
  "hammer",
  "invent",
  "jester",
  "kindly",
  "legend",
  "medals",
  "novice",
  "oyster",
  "patrol",
  "quaint",
  "rabbit",
  "scarce",
  "target",
  "urgent",
  "verses",
  "wander",
  "xenons",
  "yogurt",
  "zapper",
  "arcade",
  "battle",
  "chorus",
  "drawer",
  "engine",
  "fabric",
  "genius",
  "helmet",
  "impact",
  "jacket",
  "kitten",
  "lambda",
  "magnet",
  "nephew",
  "oxygen",
  "pastel",
  "quartz",
  "rabbit",
  "scenic",
  "tackle",
  "upbeat",
  "valley",
  "wallet",
];

wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
//add hints number to the button
document.querySelector(`.hint span`).innerHTML = hintsNumber;

function generateInputs() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= triesNumber; i++) {
    const trydiv = document.createElement("div");
    trydiv.classList.add(`try-${i}`);
    trydiv.innerHTML = `<span>Try-${i}</span>`;

    if (i !== 1) trydiv.classList.add("disabled");

    // create the inputs
    for (let j = 1; j <= lettersNumber; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      trydiv.appendChild(input);
    }
    // add the inputs div to the page
    inputsContainer.appendChild(trydiv);
  }
  //focus on the firsr input
  inputsContainer.children[0].children[1].focus();
  //disable all inputs except the first div
  const disabledInputs = document.querySelectorAll(".disabled input");
  disabledInputs.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  //focus on the next input after inserting value into it
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target); // event.target == this
      if (event.key === "ArrowRight") {
        const nextIndex = currentIndex + 1;
        if (nextIndex < inputs.length) inputs[nextIndex].focus();
      }
      if (event.key === "ArrowLeft") {
        const PrevInput = currentIndex - 1;
        if (PrevInput < inputs.length) inputs[PrevInput].focus();
      }
      if (event.key === "Backspace") {
        if (currentIndex > 0) {
          const currentInput = inputs[currentIndex];
          const prevtInput = inputs[currentIndex - 1];
          currentInput.value = "";
          prevtInput.value = "";
          prevtInput.focus();
        }
      }
      if (event.key === "Enter") {
        handleGuesses();
      }
    });
  });
}

checkButton.addEventListener("click", handleGuesses);
hintButton.addEventListener("click", handleHints);
console.log(wordToGuess);

//handle guesses
function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= lettersNumber; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const inputFieldValue = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];
    if (inputFieldValue === actualLetter) {
      inputField.classList.add("correct-place");
    } else if (
      wordToGuess.includes(inputFieldValue) &&
      inputFieldValue !== ""
    ) {
      inputField.classList.add("wrong-place");
      successGuess = false;
    } else {
      inputField.classList.add("wrong");
      successGuess = false;
    }
  }

  //check if the user won
  if (successGuess) {
    //handle success
    messageArea.innerHTML = `🎉 Congratulations! You nailed it. The word is <span>${wordToGuess}</span>! 🎊`;
    checkButton.disabled = true;
    hintButton.disabled = true;
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryElement) => {
      tryElement.classList.add("disabled");
    });
  } else {
    //move to the next try
    document.querySelector(`.try-${currentTry}`).classList.add("disabled");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((inputField) => (inputField.disabled = true));
    currentTry++;
    //check if the user lost
    if (currentTry <= triesNumber) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
      const nextTryInputs = document.querySelectorAll(
        `.try-${currentTry} input`
      );
      nextTryInputs.forEach((inputField) => (inputField.disabled = false));
      let nextTry = document.querySelector(`.try-${currentTry}`);
      nextTry.children[1].focus();
    } else {
      messageArea.innerHTML = `You lost, the word was <span>${wordToGuess}</span>`;
      checkButton.disabled = true;
      hintButton.disabled = true;
    }
  }
}
//handle hints
function handleHints() {
  if (hintsNumber > 0) {
    hintsNumber--;
    document.querySelector(`.hint span`).innerHTML = hintsNumber;
  }
  if (hintsNumber == 0) {
    hintButton.disabled = true;
  }
  //get the enabled inputs
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  //get empty enabled inputs
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  //if there are empty enabled inputs, fill them with a random letter
  if (emptyEnabledInputs.length > 0) {
    //get a random letter from the word
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const letterIndex = Array.from(enabledInputs).indexOf(randomInput);
    randomInput.value = wordToGuess[letterIndex];
  }
}
onload = function () {
  generateInputs();
};
