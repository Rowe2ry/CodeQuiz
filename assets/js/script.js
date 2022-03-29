/* =========================================================================
 * Identifying different DOM elements
 * ========================================================================= */

// identifying the button inputs for selecting the difficulty bt ID
// specifically since its the most important question
var difficultyEasy = document.querySelector("#dif-easy");
var difficultyIntermediate = document.querySelector("#dif-med");
var difficultyHard = document.querySelector("#dif-hrd");
var difficultyExpert = document.querySelector("#dif-expert");
// any radio button on any question card returned as a node list 0-39
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
var activeQuestion = 0;
// this string is filled in when a difficulty is chosen
var gameMode = "";
// this is assigned when a difficulty is chosen, and is used to calculate
// how quickly the player completes the quiz
var allotedTime;
// used to calculate how quickly the player completes the quiz
var timeElapsed = 0;
// keeps track of player performance throughout the game
var finalScore = 0;
// when we get to the last question, this boolean stops the script
// from queuing the next question 
var lastQuestion = false;

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

// this updates the question the player is looking at from the start
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
function advanceQuestion () {
    console.log("advancing from question " + activeQuestion);
    // grab the current question card that has an active class
    var currentQuestion = document.querySelector(".active");
    // look for the next one on the queue
    var nextQuestion = document.querySelector(".queued");
    // strip the active class attribute from the current question
    currentQuestion.setAttribute("class", "game-card");
    // give active class to the card that WAS in the queue before this function was called
    if (lastQuestion == false) {
        nextQuestion.setAttribute("class", "game-card active");
    }
        // check to see if this was the last question
    if (activeQuestion != 8 && activeQuestion != 9) {
        // since it is not, lets look at the next question (the +2 is looking
        // one question ahead PLUS offsetting the zero(0) index,
        // that is why we need the current question plus two
        var questionToQueue = document.querySelector("#question-" + ((activeQuestion) + 2));
        //give the next question the queued class
        questionToQueue.setAttribute("class", "game-card queued");
        // increase the count on the variable keeping track of this
        ++activeQuestion;
    } else if (activeQuestion == 8) {
        console.log("last question");
        lastQuestion = true;
        activeQuestion = 9;
    } else if (activeQuestion == 9) {
        // there are no more questions to answer so the game is over
        endGame();
    };
}

// whenever one of the radio buttons is clicked...
function answerQuestion () {
    // establish a status for the if statement conditions failing to be met
    var answerCorrectly = false;
    
    // loop through the 4 radio buttons of the current question
    for (i=0; i < 4; i++) {
        // below returns for example "q0O0" for question zero Option zero
        inputString = "q" + activeQuestion + "O" + (i);
        // grab the radio button with the id of the string above
        var currentSubmission = document.getElementById(inputString);
        // see if this particular radio button was checked by the player
        if (currentSubmission.checked === true) {
            // yes they checked this one
            console.log(document.getElementById(inputString).getAttribute("class"));
            // if it was assigned a "class" attribute of "correct" by the page population
            if (document.getElementById(inputString).getAttribute("class") == "choice correct") {
                // lets let this function know that was good
                answerCorrectly = true;
                // add to the score
                currentScore += 10;
                // update the score displayed on the page
                playerScore.textContent = currentScore;
                // give some feedback to the log
                console.log("added 10 to score");
                // and go to the next question
                advanceQuestion();
                // stop checking radio buttons for this questions because we just found the correct one
                return;
            }
        }
    }
    // if none of the correct if statements above were triggered, the below conditional
    // should be met
    if (answerCorrectly === false) {
        // so long as we still have time to subtract from
        if (secondsRemaining > timePenalty) {
            // reduce that time by the penalty
            secondsRemaining -= timePenalty;
            // update the remaining time on the page
            cdSecs.textContent = secondsRemaining;
            // and go to the next question
            advanceQuestion();
            // if we are trying to remove more seconds than remain, but
            // we still have a full minute
        } else if (minsRemaining === 1) {
            // find out the difference between our penalty, and the seconds place
            difference = timePenalty - secondsRemaining;
            // take away the minute of time
            minsRemaining = 0;
            // update the page to reflect 0 minutes
            cdMins.textContent = minsRemaining;
            // remove the difference from a full 60 seconds
            secondsRemaining = 60 - difference;
            // update the secods on the page
            cdSecs.textContent = secondsRemaining;
            // and go to the next question
            advanceQuestion();
            // otherwise, you have tried to deduct time to some negative number
            // and are out of time so the game ends
        } else {
            endGame();
        }
    }
};

// when the game is over
function endGame() {
    // if they still have time when the game ends, they must have completed the quiz
    if (secondsRemaining > 0) {
        // checking to see if this is the first time the game has been won
        if (window.localStorage.getItem("timesPlayed") === null) {
            window.localStorage.setItem("timesPlayed", 0);
        }
        // update the number 
        var gameIteration = Number(window.localStorage.getItem("timesPlayed"));
        gameIteration++;
        window.localStorage.setItem("timesPlayed", gameIteration);
        /* =^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^
        * the code section between the =^= and =v= comment lines
        * is a date/tiome function taken from Stack overflow user
        * Mark Walters */
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
        // =v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v=v

        // grab the score
        finalScore = currentScore;
        // if we have a minute left, add the 60 seconds to how many seconds are on the clock
        if (minsRemaining ==1) {
            secondsRemaining = secondsRemaining + 60;
        };
        // subtract the starting time (in seconds) from the time left
        timeElapsed = allotedTime - secondsRemaining;
        
        // tell the user they won and get their information
        var winningMessage = window.prompt("Congratulations! \n You earned " + currentScore + " out of 100 points. \n While playing on " + gameMode + " in just " + timeElapsed + " seconds! \n Please enter your initials");
        // w asked the player for initials, so just grab 3 characters
        var playerInitials = winningMessage.slice(0,3);
        // store the information from the game in an object
        var winnerData = {
            initials: playerInitials,
            time2Complete: timeElapsed,
            difficulty: gameMode,
            time: datetime
        };
        // convert the object to a JSON string for storage
        winnerData = JSON.stringify(winnerData);
        // store the string under a new key each time (the winner and the play iteration)
        window.localStorage.setItem("winner" + gameIteration, winnerData);
    } else {
        // if they were out of time, they lost so let them know
        window.alert("Sorry, you lost this time ☹️");
    }
    // go view the high scores
    window.location.href = "./scores.html";
}

/* =========================================================================
 * Active Event Listeners
 * ========================================================================= */

//looking for answer submissions
// for statement adds event listeners to all radio buttons
/* for (var i; i < answerBtn.length; i++){
    answerBtn[i].addEventListener("click", function () {
        var submission = window.event;
        answerQuestion(submission);
    });
}; */

// I'm just making every single of the 40 radio buttons have
// event listeners
// I'll just say, I tried this as a "for" loop and had trouble
// I might refactor later but this worked after hours of debugging
// so I just wanted to leave these next 159 lines as-is
answerBtn[0].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[1].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[2].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[3].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[4].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[5].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[6].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[7].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[8].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[9].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[10].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[11].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[12].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[13].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[14].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[15].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[16].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[17].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[18].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[19].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[20].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[21].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[22].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[23].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[24].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[25].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[26].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[27].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[28].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[29].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[30].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[31].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[32].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[33].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[34].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[35].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[36].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[37].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[38].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});
answerBtn[39].addEventListener("click", function () {
    var submission = window.event;
    answerQuestion(submission);
});


// if the players wants to play on easy
difficultyEasy.addEventListener("click", function () {
    // just keeping track of inputs
    console.log("Easy");
    // logging the game mode into a variable
    gameMode = "Easy";
    // taking note of how much time the player gets in total seconds
    allotedTime = 120;
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
    gameMode = "Intermediate";
    allotedTime = 105;
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
    gameMode = "Hard";
    allotedTime = 75;
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
    gameMode = "Expert";
    allotedTime = 50;
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