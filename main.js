// function that display nombers from 1 to 20
function displayNum(num){
    numArr = [];
    for (let i = 1; i <= num; i++){
      numArr.push(i);
    }
    return numArr;
  }
console.log(displayNum(20));
document.write(displayNum(20));
document.write('<br/>');


// function that display odd numbers ftom 1 to 20
function oddNumDisplay(num){
  oddNumArr = [];
  for (let i = 1; i <= num; i++){
    if (i % 2 !== 0){
      oddNumArr.push(i);
    }
  }
  return oddNumArr;
}
console.log(oddNumDisplay(20));
document.write(oddNumDisplay(20));
document.write('<br/>');

  
// function that calculates the sum of an array elemts
function arrSum(arrForSum){
  let sum = arrForSum [0];
  for (let i = 1; i <= arrForSum.length - 1; i++){
    sum += arrForSum[i];
  }
  return sum;
}
let arrForSum = [3, 6, 7, 9];
console.log(arrSum(arrForSum));
document.write(arrSum(arrForSum));
document.write('<br/>');

  
// function that display the maximum of an array elements
function arrMax(arrForMax){
  let max = arrForMax[0];
  for (let i = 1; i <= arrForMax.length - 1; i++){
    if (max < arrForMax[i]){
      max = arrForMax[i];
    }
  }
  return max;
}
let arrForMax = [3, 6, 7, 30];
console.log(arrMax(arrForMax));
document.write(arrMax(arrForMax));
document.write('<br/>');

// function that counts how many times an array element is present in the array  
function countItem(arrForCounting, item){
  let counter = 0;
  for (let i = 0; i <= arrForCounting.length - 1; i++){
    if (item === arrForCounting[i]){
      counter++
    }
  }
  return counter;
}
let arrForCounting = [4, 7 ,4, 9, 4, 'Daniel', 'Daniel'];
console.log('Your item apears ' + countItem(arrForCounting, 'Daniel') + ' times.');
document.write('Your item apears ' + countItem(arrForCounting, 'Daniel') + ' times.');
document.write('<br/>');
  

// function that return a patern
function paternArray(){
  let str = [];
  let str1 = [];
  let str2 = [];
  for (let i = 0; i <= 1; i++){
    for (let j = 0; j <= 1; j++){
      str1 = str1 + [j] + [' '];      
    }
    for (let k = 1; k >= 0; k--){
      str2 = str2 + [k] + [' '];      
    }     
  }
  str = str1 + ['\n'] + str2 + ['\n'] + str1 + ['\n'] + str2;
  return str;
}
console.log(paternArray());
document.write(paternArray());

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