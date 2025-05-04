const WIDTH = 400;
const HEIGH = 400;

let target = {
  x: getRandomNumber(WIDTH),
  y: getRandomNumber(HEIGH)
};

// Trampas falsas
let traps = [
  { x: getRandomNumber(WIDTH), y: getRandomNumber(HEIGH) },
  { x: getRandomNumber(WIDTH), y: getRandomNumber(HEIGH) },
  { x: getRandomNumber(WIDTH), y: getRandomNumber(HEIGH) }
];

let $mapa = document.querySelector('#mapa');
let $distancia = document.querySelector('#distancia');
let clicks = 0;

const $pantallaBienvenida = document.querySelector('#pantalla-bienvenida');
const $pantallaJuego = document.querySelector('#pantalla-juego');
const $contenidoJuego = document.querySelector('#contenido-juego');
const $enviarNombre = document.querySelector('#enviar-nombre');
const $nombreJugador = document.querySelector('#nombre-jugador');
const $mensajeBienvenida = document.querySelector('#mensaje-bienvenida');
const $iniciarJuego = document.querySelector('#iniciar-juego');

const confetti = new JSConfetti();

// Mostrar nombre del jugador
$enviarNombre.addEventListener('click', function () {
  const nombre = $nombreJugador.value.trim();
  if (nombre) {
    $mensajeBienvenida.textContent = `¡Bienvenido, ${nombre}!`;
    $pantallaBienvenida.style.display = 'none';
    $pantallaJuego.style.display = 'block';
  } else {
    alert('Por favor, escribe tu nombre.');
  }
});

// Iniciar juego y mostrar mejor puntaje
$iniciarJuego.addEventListener('click', function () {
  confetti.addConfetti({
    confettiRadius: 6,
    confettiNumber: 500,
  });
  $iniciarJuego.style.display = 'none';
  document.querySelector('h2').style.display = 'none';
  $contenidoJuego.style.display = 'block';

  // Mostrar mejor puntaje guardado
  const mejorPuntajeGuardado = localStorage.getItem('mejorPuntaje');
  if (mejorPuntajeGuardado) {
    document.getElementById('mejor-puntaje').textContent = `Mejor puntaje: ${mejorPuntajeGuardado} clicks`;
  }
});

// Evento al hacer clic en el mapa
$mapa.addEventListener('click', function (e) {
  clicks++;
  document.getElementById('contador-clicks').textContent = `Clicks: ${clicks}`;

  // Verificar si es una trampa
  if (isNearTrap(e, traps)) {
    $distancia.innerHTML = `<h1 class="distancia-texto trampa">¡Cuidado! Caíste en una trampa</h1>`;
    return;
  }

  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distancia.innerHTML = `<h1 class="distancia-texto">${distanceHint}</h1>`;

  const $distanciaTexto = $distancia.querySelector('.distancia-texto');
  $distanciaTexto.classList.remove('caliente', 'muy-caliente', 'trampa');

  if (distanceHint === 'Caliente') {
    $distanciaTexto.classList.add('caliente');
  } else if (distanceHint === 'Muy Caliente' || distanceHint === 'Estás a punto de Encontrarlo!') {
    $distanciaTexto.classList.add('muy-caliente');
  }

  if (distance < 20) {
    let mejor = localStorage.getItem('mejorPuntaje');
    if (!mejor || clicks < mejor) {
      localStorage.setItem('mejorPuntaje', clicks);
      alert(`¡Nuevo récord! Encontraste el tesoro en ${clicks} clics.`);
    } else {
      alert(`¡Encontraste el tesoro en ${clicks} clics!`);
    }
    location.reload();
  }
});

// Función para generar número aleatorio
function getRandomNumber(size) {
  return Math.floor(Math.random() * size);
}

// Calcular distancia al objetivo
function getDistance(e, target) {
  let diffX = e.offsetX - target.x;
  let diffY = e.offsetY - target.y;
  return Math.sqrt(diffX * diffX + diffY * diffY);
}

// Pistas de distancia
function getDistanceHint(distance) {
  if (distance < 20) return "Estás a punto de Encontrarlo!";
  if (distance < 40) return "Muy Caliente";
  if (distance < 80) return "Caliente";
  if (distance < 160) return "Tibio";
  if (distance < 320) return "Frío";
  return "Muy Frío";
}

// Detección de trampas
function isNearTrap(clickEvent, traps) {
  for (let trap of traps) {
    let dx = clickEvent.offsetX - trap.x;
    let dy = clickEvent.offsetY - trap.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 30) {
      return true;
    }
  }
  return false;
}
