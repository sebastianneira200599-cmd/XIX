const rutaBase =
    window.location.pathname.includes("/To-do%20list/") ||
    window.location.pathname.includes("/Calculadora/")
        ? "../"
        : "";

fetch(`${rutaBase}componentes/header.html`)
.then(response => response.text())
.then(data => {
    
    document.getElementById("header-container").innerHTML = data;

    // Corregir enlaces en subcarpetas
    if (rutaBase === "../") {

        document.querySelector(".logo").href = "../index.html";

        document.querySelector('[data-page="index.html"]').href = "../index.html";

        document.querySelector('[data-page="quienes-somos.html"]').href = "../quienes-somos.html";

    }

        // Obtener el nombre del archivo actual
        let paginaActual = window.location.pathname.split("/").pop();

        // Si la URL termina en "/", considerar que es index.html
        if (paginaActual === "") {
            paginaActual = "index.html";
        }

        // Buscar todos los enlaces del menú
        const enlaces = document.querySelectorAll(".menu a");

        enlaces.forEach(function(enlace){

                console.log("Página actual:", paginaActual);
                console.log("Enlace:", enlace.dataset.page);

            if(enlace.dataset.page === paginaActual){

                console.log("ACTIVO");

                enlace.classList.add("active");

            }

        });

    })
    .catch(error => console.error(error));