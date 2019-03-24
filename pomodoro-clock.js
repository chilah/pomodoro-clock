const timer = {
  sessionLength: 1,
  breakLength: 2,
  timeStart: 0,
  timeEnd: 0,
  timeSet: 0,
  isSession: false,
  isBreak: false
}

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resumeBtn = document.getElementById('resume')
let countdown

startBtn.addEventListener('click', function() {
  timer.timeSet = timer.sessionLength * 60
  pauseBtn.classList.remove('hide')
  startBtn.classList.add('hide')
  timer.isSession = true
  stateOfTimer()
})

pauseBtn.addEventListener('click', function() {
  clearInterval(countdown)
  pauseBtn.classList.add('hide')
  resumeBtn.classList.remove('hide')
})

resumeBtn.addEventListener('click', function() {
  resumeBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
  startTimer()
})

const startTimer = () => {
  countdown = setInterval(displayTimer, 1000)
}

const displayTimer = () => {
  timer.timeEnd--

  let min = Math.floor(timer.timeEnd / 60)
  let sec = timer.timeEnd % 60
  
  let adjustMin = min < 10 ? `0${min}` : min
  let adjustSec = sec < 10 ? `0${sec}` : sec

  if (timer.timeEnd <= 0 && timer.isSession) {
    timer.isSession = false
    clearInterval(countdown)
    stateOfTimer()
  }

  if (timer.timeEnd <= 0 && timer.isBreak) {
    timer.isBreak = false
    clearInterval(countdown)
    stateOfTimer()
  }
  console.log(adjustMin, adjustSec)
}

const stateOfTimer = () => {
  if (timer.isSession) {
    timer.timeEnd = timer.timeSet
    startTimer()
  } else {
    timer.timeSet = timer.breakLength * 60
    timer.timeEnd = timer.timeSet
    timer.isBreak = true
    startTimer()
  }
}
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