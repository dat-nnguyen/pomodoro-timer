// controller.js

export const TIMES = {
    pomodoro: 3000,
    shortBreak: 600,
    longBreak: 1200
};

export const state = {
    mode: 'pomodoro',
    timeLeft: TIMES.pomodoro,
    isRunning: false
};

export function titleTimer(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.querySelector('#timer-display').textContent = formattedTime;
    document.title = formattedTime + ' - Time to focus';
}

export function changeBackground() {
    if (state.isRunning === true) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    } else {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
    }
}