var gamePattern = [];
var userClickedPattern = [];

let gameStarted = false;
let game_over = false;

var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

// Start the Game
$(document).keypress(function () {
     if (!gameStarted) {
          $("h1").text("Level 0");
          gameStarted = true;
          nextSequence();
          console.log('Game started...');
     }
});

// Click event for buttons
$('.btn').click(function () {
     var userChosenColour = this.id;

     animatePress(userChosenColour);

     playSound(`${userChosenColour}.mp3`); // Triggered sound

     userClickedPattern.push(userChosenColour);

     if(userClickedPattern.length < gamePattern.length){
          checkAnswer(userChosenColour);
     }else{
          userClickedPattern = [];
          if(!game_over){
               nextSequence();
          }else{
               console.log('Game Over!');
               startOver();
          }
     }
});

function nextSequence() {
     var randomNumber = Math.floor(Math.random() * 4);
     var randomChosenColour = buttonColours[randomNumber];

     gamePattern.push(randomChosenColour); // Add sequence inside game pattern

     $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // Flash the button

     playSound(`${randomChosenColour}.mp3`); // Triggered sound

     level++; // Upgrading level
     $("h1").text(`Level ${level}`);

     userClickedPattern = [];
};

function startOver(){
     playSound('wrong.mp3');
     $("h1").text('Game Over, Press Any Key to Restart');
     gameStarted = false;
     level = 0;
     gamePattern = [];
     game_over = false;

     $('body').addClass('game-over');
     setTimeout(function () {
          $('body').removeClass('game-over');
     }, 200);
}

function checkAnswer(currentLevel){
     if(gamePattern[userClickedPattern.length-1] === currentLevel){
          console.log('passed');
     }else{
          game_over = true;
          startOver();
     }
};

function playSound(name) {
     var audio = new Audio('./sounds/' + name);
     audio.play();
};

function animatePress(currentColour) {
     $(`#${currentColour}`).addClass('pressed');

     setTimeout(function () {
          $(`#${currentColour}`).removeClass('pressed');
     }, 100);
}