var nbaTeams = [
    { name: "Lakers", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg" },
    { name: "Celtics", logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg" },
    { name: "Heat", logo: "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg" }, // ✅ Fixed
    { name: "Warriors", logo: "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg" },
    { name: "Bulls", logo: "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg" },
    { name: "Nets", logo: "https://en.wikipedia.org/wiki/History_of_the_Brooklyn_Nets#/media/File:Brooklyn_Nets_newlogo.svg" },
    { name: "Suns", logo: "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg" }
];


var currentTeam = 0;


//LIST:
var guessResults = []; // Tracks if the guess was correct
var delay = 1000; // Adjustable delay for difficulty

function start() {
    nextQuestion();
}



// Use guessResults list to increase difficulty
function adjustDifficulty() {
    if (guessResults.length >= 2) {
        var correctCount = 0;
        for (var i = 0; i < guessResults.length; i++) {
            if (guessResults[i]) {
                correctCount++;
            }
        }

        var accuracy = correctCount / guessResults.length;

        if (accuracy >= 0.8) {
            delay = 500; // Make it harder (faster)
            println("⚡ You're doing great! Speeding up!");
        } else {
            delay = 1000; // Keep normal speed
        }
    }
}




// Abstraction: Show logo for a given team
function showTeamLogo(team) {
    var logo = new WebImage(team.logo);
    logo.setPosition(100, 100);
    logo.setSize(200, 200);
    add(logo);
}

// Ask the next question
function nextQuestion() {
    removeAll();
    if (currentTeam < nbaTeams.length) {
        showTeamLogo(nbaTeams[currentTeam]); // Uses list inside abstraction
        setTimeout(askGuess, delay); // Adjustable based on performance
    } else {
        println("🎉 You guessed all the teams! Good job!");
    }
}









// Ask user to guess
function askGuess() {
    var guess = readLine("What team is this?");
    checkGuess(guess);
}

// Check answer and track result
function checkGuess(guess) {
    var user = guess.toLowerCase();
    var correct = nbaTeams[currentTeam].name.toLowerCase();

    var isCorrect = true;
    for (var i = 0; i < correct.length; i++) {
        if (user[i] !== correct[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect && user.length === correct.length) {
        println("✅ Correct!");
        guessResults.push(true);
    } else {
        println("❌ Incorrect. It was " + nbaTeams[currentTeam].name);
        guessResults.push(false);
    }

    currentTeam++;
    adjustDifficulty();
    nextQuestion();
}