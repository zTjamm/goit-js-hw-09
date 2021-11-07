
const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');  
let randomID = null;
  btnStop.setAttribute('disabled', true);
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  btnStart.addEventListener('click', randomColorStart);
  function randomColorStart() {
    btnStart.setAttribute('disabled', true);
    btnStop.removeAttribute('disabled');  
    randomID = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
  btnStop.addEventListener('click', randomColorStop);
  function randomColorStop() {
    clearInterval(randomID);
    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', true);
  }