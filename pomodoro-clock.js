const timer = {
  sessionLength: 25,
  breakLength: 5,
  timeEnd: 0,
  timeSet: 0,
  isSession: false,
  isBreak: false,
  isTimeChanged: false,
}

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resumeBtn = document.getElementById('resume')
const resetBtn = document.getElementById('reset')
const audio = document.getElementById('audio')
let countdown

// Start Button
startBtn.addEventListener('click', function() {
  // set time for timer
  timer.timeSet = timer.sessionLength * 60

  // show pause button and hide start button
  pauseBtn.classList.remove('hide')
  startBtn.classList.add('hide')

  // set to true for a state of timer
  timer.isSession = true

  // start timer
  stateOfTimer()

  // play sound 
  audio.play()
})

// Pause Button
pauseBtn.addEventListener('click', function() {
  // pause time 
  clearInterval(countdown)
  
  // hide pause button and show resume button
  pauseBtn.classList.add('hide')
  resumeBtn.classList.remove('hide')
})

// Resume Button
resumeBtn.addEventListener('click', function() {
  resumeBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')

  // check if user increase or decrease when 
  if (timer.isTimeChanged && timer.isSession) {
    timer.timeEnd = timer.sessionLength * 60
    timer.isTimeChanged = false
    startTimer()
  } else if (timer.isTimeChanged && timer.isBreak) {
    timer.timeEnd = timer.breakLength * 60 
    timer.isTimeChanged = false
    startTimer()
  } else {
    startTimer()
  }
})

// Reset Button
// Reset each value to default
resetBtn.addEventListener('click', function() {
  clearInterval(countdown)
  timer.sessionLength = 25
  timer.breakLength = 5
  timeEnd = 0
  timer.timeSet = 0
  timer.isSession = false
  timer.isBreak = false
  timer.isTimeChanged = false
  startBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
  resumeBtn.classList.add('hide')

  displayTime.innerHTML = `${timer.sessionLength}:00`
  sessionDisplay.innerHTML = timer.sessionLength
  breakDisplay.innerHTML = timer.breakLength
})

// Timer
const startTimer = () => {
  countdown = setInterval(displayTimer, 1000)
}

// Timer display 
const displayTimer = () => {
  timer.timeEnd--

  let min = Math.floor(timer.timeEnd / 60)
  let sec = timer.timeEnd % 60
  
  let adjustMin = min < 10 ? `0${min}` : min
  let adjustSec = sec < 10 ? `0${sec}` : sec

  // If session length end, clear interval and back to state of timer
  if (timer.timeEnd <= 0 && timer.isSession) {
    timer.isSession = false
    clearInterval(countdown)
    stateOfTimer()
    audio.play()
  }

  // If break length end, clear interval and back to state of timer
  if (timer.timeEnd <= 0 && timer.isBreak) {
    timer.isBreak = false
    clearInterval(countdown)
    stateOfTimer()
    audio.play()
  }
  
  displayTime.innerHTML = `${adjustMin}:${adjustSec}`
}

// Check what state of timer, set timeEnd and call startTimer func
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

// increase and decrease time
sessionIncrease.addEventListener('click', function () {
  timer.sessionLength < 60 && timer.sessionLength++
  sessionDisplay.innerHTML = timer.sessionLength

  if (timer.isSession) {
    timer.isTimeChanged = true
  }

  displayTime.innerHTML = `${timer.sessionLength}:00`
})

sessionDecrease.addEventListener('click', function () {
  timer.sessionLength > 1 && timer.sessionLength--
  sessionDisplay.innerHTML = timer.sessionLength

  if (timer.isSession) {
    timer.isTimeChanged = true
  }

  displayTime.innerHTML = `${timer.sessionLength}:00`
})

breakIncrease.addEventListener('click', function () {
  timer.breakLength < 5 && timer.breakLength++
  breakDisplay.innerHTML = timer.breakLength

  if (timer.isBreak) {
    timer.isTimeChanged = true
  }
})

breakDecrease.addEventListener('click', function () {
  timer.breakLength > 1 && timer.breakLength--
  breakDisplay.innerHTML = timer.breakLength

  if (timer.isBreak) {
    timer.isTimeChanged = true
  }
})