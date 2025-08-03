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
const weddingDate = new Date("2025-11-22T17:00:00").getTime();

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

// 📬 Confirmación de asistencia con envío a SheetDB
document.getElementById("form-rsvp").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje-confirmacion");

  if (nombre === "" || email === "") {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Validación de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor ingresa un correo válido.");
    return;
  }

  // Obtener fecha y hora actual en formato texto
  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const año = ahora.getFullYear();
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');

  const fechaTexto = `${dia}/${mes}/${año}`;     // Ejemplo: "03/08/2025"
  const horaTexto = `${hora}:${minutos}`;        // Ejemplo: "17:45"

  // Enviar datos a SheetDB
  fetch("https://sheetdb.io/api/v1/iuqjjqn361m1i", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: [{
        nombre: nombre,
        email: email,
        fecha: fechaTexto,
        hora: horaTexto
      }]
    })
  })
  .then(response => {
    if (response.ok) {
      mensaje.style.display = "block";
      mensaje.classList.add("fade-in");
      document.getElementById("form-rsvp").reset();
    } else {
      throw new Error("Respuesta no OK");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Hubo un error al enviar tu confirmación. Intenta nuevamente.");
  });
});

