import Notiflix from 'notiflix';


const refs = {
  form: document.querySelector('.form'),  
};

refs.form.addEventListener('submit', onBtnSubmit);


function onBtnSubmit(e) {
  e.preventDefault();
  
  let delay1 = Number(e.currentTarget.elements.delay.value);
  let step = Number(e.currentTarget.elements.step.value);
  let amount = Number(e.currentTarget.elements.amount.value);

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    let delay = delay1 + step * i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          width: '40vw',
        });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          width: '40vw',
        });
      });   
  };  
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
  return promise;
};
