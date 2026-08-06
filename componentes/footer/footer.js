const rutaBaseFooter =
    window.location.pathname.includes("/To-do%20list/") ||
    window.location.pathname.includes("/Calculadora/")
        ? "../"
        : "";

fetch(`${rutaBaseFooter}componentes/footer/footer.html`)
.then(response => response.text())
.then(data => {

    document.getElementById("footer-container").innerHTML = data;

})
.catch(error => console.error(error));