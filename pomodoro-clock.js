const timer = {
  sessionLength: 10,
  breakLength: 2,
  timeStart: 0,
  timeEnd: 0,
  timePause: 0,
  timeLeft: 0,
  isStart: false,
  isPause: false
}

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resumeBtn = document.getElementById('resume')
let countdown;

const startTimer = () => {
  clearInterval(countdown)
  timer.timeStart = Date.now()
  timer.timeEnd = timer.sessionLength * (60 * 1000) + timer.timeStart
  
  countdown = setInterval(() => {
    const then = Math.round((timer.timeEnd - Date.now()) / 1000)
    const minutes = Math.floor(then / 60)
    const seconds = Math.floor(then % 60)

    const adjustMin = minutes < 10 ? `0${minutes}` : minutes
    const adjustSec = seconds < 10 ? `0${seconds}` : seconds

    console.log(adjustMin, adjustSec, "timeleft", timer.timeEnd - timer.timeStart)
  }, 1000)
}

startBtn.addEventListener('click', function() {
  startBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
  startTimer()
})

const resume = () => {
  timer.timeLeft = (timer.timeEnd - timer.timePause) + Date.now()

  countdown = setInterval(() => {
    const then = Math.round((timer.timeLeft - Date.now()) / 1000)
    const minutes = Math.floor(then / 60)
    const seconds = Math.floor(then % 60)

    const adjustMin = minutes < 10 ? `0${minutes}` : minutes
    const adjustSec = seconds < 10 ? `0${seconds}` : seconds

    console.log(adjustMin, adjustSec)
  }, 1000)
}

resumeBtn.addEventListener('click', function() {
  pauseBtn.classList.remove('hide')
  resumeBtn.classList.add('hide')
  // clearInterval(countdown)
  resume()
})

const pauseTimer = () => {
  resumeBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')

  timer.timePause = Date.now()

  clearInterval(countdown)
}

pauseBtn.addEventListener('click', pauseTimer)

// Display and Button section
const displayTime = document.getElementById('displayTime');
const sessionDisplay = document.getElementById('sessionLength');
const sessionIncrease = document.getElementById('sessionIncrease');
const sessionDecrease = document.getElementById('sessionDecrease');
const breakDisplay = document.getElementById('breakLength');
const breakIncrease = document.getElementById('breakIncrease');
const breakDecrease = document.getElementById('breakDecrease');

displayTime.innerHTML = `${timer.sessionLength}:00`
sessionDisplay.innerHTML = timer.sessionLength;
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