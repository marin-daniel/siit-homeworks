function choiceGenerator(){
  let choice = Math.random();
  if (choice < 0.34) {
    choice = 'rock';
  } else if (choice <= 0.67) {
    choice = 'paper';
  } else {
    choice = 'scissor';
  }
  return choice;
}

function play() {
  //let userChoice = prompt('Enter choice:') //uncomment for user input choice
  let computerChoice = choiceGenerator(); 
  let userChoice = choiceGenerator(); //comment if user input choice option is selected
  console.log('User choice is ' + userChoice.toUpperCase() + '\nComputer choice is ' + computerChoice.toUpperCase());
  if (userChoice === computerChoice) {
    return 'TIE';
  }

  if (userChoice === 'rock') {
    if (computerChoice === 'scissor') {
      return 'User wins!!!';
    }
    else {
      return 'Computer wins!!!';
    }
  }

  if (userChoice === 'paper') {
    if (computerChoice === 'rock') {
      return 'User wins!!!';
    }
    else {
      return 'Computer wins!!!';
    }
  }

  if (userChoice === 'scissor') {
    if (computerChoice === 'paper') {
      return 'User wins!!!';
    }
    else {
      return 'Computer wins!!!';
    }
  }
  
}
console.log(play());