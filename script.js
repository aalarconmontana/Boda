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

  // Obtener fecha y hora actual
  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const año = ahora.getFullYear();
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');

  const fechaDDMMAAAA = `${dia}${mes}${año}`;
  const horaConfirmacion = `${hora}:${minutos}`;

  // Enviar datos a SheetDB
  fetch("https://sheetdb.io/api/v1/hbk277d5zp9v6", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: [
        {
          nombre: nombre,
          email: email,
          fecha: fechaDDMMAAAA,
          hora: horaConfirmacion
        }
      ]
    })
  })
  .then(response => {
    if (response.ok) {
      mensaje.style.display = "block";
      mensaje.classList.add("fade-in");
      this.reset();
    } else {
      alert("Hubo un error al enviar tu confirmación. Intenta nuevamente.");
    }
  })
  

  // Enviar datos a SheetDB
  const fechaConfirmacion = new Date().toISOString();
  
  fetch("https://sheetdb.io/api/v1/hbk277d5zp9v6", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: [
        {
          nombre: nombre,
          email: email,
          fecha: fechaConfirmacion
        }
      ]
    })
  })
  .then(response => {
    if (response.ok) {
      mensaje.style.display = "block";
      mensaje.classList.add("fade-in");
      this.reset();
    } else {
      alert("Hubo un error al enviar tu confirmación. Intenta nuevamente.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("No se pudo conectar con el servidor.");
  });
});

