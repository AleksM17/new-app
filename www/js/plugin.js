const timer = (function () {

    let countdown,
        timerDisplay,
        endTime,
        alarmSound;

    // Инициализация модуля
    function init(settings) {
        timerDisplay = document.querySelector(settings.timerDisplaySelector);
        endTime = document.querySelector(settings.endTimeSelector);
        alarmSound = new Audio(settings.alarmSound);
    }


    function start(seconds) {
        if (typeof seconds !== "number") return new Error('Please provide seconds!');
        clearInterval(countdown);
        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds);
        displayEndTime(then);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdown);
                alarmSound.play();
                return;
            }
            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        buttonPause.style.display='block';
        timerDisplay.value=seconds;
        const days = Math.floor(seconds / 86400);
        const hour = Math.floor(seconds % 86400 / 3600);
        const minutes = Math.floor(seconds % 86400 % 3600 / 60);
        const reminderSeconds = seconds % 60;
        const display = days ? `${days}:${hour}:${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}` :
            hour ? `${hour}:${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}` :
                `${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        timerDisplay.textContent = display;
        document.title = display;
    }

    function displayEndTime(timestamp) {
        let nows = new Date();
        let nowDay = nows.getDate();
        let nowYear = nows.getFullYear();
        const end = new Date(timestamp);
        const date = end.getDate();
        const month = end.getMonth();
        const year = end.getFullYear();
        const hour = end.getHours();
        const minutes = end.getMinutes();
        endTime.textContent = (date === nowDay && year === nowYear) ? `Be back at  ${hour}:${minutes < 10 ? '0' : ''}${minutes}` :
            `Be back at ${date}.${month + 1}.${year} ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    function stop() {
        clearInterval(countdown);
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }

    return {
        init,
        start,
        stop
    }
})();

const buttons = document.querySelectorAll('[data-time]');
const buttonRev = document.querySelector('.next');
const buttonPause = document.querySelector('.pause');

const form = document.forms['customForm'];
timer.init({
    timerDisplaySelector: '.display__time-left',
    endTimeSelector: '.display__end-time',
    alarmSound: 'audio/bell.mp3'
});

// Start timer on click
function startTimer(e) {
    const seconds = Number(this.dataset.time);
    timer.start(seconds);
}

function inputMin(e) {
    e.preventDefault();
    let min = Number(e.target[0].value);
    timer.start(min * 60);
}
let sec;
function pause(e) {
    buttonPause.style.display='none';
   buttonRev.style.display='block';
   timer.stop();

}
function fooNext(e){
    buttonPause.style.display='block';
    buttonRev.style.display='none';
    let temp=document.querySelector('.display__time-left');
    let sec=temp.value;
    timer.start(sec);
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));
form.addEventListener('submit', inputMin);
buttonPause.addEventListener('click', pause);
buttonRev.addEventListener('click',fooNext);
// const timerBlock = document.querySelector('.timer');
// const timerControls = document.querySelector('.timer__controls');
// const timerBtn = document.querySelector('.timer__button');
//
// // Погружение
// timerBlock.addEventListener('click', function (e) {
//   console.log(this);
// }, true);
//
// timerControls.addEventListener('click', function (e) {
//   console.log(this);
// }, true);
//
// timerBtn.addEventListener('click', function (e) {
//   console.log(this);
// }, true);
//
// // Всплытие
// timerBlock.addEventListener('click', function (e) {
//   console.log(this);
// });
//
// timerControls.addEventListener('click', function (e) {
//   console.log(this);
// });
//
// timerBtn.addEventListener('click', function (e) {
//   console.log(this);
// });



























