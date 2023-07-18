
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress( function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);

}

$(".btn").click( function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAns(userClickedPattern.length-1);

});

function checkAns(currentLevel){

    if( gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if( gamePattern.length=== userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");

        $("h1").text("Game Over, press any key to restart.");
        $("body").addClass("game-over");

        setTimeout( function(){
            $("body").removeClass("game-over");
        },300);

        startOver();
    }
}


function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}