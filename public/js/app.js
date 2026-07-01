const TIMES = {
    pomodoro: 3000,
    shortBreak: 600,
    longBreak: 1200
}
const state = {
    mode: 'pomodoro',
    timeLeft: TIMES.pomodoro,
    isRunning: false
};

let timeInterval;

updateTimerDisplay();
console.log(state.timeLeft);

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
    if (state.isRunning === true) return;
    state.isRunning = true;
    changeBackground();
    timeInterval = setInterval(() => {
        if (state.timeLeft > 0) {
            state.timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timeInterval);
        }
    }, 1000);
})

const pauseButton = document.querySelector('#pause-button');
pauseButton.addEventListener('click', () => {
    if (state.timeLeft === 3000 && state.isRunning === false) return;

    if (state.isRunning === true) {
        clearInterval(timeInterval);
        state.isRunning = false;
        pauseButton.textContent = 'Continue';
        changeBackground();
    } else {
        state.isRunning = true;
        pauseButton.textContent = 'Pause';
        changeBackground();

        timeInterval = setInterval(() => {
            if (state.timeLeft > 0) {
                state.timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timeInterval);
            }
        }, 1000);
    }
})

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', () => {
    if (state.isRunning === true) {
        clearInterval(timeInterval);
        state.isRunning = false;
        changeBackground();
    }
    state.timeLeft = TIMES[state.mode];
    updateTimerDisplay();
})


const pomodoroButton = document.querySelector('#pomodoro-button');
pomodoroButton.addEventListener('click', () => {
    switchMode('pomodoro');
});

const shortBreakButton = document.querySelector('#short-break-button');
shortBreakButton.addEventListener('click', () => {
    switchMode('shortBreak');
    document.title = titleTimer(state.timeLeft) + ' - Time for a short break';
});

const longBreakButton = document.querySelector('#long-break-button');
longBreakButton.addEventListener('click', () => {
    switchMode('longBreak');
    document.title = titleTimer(state.timeLeft) + ' - Time for a long break';
});

const settingButton = document.querySelector('#setting-button');
const settingsModal = document.querySelector('#settings-modal');
const saveSettingsButton = document.querySelector('#save-settings');

settingButton.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
});

saveSettingsButton.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
});

function titleTimer(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const timerDisplay = document.querySelector('#timer-display');

    timerDisplay.textContent = formattedTime;
    document.title = formattedTime + ' - Time to focus';
}

function switchMode(mode) {
    clearInterval(timeInterval);
    state.isRunning = false;
    state.mode = mode;
    state.timeLeft = TIMES[mode];
    pauseButton.textContent = 'Pause';
    changeBackground();
    updateTimerDisplay();
}

function changeBackground() {
    if (state.isRunning === true) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    } else {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
    }
}


