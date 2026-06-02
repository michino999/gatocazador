const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");
let tiempo = 60;
let puntos = 0;
let record = Number(localStorage.getItem("record")) || 0;
let juegoIniciado = false;
let velocidadGato = 20;

let gato = { x: 300, y: 200, w: 40, h: 40 };
let raton = { x: 100, y: 100, w: 30, h: 30 };

// --- Lógica de Menús ---
function abrirAjustes() {
    document.getElementById("menu-inicio").style.display = "none";
    document.getElementById("menu-ajustes").style.display = "block";
}

function volverMenu() {
    document.getElementById("menu-ajustes").style.display = "none";
    document.getElementById("menu-inicio").style.display = "block";
}

function cambiarVelocidad() {
    velocidadGato = (velocidadGato === 20) ? 40 : 20;
    document.getElementById("btn-velocidad").innerText = `Velocidad: ${velocidadGato === 20 ? 'Normal' : 'Rápida'}`;
}

function empezarJuego() {
    juegoIniciado = true;
    document.getElementById("menu-inicio").style.display = "none";
    document.getElementById("juego").style.display = "block";
    document.getElementById("marcador").style.display = "block";
    document.getElementById("record-valor").innerText = record;
    dibujar();
}

// --- Lógica del Juego ---
function dibujar() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(gato.x, gato.y, gato.w, gato.h);
    ctx.fillStyle = "gray";
    ctx.fillRect(raton.x, raton.y, raton.w, raton.h);
}

window.addEventListener("keydown", (e) => {
    if (!juegoIniciado) return;

    if (e.key === "ArrowUp" && gato.y > 0) gato.y -= velocidadGato;
    if (e.key === "ArrowDown" && gato.y < 360) gato.y += velocidadGato;
    if (e.key === "ArrowLeft" && gato.x > 0) gato.x -= velocidadGato;
    if (e.key === "ArrowRight" && gato.x < 560) gato.x += velocidadGato;
    
    if (gato.x < raton.x + raton.w && gato.x + gato.w > raton.x &&
        gato.y < raton.y + raton.h && gato.y + gato.h > raton.y) {
        puntos++;
        document.getElementById("puntos-valor").innerText = puntos;
        if (puntos >= 10) {
    velocidadGato = 30;
}

if (puntos >= 20) {
    velocidadGato = 40;
}
        raton.x = Math.random() * 560;
        raton.y = Math.random() * 360;
    }
    dibujar();
});
setInterval(() => {
    if (!juegoIniciado) return;

    tiempo--;
    document.getElementById("tiempo-valor").innerText = tiempo;

    if (tiempo <= 0) {

    juegoIniciado = false;

    if (puntos > record) {
        record = puntos;
        localStorage.setItem("record", record);
    }

    document.getElementById("juego").style.display = "none";
    document.getElementById("marcador").style.display = "none";

    document.getElementById("fin-juego").style.display = "block";
    document.getElementById("puntos-finales").innerText = puntos;
}
}
,1000);
setInterval(() => {
    if (!juegoIniciado) return;

    raton.x = Math.random() * 560;
    raton.y = Math.random() * 360;

    dibujar();
}, 2000);

dibujar();
dibujar(); // Dibujo inicial