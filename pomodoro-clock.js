const timer = {
  sessionLength: 0.1,
  breakLength: 0.1,
  timeStart: 0,
  timeEnd: 0,
  timePause: 0,
  timeSet: 0,
  timeRemaining: 0,
  isSession: false,
  isBreak: false
}

`from timer`

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resumeBtn = document.getElementById('resume')

// Display and Button section
const displayTime = document.getElementById('displayTime');
const sessionDisplay = document.getElementById('sessionLength');
const sessionIncrease = document.getElementById('sessionIncrease');
const sessionDecrease = document.getElementById('sessionDecrease');
const breakDisplay = document.getElementById('breakLength');
const breakIncrease = document.getElementById('breakIncrease');
const breakDecrease = document.getElementById('breakDecrease');

displayTime.innerHTML = `${timer.sessionLength}:00`
sessionDisplay.innerHTML = timer.sessionLength
breakDisplay.innerHTML = timer.breakLength

sessionIncrease.addEventListener('click', function () {
  timer.sessionLength < 15 && timer.sessionLength++
  sessionDisplay.innerHTML = timer.sessionLength

  displayTime.innerHTML = `${timer.sessionLength}:00`
})

sessionDecrease.addEventListener('click', function () {
  timer.sessionLength > 1 && timer.sessionLength--
  sessionDisplay.innerHTML = timer.sessionLength

  displayTime.innerHTML = `${timer.sessionLength}:00`
})

breakIncrease.addEventListener('click', function () {
  timer.breakLength < 5 && timer.breakLength++
  breakDisplay.innerHTML = timer.breakLength
})

breakDecrease.addEventListener('click', function () {
  timer.breakLength > 1 && timer.breakLength--
  breakDisplay.innerHTML = timer.breakLength
})