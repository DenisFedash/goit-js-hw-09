import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

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
            toastr.warning('Please choose a date in the future')
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
        
        // const endTime = Date.now();
        this.isActive = true;

        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = datePickr.selectedDates[0] - currentTime;
            const { days, hours, mins, secs } = getTimeComponents(deltaTime);
            updatrClockFace({ days, hours, mins, secs })
            // console.log(`${days}:${hours}:${mins}:${secs}`)
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