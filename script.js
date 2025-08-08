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

    // Mostrar los laterales florales
    document.querySelector(".decoracion-izquierda").classList.add("mostrar");
    document.querySelector(".decoracion-derecha").classList.add("mostrar");
  }, 500);
});

// ⏳ Contador regresivo hasta el día de la boda
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2025-11-22T16:00:00").getTime();

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

  countdown.innerHTML = `
  <div class="bloque"><span class="num">${days}</span><span class="label">Días</span></div>
  <div class="bloque"><span class="num">${hours}</span><span class="label">Horas</span></div>
  <div class="bloque"><span class="num">${minutes}</span><span class="label">Min</span></div>
  <div class="bloque"><span class="num">${seconds}</span><span class="label">Seg</span></div>
`;
}, 1000);

// 📬 Confirmación de asistencia con validación de duplicado y formato
document.getElementById("form-rsvp").addEventListener("submit", function(e) {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value.trim();
  let email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje-confirmacion");

  // 🔠 Formatear nombre (cada palabra con mayúscula) y correo (todo en minúsculas)
  nombre = nombre
    .toLowerCase()
    .split(" ")
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
  email = email.toLowerCase();

  if (nombre === "" || email === "") {
    alert("Por favor completa todos los campos.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor ingresa un correo válido.");
    return;
  }

  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const año = ahora.getFullYear();
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');

  const fechaTexto = `${dia}/${mes}/${año}`;
  const horaTexto = `${hora}:${minutos}`;

  // 🔍 Verificar si el correo ya existe en SheetDB
  fetch(`https://sheetdb.io/api/v1/iuqjjqn361m1i/search?email=${email}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        alert("Este correo ya ha confirmado asistencia.");
        return;
      }

      // ✅ Enviar si no está duplicado
      enviarFormulario(nombre, email, fechaTexto, horaTexto);
    })
    .catch(error => {
      console.error("Error al verificar duplicado:", error);
      alert("No se pudo verificar el correo. Intenta más tarde.");
    });
});

// 🚀 Función para enviar datos a SheetDB
function enviarFormulario(nombre, email, fechaTexto, horaTexto) {
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
      const mensaje = document.getElementById("mensaje-confirmacion");
      mensaje.style.display = "block";
      mensaje.classList.add("fade-in");
      document.getElementById("form-rsvp").reset();

      // 🎉 Retroalimentación visual del botón
      const boton = document.querySelector("#form-rsvp button");
      boton.disabled = true;
      boton.textContent = "Enviado ✅";
      setTimeout(() => {
        boton.disabled = false;
        boton.textContent = "Confirmar";
      }, 3000);
    } else {
      throw new Error("Respuesta no OK");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Hubo un error al enviar tu confirmación. Intenta nuevamente.");
  });
}