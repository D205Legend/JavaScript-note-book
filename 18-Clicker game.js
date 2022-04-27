var myScore = 0;

function eventHandler() {
  myScore += 1;
  score.textContent = "Score: " + myScore;
}

diamond.onclick = eventHandler;