import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timePicker: document.getElementById('datetime-picker'),

  startButton: document.querySelector('[data-start]'),
};

refs.startButton.disabled = true; // Делаем кнопку "Start" чтобы она была неактивной

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {  // Функция для обновления отображения таймера на странице
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function startTimer(endDate) {
  refs.timePicker.disabled = true;

  const intervalId = setInterval(() => {
    // Устанавливаем интервал
    const currentDate = new Date(); // Получаем текущее время
    const timeDifferent = endDate - currentDate; //Вычисляем разницу между конечной датой и текущим временем

    if (timeDifferent <= 0) {
      //если разница времени <= 0
      clearInterval(intervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // Обновляем отображение таймера
      refs.startButton.disabled = false; // Отключаем кнопку "Start", чтобы она была неактивной
      refs.timePicker.disabled = false; //возвращаем состояние инпута после окончания таймера, чтобы можно было выбирать даты
    } else {
      // Если разница времени > 0,
      const time = convertMs(timeDifferent); // Конвертируем разницу времени в формат дней, часов, минут и сек
      updateTimerDisplay(time); // Обновляем отображение таймера с использованием полученного времени
    }
  }, 1000);
}

function handleDateSelection(selectedDates) {
  const selectedDate = selectedDates[0]; // Получаем выбранную пользователем дату из массива выбранных дат
  const currentDate = new Date(); // Получаем текущую дату и время

  if (selectedDate <= currentDate) {
    refs.startButton.disabled = true; //делаем кнопку "Start" не активной
    window.alert('Please choose a date in the future');    //показываем alert
    return;
  } else {
    refs.startButton.disabled = false; //делаем кнопку "Start" активной
    refs.startButton.addEventListener('click', () => {
      startTimer(selectedDate);
      refs.startButton.disabled = true; // Делаем кнопку "Start" неактивной изначально
    });
  }
}

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates);
  },
};

flatpickr('#datetime-picker', options);
