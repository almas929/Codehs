// animation variables
const FRAME = 125;
var count = 1;

// constant dimensions for main character - martin
const HEAD_RADIUS = 30;
const BODY_WIDTH = 80;
const BODY_HEIGHT = 100;
const HAT_WIDTH = 60;
const HAT_HEIGHT = 35;
const EYE_RADIUS = 5;
const MOUTH_WIDTH = 20;
const MOUTH_HEIGHT = 10;

var sceneCounter = 0;

function start() {
    var welcome = new Text("Click to Begin!");
    welcome.setPosition(
        getWidth() / 2 - welcome.getWidth() / 2,
        getHeight() / 2
    );
    add(welcome);
    mouseClickMethod(drawNextScene);
}

// draws the scene 1 background
function drawScene1Background(){
    var width = getWidth();
    var height = getHeight();
    var background = new Rectangle (width, height);
    background.setPosition(0,0);
    background.setColor(new Color(76, 143, 188));
    add(background);
    var ground = new Rectangle(width, height / 4);
    ground.setPosition(0, getHeight() - height / 4);
    ground.setColor(new Color(52, 156, 59));
    add(ground)
    drawCloud();
}

// makes little balls used up to make a cloud
function makeCloudCircle(radius,x,y,color){
    var cloud1 = new Circle (radius);
    cloud1.setPosition(x+10,y-50);
    cloud1.setColor(Color.white);
    add(cloud1);
}

// makes the cloud
function drawCloud(){
    makeCloudCircle(30,100,100,Color.black);
    makeCloudCircle(30,140,100,Color.black);
    makeCloudCircle(30,180,100,Color.black);
    makeCloudCircle(30,200,75,Color.black);
    makeCloudCircle(30,180,60,Color.black);
    makeCloudCircle(30,140,60,Color.black);
    makeCloudCircle(30,100,60,Color.black);
    makeCloudCircle(30,80,75,Color.black);
}

function drawScene1() {
    drawScene1Background();
    drawMartin(200, 200);
    println("Today is fourth of July and Martin wants to light a firework");
}

function drawScene2() {
    drawMartin2(200,200);
    println("He lit the firework and planned to drop it and run");
}

// code for scene 3 is all the way at the bottom

function drawScene4() {
    // alternate backgorund for a night sky
    var width = getWidth();
    var height = getHeight();
    var background = new Rectangle(width, height);
    background.setPosition(0,0);
    background.setColor("#000033"); // Dark blue for night sky
    add(background);
   
    // Add stars to the sky and add text
    drawStars();
    drawMartin4(200,200);
}

function drawNextScene() {
    sceneCounter++;
   
    if (sceneCounter == 1) {
        drawScene1();
    } else if (sceneCounter == 2) {
        drawScene2();
    } else if (sceneCounter == 3) {
        println("But he instead droped the lighter and ran... Firework still in hand");
        setTimer(playAnimation, FRAME);
    } else if(sceneCounter == 4){
        stopTimer(playAnimation);
        println("So he was launched to the sky...");
        for(var i = 0; i < 2; i++) {
            println("^  ~  *  ~  >  ~  *  ~  ~  *  ~");
        }
        setTimer(drawScene4, FRAME);
    }
}

// draws Martin based around a coordinate
function drawMartin(centerX, centerY) {
    drawHead(centerX, centerY, "#F4D1A6");
    drawHat(centerX, centerY - HEAD_RADIUS - HAT_HEIGHT / 2, "#FF0000");
    drawEyes(centerX, centerY - 10);
    drawMouth(centerX, centerY + 15);
    drawBody(centerX, centerY + HEAD_RADIUS, "#0000FF");
    drawFirework(centerX + BODY_WIDTH / 2 + 10, centerY + HEAD_RADIUS);
    drawMatch(centerX - BODY_WIDTH / 2 - 10, centerY + HEAD_RADIUS + 40);
    drawPants(centerX - BODY_WIDTH / 2, centerY + BODY_HEIGHT / 2);
}

// Individual Parts of Martin
function drawHead(centerX, centerY, color) {
    var head = new Circle(HEAD_RADIUS);
    head.setPosition(centerX, centerY);
    head.setColor(color);
    add(head);
}

function drawHat(centerX, centerY, color) {
    var hat = new Rectangle(HAT_WIDTH, HAT_HEIGHT);
    hat.setPosition(centerX - HAT_WIDTH / 2, centerY - HAT_HEIGHT /5);
    hat.setColor(color);
    add(hat);
   
    var hatBrim = new Rectangle(HAT_WIDTH * 1.25 , HAT_HEIGHT / 3);
    hatBrim.setPosition(centerX - (HAT_WIDTH * 1.25)/2, centerY + 20);
    hatBrim.setColor(Color.blue);
    add(hatBrim);
   
    var startingX = centerX - HAT_WIDTH / 2.5;
    var startingY = centerY - HAT_HEIGHT /5;
   
    for(var i = 0; i < 3; i ++){
        var rec = new Rectangle(HAT_WIDTH / 6, HAT_HEIGHT - (HAT_HEIGHT / 4.5));
        rec.setColor(Color.white);
        rec.setPosition(startingX,startingY);
        add(rec);
        startingX += HAT_WIDTH/3;
    }
}

function drawBody(centerX, centerY, color) {
    var body = new Rectangle(BODY_WIDTH, BODY_HEIGHT);
    body.setPosition(centerX - BODY_WIDTH / 2, centerY);
    body.setColor(color);
    add(body);
}

function drawEyes(centerX, centerY) {
    var leftEye = new Circle(EYE_RADIUS);
    leftEye.setPosition(centerX - 10, centerY);
    leftEye.setColor(Color.black);
    add(leftEye);

    var rightEye = new Circle(EYE_RADIUS);
    rightEye.setPosition(centerX + 10, centerY);
    rightEye.setColor(Color.black);
    add(rightEye);
}

function drawMouth(centerX, centerY) {
    var mouth = new Oval(MOUTH_WIDTH, MOUTH_HEIGHT);
    mouth.setPosition(centerX, centerY);
    mouth.setColor("#FF0000");
    add(mouth);
}

function drawFirework(baseX, baseY) {
    var pole = new Rectangle(19, 60);
    pole.setPosition(baseX, baseY);
    pole.setColor(Color.red);
    add(pole);

    var flag = new Polygon();
    flag.addPoint(baseX, baseY);
    flag.addPoint(baseX + 19, baseY);
    flag.addPoint(baseX + 10, baseY - 15);
    flag.setColor(Color.red);
    add(flag);
   
    var startY = baseY;
   
    for(var i = 0; i < 3; i ++){
        var line = new Rectangle(19,10);
        line.setColor(Color.white);
        line.setPosition(baseX,startY);
        add(line);
        startY += 20;
    }
}

function drawMatch(baseX, baseY) {
    // Match stick
    var stick = new Rectangle(8, 35);
    stick.setPosition(baseX, baseY);
    stick.setColor("#8B4513");
    add(stick);
   
    // Match head
    var matchHead = new Circle(8);
    matchHead.setPosition(baseX + 2.5, baseY - 5);
    matchHead.setColor("#FF4500");
    add(matchHead);
   
    // Sparkles
    for (var i = 0; i < 4; i++) {
        var sparkle = new Circle(5);
        sparkle.setPosition(
            baseX + 2.5 + Math.cos(i * Math.PI / 2) * 10,
            baseY - 5 + Math.sin(i * Math.PI / 2) * 10
        );
        sparkle.setColor("#FFD700");
        add(sparkle);
    }
}

function drawPants(centerX, centerY) {
    var pantsColor = new Color(88, 56, 0);
    var legWidth = (BODY_WIDTH / 2) - 5; // Width of each leg
    var legHeight = BODY_HEIGHT ;
    var gapWidth = 10; // Width of gap between legs
   
    // Left leg
    var leftLeg = new Rectangle(legWidth, legHeight);
    leftLeg.setPosition(centerX, centerY + BODY_HEIGHT-20);
    leftLeg.setColor(pantsColor);
    add(leftLeg);
   
    // Right leg
    var rightLeg = new Rectangle(legWidth, legHeight);
    rightLeg.setPosition(centerX + legWidth + gapWidth, centerY + BODY_HEIGHT-20);
    rightLeg.setColor(pantsColor);
    add(rightLeg);
}

// Martin scene 2
function drawMartin2(centerX, centerY) {
    drawHead(centerX, centerY, "#F4D1A6");
    drawHat(centerX, centerY - HEAD_RADIUS - HAT_HEIGHT / 2, "#FF0000");
    drawEyes(centerX + 6, centerY - 5);
    drawMouth2(centerX + 5, centerY + 15);
    drawBody(centerX, centerY + HEAD_RADIUS, "#0000FF");
    drawFirework(centerX + BODY_WIDTH / 2 + 10, centerY + HEAD_RADIUS);
   
    drawFireOfFirework(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS);
   
    drawFireOfF2(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS );
   
    drawMatch(centerX - BODY_WIDTH / 2 - 10, centerY + HEAD_RADIUS + 40);
    drawPants(centerX - BODY_WIDTH / 2, centerY + BODY_HEIGHT / 2);
}

function drawMouth2(centerX, centerY){
    var mouth = new Oval(MOUTH_HEIGHT, MOUTH_WIDTH);
    mouth.setPosition(centerX, centerY);
    mouth.setColor("#FF0000");
    add(mouth);
}

function drawFireOfFirework(baseX, baseY) {
    // Create the main triangle for the fire
    var fire = new Polygon();
    fire.addPoint(baseX, baseY);                 // Bottom-left corner
    fire.addPoint(baseX - 15 , baseY -30);            // Bottom-right corner
    fire.addPoint(baseX + 15, baseY - 30);       // Top of the triangle
    fire.setColor(Color.yellow);                    // Set the fire color
    add(fire);

}

function drawFireOfF2(baseX, baseY) {
    var fire2 = new Polygon();
    fire2.addPoint(baseX, baseY-10);
    fire2.addPoint(baseX - 10, baseY - 30);
    fire2.addPoint(baseX + 10, baseY - 30);
    fire2.setColor("#FF5722");
    add(fire2);          
}

// Martin scene 4
function drawMartin4(centerX, centerY) {
    drawHead(centerX, centerY, "#F4D1A6");
    drawHat(centerX, centerY - HEAD_RADIUS - HAT_HEIGHT / 2, "#FF0000");
    drawEyes_(centerX, centerY - 10);
    drawMouth(centerX, centerY + 15);
    drawBody(centerX, centerY + HEAD_RADIUS, "#0000FF");
   
    drawFireOfFirework_(centerX + BODY_WIDTH -40 , centerY + 2 *HEAD_RADIUS+10);
   
    drawFireOfF2_(centerX + BODY_WIDTH - 40 , centerY + 2*HEAD_RADIUS + 12);
   
    // Move firework up higher
    drawFirework(centerX + BODY_WIDTH / 2 - 10, centerY - 20);
   
    // Remove match since we're holding the firework
    drawPants_(centerX - BODY_WIDTH / 2, centerY + BODY_HEIGHT -20);
   
}

function drawFireOfFirework_(baseX, baseY) {
    // Create the main triangle for the fire
    var fire = new Polygon();
    fire.addPoint(baseX, baseY);                 // Bottom-left corner
    fire.addPoint(baseX - 15 , baseY -30);            // Bottom-right corner
    fire.addPoint(baseX + 15, baseY - 30);       // Top of the triangle
    fire.setColor(Color.yellow);                    // Set the fire color
    add(fire);

}

function drawEyes_(centerX, centerY) {
    var leftEye = new Rectangle(2, EYE_RADIUS * 2);  // Thin rectangle for the left eye
    leftEye.setPosition(centerX - 10, centerY - EYE_RADIUS);  // Adjust vertical position
    leftEye.setColor(Color.black);
    add(leftEye);

    var rightEye = new Rectangle(2, EYE_RADIUS * 2);  // Thin rectangle for the right eye
    rightEye.setPosition(centerX + 10, centerY - EYE_RADIUS);  // Adjust vertical position
    rightEye.setColor(Color.black);
    add(rightEye);
}

function drawFireOfF2_(baseX, baseY) {
    var fire2 = new Polygon();
    fire2.addPoint(baseX, baseY-10);
    fire2.addPoint(baseX - 10, baseY - 30);
    fire2.addPoint(baseX + 10, baseY - 30);
    fire2.setColor("#FF5722");
    add(fire2);          
}

function drawPants_(centerX, centerY) {
    var legWidth = (BODY_WIDTH / 2) - 5;
    var legHeight = BODY_HEIGHT ; // Changed to half body height
    var gapWidth = 10;
    var pantsColor = new Color(88, 56, 0);
    // Left leg
    var leftLeg = new Rectangle(legWidth, legHeight);
    leftLeg.setPosition(centerX, centerY + BODY_HEIGHT/2);
    leftLeg.setColor(pantsColor);
    add(leftLeg);
   
    // Right leg
    var rightLeg = new Rectangle(legWidth, legHeight);
    rightLeg.setPosition(centerX + legWidth + gapWidth, centerY + BODY_HEIGHT/2);
    rightLeg.setColor(pantsColor);
    add(rightLeg);
}

function drawStars() {
    for(var i = 0; i < 30; i++) {
        var star = new Circle(2);
        star.setPosition(Math.random() * getWidth(), Math.random() * (getHeight()/2));
        star.setColor(Color.white);
        add(star);
    }
}

// here down is all the code for scene 3
// this is the function to be called every .125 seconds,
// which means we have an animation of 8 frames per second
function playAnimation(){
    animation(count);
    count++;
}

/*
this is called in playAnimation so we can switch between different
scenes. I used switch case so it plays the right scene based on the
count that is incremented when playAnimation is called. It then
calls the scene corresponding to the count
*/
function animation(count) {
    switch(count){
        case 1:
            scene1();
            break;
        case 2:
            scene2();
            break;
        case 3:
            scene3();
            break;
        case 4:
            scene4();
            break;
        case 5:
            scene5();
            break;
        case 6:
            scene6();
            break;
        case 7:
            scene7();
            break;
        case 8:
            scene8();
            break;
        case 9:
            scene9();
            break;
        case 10:
            scene10();
            break;
        case 11:
            scene11();
            break;
        case 12:
            scene12();
            break;
        case 13:
            scene13();
            break;
        case 14:
            scene14();
            break;
        case 15:
            scene15();
            break;
        case 16:
            scene16();
            break;
        case 17:
            scene17();
            break;
        case 18:
            scene18();
            break;
        case 19:
            scene19();
            break;
        case 20:
            scene20();
            break;
        case 21:
            scene21();
            break;
        case 22:
            scene22();
            break;
        case 23:
            scene23();
            break;
        case 24:
            scene24();
            break;
        case 25:
            scene25();
            break;
        case 26:
            scene26();
            break;
        case 27:
            scene27();
            break;
        case 28:
            scene28();
            break;
        case 29:
            scene29();
            break;
        case 30:
            scene30();
            break;
        case 31:
            scene31();
            break;
        case 32:
            scene32();
            break;
        default:
            break;
    }
}

// this draws the dropped match on the floor
function drawMatch2(baseX, baseY) {
    // Match stick
    var stick = new Rectangle(8, 35);
    stick.setPosition(baseX, baseY);
    stick.setColor("#8B4513");
    stick.setRotation(90, 0);
    add(stick);
   
    // Match head
    var matchHead = new Circle(8);
    matchHead.setPosition(baseX - 20, baseY +16);
    matchHead.setColor("#FF4500");
    add(matchHead);
   
    // Sparkles
    for (var i = 0; i < 4; i++) {
        var sparkle = new Circle(5);
        sparkle.setPosition(
            baseX - 20 + Math.cos(i * Math.PI / 2) * 10,
            baseY + 16 + Math.sin(i * Math.PI / 2) * 10
        );
        sparkle.setColor("#FFD700");
        add(sparkle);
    }
}

// this draws how Martin will look for a majority of scene 3
function drawMartin3(centerX, centerY){
    drawHead(centerX, centerY, "#F4D1A6");
    drawHat(centerX, centerY - HEAD_RADIUS - HAT_HEIGHT / 2, "#FF0000");
    drawEyes(centerX + 6, centerY - 5);
    drawMouth(centerX, centerY + 15);
    drawBody(centerX, centerY + HEAD_RADIUS, "#0000FF");
    drawFirework(centerX + BODY_WIDTH / 2 + 10, centerY + HEAD_RADIUS);
    drawFireOfFirework(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS);
    drawFireOfF2(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS );
    drawPants(centerX - BODY_WIDTH / 2, centerY + BODY_HEIGHT / 2);
}

// this draws our background
function drawBackground(){
    var width=getWidth();
    var height=getHeight();
    var background = new Rectangle (width, height);
    background.setPosition(0,0);
    background.setColor(new Color(76, 143, 188));
    add(background);
    var ground = new Rectangle(width, height / 4);
    ground.setPosition(0, getHeight() - height / 4);
    ground.setColor(new Color(52, 156, 59));
    add(ground)
    drawMatch2(200 - BODY_WIDTH - 40, 200 + 200);
    drawCloud();
}

// the functions below are for Martin looking at the lighter
// and maritn looking at the firework
// and Martin looking at the "camera"
function drawMartinLookingBack(centerX, centerY){
    drawHead(centerX, centerY, "#F4D1A6");
    drawHat(centerX, centerY - HEAD_RADIUS - HAT_HEIGHT / 2, "#FF0000");
    drawEyes(centerX - 3, centerY + 4);
    drawMouth(centerX, centerY + 15);
    drawBody(centerX, centerY + HEAD_RADIUS, "#0000FF");
    drawFirework(centerX + BODY_WIDTH / 2 + 10, centerY + HEAD_RADIUS);
    drawFireOfFirework(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS);
    drawFireOfF2(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS );
    drawPants(centerX - BODY_WIDTH / 2, centerY + BODY_HEIGHT / 2);
}
function drawMartinLookingAtFirework(centerX, centerY){
    drawHead(centerX, centerY, "#F4D1A6");
    drawHat(centerX, centerY - HEAD_RADIUS - HAT_HEIGHT / 2, "#FF0000");
    drawEyes(centerX + 7, centerY + 3);
    drawMouth(centerX, centerY + 15);
    drawBody(centerX, centerY + HEAD_RADIUS, "#0000FF");
    drawFirework(centerX + BODY_WIDTH / 2 + 10, centerY + HEAD_RADIUS);
    drawFireOfFirework(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS);
    drawFireOfF2(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS );
    drawPants(centerX - BODY_WIDTH / 2, centerY + BODY_HEIGHT / 2);
}
function drawMartinLookingAtUs(centerX, centerY){
    drawHead(centerX, centerY, "#F4D1A6");
    drawHat(centerX, centerY - HEAD_RADIUS - HAT_HEIGHT / 2, "#FF0000");
    drawEyes(centerX, centerY - 5);
    drawMouth(centerX, centerY + 15);
    drawBody(centerX, centerY + HEAD_RADIUS, "#0000FF");
    drawFirework(centerX + BODY_WIDTH / 2 + 10, centerY + HEAD_RADIUS);
    drawFireOfFirework(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS);
    drawFireOfF2(centerX + BODY_WIDTH -20 , centerY + 4 *HEAD_RADIUS );
    drawPants(centerX - BODY_WIDTH / 2, centerY + BODY_HEIGHT / 2);
}

/*  
all scenes used for scene 3 animation.
each animation starts with remove all so we can draw over it with
a minor change, ie. we move martin 10 spaces to the right
*/
function scene1(){
    removeAll();
    drawBackground();
    drawMartin3(200,200);
}
function scene2(){
    removeAll();
    drawBackground();
    drawMartin3(210,200);
}
function scene3(){
    removeAll();
    drawBackground();
    drawMartin3(220,200);
}
function scene4(){
    removeAll();
    drawBackground();
    drawMartin3(230,200);
}
function scene5(){
    removeAll();
    drawBackground();
    drawMartin3(240,200);
}
function scene6(){
    removeAll();
    drawBackground();
    drawMartin3(250,200);
}
function scene7(){
    removeAll();
    drawBackground();
    drawMartin3(260,200);
}
function scene8(){
    removeAll();
    drawBackground();
    drawMartin3(270,200);
}
function scene9(){
    removeAll();
    drawBackground();
    drawMartin3(280,200);
}
function scene10(){
    removeAll();
    drawBackground();
    drawMartin3(290,200);
}
function scene11(){
    removeAll();
    drawBackground();
    drawMartin3(290,200);
}
function scene12(){
    removeAll();
    drawBackground();
    drawMartin3(290,200);
}
function scene13(){
    removeAll();
    drawBackground();
    drawMartin3(290,200);
}
function scene14(){
    removeAll();
    drawBackground();
    drawMartin3(290,200);
}
function scene15(){
    removeAll();
    drawBackground();
    drawMartinLookingBack(290,200);
}
function scene16(){
    removeAll();
    drawBackground();
    drawMartinLookingBack(290,200);
}
function scene17(){
    removeAll();
    drawBackground();
    drawMartinLookingBack(290,200);
}
function scene18(){
    removeAll();
    drawBackground();
    drawMartinLookingBack(290,200);
}
function scene19(){
    removeAll();
    drawBackground();
    drawMartinLookingBack(290,200);
}
function scene20(){
    removeAll();
    drawBackground();
    drawMartinLookingBack(290,200);
}
function scene21(){
    removeAll();
    drawBackground();
    drawMartinLookingAtFirework(290,200);
   
}
function scene22(){
    removeAll();
    drawBackground();
    drawMartinLookingAtFirework(290,200);
}
function scene23(){
    removeAll();
    drawBackground();
    drawMartinLookingAtFirework(290,200);
}
function scene24(){
    removeAll();
    drawBackground();
    drawMartinLookingAtFirework(290,200);
}
function scene25(){
    removeAll();
    drawBackground();
    drawMartinLookingAtFirework(290,200);
}
function scene26(){
    removeAll();
    drawBackground();
    drawMartinLookingAtUs(290,200);
}
function scene27(){
    removeAll();
    drawBackground();
    drawMartinLookingAtUs(290,200);
}
function scene28(){
    removeAll();
    drawBackground();
    drawMartinLookingAtUs(290,200);
}
function scene29(){
    removeAll();
    drawBackground();
    drawMartinLookingAtUs(290,200);
    stopTimer(playAnimation);
}