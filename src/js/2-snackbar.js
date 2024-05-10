import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);

  const state = event.target.elements.state.value;

  createPromise(delay, state).then(resultHandler).catch(errorHandler);
  form.reset();
}
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
}
function resultHandler(result) {
  iziToast.success({
    message: `✅ Fulfilled promise in ${result}ms`,
  });
}
function errorHandler(error) {
  iziToast.error({
    message: `❌ Rejected promise in ${error}ms`,
  });
}
