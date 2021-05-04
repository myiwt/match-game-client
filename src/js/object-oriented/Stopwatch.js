// START CLOCK SCRIPT

const startMin = 0;
let time = startMin * 60; // let variable type means that time value can keep changing

const countdownEl = document.getElementById('timer');

setInterval(updateCountdown, 1);

function updateCountdown() {
  const mins = Math.floor(time/6000);
  let seconds = (Math.floor(time/100))%60;
  let milliseconds = time%1000;
  countdownEl.innerHTML = `${mins}: ${seconds}: ${milliseconds}`;
  time++;
}

function stopClock() {
  return time;
}