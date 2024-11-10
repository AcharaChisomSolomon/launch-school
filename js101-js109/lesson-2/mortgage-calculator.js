const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' ||
    Number(number) < 0 ||
    Number.isNaN(Number(number));
}

function getValidInput(promptMessage) {
  prompt(promptMessage);
  let input = readline.question();
  while (invalidNumber(input)) {
    prompt("Must enter a positive number.");
    input = readline.question();
  }
  return input;
}

while (true) {
  console.clear();

  prompt('Welcome to the Mortgage Calculator!');

  let loanAmount = getValidInput("What's the loan amount?");
  let apr = getValidInput("What's the Annual Percentage Rate (APR)? (e.g. 5 for 5%)");
  let loanDuration = getValidInput("What's the loan duration (in years)?");

  let monthlyInterestRate = (apr / 100) / 12;
  let loanDurationMonths = loanDuration * 12;

  let monthlyPayment = loanAmount * (monthlyInterestRate /
  (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))));

  console.log(`Your monthly payment is: $${monthlyPayment.toFixed(2)}`);

  prompt('Would you like to perform another calculation? (y/n)');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;
}