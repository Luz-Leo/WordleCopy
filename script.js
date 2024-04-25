let selectedWord = null;
let numberTry = 0;
let guessedWords = [];
let seconds = 0;
let minutes = 0;
let intervalId;
let playTimer = true;
let guessInputText = "";

const possibleWords = ["apple", "xerox", "games", "board", "mouse", "purge"]
const guessButton = document.getElementById("guessButton");
const guessInput = document.getElementById("userInput");
const form = document.getElementById("inputForm");
const timer = document.getElementById("timer");

// Randomly choose the word which the users needs to guess
const getRandWord = () => {
    let randomNumber = Math.floor(Math.random() * possibleWords.length);
    return possibleWords[5];
}

const displayResult = (e) => {
    e.preventDefault();

    guessInputText = guessInput.value.toLowerCase();

    if (!isValid()) {
        return;
    };
    
    guessInputArray = guessInputText.split("")

    for (let i = 0; i < guessInputArray.length; i++) {
        for (let j = 0; j < selectedWordArray.length; j++) {
            let result = document.getElementById(`try${numberTry}-p${i}`)
            if (guessInputArray[i] == selectedWordArray[j] && i === j) {
                result.classList.add('right');
                result.classList.remove('almost');
                console.log(`Guessed letter:${guessInputArray[i]} position: ${i} || selected letter ${selectedWordArray[j]} position ${j}`)
                     
            }else if (guessInputArray[i] === selectedWordArray[j] && i !== j && result.classList.length === 1){
                result.classList.add('almost');             
            }
            result.innerText = guessInputArray[i];
        }
    }

    numberTry++;
    if (numberTry === 5){
        guessButton.disabled = true;
        guessInput.disabled = true;
        stopTimer();
    }else if((guessedWords[numberTry-1] == selectedWord)){
        guessButton.disabled = true;
        guessInput.disabled = true
        console.log("You guessed");
        stopTimer();
    }
    form.reset();
}

const isValid = () => {
    if (guessInput.value.length < 5) {
        console.log("Word not 5 caracters long!");
        return false;
    }
    if (guessedWords.find((word) => word === guessInputText)) {
        console.log("Word repeated");
        return false;
    }else {
        console.log("New word");
        guessedWords.push(guessInputText);
        return true;
    }
}

function startTimer() {
    intervalId = setInterval(updateTime, 1000); // Update every second
}

function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId); // Clear the interval
        intervalId = null; // Reset intervalId to avoid errors
    }
}

function updateTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    // Format the time string: 00:00
    let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById("timer").innerText = formattedTime;
}

selectedWord = getRandWord().toLowerCase();
const selectedWordArray = selectedWord.split("")
startTimer(); // Start the timer on page load
guessButton.addEventListener('click', displayResult)
