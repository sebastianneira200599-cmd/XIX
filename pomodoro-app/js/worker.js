// js/worker.js

let intervalId = null;

// Escuchamos los mensajes que nos envía el hilo principal
self.onmessage = function(e) {
    if (e.data === 'start') {
        // Evitamos crear múltiples intervalos si se presiona "start" varias veces
        if (!intervalId) {
            intervalId = setInterval(() => {
                // Le avisamos al hilo principal que pasó un segundo
                self.postMessage('tick');
            }, 1000);
        }
    } else if (e.data === 'stop') {
        // Detenemos el reloj
        clearInterval(intervalId);
        intervalId = null;
    }
};