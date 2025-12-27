fetch('/data/noticias.json')
    .then(response => response.json())
    .then(data => {
      const wrapper = document.getElementById('carousel-items');

      data.items.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide noticia-slide';

        slide.innerHTML = `
          <section class="hero" style="background-image: url('${item.imagen}');">
            <h1>${item.titulo}</h1>
            <p>${item.descripcion}</p>
            <!-- Opcional: puedes agregar un botón aquí si quieres -->
          </section>
        `;
        wrapper.appendChild(slide);
      });

      // Inicializar Swiper después de agregar las noticias
      new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    })
    .catch(err => {
      console.error('Error cargando noticias:', err);
      // Si no hay noticias, igual inicializa el carrousel (solo con el hero)
      new Swiper('.mySwiper', {
        loop: false,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });