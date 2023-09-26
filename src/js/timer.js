import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const inputDate = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates[0]);
  },
};

function handleDateSelection(selectedDates) {
  const selectedDate = selectedDates;
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    startBtn.classList.add('disabled');
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    startBtn.classList.remove('disabled');
    startBtn.addEventListener('click', () => {
      timerOnClick(selectedDate);
    });
  }
}

function timerOnClick(selectedDate) {
  inputDate.disabled = true;
  startBtn.classList.add('disabled');
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const differentTime = selectedDate - currentDate;

    if (differentTime <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const time = convertMs(differentTime);
      updateTimerDisplay(time);
    }
  }, 1000);
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value){
  return value.toString().padStart(2, 0)
}

flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

