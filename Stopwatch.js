var ten, sec, dTen, myInterval;

ten = 0;

function tick() {
  ten ++;
  sec = Math.round(ten / 100);
  dTen = Math.round(ten % 100);
  myTime.textContent = sec + ":" + dTen;
}

function StartFunction() {
  myInterval = setInterval(tick, 10);
}

Start.onclick = StartFunction; 


function StopFunction() {
  clearInterval(myInterval);
}

Stop.onclick = StopFunction; 


function ResetFunction() {
  ten = 0;
  sec = 0;
  Dten = 0;
  myTime.textContent = "00:00";
}

Reset.onclick = ResetFunction; 