const generaciones = [];

// Generar las 45 imágenes y sus años de generación (primaria = 6 años por promoción)
for (let i = 1; i <= 45; i++) {
  const añoEgreso = 1979 + (i - 1) * 1; // Cada imagen = 1 generación
  // Saltar 2022 y 2024
  if (añoEgreso === 2022 || añoEgreso === 2024) continue;

  const añoInicio = añoEgreso - 5; // 6 años de primaria

  generaciones.push({
    id: i,
    src: `assets/Generaciones/IMG-20251001-WA${String(i).padStart(4, '0')}_.webp`,
    label: `${añoInicio} - ${añoEgreso}`
  });
}

let paginaActual = 1;
const porPagina = 3;

const galeria = document.getElementById('galeria');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const buscarInput = document.getElementById('buscarGeneracion');
const mostrandoSpan = document.getElementById('mostrando');
const totalSpan = document.getElementById('total');

totalSpan.textContent = generaciones.length;

function mostrarPagina(pag, datos = generaciones) {
  galeria.innerHTML = '';

  const inicio = (pag - 1) * porPagina;
  const fin = inicio + porPagina;
  const items = datos.slice(inicio, fin);

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'galeria-item';
    div.innerHTML = `
      <img src="${item.src}" alt="Generación ${item.label}" onerror="this.src='assets/placeholder.jpg'">
      <div class="generacion-label">${item.label}</div>
    `;
    galeria.appendChild(div);
  });

  // Actualizar info
  const totalPaginas = Math.ceil(datos.length / porPagina);
  mostrandoSpan.textContent = datos.length === 0 ? '0' : `${inicio + 1}-${Math.min(fin, datos.length)}`;

  // Botones
  prevBtn.disabled = pag === 1;
  nextBtn.disabled = pag === Math.ceil(datos.length / porPagina) || datos.length === 0;
  paginaActual = pag;
}

function buscar() {
  const texto = buscarInput.value.trim();
  if (!texto) {
    mostrarPagina(1);
    return;
  }

  const filtrados = generaciones.filter(g => 
    g.label.includes(texto) || 
    g.label.split(' - ')[0].includes(texto) ||
    g.label.split(' - ')[1].includes(texto)
  );

  mostrarPagina(1, filtrados);
}

// Eventos
prevBtn.addEventListener('click', () => {
  if (paginaActual > 1) mostrarPagina(paginaActual - 1);
});

nextBtn.addEventListener('click', () => {
  mostrarPagina(paginaActual + 1);
});

buscarInput.addEventListener('input', buscar);

// Carga inicial
mostrarPagina(1);