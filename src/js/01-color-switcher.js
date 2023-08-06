const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

refs.startButton.addEventListener('click', startColorChange);
refs.stopButton.addEventListener('click', stopColorChange);

let intervalId = null;

function startColorChange() {
  if (intervalId === null) {
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  refs.startButton.disabled = true;
  refs.stopButton.disabled = false;
}

function stopColorChange() {
  if (setInterval !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  refs.startButton.disabled = false;
  refs.stopButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
