const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

//Ball Object:
const ball = {
  x : canvas.width/2,
  y : canvas.height/2,
  color: 'white',
  radius: 10,
  velocityX: 5,
  velocityY: 5

}

// User Object
const user = {
  x : 10,
  y : canvas.height/2 - 100/2 + 100,
  width : 10, 
  height : 100, 
  color : 'WHITE',
  score : 0
}

// Computer Object
const com = {
  x : canvas.width - 20,
  y : canvas.height/2 - 100/2 + 100,
  width : 10, 
  height : 100, 
  color : 'WHITE',
  score : 0
}

// User paddle touch sensing
function touchingUser() {
  if (ball.x > user.x && ball.x < (user.x + user.width) && ball.y > user.y && ball.y < (user.y + user.height)) {
        return true;
  } else {
        return false;
  }
}
// Computer paddle touch sensing
function touchingCom() {
  if (ball.x > com.x && ball.x < (com.x + com.width) && ball.y > com.y && ball.y < (com.y + com.height)) {
        return true;
  } else {
        return false;
  }
}
 // Function to draw text
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "75px fantasy";
  ctx.fillText(text, x, y);
}

// Reset Ball
function resetBall() {
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.velocityX = -ball.velocityX;
} 



// Add mouse event listener
canvas.addEventListener("mousemove", getMousePos);

// Event handler function
function getMousePos(evt) {
  let rect = canvas.getBoundingClientRect();

  user.y = evt.clientY;
}

function update() {
  ball.x = ball.x + ball.velocityX;
  ball.y = ball.y + ball.velocityY;

  
  if (ball.y >= canvas.height) {
    ball.velocityY = -ball.velocityY;
  }

    if (ball.y <= 0) {
    ball.velocityY = -ball.velocityY;
  }

  if (touchingCom()) {
    ball.velocityX = -ball.velocityX;
  }

  if (touchingUser()) {
    ball.velocityX = -ball.velocityX;
  }

  if (ball.x <= 0) {
    com.score++;
    resetBall();
  }

  if (ball.x >= canvas.width) {
    user.score++;
    resetBall();
  }

  // Simple Computer AI 
  com.y = ball.y - (com.height/2);


}

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}


function render() {
  drawRect(0, 0, 600, 400, 'black');
  drawRect(300, 0, 2, canvas.height, 'white');
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(com.x, com.y, com.width, com.height, com.color);
  drawText(user.score, canvas.width/4, canvas.height/5, 'WHITE');
  drawText(com.score, 3*canvas.width/4, canvas.height/5, 'WHITE');
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
}

function game() {
  update();
  render();
}

const fps = 50;

setInterval(game, 1000/fps)