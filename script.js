let selectedWord = null;
let numberTry = 0;
let guessedWords = [];
let seconds = 0;
let minutes = 0;
let intervalId;
let guessWord = "";
let p = 0;
let gameOver = false

const possibleWords = ["apple", "xerox", "games", "board", "mouse", "purge"]
const guessButton = document.getElementById("guessButton");
const guessInput = document.getElementById("userInput");
const form = document.getElementById("inputForm");
const timer = document.getElementById("timer");

// Randomly choose the word which the users needs to guess
const getRandWord = () => {
    let randomNumber = Math.floor(Math.random() * possibleWords.length);
    return possibleWords[randomNumber];
}

const displayResult = () => {
    guessInputArray = guessWord.toLowerCase().split("");

    for (let i = 0; i < guessInputArray.length; i++) {
        for (let j = 0; j < selectedWordArray.length; j++) {
            // let result = document.getElementById(`try${numberTry}-p${i}`)
            const inputField = document.querySelectorAll(`#try${numberTry}`)
            if (guessInputArray[i] == selectedWordArray[j] && i === j) {
                inputField[i].classList.add('right');
                inputField[i].classList.remove('almost');

            } else if (guessInputArray[i] === selectedWordArray[j] && i !== j && inputField[i].classList.length === 1) {
                inputField[i].classList.add('almost');
            }
        }
    }
    isGameOver();
    if(gameOver){stopTimer()}
    numberTry++;
}

const isGameOver = () => {
    if(guessWord === selectedWord.toUpperCase()){
        console.log('You won')
        gameOver = true;
    }else if(numberTry === 4){
        console.log("You lose!")
        gameOver = true;
    }
}

const input = (e) => {
    e.preventDefault();
    if(gameOver){
        return;
    }
    const inputField = document.querySelectorAll(`#try${numberTry}`)
    let regex = /^[A-Za-z]+$/.test(e.key);
    
    if(regex && e.key.length === 1 && p < 5){
    inputField[p].innerText = e.key
    p++
    }else if(e.key === "Backspace" && p !== 0){
        p--;
        inputField[p].innerText = '';
        
    }else if(e.key === "Enter" && p == 5){
        console.log("P: " + p)
        guessWord = "";
        inputField.forEach((word)=>guessWord += word.innerText)
        isValid();
    }
}

const isValid = () => {
    if (guessWord.length !== 5) {
        console.log("Word is more or less than 5 caracters");

    }
    if (guessedWords.find((word) => word === guessWord)) {
        console.log("Word repeated");

    }else {
        console.log("New word");
        guessedWords.push(guessWord);
        p=0;
        displayResult();
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
// while(playTimer){
    document.addEventListener("keydown", input)
// }
