// 🎉 Contador regresivo
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2025-11-23T18:00:00").getTime(); // ← FECHA CORREGIDA

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML = `${days} días ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// ✨ Animaciones al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  sections.forEach(section => observer.observe(section));
});

// ✅ Envío del formulario RSVP con validación y confirmación
document.getElementById("form-rsvp").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (nombre === "" || email === "") {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Enviar datos a SheetDB
  fetch("https://sheetdb.io/api/v1/hbk277d5zp9v6", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { nombre, email } })
  })
  .then(response => {
    if (response.ok) {
      document.getElementById("form-rsvp").reset();
      document.getElementById("mensaje-confirmacion").style.display = "block";
    } else {
      alert("Hubo un error al enviar tu confirmación. Intenta nuevamente.");
    }
  })
  .catch(() => {
    alert("No se pudo conectar con el servidor. Verifica tu conexión.");
  });
});
