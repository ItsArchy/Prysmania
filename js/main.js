// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
  });
});

// Animaciones al hacer scroll
const elements = document.querySelectorAll('.card, .hero h2, .hero p, .community p, .join p');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// Header sticky
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  header.classList.toggle('sticky', window.scrollY > 50);
});
