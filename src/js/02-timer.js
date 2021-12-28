import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    btn: document.querySelector('[data-start]'),
    daysSpan: document.querySelector('[data-days]'),
    hoursSpan: document.querySelector('[data-hours]'),
    minutesSpan: document.querySelector('[data-minutes]'),
    secondsSpan: document.querySelector('[data-seconds]'),
}
refs.btn.disabled = true;
const counterTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const counterDate = selectedDates[0];
        const currentDate = this.config.defaultDate.getTime();
        if (currentDate > counterDate) {
            Notiflix.Notify.failure('Please choose a date in the future')
            return;
        }
        refs.btn.disabled = false;  
  },
};

const datePickr = flatpickr(refs.input, options);
refs.btn.addEventListener('click', () => {
    timer.end();
});

const timer = {
    isActive: false,
    end() {
        if (this.isActive) {
            return;
        }
            
       
        this.isActive = true;

        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = datePickr.selectedDates[0] - currentTime;
            const time = getTimeComponents(deltaTime);
            updatrClockFace(time);
            if (deltaTime < 1000) {
            clearInterval(intervalId);
        }
        }, 1000);
        
    },
    
};

function updatrClockFace({ days, hours, mins, secs }) {
    refs.daysSpan.textContent = `${days}`;
    refs.hoursSpan.textContent = `${hours}`;
    refs.minutesSpan.textContent = `${mins}`;
    refs.secondsSpan.textContent = `${secs}`;

    
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
}