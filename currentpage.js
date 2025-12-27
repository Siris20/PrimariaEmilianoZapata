document.addEventListener('DOMContentLoaded', function () {
  try {
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href').split('/').pop();
      if (!href) return;
      if (href === currentPath || (href === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
        a.classList.add('active');
      }
    });
  } catch (e) {}
});
