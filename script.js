let selectedWord = null;
let numberTry = 0;
let guessedWords = [];
let seconds = 0;
let minutes = 0;
let intervalId;
let playTimer = true;
let guessWord = "";
let p = 0;

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

const displayResult = () => {

    guessInputArray = guessWord.toLowerCase().split("");

    for (let i = 0; i < guessInputArray.length; i++) {
        for (let j = 0; j < selectedWordArray.length; j++) {
            // let result = document.getElementById(`try${numberTry}-p${i}`)
            const inputField = document.querySelectorAll(`#try${numberTry}`)
            if (guessInputArray[i] == selectedWordArray[j] && i === j) {
                console.log(inputField[i])
                inputField[i].classList.add('right');
                inputField[i].classList.remove('almost');
                console.log(`Guessed letter:${guessInputArray[i]} position: ${i} || selected letter ${selectedWordArray[j]} position ${j}`)

            } else if (guessInputArray[i] === selectedWordArray[j] && i !== j && inputField[i].classList.length === 1) {
                inputField[i].classList.add('almost');
            }
        }
    }

    numberTry++;
    // if (numberTry === 5) {
    //     guessButton.disabled = true;
    //     guessInput.disabled = true;
    //     stopTimer();
    // } else if ((guessedWords[numberTry - 1] == selectedWord)) {
    //     guessButton.disabled = true;
    //     guessInput.disabled = true
    //     console.log("You guessed");
    //     stopTimer();
    // }
    // form.reset();
}

const input = (e) => {
    e.preventDefault();
    const inputField = document.querySelectorAll(`#try${numberTry}`)
    let regex = /^[A-Za-z]+$/.test(e.key);
    
    if(regex && e.key.length === 1 && p < 5){
    inputField[p].innerText = e.key
    p++
    } 
    
    if(e.key === "Backspace" && p !== 0){
        p--;
        inputField[p].innerText = '';
        
    }
    if(e.key === "Enter"){
        guessWord = "";
        inputField.forEach((word)=>guessWord += word.innerText)
        isValid();
    }
}

const isValid = () => {
    if (guessWord.length !== 5) {
        console.log("Word is more or less than 5 caracters");
        return false;
    }
    if (guessedWords.find((word) => word === guessWord)) {
        console.log("Word repeated");
        return false;
    } else {
        console.log("New word");
        guessedWords.push(guessWord);
        p=0;
        displayResult();
        return true;
    }
}

const startTimer = () => {
    intervalId = setInterval(updateTime, 1000); // Update every second
}

const stopTimer = () => {
    if (intervalId) {
        clearInterval(intervalId); // Clear the interval
        intervalId = null; // Reset intervalId to avoid errors
    }
}

const updateTime = () => {
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
// guessButton.addEventListener('click', displayResult)
document.addEventListener("keydown", input)
