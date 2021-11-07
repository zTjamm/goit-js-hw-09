import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('input[name = delay]'),
  step: document.querySelector('input[name =step]'),
  amount: document.querySelector('input[name =amount]'),
};
let setID = null;
let DATA = [];
refs.form.addEventListener('input', onPromise);
refs.form.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();  
  delayBilder(refs.amount, refs.delay, refs.step);
  DATA.forEach((currentValue, index) => {   
    createPromise(index, currentValue).then(onSucsess).catch(onError);
  });
  DATA = [];
clearTimeout(setID);
}
function onSucsess(result) {  
  Notiflix.Notify.success(`${result}`);
}
function onError(error) {  
  Notiflix.Notify.warning(`${error}`);
}
function onPromise(e) {
  refs[e.target.name] = e.target.value;  
}
function delayBilder(amount, delay, step) {
  DATA = []
  for (let i = 0; i < amount; i += 1) {
    delay = Number(delay);
    step = Number(step);
    const total = delay + step*i     
    DATA.push(total);
    console.log(DATA);
  }
}
function createPromise(position, delay) {
  return new Promise((reslove, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const setID = setTimeout(() => {
      if (shouldResolve) {
        reslove(`✅ Fulfilled promise ${position+1} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position+1} in ${delay}ms`);
    }, delay);
  });
}