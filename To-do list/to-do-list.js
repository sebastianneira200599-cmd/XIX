// ==============================
// Variables
// ==============================

const inputTarea = document.getElementById("nuevaTarea");
const botonAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

// Arreglo principal
let tareas = [];

// ==============================
// Eventos
// ==============================

// Botón Agregar
botonAgregar.addEventListener("click", agregarTarea);

// Tecla Enter
inputTarea.addEventListener("keydown", detectarEnter);

// Cargar tareas guardadas
cargarTareas();

// ==============================
// Funciones
// ==============================

// Agregar una nueva tarea
function agregarTarea() {

    const texto = inputTarea.value.trim();

    if (texto === "") {
        alert("Debes escribir una tarea.");
        return;
    }

    tareas.push({
        texto: texto,
        completada: false
    });

    guardarTareas();
    mostrarTareas();

    inputTarea.value = "";
    inputTarea.focus();
}

// Mostrar todas las tareas
function mostrarTareas() {

    // Limpiar la lista
    listaTareas.innerHTML = "";

    // Recorrer el arreglo
    tareas.forEach(function (tarea, indice) {

        // Crear <li>
        const li = document.createElement("li");

        // ------------------------
        // Botón completar
        // ------------------------

        const btnCompletar = document.createElement("button");

        btnCompletar.textContent = tarea.completada ? "☑" : "☐";

        if (tarea.completada) {
            li.classList.add("completada");
        }

        btnCompletar.addEventListener("click", function () {

            tareas[indice].completada = !tareas[indice].completada;

            guardarTareas();

            mostrarTareas();

        });

        // ------------------------
        // Texto
        // ------------------------

        const span = document.createElement("span");

        // Ejercicio: mostrar número de tarea
        span.textContent = (indice + 1) + ". " + tarea.texto;

        // ------------------------
        // Botón eliminar
        // ------------------------

        const btnEliminar = document.createElement("button");

        btnEliminar.textContent = "🗑";

        btnEliminar.addEventListener("click", function () {

            tareas.splice(indice, 1);

            guardarTareas();

            mostrarTareas();

        });

        // ------------------------
        // Agregar elementos al <li>
        // ------------------------

        li.appendChild(btnCompletar);
        li.appendChild(span);
        li.appendChild(btnEliminar);

        listaTareas.appendChild(li);

    });

}

// Guardar tareas en localStorage
function guardarTareas() {

    localStorage.setItem("tareas", JSON.stringify(tareas));

}

// Cargar tareas desde localStorage
function cargarTareas() {

    const datos = localStorage.getItem("tareas");

    if (datos) {

        tareas = JSON.parse(datos);

        mostrarTareas();

    }

}

// Detectar la tecla Enter
function detectarEnter(evento) {

    if (evento.key === "Enter") {

        agregarTarea();

    }

}