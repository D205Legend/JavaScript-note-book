const canvas = document.getElementById("flappyBird");
const ctx = canvas.getContext("2d");

var bg = new Image();
var fg = new Image();
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

// Physics variables
var bX = 10;
var bY = 150;
var gravity = 1.5;
var pipeNorthX = canvas.width;
var pipeNorthY = 0;
var gap = 85;
var pipeSouthX = canvas.width;
var pipeSouthY = pipeNorth.height + gap;
var score = 0;
var gameOver = false;



// Set File Source
bg.src = "https://github.com/sanketana/JavaScript-Classwork-Notebook/raw/main/images-flappy/bg.png";
fg.src = "https://github.com/sanketana/JavaScript-Classwork-Notebook/raw/main/images-flappy/fg.png";
bird.src = "https://github.com/sanketana/JavaScript-Classwork-Notebook/raw/main/images-flappy/bird.png";
pipeNorth.src = "https://github.com/sanketana/JavaScript-Classwork-Notebook/raw/main/images-flappy/pipeNorth.png";
pipeSouth.src = "https://github.com/sanketana/JavaScript-Classwork-Notebook/raw/main/images-flappy/pipeSouth.png";


function touching(x, y, w, h) {

  if(bX + bird.width >= x &&
     bY + bird.height >= y &&
     bY <= y + h) {
       return (true);
  } else {
       return (false);
  }

}


function update() {
  // Gravity simulation
  bY = bY + gravity;

  // North pipe motion
  pipeNorthX = pipeNorthX - 2;
  pipeSouthX = pipeSouthX - 2;

  pipeSouthY = pipeNorth.height + gap;


  // If north pipe touches left edge then teleport it to right edge
  if (pipeNorthX + pipeNorth.width == 0) {
      pipeNorthX = canvas.width;
      score = score + 1;
  }
  if (pipeSouthX + pipeSouth.width == 0) {
      pipeSouthX = canvas.width;
  }

  if (touching(pipeNorthX, pipeNorthY, pipeNorth.width, pipeNorth.height)) {
    clearInterval(myInterval);
    gameOver = true;
  }

  if (touching(pipeSouthX, pipeSouthY, pipeSouth.width, pipeSouth.height)) {
    clearInterval(myInterval);
    gameOver = true;
  }

  if (touching(0, canvas.height - fg.height, fg.width, fg.height)) {
    clearInterval(myInterval);
    gameOver = true;
  }

}

document.addEventListener("keydown", moveUp);

function moveUp() {
  bY = bY - 20;
}

function render() {
  ctx.drawImage(bg, 0, 0);
// Render pipes
ctx.drawImage(pipeNorth, pipeNorthX, pipeNorthY);
ctx.drawImage(pipeSouth, pipeSouthX, pipeSouthY);
// Render ground
ctx.drawImage(fg, 0, canvas.height - fg.height);
// Render bird
ctx.drawImage(bird, bX, bY);  
// Display Score
ctx.fillStyle = "#000";
ctx.font = "25px Teko";
ctx.fillText("Score : " + score, 10, canvas.height - 20);
// Game Over function
if(gameOver) {
  ctx.fillText("Game Over!!!", canvas.width/3, canvas.height/2);
}
}

function game() {
  update();
  render();
}

const fps = 50;

const myInterval = setInterval(game, 1000/fps);