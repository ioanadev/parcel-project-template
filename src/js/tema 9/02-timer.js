import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const dateTime = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
let days = document.querySelector('[data-days]');
let hours = document.querySelector('[data-hours]');
let minutes = document.querySelector('[data-minutes]');
let seconds = document.querySelector('[data-seconds]');
console.log(days);
//days.innerHTML = '29';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //  console.log(selectedDates[0]);
    //  console.log(new Date());
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      //window.alert('Please choose a date in the future');
      btnStart.setAttribute('disabled', 'disabled');
    } else if (selectedDates[0] > new Date()) {
      btnStart.removeAttribute('disabled');
      btnStart.addEventListener('click', () => {
        console.log('S-a apasat butonul start!');
        timerId = setInterval(() => {
          let miliSec = selectedDates[0] - new Date();
          miliSec = convertMs(miliSec);
          console.log(miliSec);
          days.innerHTML = addLeadingZero(miliSec.days);
          hours.innerHTML = addLeadingZero(miliSec.hours);
          minutes.innerHTML = addLeadingZero(miliSec.minutes);
          seconds.innerHTML = addLeadingZero(miliSec.seconds);
        }, 0);
      });
    }
  },
};
flatpickr(dateTime, options);
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
