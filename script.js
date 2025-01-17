const cambiarTemaBtn = document.getElementById("cambiarTemaBtn");
const aumentarTextoBtn = document.getElementById("aumentarTextoBtn");
const leerPaginaBtn = document.createElement("button");
const cambiarFondoBtn = document.getElementById("cambiarFondoBtn");
const contador = document.getElementById("contador");
const incrementarContadorBtn = document.getElementById("incrementarContadorBtn");
const irArribaBtn = document.getElementById("irArribaBtn");
const encabezado = document.querySelector("header h1");

definirBarraProgreso();

function definirBarraProgreso() {
    const barraProgreso = document.createElement("div");
    barraProgreso.id = "barraProgreso";
    barraProgreso.style.position = "fixed";
    barraProgreso.style.top = "0";
    barraProgreso.style.left = "0";
    barraProgreso.style.height = "5px";
    barraProgreso.style.width = "0%";
    barraProgreso.style.backgroundColor = "#28a745";
    barraProgreso.style.zIndex = "1000";
    document.body.appendChild(barraProgreso);
}

leerPaginaBtn.textContent = "Leer Página";
leerPaginaBtn.classList.add("btn", "btn-light");
aumentarTextoBtn.parentNode.insertBefore(leerPaginaBtn, aumentarTextoBtn.nextSibling);

let temaOscuro = false;
let textoAumentado = false;
let tamañoOriginal = 16;
let clics = 0;

function generarColorAleatorio() {
    const caracteres = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += caracteres[Math.floor(Math.random() * 16)];
    }
    return color;
}

function actualizarSaludo() {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) {
        encabezado.textContent = "Buenos días";
    } else if (hora >= 12 && hora < 21) {
        encabezado.textContent = "Buenas tardes";
    } else {
        encabezado.textContent = "Buenas noches";
    }
}

actualizarSaludo();

function leerPagina() {
    const texto = document.body.innerText;
    const speech = new SpeechSynthesisUtterance(texto);
    speech.lang = "es-ES";
    window.speechSynthesis.speak(speech);
}

leerPaginaBtn.addEventListener("click", leerPagina);

cambiarTemaBtn.addEventListener("click", () => {
    if (temaOscuro) {
        document.body.classList.remove("bg-dark", "text-white");
        document.body.classList.add("bg-light", "text-dark");
        temaOscuro = false;
    } else {
        document.body.classList.remove("bg-light", "text-dark");
        document.body.classList.add("bg-dark", "text-white");
        temaOscuro = true;
    }
});

aumentarTextoBtn.addEventListener("click", () => {
    if (!textoAumentado) {
        document.body.style.fontSize = (tamañoOriginal + 2) + "px";
        textoAumentado = true;
    } else {
        document.body.style.fontSize = tamañoOriginal + "px";
        textoAumentado = false;
    }
});

cambiarFondoBtn.addEventListener("click", () => {
    document.getElementById("seccion1").style.backgroundColor = generarColorAleatorio();
});

incrementarContadorBtn.addEventListener("click", () => {
    clics++;
    contador.textContent = clics;
});

irArribaBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    const distanciaDelFinal = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
    if (distanciaDelFinal < 200) {
        irArribaBtn.style.display = "block";
    } else {
        irArribaBtn.style.display = "none";
    }

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("barraProgreso").style.width = scrollPercent + "%";
});
