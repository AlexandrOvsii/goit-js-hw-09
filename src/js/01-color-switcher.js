const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

stopBtn.classList.add('disabled');
let timerId = null;

function startColorChange() {
  if (timerId === null) {
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      startBtn.classList.add('disabled');
      stopBtn.classList.remove('disabled');
    }, 1000);
  }
}

function stopColorChange() {
  if (timerId !== null) {
    clearInterval(timerId);
    startBtn.classList.remove('disabled');
    stopBtn.classList.add('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
