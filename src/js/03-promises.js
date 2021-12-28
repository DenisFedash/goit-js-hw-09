import Notiflix from 'notiflix';


const refs = {
  form: document.querySelector('.form'),  
};

refs.form.addEventListener('submit', onBtnSubmit);


function onBtnSubmit(e) {
  e.preventDefault();
  let position = 0;
  let delay = Number(e.currentTarget.elements.delay.value);
  let step = Number(e.currentTarget.elements.step.value);
  let amount = Number(e.currentTarget.elements.amount.value);
  
  const setIntervalId = setInterval(() => {
    if (position === amount) {
      clearInterval(setIntervalId) 
      position = 0;
      return     
    }
     
    position += 1;
    setTimeout(() => {
      delay += step;    
    });
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
    })
  }, delay)
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  })
  return promise;
}
