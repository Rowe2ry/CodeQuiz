/* =========================================================================
 * Identifying different DOM elements
 * ========================================================================= */

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
    answers = ["Acts as a header", "Names the HTML file", "Displays in the browser tab", "Displays at the top of the page"],
    correctAnswer: 2
};

var quizQuestion2 = {
    question: "HTML: Which one of these is NOT a self closing tag?",
    answers = ["img", "link", "br", "script"],
    correctAnswer: 3
};

var quizQuestion3 = {
    question: "HTML: Which of these tags has a default \"display\" property of \"inline\"?",
    answers = ["img - Image", "h1 - Header Level 1", "p - Paragraph", "ol - Ordered List"],
    correctAnswer: 0
};

var quizQuestion4 = {
    question: "HTML: What is the attribute name for \"img\" tags that is used to help screen readers understand an image's content?",
    answers = ["caption", "description", "alt", "desc"],
    correctAnswer: 2
};

var quizQuestion5 = {
    question: "CSS: Which of the following is NOT a valid way to define a color?",
    answers = ["#a1b2c3", "cmky(40, 45, 33, 10)", "rgba(200, 15, 33, 1)", "hsl(128, 88, 44)"],
    correctAnswer: 1
};

var quizQuestion6 = {
    question: "CSS: What is the name of a stylesheet to remove default HTML styling?",
    answers = ["clear-all.css", "remove.css", "blank-slate.css", "reset.css"],
    correctAnswer: 3
};

var quizQuestion7 = {
    question: "CSS: What are the default values for a \"dispay: flex\" in terms of \"flex-direction\", \"flax-wrap\", \"justify-content\", and \"align-items\"?",
    answers = ["row nowrap flex-start stretch", "row wrap space-around cener", "column nowrap space-between flex-end", "column-reverse wrap flex-end flex-start"],
    correctAnswer: 0
};

var quizQuestion7 = {
    question: "CSS: What are the default values for a \"dispay: flex\" in terms of \"flex-direction\", \"flax-wrap\", \"justify-content\", and \"align-items\"?",
    answers = ["row nowrap flex-start stretch", "row wrap space-around cener", "column nowrap space-between flex-end", "column-reverse wrap flex-end flex-start"],
    correctAnswer: 0
};