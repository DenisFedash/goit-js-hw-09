function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]')
}

let timerId = null;

refs.start.addEventListener('click', () => {
    refs.start.disabled = true;
    refs.stop.disabled = false;
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.backgroundColor = color;
    }, 1000)
});
refs.stop.addEventListener('click', () => {
    refs.stop.disabled = true;
    refs.start.disabled = false;
    
    clearInterval(timerId);
});

