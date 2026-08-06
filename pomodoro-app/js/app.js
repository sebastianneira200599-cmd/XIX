// js/app.js

import { Timer } from './timer.js';
import { UI } from './ui.js';
import { AudioController } from './audio.js'; // Importamos el nuevo módulo

const MODES = {
    pomodoro: 25,
    shortBreak: 1,
    longBreak: 15
};

let currentMode = MODES.pomodoro;

// Actualizamos la inicialización del Timer
const pomodoroTimer = new Timer(
    (timeString) => UI.updateDisplay(timeString),
    () => {
        // ¡Aquí disparamos el sonido cuando el tiempo llega a cero!
        AudioController.playAlarm();
        
        // Opcional: Puedes dejar el alert, aunque con el sonido ya no es tan necesario.
        // Si lo dejas, el navegador podría pausar el sonido hasta que cierres el alert.
        console.log("¡El tiempo ha terminado!"); 
    }
);

// --- Eventos de Controles ---
UI.btnStart.addEventListener('click', () => {
    pomodoroTimer.start();
    // Pro-tip: A veces es buena idea detener la alarma si estaba sonando y presionas "Iniciar"
    AudioController.stopAlarm(); 
});
UI.btnPause.addEventListener('click', () => pomodoroTimer.pause());
UI.btnReset.addEventListener('click', () => {
    pomodoroTimer.reset(currentMode);
    AudioController.stopAlarm();
});

// --- Eventos de Modos ---
UI.btnPomodoro.addEventListener('click', (e) => {
    currentMode = MODES.pomodoro;
    pomodoroTimer.setMode(currentMode);
    UI.updateActiveModeButton(e.target);
    AudioController.stopAlarm();
});

UI.btnShortBreak.addEventListener('click', (e) => {
    currentMode = MODES.shortBreak;
    pomodoroTimer.setMode(currentMode);
    UI.updateActiveModeButton(e.target);
    AudioController.stopAlarm();
});

UI.btnLongBreak.addEventListener('click', (e) => {
    currentMode = MODES.longBreak;
    pomodoroTimer.setMode(currentMode);
    UI.updateActiveModeButton(e.target);
    AudioController.stopAlarm();
});