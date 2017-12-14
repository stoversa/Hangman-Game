// An array of the alphabet
var letterOptions = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

// Word choices
var wordChoices = ["brontosaurus", "echidna", "eagle", "dolphin", "cheetah", "rhinoceros", "panda", "orangutan"]

//
var images = {
    "brontosaurus": "https://media.wired.com/photos/59372fdebef1fc4e58f9487e/master/w_1800,c_limit/165517482-wide.jpg", 
    "echidna": "https://media.wired.com/photos/593252584dc9b45ccec5d393/master/w_1280,c_limit/Echidna_Tachyglossus_aculeatus_setosus_3.jpg", 
    "eagle": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Golden_Eagle_in_flight_-_5.jpg", 
    "dolphin": "https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Animals/A-G/dolphin-communication.ngsversion.1398178097406.adapt.1900.1.jpg", 
    "cheetah": "https://upload.wikimedia.org/wikipedia/commons/1/11/Cheetah_Kruger.jpg", 
    "rhinoceros": "https://defenders.org/sites/default/files/styles/homepage-feature-2015/public/rhinoceros-guy-standen-dpc.jpg?itok=AFO12Sre", 
    "panda": "https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg",
    "orangutan": "https://nationalzoo.si.edu/sites/default/files/styles/slide_1400x700/public/animals/orangutan-002.jpg?itok=Yn7tWck0"
  };

var noises = {
    "brontosaurus": "http://lotl.popapostle.com/sounds/LOTL09/roar.wav", 
    "echidna": "http://sep800.mine.nu/files/sounds/mousesqueak.wav", 
    "eagle": "http://www.birding.dk/galleri/stemmermp3/Haliaeetus%20albicilla%201.mp3", 
    "dolphin": "http://www.greatbluemarble.com/dolphin_Sound.wav", 
    "cheetah": "http://www.geolution.nl/dieren/dierengeluiden/download/cheetah.wav", 
    "rhinoceros": "http://www.externalharddrive.com/waves/animal/rhino.wav", 
    "panda": "http://www.billybear4kids.com/animal/sounds/panda.wav",
    "orangutan": "http://web.tiscali.it/gherda-wolit/versi/scimmia2.wav"
  };

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

function showImg(str, str2) {
    var insertHere = document.getElementById("image");
    var x = document.createElement("img");
    x.setAttribute("src", str2);
    x.setAttribute("width", "200");
    x.setAttribute("height", "200");
    insertHere.innerHTML = '<h2>' + str + '!</h2>';
    insertHere.appendChild(x);
  };

function playAudio(noise){
    var audio = new Audio(noise);
    audio.play();
}

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
        showImg(wordGuess, images[wordGuess]);
        playAudio(noises[wordGuess]);
        playAudio();
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