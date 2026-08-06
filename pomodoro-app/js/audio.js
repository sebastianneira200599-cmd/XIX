// js/audio.js

export const AudioController = {
    // Cargar archivo de audio (asegúra tener un archivo válido en esa ruta)
    alarmSound: new Audio('D:\GitHub\XIX\pomodoro-app\assets\alarmita.mp3'),

    playAlarm() {
        // Reiniciamos el sonido a 0 por si ya estaba sonando
        this.alarmSound.currentTime = 5; 
        
        // Reproducimos el sonido. 
        // Usamos .catch() para manejar posibles bloqueos del navegador
        this.alarmSound.play().catch(error => {
            console.warn("El navegador bloqueó la reproducción automática del audio:", error);
        });
    },

    stopAlarm() {
        this.alarmSound.pause();
        this.alarmSound.currentTime = 0;
    }
};