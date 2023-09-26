import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  delayInput: document.querySelector('[name=delay]'),
  stepInput: document.querySelector('[name=step]'),
  amountInput: document.querySelector('[name=amount]'),
};

refs.formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const firstDelay = Number(refs.delayInput.value); //1000
  const delayStep = Number(refs.stepInput.value); //500
  const amount = Number(refs.amountInput.value); //5

  createPromises(firstDelay, delayStep, amount);
}

function createPromises(firstDelay, delayStep, amount) {
  for (let i = 1; i <= amount; i += 1) {
    const delay = firstDelay + (i - 1) * delayStep; //получаем на первой итерации 1000: i - 1 = 0, 0 * 500 = 0, firstDelay(1000) + 0 = 1000
    let position = i;

    createPromise(position, delay) //вызываем функцию и передаем туда позицию и задержку на каждой итерации
    .then(({position, delay }) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    .catch(({position, delay }) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)) 
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay }); //
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}