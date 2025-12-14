import { generateRandomNumber } from "./numberGenerator.js";
import sreadline from 'readline';

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
    `);
}
  

function handleResponse(option: string): void {
  switch (option) {
    case "1":
      console.log("You have selected Easy level. You have 10 chances to guess the number.");
      // Implement Easy level logic here
      break;
    case "2":
      console.log("You have selected Medium level. You have 5 chances to guess the number.");
      // Implement Medium level logic here
      break;
    case "3":
      console.log("You have selected Hard level. You have 3 chances to guess the number.");
      // Implement Hard level logic here
      break;
    case "4":
      console.log("Exiting the game. Goodbye!");
      break;
    default:
      console.log("Invalid selection. Please choose 1, 2, 3, or 4.");
      break;
  }
};

function startGame(): void {
  showMenu();
  rl.question("Enter your choice (1-4): ", (answer: string) => {
    handleResponse(answer);
    rl.close();
  });
}

startGame();