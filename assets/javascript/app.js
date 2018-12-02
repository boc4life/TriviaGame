var correctGuess = 0;
var incorrectGuess = 0;
var timeoutGuess = 0;
var currentQuestion = 0;

var game = {
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
    correctAnswers: ["Sleepy", "Brenda Lee"]
}
  $(document).ready(function(){
    $("#question").on("click", function(){
        startGame();
    })
  })

  function startGame() {
    correctGuess = 0;
    incorrectGuess = 0;
    timeoutGuess = 0;
    currentQuestion = 0;

    $("#welcome").empty();
    $("#question").html(game.questions[currentQuestion].display);
    $("#choice1").html(game.questions[currentQuestion].choice1).attr("value", game.questions[currentQuestion].choice1);
    $("#choice2").html(game.questions[currentQuestion].choice2).attr("value", game.questions[currentQuestion].choice2);
    $("#choice3").html(game.questions[currentQuestion].choice3).attr("value", game.questions[currentQuestion].choice3);
    $("#choice4").html(game.questions[currentQuestion].choice4).attr("value", game.questions[currentQuestion].choice4);

    $(".option").on("click", function(){
        selectedAnswer = $(this).text();
        if (selectedAnswer == game.correctAnswers[currentQuestion]) {
            alert("Correct!");
            correctGuess++;
            $("#question").html("Correct!");
            $(".option").empty();
            $("#choice1").html(game.questions[currentQuestion].fact);
            $("#choice2").html("<img src=" + game.questions[currentQuestion].picture + ">")
        }
        else {
            alert("Sorry, incorrect")
            incorrectGuess++;
        }
    })
  }