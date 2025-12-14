import { generateRandomNumber } from "./numberGenerator.js";
import sreadline from 'readline';
import { easyLevel, mediumLevel, hardLevel } from "./difficulties.js";

const rl = sreadline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu(): void {
  console.log(`
  Welcome to the Number Guessing Game!
  I'm thinking of a number between 1 and 100.
    
  Please select a difficulty level:
  1. Easy (10 attempts)
  2. Medium (5 attempts)
  3. Hard (3 attempts)
  4. Exit
    `);
}

function playGame(attemptsLeft: number, randomNumber: number): void {
    
    if (attemptsLeft === 0) {
        console.log(`❌ Sorry, you've run out of attempts. The number was ${randomNumber}.`);
        rl.close(); 
        return;
    }

    console.log(randomNumber); 
    rl.question(`Make your guess (Attempts left: ${attemptsLeft}): `, (guess: string) => {
        const userGuess = parseInt(guess);

        if (isNaN(userGuess)) {
            console.log("⚠️ Please enter a valid number.");
            playGame(attemptsLeft, randomNumber); 
            return;
        }

        if (userGuess === randomNumber) {
            console.log("🎉 Congratulations! You've guessed the number!");
            rl.close(); 
        } else {
            if (userGuess < randomNumber) {
                console.log(`Incorrect! The number is greater than ${userGuess}.`);
            } else {
                console.log(`Incorrect! The number is less than ${userGuess}.`);
            }

            
            playGame(attemptsLeft - 1, randomNumber);
        }
    });
}

function handleResponse(option: string): void {
  const randomNumber = generateRandomNumber();

  switch (option) {
    case "1":
      console.log("Create mode: Easy level (10 attempts).");
      playGame(easyLevel.attempts, randomNumber);
      break;
      
    case "2":
      console.log("Create mode: Medium level (5 attempts).");
      playGame(mediumLevel.attempts, randomNumber); 
      break;

    case "3":
      console.log("Create mode: Hard level (3 attempts).");
      playGame(hardLevel.attempts, randomNumber); 
      break;

    case "4":
      console.log("Goodbye! 👋");
      rl.close();

    default:
      console.log("❌ Invalid selection. Please choose 1, 2, 3, or 4.");
      startGame(); 
      break;
  }
}

function startGame(): void {
  showMenu();
  rl.question("Enter your choice: ", (answer: string) => {
    handleResponse(answer.trim());
  });
}

startGame();

