var TOP_GAP = 40;
var BOTTOM_GAP = 40;
var BORDER_GAP = 10;
var NUM_BITS = 8;
var BIT_SPACING = 10;
var BIT_WIDTH = (getWidth() - BORDER_GAP*2 - BIT_SPACING*(NUM_BITS)) / NUM_BITS;
var BIT_HEIGHT = 30;
var BIT_TO_DECIMAL_GAP = 20;
var MESSAGE_TO_POINTS_GAP = 40;
var WELCOME_MESSAGE_TIME = 1500;
var RESET_TIME = 1000;
var NUMBER_BASE = 10;
var BACKGROUND_COLOR = new Color(86, 223, 208);
var FONT_COLOR = Color.white;

// Global variables that define the game state.
// Used by several different functions
var titleLabel; 
var binaryButtons = [];
var decimalLabels = [];
var decimalResultLabel;
var targetLabel;
var scoreLabel;
var score;
 
// Start the game by initializing the window and displaying a message
function start() {
    initGame();
    setTimeout(play, WELCOME_MESSAGE_TIME);
}

// Start playing the game by displaying the task and waiting for clicks
function play() {
    displayTitle("Match the target value");
    mouseClickMethod(handleClick);
}

// Handles a click by checking if the user clicked on a bit
// If they did, flip the bit and compute the new result.
// If the result matches the target, award points and reset for a new round
function handleClick(e) {
    var elem = getElementAt(e.getX(), e.getY());
    var buttonIndex = binaryButtons.indexOf(elem);
    
    if(buttonIndex != -1) {
        var button = binaryButtons[buttonIndex];
        toggleButton(button);
        var decimalValue = computeBinaryValue();
        
        remove(decimalResultLabel);
        decimalResultLabel = computeDecimalResultLabel();
        add(decimalResultLabel);
        
        if(decimalValue == targetLabel.getText()) {
            displayTitle("NICE!");
            score += parseInt(decimalValue, NUMBER_BASE);
            displayScoreLabel(score);
            setTimeout(reset, RESET_TIME);
        }
    }
}

// Resets the target and the bits for a new round
function reset() {
    displayTitle("Match the target value");
    for(var i = 0; i < NUM_BITS; i++) {
        binaryButtons[i].setText("0");
    }
    remove(decimalResultLabel);
    generateRandomTarget();
}

// Computes the current value according to the bits
function computeBinaryValue() {
    var binaryString = "";
    for(var i = 0; i < NUM_BITS; i++) {
        binaryString += binaryButtons[i].getText();
    }
    
    return parseInt(binaryString, 2).toString(NUMBER_BASE).toUpperCase();
}

// Computes and displays the decimal result label according to the bits that are turned "on"
function computeDecimalResultLabel() {
    var resultString = "";
    var bitCount = 0;
    for(var i = 0; i < NUM_BITS; i++) {
        if(binaryButtons[i].getText() == "1") {
            bitCount++;
            if(resultString.length != 0) {
                resultString += " + ";
            }
            resultString += decimalLabels[i].getText();
        }
    }
    
    resultString += " = " + computeBinaryValue();
    
    var font;
    if(bitCount <= 4) {
        font = "20pt Courier";    
    } else if(bitCount <= 6) {
        font = "15pt Courier";
    } else {
        font = "12pt Courier";
    }
    
    var resultLabel = new Text(resultString, font);
    var x = getWidth() / 2 - resultLabel.getWidth() / 2;
    var y = getHeight() / 3 * 2;
    resultLabel.setPosition(x, y);
    resultLabel.setColor(FONT_COLOR);
    
    return resultLabel;
}

// Flips a given bit label from 0 to 1 or vice versa
function toggleButton(buttonLabel) {
    if(buttonLabel.getText() == "0") {
        buttonLabel.setText("1");
    }
    else {
        buttonLabel.setText("0");
    }
}

// Initializes the initial game state
function initGame() {
    setBackgroundColor(BACKGROUND_COLOR);
    displayTitle("Welcome to the Binary Challenge");
    score = 0;
    displayScoreLabel(score);
    addBinaryButtons();
    addDecimalLabels();
    generateRandomTarget();
    enterTheMatrix();
}

function enterTheMatrix() {
    // TODO: enter the matrix
}

// Sets the background to be the given color
function setBackgroundColor(color) {
    var background = new Rectangle(getWidth(), getHeight());
    background.setPosition(0, 0);
    background.setColor(color);
    add(background);
}

// Displays the current score to be the given points passed in
function displayScoreLabel(points) {
    remove(scoreLabel);
    
    scoreLabel = new Text("Score: " + points, "13pt Courier");
    var x = getWidth() / 2 - scoreLabel.getWidth() / 2;
    var y = titleLabel.getY() + MESSAGE_TO_POINTS_GAP;
    scoreLabel.setPosition(x, y);
    scoreLabel.setColor(FONT_COLOR);
    
    add(scoreLabel);
}

// Displays a given title message at the top of the game window
function displayTitle(titleString) {
    remove(titleLabel);
    
    titleLabel = new Text(titleString, "15pt Courier");
    var x = getWidth() / 2 - titleLabel.getWidth() / 2;
    var y = TOP_GAP;
    titleLabel.setPosition(x, y);
    titleLabel.setColor(FONT_COLOR);
    
    add(titleLabel);
}

// Adds all the bits to the screen and stores them in the binaryButtons array
function addBinaryButtons() {
    for(var i = 0; i < NUM_BITS; i++) {
        var bitLabel = new Text("0", "30pt Courier");
        var x = BORDER_GAP + (BIT_WIDTH + BIT_SPACING)*i + bitLabel.getWidth() / 2;
        var y = getHeight() / 3;
        bitLabel.setPosition(x, y);
        bitLabel.setColor(FONT_COLOR);
        
        add(bitLabel);
        binaryButtons.push(bitLabel);
    }
}

// Adds all the decimal labels to the screen (128, 64, 32, ...) underneath each bit
function addDecimalLabels() {
    for(var i = 0; i < NUM_BITS; i++) {
        var placeValue = "" + Math.pow(2, NUM_BITS - (i + 1));
        var decimalLabel = new Text(placeValue, "16pt Courier");
        var x = binaryButtons[i].getX();
        if(decimalLabel.getWidth() > BIT_WIDTH) {
            x -= decimalLabel.getWidth() / 4;
        }
        else if (placeValue.length == 1) {
            x += decimalLabel.getWidth() / 2;
        }
        var y = binaryButtons[i].getY() + BIT_TO_DECIMAL_GAP + decimalLabel.getHeight();
        
        decimalLabel.setPosition(x, y);
        decimalLabel.setColor(FONT_COLOR);
        
        decimalLabels.push(decimalLabel);
        
        add(decimalLabel);
    }
}

// Generates a random target value and displays it at the bottom of the screen
function generateRandomTarget() {
    var max = Math.pow(2, NUM_BITS) - 1;
    var val = Randomizer.nextInt(0, max);
    val = val.toString(NUMBER_BASE).toUpperCase();
    
    remove(targetLabel);
    
    targetLabel = new Text(val, "40pt Courier");
    var x = getWidth() / 2 - targetLabel.getWidth() / 2;
    var y = getHeight() - BOTTOM_GAP;
    
    targetLabel.setPosition(x, y);
    targetLabel.setColor(FONT_COLOR);
    
    add(targetLabel);
}