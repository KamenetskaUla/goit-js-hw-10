import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const btnStart = document.querySelector('[data-start]');
const secondsSpan = document.querySelector('[data-seconds]');
const minutesSpan = document.querySelector('[data-minutes]');
const hoursSpan = document.querySelector('[data-hours]');
const daysSpan = document.querySelector('[data-days]');
const input = document.querySelector('#datetime-picker');
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      iziToast.warning({
        title: 'Caution',
        message: 'Please choose a date in the future',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onStartTimer);
function onStartTimer() {
  input.disabled = true;
  btnStart.disabled = true;
  const intervalId = setInterval(() => {
    const diff = userSelectedDate - new Date();
    const date = convertMs(diff);
    secondsSpan.textContent = pad(date.seconds);
    minutesSpan.textContent = pad(date.minutes);
    hoursSpan.textContent = pad(date.hours);
    daysSpan.textContent = pad(date.days);

    if (diff < 1000) {
      clearInterval(intervalId);
      input.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
