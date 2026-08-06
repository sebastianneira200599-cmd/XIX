export const UI = {
    display: document.getElementById('time-display'),
    btnStart: document.getElementById('btn-start'),
    btnPause: document.getElementById('btn-pause'),
    btnReset: document.getElementById('btn-reset'),
    
    // Botones de modo
    btnPomodoro: document.getElementById('btn-pomodoro'),
    btnShortBreak: document.getElementById('btn-short-break'),
    btnLongBreak: document.getElementById('btn-long-break'),

    updateDisplay(timeString) {
        this.display.textContent = timeString;
        document.title = `${timeString} - Pomodoro`; // Actualiza la pestaña del navegador
    },

    updateActiveModeButton(activeBtn) {
        [this.btnPomodoro, this.btnShortBreak, this.btnLongBreak].forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
};