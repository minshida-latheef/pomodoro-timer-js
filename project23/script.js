const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const modeBtns = document.querySelectorAll(".mode-btn");

let minutes = 25;
let timeLeft = minutes * 60;
let timerId = null;
let isRunning = false;

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  timerDisplay.textContent = formatted;
  document.title = `${formatted} | ZenPulse`;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerId);
    startBtn.textContent = "Start";
    isRunning = false;
  } else {
    isRunning = true;
    startBtn.textContent = "Pause";
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = "Start";
        alert("Time is up!");
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerId);
  isRunning = false;
  startBtn.textContent = "Start";
  timeLeft = minutes * 60;
  updateDisplay();
}

modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    minutes = Number(btn.dataset.time);
    resetTimer();
  });
});

startBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
