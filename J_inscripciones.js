document.addEventListener('DOMContentLoaded', function () {
  const botones = document.querySelectorAll('.btn-hecho, .btn-listo');
  const totalPasos = document.querySelectorAll('.paso').length;
  const barraFill = document.querySelector('.fill');
  const contador = document.getElementById('completados');

  let completados = 0;

  // REINICIAR PROGRESO AL CARGAR (ELIMINAR LO GUARDADO)
  localStorage.removeItem('inscripcionProgreso');

  // Reiniciar visualmente todos los pasos
  document.querySelectorAll('.paso').forEach(paso => {
    paso.classList.remove('completado');
    const circulo = paso.querySelector('.circulo');
    const checkmark = paso.querySelector('.checkmark');
    if (circulo) circulo.classList.remove('activo');
    if (checkmark) checkmark.style.opacity = '0';
  });

  // Reiniciar barra y contador
  actualizarProgreso();

  // Eventos de botones
  botones.forEach(btn => {
    btn.addEventListener('click', function () {
      const paso = this.closest('.paso');
      const id = paso.dataset.id;

      if (!paso.classList.contains('completado')) {
        marcarCompletado(id);
        guardarProgreso(); // Puedes mantenerlo si quieres que persista DENTRO de la sesión
        actualizarProgreso();
      }
    });
  });

  function marcarCompletado(id) {
    const paso = document.querySelector(`.paso[data-id="${id}"]`);
    paso.classList.add('completado');
    const circulo = paso.querySelector('.circulo');
    const checkmark = paso.querySelector('.checkmark');
    if (circulo) circulo.classList.add('activo');
    if (checkmark) checkmark.style.opacity = '1';
  }

  function actualizarProgreso() {
    completados = document.querySelectorAll('.paso.completado').length;
    const porcentaje = (completados / totalPasos) * 100;
    barraFill.style.width = porcentaje + '%';
    contador.textContent = completados;
  }

  function guardarProgreso() {
    const ids = Array.from(document.querySelectorAll('.paso.completado')).map(p => p.dataset.id);
    localStorage.setItem('inscripcionProgreso', JSON.stringify(ids));
  }
});