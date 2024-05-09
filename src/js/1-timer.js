import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
let userSelectedDate = null;
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      alert('Please choose a date in the future');
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
  const intervalId = setInterval(() => {
    const diff = userSelectedDate - new Date();
    console.log(convertMs(diff));
    if (diff < 1000) {
      clearInterval(intervalId);
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
