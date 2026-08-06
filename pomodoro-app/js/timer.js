// js/timer.js

export class Timer {
    constructor(updateCallback, completeCallback) {
        this.timeLeft = 25 * 60;
        this.isRunning = false;
        
        this.onUpdate = updateCallback; 
        this.onComplete = completeCallback;

        // Inicializamos el Web Worker
        this.worker = new Worker('js/worker.js');
        
        // Escuchamos los 'ticks' que envía el Worker
        this.worker.onmessage = (e) => {
            if (e.data === 'tick') {
                this.tick();
            }
        };
    }

    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.onUpdate(this.getTimeFormatted());
        } else {
            this.pause();
            this.onComplete();
        }
    }

    setMode(minutes) {
        this.pause();
        this.timeLeft = minutes * 60;
        this.onUpdate(this.getTimeFormatted());
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        // Le decimos al Worker que empiece a contar
        this.worker.postMessage('start');
    }

    pause() {
        this.isRunning = false;
        // Le decimos al Worker que se detenga
        this.worker.postMessage('stop');
    }

    reset(defaultMinutes) {
        this.pause();
        this.timeLeft = defaultMinutes * 60;
        this.onUpdate(this.getTimeFormatted());
    }

    getTimeFormatted() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}