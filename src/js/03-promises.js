import Notiflix from 'notiflix'; //подключаем библиотеку

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name=delay]'),
  stepInput: document.querySelector('[name=step]'),
  amountInput: document.querySelector('[name=amount]'),
};

refs.form.addEventListener('submit', onSubmit); //вешаем слушателя событий на сабмит и создаем ф-цию

function onSubmit(evt) {
  evt.preventDefault(); //сбрасываем станд. настройки браузера

  const firstDelay = Number(refs.delayInput.value); //при нажатии кнопки записываем значение, которые пришли из инпутов
  const delayStep = Number(refs.stepInput.value); //при нажатии кнопки записываем значение, которые пришли из инпутов
  const amount = Number(refs.amountInput.value); //при нажатии кнопки записываем значение, которые пришли из инпутов

  createPromises(firstDelay, delayStep, amount); //запускаем ф-цию с этими значениями
}

function createPromises(firstDelay, delayStep, amount) {
  for (let i = 1; i <= amount; i += 1) {
    const delay = firstDelay + (i - 1) * delayStep;

    let position = i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  // refs.form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
