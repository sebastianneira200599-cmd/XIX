// ==============================
// Obtener elementos del HTML
// ==============================

const inputTarea = document.getElementById("nuevaTarea");
const botonAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

// ==============================
// Evento del botón
// ==============================

botonAgregar.addEventListener("click", agregarTarea);

// ==============================
// Función para agregar una tarea
// ==============================

function agregarTarea() {

    // Obtener el texto escrito por el usuario
    const texto = inputTarea.value;

    // Evitar tareas vacías
    if (texto === "") {
        alert("Debes escribir una tarea.");
        return;
    }

    // Crear un nuevo elemento <li>
    const nuevaTarea = document.createElement("li");

    // Agregar el texto al elemento
    nuevaTarea.textContent = texto;

    // Agregar el elemento a la lista
    listaTareas.appendChild(nuevaTarea);

    // Limpiar el cuadro de texto
    inputTarea.value = "";

    // Volver a colocar el cursor en el input
    inputTarea.focus();
}