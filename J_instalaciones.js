document.querySelectorAll('.imagen').forEach(container => {
  const images = JSON.parse(container.dataset.images);
  let current = 0;

  // Crear imágenes
  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    if(i===0) img.classList.add('active');
    container.appendChild(img);
  });

  // Crear dots
  const dotsContainer = container.querySelector('.dots');
  images.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if(i===0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const imgs = container.querySelectorAll('img');
  const dots = container.querySelectorAll('.dot');

  function update() {
    imgs.forEach((img,i)=> img.classList.toggle('active', i===current));
    dots.forEach((dot,i)=> dot.classList.toggle('active', i===current));
  }

  function goTo(n) {
    current = (n + images.length) % images.length;
    update();
  }

  container.querySelector('.prev').addEventListener('click', () => goTo(current-1));
  container.querySelector('.next').addEventListener('click', () => goTo(current+1));

  // Botón ampliar
  container.parentElement.parentElement.querySelector('.btn-ampliar').addEventListener('click', () => {
    document.querySelector('#lightbox img').src = images[current];
    document.getElementById('lightbox').style.display = 'flex';
  });
});

// Cerrar lightbox
document.querySelector('.close').onclick = () => {
  document.getElementById('lightbox').style.display = 'none';
};
document.getElementById('lightbox').onclick = (e) => {
  if(e.target === document.getElementById('lightbox')) 
    document.getElementById('lightbox').style.display = 'none';
};