const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

let puntos = 0;
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
        raton.x = Math.random() * 560;
        raton.y = Math.random() * 360;
    }
    dibujar();
});

dibujar(); // Dibujo inicial