// An array of the alphabet
var letterOptions = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];


// Word choices
var wordChoices = ["brontosaurus", "echidna", "eagle", "dolphin", "cheetah", "rhinoceros"]

// Variables to hold game score, guesses, etc.
var wins = 0;
var guessesLeft = 12;
var guessesSoFar = []; //Shows guesses on the page
var userProgress = []; //Shows progress on the page, in order
var wordGuess;

function reset() {
guessesLeft = 12;
guessesSoFar = [];
userProgress = [];
};

// Computer guesses a random word
function changeWordGuess() {
  wordGuess = wordChoices[Math.floor(Math.random() * wordChoices.length)];
  console.log("wordGuess: " + wordGuess);
  for (var i = 0; i < wordGuess.length; i++) {
        userProgress.push(" _____ ");
      };
  var guessesSoFar = [];
};

//Populate page w/ score
function updatePage() {
  var currentWord = document.getElementById("current-word");
  currentWord.innerHTML = "Current word:  ";
  for (var i = 0; i < userProgress.length; i++) {
      var progressHTML = document.createElement("span");
      progressHTML.innerHTML = userProgress[i];
      currentWord.appendChild(progressHTML);
    };
};

//Check guesses against the page
function matchingLetters(s, s2, val) {
  for(var b = 0; b < s.length; b++){
    if (s[b] == val){
      s2.splice(b, 1, val);
    };
  }; 
};

changeWordGuess();
updatePage();


//Compares user guess against computer word


// Begins the game function
document.onkeyup = function(event) {

  // Only accept key presses in alphabet
  var userGuess = event.key;
  var userGuess = userGuess.toLowerCase();


  if (letterOptions.indexOf(userGuess) >= 0) {
    if (guessesSoFar.indexOf(userGuess) < 0) {

      guessesSoFar.push(userGuess);
      matchingLetters(wordGuess, userProgress, userGuess);
      updatePage();
      
      //Game logic

      if (userProgress.join('') == wordGuess.toString()) {
        wins++;
        reset();
        changeWordGuess();
        updatePage();
      }

      else if (userProgress.join('') != wordGuess && guessesLeft > 1 && wordGuess.includes(userGuess) === false){
        guessesLeft--;
      }

      else if (userProgress.join('') != wordGuess.toString() && guessesLeft == 1){
        reset();
        changeWordGuess();
        updatePage();
      };

      //logging guesses
      console.log("userGuess: " + userGuess);

      //Updating the page
      document.querySelector("#wins").innerHTML = wins;
      document.querySelector("#gueses-left").innerHTML = guessesLeft;
      document.querySelector("#user-guess").innerHTML = guessesSoFar;    

      

       };
    };
  };