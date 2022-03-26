/* =========================================================================
 * Identifying different DOM elements
 * ========================================================================= */
// identifying the form for selecting the difficulty
var difficultyEasy = document.querySelector("#dif-easy");
var difficultyIntermediate = document.querySelector("#dif-med");
var difficultyHard = document.querySelector("#dif-hrd");
var difficultyExpert = document.querySelector("#dif-expert");
// var countdownClock = document.querySelector(".game-clock");
var cdMins = document.querySelector("#minutes");
var cdSecs = document.querySelector("#seconds");
// var currentScore = document.querySelector(".current-score");
var playerScore = document.querySelector("#correct");

/* =========================================================================
 * Library of questions and answers
 * ========================================================================= */

var quizQuestion1 = {
    question: "HTML: What does the \"Title\" tag inside the \"head\" tag of an HTML file do?",
    answers: ["Acts as a header", "Names the HTML file", "Displays in the browser tab", "Displays at the top of the page"],
    correctAnswer: 2
};

var quizQuestion2 = {
    question: "HTML: Which one of these is NOT a self closing tag?",
    answers: ["img", "link", "br", "script"],
    correctAnswer: 3
};

var quizQuestion3 = {
    question: "HTML: Which of these tags has a default \"display\" property of \"inline\"?",
    answers: ["img - Image", "h1 - Header Level 1", "p - Paragraph", "ol - Ordered List"],
    correctAnswer: 0
};

var quizQuestion4 = {
    question: "HTML: What is the attribute name for \"img\" tags that is used to help screen readers understand an image's content?",
    answers: ["caption", "description", "alt", "desc"],
    correctAnswer: 2
};

var quizQuestion5 = {
    question: "CSS: Which of the following is NOT a valid way to define a color?",
    answers: ["#a1b2c3", "cmky(40, 45, 33, 10)", "rgba(200, 15, 33, 1)", "hsl(128, 88, 44)"],
    correctAnswer: 1
};

var quizQuestion6 = {
    question: "CSS: What is the name of a stylesheet to remove default HTML styling?",
    answers: ["clear-all.css", "remove.css", "blank-slate.css", "reset.css"],
    correctAnswer: 3
};

var quizQuestion7 = {
    question: "CSS: What are the default values for a \"dispay: flex\" in terms of \"flex-direction\", \"flax-wrap\", \"justify-content\", and \"align-items\"?",
    answers: ["row nowrap flex-start stretch", "row wrap space-around center", "column nowrap space-between flex-end", "column-reverse wrap flex-end flex-start"],
    correctAnswer: 0
};

var quizQuestion8 = {
    question: "CSS: Which part of the \"box model\" acts as a force-field to keep elements of the page spaced apart?",
    answers: ["content", "padding", "border", "margin"],
    correctAnswer: 3
};

var quizQuestion9 = {
    question: "Javascript: What is the format to begin a for loop that will repeat 10 times?",
    answers: ["for.loop=repeat(10){}", "for (i=10) {}", "for (i=0; i <10; i++) {}", "for (i++ <=10) {}"],
    correctAnswer: 2
};

var quizQuestion10 = {
    question: "Javascript: What method would we use to register a click on a webpage?",
    answers: [".registerClick()", ".addEventListener()", "if (clicked = true) {}", "if (button.active = true) {}"],
    correctAnswer: 1
};

var quizQuestion11 = {
    question: "Javascript: Which of these is NOT a way to target elements from the DOM (document object model)?",
    answers: [".document.grabElement()", ".document.querySelector()", ".document.getElementById()", ".document.querySelectorAll()"],
    correctAnswer: 0
};

var quizQuestion12 = {
    question: "Javascript: Which of these is NOT a valid datatype?",
    answers: ["number", "boolean", "case", "object"],
    correctAnswer: 2
};

function randomizeQuestions () {
    // TODO: plug in 10 of the above 12 questions onto the page in a random order
}

function countDownTime () {
    var gameClock = setInterval(function () {
        secondsRemaining--;
        cdSecs.textContent = secondsRemaining;
        if (secondsRemaining < 10 ){
            cdSecs.textContent = "0" + secondsRemaining;
        }
        if (secondsRemaining === 0 && minsRemaining > 0) {
            secondsRemaining = 59;
            minsRemaining = 0;
            cdMins.textContent = "";
            cdSecs.textContent = secondsRemaining;
        }
        if (secondsRemaining === 0 && minsRemaining === 0) {
            clearInterval(gameClock);
            endGame();            
        }
    }, 1000)

}

function advanceQuestion () {
    var currentQuestion = document.querySelector(".active");
    var nextQuestion = document.querySelector(".queued");
    var nextQuestionID = nextQuestion.getAttribute("id");
    currentQuestion.setAttribute("class", "game-card");
    nextQuestion.setAttribute("class", "game-card active");
    if (nextQuestionID == "question-1") {
        var questionToQueue = document.querySelector("#question-2");
        questionToQueue.setAttribute("class", "game-card queued");
    } else if (nextQuestionID == "question-2") {
        var questionToQueue = document.querySelector("#question-3");
        questionToQueue.setAttribute("class", "game-card queued");
    } else if (nextQuestionID == "question-3") {
        var questionToQueue = document.querySelector("#question-4");
        questionToQueue.setAttribute("class", "game-card queued");
    } else if (nextQuestionID == "question-4") {
        var questionToQueue = document.querySelector("#question-5");
        questionToQueue.setAttribute("class", "game-card queued");
    } else if (nextQuestionID == "question-5") {
        var questionToQueue = document.querySelector("#question-6");
        questionToQueue.setAttribute("class", "game-card queued");
    } else if (nextQuestionID == "question-6") {
        var questionToQueue = document.querySelector("#question-7");
        questionToQueue.setAttribute("class", "game-card queued");
    } else if (nextQuestionID == "question-7") {
        var questionToQueue = document.querySelector("#question-8");
        questionToQueue.setAttribute("class", "game-card queued");
    } else if (nextQuestionID == "question-8") {
        var questionToQueue = document.querySelector("#question-9");
        questionToQueue.setAttribute("class", "game-card queued");
    } else if (nextQuestionID == "question-9") {
        var questionToQueue = document.querySelector("#question-10");
        questionToQueue.setAttribute("class", "game-card queued");
    } else {
        endGame();
    };
}

function endGame() {
    // TODO: create score page, save the scores to local storage
    window.location.href = "./scores.html";
}

difficultyEasy.addEventListener("click", function () {
    console.log("Easy");
    timePenalty = 3;
    minsRemaining = 1;
    secondsRemaining = 59;
    cdMins.textContent = minsRemaining + ":";
    cdSecs.textContent = secondsRemaining;
    countDownTime();
    advanceQuestion();
});

difficultyIntermediate.addEventListener("click", function () {
    console.log("Intermediate");
    timePenalty = 5;
    minsRemaining = 1;
    secondsRemaining = 45;
    cdMins.textContent = minsRemaining + ":"
    cdSecs.textContent = secondsRemaining;
    countDownTime();
    advanceQuestion();
});

difficultyHard.addEventListener("click", function () {
    console.log("Hard");
    timePenalty = 5;
    minsRemaining = 1;
    secondsRemaining = 15;
    cdMins.textContent = minsRemaining + ":"
    cdSecs.textContent = secondsRemaining;
    countDownTime();
    advanceQuestion();
});

difficultyExpert.addEventListener("click", function () {
    console.log("Expert");
    timePenalty = 5;
    minsRemaining = 0;
    secondsRemaining = 50;
    cdMins.textContent = minsRemaining + ":"
    cdSecs.textContent = secondsRemaining;
    countDownTime();
    advanceQuestion();
});