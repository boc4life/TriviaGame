var correctGuess = 0;
var incorrectGuess = 0;
var timeoutGuess = 0;
var currentQuestion = 0;
var game;
var remainingQuestions = 0;
var activeQuestion = false;

var christmasGame = {
    questions: [
    {
        display: "Which of the following is NOT one of Santa's Reindeer?",
        choice1: "Rudolph",
        choice2: "Vixen",
        choice3: "Sleepy",
        choice4: "Cupid",
        fact: "Sleepy is one of Snow White's 7 Dwarfs",
        picture: "assets/images/sleepy.jpg"
    },
    {
        display: "Which singer recorded the 1958 Christmas classic Rockin' Around The Christmas Tree?",
        choice1: "Brenda Lee",
        choice2: "Nancy Sinatra",
        choice3: "Billie Holliday",
        choice4: "Dolly Parton",
        picture: ""
    }
],
    correctAnswers: ["Sleepy", "Brenda Lee"],
    css: "",
    title: "<h1>Christmas Trivia!</h1>"
}

$(document).ready(function(){
    
    // Start game when dropdown is selected, assign the correct set of properties to the game variable
    $(".selector").on("click", function(){
        game = eval($(this).attr("value"));
        startGame();
    })
    
    // Execute for correct and incorrect selections, only while a question is active to prevent errant clicks in between questions from causing problems
    $(".option").on("click", function(){
    if (activeQuestion) {    
        remainingQuestions--;
        console.log(remainingQuestions);
        selectedAnswer = $(this).text();
        if (selectedAnswer == game.correctAnswers[currentQuestion]) {
            correctGuess++;
            $("#question").html("Correct!");
            $(".option").empty();
            $("#choice1").html(game.questions[currentQuestion].fact);
            $("#choice2").html("<img src=" + game.questions[currentQuestion].picture + ">");
        }
        else {
            incorrectGuess++;
            $("#question").html("Wrong!");
            $(".option").empty();
            $("#choice1").html(game.questions[currentQuestion].fact);
            $("#choice2").html("<img src=" + game.questions[currentQuestion].picture + ">");
        }
        activeQuestion = false;
        currentQuestion++;
        setTimeout(nextQuestion, 5000);
    }
    })

    
  })


function startGame() {
    correctGuess = 0;
    incorrectGuess = 0;
    timeoutGuess = 0;
    currentQuestion = 0;
    remainingQuestions = game.questions.length;
    console.log(remainingQuestions);

    $("#timebox").html("Time Remaining: <span id=\"timer\">30</span> Seconds");
    $("#welcome").empty();
    $("#topics").empty();
    $("#question").empty();
    $("#gameTitle").html(game.title);
    nextQuestion();
  }

  // Advance to next question. If no questions remaining, execute end of game function.
function nextQuestion() {
    if (remainingQuestions = 0) {
        endGame();
    }
    else {
    activeQuestion = true;
    $("#question").html(game.questions[currentQuestion].display);
    $("#choice1").html(game.questions[currentQuestion].choice1).attr("value", game.questions[currentQuestion].choice1);
    $("#choice2").html(game.questions[currentQuestion].choice2).attr("value", game.questions[currentQuestion].choice2);
    $("#choice3").html(game.questions[currentQuestion].choice3).attr("value", game.questions[currentQuestion].choice3);
    $("#choice4").html(game.questions[currentQuestion].choice4).attr("value", game.questions[currentQuestion].choice4);
    // startTimer();
    console.log(activeQuestion);
  }
}



