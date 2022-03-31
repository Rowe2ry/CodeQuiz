/* =========================================================================
 * Identifying different DOM elements
 * ========================================================================= */

// identifying the button inputs for selecting the difficulty bt ID
// specifically since its the most important question
var scoreSheet = document.querySelector("#pastScores");

/* =========================================================================
 * Global scope variable declarations
 * ========================================================================= */
gameIteration = Number(window.localStorage.getItem("timesPlayed"));
var winner;
var paragraph;

for (i = 1; i <= gameIteration; i++) {
    var winner = JSON.parse(window.localStorage.getItem("winner" + i));
    var paragraph = document.createElement("p");
    paragraph.textContent = "Initials: " +
        winner.initials +
        " --- Score out of 100: " +
        winner.score +
        " --- Time to complete: " +
        winner.time2Complete +
        " --- Difficulty Level: " +
        winner.difficulty + 
        " --- On: " +
        winner.time;
    scoreSheet.appendChild(paragraph);
};
