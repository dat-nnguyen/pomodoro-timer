// app.js

import { state, TIMES, updateTimerDisplay, changeBackground, titleTimer } from './controller.js';

// --- Sounds & Setup ---
const clickSound = new Audio('assets/click-sound.mp3');
const alarmSound = new Audio('assets/alarm-sound.mp3');
let timeInterval;

// Initialize App
updateTimerDisplay();


const allButtons = document.querySelectorAll('button');
allButtons.forEach((button) => {
    button.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});


function switchMode(mode) {
    clearInterval(timeInterval);
    state.isRunning = false;
    state.mode = mode;
    state.timeLeft = TIMES[mode];
    document.querySelector('#pause-button').textContent = 'Pause';
    changeBackground();
    updateTimerDisplay();
}

// --- Start / Pause / Reset Buttons ---
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
            alarmSound.play();
        }
    }, 1000);
});

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
                alarmSound.play();
            }
        }, 1000);
    }
});

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', () => {
    if (state.isRunning === true) {
        clearInterval(timeInterval);
        state.isRunning = false;
        changeBackground();
    }
    state.timeLeft = TIMES[state.mode];
    updateTimerDisplay();
});

// --- Mode Buttons ---
const pomodoroButton = document.querySelector('#pomodoro-button');
pomodoroButton.addEventListener('click', () => switchMode('pomodoro'));

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

// --- Settings Modal ---
const settingButton = document.querySelector('#setting-button');
const settingsModal = document.querySelector('#settings-modal');
const saveSettingsButton = document.querySelector('#save-settings');

settingButton.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
});

saveSettingsButton.addEventListener('click', () => {
    const newPomodoroTime = parseInt(document.querySelector('#pomodoro-input').value) || 50;
    const newShortBreakTime = parseInt(document.querySelector('#short-break-input').value) || 5;
    const newLongBreakTime = parseInt(document.querySelector('#long-break-input').value) || 15;

    TIMES.pomodoro = newPomodoroTime * 60;
    TIMES.shortBreak = newShortBreakTime * 60;
    TIMES.longBreak = newLongBreakTime * 60;

    const volumeLevel = parseFloat(document.querySelector('#alarm-volume-input').value);
    alarmSound.volume = volumeLevel;
    clickSound.volume = volumeLevel;

    clearInterval(timeInterval);
    state.isRunning = false;
    pauseButton.textContent = 'Pause';
    changeBackground();

    state.timeLeft = TIMES[state.mode];
    updateTimerDisplay();
    settingsModal.classList.add('hidden');
});

const themeSwitcher = document.querySelectorAll('.color-circle');

themeSwitcher.forEach((circle) => {
    circle.addEventListener('click', () => {
        themeSwitcher.forEach((circle) => circle.classList.remove('active-color'));
        circle.classList.add('active-color');

        const chosenColor = circle.dataset.color;

        document.documentElement.style.setProperty('--bg-color', chosenColor);
    });
});