/* =========================================================================
 * Identifying different DOM elements
 * ========================================================================= */

// identifying the button inputs for selecting the difficulty bt ID
// specifically since its the most important question
var difficultyEasy = document.querySelector("#dif-easy");
var difficultyIntermediate = document.querySelector("#dif-med");
var difficultyHard = document.querySelector("#dif-hrd");
var difficultyExpert = document.querySelector("#dif-expert");
// any radio button on any queston card
var answerBtn = document.querySelectorAll(".choice");

// minutes and seconds for the count down timer of the game
var cdMins = document.querySelector("#minutes");
var cdSecs = document.querySelector("#seconds");

// the score being kept as the game plays (the element on the page);
var playerScore = document.querySelector("#correct");

/* =========================================================================
 * Global scope variable declarations
 * ========================================================================= */

// just starting values holding the score, penalty, and time
var currentScore = 0;
var minsRemaining = 0;
var secondsRemaining = 1;
var timePenalty = 0;

// giving the active question a zero index for the difficulty selection card
var activeQuestion = 0; //passing this into several functions as "currentQ"

/* =========================================================================
 * Library of questions and answers as objects
 * ========================================================================= */

var quizQuestion0 = {
    question: "HTML: What does the \"Title\" tag inside the \"head\" tag of an HTML file do?",
    answers: ["Acts as a header", "Names the HTML file", "Displays in the browser tab", "Displays at the top of the page"],
    correctAnswer: 2 // index #
};

var quizQuestion1 = {
    question: "HTML: Which one of these is NOT a self closing tag?",
    answers: ["img", "link", "br", "script"],
    correctAnswer: 3 // index #
};

var quizQuestion2 = {
    question: "HTML: Which of these tags has a default \"display\" property of \"inline\"?",
    answers: ["img - Image", "h1 - Header Level 1", "p - Paragraph", "ol - Ordered List"],
    correctAnswer: 0 // index #
};

var quizQuestion3 = {
    question: "HTML: What is the attribute name for \"img\" tags that is used to help screen readers understand an image's content?",
    answers: ["caption", "description", "alt", "desc"],
    correctAnswer: 2 // index #
};

var quizQuestion4 = {
    question: "CSS: Which of the following is NOT a valid way to define a color?",
    answers: ["#a1b2c3", "cmky(40, 45, 33, 10)", "rgba(200, 15, 33, 1)", "hsl(128, 88, 44)"],
    correctAnswer: 1 // index #
};

var quizQuestion5 = {
    question: "CSS: What is the name of a stylesheet to remove default HTML styling?",
    answers: ["clear-all.css", "remove.css", "blank-slate.css", "reset.css"],
    correctAnswer: 3 // index #
};

var quizQuestion6 = {
    question: "CSS: What are the default values for a \"dispay: flex\" in terms of \"flex-direction\", \"flax-wrap\", \"justify-content\", and \"align-items\"?",
    answers: ["row nowrap flex-start stretch", "row wrap space-around center", "column nowrap space-between flex-end", "column-reverse wrap flex-end flex-start"],
    correctAnswer: 0 // index #
};

var quizQuestion7 = {
    question: "CSS: Which part of the \"box model\" acts as a force-field to keep elements of the page spaced apart?",
    answers: ["content", "padding", "border", "margin"],
    correctAnswer: 3 // index #
};

var quizQuestion8 = {
    question: "Javascript: What is the format to begin a for loop that will repeat 10 times?",
    answers: ["for.loop=repeat(10){}", "for (i=10) {}", "for (i=0; i <10; i++) {}", "for (i++ <=10) {}"],
    correctAnswer: 2 // index #
};

var quizQuestion9 = {
    question: "Javascript: What method would we use to register a click on a webpage?",
    answers: [".registerClick()", ".addEventListener()", "if (clicked = true) {}", "if (button.active = true) {}"],
    correctAnswer: 1 // index #
};

var quizQuestion10 = {
    question: "Javascript: Which of these is NOT a way to target elements from the DOM (document object model)?",
    answers: [".document.grabElement()", ".document.querySelector()", ".document.getElementById()", ".document.querySelectorAll()"],
    correctAnswer: 0 // index #
};

var quizQuestion11 = {
    question: "Javascript: Which of these is NOT a valid datatype?",
    answers: ["number", "boolean", "case", "object"],
    correctAnswer: 2 // index #
};

// array of the defined objects above
questionSequence = [
    quizQuestion0,
    quizQuestion1,
    quizQuestion2,
    quizQuestion3,
    quizQuestion4,
    quizQuestion5,
    quizQuestion6,
    quizQuestion7,
    quizQuestion8,
    quizQuestion9,
    quizQuestion10,
    quizQuestion11 ];

/* =========================================================================
 * Function Definitions
 * ========================================================================= */

// a function to shuffle the array of objects that are the quiz questions
// the idea here is that players cannot simply memorize which radio buttons
// to press in a particular order ot cheat the high score
function randomizeQuestions(inputArray) {
    // creating an empty array to hold the random results as they are plucked
    // from the array going into the function
    console.log("I'm shuffling");
    var deconstructedArray = inputArray;
    console.log("the input array length is " + inputArray.length);
    var tempHoldingArray = [];
    // a for loop will cycle through the whole array pulling a random element
    // one at a time
    for (i=0; i < 12; i++) {
        // work with the whole array on the first iteration, but reduce the
        // working range with each iteration
        // using Javascript's math methods to pick a number in the array's
        // index range.
        var randomNumber = Math.floor(Math.random() * deconstructedArray.length);
        // grab that random object and remember it
        var objectToPull = deconstructedArray[randomNumber];
        console.log(objectToPull);
        // take that object out of the input array, 2nd paramter says to just pull 1 object
        deconstructedArray.splice(randomNumber, 1);
        // add it to the local scope variable holding array
        tempHoldingArray.push(objectToPull);
        } // end for loop
        console.log("shuffle completed");
        // remove the object from the front of the list (12 - 1 = 11)
        tempHoldingArray.shift();
        // remove the last object (11 - 1 = 10)
        tempHoldingArray.pop();
        // spit out the new array, these are the 10 quick questions and
        // the order they wil display on this playthrough the game
        console.log("The shuffled array has " + tempHoldingArray.length + " objects.");
        // output the shuffled array to the variable calling the function
        return tempHoldingArray;
    }

    function populatePage(inputArray) {
        // once for each element in the array
        for (i = 0; i < inputArray.length; i++) {
            // grab the HTML element for asking the question
            var questionText = document.getElementById("q" + (i) + "Text");
            // for the first radio button label
            var questionOption1 = document.getElementById("q" + (i) + "O0label");
            // for the second radio button label
            var questionOption2 = document.getElementById("q" + (i) + "O1label");
            // for the third radio button label
            var questionOption3 = document.getElementById("q" + (i) + "O2label");
            // for the fourth radio button label
            var questionOption4 = document.getElementById("q" + (i) + "O3label");
            // put the question on the page
            questionText.textContent= inputArray[i].question;
            // put the answer option 1 on the page
            questionOption1.textContent = inputArray[i].answers[0];
            // put the answer option 2 on the page
            questionOption2.textContent = inputArray[i].answers[1];
            // put the answer option 3 on the page
            questionOption3.textContent = inputArray[i].answers[2];
            // put the answer option 4 on the page
            questionOption4.textContent = inputArray[i].answers[3];
            // call out the radio buttons for these answers
            var questionOptionBtn1 = document.getElementById("q" + (i) + "O0");
            var questionOptionBtn2 = document.getElementById("q" + (i) + "O1");
            var questionOptionBtn3 = document.getElementById("q" + (i) + "O2");
            var questionOptionBtn4 = document.getElementById("q" + (i) + "O3");
            // assign correct answers to each form
            var thisAnswer = inputArray[i].correctAnswer;
            // give the button a class of correct
            if (thisAnswer === 0) {
                questionOptionBtn1.setAttribute("class", "choice correct");
            } else if (thisAnswer === 1) {
                questionOptionBtn2.setAttribute("class", "choice correct");
            } else if (thisAnswer === 2) {
                questionOptionBtn3.setAttribute("class", "choice correct");
            } else if (thisAnswer === 3) {
                questionOptionBtn4.setAttribute("class", "choice correct");
            }
        }
    }

// starts the game timer
function countDownTime () {
    // uses the set interval function
    var gameClock = setInterval(function () {
        // our parameter 1 callback function takes away 1 from
        // the variable holding our seconds time value
        secondsRemaining--;
        // updates the HTML element to reflect the new clock display
        cdSecs.textContent = secondsRemaining;
        // this if statement preserves the 0:00 3 digit M:SS formatting
        // by keeping a leading zero in front of single digit numbers
        if (secondsRemaining < 10 ){
            // the leading zero is put on the page as a string
            cdSecs.textContent = "0" + secondsRemaining;
        }

        // this if statement reduces the 1 minute to zero and starts the
        // seconds at 59 for starting times greater than 1 minute
        if (secondsRemaining === 0 && minsRemaining > 0) {
            secondsRemaining = 59;
            minsRemaining = 0;
            cdMins.textContent = "0";
            cdSecs.textContent = secondsRemaining;
        }
        // this if statement launches the game end sequence by recognizing
        // that the timer is completely depleted
        if (secondsRemaining <= 0 && minsRemaining === 0) {
            // stop reducing the time
            clearInterval(gameClock);
            // the game is over TODO: write the endGame() function
            endGame();            
        }
    }, 1000)
}

// this updates the question the player is looking at
function advanceFromStart () {
    console.log("advancing from welcome page");
    // grab the current question card that has an active class
    var currentQuestion = document.querySelector(".active");
    // look for the next one on the queue
    var nextQuestion = document.querySelector(".queued");
    // strip the active class attribute from the current question
    currentQuestion.setAttribute("class", "game-card");
    // give it to the card that WAS in the queue before this function was called
    nextQuestion.setAttribute("class", "game-card active");
    // queue up the 2nd question (with an index offset of -1)
    var questionToQueue = document.getElementById("question-1");
    questionToQueue.setAttribute("class", "game-card queued");
}

// this updates the question the player is looking at
function advanceQuestion (currentQ) {
    console.log("advancing from question " + activeQuestion);
    // grab the current question card that has an active class
    var currentQuestion = document.querySelector(".active");
    // look for the next one on the queue
    var nextQuestion = document.querySelector(".queued");
    // strip the active class attribute from the current question
    currentQuestion.setAttribute("class", "game-card");
    // give it to the card that WAS in the queue before this function was called
    nextQuestion.setAttribute("class", "game-card active");
    // check to see if this was the last question
    if (currentQ !== 9) {
        // since it is not, lets look at the next question (the +1 is looking
        // one question ahead, that is why we need the current question plus ONE
        var questionToQueue = document.querySelector("#question-" + (currentQ + 1));
        //give the next question the queued class
        questionToQueue.setAttribute("class", "game-card queued");
        // increase the count on the variable keeping track of this
        ++activeQuestion;
    } else {
        // there are no more questions to answer so the game is over
        // TODO: write the endGame function
        endGame();
    };
}

function answerQuestion () {
    var answerCorrectly = false;
    
    for (i=0; i < 4; i++) {
        inputString = "q" + activeQuestion + "O" + (i);
        var currentSubmission = document.getElementById(inputString);
        //var currentSubmission = document.getElementById(inputString);
        if (currentSubmission.checked === true) {
            console.log(document.getElementById(inputString).getAttribute("class"));
            if (document.getElementById(inputString).getAttribute("class") == "correct") {
                answerCorrectly = true;
                currentScore += 10;
                playerScore.textContent = currentScore;
                advanceQuestion(currentQ);
                return;
            }
        }
    }
    if (answerCorrectly === false) {
        if (secondsRemaining > timePenalty) {
            secondsRemaining -= timePenalty;
            cdSecs.textContent = secondsRemaining;
            advanceQuestion(activeQuestion);
        } else if (minsRemaining === 1) {
            difference = timePenalty - secondsRemaining;
            minsRemaining = 0;
            cdMins.textContent = minsRemaining;
            secondsRemaining = 60 - difference;
            cdSecs.textContent = secondsRemaining;
            advanceQuestion(activeQuestion);
        } else {
            endGame();
        }
    }
};

function endGame() {
    // TODO: create score page, save the scores to local storage
    window.location.href = "./scores.html";
}

/* =========================================================================
 * Active Event Listeners
 * ========================================================================= */

//looking for answer submissions
for (var buttons of answerBtn){
    buttons.addEventListener("click", function (answerQuestion) {
    });
};

// if the players wants to play on easy
difficultyEasy.addEventListener("click", function () {
    // just keeping track of inputs
    console.log("Easy");
    // setting the time penalty
    timePenalty = 3;
    // setting the minute number on the clock
    minsRemaining = 1;
    // setting the seconds counter on the clock
    secondsRemaining = 59;
    // updating the page content to reflect the clock
    cdMins.textContent = minsRemaining + ":";
    cdSecs.textContent = secondsRemaining;
    // start counting down
    countDownTime();
    // and go to the first question
    advanceFromStart ();
});

// same as easy but for intermediate
difficultyIntermediate.addEventListener("click", function () {
    console.log("Intermediate");
    timePenalty = 5;
    minsRemaining = 1;
    secondsRemaining = 45;
    cdMins.textContent = minsRemaining + ":"
    cdSecs.textContent = secondsRemaining;
    countDownTime();
    advanceFromStart ();
});

// same as easy but for hard
difficultyHard.addEventListener("click", function () {
    console.log("Hard");
    timePenalty = 5;
    minsRemaining = 1;
    secondsRemaining = 15;
    cdMins.textContent = minsRemaining + ":"
    cdSecs.textContent = secondsRemaining;
    countDownTime();
    advanceFromStart ();
});

// same as easy but for expert
difficultyExpert.addEventListener("click", function () {
    console.log("Expert");
    timePenalty = 5;
    minsRemaining = 0;
    secondsRemaining = 50;
    cdMins.textContent = minsRemaining + ":"
    cdSecs.textContent = secondsRemaining;
    countDownTime();
    advanceFromStart ();
});

// we pass our original question list of 12 objects through the randomizer function
shuffledSequence = randomizeQuestions(questionSequence);
// runs the above defined function to get our onto the page
populatePage(shuffledSequence);