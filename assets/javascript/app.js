var correctGuess = 0;
var incorrectGuess = 0;
var timeouts = 0;
var currentQuestion = 0;
var game;
var remainingQuestions;
var activeQuestion = false;
var clock;
var timer = 30;

// Objects defining each game. All future topics and additional questions can easily be added using this template. Be sure to match variable name with the value attribute in HTML.
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
        fact: "The song has been re-recorded by no fewer than 40 artists since",
        picture: "assets/images/homealone.gif"
    }
],
    correctAnswers: ["Sleepy", "Brenda Lee"],
    css: "christmas.css",
    title: "<h1>Christmas Trivia!</h1>"
}

var footballGame = {
    questions: [
    {
        display: "Who is the NFL's all-time leader in rushing yards?",
        choice1: "Eric Dickerson",
        choice2: "Emmitt Smith",
        choice3: "Walter Payton",
        choice4: "Jim Brown",
        fact: "The Cowboys' legend rushed for 18,355 yards in his career, over 1,500 more than #2 on the list, Walter Payton",
        picture: "assets/images/emmitt.gif"
    },
    {
        display: "Who threw the touchdown pass for the legendary \"Philly Special\" play in Super Bowl LII?",
        choice1: "Nick Foles",
        choice2: "Nelson Agholor",
        choice3: "Corey Clement",
        choice4: "Trey Burton",
        fact: "The play gave the Eagles a 22-12 lead en route to their 41-33 victory",
        picture: "assets/images/phillyspecial.gif"
    }
],
    correctAnswers: ["Emmitt Smith", "Trey Burton"],
    css: "football.css",
    title: "<h1>Football Trivia!</h1>"
}

$(document).ready(function(){
    
    // Start game when dropdown is selected, assign the correct set of properties to the game variable
    $(".selector").on("click", function(){
        game = eval($(this).attr("value"));
        loadcssFile();
        startGame();
    })
    
    // Execute for correct and incorrect selections, only while a question is active to prevent errant clicks in between questions from causing problems
    $(".option").on("click", function(){
    if (activeQuestion) {  
        clearInterval(clock);  
        remainingQuestions--;
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
            $("#question").html("Wrong! The correct answer was " + game.correctAnswers[currentQuestion]);
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

// Start of game resetting variables
function startGame() {
    correctGuess = 0;
    incorrectGuess = 0;
    timeouts = 0;
    currentQuestion = 0;
    remainingQuestions = game.questions.length;
    console.log(remainingQuestions);

    $("#timebox").html("Time Remaining: <span id=\"timer\">30</span> Seconds");
    $("#welcome").empty();
    $("#topics").hide();
    $("#question").empty();
    $("#gameTitle").html(game.title);
    nextQuestion();
  }

  // Function for loading appropriate CSS file
  function loadcssFile() {
    $("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"assets/css/" + game.css + "\">");
    console.log(game.css);
  }

  // Advance to next question. If no questions remaining, execute end of game function.
function nextQuestion() {
    if (remainingQuestions == 0) {
        endGame();
    }
    else {
    activeQuestion = true;
    $("#question").html(game.questions[currentQuestion].display);
    $("#choice1").html(game.questions[currentQuestion].choice1).attr("value", game.questions[currentQuestion].choice1);
    $("#choice2").html(game.questions[currentQuestion].choice2).attr("value", game.questions[currentQuestion].choice2);
    $("#choice3").html(game.questions[currentQuestion].choice3).attr("value", game.questions[currentQuestion].choice3);
    $("#choice4").html(game.questions[currentQuestion].choice4).attr("value", game.questions[currentQuestion].choice4);
    startTimer();
  }
}

// End game function, display results and show topic selector
function endGame() {
    $("#question").html("That's it! Try another topic!");
    $("#choice1").html("You got " + correctGuess + " right");
    $("#choice2").html("You got " + incorrectGuess + " wrong");
    $("#choice3").html("You timed out " + timeouts + " times");
    $("#topics").show();
    $("#timebox").empty();
}

function startTimer() {
    timer = 30;
    clock = setInterval(count, 1000);
}

function count() {
    if (timer > 0) {
    timer--;
    $("#timer").html(timer);
    }
    if (timer == 0) {
        clearInterval(clock);
        timeouts++;
        remainingQuestions--;
        $("#question").html("Out of time! The correct answer was " + game.correctAnswers[currentQuestion]);
        $(".option").empty();
        $("#choice1").html(game.questions[currentQuestion].fact);
        $("#choice2").html("<img src=" + game.questions[currentQuestion].picture + ">");
        activeQuestion = false;
        currentQuestion++;
        setTimeout(nextQuestion, 5000);
    }
}

