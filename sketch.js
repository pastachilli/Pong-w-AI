// =============================================================================
// Program: Pong Video Game With AI
// Author: Gabe Postacchini
// Description: Video Game where you play tennis. Added Artificual Intelligence
// Date Last Modified: 27 October 2020
// Version: 2.6

// 'use strict';

// =============================================================================

//Initializing Variables:
let posorneg = Math.floor(Math.random() * 2); // Used to tell the ball which side to go to first
let p1y, p2y, mover, calculator, bot1, bot2;
let constX, constY;
let ballVelX = (Math.random() * 3) + 2; // X Velocity of the ball
let ballVelY = (Math.random() * 3) + 3; // Y Velocity of the ball
let idealY1, idealY2;
let input = '';
let p1Score = 0;
let p2Score = 0;
if(posorneg == 1){
  ballVelX *= -1;
  ballVelY *= -1;
}

// Setup Function:
function setup() {

  createCanvas(windowWidth, windowHeight);
  ballX = windowWidth / 2;
  ballY = windowHeight / 2;
  p1y = (windowHeight / 2) - 75;
  p2y = (windowHeight / 2) - 75;
  mode1 = selector1();
  mode2 = selector2();
}

// Reinitializing initial variables for the ball and paddles:
let ballInit = () => {
    ballVelX = (Math.random() * 3) + 3;
    ballVelY = (Math.random() * 3) + 2;
    ballX = windowWidth / 2;
    ballY = windowHeight / 2;
    p1y = windowHeight / 2 - 75;
    p2y = windowHeight / 2 - 75;
    posorneg = Math.floor(Math.random() * 2);
    if(posorneg == 1){
      ballVelX *= -1;
      ballVelY *= -1;
    }
}

// Movement Code for Player 1:
let p1Move = () => {
    if(keyIsPressed){
      if(keyIsDown(87)){
        p1y -= 5;
      }
    
      if (keyIsDown(83)){
        p1y += 5;
      }
    }
  
  if(p1y <= 0) {
     p1y = 0
  }
  
  if(p1y >= windowHeight - 150) {
     p1y = windowHeight - 150
  }
}

// Movement Code for Player 2:
let p2Move = () => {
  
  if(keyIsPressed){
    if(keyIsDown(UP_ARROW)){
      p2y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)){
      p2y += 5;
    }
  }


  if(p2y <= 0) {
     p2y = 0
  }

  if(p2y >= windowHeight - 150) {
     p2y = windowHeight - 150
  }
}

// Dumb AI:
let dumbAI1 = () => {
  if(ballY - 70 > p1y){
    input = 'down';
  }  else if(ballY < p1y + 5){
    input = 'up';
  }
  
  if(input == 'down'){
    p1y += 5;
  } else if (input == 'up'){
    p1y -= 5;
  }
  
  if(p1y <= 0) {
     p1y = 0
  }

  if(p1y >= windowHeight - 150) {
     p1y = windowHeight - 150
  }
}

let dumbAI2 = () => {
  if(ballY - 70 > p2y){
    input = 'down';
  }  else if(ballY < p2y + 5){
    input = 'up';
  }
  
  if(input == 'down'){
    p2y += 5;
  } else if (input == 'up'){
    p2y -= 5;
  }
  
  if(p2y <= 0) {
     p2y = 0
  }

  if(p2y >= windowHeight - 150) {
     p2y = windowHeight - 150
  }
}

// Smart AI:
let smartAI1 = () => {
  let ballXa = ballX
  let ballYa = ballY
  let ballVelXa = ballVelX
  let ballVelYa = ballVelY
  do {
      ballXa += ballVelXa;
      ballYa += ballVelYa;
    if(ballXa + ballVelXa >= windowWidth - 45){
        ballVelXa *= -1;
       if(ballVelYa < 0){
          ballVelYa -= 0.5;
        } else {
          ballVelYa += 0.5;
        }
  }
    if(ballYa + ballVelYa <= 15 || ballYa + ballVelYa >= windowHeight - 15){
      ballVelYa *= -1
    }
    
      idealY1 = ballYa;
  } while (ballXa < windowWidth - 45 && ballXa > 45)
    
    if(p1y + 75 < idealY1){
      input = 'down';
    } else if (p1y + 75 > idealY1) {
      input = 'up';
    }
  
    if(input == 'down'){
    p1y += 5;
  } else if (input == 'up'){
    p1y -= 5;
  }
  
  if(p1y <= 0) {
     p1y = 0
  }

  if(p1y >= windowHeight - 150) {
     p1y = windowHeight - 150
  }
  

}

let smartAI2 = () => {
  let ballXa = ballX
  let ballYa = ballY
  let ballVelXa = ballVelX
  let ballVelYa = ballVelY
  do {
      ballXa += ballVelXa;
      ballYa += ballVelYa;
    if(ballXa + ballVelXa <= 45){
        ballVelXa *= -1;
  }
    if(ballYa + ballVelYa <= 15 || ballYa + ballVelYa >= windowHeight - 15){
      ballVelYa *= -1
    }
    
      idealY2 = ballYa;
  } while (ballXa < windowWidth - 45 && ballXa > 45)
    
    if(p2y + 75 < idealY2){
      input = 'down';
    } else if(p2y + 75 > idealY2) {
      input = 'up';
    }
  
    if(input == 'down'){
    p2y += 5;
  } else if (input == 'up'){
    p2y -= 5;
  }
  
  if(p2y <= 0) {
     p2y = 0
  }

  if(p2y >= windowHeight - 150) {
     p2y = windowHeight - 150
  }
  
}

// AI Selector:
let selector1 = () => {
  bot1 = prompt('Which mode would you like for Player 1? (Smart AI, Dumb AI, Human)')
  if(bot1 == 'Smart AI'){
    return smartAI1;
  } else if (bot1 == 'Dumb AI') {
    return dumbAI1;
  } else if (bot1 == 'Human') {
    return p1Move;
  }
}

let selector2 = () => {
  bot2 = prompt('Which mode would you like for Player 2? (Smart AI, Dumb AI, Human)')
  if(bot2 == 'Smart AI'){
    return smartAI2;
  } else if (bot2 == 'Dumb AI') {
    return dumbAI2;
  } else if (bot2 == 'Human') {
    return p2Move;
  }
}

// Paddle Collision with ball
let padCol = () => {
    if(ballX + ballVelX <= 45){
      if(p1y <= ballY + ballVelY && p1y >= ballY + ballVelY - 150){
        if (ballVelX < 10){
          ballVelX -= 2;
        }
        ballVelX *= -1;
        if(ballVelY < 0){
          ballVelY -= 0.5;
        } else {
          ballVelY += 0.5;
        }
      }
  }
  
  if(ballX + ballVelX >= windowWidth - 45){
    if(p2y <= ballY + ballVelY && p2y >= ballY + ballVelY - 150){
      if (ballVelX < 10){
          ballVelX +=2;
        }
      ballVelX *= -1;
      if(ballVelY < 0){
          ballVelY -= 0.5;
        } else {
          ballVelY += 0.5;
        }
      
    }
  }
}


// Ball Collision with Walls:
let wallCol = () => {
    if(ballY + ballVelY <= 15 || ballY + ballVelY >= windowHeight - 15){
      ballVelY *= -1
    }
}

// Win Or Loss:
let wol = () => {
    if (ballX + ballVelX <= 15){
      p2Score++
      fill('white')
      textSize(50)
      console.log(bot2 + ' 2 Wins!!');
      ballInit();
    } else if (ballX + ballVelX >= windowWidth - 15){
      p1Score++
      fill('white')
      textSize(50)
      console.log(bot1 + ' 1 Wins!!');
      ballInit();
  }
}
    



// Draw to canvas:
function draw() {
  background(0);
  // Draw Text:
  fill('while');
  textSize(15);
  text('Pong!', windowWidth / 2, 20);
  text(bot1 + ' 1',windowWidth / 2 - 125, 40 )
  text(bot2 + ' 2',windowWidth / 2 + 75, 40 )
  textFont('Typewriter', 50);
  text(p1Score, windowWidth/4, windowHeight/4);
  text(p2Score,3 * windowWidth / 4,windowHeight / 4);
  
  
  // Player 1 Block:
    fill('white')
    rect(10, p1y, 25, 150);
    mode1();
  
  // Player 2 Block:
    fill('white')
    rect(windowWidth - 35, p2y, 25, 150);
    mode2();
  // The Ball:
  wallCol(); // Detects if the ball has collided with the walls.
  padCol(); // Detects if the ball has collided with the paddles.

  
  // Win Or Loss:
  wol(); // Determines whether a player has won or lost a match. Will add points to the score if player wins.
  
  // Drawing the Ball:
  fill('green')
  circle((ballX + ballVelX), (ballY + ballVelY), 30);
  ballX += ballVelX;
  ballY += ballVelY;
  
}
  

// Event Listener:
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}