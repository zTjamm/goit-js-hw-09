import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const timer = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let num = null;
button.setAttribute('disabled', true);
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if(Date.parse(selectedDates[0])> Date.now()){
          button.removeAttribute('disabled');
          let timeDelay = Date.parse(selectedDates[0])-Date.now();
          const timeDelayText = convertMs(timeDelay);
          days.textContent = `${pad(timeDelayText.days)}`;
          hours.textContent = `${pad(timeDelayText.hours)}`;
          minutes.textContent = `${pad(timeDelayText.minutes)}`;
          seconds.textContent = `${pad(timeDelayText.seconds)}`;
          clearInterval(num);
      }else{
          alert('Выберите более позднюю дату!')
      }
    },
  };
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
    return String(value).padStart(2, '0')
}
const dateIn = flatpickr(timer, options);
button.addEventListener('click', start);
function start(){
    const startTime = Date.parse(dateIn.selectedDates[0]);
    button.setAttribute('disabled', true);
    num = setInterval(()=>{
        const currentTime =Date.now();
        let delayTime = startTime - currentTime;
        const timeDelayText = convertMs(delayTime);
        days.textContent = `${pad(timeDelayText.days)}`;
        hours.textContent = `${pad(timeDelayText.hours)}`;
        minutes.textContent = `${pad(timeDelayText.minutes)}`;
        seconds.textContent = `${pad(timeDelayText.seconds)}`;
        if(Math.round(delayTime/1000)===0){
            alert('Время вышло!')
            clearInterval(num);
            return;
        }
    },1000);
}