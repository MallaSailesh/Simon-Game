var buttonColours = ["red","blue","green","yellow"];
var gamePattern = []; 
var level = 0;
var started = false ;
var userClickedPattern ;
var index = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true ;
    }
});

// showing what is the next color in the sequence 
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

// detecting button press
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour); 
    checkAnswer(userChosenColour);
});

// checking if correct button was pressed or not
function checkAnswer(color) { 
    if(color != gamePattern[index]) {
        gameover();
        return ; 
    }
    index++;
    userClickedPattern.push(color);
    if(index === level){
        setTimeout(function(){
            index = 0;
            nextSequence();
        },1000);
    }
}

// game over 
function gameover(){
    $("body").addClass("game-over");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over !!! Press any letter to continue.");
    level = 0 ;
    started = false;
    gamePattern = [];
    index = 0 ; 
}

// play sound
function playSound(color){
    var audio = new Audio("sounds/"+color+'.mp3');
    audio.play();
}

// animation when button presses
function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}
