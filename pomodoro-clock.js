const timer = {
  sessionLength: 1,
  breakLength: 0.07,
  timeStart: 0,
  timeEnd: 0,
  timePause: 0,
  timeSet: 0,
  timeRemaining: 0,
  isSession: false,
  isBreak: false
}

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resumeBtn = document.getElementById('resume')
let countdown;

const startTimer = () => {
  countdown = setInterval(function () {
    const now = Date.now()
    timer.timeRemaining = Math.floor(timer.timeEnd - now)

    adjustTime(timer.timeRemaining)
  }, 1000)
}

startBtn.addEventListener('click', function () {
  startBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')

  timer.isSession = true;
  timer.timeStart = Date.now()
  timer.timeSet = timer.sessionLength * 60 * 1000
  timer.timeEnd = timer.timeStart + timer.timeSet

  startTimer()
})

resumeBtn.addEventListener('click', function () {
  pauseBtn.classList.remove('hide')
  resumeBtn.classList.add('hide')

  timer.timeStart = Date.now()
  timer.timeEnd = timer.timeStart + timer.timePause

  startTimer()
})

const pauseTimer = () => {
  resumeBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')

  const pauseTime = Date.now()
  timer.timePause = timer.timeEnd - pauseTime

  clearInterval(countdown)
}

pauseBtn.addEventListener('click', pauseTimer)

const adjustTime = (ms) => {
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.round((ms % (1000 * 60)) / 1000)

  const adjustMin = minutes < 10 ? `0${minutes}` : minutes
  const adjustSec = seconds < 10 ? `0${seconds}` : seconds

  displayTime.innerHTML = `${adjustMin}:${adjustSec}`
  console.log(adjustMin, adjustSec)
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