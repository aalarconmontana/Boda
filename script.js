const countdown = document.getElementById("countdown");
const weddingDate = new Date("2025-12-15T18:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML = `${days} días ${hours}h ${minutes}m ${seconds}s`;
}, 1000);


document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todas las secciones
  const sections = document.querySelectorAll("section");

  // Crea el observador
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  // Observa cada sección
  sections.forEach(section => observer.observe(section));
});
