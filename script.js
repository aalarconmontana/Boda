// 💌 Mostrar contenido y reproducir música con animación suave
document.getElementById("abrirCarta").addEventListener("click", () => {
  const sobre = document.getElementById("sobre");
  const contenido = document.getElementById("contenido");
  const musica = document.getElementById("musica");

  // Aplicar transición de salida al sobre
  sobre.style.transition = "opacity 0.5s ease";
  sobre.style.opacity = "0";

  // Mostrar contenido con animación y reproducir música
  setTimeout(() => {
    sobre.style.display = "none";
    contenido.style.display = "block";
    contenido.classList.add("fade-in");
    musica.volume = 0.3; // Volumen inicial suave
    musica.play();
  }, 500);
});

// ⏳ Contador regresivo hasta el día de la boda
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2025-11-23T18:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    countdown.innerHTML = "¡Ya es el gran día!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML = `${days} días ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// 📬 Confirmación de asistencia con animación de aparición
document.getElementById("form-rsvp").addEventListener("submit", function(e) {
  e.preventDefault();
  const mensaje = document.getElementById("mensaje-confirmacion");
  mensaje.style.display = "block";
  mensaje.classList.add("fade-in");
  this.reset();
});
