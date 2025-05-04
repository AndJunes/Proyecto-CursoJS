const WIDTH = 400;
const HEIGH = 400;

let target = {
  x: getRandomNumber(WIDTH),
  y: getRandomNumber(HEIGH)
};

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

$iniciarJuego.addEventListener('click', function () {
  confetti.addConfetti({
    confettiRadius: 6,
    confettiNumber: 500,
  });
  $iniciarJuego.style.display = 'none';
  document.querySelector('h2').style.display = 'none';
  $contenidoJuego.style.display = 'block';
});

$mapa.addEventListener('click', function (e) {
  console.log('click');
  clicks++;
  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distancia.innerHTML = `<h1 class="distancia-texto">${distanceHint}</h1>`;
  
  // Obtener el elemento h1 recién creado
  const $distanciaTexto = $distancia.querySelector('.distancia-texto');
  
  // Resetear clases de color
  $distanciaTexto.classList.remove('caliente', 'muy-caliente');
  
  // Asignar clase según el mensaje
  if (distanceHint === 'Caliente') {
    $distanciaTexto.classList.add('caliente');
  } else if (distanceHint === 'Muy Caliente' || distanceHint === 'Estás a punto de Encontrarlo!') {
    $distanciaTexto.classList.add('muy-caliente');
  }

  if (distance < 20) {
    alert(`¡ENCONTRASTE EL TESORO EN ${clicks} CLICKS!`);
    location.reload();
  }
});